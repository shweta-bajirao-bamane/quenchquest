from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate, get_user_model
from rest_framework.permissions import AllowAny

from contact.models import Contact
from contact.serializers import ContactSerializer, RegisterSerializer

User = get_user_model()


# class RegisterAPIView(APIView):
#     authentication_classes = []   
#     permission_classes = [AllowAny]
    
#     def post(self, request):
#         serializer = RegisterSerializer(data=request.data)
#         if serializer.is_valid():
#             user = serializer.save()
#             return Response({
#                 "message": "User registered successfully",
#                 "role": "admin" if user.is_staff else "user"
#             }, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(
                {"message": "User registered successfully", "role": "user"},
                status=201
            )
        return Response(serializer.errors, status=400)


class LoginAPIView(APIView):
    authentication_classes = []
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get("email")
        username = request.data.get("username")
        password = request.data.get("password")

        # password, email/username validation
        if not password:
            return Response(
                {"error": "Password is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not email and not username:
            return Response(
                {"error": "Email or username is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # check user
        try:
            if email:
                user_obj = User.objects.get(email=email)
                auth_username = user_obj.email   
            else:
                user_obj = User.objects.get(username=username)
                auth_username = user_obj.email
        except User.DoesNotExist:
            return Response(
                {"error": "User does not exist"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Authenticate
        user = authenticate(
            request,
            username=auth_username,
            password=password
        )

        if user is None:
            return Response(
                {"error": "Incorrect password"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # JWT token
        refresh = RefreshToken.for_user(user)

        return Response({
            "refresh": str(refresh),
            "access": str(refresh.access_token),
            "user": {
                "id": user.id,
                "email": user.email,
                "username": user.username,
                "role": "admin" if user.is_superuser else "user",
            }
        }, status=status.HTTP_200_OK)

class ContactAPIView(APIView):
    permission_classes = [AllowAny]
    
    def get(self, request):
        contacts = Contact.objects.all()
        serializer = ContactSerializer(contacts, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ContactSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Message sent successfully!"}, 
                            status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
