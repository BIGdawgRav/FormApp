from djongo import models
from user.models import User
from django.core.exceptions import ValidationError


class Creator(models.Model):


    user = models.OneToOneField(User, on_delete=models.CASCADE, default=None)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=200, blank=True, null=True)

    objects = models.DjongoManager()   




    def __str__(self):
        return self.first_name

    def clean(self, *args, **kwargs):

      

        if hasattr(self.user, 'formuser'):
            raise ValidationError("You cannot make a user both a formuser and an creator!")
        elif hasattr(self.user, 'creatgggor'):
            raise ValidationError("You cannot make a user both a creator and a formuser!")

        super(Creator, self).clean(*args, **kwargs)