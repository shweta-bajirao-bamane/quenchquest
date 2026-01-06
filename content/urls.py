from django.urls import path
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
    path("objectives/", CoreObjectiveAPIView.as_view()),
    path("objectives/<int:pk>/", CoreObjectiveAPIView.as_view()),
    path("programs-home/", ProgramHomeAPIView.as_view()),
    path("programs-home/<int:pk>/", ProgramHomeAPIView.as_view()),
    path("impact/", ImpactStatAPIView.as_view()),
    path("trainings/", TrainingAPIView.as_view()),
    path("news/", NewsAPIView.as_view()),
    path("news/<int:pk>/", NewsAPIView.as_view()),
    
    # About section APIs
     path("about/", AboutAPIView.as_view()),

    # path("about/intro/", AboutIntroAPIView.as_view()),
    # path("about/objectives/", AboutObjectiveAPIView.as_view()),
    path("about/mission-vision/", MissionVisionValueAPIView.as_view()),
    path("about/leadership/", LeadershipAPIView.as_view()),
    # path("about/milestones/", MilestoneAPIView.as_view()),
    path("about/geography/", GeographyAPIView.as_view()),
    
    # Project/Impact Section APIs
    path("projects/", projectListAPIView.as_view()),
    path("projects/<int:id>/", ProjectDetailAPIView.as_view()),
    path("projects/admin/<int:id>/", ProjectAdminAPIView.as_view()),
    path("projects/admin/", ProjectAdminAPIView.as_view()),
    
    #Get Involved Section APIs
    path("donate/", DonationAPIView.as_view()),
    path("admin/donations/", DonationListAPIView.as_view()),
    path("admin/donations/<int:pk>/", DonationListAPIView.as_view()),
    path("volunteer/", VolunteerCreateAPIView.as_view(), name="become-volunteer"),
    path("corporate-partnership/", CorporatePartnershipSectionAPIView.as_view()),
    path("admin/corporate-partnership/", CorporatePartnershipSectionCreateAPIView.as_view()),
    
    # Contact Section APIs
    path("contact-card/", ContactCardAPIView.as_view()),
    path("faqs/", FAQListAPIView.as_view()),

]
