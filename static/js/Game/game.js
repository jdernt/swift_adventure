const fieldEl = document.querySelector('.field');


var m_width, m_height, matrixOfSymbols
//данные, полученные с сервера


// отрисовка поля
function createField(rows, columns) {
    fieldEl.innerHTML = '';
    for (let i = 0; i < rows; i++) {
        const rowEl = document.createElement('div');
        rowEl.classList.add('row');
        for (let j = 0; j < columns; j++) {
            const cellEl = document.createElement('div');
            cellEl.classList.add('cell');
            cellEl.classList.add('background');
            cellEl.textContent = matrixOfSymbols[i, j];
            rowEl.appendChild(cellEl);
        }
        fieldEl.appendChild(rowEl);
    }
    ;
};


document.addEventListener('keydown', function move(event) {
    const playerBlock = document.querySelector('.player');

    if (event.key == 'ArrowRight' && playerBlock.nextSibling.classList.contains('wall') == false) {
        playerBlock.classList.toggle('player');
        playerBlock.nextSibling.classList.toggle('player');
    } else if (event.key == 'ArrowLeft' && playerBlock.previousSibling.classList.contains('wall') == false) {
        playerBlock.classList.toggle('player');
        playerBlock.previousSibling.classList.toggle('player');
    } else if (event.key == 'ArrowUp') {
        let rowEl = playerBlock.parentNode;
        let rowPrev = rowEl.previousSibling;
        for (i = 0; i < rowEl.childNodes.length; i++) {
            if (rowEl.childNodes[i].classList.contains('player') == true && rowPrev.childNodes[i].classList.contains('wall') == false) {
                playerBlock.classList.toggle('player');
                rowPrev.childNodes[i].classList.toggle('player');
            }
            ;
        }
        ;
    } else if (event.key == 'ArrowDown') {
        let rowEl = playerBlock.parentNode;
        let rowNext = rowEl.nextSibling;
        for (i = 0; i < rowEl.childNodes.length; i++) {
            if (rowEl.childNodes[i].classList.contains('player') == true && rowNext.childNodes[i].classList.contains('wall') == false) {
                playerBlock.classList.toggle('player');
                rowNext.childNodes[i].classList.toggle('player');
            }
            ;
        }
        ;
    }
    ;
});


function createMatrixOfSymbols(width, height) {
    matrixOfSymbols = new Array();
    for (var i = 0; i < height; i++) {
        matrixOfSymbols[i] = new Array();
        for (var j = 0; j < width; j++) {
            matrixOfSymbols[i][j] = symbols[matrix[i * width + j]];
        }
    }
}


createMatrixOfSymbols(m_width, m_height);
createField(m_width, m_height);





