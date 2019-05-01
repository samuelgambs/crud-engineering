from rest_framework import serializers
from crud.models import Vendedor, Cliente


class VendedorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendedor
        fields = ('id', 'nome', 'cpf',)


class ClienteSerializer(serializers.ModelSerializer):
    vendedor = serializers.SlugRelatedField(
        queryset=Vendedor.objects.all(),
        slug_field='nome'
     )

    class Meta:
        model = Cliente
        fields = ('id', 'vendedor', 'nome', 'cpf', 'sexo',)
