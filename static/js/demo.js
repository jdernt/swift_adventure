const fieldEl = document.querySelector('.field');

localStorage.clear(); // очищаем при перезагрузке страницы, временная мера

// отрисовка поля

function createField(rows, columns){
	fieldEl.innerHTML = '';

	for (let i = 0; i < rows; i++) {
		fieldEl.appendChild(createRow(columns))
	};
};

function createRow(cellsCount){
	const rowEl = document.createElement('div');
	rowEl.classList.add('row');

	for (let i = 0; i < cellsCount; i++) {
		const cellEl = document.createElement('div');
		cellEl.classList.add('cell');
		cellEl.classList.add('background');
		cellEl.textContent = '.';
		rowEl.appendChild(cellEl)
	};
	return rowEl;
};

// расположение элемента игрока

function playerSpot(x, y){
	y = fieldEl.childNodes[y];
	x = y.childNodes[x];

	if (x.classList.contains('wall')) {
		return x;
	} else {
		x.classList.add('player');
	};
};

// сохранение разметки поля

var matrix_form = document.getElementById('matrix_create');

function loadData(){
  var data = JSON.parse(localStorage.getItem(matrix_form.id));
  if (data != null) { // проверка на null и undefined
    for (i = 0; i < matrix_form.elements.length-1; i++) {
			matrix_form.elements[i].value = data[matrix_form.elements[i].id];
		};
  };
};

function saveData(){
  var data = {};
  for (i = 0; i < matrix_form.elements.length-1; i++) {
		data[matrix_form.elements[i].id] = matrix_form.elements[i].value;
		localStorage.setItem(matrix_form.id, JSON.stringify(data));
		matrix_form.elements[i].value = '';
	};
};

loadData();

matrix_form.addEventListener('submit', saveData, false);

// генерация поля по заданным значениям

document.querySelector('.grid__btn').addEventListener('click', function(e){
	e.preventDefault();
	const y = document.querySelector('.grid__hgt');
	const x = document.querySelector('.grid__wdt');

	if (y.value <= 16 && x.value <= 16) {
		document.querySelector('.error-player').style.display = 'none';
		document.querySelector('.error-grid').style.display = 'none';
		createField(y.value, x.value);
		saveData();
	} else {
		document.querySelector('.error-player').style.display = 'none';
		document.querySelector('.error-grid').style.display = 'block';
	};
});

// края карты = стены

// const rowLast = fieldEl.lastChild;
// for (i = 0; i < rowLast.childNodes.length; i++) {
// 	rowLast.childNodes[i].classList.add('wall');
// };

// const rowFirst = fieldEl.firstChild;
// for (i = 0; i < rowFirst.childNodes.length; i++) {
// 	rowFirst.childNodes[i].classList.add('wall');
// };

// for (i = 0; i < fieldEl.childNodes.length; i++) {
// 	const rowEl = fieldEl.childNodes[i];
// 	rowEl.childNodes[0].classList.add('wall');
// 	rowEl.childNodes[rowEl.childNodes.length - 1].classList.add('wall');
// };

// изменения элементов

const selectBox = document.querySelector('.select');
const checkbox = document.querySelectorAll('.checkbox');

// по клику на ячейку появляется окно с выбором типа ячейки, если пользователь нажимает Esc - выделение сбрасывается, если пользовательно кликает на ячейку повторно - выделение сбрасывается

fieldEl.addEventListener('click', function(){
	document.querySelector('.error-player').style.display = 'none';
	if (
		event.target.classList.contains('row') == false &&
		event.target.classList.contains('field') == false
	) {
		selectBox.style.display = 'block';

		let target = event.target;

		target.classList.toggle('active');

		document.addEventListener('keydown', function escPress(event){
			if (event.key == 'Escape') {
				selectBox.style.display = 'none';
				checkbox.checked = false;
				let activeBlock = document.querySelectorAll('.active');

				for (i = 0; i < activeBlock.length; i++) {
					activeBlock[i].classList.remove('active');
				};
			};
		});
	};
});

// по клику на кнопку в окне выбора символа, ячейкам определенного типа присваивается выбранное значение в виде символа

document.querySelector('.symbols__btn').addEventListener('click', function(e){
	e.preventDefault();

	localStorage.setItem('symbolWall', document.querySelector('.wall-symbol').value);
	localStorage.setItem('symbolMob', document.querySelector('.mob-symbol').value);
	localStorage.setItem('symbolBg', document.querySelector('.bg-symbol').value);
	localStorage.setItem('symbolPlayer', document.querySelector('.player-symbol').value);


	const wall = document.querySelectorAll('.wall');
	const mob = document.querySelectorAll('.mob');
	const background = document.querySelectorAll('.background');
	const player = document.querySelectorAll('.player');

	for (i = 0; i < wall.length; i++) {
		if (localStorage.getItem('symbolWall').length >= 1) {
			wall[i].textContent = localStorage.getItem('symbolWall');
		};
	};

	for (i = 0; i < mob.length; i++) {
		if (localStorage.getItem('symbolMob').length >= 1) {
			mob[i].textContent = localStorage.getItem('symbolMob');
		};
	};

	for (i = 0; i < background.length; i++) {
		if (localStorage.getItem('symbolBg').length >= 1) {
			background[i].textContent = localStorage.getItem('symbolBg');
		};
	};

	for (i = 0; i < player.length; i++) {
		if (localStorage.getItem('symbolPlayer').length >= 1) {
			player[i].textContent = localStorage.getItem('symbolPlayer');
		};
	};
});

// по клику на кнопку в появляющемся окне, выделенным ячейкам задается выбранный пользователем тип и символ

const selectBtn = document.querySelector('.select__btn');

selectBtn.addEventListener('click', function(){
	let target = document.querySelectorAll('.active');
	let checkedBox = document.querySelector('.checkbox:checked');

	if (checkedBox.classList.contains('select__wall')) {
		for (i = 0; i < target.length; i++) {
			if (localStorage.getItem('symbolWall') !== null && localStorage.getItem('symbolWall').length >= 1) {
				target[i].textContent = localStorage.getItem('symbolWall');
			} else {
				target[i].textContent = '#';
			};
			target[i].classList.add('wall');
			target[i].classList.remove('active');
			target[i].classList.remove('mob');
			target[i].classList.remove('background');
			target[i].classList.remove('player');
		};
	} else
	if (checkedBox.classList.contains('select__mob')) {
		for (i = 0; i < target.length; i++) {
			if (localStorage.getItem('symbolMob') !== null && localStorage.getItem('symbolMob').length >= 1) {
				target[i].textContent = localStorage.getItem('symbolMob');
			} else {
				target[i].textContent = 'm';
			};
			target[i].classList.add('mob');
			target[i].classList.remove('active');
			target[i].classList.remove('wall');
			target[i].classList.remove('background');
			target[i].classList.remove('player');
		};
	} else
	if (checkedBox.classList.contains('select__background')) {
		for (i = 0; i < target.length; i++) {
			if (localStorage.getItem('symbolBg') !== null && localStorage.getItem('symbolBg').length >= 1) {
				target[i].textContent = localStorage.getItem('symbolBg');
			} else {
				target[i].textContent = '.';
			};
			target[i].classList.add('background');
			target[i].classList.remove('active');
			target[i].classList.remove('mob');
			target[i].classList.remove('wall');
			target[i].classList.remove('player');
		};
	} else
	if (checkedBox.classList.contains('select__player')) {
		if (target.length == 1) {
			let playerBlock = document.querySelector('.player');
			if (playerBlock !== null) {
				let playerArr = document.querySelectorAll('.player');
				for (i = 0; i < playerArr.length; i++) {
					if (localStorage.getItem('symbolBg') !== null && localStorage.getItem('symbolBg').length >= 1) {
						playerArr[i].textContent = localStorage.getItem('symbolBg');
					} else {
						playerArr[i].textContent = '.';
					};
					playerArr[i].classList.remove('player');
				};
				for (i = 0; i < target.length; i++) {
					if (localStorage.getItem('symbolPlayer') !== null && localStorage.getItem('symbolPlayer').length >= 1) {
						target[i].textContent = localStorage.getItem('symbolPlayer');
					} else {
						target[i].textContent = '@';
					};
					target[i].classList.add('player');
					target[i].classList.remove('active');
					target[i].classList.remove('mob');
					target[i].classList.remove('wall');
					target[i].classList.remove('background');
				};
			} else {
				for (i = 0; i < target.length; i++) {
					if (localStorage.getItem('symbolPlayer') !== null && localStorage.getItem('symbolPlayer').length >= 1) {
						target[i].textContent = localStorage.getItem('symbolPlayer');
					} else {
						target[i].textContent = '@';
					};
					target[i].classList.add('player');
					target[i].classList.remove('active');
					target[i].classList.remove('mob');
					target[i].classList.remove('wall');
					target[i].classList.remove('background');
				};
			};
		} else {
			document.querySelector('.error-player').style.display = 'block';
			let activeBlock = document.querySelectorAll('.active');
				for (i = 0; i < activeBlock.length; i++) {
					activeBlock[i].classList.remove('active');
				};
			};
		};
	selectBox.style.display = 'none';
	checkbox.checked = false;
});



// функция перемещения

// document.addEventListener('keydown', function move(event) {
// 	const playerBlock = document.querySelector('.player');
// 	const playerNextBlock = playerBlock.nextSibling;
// 	const playerPrevBlock = playerBlock.previousSibling;

// 	const playerSym = document.querySelector('.player').textContent;

// 	if (playerNextBlock !== null && event.key == 'ArrowRight' && playerNextBlock.classList.contains('wall') == false) {
// 		playerBlock.classList.toggle('player');
// 		playerBlock.textContent = '';
// 		playerNextBlock.classList.toggle('player');
// 		playerNextBlock.textContent = playerSym;
// 	} else
// 	if (playerPrevBlock !== null && event.key == 'ArrowLeft' && playerPrevBlock.classList.contains('wall') == false) {
// 		playerBlock.classList.toggle('player');
// 		playerBlock.textContent = '';
// 		playerPrevBlock.classList.toggle('player');
// 		playerPrevBlock.textContent = playerSym;
// 	} else
// 	if (event.key == 'ArrowUp') {
// 		let rowEl = playerBlock.parentNode;
// 		let rowPrev = rowEl.previousSibling;
// 		for (i = 0; i < rowEl.childNodes.length; i++) {
// 			if (rowPrev !== null && rowEl.childNodes[i].classList.contains('player') == true && rowPrev.childNodes[i].classList.contains('wall') == false) {
// 				playerBlock.classList.toggle('player');
// 				playerBlock.textContent = '';
// 				rowPrev.childNodes[i].classList.toggle('player');
// 				rowPrev.childNodes[i].textContent = playerSym;
// 			};
// 		};
// 	} else
// 	if (event.key == 'ArrowDown') {
// 		let rowEl = playerBlock.parentNode;
// 		let rowNext = rowEl.nextSibling;
// 		for (i = 0; i < rowEl.childNodes.length; i++) {
// 			if (rowNext !== null && rowEl.childNodes[i].classList.contains('player') == true && rowNext.childNodes[i].classList.contains('wall') == false) {
// 				playerBlock.classList.toggle('player');
// 				playerBlock.textContent = '';
// 				rowNext.childNodes[i].classList.toggle('player');
// 				rowNext.childNodes[i].textContent = playerSym;
// 			};
// 		};
// 	};
// });