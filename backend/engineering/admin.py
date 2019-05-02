from .models import Cliente, Vendedor
from django.contrib import admin

class ClienteAdmin(admin.ModelAdmin):
    list_display = ['id','nome','cpf','sexo']

# Register your models here.
admin.site.register(Cliente, ClienteAdmin)
