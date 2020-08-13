import json

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect
from json import loads

from .models import User, Map, m_Level, m_Player, m_Symbol
from django.views.decorators.csrf import csrf_exempt, csrf_protect


def mainpage(request):
    return HttpResponse("1")


def scroll(request):
    return HttpResponse("1")


def registration(request):
    return HttpResponse("1")


def account(request):
    return HttpResponse("1")


def construct(request):
    return render(request, "Constructor/сreation.html")


@csrf_exempt
def submitConstructorData(request):
    if request.method == "POST":
        name = request.POST.get("user")
        user, created = User.objects.update_or_create(name=request.POST.get("user"));
        map, created = user.map_set.update_or_create(map_name=request.POST.get("map"),
                                                     count_level=request.POST.get("count_level"));
        if map.m_level_set.filter(level=request.POST.get("level")).count() != 0:
            map.m_level_set.update(width=request.POST.get("width"), height=request.POST.get("height"),
                                   level=request.POST.get("level"), matrix=request.POST.get("matrix"))
        else:
            map.m_level_set.create(width=request.POST.get("width"), height=request.POST.get("height"),
                                   level=request.POST.get("level"), matrix=request.POST.get("matrix"))
        return HttpResponseRedirect("/")
    else:
        return HttpResponseRedirect("/")


def map(request, mapID):
    return render(request, "Game/Game.html")


@csrf_exempt
def getGameData(request, mapID, level):
    if request.method == "POST":
        userName = request.POST.get("user")
        level = request.POST.get("level")
        mapID = request.POST.get("mapID")
        map = Map.objects.get(id=mapID)
        m_level = map.m_level_set.get(level=level)
        data = {"mapName": map.map_name, "matrix": m_level.matrix, "count_level": map.count_level,
                "width": m_level.width, "height": m_level.height}
        return HttpResponse(json.dumps(data), content_type='application/json')
    else:
        return HttpResponseRedirect("/")
