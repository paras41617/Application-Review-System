from django.contrib import admin
from .models import Candidate , Education , Experience , Link

# Register your models here.

admin.site.register(Candidate)
admin.site.register(Education)
admin.site.register(Experience)
admin.site.register(Link)