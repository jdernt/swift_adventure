from django.shortcuts import render
from django.http import HttpResponse
from django.http import HttpResponseRedirect
from django.http import HttpResponseNotFound


def mainpage(request):
    return HttpResponse("1")

def scroll(request):
    return HttpResponse("1")

def registration(request):
    return HttpResponse("1")

def construct(request):
    return HttpResponse("1")

def account(request):
    return HttpResponse("1")

def map(request, mapID):
    #mapID is Integer
    return HttpResponse()