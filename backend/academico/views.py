from rest_framework import viewsets
from .models import Modalidad, Carrera
from .serializers import ModalidadSerializer, CarreraSerializer
from .filters import ModalidadFilter, CarreraFilter

class ModalidadViewSet(viewsets.ModelViewSet):
    queryset = Modalidad.objects.all()
    serializer_class = ModalidadSerializer
    filterset_class = ModalidadFilter
    search_fields = ['nombre']
    ordering_fields = ['nombre', 'estado']

class CarreraViewSet(viewsets.ModelViewSet):
    queryset = Carrera.objects.select_related('modalidad').all()
    serializer_class = CarreraSerializer
    filterset_class = CarreraFilter
    search_fields = ['nombre', 'modalidad__nombre']
    ordering_fields = ['nombre', 'estado', 'modalidad__nombre']