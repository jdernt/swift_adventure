"""djangoProject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth import views as djviews
from django.urls import include, path
from swiftventure import views

urlpatterns = [
    path('', views.mainpage),
    path('scroll/', views.scroll),
    path('login/', djviews.LoginView.as_view(), name='login'),
    path('construct/', views.construct),
    path('cr_demo/', views.cr_demo),
    path('account/', views.account),
    path('map/<int:mapID>/', views.map),
]

