from pathlib import Path
from django.contrib.gis.utils import LayerMapping
from .models import Zones

mapping = {
            'id_zone':'reg_code',
            'location': 'multipolygon',
            'name_zone' : 'reg_name' }


regions_shp =Path(__file__).resolve().parent / 'data' / 'regions.shp'


def run(verbose=True):
    lm = LayerMapping(Zones, regions_shp, mapping, transform=False,encoding='utf-8')
    lm.save(strict=True, verbose=verbose)
