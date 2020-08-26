from django import forms
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm


class LoginForm(forms.Form):
    login = forms.CharField(min_length=3, max_length=20,
                            widget=forms.TextInput(
                                attrs={"class": "login__input--name modal__input input", "placeholder": "Логин",
                                       "id": "id_loginform_login"}))
    password = forms.CharField(min_length=6, max_length=20,
                               widget=forms.PasswordInput(
                                   attrs={"class": "login__input--password modal__input input", "placeholder": "Пароль",
                                          "id": "id_loginform_password", "autocomplete": "off"}))


class RegistrationForm(forms.Form):
    login = forms.CharField(min_length=3, max_length=20,
                            widget=forms.TextInput(
                                attrs={"class": "auth__input--name modal__input input", "placeholder": "Логин"}))
    email = forms.EmailField(min_length=4, max_length=30,
                             widget=forms.TextInput(
                                 attrs={"class": "auth__input--email modal__input input", "placeholder": "Емайл"}))
    password = forms.CharField(min_length=6, max_length=20,
                               widget=forms.PasswordInput(
                                   attrs={"class": "auth__input--password modal__input input", "placeholder": "Пароль",
                                          "autocomplete": "off"}))
