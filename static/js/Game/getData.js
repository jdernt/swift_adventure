// var m_width, m_height, matrixOfSymbols
//
// let userName = "admin";
// let mapname = "demo1";
// let mapID = window.location.pathname.split('/')[1].split("_")[1];
// let count_level = 1;
// let level = 1;
// let matrix = "";
// let symbols = "";
//
// var url = "map_" + mapID + "/" + level + "/get";
//
//
// var xhr = new XMLHttpRequest();
//
// xhr.open('Post', url, true);
//
// xhr.send();
//
// xhr.onreadystatechange = function () {
//     if (this.readyState != 4) return;
//
//     // по окончании запроса доступны:
//     // status, statusText
//     // responseText, responseXML (при content-type: text/xml)
//
//     if (this.status != 200) {
//         // обработать ошибку
//         alert('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
//         return;
//     }
//     obj = JSON.parse(this.responseText);
//     matrix = obj.matrix.split(";");
//     symbols = obj.symbols;
//     m_height = obj.height;
//     m_width = obj.width;
// }
//
// var xhr = new XMLHttpRequest();
//
// xhr.open('Post', url, true);
//
// xhr.send();
//
// xhr.onreadystatechange = function () {
//     if (this.readyState != 4) return;
//
//     // по окончании запроса доступны:
//     // status, statusText
//     // responseText, responseXML (при content-type: text/xml)
//
//     if (this.status != 200) {
//         // обработать ошибку
//         alert('ошибка: ' + (this.status ? this.statusText : 'запрос не удался'));
//         return;
//     }
//     obj = JSON.parse(this.responseText);
//     matrix = obj.matrix.split(";");
//     symbols = obj.symbols;
//     m_height = obj.height;
//     m_width = obj.width;
// }
//
//
// //
// //
// // $.ajax({
// //     url: url,
// //     type: "POST",
// //     dataType: "json",
// //     data: {"user": userName, "mapID": mapID, "level": level},
// //     dataFilter: function (data, type) {
// //         obj = JSON.parse(data);
// //         matrix = obj.matrix.split(";");
// //         symbols = obj.symbols;
// //         m_height = obj.height;
// //         m_width = obj.width;
// //         return;
// //     },
// //     statusCode: {
// //         200: function () {
// //             // YOUR SERVER'S RESPONSE
// //             // you can act on your server's
// //             // response if there will be any
// //             // eg. you can send back information to update UI.
// //         },
// //         // ... handle errors if required
// //         404: function () {
// //             alert("Сервер недоступен");// what to do on 404 etc.
// //         }
// //     },
// // });
//
//
//



