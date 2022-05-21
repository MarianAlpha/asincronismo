let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
let API = 'https://rickandmortyapi.com/api/character/';

function fetchData(url_api, callback) {
    let xhttp = new XMLHttpRequest();
    xhttp.open('GET',url_api,true); //abrir la conecxion, Obtener url y el true es para hacerlo de forma asincrona
    xhttp.onreadystatechange = function (event){ //Si este cambio sucede se ejecuta una funcion
        if(xhttp.readyState === 4) { //Valicion, si es 4 es porque se completo
            if(xhttp.status === 200) { //saber el status, si se completo correctamente, 200 esta bien, 500 no regreso el servidor, 400 no encontro nada
                callback(null, JSON.parse(xhttp.responseText)); //Siempre va prinmero el error
            } else {
                const error = new Error('Error' + url_api);
                return callback(error, null);
            }
        }
    }
    xhttp.send();
}

fetchData(API, function(error1, data1){  //Nunmero de personajes
    if(error1) return console.error(error1);
    fetchData(API + data1.results[0].id, function(error2, data2){ //Primer personaje
        if(error2) return console.error(error2); 
        fetchData(data2.origin.url, function(error3, data3) { //dimension
            if(error3) return console.error(error3);
            console.log(data1.info.count);
            console.log(data2.name);
            console.log(data3.dimension);
        });
    });
})