import jwt
from django.conf import settings
from django.test import TestCase
from django.http import HttpRequest
from django.contrib.auth import get_user_model
from rest_framework import exceptions
from rest_framework.request import Request
from inout_auth.authentication import JWTAuthentication

User = get_user_model()


class JWTAuthenticationTestCase(TestCase):
    def setUp(self):
        self.authentication = JWTAuthentication()
        self.user = User.objects.create_user(
            username="testuser", password="testpassword"
        )
        self.token = jwt.encode(
            {"sub": "testuser"},
            key=settings.JWT_SECRET_KEY,
            algorithm=settings.JWT_ALGORITHM,
        )

    def test_authenticate_with_valid_token(self):
        request = Request(HttpRequest())
        request.META["HTTP_AUTHORIZATION"] = f"Bearer {self.token}"
        result = self.authentication.authenticate(request)
        if result is None:
            self.fail("Authentication failed")
        user, _ = result
        self.assertEqual(user, self.user)

    def test_authenticate_with_expired_token(self):
        expired_token = jwt.encode(
            payload={"sub": "testuser"},
            key=settings.JWT_SECRET_KEY,
            algorithm=settings.JWT_ALGORITHM,
        )
        request = Request(HttpRequest())
        request.META["HTTP_AUTHORIZATION"] = f"Bearer {expired_token}"
        with self.assertRaises(exceptions.AuthenticationFailed) as cm:
            self.authentication.authenticate(request)
        self.assertEqual(str(cm.exception), "Token expired")

    def test_authenticate_with_invalid_token(self):
        invalid_token = "invalid_token"
        request = Request(HttpRequest())
        request.META["HTTP_AUTHORIZATION"] = f"Bearer {invalid_token}"
        with self.assertRaises(exceptions.AuthenticationFailed) as cm:
            self.authentication.authenticate(request)
        self.assertEqual(str(cm.exception), "Invalid token")

    def test_authenticate_with_nonexistent_user(self):
        nonexistent_user_token = jwt.encode(
            {"sub": "nonexistentuser"},
            key=settings.JWT_SECRET_KEY,
            algorithm=settings.JWT_ALGORITHM,
        )
        request = Request(HttpRequest())
        request.META["HTTP_AUTHORIZATION"] = f"Bearer {nonexistent_user_token}"
        with self.assertRaises(exceptions.AuthenticationFailed) as cm:
            self.authentication.authenticate(request)
        self.assertEqual(str(cm.exception), "No such user")
