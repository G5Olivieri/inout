import time

import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, parser_classes, renderer_classes
from rest_framework.parsers import FormParser
from rest_framework.renderers import JSONRenderer
from rest_framework.request import Request
from rest_framework.response import Response

from inout_auth.serializers import (
    SignInRequest,
    SignInRequestSerializer,
    SignInResponse,
    SignInResponseSerializer,
)


@api_view(["POST"])
@parser_classes([FormParser])
@renderer_classes([JSONRenderer])
def signin_view(request: Request) -> Response:
    signin_request_serializer = SignInRequestSerializer(data=request.data)

    if not signin_request_serializer.is_valid():
        return Response(signin_request_serializer.errors, status=400)

    signin_request: SignInRequest = signin_request_serializer.validated_data  # type: ignore

    if signin_request.grant_type != "password":
        return Response({"error": "Invalid grant_type"}, status=400)

    user = get_user_model().objects.filter(username=signin_request.username).first()
    if user is None or not user.check_password(signin_request.password):
        return Response({"error": "Invalid username or password"}, status=400)

    now = time.time()
    response = SignInResponseSerializer(
        instance=SignInResponse(
            access_token=jwt.encode(
                payload={
                    "sub": user.username,
                    "iat": now,
                    "iss": "barc.com.br",
                    "exp": now + settings.JWT_EXPIRATION,
                },
                key=settings.JWT_SECRET_KEY,
                algorithm=settings.JWT_ALGORITHM,
            ),
            expires_in=settings.JWT_EXPIRATION,
            token_type="Bearer",
        )
    )
    return Response(response.data)
