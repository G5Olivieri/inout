from django.urls import path
from inout_auth.views import signin_view

urlpatterns = [
    path("token", signin_view, name="barc_auth.signin"),
]
