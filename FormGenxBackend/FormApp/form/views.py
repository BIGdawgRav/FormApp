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

# Create your views here.



from form.models import FormEntry
from form.serializers import ( FormEntrySerializer, FormSubmissionSerializer)

class FormApiView(generics.GenericAPIView):

    queryset = FormEntry.objects.filter(is_deployed= True)
    serializer_class = FormEntrySerializer

    def get(self, request, pk):
      
        form_entry_obj = self.get_queryset().filter(pk=pk)
     
        serializer =  FormEntrySerializer(instance=form_entry_obj, many=True)
  
        serializer.data[0]['form_structure'] = json.dumps(eval(serializer.data[0].get('form_structure')))


        return Response(serializer.data)


    def post(self, request, pk):
        serializer = FormEntrySerializer(data=request.data)

        if (serializer.is_valid()):
            
            return Response(status=status.HTTP_202_ACCEPTED)

        return Response(status=status.HTTP_406_NOT_ACCEPTABLE)



class FormSubmissionApiView(generics.GenericAPIView):
    serializer_class = FormSubmissionSerializer

    def post(self,request):
        
        serializer = FormSubmissionSerializer(data=request.data)

        if (serializer.is_valid()):
            serializer.save()
            return Response(status=status.HTTP_202_ACCEPTED)

        return Response(serializer.errors, status=status.HTTP_406_NOT_ACCEPTABLE)

        
      


 


