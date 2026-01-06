from contact.models import Contact
from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.password_validation import validate_password


from django.contrib.auth import get_user_model

User = get_user_model()

# class RegisterSerializer(serializers.ModelSerializer):
#     password = serializers.CharField(write_only=True)
#     role = serializers.ChoiceField(
#         choices=[("user", "User"), ("admin", "Admin")],
#         write_only=True
#     )

#     class Meta:
#         model = User
#         fields = ('id', 'email', 'username', 'password', 'role')

#     def create(self, validated_data):
#         role = validated_data.pop("role")

#         user = User.objects.create_user(
#             email=validated_data['email'],
#             username=validated_data['username'],
#             password=validated_data['password']
#         )

#         if role == "admin":
#             user.is_staff = True        # Can access admin panel
#             user.is_superuser = False   #  No full control

#         user.save()
#         return user

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password')

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            username=validated_data['username'],
            password=validated_data['password']
        )
        return user





class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'subject', 'message']