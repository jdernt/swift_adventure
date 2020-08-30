const fieldEl = document.querySelector('.field');

const textBlock = document.querySelector('.game__text');
const sword = document.querySelector('.game__weapon');
const healthPlayer = document.querySelector('.game__health-player');
const healthTarget = document.querySelector('.game__health-target');
const notice = document.querySelector('.notice');
// характеристики
let maxHpPlayer = 180;
let maxHpTarget = 80;
let PlayerHP = 180;
let TargetHP = 80;
let addHp = 15;
let addDamage = 5;

let playerDamageMax = 13;
let playerDamageMin = 10;
let swordDamageMax = 30;
let swordDamageMin = 25;
let mobDamageMax = 12;
let mobDamageMin = 8;

const wall = document.querySelectorAll('.wall');
const mob = document.querySelectorAll('.mob');
const background = document.querySelectorAll('.background');
const player = document.querySelectorAll('.player');
const weapon = document.querySelectorAll('.weapon');
const luke = document.querySelectorAll('.luke');
const potion = document.querySelectorAll('.potion');
const hpBuff = document.querySelectorAll('.hp-buff');
const damageBuff = document.querySelectorAll('.damage-buff');

function setColor(element, variable, elementColor) {
    for (i = 0; i < element.length; i++) {
        element[i].style.setProperty(variable, colors[arrColor.indexOf(elementColor)]);
    }
    ;
};

var arrSymbol = ['symbolWall', 'symbolMob', "symbolBg", 'symbolPlayer', 'symbolWeapon', 'symbolLuke', 'symbolPotion', 'symbolHpBuff', 'symbolDamageBuff'];
var arrColor = ['wallColor', 'mobColor', "bgColor", 'playerColor', 'weaponColor', 'lukeColor', 'potionColor', 'hpBuffColor', 'damageBuffColor'];

var m_width, m_height, matrixOfSymbols

let mapTitle = "demo1";
let mapDescription = "";

let mapID = window.location.pathname.split('/')[1].split("_")[1];
let count_level = 1;
let current_level = 1
let matrix = "";
let symbols = "#bagjarst";
let colors = ['#3a3a3a', '#3a3a3a', '#3a3a3a', '#3a3a3a', '#3a3a3a', '#3a3a3a', '#3a3a3a', '#3a3a3a', '#3a3a3a']

let cl_list_tokens = ['wall', 'mob', 'background', 'player', 'weapon', 'luke', 'potion', 'hp-buff', 'damage-buff'];

var xhr = new XMLHttpRequest();

function getData() {
    var url = "map_" + mapID + "/" + current_level + "/get";

    xhr.open('Post', url, true);

    xhr.send();

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        // по окончании запроса доступны:
        // status, statusText
        // responseText, responseXML (при content-type: text/xml)

        if (this.status != 200) {
            // обработать ошибку
            alert('error: ' + (this.status ? this.statusText : 'request failed'));
            return;
        }
        obj = JSON.parse(this.responseText);
        matrix = obj.matrix.split(";");
        symbols = obj.symbols;
        m_height = obj.height;
        m_width = obj.width;
        count_level = parseInt(obj.count_level)
        colors = obj.colors;
        mapTitle = obj.mapTitle;
        mapDescription = obj.mapDescription;
    }

}

getData()
// при загрузке страницы отображаем сохраненный уровень
/*function createField(levelCount){
	if (localStorage.getItem(levelCount) !== null) {
		healthPlayer.style.width = maxHpPlayer + 'px';
		healthTarget.style.width = maxHpTarget + 'px';
		PlayerHP = 180;
		sword.textContent = 'none';
		fieldEl.innerHTML = '';
		fieldEl.insertAdjacentHTML('afterbegin', localStorage.getItem(levelCount));
		cells = document.querySelectorAll('.cell');
		cells.forEach(element => {
			element.classList.remove('cell');
			element.classList.add('cell-no-border');
		});
	} else {
		notice.classList.remove('hidden');
	};
};*/
function setNewPlayerHP(newHP) {
    PlayerHP = newHP;
    healthPlayer.style.width = PlayerHP + 'px';
};

function setNewTargetHP(newHP) {
    TargetHP = newHP;
    healthTarget.style.width = TargetHP + 'px';
};


function createField(columns, rows) {
    fieldEl.innerHTML = '';
    healthPlayer.style.width = maxHpPlayer + 'px';
    healthTarget.style.width = maxHpTarget + 'px';
    PlayerHP = 180;
    sword.textContent = 'none';
    for (let i = 0; i < rows; i++) {
        const rowEl = document.createElement('div');
        rowEl.classList.add('row');
        for (let j = 0; j < columns; j++) {
            const cellEl = document.createElement('div');
            cellEl.classList.add('cell-no-border');
            var index = matrix[i * m_width + j];
            cellEl.classList.add(cl_list_tokens[Number.parseInt(index)]);
            var symbol = matrixOfSymbols[i][j];
            cellEl.textContent = symbol;
            rowEl.appendChild(cellEl);
        }
        fieldEl.appendChild(rowEl);
    }

    let wall = document.querySelectorAll('.wall');
    let mob = document.querySelectorAll('.mob');
    let background = document.querySelectorAll('.background');
    let player = document.querySelectorAll('.player');
    let weapon = document.querySelectorAll('.weapon');
    let luke = document.querySelectorAll('.luke');
    let potion = document.querySelectorAll('.potion');
    let hpBuff = document.querySelectorAll('.hp-buff');
    let damageBuff = document.querySelectorAll('.damage-buff');


    setColor(wall, '--wall-color', 'wallColor');
    setColor(mob, '--mob-color', 'mobColor');
    setColor(background, '--bg-color', 'bgColor');
    setColor(player, '--player-color', 'playerColor');
    setColor(weapon, '--weapon-color', 'weaponColor');
    setColor(luke, '--luke-color', 'lukeColor');
    setColor(potion, '--potion-color', 'potionColor');
    setColor(hpBuff, '--hp-buff-color', 'hpBuffColor');
    setColor(damageBuff, '--damage-buff-color', 'damageBuffColor');
};


function createMatrixOfSymbols(width, height) {
    matrixOfSymbols = new Array();
    for (var i = 0; i < height; i++) {
        matrixOfSymbols[i] = new Array();
        for (var j = 0; j < width; j++) {
            matrixOfSymbols[i][j] = symbols[matrix[i * width + j]];
        }
    }
}

xhr.addEventListener('load', function () {
    createMatrixOfSymbols(m_width, m_height);
    createField(m_width, m_height);
    if (current_level == 1) {
        textBlock.insertAdjacentHTML('beforeend', `<p>Game title: ${mapTitle}</p>`)
        textBlock.insertAdjacentHTML('beforeend', `<p>Description: ${mapDescription}</p>`)
    }
})


// функция генерации рандомного целого числа
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
};

// перезагрузка страницы если игрок умер
function reload() {
    location.reload();
};

// функция перемещения

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

        textBlock.scrollTop = textBlock.scrollHeight;

// условия взаимодействия с разными объектами
        function changeClass(element, nextElement) {
            playerBlock.textContent = bgSym;
            playerBlock.classList.remove('player');
            playerBlock.removeAttribute('style');
            playerBlock.classList.add('background');
            setColor([playerBlock], '--bg-color', 'bgColor');
            nextElement.classList.add('player');
            nextElement.removeAttribute('style');
            setColor([nextElement], '--player-color', 'playerColor');
            nextElement.classList.remove(element);
            nextElement.textContent = playerSym;
        };

        function movePlayer(nextElement) {
            if (nextElement.classList.contains('background')) {
                changeClass('background', nextElement);
            }
            ;
            if (nextElement.classList.contains('potion')) {
                changeClass('potion', nextElement);
                setNewPlayerHP(maxHpPlayer);
                textBlock.insertAdjacentHTML('beforeend', `<p>Your health is restored</p><br>`);
            }
            ;
            if (nextElement.classList.contains('weapon')) {
                textBlock.insertAdjacentHTML('beforeend', `<p>Congratulations, you found the weapon! Now it is displayed in your inventory and you can stand up for yourself!</p><br>`);
                changeClass('weapon', nextElement);
                sword.textContent = 'sword';
            }
            ;
            if (nextElement.classList.contains('mob')) {
                if (sword.textContent === 'sword') {
                    console.log(PlayerHP);
                    if (PlayerHP < 5) {
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>Death has come for you<a href="" class="game__link reload" onclick="reload()">[Начать заново]</a></p>`);
                        playerBlock.textContent = bgSym;
                        playerBlock.classList.remove('player');
                        playerBlock.classList.add('background');
                    }
                    ;
                    if (TargetHP > 15) {
                        const innerDamage = getRandom(mobDamageMin, mobDamageMax);
                        setNewPlayerHP(PlayerHP - innerDamage < 0 ? 0 : PlayerHP - innerDamage);

                        const outerDamage = getRandom(swordDamageMin, swordDamageMax);
                        setNewTargetHP(TargetHP - outerDamage < 0 ? 0 : TargetHP - outerDamage);

                        textBlock.insertAdjacentHTML('beforeend', `<p class="damage">Done ${outerDamage} damage</p>`);
                        textBlock.insertAdjacentHTML('beforeend', `<p class="damage">Received ${innerDamage} damage</p>`);
                    } else {
                        changeClass('mob', nextElement);
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>The monster is slayed</p><br>`);
                        setNewTargetHP(maxHpTarget);
                    }
                    ;
                } else {
                    if (PlayerHP < 5) {
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>Death has come for you<a href="" class="game__link reload" onclick="reload()">[Начать заново]</a></p>`);
                        playerBlock.textContent = bgSym;
                        playerBlock.classList.remove('player');
                        playerBlock.classList.add('background');
                    }
                    ;
                    if (TargetHP > 15) {
                        const innerDamage = getRandom(mobDamageMin, mobDamageMax);
                        setNewPlayerHP(PlayerHP - innerDamage < 0 ? 0 : PlayerHP - innerDamage);

                        const outerDamage = getRandom(playerDamageMin, playerDamageMax);
                        setNewTargetHP(TargetHP - outerDamage < 0 ? 0 : TargetHP - outerDamage);

                        textBlock.insertAdjacentHTML('beforeend', `<p class="damage">Done ${outerDamage} damage</p>`);
                        textBlock.insertAdjacentHTML('beforeend', `<p class="damage">Received ${innerDamage} damage</p>`);
                    } else {
                        changeClass('mob', nextElement);
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>The monster is slayed</p><br>`);
                        setNewTargetHP(maxHpTarget);
                    }
                    ;
                }
                ;
            }
            ;
            if (nextElement.classList.contains('luke')) {
                const mobs = document.querySelectorAll('.mob')
                if (mobs.length > 0) {
                    textBlock.insertAdjacentHTML('beforeend', `<br><p>You can't go to the next level until you kill all the mobs</p><br>`);
                } else {
                    current_level = current_level + 1;
                    level = 'level' + '-' + current_level;
                    if (current_level <= count_level) {
                        getData();
                    } else {
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>This was the last level. Congratulations on your victory!</p>`);
                    }
                    ;
                }
                ;
            }
            ;
            if (nextElement.classList.contains('hp-buff')) {
                maxHpPlayer = maxHpPlayer + addHp;
                PlayerHP = PlayerHP + addHp;
                setNewPlayerHP(PlayerHP);
                changeClass('hp-buff', nextElement);
            }
            ;
            if (nextElement.classList.contains('damage-buff')) {
                playerDamageMax = playerDamageMax + addDamage;
                playerDamageMin = playerDamageMin + addDamage;
                swordDamageMax = swordDamageMax + addDamage;
                swordDamageMin = swordDamageMin + addDamage;
                changeClass('damage-buff', nextElement);
            }
            ;
        };

// реализация перемещения с помощью клавиатуры
        if (playerNextBlock !== null && event.key === 'ArrowRight') {
            movePlayer(playerNextBlock);
        }
        ;
        if (playerPrevBlock !== null && event.key === 'ArrowLeft') {
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

const upBtn = document.querySelector('.up-btn');
const leftBtn = document.querySelector('.left-btn');
const rightBtn = document.querySelector('.right-btn');
const downBtn = document.querySelector('.down-btn');
const gameBtns = document.querySelector('.game__buttons');

gameBtns.addEventListener('click', function (event) {
    const playerBlock = document.querySelector('.player');

    if (playerBlock !== null) {

        const playerNextBlock = playerBlock.nextSibling;
        const playerPrevBlock = playerBlock.previousSibling;
        const rowEl = playerBlock.parentNode;
        const rowPrev = rowEl.previousSibling;
        const rowNext = rowEl.nextSibling;
        const playerSym = document.querySelector('.player').textContent;
        const bgSym = document.querySelector('.background').textContent;

        textBlock.scrollTop = textBlock.scrollHeight;

// условия взаимодействия с разными объектами
        function changeClass(element, nextElement) {
            playerBlock.textContent = bgSym;
            playerBlock.classList.remove('player');
            playerBlock.classList.add('background');
            nextElement.classList.add('player');
            nextElement.classList.remove(element);
            nextElement.textContent = playerSym;
        };

        function movePlayer(nextElement) {
            if (nextElement.classList.contains('background')) {
                changeClass('background', nextElement);
            }
            ;
            if (nextElement.classList.contains('potion')) {
                changeClass('potion', nextElement);
                setNewPlayerHP(maxHpPlayer);
                textBlock.insertAdjacentHTML('beforeend', `<p>Ваше здоровье восстановлено</p><br>`);
            }
            ;
            if (nextElement.classList.contains('weapon')) {
                textBlock.insertAdjacentHTML('beforeend', `<p>Поздравляю, вы нашли оружие! Теперь оно отображается в вашем инвентаре и вы можете постоять за себя!</p><br>`);
                changeClass('weapon', nextElement);
                sword.textContent = 'sword';
            }
            ;
            if (nextElement.classList.contains('mob')) {
                if (sword.textContent === 'sword') {
                    console.log(PlayerHP);
                    if (PlayerHP < 5) {
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>Вы убиты<a href="" class="game__link reload" onclick="reload()">[Начать заново]</a></p>`);
                        playerBlock.textContent = bgSym;
                        playerBlock.classList.remove('player');
                        playerBlock.classList.add('background');
                    }
                    ;
                    if (TargetHP > 15) {
                        const innerDamage = getRandom(mobDamageMin, mobDamageMax);
                        setNewPlayerHP(PlayerHP - innerDamage < 0 ? 0 : PlayerHP - innerDamage);

                        const outerDamage = getRandom(swordDamageMin, swordDamageMax);
                        setNewTargetHP(TargetHP - outerDamage < 0 ? 0 : TargetHP - outerDamage);

                        textBlock.insertAdjacentHTML('beforeend', `<p class="damage">Нанесено ${outerDamage} урона</p>`);
                        textBlock.insertAdjacentHTML('beforeend', `<p class="damage">Получено ${innerDamage} урона</p>`);
                    } else {
                        changeClass('mob', nextElement);
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>Вы убили моба</p><br>`);
                        setNewTargetHP(maxHpTarget);
                    }
                    ;
                } else {
                    if (PlayerHP < 5) {
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>Вы убиты<a href="" class="game__link reload" onclick="reload()">[Начать заново]</a></p>`);
                        playerBlock.textContent = bgSym;
                        playerBlock.classList.remove('player');
                        playerBlock.classList.add('background');
                    }
                    ;
                    if (TargetHP > 15) {
                        const innerDamage = getRandom(mobDamageMin, mobDamageMax);
                        setNewPlayerHP(PlayerHP - innerDamage < 0 ? 0 : PlayerHP - innerDamage);

                        const outerDamage = getRandom(playerDamageMin, playerDamageMax);
                        setNewTargetHP(TargetHP - outerDamage < 0 ? 0 : TargetHP - outerDamage);

                        textBlock.insertAdjacentHTML('beforeend', `<p class="damage">Нанесено ${outerDamage} урона</p>`);
                        textBlock.insertAdjacentHTML('beforeend', `<p class="damage">Получено ${innerDamage} урона</p>`);
                    } else {
                        changeClass('mob', nextElement);
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>Вы убили моба</p><br>`);
                        setNewTargetHP(maxHpTarget);
                    }
                    ;
                }
                ;
            }
            ;
            if (nextElement.classList.contains('luke')) {
                const mobs = document.querySelectorAll('.mob')
                if (mobs.length > 0) {
                    textBlock.insertAdjacentHTML('beforeend', `<br><p>Вы не можете перейти на следующий уровень, пока не убьете всех мобов</p><br>`);
                } else {
                    count = count + 1;
                    level = 'level' + '-' + count;
                    if (localStorage.getItem(level.toString()) !== null) {
                        createField(level);
                    } else {
                        textBlock.insertAdjacentHTML('beforeend', `<br><p>Это был последний уровень.</p>`);
                    }
                    ;
                }
                ;
            }
            ;
            if (nextElement.classList.contains('hp-buff')) {
                maxHpPlayer = maxHpPlayer + addHp;
                PlayerHP = PlayerHP + addHp;
                setNewPlayerHP(PlayerHP);
                changeClass('hp-buff', nextElement);
            }
            ;
            if (nextElement.classList.contains('damage-buff')) {
                playerDamageMax = playerDamageMax + addDamage;
                playerDamageMin = playerDamageMin + addDamage;
                swordDamageMax = swordDamageMax + addDamage;
                swordDamageMin = swordDamageMin + addDamage;
                changeClass('damage-buff', nextElement);
            }
            ;
        };

        if (event.target === leftBtn) {
            movePlayer(playerPrevBlock);
        }
        ;
        if (event.target === rightBtn) {
            movePlayer(playerNextBlock);
        }
        ;
        if (event.target === upBtn) {
            for (i = 0; i < rowEl.childNodes.length; i++) {
                if (rowPrev !== null && rowEl.childNodes[i].classList.contains('player')) {
                    movePlayer(rowPrev.childNodes[i]);
                }
                ;
            }
            ;
        }
        ;
        if (event.target === downBtn) {
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
})


window.addEventListener("keydown", function (e) {
    // space and arrow keys
    if ([38, 40].indexOf(e.keyCode) > -1) {
        e.preventDefault();
    }
}, false);
