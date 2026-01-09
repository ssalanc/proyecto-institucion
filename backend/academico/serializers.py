from rest_framework import serializers
from .models import Modalidad, Carrera
import re

class NombreValidationMixin:
    def validate_nombre_logic(self, value, model_class):
        # 1. Limpieza y validación de vacío
        nombre = value.strip() if value else ""
        if not nombre:
            raise serializers.ValidationError("El nombre no puede estar vacío.")
        
        # 2. REGEX: Solo letras, espacios y guiones
        if not re.match(r'^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-]+$', nombre):
            raise serializers.ValidationError("El nombre solo puede contener letras y guiones.")
        
        # 3. Longitud mínima
        if len(nombre) < 3:
            raise serializers.ValidationError("El nombre debe tener al menos 3 caracteres.")

        queryset = model_class.objects.filter(nombre__iexact=nombre)
        if self.instance:
            queryset = queryset.exclude(pk=self.instance.pk)
            
        if queryset.exists():
            raise serializers.ValidationError(f"Ya existe un registro con el nombre '{nombre}'.")
            
        return nombre

class ModalidadSerializer(NombreValidationMixin, serializers.ModelSerializer):
    class Meta:
        model = Modalidad
        fields = ['id', 'nombre', 'estado']
    
    def validate_nombre(self, value):
        return self.validate_nombre_logic(value, Modalidad)

class CarreraSerializer(NombreValidationMixin, serializers.ModelSerializer):
    modalidad_nombre = serializers.CharField(source='modalidad.nombre', read_only=True)
    
    class Meta:
        model = Carrera
        fields = ['id', 'nombre', 'modalidad', 'modalidad_nombre', 'estado']
    
    def validate_nombre(self, value):
        return self.validate_nombre_logic(value, Carrera)
    
    def validate_modalidad(self, value):
        if not value.estado:
            raise serializers.ValidationError("No se puede asignar una modalidad inactiva.")
        return value