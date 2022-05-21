let XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;

const fetchData = (url_api) => {
    return new Promise((resolve, reject) => {
        const xhttp = new XMLHttpRequest();
        xhttp.open('GET',url_api,true); //abrir la conecxion, Obtener url y el true es para hacerlo de forma asincrona
        xhttp.onreadystatechange = (() => { //Si este cambio sucede se ejecuta una funcion
            if(xhttp.readyState === 4) { //Valicion, si es 4 es porque se completo
                (xhttp.status === 200) 
                    ? resolve(JSON.parse(xhttp.responseText))
                    : reject(new Error('Error', url_api))
            }
        });
        xhttp.send();
    });
}

module.exports = fetchData;