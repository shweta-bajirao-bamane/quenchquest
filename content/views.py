from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser,AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics

from content.permissions import IsSuperUser
from .models import *
from .serializers import *

class PageAPIView(APIView):
    "Fetch and create pages"
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]

    
    def get(self, request):
        pages = Page.objects.all()
        serializer = PageSerializer(pages, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=201)
        return Response(serializer.errors, status=400)


class PageDetailAPIView(APIView):
    "Retrieve, update, delete a page"
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]

    def put(self, request, pk):
        page = Page.objects.get(pk=pk)
        serializer = PageSerializer(page, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        try:
            page = Page.objects.get(pk=pk)
            page.delete()
            return Response(
                {"message": "Page deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except Page.DoesNotExist:
            return Response(
                {"error": "This page is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )
    
# Program API Views
class ProgramAPIView(APIView):
    "Fetch and create programs, update program details"
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]
    
    
    def get(self, request):
        serializer = ProgramSerializer(Program.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProgramSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)
    
    def put(self, request, pk):
        program = Program.objects.get(pk=pk)
        serializer = ProgramSerializer(program, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class FocusAreaAPIView(APIView):
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]

    def get(self, request):
        serializer = FocusAreaSerializer(FocusArea.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FocusAreaSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)


class HomepageSectionAPIView(APIView):
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]

    def get(self, request):
        serializer = HomepageSectionSerializer(HomepageSection.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = HomepageSectionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)

class TrainingContentAPIView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        serializer = TrainingContentSerializer(TrainingContent.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TrainingContentSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)
    
    
# single home api

class HomeAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            "hero": HomeHeroSerializer(HomeHero.objects.first()).data,
            "objectives": CoreObjectiveSerializer(CoreObjective.objects.all(), many=True).data,
            "programs": ProgramSerializer(Program.objects.all(), many=True).data,
            "impact_numbers": ImpactStatSerializer(ImpactStat.objects.all(), many=True).data,
            "trainings": TrainingSerializer(Training.objects.all(), many=True).data,
            "latest_news": NewsSerializer(News.objects.order_by("-created_at")[:3], many=True).data
        })
        
class HomeHeroAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsSuperUser]

    def post(self, request):
        serializer = HomeHeroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        hero = HomeHero.objects.get(pk=pk)
        serializer = HomeHeroSerializer(hero, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            hero = HomeHero.objects.get(pk=pk)
            hero.delete()
            return Response(
                {"message": "Home hero deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except HomeHero.DoesNotExist:
            return Response(
                {"error": "This home hero is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )

class CoreObjectiveAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsSuperUser]

    def post(self, request):
        serializer = CoreObjectiveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        objective = CoreObjective.objects.get(pk=pk)
        serializer = CoreObjectiveSerializer(objective, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            objective = CoreObjective.objects.get(pk=pk)
            objective.delete()
            return Response(
                {"message": "Core objective deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except CoreObjective.DoesNotExist:
            return Response(
                {"error": "This core objective is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )

class ProgramHomeAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsSuperUser]
    # permission_classes = [IsAdminUser]
    # permission_classes = [AllowAny]

    def post(self, request):
        serializer = ProgramSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, 201)
        return Response(serializer.errors, 400)
    
    def put(self, request, pk):
        program = Program.objects.get(pk=pk)
        serializer = ProgramSerializer(program, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, 200)
        return Response(serializer.errors, 400)
    
    def delete(self, request, pk):
        try:
            ProgramHome = Program.objects.get(pk=pk)
            ProgramHome.delete()
            return Response(
                {"message": "Program deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except Program.DoesNotExist:
            return Response(
                {"error": "This program is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )

class ImpactStatAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsSuperUser]

    def post(self, request):
        serializer = ImpactStatSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        impact_stat = ImpactStat.objects.get(pk=pk)
        serializer = ImpactStatSerializer(impact_stat, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk):
        try:
            impact_stat = ImpactStat.objects.get(pk=pk)
            impact_stat.delete()
            return Response(
                {"message": "Impact stat deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except ImpactStat.DoesNotExist:
            return Response(
                {"error": "This impact stat is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )

class TrainingAPIView(APIView):
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = TrainingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, 201)
        return Response(serializer.errors, 400)


class NewsAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsSuperUser]
    # permission_classes = [IsAdminUser]
    # permission_classes = [AllowAny]

    def post(self, request):
        serializer = NewsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, 201)
        return Response(serializer.errors, 400)
    
    def put(self, request, pk):
        news = News.objects.get(pk=pk)
        serializer = NewsSerializer(news, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, 200)
        return Response(serializer.errors, 400)
    
    def delete(self, request, pk):
        try:
            news = News.objects.get(pk=pk)
            news.delete()
            return Response(
                {"message": "News deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except News.DoesNotExist:
            return Response(
                {"error": "This news is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )


# -------------About us Section--------------
class AboutAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({
            # "intro": AboutIntroSerializer(AboutIntro.objects.first()).data,
            # "objectives": AboutObjectiveSerializer(AboutObjective.objects.all(), many=True).data,
            "objectives": CoreObjectiveSerializer(CoreObjective.objects.all(), many=True).data,
            "mission_vision_values": MissionVisionValueSerializer(MissionVisionValue.objects.all(), many=True).data,
            "leadership": LeadershipSerializer(Leadership.objects.all(), many=True).data,
            # "milestones": MilestoneSerializer(Milestone.objects.all(), many=True).data,
            "geography": GeographySerializer(Geography.objects.first()).data
        })

# class AboutIntroAPIView(APIView):
#     permission_classes = [IsAdminUser]

#     def post(self, request):
#         serializer = AboutIntroSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)

# class AboutObjectiveAPIView(APIView):
#     permission_classes = [IsAdminUser]

#     def post(self, request):
#         serializer = AboutObjectiveSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)

class MissionVisionValueAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsSuperUser]

    def post(self, request):
        serializer = MissionVisionValueSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

class LeadershipAPIView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = LeadershipSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

# class MilestoneAPIView(APIView):
#     permission_classes = [IsAdminUser]

#     def post(self, request):
#         serializer = MilestoneSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)

class GeographyAPIView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = GeographySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

# Project/Impact Section API Views

class projectListAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        category = request.GET.get("category")
        queryset = Project.objects.filter(is_active=True)

        if category:
            queryset = queryset.filter(category__slug=category)

        serializer = ProjectSerializer(queryset, many=True)
        return Response(serializer.data)
    
class ProjectDetailAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, pk):
        try:
            project = Project.objects.get(pk=pk, is_active=True)
            serializer = ProjectSerializer(project)
            return Response(serializer.data)
        except Project.DoesNotExist:
            return Response(
                {"error": "Project not found"},
                status=status.HTTP_404_NOT_FOUND
            )
            
class ProjectAdminAPIView(APIView):
    permission_classes = [IsAdminUser]

    def post(self, request):
        serializer = ProjectSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)
    
    def put(self, request, pk):
        project = Project.objects.get(pk=pk)
        serializer = ProjectSerializer(project, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            project = Project.objects.get(pk=pk)
            project.delete()
            return Response(
                {"message": "Project deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except Project.DoesNotExist:
            return Response(
                {"error": "This project is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )
            
# Get Involved Section API Views
class DonationAPIView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = DonationSerializer(data=request.data)
        if serializer.is_valid():
            donation = serializer.save(is_paid=False)
            return Response({
                "message": "Donation initiated",
                "donation_id": donation.id,
                "amount": donation.amount,
                "donation_type": donation.donation_type
            }, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class DonationListAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsSuperUser]

    def get(self, request):
        donations = Donation.objects.all().order_by("-created_at")
        serializer = DonationSerializer(donations, many=True)
        return Response(serializer.data)
    
    def put(self, request, pk):
        donation = Donation.objects.get(pk=pk)
        serializer = DonationSerializer(donation, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
            
            
class VolunteerCreateAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = VolunteerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Volunteer application submitted successfully",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CorporatePartnershipSectionAPIView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        sections = CorporatePartnershipSection.objects.filter(
            is_active=True
        ).order_by("order")
        serializer = CorporatePartnershipSectionSerializer(sections, many=True)
        return Response(serializer.data)
    
class CorporatePartnershipSectionCreateAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsSuperUser] 

    def post(self, request):
        serializer = CorporatePartnershipSectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Section created successfully"})
        return Response(serializer.errors, status=400)
    
# Contact Section API Views
class ContactCardAPIView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated, IsSuperUser] 

    def post(self, request):
        serializer = ContactCardSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Contact card created successfully"})
        return Response(serializer.errors, status=400)
    
class FAQListAPIView(generics.ListAPIView):
    queryset = FAQ.objects.filter(is_active=True).order_by("order")
    serializer_class = FAQSerializer
