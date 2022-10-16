from django.conf import settings
from rest_framework.routers import DefaultRouter, DynamicRoute, Route, SimpleRouter

from apps.images.views import AdSpaceImageViewSet
from apps.spaces.views import AdSpaceViewSet


class Router(DefaultRouter if settings.DEBUG else SimpleRouter):  # type: ignore
    """Custom API router."""

    routes = [
        Route(
            url=r"^{prefix}{trailing_slash}$",
            mapping={
                "get": "list",
                "post": "create",
                "delete": "purge",
            },
            name="{basename}-list",
            detail=False,
            initkwargs={"suffix": "List"},
        ),
        DynamicRoute(
            url=r"^{prefix}/{url_path}{trailing_slash}$",
            name="{basename}-{url_name}",
            detail=False,
            initkwargs={},
        ),
        Route(
            url=r"^{prefix}/{lookup}{trailing_slash}$",
            mapping={
                "get": "retrieve",
                "put": "update",
                "patch": "partial_update",
                "delete": "destroy",
            },
            name="{basename}-detail",
            detail=True,
            initkwargs={"suffix": "Instance"},
        ),
        DynamicRoute(
            url=r"^{prefix}/{lookup}/{url_path}{trailing_slash}$",
            name="{basename}-{url_name}",
            detail=True,
            initkwargs={},
        ),
    ]


router = Router()
router.register("adspaces", AdSpaceViewSet)
router.register("images", AdSpaceImageViewSet)

urlpatterns = router.urls
