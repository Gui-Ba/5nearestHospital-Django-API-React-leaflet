from django.contrib import admin

from django.contrib.gis.admin import OSMGeoAdmin
from .models import Hospitals,Zones

@admin.register(Hospitals)
class HospitalsAdmin(OSMGeoAdmin):
    list_display = ('name', 'location','city')

#admin.site.register(Zones, admin.ModelAdmin)
admin.site.register(Zones, OSMGeoAdmin)
