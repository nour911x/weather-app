from django.contrib import admin
from django.urls import path
from weatherapp import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', views.index, name='index'),
    path('api/weather/', views.api_weather, name='api_weather'),
]
