from djongo import models
from creator.models import Creator


class FormEntry(models.Model):

    title = models.CharField(max_length=100)
    form_structure = models.JSONField()
    admin = models.ForeignKey(Creator, default=None, verbose_name="Admin", on_delete=models.CASCADE)
    is_deployed = models.BooleanField(default = False)
    objects = models.DjongoManager()   

    def __str__(self):
        return self.title


class FormSubmission(models.Model):

    name: models.TextField(max_length=100)
    admin = models.ForeignKey(Creator, verbose_name="Admin", on_delete=models.CASCADE)
    form_entry = models.ForeignKey(FormEntry,on_delete=models.CASCADE)
    submission = models.JSONField()
    objects = models.DjongoManager()

    def __str__(self):
        return self.name

