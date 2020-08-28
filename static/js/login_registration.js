const modalLogin = document.querySelector('.modal__login');
const modalAuth = document.querySelector('.modal__auth');
const headerBtn = document.querySelectorAll('.header__button');

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

function showModalWindow() {
    modalWindow.classList.remove('hidden');
    document.body.classList.add('no-scroll');
};

headerBtn.forEach(button => button.addEventListener('click', showModalWindow));

modalWindow.addEventListener('click', function (event) {
    if (event.target === modalWindow || event.target === modalWindowBg) {
        modalWindow.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }
    ;
});

// мобильное меню

const burgerBtn = document.querySelector('.header__burger');
const burgerMenu = document.querySelector('.header__burger--menu');

burgerBtn.addEventListener('click', function () {
    if (burgerMenu.classList.contains('hidden')) {
        burgerMenu.classList.remove('hidden');
    } else {
        burgerMenu.classList.add('hidden');
    }
    ;
});

document.addEventListener('mouseup', function (e) {
    if (burgerMenu.classList.contains('hidden') === false) {
        if (e.target !== burgerMenu) {
            burgerMenu.classList.add('hidden');
        }
        ;
    }
    ;
});

/*
// инпуты регистрации
const authInputName = document.querySelector('.auth__input--name');
const authInputEmail = document.querySelector('.auth__input--email');
const authInputPassword = document.querySelector('.auth__input--password');

const authUserName = authInputName.value;
const authUserEmail = authInputEmail.value;
const authUserPassword = authInputPassword.value;
*/


// инпуты входа
/*
const loginInputName = document.querySelector('.login__input--name');
const loginInputPassword = document.querySelector('.login__input--password');

const loginUserName = loginInputName.value;
const loginUserPassword = loginInputPassword.value;
*/

/*function question() {
    if (confirm('Перейти на следующий уровень? Все несохраненные данные будут удалены')) {
        return true;
    } else {
        return false;
    }
    ;

}*/
if (getCookie("lang") == "ru") {
}

// deleteCookie("user")


function setUser(login) {
    setCookie("user", login)
}

function getCookie(name) {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : undefined;
}

function setCookie(name, value, options = {}) {

    options = {
        path: '/',
        // при необходимости добавьте другие значения по умолчанию
        ...options
    };

    if (options.expires instanceof Date) {
        options.expires = options.expires.toUTCString();
    }

    let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

    for (let optionKey in options) {
        updatedCookie += "; " + optionKey;
        let optionValue = options[optionKey];
        if (optionValue !== true) {
            updatedCookie += "=" + optionValue;
        }
    }

    document.cookie = updatedCookie;
}


function deleteCookie(name) {
    setCookie(name, "", {
        'max-age': -1
    })
}


// переключение языка
const selectLang = document.querySelector('.footer__select');

if (getCookie("lang") != undefined) {
    selectLang.value = getCookie("lang");
}

if (getCookie("user") != undefined) {
    document.querySelector('.button-sign_up').innerHTML = getCookie("user");
    document.querySelector('.button-sign_up-in-block').innerHTML = getCookie("user");
}

selectLang.addEventListener('change', function () {
    setCookie("lang", selectLang.value);
    location.reload();
})


