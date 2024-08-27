import logging
from typing import Tuple, TYPE_CHECKING

import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.request import Request

if TYPE_CHECKING:
    from django.contrib.auth.models import AbstractUser

User = get_user_model()

logger = logging.getLogger(__name__)


class JWTAuthentication(BaseAuthentication):
    # pylint: disable=used-before-assignment
    def authenticate(self, request: Request) -> Tuple[AbstractUser | None, None] | None:
        authorization = request.META.get("HTTP_AUTHORIZATION")
        if authorization is None:
            return None

        if not authorization.startswith("Bearer "):
            return None

        token = authorization.split(" ")[1]
        try:
            payload = jwt.decode(
                token,
                key=settings.JWT_SECRET_KEY,
                algorithms=[settings.JWT_ALGORITHM],
                options={"verify_exp": False},
            )
        except jwt.ExpiredSignatureError as exc:
            raise AuthenticationFailed("Token expired") from exc
        except jwt.InvalidTokenError as exc:
            raise AuthenticationFailed("Invalid token") from exc

        try:
            user = User.objects.get(username=payload["sub"])
        except User.DoesNotExist as exc:
            raise AuthenticationFailed("No such user") from exc

        return (user, None)
