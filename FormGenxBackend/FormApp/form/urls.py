
from django.urls import path, include
from .views import(

FormApiView,
FormSubmissionApiView
 

)

urlpatterns = [

    # Register access a form
    path('<int:pk>',  FormApiView.as_view(), name = "FormApiView"),

    #Submit a form
    path('submit',  FormSubmissionApiView.as_view(), name = "FormSubmissionApiView"),



    

]