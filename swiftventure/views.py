import json

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseServerError, HttpResponseBadRequest
from json import loads

from .models import User, Map, Data, Post
from django.views.decorators.csrf import csrf_exempt, csrf_protect


def mainpage(request):
    return render(request, "Pages/mainpage.html")


def scroll(request):
    return render(request, "Pages/scroll.html")


def registration(request):
    return render(request, "Pages/scroll.html")


def learning(request):
    return render(request, "Pages/leaning.html")


def account(request):
    return HttpResponse("1")


def construct(request):
    return render(request, "Constructor/сreation.html")


@csrf_exempt
def submitConstructorData(request):
    if request.method == "POST":
        try:
            name = request.POST.get("user")
            user, created = User.objects.update_or_create(name=request.POST.get("user"));
            map_name = request.POST.get("mapTitle")
            if (map_name == ""):
                map_name = "map_" + str(Data.objects.get(id=0).maps_count + 1)
            # for map in user.map_set.all():
            #     if (map_name == map.map_name):
            #         map_name=map_name+ "(copy)"
            map_existed = Map.objects.filter(map_name=map_name)
            if (map_existed.count() != 0):
                map, created = user.map_set.filter(id=map_existed[0].id).update_or_create(map_name=map_name);
            else:
                if (Data.objects.count() != 1):
                    Data.objects.create(id=0, maps_count=1)
                map_count = Data.objects.filter(id=0)[0].maps_count
                map, created = user.map_set.update_or_create(id=map_count, map_name=map_name);
                if created:
                    Data.objects.update(id=0, maps_count=map.id + 1)

            map.count_level = request.POST.get("count_level")
            map.save()
            description = request.POST.get("mapDescription")
            if description == "":
                description = "Без описания/Without description"
            Post.objects.create(map=map, description=description)
            map.m_symbol_set.all().delete()
            symbols = request.POST.get("symbols")
            colors = request.POST.get("colors").split(';')
            for i in range(len(symbols)):
                map.m_symbol_set.create(type=i, symbol=symbols[i], color=colors[i])

            if map.m_level_set.filter(level=request.POST.get("level")).count() != 0:
                map.m_level_set.update(width=request.POST.get("width"), height=request.POST.get("height"),
                                       level=request.POST.get("level"), matrix=request.POST.get("matrix"))
            else:
                map.m_level_set.create(width=request.POST.get("width"), height=request.POST.get("height"),
                                       level=request.POST.get("level"), matrix=request.POST.get("matrix"))
        except Exception as e:
            return HttpResponseServerError(str(e))
        else:
            return HttpResponseRedirect("/")
    else:
        return HttpResponseBadRequest()


def map(request, mapID):
    return render(request, "Game/Game.html")


@csrf_exempt
def getGameData(request, mapID, level):
    if request.method == "POST":
        try:
            userName = request.POST.get("user")
            level = level
            mapID = mapID
            map = Map.objects.get(id=mapID)
            m_level = map.m_level_set.get(level=level)
            symbols = ""
            colors = []
            for i in range(map.m_symbol_set.all().count()):
                symbols += map.m_symbol_set.get(type=i).symbol
                colors.append(map.m_symbol_set.get(type=i).color)
            data = {"mapName": map.map_name, "matrix": m_level.matrix, "count_level": map.count_level,
                    "width": m_level.width, "height": m_level.height, "symbols": symbols, "colors": colors}
            return HttpResponse(json.dumps(data), content_type='application/json')
        except Exception as e:
            return HttpResponseServerError(str(e))
        else:
            return HttpResponseBadRequest()
