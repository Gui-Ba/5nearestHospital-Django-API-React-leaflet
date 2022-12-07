from rest_framework_gis.filterset import GeoFilterSet
from rest_framework_gis.filters import GeometryFilter
from django_filters import filters
from .models import Hospitals,Zones

class HospitalsFilter(GeoFilterSet):
    zone = filters.CharFilter(method= 'get_hospitals_by_zone')


    class Meta:
        model = Hospitals
        exclude = ['location']

    def get_hospitals_by_zone(self, queryset, name, value ):
        #query_ = Zones.objects.filter(pk=value)
        query_ = Zones.objects.filter(id_zone=value)
        if query_:
            obj = query_.first()
            return queryset.filter(location__within = obj.location)
        return queryset