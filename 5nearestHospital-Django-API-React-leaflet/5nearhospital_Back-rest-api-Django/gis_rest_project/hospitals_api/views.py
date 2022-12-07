from django.shortcuts import render

from rest_framework import viewsets, status
from rest_framework.response import Response
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import GEOSGeometry,Point
from rest_framework.decorators import action
from django_filters import rest_framework  as filters
from . hospitals_filters import HospitalsFilter
from . models import  Hospitals,Zones
from . serializers import  HospitalsSerializer,ZonesSerializer

class ZonesViewSet(viewsets.ModelViewSet):
	serializer_class = ZonesSerializer
	queryset = Zones.objects.all()


class HospitalsViewSet(viewsets.ModelViewSet):
    serializer_class = HospitalsSerializer
    queryset = Hospitals.objects.all()
    filterset_class = HospitalsFilter
    filter_backends = [filters.DjangoFilterBackend]
   
    @action(detail=False, methods=['get'])
    def get_nearest_hospitals(self, request):
        x_coords = request.GET.get('x', None)
        y_coords = request.GET.get('y', None)
        if x_coords and y_coords:
            user_location = Point(float(x_coords), float(y_coords),srid=4326)
            nearest_five_hospitals = Hospitals.objects.annotate(distance=Distance('location',user_location)).order_by('distance')[:5]
            serializer = self.get_serializer_class()
            serialized = serializer(nearest_five_hospitals, many = True)
            print(nearest_five_hospitals)
            return Response(serialized.data, status=status.HTTP_200_OK)
        return Response(status=status.HTTP_400_BAD_REQUEST)