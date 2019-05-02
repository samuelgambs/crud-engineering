from django.test import TestCase

import unittest
from engineering.models import Vendedor

class VendedorTestCase(unittest.TestCase):
    def setUp(self):
        self.me = Vendedor.objects.create(nome="samuel dias", cpf="060.904.930-58")
        self.other = Vendedor.objects.create(nome="Edson Arantes", cpf="014.497.380-44")
