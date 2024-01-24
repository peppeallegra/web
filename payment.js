function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

//recupera i valori dall url e li assegna alle variabili
function precompilaCampi() {
    document.getElementById('userId').value = getQueryParam('userId');
    document.getElementById('id_casa').value = getQueryParam('id_casa');
    document.getElementById('checkin').value = getQueryParam('checkin');
    document.getElementById('checkout').value = getQueryParam('checkout');
    document.getElementById('prezzo').value = getQueryParam('prezzo');
}


function effettuaPrenotazione() {
    var formData = new FormData(document.getElementById('prenotazione-form'));

    formData.append('userId', document.getElementById('userId').value);
    formData.append('id_casa', document.getElementById('id_casa').value);
    formData.append('checkin', document.getElementById('checkin').value);
    formData.append('checkout', document.getElementById('checkout').value);
    formData.append('prezzo', document.getElementById('prezzo').value);

    var xhr = new XMLHttpRequest();

    xhr.onload = function() {
        if (xhr.status == 200) {
            response = this.responseText;
            console.log(response);
            alert("Prenotazione avvenuta con successo");
            window.location.href = "home.html?id=" + encodeURIComponent(document.getElementById('userId').value);
        } else {
            console.error('Errore nella richiesta:', xhr.statusText);
            alert('Si è verificato un errore durante la prenotazione.');
        }
    };

    xhr.onerror = function() {
        console.error('Errore nella richiesta.');
        alert('Si è verificato un errore durante la prenotazione.');
    };

    xhr.open('POST', 'gestione_prenotazioni.php', true);
    xhr.send(formData);
}

document.addEventListener('DOMContentLoaded', function() {
    precompilaCampi();

    document.getElementById('prenotazione-form').addEventListener('submit', function(event) {
        event.preventDefault();
        effettuaPrenotazione();
    });
});
