from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField
import base64
from django.core.files.base import ContentFile
from .models import *

class PageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Page
        fields = "__all__"


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = Program
        fields = "__all__"


class FocusAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FocusArea
        fields = "__all__"


class HomepageSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomepageSection
        fields = "__all__"


class TrainingContentSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrainingContent
        fields = "__all__"


# Home page sections

# class HomeHeroSerializer(serializers.ModelSerializer):
#     image = serializers.SerializerMethodField()
#     class Meta:
#         model = HomeHero
#         fields = "__all__"
        
#     def get_image(self, obj):
#         request = self.context.get("request")
#         if obj.image and request:
#             return request.build_absolute_uri(obj.image.url)
#         return None
class HomeHeroSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(required=False)

    class Meta:
        model = HomeHero
        fields = "__all__"
        
class WhoWeAreSerializer(serializers.ModelSerializer):
    class Meta:
        model = WhoWeAre
        fields = "__all__"


class CoreObjectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreObjective
        fields = "__all__"


class ProgramHomeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramHome
        # fields = "__all__"
        fields = ['id', 'section', 'description', 'title', 'sub_description', 'key_activities', 'target', ]
        extra_kwargs = {
            'key_activities': {'required': False, 'allow_null': True},
            'target': {'required': False, 'allow_null': True},
        }


class ImpactStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImpactStat
        fields = "__all__"


class TrainingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Training
        fields = "__all__"


class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = "__all__"
        
# About us Section

class AboutIntroSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutIntro
        fields = "__all__"

class AboutWhoWeAreSerializer(serializers.ModelSerializer):
    class Meta:
        model = AboutWhoWeAre
        fields = "__all__"

class MissionVisionValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = MissionVisionValue
        fields = "__all__"
        
class CoreObjectivesSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreObjectives
        fields = "__all__"

class LeadershipSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Leadership
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
    
class SliderImageSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = SliderImage
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
    
class PartnersSerializer(serializers.ModelSerializer):
    image1_url = serializers.SerializerMethodField()
    image2_url = serializers.SerializerMethodField()
    image3_url = serializers.SerializerMethodField()
    image4_url = serializers.SerializerMethodField()
    image5_url = serializers.SerializerMethodField()
    image6_url = serializers.SerializerMethodField()

    class Meta:
        model = Partners
        fields = "__all__"

    def _get_image_url(self, obj, field_name):
        request = self.context.get("request")
        image = getattr(obj, field_name)
        if image and request:
            return request.build_absolute_uri(image.url)
        return None

    def get_image1_url(self, obj): return self._get_image_url(obj, "image1")
    def get_image2_url(self, obj): return self._get_image_url(obj, "image2")
    def get_image3_url(self, obj): return self._get_image_url(obj, "image3")
    def get_image4_url(self, obj): return self._get_image_url(obj, "image4")
    def get_image5_url(self, obj): return self._get_image_url(obj, "image5")
    def get_image6_url(self, obj): return self._get_image_url(obj, "image6")

# class MilestoneSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Milestone
#         fields = "__all__"

class GeographySerializer(serializers.ModelSerializer):
    class Meta:
        model = Geography
        fields = "__all__"
        
        
# Program page Serializers
class ProgramIntroSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramIntro
        fields = "__all__"
        
class ProgramCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramCard
        fields = "__all__"
        
class ProgramSliderSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = ProgramSlider
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
    
class ProgramMissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramMission
        fields = "__all__"
        
# Project/Impact Section Serializers

class ProjectCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectCategory
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False)
    category_name = serializers.CharField(source="category.name", read_only=True)
    category_slug = serializers.CharField(source="category.slug", read_only=True)
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = "__all__"

    def get_image_url(self, obj):
        request = self.context.get("request")
        if obj.image and request:
            return request.build_absolute_uri(obj.image.url)
        return None
        
        
# Get Involved Section Serializers

class DonationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Donation
        fields = "__all__"
        
class VolunteerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Volunteer
        fields = "__all__"
        
class CorporatePartnershipSectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorporatePartnershipSection
        fields = "__all__"
        
# Contact Section Serializer
class ContactHeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactHeader
        fields = "__all__"

class ContactCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactCard
        fields = "__all__"

class ContactDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactDetail
        fields = "__all__"

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = "__all__"