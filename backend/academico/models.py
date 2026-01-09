from django.db import models

class Modalidad(models.Model):
    nombre = models.CharField(
        max_length=100, 
        unique=True,
        error_messages={
            'unique': 'Ya existe una modalidad con este nombre.'  
        }
    )
    estado = models.BooleanField(default=True)

    class Meta:
        db_table = 'modalidad'
        verbose_name = 'Modalidad'
        verbose_name_plural = 'Modalidades'
        ordering = ['nombre']

    def __str__(self):
        return self.nombre

    def clean(self):
        if self.nombre:
            self.nombre = self.nombre.strip()
        if not self.nombre or self.nombre == '':
            from django.core.exceptions import ValidationError
            raise ValidationError({'nombre': 'El nombre no puede estar vacío.'})
        
        # Validar duplicados (case insensitive)
        if Modalidad.objects.filter(nombre__iexact=self.nombre).exclude(pk=self.pk).exists():
            from django.core.exceptions import ValidationError
            raise ValidationError({'nombre': 'Ya existe una modalidad con este nombre.'})

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


class Carrera(models.Model):
    nombre = models.CharField(
        max_length=150, 
        unique=True,
        error_messages={
            'unique': 'Ya existe una carrera con este nombre.'  
        }
    )
    modalidad = models.ForeignKey(Modalidad, on_delete=models.CASCADE, related_name='carreras')
    estado = models.BooleanField(default=True)

    class Meta:
        db_table = 'carrera'
        verbose_name = 'Carrera'
        verbose_name_plural = 'Carreras'
        ordering = ['nombre']

    def __str__(self):
        return f"{self.nombre} - {self.modalidad.nombre}"

    def clean(self):
        if self.nombre:
            self.nombre = self.nombre.strip()
        if not self.nombre or self.nombre == '':
            from django.core.exceptions import ValidationError
            raise ValidationError({'nombre': 'El nombre no puede estar vacío.'})
        
        # Validar duplicados (case insensitive)
        if Carrera.objects.filter(nombre__iexact=self.nombre).exclude(pk=self.pk).exists():
            from django.core.exceptions import ValidationError
            raise ValidationError({'nombre': 'Ya existe una carrera con este nombre.'})

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)