from django.contrib.gis.db import models
from django.utils.translation import gettext_lazy as _


COMMUNITY_CHOICES = [
    ('Dalhousie', 'Dalhousie'),
    ('Edgement', 'Edgement'),
    ('Brent Wood', 'Brent Wood'),
    ('Arbour Lake', 'Arbour Lakee'),
    ('Varsity', 'Varsity'),
]

LEVEL_CHOICES = [
    ('Pre-School', 'Pre-School'),
    ('Elementry', 'Elementry'),
    ('Junior High', 'Junior High'),
    ('Senior High', 'Senior High'),
]

class School(models.Model):
    name = models.CharField(_('School Name'), max_length=100, unique=True)
    community = models.CharField(max_length=30, choices=COMMUNITY_CHOICES)
    district = models.CharField(_('School Disctrict'), max_length=40, blank=True)
    level = models.CharField(_('School Level'), max_length=50, choices=LEVEL_CHOICES)
    male = models.IntegerField(_('Number of Male Students'), default=0)
    female = models.IntegerField(_('Number of Female Students'), default=0)
    capacity_availability = models.BooleanField(default=True)
    school_code = models.IntegerField(default=0)
    location = models.PointField(srid=4326)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name

    def get_school_first_name(self):
        return self.name.split()[0]