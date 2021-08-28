from django.shortcuts import render


# Create your views here.
from rest_framework import generics, status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_auth.registration.views import RegisterView
from django.http.response import JsonResponse
import json


import ast
from collections import OrderedDict


from creator.models import Creator
from creator.serializers import CreatorSerializer, CreatorRegistrationSerializer


from formuser.models import FormUser
from formuser.serializers import FormUserSerializer

from form.models import (FormEntry , FormSubmission)
from form.serializers import ( FormEntrySerializer , FormSubmissionSerializer)

from .models import Creator
from .serializers import (CreatorSerializer)
from .permissions import CreatorPermission

from user.models import User
from user.serializers import UserSerializer



""" Allow clients to be resgistered as users. This will auto create an Client model for them """
class CreatorRegistrationAPIView(RegisterView):
    serializer_class = CreatorRegistrationSerializer
    permission_classes = []
    

"""  Get all data and update *Creator Details """
class CreatorUserAPIView(generics.GenericAPIView):
    queryset = User.objects.all()
    serializer_class = CreatorSerializer
    permission_classes = [IsAuthenticated, CreatorPermission]

    def get(self, request):
        serializer = UserSerializer(instance=request.user)
        return Response(serializer.data)

    def post(self, request):
        serializer = CreatorSerializer(instance=request.user.client, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
    
    def delete(self,request,pk):
        creator_obj = self.get_queryset().filter(pk=pk)
        serializer = UserSerializer(instance=creator_obj.first(), data=request.data)
        creator_obj.delete()
        return Response( status=status.HTTP_202_ACCEPTED)

class CreatorAPIView(generics.GenericAPIView):
    serializer_class = CreatorSerializer
    queryset = Creator.objects.all()


    def get(self,request):
        serializer =  CreatorSerializer(self.get_queryset(), many=True)  
        return Response(serializer.data)






# ##Create a Creator

# class CreatorRegisterAPIView(generics.GenericAPIView):
#     serializer_class = CreatorSerializer
#     queryset = Creator.objects.all()


#     def post(self, request ):
            
#         serializer = CreatorSerializer(data=request.data)

#         if serializer.is_valid():
#             serializer.save()
#             return Response(status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)
    


##Create a FormEntry' and get all FormEntries
class CreatorFormEntryCreatUpdateAPIView(generics.GenericAPIView):
    serializer_class = FormEntrySerializer
    queryset = FormEntry.objects.all()

    def get(self,request):
        serializer =  FormEntrySerializer(self.get_queryset(), many=True)
        for x in range(len(serializer.data)):
            serializer.data[x]['form_structure'] = json.dumps(eval(serializer.data[x].get('form_structure')))
     
        return Response(serializer.data)

    def post(self, request ):

        serializer = FormEntrySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)


##get a specific enrty
class CreatorUpdateSingleAPIView(generics.GenericAPIView):

    serializer_class = FormEntrySerializer
    queryset = FormEntry.objects.all()

    def put(self,request,pk):
        form_entry_obj = self.get_queryset().filter(pk=pk)
        serializer = FormEntrySerializer(instance=form_entry_obj.first() , data=request.data)
 
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)

        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)

    def delete(self,request,pk):
        form_entry_obj = self.get_queryset().filter(pk=pk)
        serializer = FormEntrySerializer(instance=form_entry_obj.first() , data=request.data)
        form_entry_obj.delete()
        return Response( status=status.HTTP_202_ACCEPTED)



# Get the submission for a single form entry
class CreatorRetireveFormSubmissions(generics.GenericAPIView):

    serializer_class = FormSubmissionSerializer
    queryset = FormSubmission.objects.all()

    def get(self,request,pk):

        form_submission_objects= self.get_queryset().filter(form_entry = pk)
        serializer = FormSubmissionSerializer(form_submission_objects, many =True)
       

        for x in range(len(serializer.data)):
            serializer.data[x]['submission'] = json.dumps(eval(serializer.data[x].get('submission')))
     
       
        return Response(serializer.data)

    
   
def email_confirmation_view(request):
    return render(request, "creator/email_confirmation.html")

          



