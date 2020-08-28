from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


class LoginForm(forms.Form):
    "Форма входа на сайт"
    login = forms.CharField(min_length=3, max_length=20, label="Логин",
                            widget=forms.TextInput(
                                attrs={"class": "login__input--name modal__input input",
                                       "id": "id_loginform_login"}))
    password = forms.CharField(min_length=6, max_length=20, label="Пароль",
                               widget=forms.PasswordInput(
                                   attrs={"class": "login__input--password modal__input input",
                                          "id": "id_loginform_password", "autocomplete": "off"}))
    # def __init__(self, l="Login", p="Password"):
    #     self.login = forms.CharField(min_length=3, max_length=20,
    #                         widget=forms.TextInput(
    #                             attrs={"class": "login__input--name modal__input input",
    #                                    "id": "id_loginform_login"}))
    #     self.password = forms.CharField(min_length=6, max_length=20,
    #                            widget=forms.PasswordInput(
    #                                attrs={"class": "login__input--password modal__input input",
    #                                       "id": "id_loginform_password", "autocomplete": "off"}))


class RegistrationForm(forms.Form):
    """
    Форма регистрации
    """
    login = forms.CharField(min_length=3, max_length=20, label="Логин",
                            widget=forms.TextInput(attrs={"class": "auth__input--name modal__input input"}))
    email = forms.EmailField(min_length=4, max_length=30, label="Пароль",
                             widget=forms.TextInput(
                                 attrs={"class": "auth__input--email modal__input input"}))
    password = forms.CharField(min_length=6, max_length=20, label="Почта",
                               widget=forms.PasswordInput(
                                   attrs={"class": "auth__input--password modal__input input",
                                          "autocomplete": "off"}))
    # def __init__(self, l="Login", p="Password", e="Email"):
    #     self.login = forms.CharField(min_length=3, max_length=20,
    #                         widget=forms.TextInput(
    #                             attrs={"class": "auth__input--name modal__input input"}))
    #     self.email = forms.EmailField(min_length=4, max_length=30,
    #                          widget=forms.TextInput(
    #                              attrs={"class": "auth__input--email modal__input input"}))
    #     self.password = forms.CharField(min_length=6, max_length=20,
    #                            widget=forms.PasswordInput(
    #                                attrs={"class": "auth__input--password modal__input input",
    #                                       "autocomplete": "off"}))


class LoginFormEng(forms.Form):
    """Версия формы для английской версии сайта"""
    login = forms.CharField(min_length=3, max_length=20, label="Логин",
                            widget=forms.TextInput(
                                attrs={"class": "login__input--name modal__input input",
                                       "id": "id_loginform_login"}))
    password = forms.CharField(min_length=6, max_length=20, label="Пароль",
                               widget=forms.PasswordInput(
                                   attrs={"class": "login__input--password modal__input input",
                                          "id": "id_loginform_password", "autocomplete": "off"}))


class RegistrationFormEng(forms.Form):
    """Версия формы для английской версии сайта"""
    login = forms.CharField(min_length=3, max_length=20, label="Логин",
                            widget=forms.TextInput(attrs={"class": "auth__input--name modal__input input"}))
    email = forms.EmailField(min_length=4, max_length=30, label="Пароль",
                             widget=forms.TextInput(
                                 attrs={"class": "auth__input--email modal__input input"}))
    password = forms.CharField(min_length=6, max_length=20, label="Почта",
                               widget=forms.PasswordInput(
                                   attrs={"class": "auth__input--password modal__input input",
                                          "autocomplete": "off"}))
