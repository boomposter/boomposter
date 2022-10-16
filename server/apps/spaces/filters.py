from django_filters import FilterSet

from .models import AdSpace


class AdSpaceFilter(FilterSet):
    """Filter set for adspace model."""

    class Meta:
        model = AdSpace
        fields = {
            "user": ["exact"],
        }
