// чтобы добавить новый элемент и его символ, необходимо добавить placeholder, inputValue, spacesDisabled, symbolBtn click, selectBtn click

let userName = getCookie("user")
if (userName == undefined)
    alert("Пожалуйста, войдите на сайт или зарегистрируйтесь")

const errorPlayer = document.querySelector('.error__player');
const errorMap = document.querySelector('.error__grid');
const errorSubmit = document.querySelector('.error__submit');

let is_first_creation = true;
var m_width, m_height, matrixOfSymbols;

let cl_list_tokens = ['wall', 'mob', 'background', 'player', 'weapon', 'luke', 'potion', 'hp-buff', 'damage-buff'];

// функция присваивания ссылке класса "активная ссылка"
const pathname = window.location.pathname;
const levelPathname = pathname.split('/')[2];
// const levelPathname = pathname.split('/')[3]; // для гитхаба
const level = levelPathname.split('_')[1];

if (level == 1) {
    localStorage.clear();
    localStorage.setItem("countLevel", 1);
}


function addActiveLink() {
    const levelsLinks = document.querySelectorAll('.levels__link');
    for (i = 0; i < levelsLinks.length; i++) {
        if (levelsLinks[i].classList.contains(level.toString())) {
            levelsLinks[i].classList.add('active-link');
        }
        ;
    }
    ;
};

addActiveLink();

// функция перехода по ссылке
const levelsNav = document.querySelector('.levels__nav');
const links = document.querySelectorAll('.levels__link');
let linksArray = [];

for (i = 0; i < links.length; i++) {
    linksArray[i] = links[i];
}
;

levelsNav.addEventListener('click', function (e) {
    e.preventDefault();
    if (event.target.classList.contains('levels__link')) {
        goToPage(event.target);
    }
    ;
});

function goToPage(element) {
    console.log(linksArray);
    let index = linksArray.indexOf(element, 0);
    index = index + 1;
    console.log(index);
    let url = 'level_' + index;
    //console.log(url);
    document.location.href = url;
};

// функция добавления нового уровня
//const addLinkBtn = document.querySelector('.levels__btn');
let count_level = parseInt(localStorage.getItem('countLevel'));
if (localStorage.getItem('countLevel') == null)
    count_level = 1;
for (let i = 0; i < count_level - 1; i++)
    addLevel();

function addLevel() {
    const newLink = document.createElement('a');

    linksArray.push(newLink);

    let index = linksArray.indexOf(newLink, 0);
    if (index > 10) return;
    index = index + 1;
    newLink.classList.add('levels__link');
    newLink.classList.add('level_' + index);
    newLink.setAttribute('href', ("/construct/level_" + index));
    newLink.setAttribute('onclick', 'return question()');
    newLink.textContent = 'Уровень ' + index;
    localStorage.setItem('countLevel', index);
    levelsNav.appendChild(newLink);
    //console.log(linksArray);
}

//addLinkBtn.addEventListener('click',  addLevel);

// дефолтные значения ячеек хранятся в placeholder
const wallPlaceholder = document.querySelector('.wall-symbol').placeholder;
const mobPlaceholder = document.querySelector('.mob-symbol').placeholder;
const bgPlaceholder = document.querySelector('.bg-symbol').placeholder;
const playerPlaceholder = document.querySelector('.player-symbol').placeholder;
const weaponPlaceholder = document.querySelector('.weapon-symbol').placeholder;
const lukePlaceholder = document.querySelector('.luke-symbol').placeholder;
const potionPlaceholder = document.querySelector('.potion-symbol').placeholder;
const hpBuffPlaceholder = document.querySelector('.hp-buff-symbol').placeholder;
const damageBuffPlaceholder = document.querySelector('.damage-buff-symbol').placeholder;

// отрисовка поля
const fieldEl = document.querySelector('.field');

function createField(rows, columns) {
    fieldEl.innerHTML = '';
    m_width = columns;
    m_height = rows;
    for (let i = 0; i < rows; i++) {
        fieldEl.appendChild(createRow(columns))
    }
    ;
};

function createRow(cellsCount) {
    const rowEl = document.createElement('div');
    rowEl.classList.add('row');

    for (let i = 0; i < cellsCount; i++) {
        const cellEl = document.createElement('div');
        cellEl.classList.add('cell');
        cellEl.classList.add('background');
        if (localStorage.getItem('symbolBg') !== null && localStorage.getItem('symbolBg').length >= 1) {
            cellEl.textContent = localStorage.getItem('symbolBg');
        } else {
            localStorage.setItem('symbolBg', bgPlaceholder);
            cellEl.textContent = localStorage.getItem('symbolBg');
        }
        ;
        rowEl.appendChild(cellEl)
    }
    ;
    return rowEl;
};

// сохранение разметки поля
const y = document.querySelector('.grid__hgt');
const x = document.querySelector('.grid__wdt');

var matrix_form = document.getElementById('matrix_create');

function loadData() {
    var data = JSON.parse(localStorage.getItem(matrix_form.id));
    if (data !== null) { // проверка на null и undefined
        for (i = 0; i < matrix_form.elements.length - 1; i++) {
            matrix_form.elements[i].value = data[matrix_form.elements[i].id];
        }
        ;
    }
    ;
};

function saveData() {
    var data = {};
    for (i = 0; i < matrix_form.elements.length - 1; i++) {
        data[matrix_form.elements[i].id] = matrix_form.elements[i].value;
        localStorage.setItem(matrix_form.id, JSON.stringify(data));
        matrix_form.elements[i].value = '';
    }
    ;
};

loadData();

matrix_form.addEventListener('submit', saveData, false);

// генерация поля по заданным значениям
const fieldRules = {
    min: 6,
    max: 16
};

const createBtn = document.querySelector('.grid__btn');
const saveBtn = document.querySelector('.submit__btn');
const mapOptions = document.querySelector('.map__options');
const symbolsBlock = document.querySelector('.symbols');


createBtn.addEventListener('click', function () {
    const y = document.querySelector('.grid__hgt');
    const x = document.querySelector('.grid__wdt');

    const instruction = document.querySelector('.instruction');

    if (y.value <= fieldRules.max && x.value <= fieldRules.max && y.value >= fieldRules.min && x.value >= fieldRules.min) {
        //instruction.classList.add('hidden');
        createField(y.value, x.value);
        mapOptions.classList.remove('hidden');
        mapOptions.classList.add('flex');
        symbolsBlock.classList.remove('hidden');
        saveData();
    } else {
        errorMap.classList.remove('hidden');
    }
    ;
});

// задаем инпутам значения равные переменным local storage
const symbolWall = document.querySelector('.wall-symbol');
const symbolMob = document.querySelector('.mob-symbol');
const symbolBg = document.querySelector('.bg-symbol');
const symbolPlayer = document.querySelector('.player-symbol');
const symbolWeapon = document.querySelector('.weapon-symbol');
const symbolLuke = document.querySelector('.luke-symbol');
const symbolPotion = document.querySelector('.potion-symbol');
const symbolHpBuff = document.querySelector('.hp-buff-symbol');
const symbolDamageBuff = document.querySelector('.damage-buff-symbol');

function inputValue(elementInput, elementSymbol) {
    if (localStorage.getItem(elementSymbol) !== null && elementInput !== null) {
        elementInput.value = localStorage.getItem(elementSymbol);
    }
    ;
};

inputValue(symbolWall, 'symbolWall');
inputValue(symbolMob, 'symbolMob');
inputValue(symbolBg, 'symbolBg');
inputValue(symbolPlayer, 'symbolPlayer');
inputValue(symbolWeapon, 'symbolWeapon');
inputValue(symbolLuke, 'symbolLuke');
inputValue(symbolPotion, 'symbolPotion');
inputValue(symbolHpBuff, 'symbolHpBuff');
inputValue(symbolDamageBuff, 'symbolDamageBuff');

// отключение пробела в поле ввода символа
function spacesDisabled(inpValue) {
    let prevVal = "";
    inpValue.addEventListener('beforeinput', (e) => {
        prevVal = inpValue.value;
    });

    inpValue.addEventListener('input', (e) => {
        if (!/^(|[^\s][a-zA-Zа-яА-Я\s]*)$/.test(inpValue.value)) {
            inpValue.value = prevVal;
        }
        ;
    });
};

spacesDisabled(symbolWall);
spacesDisabled(symbolMob);
spacesDisabled(symbolBg);
spacesDisabled(symbolPlayer);
spacesDisabled(symbolWeapon);
spacesDisabled(symbolLuke);
spacesDisabled(symbolPotion);
spacesDisabled(symbolHpBuff);
spacesDisabled(symbolDamageBuff);

// задаем цвета равные переменным local storage
const wallColor = document.querySelector('.wall-color');
const mobColor = document.querySelector('.mob-color');
const bgColor = document.querySelector('.bg-color');
const playerColor = document.querySelector('.player-color');
const weaponColor = document.querySelector('.weapon-color');
const lukeColor = document.querySelector('.luke-color');
const potionColor = document.querySelector('.potion-color');
const hpBuffColor = document.querySelector('.hp-buff-color');
const damageBuffColor = document.querySelector('.damage-buff-color');

inputValue(wallColor, 'wallColor');
inputValue(mobColor, 'mobColor');
inputValue(bgColor, 'bgColor');
inputValue(playerColor, 'playerColor');
inputValue(weaponColor, 'weaponColor');
inputValue(lukeColor, 'lukeColor');
inputValue(potionColor, 'potionColor');
inputValue(hpBuffColor, 'hpBuffColor');
inputValue(damageBuffColor, 'damageBuffColor');

// сбрасываем значения инпутов
const clearBtn = document.querySelector('.clear-btn');

const wallDefaultColor = '#9c9c9c';
const bgDefaultColor = '#3a3a3a';
const playerDefaultColor = '#00bdb3';
const mobDefaultColor = '#f5c542';
const weaponDefaultColor = '#a14fe4';
const lukeDefaultColor = '#df731b';
const potionDefaultColor = '#df1b2b';
const hpBuffDefaultColor = '#69df1b';
const damageBuffDefaultColor = '#7f56f1';

clearBtn.addEventListener('click', function () {
    localStorage.clear();
    const elementsInput = document.querySelectorAll('.symbols__input');
    elementsInput.forEach(input => input.value = '');

    function removeItems(itemName, input, defaultColor) {
        localStorage.removeItem(itemName);
        input.value = defaultColor;
    };

    removeItems('wallColor', wallColor, wallDefaultColor);
    removeItems('mobColor', mobColor, mobDefaultColor);
    removeItems('bgColor', bgColor, bgDefaultColor);
    removeItems('playerColor', playerColor, playerDefaultColor);
    removeItems('weaponColor', weaponColor, weaponDefaultColor);
    removeItems('lukeColor', lukeColor, lukeDefaultColor);
    removeItems('potionColor', potionColor, potionDefaultColor);
    removeItems('hpBuffColor', hpBuffColor, hpBuffDefaultColor);
    removeItems('damageBuffColor', damageBuffColor, damageBuffDefaultColor);

});

// изменения элементов

const selectBox = document.querySelector('.select');

// по клику на ячейку появляется окно с выбором типа ячейки, если пользователь нажимает Esc - выделение сбрасывается, если пользователь кликает на ячейку повторно - выделение сбрасывается
fieldEl.addEventListener('click', function () {
    const target = event.target;
    const activeArr = document.querySelectorAll('.active');
    if (target.classList.contains('active')) {
        if (activeArr.length <= 1) {
            selectBox.classList.add('hidden');
            target.classList.toggle('active');
        } else {
            target.classList.toggle('active');
        }
        ;
    } else if (target.classList.contains('row') === false && target.classList.contains('field') === false) {
        selectBox.classList.remove('hidden');
        target.classList.toggle('active');
    }
    ;
});

document.addEventListener('keydown', function escPress(event) {
    if (event.key === 'Escape') {
        const activeArr = document.querySelectorAll('.active');
        selectBox.classList.add('hidden');
        for (i = 0; i < activeArr.length; i++) {
            activeArr[i].classList.remove('active');
        }
        ;
    }
    ;
});

// по клику на кнопку в окне выбора символа, ячейкам определенного типа присваивается выбранное значение в виде символа
const symbolBtn = document.querySelector('.symbols__btn');

function setElements() {

    const wall = document.querySelectorAll('.wall');
    const mob = document.querySelectorAll('.mob');
    const background = document.querySelectorAll('.background');
    const player = document.querySelectorAll('.player');
    const weapon = document.querySelectorAll('.weapon');
    const luke = document.querySelectorAll('.luke');
    const potion = document.querySelectorAll('.potion');
    const hpBuff = document.querySelectorAll('.hp-buff');
    const damageBuff = document.querySelectorAll('.damage-buff');


// возможность выбора цвета
    function setColor(element, variable, elementColor, elementInput) {
        localStorage.setItem(elementColor, elementInput.value);
        for (i = 0; i < element.length; i++) {
            element[i].style.setProperty(variable, elementInput.value);
        }
        ;
    };

    setColor(wall, '--wall-color', 'wallColor', wallColor);
    setColor(mob, '--mob-color', 'mobColor', mobColor);
    setColor(background, '--bg-color', 'bgColor', bgColor);
    setColor(player, '--player-color', 'playerColor', playerColor);
    setColor(weapon, '--weapon-color', 'weaponColor', weaponColor);
    setColor(luke, '--luke-color', 'lukeColor', lukeColor);
    setColor(potion, '--potion-color', 'potionColor', potionColor);
    setColor(hpBuff, '--hp-buff-color', 'hpBuffColor', hpBuffColor);
    setColor(damageBuff, '--damage-buff-color', 'damageBuffColor', damageBuffColor);

// проверка символов на уникальность
    const symbolsInput = document.querySelectorAll('.symbols__input');
    let inputPlaceholders = [];
    let inputValues = [];

    for (i = 0; i < symbolsInput.length; i++) {
        inputPlaceholders[i] = symbolsInput[i].placeholder;
        inputValues[i] = symbolsInput[i].value;
    }
    ;

    function checkAvailability(arr, val) {
        return arr.some(function (arrVal) {
            return val === arrVal;
        });
    };

    function setElementSymbol(element, elementSymbol) {
        if (checkAvailability(inputPlaceholders, element.value) === false) {
            if (element.value.length > 0) {
                localStorage.setItem(elementSymbol, element.value);
            } else {
                localStorage.setItem(elementSymbol, element.placeholder);
            }
            ;
        } else {
            element.value = '';
        }
        ;
    };

    setElementSymbol(symbolWall, 'symbolWall');
    setElementSymbol(symbolMob, 'symbolMob');
    setElementSymbol(symbolBg, 'symbolBg');
    setElementSymbol(symbolPlayer, 'symbolPlayer');
    setElementSymbol(symbolWeapon, 'symbolWeapon');
    setElementSymbol(symbolLuke, 'symbolLuke');
    setElementSymbol(symbolPotion, 'symbolPotion');
    setElementSymbol(symbolHpBuff, 'symbolHpBuff');
    setElementSymbol(symbolDamageBuff, 'symbolDamageBuff');

// отобажение выбранных символов на игровом поле
    function setSymbol(element, symbolElement, elementPlaceholder) {
        for (i = 0; i < element.length; i++) {
            if (localStorage.getItem(symbolElement).length >= 1) {
                element[i].textContent = localStorage.getItem(symbolElement);
            } else {
                localStorage.setItem(symbolElement, elementPlaceholder);
                element[i].textContent = localStorage.getItem(symbolElement);
            }
            ;
        }
        ;
    };

    setSymbol(wall, 'symbolWall', wallPlaceholder);
    setSymbol(mob, 'symbolMob', mobPlaceholder);
    setSymbol(background, 'symbolBg', bgPlaceholder);
    setSymbol(player, 'symbolPlayer', playerPlaceholder);
    setSymbol(weapon, 'symbolWeapon', weaponPlaceholder);
    setSymbol(luke, 'symbolLuke', lukePlaceholder);
    setSymbol(potion, 'symbolPotion', potionPlaceholder);
    setSymbol(hpBuff, 'symbolHpBuff', hpBuffPlaceholder);
    setSymbol(damageBuff, 'symbolDamageBuff', damageBuffPlaceholder);
}

symbolBtn.addEventListener('click', setElements());

//предотвращение изменения названия карты не на 1 уровне

map__title = document.querySelector('.map__title');
map__description = document.querySelector('.map__description');

if (localStorage.getItem("mapTitle") == null)
    map__title.setAttribute("placeholder", "Моя карта");
else map__title.setAttribute("placeholder", localStorage.getItem("mapTitle"));
if (localStorage.getItem("mapDescription") == null)
    map__description.setAttribute("placeholder", "Описание карты");
else map__description.setAttribute("placeholder", localStorage.getItem("mapDescription"));
if (level != 1) {
    map__title.setAttribute("readonly", true);
    map__description.setAttribute("readonly", true);
}

// по клику на кнопку в появляющемся окне выделенным ячейкам задается выбранный пользователем тип и символ
const selectBtn = document.querySelector('.select__btn');

selectBtn.addEventListener('click', function () {
    const target = document.querySelectorAll('.active');
    const checkedBox = document.querySelector('.radio:checked');

    function setItems(value, symbolElement, symbolPlaceholder) {
        if (checkedBox.value === value) {
            for (i = 0; i < target.length; i++) {
                if (localStorage.getItem(symbolElement) !== null && localStorage.getItem(symbolElement).length >= 1) {
                    target[i].textContent = localStorage.getItem(symbolElement);
                } else {
                    target[i].textContent = symbolPlaceholder;
                }
                ;
                target[i].className = '';
                target[i].classList.add('cell');
                target[i].classList.add(value);
            }
            ;
        }
        ;
    };

    const player = document.querySelectorAll('.player');
    const weapon = document.querySelectorAll('.weapon');
    const luke = document.querySelectorAll('.luke');
    const hpBuff = document.querySelectorAll('.hp-buff');
    const damageBuff = document.querySelectorAll('.damage-buff');

    const playerBlock = document.querySelector('.player');
    const weaponBlock = document.querySelector('.weapon');
    const lukeBlock = document.querySelector('.luke');
    const hpBuffBlock = document.querySelector('.hp-buff');
    const damageBuffBlock = document.querySelector('.damage-buff');


    function setSingleItem(value, elementBlock, elementArr, symbolElement, symbolPlaceholder) {
        if (checkedBox.value === value) {
            if (target.length === 1) {
                if (elementBlock !== null) {
                    for (i = 0; i < elementArr.length; i++) {
                        if (localStorage.getItem('symbolBg') !== null && localStorage.getItem('symbolBg').length >= 1) {
                            elementArr[i].textContent = localStorage.getItem('symbolBg');
                        } else {
                            elementArr[i].textContent = bgPlaceholder;
                        }
                        ;
                        elementArr[i].classList.remove(value);
                        elementArr[i].classList.add('background');
                    }
                    ;
                    for (i = 0; i < target.length; i++) {
                        if (localStorage.getItem(symbolElement) !== null && localStorage.getItem(symbolElement).length >= 1) {
                            target[i].textContent = localStorage.getItem(symbolElement);
                        } else {
                            target[i].textContent = symbolPlaceholder;
                        }
                        ;
                        target[i].className = '';
                        target[i].classList.add('cell');
                        target[i].classList.add(value);
                    }
                    ;
                } else {
                    for (i = 0; i < target.length; i++) {
                        if (localStorage.getItem(symbolElement) !== null && localStorage.getItem(symbolElement).length >= 1) {
                            target[i].textContent = localStorage.getItem(symbolElement);
                        } else {
                            target[i].textContent = symbolPlaceholder;
                        }
                        ;
                        target[i].className = '';
                        target[i].classList.add('cell');
                        target[i].classList.add(value);
                    }
                    ;
                }
                ;
            } else {
                errorPlayer.classList.remove('hidden');
                const activeArr = document.querySelectorAll('.active');
                for (i = 0; i < activeArr.length; i++) {
                    activeArr[i].classList.remove('active');
                }
                ;
            }
            ;
        }
        ;
    };

    setItems('wall', 'symbolWall', wallPlaceholder);
    setItems('mob', 'symbolMob', mobPlaceholder);
    setItems('background', 'symbolBg', bgPlaceholder);
    setItems('potion', 'symbolPotion', potionPlaceholder);

    setSingleItem('player', playerBlock, player, 'symbolPlayer', playerPlaceholder);
    setSingleItem('weapon', weaponBlock, weapon, 'symbolWeapon', weaponPlaceholder);
    setSingleItem('luke', lukeBlock, luke, 'symbolLuke', lukePlaceholder);
    setSingleItem('hp-buff', hpBuffBlock, hpBuff, 'symbolHpBuff', hpBuffPlaceholder);
    setSingleItem('damage-buff', damageBuffBlock, damageBuff, 'symbolDamageBuff', damageBuffPlaceholder);

    selectBox.classList.add('hidden');
});

// скрываем отобразившиеся ошибки
function errorsDisabled() {
    errorPlayer.classList.add('hidden');
    errorMap.classList.add('hidden');
    errorSubmit.classList.add('hidden');
};


document.addEventListener('click', function () {
    if (errorPlayer.classList.contains('hidden') === false || errorMap.classList.contains('hidden') === false) {
        setTimeout(errorsDisabled, 5000);
    }
    ;
    if (errorSubmit.classList.contains('hidden') === false) {
        setTimeout(errorsDisabled, 10000);
    }
    ;
});

// подтверждение перехода по ссылке
function question() {
    if (confirm('Перейти на следующий уровень? Все несохраненные данные будут удалены')) {
        return true;
    } else {
        return false;
    }
    ;
};


// сохранение разметки игрового поля в local storage
function localData() {
    const playerBlock = document.querySelector('.player');
    const lukeBlock = document.querySelector('.luke');
    const potion = document.querySelectorAll('.potion');
    const mob = document.querySelectorAll('.mob');

    if (playerBlock !== null && lukeBlock !== null) {
        if (mob.length > 3 && potion.length >= 1) {
            let map = fieldEl.innerHTML;
            localStorage.setItem(level.toString(), map);
        } else if (mob.length > 3 && potion.length < 1) {
            errorSubmit.classList.remove('hidden');
        } else {
            let map = fieldEl.innerHTML;
            localStorage.setItem(level.toString(), map);
        }
        ;
    } else {
        errorSubmit.classList.remove('hidden');
    }
    ;

    if (level == 1) {
        const mapTitle = document.querySelector('.map__title');
        const mapDescription = document.querySelector('.map__description');

        localStorage.setItem('mapTitle', mapTitle.value);
        localStorage.setItem('mapDescription', mapDescription.value);
    }
};

// урезанная функция перемещения
document.addEventListener('keydown', function move(event) {
    const playerBlock = document.querySelector('.player');

    if (playerBlock !== null) {
        const playerNextBlock = playerBlock.nextSibling;
        const playerPrevBlock = playerBlock.previousSibling;
        const rowEl = playerBlock.parentNode;
        const rowPrev = rowEl.previousSibling;
        const rowNext = rowEl.nextSibling;
        const playerSym = document.querySelector('.player').textContent;
        const bgSym = document.querySelector('.background').textContent;

// условия взаимодействия с разными объектами
        function movePlayer(nextElement) {
            if (nextElement.classList.contains('background')) {
                playerBlock.textContent = bgSym;
                playerBlock.classList.remove('player');
                playerBlock.classList.add('background');
                nextElement.classList.add('player');
                nextElement.classList.remove('background');
                nextElement.textContent = playerSym;
            }
            ;
        };

        if (playerNextBlock !== null && event.key === 'ArrowRight') {
            movePlayer(playerNextBlock);
        } else if (playerPrevBlock !== null && event.key === 'ArrowLeft') {
            movePlayer(playerPrevBlock);
        }
        ;
        if (event.key === 'ArrowUp') {
            for (i = 0; i < rowEl.childNodes.length; i++) {
                if (rowPrev !== null && rowEl.childNodes[i].classList.contains('player')) {
                    movePlayer(rowPrev.childNodes[i]);
                }
                ;
            }
            ;
        }
        ;
        if (event.key === 'ArrowDown') {
            for (i = 0; i < rowEl.childNodes.length; i++) {
                if (rowNext !== null && rowEl.childNodes[i].classList.contains('player')) {
                    movePlayer(rowNext.childNodes[i]);
                }
                ;
            }
            ;
        }
        ;
    }
    ;
});