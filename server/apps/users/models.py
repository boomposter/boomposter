from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _


class User(AbstractBaseUser, PermissionsMixin):
    """Model representing user."""

    id = models.BigAutoField(verbose_name=_("ID"), primary_key=True)

    username_validator = UnicodeUsernameValidator()
    email = models.EmailField(_("email address"), unique=True)
    username = models.CharField(
        _("username"),
        max_length=150,
        unique=True,
        validators=[username_validator],
        help_text=_(
            "Required. "
            "150 characters or fewer. "
            "Letters, digits and @/./+/-/_ only."
        ),
        error_messages={
            "unique": _("A user with that username already exists."),
        },
    )
    is_staff = models.BooleanField(
        _("staff status"),
        default=False,
        help_text=_("Designates whether the user can log into this admin site."),
    )
    is_active = models.BooleanField(
        _("active"),
        default=True,
        help_text=_(
            "Designates whether this user should be treated as active. Unselect this instead of deleting accounts."
        ),
    )
    date_joined = models.DateTimeField(_("date joined"), default=timezone.now)

    # Additional profile information about the user:
    contact_name = models.CharField(
        verbose_name=_("contact name"),
        help_text=_("Person name that can be contacted."),
        max_length=255,
        blank=True,
    )
    contact_phone = models.CharField(
        verbose_name=_("contact phone"),
        help_text=_(
            "Phone number that can be used for contaction. Displayed to all users."
        ),
        max_length=255,
        blank=True,
    )
    contact_email = models.EmailField(
        _("contact email address"),
        help_text=_("Email addressed displayed to all users."),
        blank=True,
    )
    contact_messenger = models.CharField(
        verbose_name=_("contact messenger"),
        help_text=_("Messenger that can be used for contacting."),
        max_length=255,
        blank=True,
    )

    # Specify user's unique identifier field (used for login)
    USERNAME_FIELD = "email"
    # Describe the name of email field (used in get_email_field)
    EMAIL_FIELD = "email"
    # Fields required when using `createsuperuser` command (excluding `USERNAME_FIELD` and `password`)
    REQUIRED_FIELDS = ["username"]  # + `email` + `password`

    objects = UserManager()

    class Meta:
        verbose_name = _("user")
        verbose_name_plural = _("users")
        ordering = ["username"]

    def clean(self):
        super().clean()
        self.email = self.__class__.objects.normalize_email(self.email)

    def __str__(self):
        return self.username
