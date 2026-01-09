from rest_framework import serializers
from .models import Modalidad, Carrera
import re

class ModalidadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Modalidad
        fields = ['id', 'nombre', 'estado']
    
    def validate_nombre(self, value):
        if not value or value.strip() == '':
            raise serializers.ValidationError("El nombre no puede estar vacío.")
        
        if not re.match(r'^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-]+$', value):
            raise serializers.ValidationError(
                "El nombre solo puede contener letras y guiones."
            )
        
        # Validar longitud mínima
        if len(value.strip()) < 3:
            raise serializers.ValidationError("El nombre debe tener al menos 3 caracteres.")
        
        # Validar duplicados en creación
        if self.instance is None:
            if Modalidad.objects.filter(nombre__iexact=value).exists():
                raise serializers.ValidationError("Ya existe una modalidad con este nombre.")
        # Validar duplicados en actualización
        else:
            if Modalidad.objects.filter(nombre__iexact=value).exclude(pk=self.instance.pk).exists():
                raise serializers.ValidationError("Ya existe una modalidad con este nombre.")
        
        return value.strip()


class CarreraSerializer(serializers.ModelSerializer):
    modalidad_nombre = serializers.CharField(source='modalidad.nombre', read_only=True)
    
    class Meta:
        model = Carrera
        fields = ['id', 'nombre', 'modalidad', 'modalidad_nombre', 'estado']
    
    def validate_nombre(self, value):
        if not value or value.strip() == '':
            raise serializers.ValidationError("El nombre no puede estar vacío.")
        
        if not re.match(r'^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s\-]+$', value):
            raise serializers.ValidationError(
                "El nombre solo puede contener letras."
            )

        if len(value.strip()) < 3:
            raise serializers.ValidationError("El nombre debe tener al menos 3 caracteres.")
        
        # Validar duplicados en creación
        if self.instance is None:
            if Carrera.objects.filter(nombre__iexact=value).exists():
                raise serializers.ValidationError("Ya existe una carrera con este nombre.")
        # Validar duplicados en actualización
        else:
            if Carrera.objects.filter(nombre__iexact=value).exclude(pk=self.instance.pk).exists():
                raise serializers.ValidationError("Ya existe una carrera con este nombre.")
        
        return value.strip()
    
    def validate_modalidad(self, value):
        if not value.estado:
            raise serializers.ValidationError("No se puede asignar una modalidad inactiva.")
        return value