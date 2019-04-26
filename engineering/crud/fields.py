from django.db.models import CharField


class CPFField(CharField):
    max_length = 11


class NameField(CharField):
    max_length = 50


class GenderField(CharField):
    choices = (('f', 'feminino'), ('m', 'masculino'))
    max_length = 1
    null = blank = True