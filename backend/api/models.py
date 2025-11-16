from django.contrib.auth.models import AbstractUser
from django.db import models
from django.conf import settings
from django.core.validators import MinValueValidator, MaxValueValidator


class CustomUser(AbstractUser):

    groups = models.ManyToManyField(
        'auth.Group',
        related_name='customuser_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='customuser_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    def __str__(self):
        return self.email


class Restaurante(models.Model):
    nome = models.CharField(max_length=200, db_index=True)
    endereco = models.CharField(max_length=255, blank=True)
    telefone = models.CharField(max_length=20, blank=True)
    tipo_cozinha = models.CharField(max_length=100, blank=True)
    website = models.URLField(blank=True)

    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nome


class Prato(models.Model):

    restaurante = models.ForeignKey(
        Restaurante,
        on_delete=models.CASCADE,
        related_name='pratos'
    )
    nome = models.CharField(max_length=200, db_index=True)
    descricao = models.TextField(blank=True)
    preco = models.DecimalField(
        max_digits=8, decimal_places=2, null=True, blank=True)

    data_criacao = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.nome} ({self.restaurante.nome})"


class Avaliacao(models.Model):

    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='avaliacoes'
    )
    restaurante = models.ForeignKey(
        Restaurante,
        on_delete=models.CASCADE,
        related_name='avaliacoes'
    )
    prato = models.ForeignKey(
        Prato,
        on_delete=models.CASCADE,
        related_name='avaliacoes'
    )

    nota_prato = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    nota_ambiente = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )
    nota_atendimento = models.PositiveSmallIntegerField(
        validators=[MinValueValidator(1), MaxValueValidator(5)]
    )

    comentario = models.TextField(blank=True)

    foto = models.ImageField(
        upload_to='fotos_avaliacoes/', null=True, blank=True)

    data_criacao = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-data_criacao']

    def __str__(self):
        return f"Avaliação de {self.user.username} para {self.prato.nome}"


class Lista(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='listas'
    )
    nome = models.CharField(max_length=150)
    descricao = models.TextField(blank=True)

    pratos = models.ManyToManyField(
        Prato,
        related_name='listas_onde_aparece',
        blank=True
    )

    data_criacao = models.DateTimeField(auto_now_add=True)

    class Meta:

        unique_together = ('user', 'nome')

    def __str__(self):
        return f"{self.nome} (de {self.user.username})"


class Amizade(models.Model):

    class StatusAmizade(models.TextChoices):
        SOLICITADO = 'SOLICITADO', 'Solicitado'
        ACEITO = 'ACEITO', 'Aceito'
        RECUSADO = 'RECUSADO', 'Recusado'

    de_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='amizades_enviadas'
    )

    para_user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='amizades_recebidas'
    )

    status = models.CharField(
        max_length=10,
        choices=StatusAmizade.choices,
        default=StatusAmizade.SOLICITADO
    )

    data_criacao = models.DateTimeField(auto_now_add=True)

    class Meta:

        unique_together = ('de_user', 'para_user')

    def __str__(self):
        return f"{self.de_user.username} -> {self.para_user.username} ({self.status})"
