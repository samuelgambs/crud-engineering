from rest_framework import routers
from crud.views import ClienteViewSet, VendedorViewSet


router = routers.SimpleRouter()
router.register(r'clientes', ClienteViewSet, basename='cliente')
router.register(r'vendedores', VendedorViewSet)
urlpatterns = router.urls