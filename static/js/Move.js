
// функция перемещения

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