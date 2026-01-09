from django_filters import rest_framework as filters
from .models import Carrera, Modalidad

class ModalidadFilter(filters.FilterSet):
    nombre = filters.CharFilter(lookup_expr='icontains')
    
    class Meta:
        model = Modalidad
        fields = ['estado', 'nombre']


class CarreraFilter(filters.FilterSet):
    nombre = filters.CharFilter(lookup_expr='icontains')
    
    class Meta:
        model = Carrera
        fields = ['estado', 'modalidad', 'nombre']