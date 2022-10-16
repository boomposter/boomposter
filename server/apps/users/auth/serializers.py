from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError as DjangoValidationError
from django.utils.translation import gettext_lazy as _
from rest_framework import serializers

try:
    from allauth.account import app_settings as allauth_settings
    from allauth.account.adapter import get_adapter
    from allauth.account.utils import setup_user_email
    from allauth.utils import email_address_exists, get_username_max_length
except ImportError:
    raise ImportError("allauth needs to be added to INSTALLED_APPS.")

User = get_user_model()


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(
        max_length=get_username_max_length(),
        min_length=allauth_settings.USERNAME_MIN_LENGTH,
        required=allauth_settings.USERNAME_REQUIRED,
    )
    email = serializers.EmailField(required=allauth_settings.EMAIL_REQUIRED)
    password = serializers.CharField(write_only=True)

    def validate_username(self, username):
        username = get_adapter().clean_username(username)
        return username

    def validate_email(self, email):
        email = get_adapter().clean_email(email)
        if allauth_settings.UNIQUE_EMAIL:
            if email and email_address_exists(email):
                raise serializers.ValidationError(
                    _("A user is already registered with this e-mail address."),
                )
        return email

    def validate_password(self, password):
        return get_adapter().clean_password(password)

    def get_cleaned_data(self):
        return {
            "username": self.validated_data.get("username", ""),
            "password1": self.validated_data.get("password", ""),
            "email": self.validated_data.get("email", ""),
        }

    def save(self, request):
        adapter = get_adapter()
        user = adapter.new_user(request)
        self.cleaned_data = self.get_cleaned_data()
        user = adapter.save_user(request, user, self, commit=False)

        if "password1" in self.cleaned_data:
            try:
                adapter.clean_password(self.cleaned_data["password1"], user=user)
            except DjangoValidationError as exc:
                raise serializers.ValidationError(
                    detail=serializers.as_serializer_error(exc)
                )

        user.save()
        setup_user_email(request, user, [])
        return user


class UserSerializer(serializers.ModelSerializer):
    """User details serializer and deserializer (update)."""

    @staticmethod
    def validate_username(username: str):
        from allauth.account.adapter import get_adapter

        username = get_adapter().clean_username(username)
        return username

    class Meta:
        model = User
        fields = [
            "id",
            "email",
            "username",
            # Additional information
            "contact_name",
            "contact_email",
            "contact_phone",
            "contact_messenger",
        ]
        # Not-updatable fields
        read_only_fields = [
            "username",
            "email",
        ]
