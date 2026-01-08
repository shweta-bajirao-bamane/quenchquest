from django.contrib import admin

from content.models import FAQ, AboutIntro, AboutWhoWeAre, ContactCard, ContactDetail, ContactHeader, CoreObjective, CoreObjectives, CorporatePartnershipSection, Events, HomeHero, ImpactStat, Leadership, MissionVisionValue, News, Partners, ProgramCard, ProgramHome, ProgramIntro, ProgramMission, ProgramSlider, Project, ProjectCategory, SliderImage, Training, Volunteer

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
    list_display = ('section', 'title', 'description', 'sub_description', 'key_activities', 'target', 'updated_at')
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

# ==================================================================================
# About section models

# -------------------- About Intro --------------------
@admin.register(AboutIntro)
class AboutIntroAdmin(admin.ModelAdmin):
    list_display = ("section", "description")
    search_fields = ("section",)
    ordering = ("section",)


# -------------------- About Who We Are --------------------
@admin.register(AboutWhoWeAre)
class AboutWhoWeAreAdmin(admin.ModelAdmin):
    list_display = ("section", "updated_at")
    search_fields = ("section",)
    ordering = ("-updated_at",)


# -------------------- Mission / Vision / Value --------------------
@admin.register(MissionVisionValue)
class MissionVisionValueAdmin(admin.ModelAdmin):
    list_display = ("type", "title", "description", "updated_at")
    search_fields = ("type", "title")
    list_filter = ("type",)
    ordering = ("-updated_at",)


# -------------------- Core Objectives --------------------
@admin.register(CoreObjectives)
class CoreObjectivesAdmin(admin.ModelAdmin):
    list_display = ("section", "description", "updated_at")
    search_fields = ("section",)
    ordering = ("-updated_at",)


# -------------------- Leadership --------------------
@admin.register(Leadership)
class LeadershipAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "designation",
        "section",
        "updated_at"
    )
    search_fields = ("name", "designation", "section")
    ordering = ("-updated_at",)


# -------------------- Slider Images --------------------
@admin.register(SliderImage)
class SliderImageAdmin(admin.ModelAdmin):
    list_display = ("title", "slider", "updated_at")
    search_fields = ("title",)
    list_filter = ("slider",)
    ordering = ("slider", "-updated_at")


# -------------------- Partners --------------------
@admin.register(Partners)
class PartnersAdmin(admin.ModelAdmin):
    list_display = ("section", "updated_at")
    search_fields = ("section",)
    ordering = ("-updated_at",)
    
# ==================================================================================  
# -------------------- Program Intro --------------------
@admin.register(ProgramIntro)
class ProgramIntroAdmin(admin.ModelAdmin):
    list_display = ("section", "updated_at")
    search_fields = ("section",)
    ordering = ("-updated_at",)


# -------------------- Program Card --------------------
@admin.register(ProgramCard)
class ProgramCardAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "activities",
        "target",
        "updated_at"
    )
    search_fields = ("title", "activities", "target")
    ordering = ("-updated_at",)


# -------------------- Program Slider --------------------
@admin.register(ProgramSlider)
class ProgramSliderAdmin(admin.ModelAdmin):
    list_display = ("title", "slider", "updated_at")
    search_fields = ("title",)
    list_filter = ("slider",)
    ordering = ("slider", "-updated_at")


# -------------------- Program Mission --------------------
@admin.register(ProgramMission)
class ProgramMissionAdmin(admin.ModelAdmin):
    list_display = ("section", "updated_at")
    search_fields = ("section",)
    ordering = ("-updated_at",)
    
    
# ==================================================================================
# Project/Impact section models

# -------------------- Project Category --------------------
@admin.register(ProjectCategory)
class ProjectCategoryAdmin(admin.ModelAdmin):
    list_display = ("name", "slug")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name",)
    ordering = ("name",)


# -------------------- Project --------------------
@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "tag",
        "created_at",
        "updated_at"
    )
    list_filter = ("category", "created_at")
    search_fields = ("title", "tag", "category__name")
    ordering = ("-created_at",)
    
# ===================================================================================
# Get Involved section models

# -------------------- Volunteer --------------------
@admin.register(Volunteer)
class VolunteerAdmin(admin.ModelAdmin):
    list_display = (
        "full_name",
        "email",
        "phone_number",
        "preferred_location",
        "created_at"
    )
    search_fields = ("full_name", "email", "phone_number", "preferred_location")
    ordering = ("-created_at",)


# -------------------- Corporate Partnership Section --------------------
@admin.register(CorporatePartnershipSection)
class CorporatePartnershipSectionAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "section",
        "order",
        "created_at",
        "updated_at"
    )
    search_fields = ("title", "section")
    ordering = ("order", "-updated_at")


# -------------------- Events --------------------
@admin.register(Events)
class EventsAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "tag",
        "event_date",
        "location"
    )
    list_filter = ("event_date", "location")
    search_fields = ("title", "tag", "location")
    ordering = ("-event_date",)
    
    
# ===================================================================================
# Contact section models
# -------------------- Contact Header --------------------
@admin.register(ContactHeader)
class ContactHeaderAdmin(admin.ModelAdmin):
    list_display = (
        "section",
        "updated_at",
    )
    search_fields = ("section",)
    ordering = ("-updated_at",)


# -------------------- Contact Card --------------------
@admin.register(ContactCard)
class ContactCardAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "icon_key",
        "updated_at",
    )
    search_fields = ("title", "icon_key")
    ordering = ("-updated_at",)


# -------------------- Contact Detail --------------------
@admin.register(ContactDetail)
class ContactDetailAdmin(admin.ModelAdmin):
    list_display = (
        "section",
        "phone",
        "email",
        "updated_at",
    )
    search_fields = ("section", "phone", "email")
    ordering = ("-updated_at",)


# -------------------- FAQ --------------------
@admin.register(FAQ)
class FAQAdmin(admin.ModelAdmin):
    list_display = (
        "question",
        "section",
        "order",
        "is_active",
        "updated_at",
    )
    list_filter = ("is_active", "section")
    search_fields = ("question", "answer")
    ordering = ("order", "-updated_at")