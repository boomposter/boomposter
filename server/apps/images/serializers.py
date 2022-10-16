from drf_extra_fields.fields import Base64ImageField
from rest_framework import serializers

from .models import AdSpaceImage


class AdSpaceImageSerializer(serializers.ModelSerializer):
    """Serializer and deserializer for advertisement space image model."""

    # For accepting image as base64 string or base64 data URL
    image = Base64ImageField()  # or HybdridImageField

    class Meta:
        model = AdSpaceImage
        fields = ["id", "image", "space"]
        read_only_fields = []
