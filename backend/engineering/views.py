from django.shortcuts import render
from rest_framework import viewsets
from engineering.serializers import ClienteSerializer, VendedorSerializer
from engineering.models import Cliente, Vendedor

class ClienteViewSet(viewsets.ModelViewSet):
    serializer_class = ClienteSerializer

    def get_queryset(self):
        queryset = Cliente.objects.all()
        if self.request.query_params.get('vendedor'):
            vendedor_id = self.request.query_params.get('vendedor', None)
            if vendedor_id.isnumeric():
                queryset = queryset.filter(vendedor=vendedor_id)
        return queryset


class VendedorViewSet(viewsets.ModelViewSet):
    queryset = Vendedor.objects.all()
    serializer_class = VendedorSerializer
