from rest_framework.permissions import BasePermission
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from .models import AdSpaceImage


class AdSpaceImagePermission(BasePermission):
    """Authorization for adspaceimage."""

    def has_permission(self, request: Request, view: ViewSet) -> bool:
        """Authorization for `list`, `create` or object actions (`destory`, `update`, `retrieve`)."""
        if view.action in ["create", "destory"]:
            return request.user.is_authenticated

        return True

    def has_object_permission(
        self, request: Request, view: ViewSet, obj: AdSpaceImage
    ) -> bool:
        """Authorization for `retrieve`, `update` and `destroy` actions."""
        if view.action in ["destroy", "create"]:
            return request.user == obj.space.user

        return False
