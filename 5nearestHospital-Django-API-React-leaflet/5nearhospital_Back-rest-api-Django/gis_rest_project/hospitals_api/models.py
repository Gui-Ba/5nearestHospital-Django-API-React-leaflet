from django.contrib.gis.db import models

class Hospitals(models.Model):
    location = models.PointField(blank=True, null=True)
    city = models.CharField(db_column='addr:city', max_length=255, blank=True, null=True)  # Field renamed to remove unsuitable characters.
    street = models.CharField(db_column='addr:street', max_length=255, blank=True, null=True)  # Field renamed to remove unsuitable characters.
    name = models.CharField(max_length=255, blank=True, null=True)
    contact_phone = models.CharField(db_column='contact:phone', max_length=255, blank=True, null=True)  # Field renamed to remove unsuitable characters.

    class Meta:
        managed = True
        db_table = 'hospitals'

class Zones(models.Model):
    location = models.MultiPolygonField(blank=True, null=True)
    name_zone = models.CharField(max_length=50, blank=True, null=True)
    id_zone = models.CharField(max_length=3, blank=True, null=True)

    class Meta:
        managed = True
        db_table = 'zones'
