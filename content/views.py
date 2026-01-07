from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAdminUser,AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from django.shortcuts import get_object_or_404

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
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated, IsSuperUser]
    permission_classes = [AllowAny]
    
    def get(self, request):
        serializer = HomeHeroSerializer(HomeHero.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = HomeHeroSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    parser_classes = (MultiPartParser, FormParser)

    def put(self, request, pk):
        hero = get_object_or_404(HomeHero, pk=pk)

        serializer = HomeHeroSerializer(
            hero,
            data=request.data,
            partial=True
        )

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
            
class WhoWeAreAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        serializer = WhoWeAreSerializer(WhoWeAre.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = WhoWeAreSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        try:
            who_we_are = WhoWeAre.objects.get(pk=pk)
        except WhoWeAre.DoesNotExist:
            return Response(
                {"detail": "Who We Are content not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = WhoWeAreSerializer(who_we_are, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CoreObjectiveAPIView(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated, IsSuperUser]
    permission_classes = [AllowAny]
    
    def get(self, request):
        queryset = CoreObjective.objects.all()

        if not queryset.exists():
            return Response(
                {
                    "detail": "No core objectives found."
                },
                status=status.HTTP_200_OK
            )

        serializer = CoreObjectiveSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CoreObjectiveSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        try:
            objective = CoreObjective.objects.get(pk=pk)
        except CoreObjective.DoesNotExist:
            return Response(
                {"detail": "Core objective not found."},
                status=status.HTTP_404_NOT_FOUND
            )

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
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated, IsSuperUser]
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]
    
    def get(self, request):
        try:
            programs = ProgramHome.objects.all().order_by('id')

            if not programs.exists():
                return Response(
                    {
                        "message": "No program data found",
                        "data": []
                    },
                    status=status.HTTP_200_OK
                )

            serializer = ProgramHomeSerializer(programs, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {
                    "error": "Failed to fetch program data",
                    "details": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


    def post(self, request):
        serializer = ProgramHomeSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    
    # def put(self, request):
    #     response_data = []

    #     for item in request.data:
    #         program_id = item.get('id')
    #         if not program_id:
    #             return Response(
    #                 {"error": "Each object must contain an 'id' field"},
    #                 status=status.HTTP_400_BAD_REQUEST
    #             )
    #         try:
    #             program = ProgramHome.objects.get(id=program_id)
    #             serializer = ProgramHomeSerializer(program, data=item, partial=True)
    #             if serializer.is_valid():
    #                 serializer.save()
    #                 response_data.append(serializer.data)
    #             else:
    #                 return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    #         except ProgramHome.DoesNotExist:
    #             return Response(
    #                 {"error": f"Program with id {program_id} not found"},
    #                 status=status.HTTP_404_NOT_FOUND
    #             )

    #     return Response(response_data, status=status.HTTP_200_OK)

    # def put(self, request, pk):
    #     try:
    #         program = ProgramHome.objects.get(pk=pk)
    #     except ProgramHome.DoesNotExist:
    #         return Response(
    #             {"error": "Program not found"},
    #             status=status.HTTP_404_NOT_FOUND
    #         )

    #     serializer = ProgramHomeSerializer(program, data=request.data, partial=True)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)

    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        # 1️⃣ Get the record to update
        try:
            program = ProgramHome.objects.get(pk=pk)
        except ProgramHome.DoesNotExist:
            return Response(
                {"error": "Program not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # 2️⃣ Update only this record
        serializer = ProgramHomeSerializer(program, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        # 3️⃣ Fetch ALL records after update
        all_programs = ProgramHome.objects.all().order_by('id')
        all_serializer = ProgramHomeSerializer(all_programs, many=True)

        # 4️⃣ Return updated + all
        return Response(
            {
                "updated": serializer.data,
                "all_data": all_serializer.data
            },
            status=status.HTTP_200_OK
        )

    # def delete(self, request, pk):
    #     try:
    #         Program = ProgramHome.objects.get(pk=pk)
    #         Program.delete()
    #         return Response(
    #             {"message": "Program deleted successfully"},
    #             status=status.HTTP_204_NO_CONTENT
    #         )
    #     except ProgramHome.DoesNotExist:
    #         return Response(
    #             {"error": "This program is already deleted or does not exist"},
    #             status=status.HTTP_404_NOT_FOUND
    #         )
    
    def delete(self, request, pk):
        try:
            program = ProgramHome.objects.get(pk=pk)
        except ProgramHome.DoesNotExist:
            return Response(
                {"error": "Program not found or already deleted"},
                status=status.HTTP_404_NOT_FOUND
            )

        # Delete the record
        program.delete()

        # Fetch remaining records
        remaining_programs = ProgramHome.objects.all().order_by('id')
        serializer = ProgramHomeSerializer(remaining_programs, many=True)

        return Response(
            {
                "message": "Program deleted successfully",
                "all_data": serializer.data
            },
            status=status.HTTP_200_OK
        )


class ImpactStatAPIView(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated, IsSuperUser]
    permission_classes = [AllowAny]
    def get(self, request):
        try:
            stats = ImpactStat.objects.all().order_by('id')

            serializer = ImpactStatSerializer(stats, many=True)

            return Response(
                {
                    "count": stats.count(),
                    "data": serializer.data
                },
                status=status.HTTP_200_OK
            )

        except Exception as e:
            return Response(
                {
                    "error": "Failed to fetch impact stats",
                    "details": str(e)
                },
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

    def post(self, request):
        serializer = ImpactStatSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {
                    "message": "Impact stats created successfully",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def put(self, request, pk):
    #     impact_stat = ImpactStat.objects.get(pk=pk)
    #     serializer = ImpactStatSerializer(impact_stat, data=request.data)
    #     if serializer.is_valid():
    #         serializer.save()
    #         return Response(serializer.data, status=status.HTTP_200_OK)
    #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request, pk):
        try:
            impact_stat = ImpactStat.objects.get(pk=pk)
        except ImpactStat.DoesNotExist:
            return Response(
                {"error": "Impact stat not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ImpactStatSerializer(impact_stat, data=request.data, partial=True)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        serializer.save()

        # Fetch all records after update
        all_stats = ImpactStat.objects.all().order_by('id')
        all_serializer = ImpactStatSerializer(all_stats, many=True)

        return Response(
            {
                "updated": serializer.data,
                "all_data": all_serializer.data
            },
            status=status.HTTP_200_OK
        )

    
    # def delete(self, request, pk):
    #     try:
    #         impact_stat = ImpactStat.objects.get(pk=pk)
    #         impact_stat.delete()
    #         return Response(
    #             {"message": "Impact stat deleted successfully"},
    #             status=status.HTTP_204_NO_CONTENT
    #         )
    #     except ImpactStat.DoesNotExist:
    #         return Response(
    #             {"error": "This impact stat is already deleted or does not exist"},
    #             status=status.HTTP_404_NOT_FOUND
    #         )
    def delete(self, request, pk):
        try:
            impact_stat = ImpactStat.objects.get(pk=pk)
        except ImpactStat.DoesNotExist:
            return Response(
                {"error": "Impact stat not found or already deleted"},
                status=status.HTTP_404_NOT_FOUND
            )

        impact_stat.delete()

        remaining_stats = ImpactStat.objects.all().order_by('id')
        serializer = ImpactStatSerializer(remaining_stats, many=True)

        return Response(
            {
                "message": "Impact stat deleted successfully",
                "all_data": serializer.data
            },
            status=status.HTTP_200_OK
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
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated, IsSuperUser]
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]
    
    def get(self, request):
        
        serializer = NewsSerializer(News.objects.all().order_by("-created_at"), many=True)
        return Response(serializer.data)

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

class AboutIntroAPIView(APIView):
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]
    def get(self, request):
        serializer = AboutIntroSerializer(AboutIntro.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AboutIntroSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def put(self, request, pk):
        about_intro = AboutIntro.objects.get(pk=pk)
        serializer = AboutIntroSerializer(about_intro, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            about_intro = AboutIntro.objects.get(pk=pk)
            about_intro.delete()
            return Response(
                {"message": "About intro deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except AboutIntro.DoesNotExist:
            return Response(
                {"error": "This about intro is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )

class AboutWhoWeAreAPIView(APIView):
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]
    def get(self, request):
        serializer = AboutWhoWeAreSerializer(AboutWhoWeAre.objects.all(), many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AboutWhoWeAreSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def put(self, request, pk):
        about_who_we_are = AboutWhoWeAre.objects.get(pk=pk)
        serializer = AboutWhoWeAreSerializer(about_who_we_are, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            about_who_we_are = AboutWhoWeAre.objects.get(pk=pk)
            about_who_we_are.delete()
            return Response(
                {"message": "About Who We Are deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except AboutWhoWeAre.DoesNotExist:
            return Response(
                {"error": "This About Who We Are is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )

class MissionVisionValueAPIView(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated, IsSuperUser]
    permission_classes = [AllowAny]
    def get(self, request):
        data = MissionVisionValue.objects.all()
        serializer = MissionVisionValueSerializer(data, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        # handle multiple objects
        many = isinstance(request.data, list)
        serializer = MissionVisionValueSerializer(data=request.data, many=many)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # return ALL data after insert
        all_data = MissionVisionValue.objects.all()
        all_serializer = MissionVisionValueSerializer(all_data, many=True)
        return Response(all_serializer.data, status=status.HTTP_201_CREATED)
    
    def put(self, request, pk):
        try:
            instance = MissionVisionValue.objects.get(pk=pk)
        except MissionVisionValue.DoesNotExist:
            return Response(
                {"error": "Data not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = MissionVisionValueSerializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # return ALL data
        all_data = MissionVisionValue.objects.all()
        all_serializer = MissionVisionValueSerializer(all_data, many=True)
        return Response(all_serializer.data, status=status.HTTP_200_OK)

    
    def delete(self, request, pk):
        try:
            instance = MissionVisionValue.objects.get(pk=pk)
            instance.delete()
        except MissionVisionValue.DoesNotExist:
            return Response(
                {"error": "This record is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )

        # return remaining data
        all_data = MissionVisionValue.objects.all()
        all_serializer = MissionVisionValueSerializer(all_data, many=True)
        return Response(
            {
                "message": "Deleted successfully",
                "data": all_serializer.data
            },
            status=status.HTTP_200_OK
        )
        
class CoreObjectivesAPIView(APIView):
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated, IsSuperUser]
    permission_classes = [AllowAny]
    
    def get(self, request):
        queryset = CoreObjectives.objects.all()

        if not queryset.exists():
            return Response(
                {
                    "detail": "No core objectives found."
                },
                status=status.HTTP_200_OK
            )

        serializer = CoreObjectivesSerializer(queryset, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = CoreObjectivesSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def put(self, request, pk):
        try:
            objective = CoreObjectives.objects.get(pk=pk)
        except CoreObjectives.DoesNotExist:
            return Response(
                {"detail": "Core objective not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = CoreObjectivesSerializer(objective, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk):
        try:
            objective = CoreObjectives.objects.get(pk=pk)
            objective.delete()
            return Response(
                {"message": "Core objective deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except CoreObjectives.DoesNotExist:
            return Response(
                {"error": "This core objective is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )


class LeadershipAPIView(APIView):
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]

    # 🔹 GET → ALL DATA
    def get(self, request):
        serializer = LeadershipSerializer(
            Leadership.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 🔹 POST → MULTIPLE ADD
    def post(self, request):
        if not isinstance(request.data, list):
            return Response(
                {"error": "Expected a list of leadership objects"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = LeadershipSerializer(
            data=request.data,
            many=True,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # return ALL data
        all_data = LeadershipSerializer(
            Leadership.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(all_data.data, status=status.HTTP_201_CREATED)

    # 🔹 PUT → UPDATE ONE (id), RETURN ALL
    def put(self, request, pk):
        try:
            leadership = Leadership.objects.get(pk=pk)
        except Leadership.DoesNotExist:
            return Response(
                {"error": "Leadership not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = LeadershipSerializer(
            leadership,
            data=request.data,
            partial=True,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # return ALL data
        all_data = LeadershipSerializer(
            Leadership.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(all_data.data, status=status.HTTP_200_OK)

    # 🔹 DELETE → DELETE ONE (id), RETURN ALL
    def delete(self, request, pk):
        try:
            leadership = Leadership.objects.get(pk=pk)
            leadership.delete()
        except Leadership.DoesNotExist:
            return Response(
                {"error": "Leadership already deleted or not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # return ALL remaining data
        all_data = LeadershipSerializer(
            Leadership.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(all_data.data, status=status.HTTP_200_OK)


class SliderImageAPIView(APIView):
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]

    # 🔹 GET → ALL SLIDER IMAGES
    def get(self, request):
        serializer = SliderImageSerializer(
            SliderImage.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 🔹 POST → ADD MULTIPLE SLIDER IMAGES
    def post(self, request):
        if not isinstance(request.data, list):
            return Response(
                {"error": "Expected a list of slider images"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = SliderImageSerializer(
            data=request.data,
            many=True,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # return ALL slider images
        all_data = SliderImageSerializer(
            SliderImage.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(all_data.data, status=status.HTTP_201_CREATED)

    # 🔹 PUT → UPDATE ONE SLIDER IMAGE, RETURN ALL
    def put(self, request, pk):
        try:
            slider = SliderImage.objects.get(pk=pk)
        except SliderImage.DoesNotExist:
            return Response(
                {"error": "Slider image not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = SliderImageSerializer(
            slider,
            data=request.data,
            partial=True,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # return ALL slider images
        all_data = SliderImageSerializer(
            SliderImage.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(all_data.data, status=status.HTTP_200_OK)

    # 🔹 DELETE → DELETE ONE SLIDER IMAGE, RETURN ALL
    def delete(self, request, pk):
        try:
            slider = SliderImage.objects.get(pk=pk)
            slider.delete()
        except SliderImage.DoesNotExist:
            return Response(
                {"error": "Slider image already deleted or not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # return ALL remaining slider images
        all_data = SliderImageSerializer(
            SliderImage.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(all_data.data, status=status.HTTP_200_OK)
    
    
class PartnersAPIView(APIView):
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]

    # 🔹 GET → all partners
    def get(self, request):
        serializer = PartnersSerializer(
            Partners.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 🔹 POST → create partner (form-data)
    def post(self, request):
        serializer = PartnersSerializer(
            data=request.data,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # return ALL data
        all_data = PartnersSerializer(
            Partners.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(all_data.data, status=status.HTTP_201_CREATED)

    # 🔹 PUT → update ONE partner, return ALL
    def put(self, request, pk):
        try:
            partner = Partners.objects.get(pk=pk)
        except Partners.DoesNotExist:
            return Response(
                {"error": "Partner not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = PartnersSerializer(
            partner,
            data=request.data,
            partial=True,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # return ALL data
        all_data = PartnersSerializer(
            Partners.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(all_data.data, status=status.HTTP_200_OK)

    # 🔹 DELETE → delete ONE partner, return ALL
    def delete(self, request, pk):
        try:
            partner = Partners.objects.get(pk=pk)
            partner.delete()
        except Partners.DoesNotExist:
            return Response(
                {"error": "Partner already deleted or not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # return remaining data
        all_data = PartnersSerializer(
            Partners.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(all_data.data, status=status.HTTP_200_OK)


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
    
    
# ``Program API Views    
class ProgramIntroAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        intro = ProgramIntro.objects.first()
        serializer = ProgramIntroSerializer(intro)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProgramIntroSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)

    def put(self, request, pk):
        intro = ProgramIntro.objects.get(pk=pk)
        serializer = ProgramIntroSerializer(intro, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        try:
            intro = ProgramIntro.objects.get(pk=pk)
            intro.delete()
            return Response(
                {"message": "Program Intro deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except ProgramIntro.DoesNotExist:
            return Response(
                {"error": "This program intro is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )
            
            
class ProgramCardAPIView(APIView):
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]

    # 🔹 GET → ALL PROGRAM CARDS
    def get(self, request):
        serializer = ProgramCardSerializer(
            ProgramCard.objects.all(),
            many=True
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 🔹 POST → ADD MULTIPLE PROGRAM CARDS
    def post(self, request):
        if not isinstance(request.data, list):
            return Response(
                {"error": "Expected a list of program cards"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ProgramCardSerializer(
            data=request.data,
            many=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # return ALL data
        all_data = ProgramCardSerializer(
            ProgramCard.objects.all(),
            many=True
        )
        return Response(all_data.data, status=status.HTTP_201_CREATED)

    # 🔹 PUT → UPDATE ONE PROGRAM CARD, RETURN ALL
    def put(self, request, pk):
        try:
            program_card = ProgramCard.objects.get(pk=pk)
        except ProgramCard.DoesNotExist:
            return Response(
                {"error": "Program card not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProgramCardSerializer(
            program_card,
            data=request.data,
            partial=True
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # return ALL data
        all_data = ProgramCardSerializer(
            ProgramCard.objects.all(),
            many=True
        )
        return Response(all_data.data, status=status.HTTP_200_OK)

    # 🔹 DELETE → DELETE ONE PROGRAM CARD, RETURN ALL
    def delete(self, request, pk):
        try:
            program_card = ProgramCard.objects.get(pk=pk)
            program_card.delete()
        except ProgramCard.DoesNotExist:
            return Response(
                {"error": "Program card already deleted or not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # return remaining data
        all_data = ProgramCardSerializer(
            ProgramCard.objects.all(),
            many=True
        )
        return Response(all_data.data, status=status.HTTP_200_OK)


class ProgramSliderAPIView(APIView):
    # permission_classes = [IsAdminUser]
    permission_classes = [AllowAny]

    # 🔹 GET → ALL SLIDER IMAGES
    def get(self, request):
        serializer = ProgramSliderSerializer(
            ProgramSlider.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 🔹 POST → ADD MULTIPLE SLIDER IMAGES
    def post(self, request):
        if not isinstance(request.data, list):
            return Response(
                {"error": "Expected a list of slider images"},
                status=status.HTTP_400_BAD_REQUEST
            )

        serializer = ProgramSliderSerializer(
            data=request.data,
            many=True,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # return ALL slider images
        all_data = ProgramSliderSerializer(
            ProgramSlider.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(all_data.data, status=status.HTTP_201_CREATED)

    # 🔹 PUT → UPDATE ONE SLIDER IMAGE, RETURN ALL
    def put(self, request, pk):
        try:
            slider = ProgramSlider.objects.get(pk=pk)
        except ProgramSlider.DoesNotExist:
            return Response(
                {"error": "Program slider not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProgramSliderSerializer(
            slider,
            data=request.data,
            partial=True,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # return ALL slider images
        all_data = ProgramSliderSerializer(
            ProgramSlider.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(all_data.data, status=status.HTTP_200_OK)

    # 🔹 DELETE → DELETE ONE SLIDER IMAGE, RETURN ALL
    def delete(self, request, pk):
        try:
            slider = ProgramSlider.objects.get(pk=pk)
            slider.delete()
        except ProgramSlider.DoesNotExist:
            return Response(
                {"error": "Program slider already deleted or not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        # return ALL remaining slider images
        all_data = ProgramSliderSerializer(
            ProgramSlider.objects.all(),
            many=True,
            context={"request": request}
        )
        return Response(all_data.data, status=status.HTTP_200_OK)
    
class ProgramMissionAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        mission = ProgramMission.objects.first()
        serializer = ProgramMissionSerializer(mission)
        return Response(serializer.data)

    def post(self, request):
        serializer = ProgramMissionSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)

    def put(self, request, pk):
        mission = ProgramMission.objects.get(pk=pk)
        serializer = ProgramMissionSerializer(mission, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)

    def delete(self, request, pk):
        try:
            mission = ProgramMission.objects.get(pk=pk)
            mission.delete()
            return Response(
                {"message": "Program Mission deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except ProgramMission.DoesNotExist:
            return Response(
                {"error": "This program mission is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )
  


# Project/Impact Section API Views

# ------------------ CATEGORY API ------------------
class ProjectCategoryAPIView(APIView):

    def get(self, request):
        categories = ProjectCategory.objects.all()
        serializer = ProjectCategorySerializer(categories, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def post(self, request):
        serializer = ProjectCategorySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


# ------------------ PROJECT API ------------------
class ProjectAPIView(APIView):

    # GET → All projects or category-wise
    # /api/projects/?category=education
    def get(self, request):
        category_slug = request.query_params.get("category")

        projects = Project.objects.all().order_by("-updated_at")

        if category_slug:
            projects = projects.filter(category__slug=category_slug)

        serializer = ProjectSerializer(
            projects, many=True, context={"request": request}
        )
        return Response(serializer.data, status=status.HTTP_200_OK)

    # POST → Add MULTIPLE projects
    def post(self, request):
        serializer = ProjectSerializer(
            data=request.data, many=True, context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        all_projects = Project.objects.all().order_by("-updated_at")
        return Response(
            ProjectSerializer(all_projects, many=True, context={"request": request}).data,
            status=status.HTTP_201_CREATED
        )

    # PUT → Update one project → Return ALL
    def put(self, request, pk=None):
        if not pk:
            return Response(
                {"error": "Project ID is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return Response(
                {"error": "Project not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ProjectSerializer(
            project,
            data=request.data,
            partial=True,
            context={"request": request}
        )
        serializer.is_valid(raise_exception=True)
        serializer.save()

        all_projects = Project.objects.all().order_by("-updated_at")
        return Response(
            ProjectSerializer(all_projects, many=True, context={"request": request}).data,
            status=status.HTTP_200_OK
        )

    # DELETE → Delete one → Return ALL
    def delete(self, request, pk=None):
        if not pk:
            return Response(
                {"error": "Project ID is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            project = Project.objects.get(pk=pk)
        except Project.DoesNotExist:
            return Response(
                {"error": "Project not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        project.delete()

        all_projects = Project.objects.all().order_by("-updated_at")
        return Response(
            ProjectSerializer(all_projects, many=True, context={"request": request}).data,
            status=status.HTTP_200_OK
        )



# class projectListAPIView(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request):
#         category = request.GET.get("category")
#         queryset = Project.objects.filter(is_active=True)

#         if category:
#             queryset = queryset.filter(category__slug=category)

#         serializer = ProjectSerializer(queryset, many=True)
#         return Response(serializer.data)
    
# class ProjectDetailAPIView(APIView):
#     permission_classes = [AllowAny]

#     def get(self, request, pk):
#         try:
#             project = Project.objects.get(pk=pk, is_active=True)
#             serializer = ProjectSerializer(project)
#             return Response(serializer.data)
#         except Project.DoesNotExist:
#             return Response(
#                 {"error": "Project not found"},
#                 status=status.HTTP_404_NOT_FOUND
#             )
            
# class ProjectAdminAPIView(APIView):
#     permission_classes = [IsAdminUser]

#     def post(self, request):
#         serializer = ProjectSerializer(data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data, status=201)
    
#     def put(self, request, pk):
#         project = Project.objects.get(pk=pk)
#         serializer = ProjectSerializer(project, data=request.data)
#         serializer.is_valid(raise_exception=True)
#         serializer.save()
#         return Response(serializer.data)
    
#     def delete(self, request, pk):
#         try:
#             project = Project.objects.get(pk=pk)
#             project.delete()
#             return Response(
#                 {"message": "Project deleted successfully"},
#                 status=status.HTTP_204_NO_CONTENT
#             )
#         except Project.DoesNotExist:
#             return Response(
#                 {"error": "This project is already deleted or does not exist"},
#                 status=status.HTTP_404_NOT_FOUND
#             )
            
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
    # authentication_classes = [JWTAuthentication]
    # permission_classes = [IsAuthenticated, IsSuperUser]
    permission_classes = [AllowAny]

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
class ContactHeaderAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        header = ContactHeader.objects.first()
        serializer = ContactHeaderSerializer(header)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ContactHeaderSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)
    
    def put(self, request, pk):
        header = ContactHeader.objects.get(pk=pk)
        serializer = ContactHeaderSerializer(header, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            header = ContactHeader.objects.get(pk=pk)
            header.delete()
            return Response(
                {"message": "Contact header deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except ContactHeader.DoesNotExist:
            return Response(
                {"error": "This contact header is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )

class ContactCardAPIView(APIView):
    permission_classes = [AllowAny]

    # 🔹 GET → Show all contact cards
    def get(self, request):
        cards = ContactCard.objects.all().order_by("-updated_at")
        serializer = ContactCardSerializer(cards, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 🔹 POST → Add multiple contact cards
    def post(self, request):
        serializer = ContactCardSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Return ALL cards
        all_cards = ContactCard.objects.all().order_by("-updated_at")
        return Response(
            ContactCardSerializer(all_cards, many=True).data,
            status=status.HTTP_201_CREATED
        )

    # 🔹 PUT → Update one card (pk required) → Return ALL cards
    def put(self, request, pk=None):
        if not pk:
            return Response(
                {"error": "ID (pk) is required for update"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            card = ContactCard.objects.get(pk=pk)
        except ContactCard.DoesNotExist:
            return Response(
                {"error": "Contact card not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = ContactCardSerializer(card, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        all_cards = ContactCard.objects.all().order_by("-updated_at")
        return Response(
            ContactCardSerializer(all_cards, many=True).data,
            status=status.HTTP_200_OK
        )

    # 🔹 DELETE → Delete one card (pk required) → Return ALL cards
    def delete(self, request, pk=None):
        if not pk:
            return Response(
                {"error": "ID (pk) is required for delete"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            card = ContactCard.objects.get(pk=pk)
        except ContactCard.DoesNotExist:
            return Response(
                {"error": "Contact card not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        card.delete()

        all_cards = ContactCard.objects.all().order_by("-updated_at")
        return Response(
            ContactCardSerializer(all_cards, many=True).data,
            status=status.HTTP_200_OK
        )
        
class ContactDetailAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        details = ContactDetail.objects.first()
        serializer = ContactDetailSerializer(details)
        return Response(serializer.data)
    
    def post(self, request):
        serializer = ContactDetailSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=201)
    
    def put(self, request, pk):
        details = ContactDetail.objects.get(pk=pk)
        serializer = ContactDetailSerializer(details, data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)
    
    def delete(self, request, pk):
        try:
            details = ContactDetail.objects.get(pk=pk)
            details.delete()
            return Response(
                {"message": "Contact details deleted successfully"},
                status=status.HTTP_204_NO_CONTENT
            )
        except ContactDetail.DoesNotExist:
            return Response(
                {"error": "This contact detail is already deleted or does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )
    
class FAQListAPIView(generics.ListAPIView):
    permission_classes = [AllowAny]
    
    # 🔹 GET → Show all FAQs
    def get(self, request):
        faqs = FAQ.objects.all().order_by("order", "-updated_at")
        serializer = FAQSerializer(faqs, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    # 🔹 POST → Add multiple FAQs at once
    def post(self, request):
        serializer = FAQSerializer(data=request.data, many=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Return ALL FAQs after insert
        all_faqs = FAQ.objects.all().order_by("order", "-updated_at")
        return Response(
            FAQSerializer(all_faqs, many=True).data,
            status=status.HTTP_201_CREATED
        )

    # 🔹 PUT → Update one FAQ → Return ALL FAQs
    def put(self, request, pk=None):
        if not pk:
            return Response(
                {"error": "FAQ id (pk) is required for update"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            faq = FAQ.objects.get(pk=pk)
        except FAQ.DoesNotExist:
            return Response(
                {"error": "FAQ not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = FAQSerializer(faq, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        all_faqs = FAQ.objects.all().order_by("order", "-updated_at")
        return Response(
            FAQSerializer(all_faqs, many=True).data,
            status=status.HTTP_200_OK
        )

    # 🔹 DELETE → Delete one FAQ → Return ALL remaining FAQs
    def delete(self, request, pk=None):
        if not pk:
            return Response(
                {"error": "FAQ id (pk) is required for delete"},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            faq = FAQ.objects.get(pk=pk)
        except FAQ.DoesNotExist:
            return Response(
                {"error": "FAQ not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        faq.delete()

        all_faqs = FAQ.objects.all().order_by("order", "-updated_at")
        return Response(
            FAQSerializer(all_faqs, many=True).data,
            status=status.HTTP_200_OK
        )

