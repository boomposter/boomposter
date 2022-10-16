from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers
from taggit.serializers import TaggitSerializer, TagListSerializerField

from ..images.models import AdSpaceImage
from ..users.auth.serializers import UserSerializer
from .models import AdSpace


class AdSpaceImageSerializer(serializers.ModelSerializer):
    """Serializer and deserializer for advertisement space image model."""

    image = Base64ImageField()

    class Meta:
        model = AdSpaceImage
        fields = ["id", "image", "space"]
        read_only_fields = ["space"]


class AdSpaceSerializer(TaggitSerializer, serializers.ModelSerializer):
    """Serializer and deserializer for adspace model."""

    tags = TagListSerializerField(required=False)

    class Meta:
        model = AdSpace
        fields = [
            "id",
            "user",  # nester detail serializer
            "title",
            "description",
            "price",
            "location",
            "latitude",
            "longitude",
            "tags",  # nested list serializer
            "images",  # nested list serializer
            "created",
        ]
        # depth = 0

    def create(self, validated_data: dict) -> AdSpace:
        """Custom create action, used for related images create."""
        images_data = validated_data.pop("images", [])

        adspace = super().create(validated_data)

        for image_data in images_data:
            AdSpaceImage.objects.create(space=adspace, **image_data)

        return adspace


class AdSpaceCreateSerializer(AdSpaceSerializer):
    """Serializer used in `create` action."""

    # User won't be displayed in response data
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())
    images = AdSpaceImageSerializer(many=True, required=False)


class AdSpaceReadUpdateSerializer(AdSpaceSerializer):
    """Serializer used in `update`, `list` and `retrieve` actions."""

    user = UserSerializer(read_only=True)
    # Destorying images is only supported via /images/ endpoint
    images = AdSpaceImageSerializer(many=True, required=False, read_only=True)
