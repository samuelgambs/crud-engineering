from django.db import models



class Vendedor(models.Model):
    nome = models.CharField(max_length=50)
    cpf = models.CharField(max_length=11)

    def __str__(self):
        return self.nome


class Cliente(models.Model):
    vendedor = models.ForeignKey(Vendedor, on_delete=models.CASCADE)
    nome = models.CharField(max_length=50)
    cpf = models.CharField(max_length=11)
    sexo = models.CharField(
        max_length=1, choices=(('f', 'feminino'), ('m', 'masculino')), null=True, blank=True    )

    def __str__(self):
        return self.nome