"""FormApp URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from allauth.account.views import confirm_email
from django.conf.urls import url
from django.contrib import admin
from django.urls import path, include
# from magic_link import urls as magic_link_urls


urlpatterns = [
    path('admin/', admin.site.urls),
    path('user/', include('user.urls')),
    path('form/', include('form.urls')),
    path('formuser/', include('formuser.urls')),
    path('creator/', include('creator.urls')),

  
    # These are for authentication
    path('', include('rest_auth.urls')),
    url(r'^', include('django.contrib.auth.urls')), # Dependency for rest_password_confirmation.
    path('registration/', include('rest_auth.registration.urls')),
    path('account/', include('allauth.urls')),
    path('account/registration/account-confirm-email/<int:pk>', confirm_email, name='account_confirm_email'),
    # url(r'^magic_link/', include(magic_link_urls)),
]

admin.site.site_header = "Form-Genx Admin"
admin.site.site_title = "Form-Genx Portal"
admin.site.index_title = "Form-Genx Portal"
