from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.viewsets import ViewSet

from .models import AdSpace


class AdSpacePermission(BasePermission):
    """Authorization for adspace."""

    def has_permission(self, request: Request, view: ViewSet) -> bool:
        """Check whether request is able to perform `action` on this `view` at all."""
        if view.action in ["list", "retrieve"]:
            return True

        return request.user.is_authenticated

    def has_object_permission(
        self, request: Request, view: ViewSet, obj: AdSpace
    ) -> bool:
        """AdSpace instance permission authorization.
        Used for `retrieve`, `update` and `destroy` actions.
        """
        if view.action == "retrieve":
            return True

        return obj.user == request.user
