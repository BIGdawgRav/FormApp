from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework.authtoken.models import Token

from .models import User
from creator.serializers import CreatorSerializer
from formuser.serializers import FormUserSerializer


class UserSerializer(serializers.ModelSerializer):
    # Allow null since a user may not have a related handler/client etc.
    creator = CreatorSerializer(required=False, allow_null=True, read_only=True)
    formuser = FormUserSerializer(required=False, allow_null=True, read_only=True)

    class Meta:
        model = User
        exclude = ('password', )
        depth = 1

class TokenSerializer(serializers.ModelSerializer):
    """
    Serializer for Token model.
    """
    user = UserSerializer(many=False, read_only=True)  # this is add by myself.
    class Meta:
        model = Token
        fields = ('key', 'user')   # there I add the `user` field ( this is my need data ).