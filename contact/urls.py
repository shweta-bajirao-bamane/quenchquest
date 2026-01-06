from django.urls import include, include, path
from contact.views import ContactAPIView, LoginAPIView, LoginAPIView, RegisterAPIView 

urlpatterns = [
    path('contact/', ContactAPIView.as_view(), name='contact_api'),
    path('register/', RegisterAPIView.as_view()),
    path('login/', LoginAPIView.as_view()),
]