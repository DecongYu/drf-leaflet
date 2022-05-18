from django.contrib import admin

from leaflet.admin import LeafletGeoAdmin

from .models import School


class SchoolAdmin(LeafletGeoAdmin):
    list_display = ['name', 'community', 'district', 'level', 'male', 'female']

admin.site.register(School, SchoolAdmin)