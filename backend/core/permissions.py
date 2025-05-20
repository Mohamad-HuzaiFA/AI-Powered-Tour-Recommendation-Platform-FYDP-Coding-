from rest_framework.permissions import BasePermission

class IsTourist(BasePermission):
    """
    Allows access only to tourists.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type == 'tourist'

class IsTourismCompany(BasePermission):
    """
    Allows access only to tourism companies.
    """
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.user_type in ['tourism_company', 'company']


# tours/permissions.py
from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """
    Allows access only to 'staff' users (Django admin flag) – adjust if you have
    a custom role system.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_staff)