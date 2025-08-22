from django.contrib import admin
from django.http import HttpResponse
from django.urls import path, include

def home(_request):
    return HttpResponse("ThoughtWeb API running. Try /api/signup/ or /api/login/")

urlpatterns = [
    path("", home),                 # new: root page
    path("admin/", admin.site.urls),
    path("api/", include("signup_api.urls")),
]
