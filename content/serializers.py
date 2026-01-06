from rest_framework import serializers
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

class HomeHeroSerializer(serializers.ModelSerializer):
    class Meta:
        model = HomeHero
        fields = "__all__"


class CoreObjectiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = CoreObjective
        fields = "__all__"


class ProgramSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProgramHome
        # fields = "__all__"
        fields = ['id', 'section', 'description', 'title', 'sub_description', 'key_activities', 'target', 'icon_url']
        extra_kwargs = {
            'key_activities': {'required': False, 'allow_null': True},
            'target': {'required': False, 'allow_null': True},
            'icon_url': {'required': False, 'allow_null': True},
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

# class AboutIntroSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AboutIntro
#         fields = "__all__"

# class AboutObjectiveSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = AboutObjective
#         fields = "__all__"

class MissionVisionValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = MissionVisionValue
        fields = "__all__"

class LeadershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Leadership
        fields = "__all__"

# class MilestoneSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Milestone
#         fields = "__all__"

class GeographySerializer(serializers.ModelSerializer):
    class Meta:
        model = Geography
        fields = "__all__"
        
# Project/Impact Section Serializers

class ProjectSerializer(serializers.ModelSerializer):
    category = serializers.CharField(source='category.name', read_only=True)
    
    class Meta:
        model = Project
        fields = "__all__"
        
        
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
class ContactCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactCard
        fields = "__all__"

class FAQSerializer(serializers.ModelSerializer):
    class Meta:
        model = FAQ
        fields = "__all__"