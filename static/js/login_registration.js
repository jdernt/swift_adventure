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
    if (event.target === modalWindow) {
        modalWindow.classList.add('hidden');
        document.body.classList.remove('no-scroll');
    }
    ;
});

// мобильное меню

const burgerBtn = document.querySelector('.header__burger');
const burgerMenu = document.querySelector('.header__nav');

if (window.innerWidth < 725) {
    burgerMenu.classList.remove('flex');
    burgerMenu.classList.add('hidden');
    document.addEventListener('mouseup', function (e) {
        // if (e.target === burgerBtn) {
        // 	return;
        // } else {
        if (burgerMenu.classList.contains('flex')) {
            if (e.target !== burgerBtn && e.target !== burgerMenu) {
                burgerMenu.classList.add('hidden');
                burgerMenu.classList.remove('flex');
            }
            ;
        }
        ;
        // };
    });
}
;

window.addEventListener('resize', function () {
    if (window.innerWidth < 725) {
        burgerMenu.classList.remove('flex');
        burgerMenu.classList.add('hidden');
    }
    ;
    if (window.innerWidth > 725) {
        burgerMenu.classList.add('flex');
        burgerMenu.classList.remove('hidden');
    }
    ;
});

// вызов мобильного меню

burgerBtn.addEventListener('click', function () {
    if (burgerMenu.classList.contains('hidden')) {
        burgerMenu.classList.remove('hidden');
        burgerMenu.classList.add('flex');
    } else {
        burgerMenu.classList.add('hidden');
        burgerMenu.classList.remove('flex');
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

function toggleLogin() {
    if (getCookie("user") != undefined) {
        const loginBtn = document.querySelector('.header__button');
        const headerUserName = document.querySelector('.header__username');
        const logoutBtn = document.querySelector('.header__logout');
        const userBar = document.querySelector('.header__userbar');
        const userName = getCookie("user");

        loginBtn.classList.add('hidden');
        userBar.classList.remove('hidden');
        userBar.classList.add('flex');
        headerUserName.textContent = userName;

        logoutBtn.addEventListener('click', function () {
            userBar.classList.remove('flex');
            userBar.classList.add('hidden');
            loginBtn.classList.remove('hidden');
            deleteCookie("user");
        });
    }
    ;
}

setTimeout(toggleLogin, 20);

selectLang.addEventListener('change', function () {
    setCookie("lang", selectLang.value);
    location.reload();
})


