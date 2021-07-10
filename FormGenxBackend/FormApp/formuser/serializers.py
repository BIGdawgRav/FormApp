from rest_framework import serializers
from rest_framework.serializers import ValidationError


from .models import FormUser

class FormUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = FormUser
        fields = '__all__'

