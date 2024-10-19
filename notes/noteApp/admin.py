from django.contrib import admin
from . import models

class NoteAdmin(admin.ModelAdmin):
    list_display = ["title", "category", "created", "updated"]


# Register your models here.
admin.site.register(models.Note, NoteAdmin)