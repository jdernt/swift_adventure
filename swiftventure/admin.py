from django.contrib import admin
from .models import User, Account, Map, Post, m_Level, m_Symbol, Data

# Register your models here.

admin.site.register(User)
admin.site.register(Account)
admin.site.register(Map)
admin.site.register(Post)
admin.site.register(m_Level)
admin.site.register(m_Symbol)
admin.site.register(Data)
