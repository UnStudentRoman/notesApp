from django.urls import path
from . import views

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    
    path('', view=views.getRoutes, name='routes'),
    path('token/', TokenObtainPairView.as_view(), name='token-obtain-pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token-refresh'),
    path('notes/', views.getNotes, name='notes'),
    path('notes/create/', views.createNote, name='create-note'),
    path('notes/<str:pk>/', views.getNote, name='note'),
    path('notes/<str:pk>/update/', views.updateNote, name='update-note'),
    path('notes/<str:pk>/delete/', views.deleteNote, name='delete-note'),

]
 
