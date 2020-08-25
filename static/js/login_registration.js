const modalLogin = document.querySelector('.modal__login');
const modalAuth = document.querySelector('.modal__auth');
const headerBtn = document.querySelector('.header__button');

// переключение между формами
document.querySelector('.auth').addEventListener('click', function (e) {
    e.preventDefault();

    modalAuth.classList.toggle('hidden');
    modalLogin.classList.toggle('hidden');
    modalAuth.classList.toggle('flex');
    modalLogin.classList.toggle('flex');

});

document.querySelector('.login').addEventListener('click', function (e) {
    e.preventDefault();

    modalAuth.classList.toggle('hidden');
    modalLogin.classList.toggle('hidden');
    modalAuth.classList.toggle('flex');
    modalLogin.classList.toggle('flex');

});

// вызов модального окна
const modalWindow = document.querySelector('.modal');
const modalWindowBg = document.querySelector('.auth-bg');

headerBtn.addEventListener('click', function () {
    modalWindow.classList.remove('hidden');
    document.body.classList.add('no-scroll');
});

modalWindow.addEventListener('click', function (event) {
    if (event.target === modalWindow || event.target === modalWindowBg) {
        modalWindow.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }
    ;
});

// инпуты регистрации
const authInputName = document.querySelector('.auth__input--name');
const authInputEmail = document.querySelector('.auth__input--email');
const authInputPassword = document.querySelector('.auth__input--password');

const authUserName = authInputName.value;
const authUserEmail = authInputEmail.value;
const authUserPassword = authInputPassword.value;

// инпуты входа
const loginInputName = document.querySelector('.login__input--name');
const loginInputPassword = document.querySelector('.login__input--password');

const loginUserName = loginInputName.value;
const loginUserPassword = loginInputPassword.value;

// мобильное меню

const burgerBtn = document.querySelector('.header__burger');
const burgerMenu = document.querySelector('.header__burger--menu');

burgerBtn.addEventListener('click', function () {
    burgerMenu.classList.toggle('hidden');
})