const fieldEl = document.querySelector('.field');

function createField(rows, columns) {
    fieldEl.innerHTML = '';

    for (let i = 0; i < rows; i++) {
        fieldEl.appendChild(createRow(i, columns))
    }
    ;
    playerSpot(playerLocation.x, playerLocation.y);
}

function createRow(currentRow, cellsCount) {
    const rowEl = document.createElement('div');
    rowEl.setAttribute("y", currentRow)
    rowEl.classList.add('row');

    for (let i = 0; i < cellsCount; i++) {
        const cellEl = document.createElement('div');
        cellEl.classList.add('cell');
        cellEl.setAttribute("y", currentRow)
        cellEl.setAttribute("x", i)
        rowEl.appendChild(cellEl)
    }
    ;
    return rowEl;
};

function playerSpot(x, y) {
        y = fieldEl.childNodes[y];
        x = y.childNodes[x];

        if (x.classList.contains('wall')) {
            alert("Недопустимое поле для игрока")
        } else {
            x.classList.add('player');
        }
        ;
    };
var playerLocation= {"x": 3, "y": 2};

var matrix_form = document.getElementById('matrix_create');

function loadData(){
  var data = JSON.parse( localStorage.getItem(matrix_form.id));
  if(data != null){ // проверка на null и undefined
    for (i=0;i < matrix_form.elements.length-1; i++)
      matrix_form.elements[i].value = data[matrix_form.elements[i].id];
  }
}

function saveData(){
  var data = {};

  for (i=0;i < matrix_form.elements.length-1; i++)
    data[matrix_form.elements[i].id] = matrix_form.elements[i].value;
   localStorage.setItem(matrix_form.id, JSON.stringify(data));
}

loadData();

matrix_form.addEventListener('submit', saveData, false);



matrix_input_btn.addEventListener('click', function () {
    saveData()
    createField(matrix_input_height.value, matrix_input_width.value);
});


createField(matrix_input_height.value, matrix_input_width.value);

const selectBox = document.querySelector('.select');
const checkbox = document.querySelectorAll('.checkbox');


fieldEl.addEventListener('click', function () {
    if (
        event.target.classList.contains('player') == false &&
        event.target.classList.contains('row') == false &&
        event.target.classList.contains('field') == false
    ) {
        selectBox.style.display = 'block';

        let target = event.target;

        target.classList.toggle('active');


        document.addEventListener('keydown', function escPress(event) {
            if (event.key == 'Escape') {
                selectBox.style.display = 'none';
                checkbox.checked = false;
                let activeBlock = document.querySelectorAll('.active');
                console.log(activeBlock);
                for (i = 0; i < activeBlock.length; i++) {
                    activeBlock[i].classList.remove('active');
                }
                ;
            }
            ;
        });
    }
    ;
});


const selectBtn = document.querySelector('.select__btn');

selectBtn.addEventListener('click', function () {
    let target = document.querySelectorAll('.active');
    let checkedBox = document.querySelector('.checkbox:checked');
    if (checkedBox.classList.contains('select__wall')) {
        for (i = 0; i < target.length; i++) {
            target[i].classList.add('wall');
            target[i].classList.remove('active');
            target[i].classList.remove('mob');
            target[i].classList.remove('background');
        }
        ;
    } else if (checkedBox.classList.contains('select__mob')) {
        for (i = 0; i < target.length; i++) {
            target[i].classList.add('mob');
            target[i].classList.remove('active');
            target[i].classList.remove('wall');
            target[i].classList.remove('background');
        }
        ;
    } else if (checkedBox.classList.contains('select__background')) {
        for (i = 0; i < target.length; i++) {
            target[i].classList.add('background');
            target[i].classList.remove('active');
            target[i].classList.remove('mob');
            target[i].classList.remove('wall');
        }
        ;
    } else if (checkedBox.classList.contains('select__spawn')) {
        if (target.length == 1) {
            var lastPlayerSpot=fieldEl.childNodes[playerLocation.y].childNodes[playerLocation.x];
            lastPlayerSpot.classList.remove('player');
            lastPlayerSpot.classList.add('background');
            target[0].classList.add('player');
            target[0].classList.remove('active');
            target[0].classList.remove('mob');
            target[0].classList.remove('wall');
            target[0].classList.remove('background');
            playerLocation.x = target[0].getAttribute("x");
            playerLocation.y = target[0].getAttribute("y");
        }
        else for (i = 0; i < target.length; i++)
            target[i].classList.remove('active');

    }
    ;
    selectBox.style.display = 'none';
    checkbox.checked = false;
});