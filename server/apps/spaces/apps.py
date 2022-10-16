from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class SpacesConfig(AppConfig):
    """Application config for spaces."""

    name = "apps.spaces"
    verbose_name = _("Advertisement Spaces")
    label = "spaces"
