from django.db import models

class Cliente(models.models):
    nome = models.CharField(max_length=30)
    cpf = models.CharField(max_length=30)
    sexo = models.CharField(max_length=30)


# Create your models here.
