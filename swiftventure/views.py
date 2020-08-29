import json
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, HttpResponseServerError, HttpResponseBadRequest
from .forms import LoginForm, RegistrationForm, LoginFormEng, RegistrationFormEng
from .models import User, Map, Data, Post, Account
from django.views.decorators.csrf import csrf_exempt, csrf_protect


def set_render(request, url, isEng, message="", script=["", "", ""], content=[]):
    """
    Обрабатывает страницу в зависимости от языка возвращает зарендеренную страницу

    :param request: запрос серверу
    :param url: ссылка
    :param isEng: страница на английском, в противном случае на русском
    :param message: сообщение, выводимое на экран
    :param script: выводит небольшой скрипт, нужный для регистрации пользователя
    :param content: необходим для построения уникальных данных html страниц, прежде всего лента пользователя
    """
    if isEng:
        output = render(request, url,
                        {"login_form": LoginFormEng(), "registration_form": RegistrationFormEng(),
                         "message": message, "script": script, "content": content})
    else:
        output = render(request, url,
                        {"login_form": LoginForm(), "registration_form": RegistrationForm(),
                         "message": message, "script": script, "content": content})
    return output


@csrf_protect
def mainpage(request):
    url = "Pages/mainpage.html"
    isEng = False;
    if (request.COOKIES.get("lang") == "en"):
        url = "en/" + url
        isEng = True;
    if request.method == "POST":
        return loginUser(request, url, isEng)
    return set_render(request, url, isEng)


def loginUser(request, url, isEng, content=[]):
    """
    Обрабатывает введённые пользователем формы регистрации и входа
    и возвращает сообщения при ошибке или регистрирует пользователя

    """
    loginform = LoginForm(request.POST)
    registrationform = LoginForm(request.POST)
    email = request.POST.get("email")
    if loginform.is_valid() and (email is None):
        login = request.POST.get("login")
        password = request.POST.get("password")
        if User.objects.filter(name=login).count() == 1:
            user = User.objects.get(name=login)
            if Account.objects.get(user=user).password != password:
                return set_render(request, url, isEng, "Неправильный пароль/Wrong password", content=content)
            script = ["setUser(", login, ")"]
            return set_render(request, url, isEng,
                              "Вход выполнен успешно/Sign up is successful", script, content=content)
        return set_render(request, url, isEng, "Пользователь не найден/User is not found", content=content)
    elif registrationform.is_valid():
        login = request.POST.get("login")
        password = request.POST.get("password")
        if (User.objects.filter(name=login).count() >= 1):
            return set_render(request, url, isEng,
                              "Данный пользователь уже зарегистрирован/User is already registered", content=content)
        if (Account.objects.filter(email=email).count() >= 1):
            return set_render(request, url, isEng,
                              "Данный емайл уже зарегистрирован/Email is already registered", content=content)
        user = User.objects.create(name=login)
        Account.objects.create(user=user, password=password, email=email, rating=0.)
        script = ["setUser(", login, ")"]
        return set_render(request, url, isEng,
                          "Регистрация успешно завершена/Registration is successful", content=content)
    else:
        return set_render(request, url, isEng, content=content)


@csrf_protect
def scroll(request, page, sort_crit):
    """
    Возвращает посты пользователей, взятые из БД

    :param request: запрос серверу
    :param page: номер страницы ленты
    :param sort_crit: критерий сортировки: date- по дате, popularity- по популярности
    :return:
    """
    url = "Pages/scroll.html"
    isEng = False;
    if (request.COOKIES.get("lang") == "en"):
        url = "en/" + url
        isEng = True;
    if sort_crit == "popularity":
        posts = Post.objects.all().order_by('-number_of_rate');
    elif sort_crit == "date":
        posts = Post.objects.all().order_by('-post_date');
    else:
        posts = Post.objects.filter(map__map_name__contains=sort_crit);
    content = [];
    count = 0;
    for post in posts:
        post_date = post.post_date
        count += 1
        if (count > ((page - 1) * 10) and count <= ((page - 1) * 10 + 10)):
            content.append({"name": post.map.user.name, "rating": post.number_of_rate, "datetime": post.post_date,
                            "count": count, "mapTitle": post.map.map_name, "mapDescription": post.description,
                            "mapID": post.map.id})
    if request.method == "POST":
        return loginUser(request, url, isEng, content=content)
    return set_render(request, url, isEng, content=content)


@csrf_exempt
def changeRate(request):
    """
    изменяется рэйтинг карты и её автора
    """
    if request.method == "POST":
        try:
            mapID = request.POST.get("map_id")
            rating = int(request.POST.get("rating"))
            map = Map.objects.get(id=mapID)
            post = Post.objects.get(map=map)
            post.number_of_rate += rating
            post.save()
            acc = map.user.account
            acc.rating += rating
            acc.save()
            return HttpResponse("/")
        except Exception as e:
            return HttpResponseServerError(str(e))
        else:
            return HttpResponseBadRequest()

@csrf_protect
def learn(request):
    url = "Pages/learning.html"
    isEng = False;
    if (request.COOKIES.get("lang") == "en"):
        url = "en/" + url
        isEng = True;
    if request.method == "POST":
        return loginUser(request, url, isEng)
    return set_render(request, url, isEng)


def account(request):
    return HttpResponse("1")


@csrf_protect
def privacy(request):
    url = "Pages/policy.html"
    isEng = False;
    if (request.COOKIES.get("lang") == "en"):
        url = "en/" + url
        isEng = True;
    if request.method == "POST":
        return loginUser(request, url, isEng)
    return set_render(request, url, isEng)


@csrf_protect
def agreement(request):
    url = "Pages/agreement.html"
    isEng = False;
    if (request.COOKIES.get("lang") == "en"):
        url = "en/" + url
        isEng = True;
    if request.method == "POST":
        return loginUser(request, url, isEng)
    return set_render(request, url, isEng)


@csrf_protect
def construct(request, level):
    url = "Constructor/сreation.html"
    isEng = False;
    if (request.COOKIES.get("lang") == "en"):
        url = "en/" + url
        isEng = True;
    if request.method == "POST":
        return loginUser(request, url, isEng)
    return set_render(request, url, isEng)


@csrf_exempt
def submitConstructorData(request):
    """
    Заносит данные игры, сделанной пользователем в БД

    """
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
    url = "Game/game.html"
    isEng = False;
    if (request.COOKIES.get("lang") == "en"):
        url = "en/" + url
        isEng = True;
    if request.method == "POST":
        return loginUser(request, url, isEng)
    return set_render(request, url, isEng)


@csrf_exempt
def getGameData(request, mapID, level):
    """
    Возврашает данные игры. Соответственно: Имя карты, описание, матрицу символов, общее кол-во уровней,
    ширину матрицы, длину, символы уровня, их цвета.
    :param request: запрос на сервер
    :param mapID: Айди карты с сайта, соответствующий айди в бд
    :param level: уровень с сайта
    """
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
