from django.urls import path
from .views import UserDetailView

urlpatterns = [
    path('auth/', UserDetailView.as_view(), name='user-detail'),
]