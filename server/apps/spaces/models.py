from datetime import datetime

from django.conf import settings
from django.core.validators import MinValueValidator
from django.db import models
from django.utils.translation import gettext_lazy as _
from taggit.managers import TaggableManager


class AdSpace(models.Model):
    """Model representing adspace. Fat model pattern (API/admin)."""

    id = models.BigAutoField(verbose_name=_("ID"), primary_key=True)
    user = models.ForeignKey(
        verbose_name=_("user"),
        to=getattr(settings, "AUTH_USER_MODEL"),
        on_delete=models.CASCADE,
        related_name="spaces",
    )
    title = models.CharField(verbose_name=_("space title"), max_length=255)
    price = models.FloatField(
        verbose_name=_("rental price"),
        help_text=_("Rental price of the space per 1 day in RUB."),
        validators=[
            MinValueValidator(1, _("The rental of the space should be at least 1RUB."))
        ],
        blank=True,
        default=None,
        null=True,
    )
    description = models.TextField(
        verbose_name=_("description"),
        help_text=_(
            "The detailed description of advertisement space. "
            "Should include all other important information."
        ),
        blank=True,
    )
    # Location in textual form and in exact geolocation form
    location = models.CharField(
        verbose_name=_("location"),
        help_text=_("The location of the advertisement space in textual form."),
        max_length=255,
        blank=True,
    )
    latitude = models.DecimalField(
        verbose_name="latitude",
        help_text="Latitude in format ##.######",
        max_digits=8,
        decimal_places=6,
        null=True,
        blank=True,
    )
    longitude = models.DecimalField(
        verbose_name="longitude",
        help_text="Longitude in format ###.######",
        max_digits=9,
        decimal_places=6,
        null=True,
        blank=True,
    )
    created = models.DateTimeField(verbose_name=_("created"), auto_now_add=True)

    tags = TaggableManager()

    class Meta:
        verbose_name = _("AdSpace")
        verbose_name_plural = _("AdSpaces")
        ordering = ["-created"]

    def clean(self) -> None:
        """Field-wide validation of adspace instance. Will be run even if field-level validation fails."""

        pass

    def save(self, *args, **kwargs) -> None:
        """Object create/update fields saving process."""
        super().save(*args, **kwargs)

    def __str__(self) -> str:
        return self.title
