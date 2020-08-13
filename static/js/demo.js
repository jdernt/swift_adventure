// localStorage.clear(); // очищаем при перезагрузке страницы, временная мера

const errorPlayer = document.querySelector('.error-player');
const errorMap = document.querySelector('.error-grid');


// function generateMap(){
const fieldEl = document.querySelector('.field');

const symbolWall = document.querySelector('.wall-symbol');
const symbolMob = document.querySelector('.mob-symbol');
const symbolBg = document.querySelector('.bg-symbol');
const symbolPlayer = document.querySelector('.player-symbol');
const symbolWeapon = document.querySelector('.weapon-symbol');
const symbolLuke = document.querySelector('.luke-symbol');

// отрисовка поля
function createField(rows, columns) {
	fieldEl.innerHTML = '';

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

// генерация поля по заданным значениям
const fieldRules = {
	min: 4,
	max: 16
};

const createBtn = document.querySelector('.grid__btn');
const saveBtn = document.querySelector('.submit__btn');

createBtn.addEventListener('click', function () {
	const y = document.querySelector('.grid__hgt');
	const x = document.querySelector('.grid__wdt');

	if (y.value <= fieldRules.max && x.value <= fieldRules.max && y.value >= fieldRules.min && x.value >= fieldRules.min) {
		errorPlayer.classList.add('hidden');
		errorMap.classList.add('hidden');
		createField(y.value, x.value);
		m_width = x.value;
		m_height = y.value;
		saveBtn.classList.remove('hidden');
		saveData();
	} else {
		errorPlayer.classList.add('hidden');
		errorMap.classList.remove('hidden');
		x.value = '';
		y.value = '';
	}
	;
});

// сохранение разметки поля
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

// расположение элемента игрока

// function playerSpot(x, y){
// 	y = fieldEl.childNodes[y];
// 	x = y.childNodes[x];

// 	if (x.classList.contains('wall')) {
// 		return x;
// 	} else {
// 		x.classList.add('player');
// 	};
// };

// дефолтные значения ячеек хранятся в placeholder
const wallPlaceholder = document.querySelector('.wall-symbol').placeholder;
const mobPlaceholder = document.querySelector('.mob-symbol').placeholder;
const bgPlaceholder = document.querySelector('.bg-symbol').placeholder;
const playerPlaceholder = document.querySelector('.player-symbol').placeholder;
const weaponPlaceholder = document.querySelector('.weapon-symbol').placeholder;
const lukePlaceholder = document.querySelector('.luke-symbol').placeholder;

// изменения элементов

const selectBox = document.querySelector('.select');
const checkbox = document.querySelectorAll('.checkbox');

// по клику на ячейку появляется окно с выбором типа ячейки, если пользователь нажимает Esc - выделение сбрасывается, если пользователь кликает на ячейку повторно - выделение сбрасывается
fieldEl.addEventListener('click', function () {
	errorPlayer.classList.add('hidden');
	let target = event.target;
	if (
		target.classList.contains('row') === false &&
		target.classList.contains('field') === false
	) {
		selectBox.classList.remove('hidden');

		target.classList.toggle('active');
	}
	;
});

document.addEventListener('keydown', function escPress(event) {
	if (event.key === 'Escape') {
		selectBox.classList.add('hidden');
		checkbox.checked = false;

		let activeBlock = document.querySelectorAll('.active');
		for (i = 0; i < activeBlock.length; i++) {
			activeBlock[i].classList.remove('active');
		}
		;
	}
	;
});

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


// по клику на кнопку в окне выбора символа, ячейкам определенного типа присваивается выбранное значение в виде символа
const symbolBtn = document.querySelector('.symbols__btn');

symbolBtn.addEventListener('click', function (e) {
	e.preventDefault();

	localStorage.setItem('symbolWall', symbolWall.value);
	localStorage.setItem('symbolMob', symbolMob.value);
	localStorage.setItem('symbolBg', symbolBg.value);
	localStorage.setItem('symbolPlayer', symbolPlayer.value);
	localStorage.setItem('symbolWeapon', symbolWeapon.value);
	localStorage.setItem('symbolLuke', symbolLuke.value);

	const wall = document.querySelectorAll('.wall');
	const mob = document.querySelectorAll('.mob');
	const background = document.querySelectorAll('.background');
	const player = document.querySelectorAll('.player');
	const weapon = document.querySelectorAll('.weapon');
	const luke = document.querySelectorAll('.weapon');

	for (i = 0; i < wall.length; i++) {
		if (localStorage.getItem('symbolWall').length >= 1) {
			wall[i].textContent = localStorage.getItem('symbolWall');
		} else {
			localStorage.setItem('symbolWall', wallPlaceholder);
			wall[i].textContent = localStorage.getItem('symbolWall');
		}
		;
	}
	;

	for (i = 0; i < mob.length; i++) {
		if (localStorage.getItem('symbolMob').length >= 1) {
			mob[i].textContent = localStorage.getItem('symbolMob');
		} else {
			localStorage.setItem('symbolMob', mobPlaceholder);
			mob[i].textContent = localStorage.getItem('symbolMob');
		}
		;
	}
	;

	for (i = 0; i < background.length; i++) {
		if (localStorage.getItem('symbolBg').length >= 1) {
			background[i].textContent = localStorage.getItem('symbolBg');
		} else {
			localStorage.setItem('symbolBg', bgPlaceholder);
			background[i].textContent = localStorage.getItem('symbolBg');
		}
		;
	}
	;

	for (i = 0; i < player.length; i++) {
		if (localStorage.getItem('symbolPlayer').length >= 1) {
			player[i].textContent = localStorage.getItem('symbolPlayer');
		} else {
			localStorage.setItem('symbolPlayer', playerPlaceholder);
			player[i].textContent = localStorage.getItem('symbolPlayer');
		}
		;
	}
	;
	for (i = 0; i < weapon.length; i++) {
		if (localStorage.getItem('symbolWeapon').length >= 1) {
			weapon[i].textContent = localStorage.getItem('symbolWeapon');
		} else {
			localStorage.setItem('symbolWeapon', weaponPlaceholder);
			weapon[i].textContent = localStorage.getItem('symbolWeapon');
		}
		;
	}
	;
	for (i = 0; i < luke.length; i++) {
		if (localStorage.getItem('symbolLuke').length >= 1) {
			luke[i].textContent = localStorage.getItem('symbolLuke');
		} else {
			localStorage.setItem('symbolLuke', lukePlaceholder);
			luke[i].textContent = localStorage.getItem('symbolLuke');
		}
		;
	}
	;
});

// по клику на кнопку в появляющемся окне выделенным ячейкам задается выбранный пользователем тип и символ
const selectBtn = document.querySelector('.select__btn');

selectBtn.addEventListener('click', function () {
	let target = document.querySelectorAll('.active');
	let checkedBox = document.querySelector('.radio:checked');

	if (checkedBox.value === 'wall') {
		for (i = 0; i < target.length; i++) {
			if (localStorage.getItem('symbolWall') !== null && localStorage.getItem('symbolWall').length >= 1) {
				target[i].textContent = localStorage.getItem('symbolWall');
			} else {
				target[i].textContent = wallPlaceholder;
			}
			;
			target[i].className = '';
			target[i].classList.add('cell');
			target[i].classList.add('wall');
		}
		;
	} else if (checkedBox.value === 'mob') {
		for (i = 0; i < target.length; i++) {
			if (localStorage.getItem('symbolMob') !== null && localStorage.getItem('symbolMob').length >= 1) {
				target[i].textContent = localStorage.getItem('symbolMob');
			} else {
				target[i].textContent = mobPlaceholder;
			}
			;
			target[i].className = '';
			target[i].classList.add('cell');
			target[i].classList.add('mob');
		}
		;
	} else if (checkedBox.value === 'background') {
		for (i = 0; i < target.length; i++) {
			if (localStorage.getItem('symbolBg') !== null && localStorage.getItem('symbolBg').length >= 1) {
				target[i].textContent = localStorage.getItem('symbolBg');
			} else {
				target[i].textContent = bgPlaceholder;
			}
			;
			target[i].className = '';
			target[i].classList.add('cell');
			target[i].classList.add('background');
		}
		;
	} else if (checkedBox.value === 'weapon') {
		for (i = 0; i < target.length; i++) {
			if (localStorage.getItem('symbolWeapon') !== null && localStorage.getItem('symbolWeapon').length >= 1) {
				target[i].textContent = localStorage.getItem('symbolWeapon');
			} else {
				target[i].textContent = weaponPlaceholder;
			}
			;
			target[i].className = '';
			target[i].classList.add('cell');
			target[i].classList.add('weapon');
		}
		;
	} else if (checkedBox.value === 'player') {
		if (target.length === 1) {
			let playerBlock = document.querySelector('.player');
			if (playerBlock !== null) {
				let playerArr = document.querySelectorAll('.player');
				for (i = 0; i < playerArr.length; i++) {
					if (localStorage.getItem('symbolBg') !== null && localStorage.getItem('symbolBg').length >= 1) {
						playerArr[i].textContent = localStorage.getItem('symbolBg');
					} else {
						playerArr[i].textContent = bgPlaceholder;
					}
					;
					playerArr[i].classList.remove('player');
				}
				;
				for (i = 0; i < target.length; i++) {
					if (localStorage.getItem('symbolPlayer') !== null && localStorage.getItem('symbolPlayer').length >= 1) {
						target[i].textContent = localStorage.getItem('symbolPlayer');
					} else {
						target[i].textContent = playerPlaceholder;
					}
					;
					target[i].className = '';
					target[i].classList.add('cell');
					target[i].classList.add('player');
				}
				;
			} else {
				for (i = 0; i < target.length; i++) {
					if (localStorage.getItem('symbolPlayer') !== null && localStorage.getItem('symbolPlayer').length >= 1) {
						target[i].textContent = localStorage.getItem('symbolPlayer');
					} else {
						target[i].textContent = playerPlaceholder;
					}
					;
					target[i].className = '';
					target[i].classList.add('cell');
					target[i].classList.add('player');
				}
				;
			}
			;
		} else {
			errorPlayer.classList.remove('hidden');
			let activeBlock = document.querySelectorAll('.active');
			for (i = 0; i < activeBlock.length; i++) {
				activeBlock[i].classList.remove('active');
			}
			;
		}
		;
	}
	;
	if (checkedBox.value === 'luke') {
		if (target.length === 1) {
			let lukeBlock = document.querySelector('.luke');
			if (lukeBlock !== null) {
				let lukeArr = document.querySelectorAll('.luke');
				for (i = 0; i < lukeArr.length; i++) {
					if (localStorage.getItem('symbolBg') !== null && localStorage.getItem('symbolBg').length >= 1) {
						lukeArr[i].textContent = localStorage.getItem('symbolBg');
					} else {
						lukeArr[i].textContent = bgPlaceholder;
					}
					;
					lukeArr[i].classList.remove('luke');
				}
				;
				for (i = 0; i < target.length; i++) {
					if (localStorage.getItem('symbolLuke') !== null && localStorage.getItem('symbolLuke').length >= 1) {
						target[i].textContent = localStorage.getItem('symbolLuke');
					} else {
						target[i].textContent = lukePlaceholder;
					}
					;
					target[i].className = '';
					target[i].classList.add('cell');
					target[i].classList.add('luke');
				}
				;
			} else {
				for (i = 0; i < target.length; i++) {
					if (localStorage.getItem('symbolLuke') !== null && localStorage.getItem('symbolLuke').length >= 1) {
						target[i].textContent = localStorage.getItem('symbolLuke');
					} else {
						target[i].textContent = lukePlaceholder;
					}
					;
					target[i].className = '';
					target[i].classList.add('cell');
					target[i].classList.add('luke');
				}
				;
			}
			;
		} else {
			errorPlayer.classList.remove('hidden');
			let activeBlock = document.querySelectorAll('.active');
			for (i = 0; i < activeBlock.length; i++) {
				activeBlock[i].classList.remove('active');
			}
			;
		}
		;
	}
	;
	selectBox.classList.add('hidden');
	checkbox.checked = false;
});

// };

// generateMap();


// очень кривая функция перемещения

document.addEventListener('keydown', function move(event) {
	const playerBlock = document.querySelector('.player');

	if (playerBlock !== null) {

		const playerNextBlock = playerBlock.nextSibling;
		const playerPrevBlock = playerBlock.previousSibling;

		const playerSym = document.querySelector('.player').textContent;

		if (playerNextBlock !== null && event.key == 'ArrowRight' && playerNextBlock.classList.contains('wall') == false) {
			playerBlock.classList.toggle('player');
			playerBlock.classList.add('background');
			if (localStorage.getItem('symbolBg') !== null && localStorage.getItem('symbolBg').length >= 1) {
				playerBlock.textContent = localStorage.getItem('symbolBg');
			} else {
				playerBlock.textContent = bgPlaceholder;
			}
			;
			playerNextBlock.classList.toggle('player');
			playerNextBlock.textContent = playerSym;
		} else if (playerPrevBlock !== null && event.key == 'ArrowLeft' && playerPrevBlock.classList.contains('wall') == false) {
			playerBlock.classList.toggle('player');
			playerBlock.classList.add('background');
			if (localStorage.getItem('symbolBg') !== null && localStorage.getItem('symbolBg').length >= 1) {
				playerBlock.textContent = localStorage.getItem('symbolBg');
			} else {
				playerBlock.textContent = bgPlaceholder;
			}
			;
			playerPrevBlock.classList.toggle('player');
			playerPrevBlock.textContent = playerSym;
		} else if (event.key == 'ArrowUp') {
			let rowEl = playerBlock.parentNode;
			let rowPrev = rowEl.previousSibling;
			for (i = 0; i < rowEl.childNodes.length; i++) {
				if (rowPrev !== null && rowEl.childNodes[i].classList.contains('player') == true && rowPrev.childNodes[i].classList.contains('wall') == false) {
					playerBlock.classList.toggle('player');
					playerBlock.classList.add('background');
					if (localStorage.getItem('symbolBg') !== null && localStorage.getItem('symbolBg').length >= 1) {
						playerBlock.textContent = localStorage.getItem('symbolBg');
					} else {
						playerBlock.textContent = bgPlaceholder;
					}
					;
					rowPrev.childNodes[i].classList.toggle('player');
					rowPrev.childNodes[i].textContent = playerSym;
				}
				;
			}
			;
		} else if (event.key == 'ArrowDown') {
			let rowEl = playerBlock.parentNode;
			let rowNext = rowEl.nextSibling;
			for (i = 0; i < rowEl.childNodes.length; i++) {
				if (rowNext !== null && rowEl.childNodes[i].classList.contains('player') == true && rowNext.childNodes[i].classList.contains('wall') == false) {
					playerBlock.classList.toggle('player');
					playerBlock.classList.add('background');
					if (localStorage.getItem('symbolBg') !== null && localStorage.getItem('symbolBg').length >= 1) {
						playerBlock.textContent = localStorage.getItem('symbolBg');
					} else {
						playerBlock.textContent = bgPlaceholder;
					}
					;
					rowNext.childNodes[i].classList.toggle('player');
					rowNext.childNodes[i].textContent = playerSym;
				}
				;
			}
			;
		}
		;
	}
	;
});

function question() {
	alert('При переходе на следующей уровень, все несохраненные данные будут потеряны. Сохраните уровень, если не хотите потерять свой труд.');
};
