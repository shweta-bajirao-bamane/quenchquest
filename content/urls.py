from django.urls import path

from django.conf import settings
from django.conf.urls.static import static
from .views import *

urlpatterns = [
    path("pages/", PageAPIView.as_view()),
    path("pages/<int:pk>/", PageDetailAPIView.as_view()),

    path("programs/", ProgramAPIView.as_view()),
    path("programs/<int:pk>/", ProgramAPIView.as_view()),
    path("focus-areas/", FocusAreaAPIView.as_view()),

    path("homepage-sections/", HomepageSectionAPIView.as_view()),
    path("trainings/", TrainingContentAPIView.as_view()),
    
    
    # Home section APIs
    path("home/", HomeAPIView.as_view()),

    path("hero/", HomeHeroAPIView.as_view()),
    path("hero/<int:pk>/", HomeHeroAPIView.as_view()),
    path("who-we-are/", WhoWeAreAPIView.as_view()),
    path("who-we-are/<int:pk>/", WhoWeAreAPIView.as_view()),
    path("objectives/", CoreObjectiveAPIView.as_view()),
    path("objectives/<int:pk>/", CoreObjectiveAPIView.as_view()),
    path("programs-home/", ProgramHomeAPIView.as_view()),
    path("programs-home/<int:pk>/", ProgramHomeAPIView.as_view()),
    path("impact/", ImpactStatAPIView.as_view()),
    path("impact/<int:pk>/", ImpactStatAPIView.as_view()),
    path("trainings/", TrainingAPIView.as_view()),
    path("news/", NewsAPIView.as_view()),
    path("news/<int:pk>/", NewsAPIView.as_view()),
    
    # About section APIs
    path("about/", AboutAPIView.as_view()),
    path("intro/", AboutIntroAPIView.as_view()),
    path("intro/<int:pk>/", AboutIntroAPIView.as_view()),
    path("about/who-we-are/", AboutWhoWeAreAPIView.as_view()),
    path("about/who-we-are/<int:pk>/", AboutWhoWeAreAPIView.as_view()),
    path("coreobjectives/", CoreObjectivesAPIView.as_view()),
    path("coreobjectives/<int:pk>/", CoreObjectivesAPIView.as_view()),
    path("mission-vision/", MissionVisionValueAPIView.as_view()),
    path("mission-vision/<int:pk>/", MissionVisionValueAPIView.as_view()),
    path("leadership/", LeadershipAPIView.as_view()),
    path("leadership/<int:pk>/", LeadershipAPIView.as_view()),
    path("sliders/", SliderImageAPIView.as_view()),
    path("sliders/<int:pk>/", SliderImageAPIView.as_view()),
    path("partners/", PartnersAPIView.as_view()),
    path("partners/<int:pk>/", PartnersAPIView.as_view()),
    # path("about/milestones/", MilestoneAPIView.as_view()),
    path("geography/", GeographyAPIView.as_view()),
    
    # Program Section APIs
    path("program-intro/", ProgramIntroAPIView.as_view()),
    path("program-intro/<int:pk>/", ProgramIntroAPIView.as_view()),
    path("program-cards/", ProgramCardAPIView.as_view()),          
    path("program-cards/<int:pk>/", ProgramCardAPIView.as_view()),
    path("program-sliders/", ProgramSliderAPIView.as_view()),          
    path("program-sliders/<int:pk>/", ProgramSliderAPIView.as_view()),
    path("program-mission/", ProgramMissionAPIView.as_view()),
    path("program-mission/<int:pk>/", ProgramMissionAPIView.as_view()),

    # Project/Impact Section APIs
    # path("projects/", projectListAPIView.as_view()),
    # path("projects/<int:id>/", ProjectDetailAPIView.as_view()),
    # path("projects/admin/<int:id>/", ProjectAdminAPIView.as_view()),
    # path("projects/admin/", ProjectAdminAPIView.as_view()),
    path("project-categories/", ProjectCategoryAPIView.as_view()),
    path("projects/", ProjectAPIView.as_view()),
    path("projects/<int:pk>/", ProjectAPIView.as_view()),
    
    
    #Get Involved Section APIs
    path("donate/", DonationAPIView.as_view()),
    path("donations/", DonationListAPIView.as_view()),
    path("admin/donations/<int:pk>/", DonationListAPIView.as_view()),
    path("volunteer/", VolunteerCreateAPIView.as_view(), name="become-volunteer"),
    path("corporate-partnership/", CorporatePartnershipSectionAPIView.as_view()),
    path("corporate-partnership/<int:pk>/", CorporatePartnershipSectionAPIView.as_view()),
    path("events/", EventsAPIView.as_view()),
    path("events/<int:pk>/", EventsAPIView.as_view()),
    
    # Contact Section APIs
    path("contact-header/", ContactHeaderAPIView.as_view()),
    path("contact-header/<int:pk>/", ContactHeaderAPIView.as_view()),
    path("contact-card/", ContactCardAPIView.as_view()),
    path("contact-card/<int:pk>/", ContactCardAPIView.as_view()),
    path("contact-detail/", ContactDetailAPIView.as_view()),
    path("contact-detail/<int:pk>/", ContactDetailAPIView.as_view()),
    path("faqs/", FAQListAPIView.as_view()),
    path("faqs/<int:pk>/", FAQListAPIView.as_view()),

]

if settings.DEBUG:
    urlpatterns += static(
        settings.MEDIA_URL,
        document_root=settings.MEDIA_ROOT
    )
