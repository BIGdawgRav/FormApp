from rest_framework import serializers


from .models import FormEntry, FormSubmission


class FormEntrySerializer(serializers.ModelSerializer ):

    class Meta:
        model = FormEntry
        fields = '__all__'

class FormSubmissionSerializer(serializers.ModelSerializer ):

    class Meta:
        model = FormSubmission
        fields = '__all__'

