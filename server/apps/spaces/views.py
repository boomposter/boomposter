from django_filters.rest_framework.backends import DjangoFilterBackend
from rest_framework.filters import OrderingFilter, SearchFilter
from rest_framework.viewsets import ModelViewSet

from .filters import AdSpaceFilter
from .models import AdSpace
from .pagination import AdSpacePagination
from .permissions import AdSpacePermission
from .serializers import AdSpaceCreateSerializer, AdSpaceReadUpdateSerializer


class AdSpaceViewSet(ModelViewSet):
    """ViewSet for adspace."""

    # Queryset and serialization
    queryset = AdSpace.objects

    # URLconf
    lookup_field = "id"
    lookup_url_kwarg = "id"
    lookup_value_regex = r"[^/.]+"

    # Authentication and authorization
    permission_classes = [AdSpacePermission]  # For 403 or 404 responses

    # Result correction
    pagination_class = AdSpacePagination
    filter_backends = [DjangoFilterBackend, SearchFilter, OrderingFilter]
    filterset_class = AdSpaceFilter
    search_fields = ["title"]
    ordering_fields = ["id", "created"]

    tags_map = {
        "billboard": ['billboard', 'билборд'],
        "digital": ['digital', 'диджитал'],
        "transport": ['transport', 'транспорт'],
    }

    def get_queryset(self):
        """Return queryset used in `list`, `retrive`, `update`, `destroy` and `purge` actions."""
        queryset = self.queryset
        tag = self.request.GET.get("tag")
        if tag:
            queryset = queryset.filter(tags__name__in=self.tags_map[tag])
        return queryset

    def get_serializer_class(self):
        if self.action in ["create"]:
            return AdSpaceCreateSerializer

        return AdSpaceReadUpdateSerializer
