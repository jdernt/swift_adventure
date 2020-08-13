from django.db import models


class User(models.Model):
    name = models.CharField(max_length=20, unique=True)


class Account(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
    email = models.EmailField(max_length=30, unique=True)
    password = models.CharField(max_length=20)
    regis_date = models.DateTimeField(auto_now_add=True)
    rating = models.IntegerField(auto_created=0)


class Map(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    map_name = models.CharField(max_length=40, unique=True)
    count_level = models.IntegerField(auto_created=1)


class Post(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    map = models.OneToOneField(Map, on_delete=models.CASCADE)
    description = models.CharField(max_length=700)
    post_date = models.DateTimeField(auto_now_add=True)


class m_Player(models.Model):
    map = models.ForeignKey(User, on_delete=models.CASCADE)
    player_name = models.CharField(max_length=20)
    description = models.CharField(max_length=700)


class m_Level(models.Model):
    map = models.ForeignKey(Map, on_delete=models.CASCADE)
    level = models.IntegerField(default=1)
    width = models.IntegerField(default=4)
    height = models.IntegerField(default=4)
    matrix = models.SlugField(max_length=2000, default="")


class m_Symbol(models.Model):
    map = models.OneToOneField(Map, on_delete=models.CASCADE)
    type = models.IntegerField(auto_created=0)
    trigger = models.BooleanField(auto_created=False)
    symbol = models.CharField(max_length=3, default=".")
    color = models.CharField(max_length=10, default=".")
    description = models.CharField(max_length=300, default="")
