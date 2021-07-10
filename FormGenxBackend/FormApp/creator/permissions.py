from rest_framework.permissions import BasePermission

class CreatorPermission(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_creator


    """ Check if the employee can see a specific placement """
    def has_object_permission(self, request, view, obj):
        if obj == None:
            return False
        return request.user.creator == obj
