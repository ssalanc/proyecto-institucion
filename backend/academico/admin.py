from django.contrib import admin
from .models import Modalidad, Carrera

@admin.register(Modalidad)
class ModalidadAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre', 'estado']
    list_filter = ['estado']
    search_fields = ['nombre']

@admin.register(Carrera)
class CarreraAdmin(admin.ModelAdmin):
    list_display = ['id', 'nombre', 'modalidad', 'estado']
    list_filter = ['estado', 'modalidad']
    search_fields = ['nombre', 'modalidad__nombre']