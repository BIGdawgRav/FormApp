from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import ugettext_lazy as _

from .managers import CustomUserManager

# Create your models here.
class User(AbstractUser):
    username = None
    email = models.EmailField(_('email'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    is_creator = models.BooleanField(default=False)
    is_formuser = models.BooleanField(default=False)


    def __str__(self):
        return self.email

    # These set up the employee, handler and client attributes to be accessed from a User.
    @property
    def creator(self):
        return self.creator_set.all()

    @property
    def formuser(self):
        return self.formuser_set.all()

