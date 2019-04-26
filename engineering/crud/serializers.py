from rest_framework.serializers import ModelSerializer
from crud.models import Vendedor, Cliente


class VendedorSerializer(ModelSerializer):
    class Meta:
        model = Vendedor
        fields = ('id', 'nome', 'cpf', )


class ClienteSerializer(ModelSerializer):
    class Meta:
        model = Cliente
        fields = ('id', 'vendedor', 'nome', 'cpf', 'sexo', )