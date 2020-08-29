const selectSort = document.querySelector('.feed__select');
const searchBar = document.querySelector('.feed__input');
const searchForm = document.querySelector('.feed__search');
const toPrevious = document.querySelector('.feed__left');
const toNext = document.querySelector('.feed__right');

const pathname = window.location.pathname;
let path = pathname.split('-')[0]
let sort_crit = pathname.split('-')[1]
let page = parseInt(pathname.split('/')[2]);

if (sort_crit == "date/")
    selectSort.value = "date";
else if (sort_crit == "popularity/")
    selectSort.value = "popular";

selectSort.addEventListener('change', function () {
    if (selectSort.value == "date")
        document.location.href = path + "-" + "date";
    else if (selectSort.value == "popular")
        document.location.href = path + "-" + "popularity";
})

searchForm.addEventListener('submit', function () {
    if (searchBar.value != "" && searchBar.value != undefined) {
        new_path = path + "-" + searchBar.value;
        document.location.href = new_path;
    }
})

toPrevious.addEventListener("click", function () {
    if (page != undefined && page > 1) {
        new_path = '/' + pathname.split('/')[1] + '/' + (page - 1) + '/' + pathname.split('/')[3] + '/';
        document.location.href = new_path;
    }
})

toNext.addEventListener("click", function () {
    if (page != undefined && document.querySelectorAll('.feed__post').length == 10) {
        new_path = '/' + pathname.split('/')[1] + '/' + (page + 1) + '/' + pathname.split('/')[3] + '/';
        document.location.href = new_path;
    }
})

let feedUp = document.querySelectorAll('.feed__up');

for (i = 0; i < feedUp.length; i++) {
    feedUp[i].addEventListener('click', function (event) {
        let target = event.target;
        let feedRate = target.parentNode;
        rating = parseInt(feedRate.childNodes[3].textContent) + 1;
        feedRate.childNodes[3].textContent = rating;
        map_id = parseInt(feedRate.getAttribute("id"));
        sendRating(map_id, "1");
        target.setAttribute("disabled", "disabled");
        feedRate.childNodes[5].removeAttribute("disabled");
    });
}
;

let feedDown = document.querySelectorAll('.feed__down');

for (i = 0; i < feedUp.length; i++) {
    feedDown[i].addEventListener('click', function (event) {
        let target = event.target;
        let feedRate = target.parentNode;
        rating = parseInt(feedRate.childNodes[3].textContent) > 0 ? parseInt(feedRate.childNodes[3].textContent) - 1 : 0;
        feedRate.childNodes[3].textContent = rating;
        map_id = parseInt(feedRate.getAttribute("id"));
        sendRating(map_id, "-1");
        target.setAttribute("disabled", "disabled");
        feedRate.childNodes[1].removeAttribute("disabled");
    });
}
;


var xhr = new XMLHttpRequest();

function sendRating(mapID, rating) {
    var data = new FormData();
    data.append("map_id", mapID);
    data.append("rating", rating);
    var url = "/changeRate/";

    xhr.open('Post', url, true);

    xhr.send(data);

    xhr.onreadystatechange = function () {
        if (this.readyState != 4) return;

        // по окончании запроса доступны:
        // status, statusText
        // responseText, responseXML (при content-type: text/xml)

        if (this.status != 200) {
            // обработать ошибку
            alert('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
            return;
        }
    }

}



