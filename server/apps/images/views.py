from rest_framework import mixins
from rest_framework.viewsets import GenericViewSet

from .models import AdSpaceImage
from .permissions import AdSpaceImagePermission
from .serializers import AdSpaceImageSerializer


class AdSpaceImageViewSet(
    mixins.DestroyModelMixin, mixins.CreateModelMixin, GenericViewSet
):
    """ViewSet for createing and destorying adspace images."""

    # Queryset and serialization
    queryset = AdSpaceImage.objects.all()
    serializer_class = AdSpaceImageSerializer  # For 400 or 404 responses

    # URLconf
    lookup_field = "id"
    lookup_url_kwarg = "id"
    lookup_value_regex = r"[^/.]+"

    # Authentication and authorization
    permission_classes = [AdSpaceImagePermission]  # For 403 or 404 responses

    def get_queryset(self):
        """Return re-evaluated queryset. Used in `list`, `retrieve`, `update`, `destroy` and `purge` actions."""
        return self.queryset.all()
