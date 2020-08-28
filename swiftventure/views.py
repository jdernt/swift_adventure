import json

from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseServerError, HttpResponseBadRequest
from json import loads
from .forms import LoginForm, RegistrationForm

from .models import User, Map, Data, Post, Account
from django.views.decorators.csrf import csrf_exempt, csrf_protect


@csrf_protect
def mainpage(request):
    output = None
    url = "Pages/mainpage.html"
    if (request.COOKIES.get("lang") == "en"):
        url = "en/" + url
    if request.method == "POST":
        output = loginUser(request, url)
    if output is None:
        output = render(request, url,
                        {"login_form": LoginForm(), "registration_form": RegistrationForm()})
    return output


def loginUser(request, url):
    loginform = LoginForm(request.POST)
    registrationform = LoginForm(request.POST)
    email = request.POST.get("email")
    if loginform.is_valid() and (email is None):
        login = request.POST.get("login")
        password = request.POST.get("password")
        if User.objects.filter(name=login).count() == 1:
            user = User.objects.get(name=login)
            if Account.objects.get(user=user).password != password:
                return HttpResponse(
                    render(request, url, {"login_form": LoginForm(), "registration_form": RegistrationForm(),
                                          "message": "Неправильный пароль/Wrong password"}))
            script = ["setUser(", login, ")"]
            return HttpResponse(render(request, url,
                                       {"login_form": LoginForm(), "registration_form": RegistrationForm(),
                                        "script": script,
                                        "message": "Вход выполнен успешно/Sign up is successful"}))
        return HttpResponse(render(request, url, {"login_form": LoginForm(), "registration_form": RegistrationForm(),
                                                  "message": "Пользователь не найден/User is not found"}))
    elif registrationform.is_valid():
        login = request.POST.get("login")
        password = request.POST.get("password")
        if (User.objects.filter(name=login).count() >= 1):
            return HttpResponse(
                render(request, url, {"login_form": LoginForm(), "registration_form": RegistrationForm(),
                                      "message": "Данный пользователь уже зарегистрирован/User is already registered"}))
        if (Account.objects.filter(email=email).count() >= 1):
            return HttpResponse(
                render(request, url, {"login_form": LoginForm(), "registration_form": RegistrationForm(),
                                      "message": "Данный емайл уже зарегистрирован/Email is already registered"}))
        user = User.objects.create(name=login)
        Account.objects.create(user=user, password=password, email=email, rating=0.)
        script = ["setUser(", login, ")"]
        return HttpResponse(
            render(request, url, {"login_form": LoginForm(), "registration_form": RegistrationForm(), "script": script,
                                  "message": "Регистрация успешно завершена/Registration is successful"}))
    else:
        return None


@csrf_protect
def scroll(request, page, sort_crit):
    output = None
    url = "Pages/scroll.html"
    if (request.COOKIES.get("lang") == "en"):
        url = "en/" + url
    # if request.method == "POST":
    #     output = loginUser(request, url)
    if output is None:
        # output = render(request, url,
        #                 {"login_form": LoginForm(), "registration_form": RegistrationForm()})
        if sort_crit == "popularity":
            posts = Post.objects.all().order_by('number_of_rate');
        posts = Post.objects.all().order_by('-post_date');
        content = [];
        count = 0;
        for post in posts:
            post_date = post.post_date
            count += 1
            if (count > ((page - 1) * 10) and count <= ((page - 1) * 10 + 10)):
                content.append({"name": post.map.user.name, "rating": post.number_of_rate, "datetime": post.post_date,
                                "count": count, "mapTitle": post.map.map_name, "mapDescription": post.description,
                                "mapID": post.map.id})
        output = render(request, url,
                        {"login_form": LoginForm(), "registration_form": RegistrationForm(), "content": content})
    return output


# def posts_by_popularity

@csrf_protect
def learn(request):
    output = None
    url = "Pages/learning.html"
    if (request.COOKIES.get("lang") == "en"):
        url = "en/" + url
    if request.method == "POST":
        output = loginUser(request, url)
    if output is None:
        output = render(request, url, {"login_form": LoginForm(), "registration_form": RegistrationForm()})
    return output


def account(request):
    return HttpResponse("1")


@csrf_protect
def privacy(request):
    output = None
    url = "Pages/policy.html"
    if (request.COOKIES.get("lang") == "en"):
        url = "en/" + url
    if request.method == "POST":
        output = loginUser(request, url)
    if output is None:
        output = render(request, url, {"login_form": LoginForm(), "registration_form": RegistrationForm()})
    return output


@csrf_protect
def agreement(request):
    output = None
    url = "Pages/agreement.html"
    if (request.COOKIES.get("lang") == "en"):
        url = "en/" + url
    if request.method == "POST":
        output = loginUser(request, url)
    if output is None:
        output = render(request, url, {"login_form": LoginForm(), "registration_form": RegistrationForm()})
    return output


@csrf_protect
def construct(request, level):
    output = None
    url = "Constructor/сreation.html"
    if (request.COOKIES.get("lang") == "en"):
        url = "en/" + url
    if request.method == "POST":
        output = loginUser(request, url)
    if output is None:
        output = render(request, url,
                        {"login_form": LoginForm(), "registration_form": RegistrationForm()})
    return output


@csrf_exempt
def submitConstructorData(request):
    if request.method == "POST":
        try:
            name = request.POST.get("user")
            user = User.objects.get(name=request.POST.get("user"));
            map_name = request.POST.get("mapTitle")
            if (map_name == ""):
                map_name = "map_" + str(Data.objects.get(id=0).maps_count + 1)

            # for map in user.map_set.all():
            #     if (map_name == map.map_name):
            #         map_name=map_name+ "(copy)"
            def createMapDB(map_name):
                map_existed = Map.objects.filter(map_name=map_name)
                if (map_existed.count() != 0):
                    map_user_existed = user.map_set.filter(map_name=map_name)
                    if (map_user_existed.count() != 0):
                        map, created = user.map_set.filter(id=map_existed[0].id).update_or_create(map_name=map_name);
                    else:
                        map_name = map_name + "(1)"
                        createMapDB(map_name)
                else:
                    if (Data.objects.count() != 1):
                        Data.objects.create(id=0, maps_count=1)
                    map_count = Data.objects.filter(id=0)[0].maps_count
                    map, created = user.map_set.update_or_create(id=map_count, map_name=map_name);
                    if created:
                        Data.objects.update(id=0, maps_count=map.id + 1)
                return map

            map = createMapDB(map_name)
            map.count_level = request.POST.get("count_level")
            map.save()
            description = request.POST.get("mapDescription")
            if description == "":
                description = "Без описания/Without description"
            if Post.objects.filter(map=map).count() != 0:
                Post.objects.filter(map=map).update(description=description)
            else:
                Post.objects.update_or_create(map=map, description=description)
            if map.m_level_set.filter(level=request.POST.get("level")).count() != 0:
                map.m_level_set.update(width=request.POST.get("width"), height=request.POST.get("height"),
                                       level=request.POST.get("level"), matrix=request.POST.get("matrix"))
                m_level = map.m_level_set.get(level=request.POST.get("level"))
            else:
                m_level = map.m_level_set.create(width=request.POST.get("width"), height=request.POST.get("height"),
                                                 level=request.POST.get("level"), matrix=request.POST.get("matrix"))
            m_level.m_symbol_set.all().delete()
            symbols = request.POST.get("symbols")
            colors = request.POST.get("colors").split(';')
            for i in range(len(symbols)):
                m_level.m_symbol_set.create(type=i, symbol=symbols[i], color=colors[i])
        except Exception as e:
            return HttpResponseServerError(str(e))
        else:
            return HttpResponseRedirect("/")
    else:
        return HttpResponseBadRequest()


@csrf_protect
def map(request, mapID):
    output = None
    url = "Game/game.html"
    if (request.COOKIES.get("lang") == "en"):
        url = "en/" + url
    if request.method == "POST":
        output = loginUser(request, url)
    if output is None:
        output = render(request, url,
                        {"login_form": LoginForm(), "registration_form": RegistrationForm()})
    return output


@csrf_exempt
def getGameData(request, mapID, level):
    if request.method == "POST":
        try:
            map = Map.objects.get(id=mapID)
            m_level = map.m_level_set.get(level=level)
            mapDescription = Post.objects.get(map=map).description
            symbols = ""
            colors = []
            for i in range(m_level.m_symbol_set.all().count()):
                symbols += m_level.m_symbol_set.get(type=i).symbol
                colors.append(m_level.m_symbol_set.get(type=i).color)
            data = {"mapTitle": map.map_name, "mapDescription": mapDescription, "matrix": m_level.matrix,
                    "count_level": map.count_level,
                    "width": m_level.width, "height": m_level.height, "symbols": symbols, "colors": colors}
            return HttpResponse(json.dumps(data), content_type='application/json')
        except Exception as e:
            return HttpResponseServerError(str(e))
        else:
            return HttpResponseBadRequest()
