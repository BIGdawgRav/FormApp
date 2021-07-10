from django import forms

def validate_allowed_permissions(form):
    count = 0
    permissions = [form.cleaned_data.get("is_creator"), form.cleaned_data.get("is_formuser")]
    for permission in permissions:
        if permission:
            count += 1

    if count > 1:
        raise forms.ValidationError("The user can only have one of the selected permissions")