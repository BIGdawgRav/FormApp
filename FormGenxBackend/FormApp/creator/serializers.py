from rest_framework import serializers
from rest_auth.registration.serializers import RegisterSerializer
from rest_framework.serializers import ValidationError
from .models import Creator



class CreatorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Creator
        fields = '__all__'


class CreatorRegistrationSerializer(RegisterSerializer):
    
    first_name = serializers.CharField()
    last_name = serializers.CharField()
  

    def custom_signup(self, request, user):
        print(self)
        user.first_name = self.validated_data.get('first_name', '')
        user.last_name = self.validated_data.get('last_name', '')
        user.is_vreator = True
        user.save(update_fields=['first_name', 'last_name', 'is_creator'])
        new_creator = Creator.objects.create(user=user,
             
         )
     
        new_creator.save()
