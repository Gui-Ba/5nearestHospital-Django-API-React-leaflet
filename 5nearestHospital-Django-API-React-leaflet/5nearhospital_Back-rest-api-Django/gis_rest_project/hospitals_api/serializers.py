from rest_framework_gis.serializers import GeoFeatureModelSerializer
from rest_framework import serializers

from .models import  Hospitals,Zones

class ZonesSerializer(GeoFeatureModelSerializer):

	class Meta:
		model = Zones
		fields = '__all__'
		geo_field = 'location'

    
class HospitalsSerializer(GeoFeatureModelSerializer):
    	
	distance = serializers.CharField(default=0)

	class Meta:
		model = Hospitals
		fields = '__all__'
		geo_field = 'location'
		read_only_fields = ['distance']