from dataclasses import dataclass

from rest_framework_dataclasses.serializers import DataclassSerializer


@dataclass
class SignInResponse:
    access_token: str
    token_type: str
    expires_in: int


@dataclass
class SignInRequest:
    grant_type: str
    username: str
    password: str


class SignInRequestSerializer(DataclassSerializer):
    class Meta:
        dataclass = SignInRequest


class SignInResponseSerializer(DataclassSerializer):
    class Meta:
        dataclass = SignInResponse
