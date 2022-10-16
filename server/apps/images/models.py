from django.db import models


class AdSpaceImage(models.Model):
    """Model representing adspaceimage. Fat model pattern (API/admin)."""

    id = models.BigAutoField(verbose_name="ID", primary_key=True)
    image = models.ImageField(
        verbose_name="space image",
        upload_to="adspace_images",
        max_length=255,
    )
    space = models.ForeignKey(
        verbose_name="Advertisement space",
        to="spaces.AdSpace",
        on_delete=models.CASCADE,
        related_name="images",
    )

    class Meta:
        verbose_name = "Advertisement space image"
        verbose_name_plural = "Advertisement space images"

    def __str__(self) -> str:
        return self.id
