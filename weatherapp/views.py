from django.shortcuts import render
from django.http import JsonResponse
import requests
from .models import CurrentWeather

def index(request):
    return render(request, 'index.html')

def api_weather(request):
    city = request.GET.get('city')
    api_key = 'c5d7de3c0ec59626c28271fc9968a647'  # ma clÃ© API

    if not city:
        return JsonResponse({'error': 'Aucune ville fournie'}, status=400)

    url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric&lang=fr"
    response = requests.get(url)
    data = response.json()

    if data.get('cod') != 200:
        return JsonResponse({'error': 'Ville introuvable'}, status=404)

    result = {
        'city': city.capitalize(),
        'temperature': data['main']['temp'],
        'humidity': data['main']['humidity'],
        'wind_speed': data['wind']['speed'],
        'description': data['weather'][0]['description'].capitalize(),
        'icon': data['weather'][0]['icon'],
    }

    # Sauvegarde en base
    CurrentWeather.objects.create(
        city=result['city'],
        temperature=result['temperature'],
        humidity=result['humidity'],
        wind_speed=result['wind_speed']
    )

    return JsonResponse(result)
