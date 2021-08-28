from django.urls import path, include
from .views import(

    CreatorFormEntryCreatUpdateAPIView,
    CreatorUpdateSingleAPIView,
    CreatorAPIView,
    CreatorRegistrationAPIView,
    CreatorUserAPIView,
    CreatorUpdateSingleAPIView,
    CreatorRetireveFormSubmissions,
    email_confirmation_view
    # CreatorDeployform

)


urlpatterns = [

      # Register a handler
    path('registration/',  CreatorRegistrationAPIView.as_view(), name="CreatorRegistrationAPIView"),

    # Creator details
    path('',  CreatorUserAPIView.as_view(), name="CreatorUserAPIView"),
    
    # delete Creator details
    path('/<int:p_key>',  CreatorUserAPIView.as_view(), name="CreatorUserAPIView"),
    
    # Creator create/get a FormEntry
    path('entry/',  CreatorFormEntryCreatUpdateAPIView.as_view(), name="CreatorFormEntryCreatUpdateAPIView"),

    
    # Admin create/get/update a Form
    path('entry/<int:pk>',  CreatorUpdateSingleAPIView.as_view(), name="CreatorUpdateSingleAPIView"),

    # Admin get the submissioms for single forms
    path('submissions/<int:pk>',   CreatorRetireveFormSubmissions.as_view(), name=" CreatorRetireveFormSubmissions"),

     # Email confirmation page
    path('emailconf', email_confirmation_view, name="email_confirmation_view")

    

]