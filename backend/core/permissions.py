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
        return request.user.is_authenticated and request.user.user_type == 'tourism_company' or 'company'
