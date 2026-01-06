from django.contrib import admin

from content.models import CoreObjective, HomeHero, ImpactStat, MissionVisionValue, News, ProgramHome, Training

# Home section models
@admin.register(HomeHero)
class HomeHeroAdmin(admin.ModelAdmin):
    list_display = ('title', 'subtitle', 'description', 'primary_button', 'secondary_button', 'image', 'updated_at')
    search_fields = ('title', 'subtitle')
    ordering = ('-updated_at',)
    
@admin.register(CoreObjective)
class CoreObjectiveAdmin(admin.ModelAdmin):
    list_display = ('section', 'description', 'updated_at')
    search_fields = ('section',)
    ordering = ('-updated_at',)

@admin.register(ProgramHome)
class ProgramHomeAdmin(admin.ModelAdmin):
    list_display = ('section', 'title', 'description', 'sub_description', 'key_activities', 'target', 'icon_url', 'updated_at')
    search_fields = ('section', 'title', 'target')
    ordering = ('-updated_at',)
    
@admin.register(ImpactStat)
class ImpactStatAdmin(admin.ModelAdmin):
    list_display = ('section', 'label', 'value', 'updated_at')
    search_fields = ('section', 'label')
    ordering = ('-updated_at',)

@admin.register(Training)
class TrainingAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'updated_at')
    search_fields = ('title',)
    ordering = ('-updated_at',)

@admin.register(News)
class NewsAdmin(admin.ModelAdmin):
    list_display = ('section', 'phara', 'title', 'description', 'image', 'publish_date', 'created_at')
    search_fields = ('section', 'title')
    ordering = ('-created_at',)


# About section models

@admin.register(MissionVisionValue)
class MissionVisionValueAdmin(admin.ModelAdmin):
    list_display = ('type', 'icon_url', 'title', 'description', 'updated_at')
    search_fields = ('type', 'title')
    ordering = ('-updated_at',)