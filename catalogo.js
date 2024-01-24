document.addEventListener("DOMContentLoaded", function () {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', 'userId.php', true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      var userId = xhr.responseText;
      console.log("ID passato correttamente: " + userId);

      // Aggiungiamo l'ID utente come parametro all'URL delle pagine
      var bookingLinks = document.querySelectorAll('.booking-link');
      bookingLinks.forEach(function (link) {
        var houseId = link.getAttribute('data-house-id');
        var href = link.getAttribute('href');
        link.setAttribute('href', href + '?userId=' + userId + '&id_casa=' + houseId);
      });

      // Aggiornamento del link alla home con l'ID utente
      var homeLink = document.querySelector('.menu li:nth-child(1) a');
      homeLink.href = "home.html?id=" + userId;

      // Event listener per assicurarsi che l'URL venga aggiornato quando l'utente fa clic sulla home
      homeLink.addEventListener('click', function (event) {
        event.preventDefault();
        window.location.href = homeLink.href;
      });

      // Impostazione corretta dell'URL per il link al catalogo
      var catalogLink = document.querySelector('.menu li:nth-child(2) a');
      catalogLink.href = "catalogo.html?id=" + userId;
      var bookingsLink = document.querySelector('.menu li:nth-child(3) a');
      bookingsLink.href = "prenotazioni.html?id=" + userId;

    } else {
      console.error('Errore durante la richiesta. Codice: ' + xhr.status);
    }
  };

  xhr.send();

  // Ottieni il valore di log quando si carica la pagina, utilizzando l'userId estratto dall'URL
  var urlParams = new URLSearchParams(window.location.search);

  if (urlParams.has('id')) {
    var userId = urlParams.get('id');
    getLogValue(userId);

    if (urlParams.has('id_casa')) {
      var houseId = urlParams.get('id_casa');
      console.log("ID casa dall'URL: " + houseId);
    }
  } else {
    console.log("Nessun ID utente presente nell'URL");
  }
});

function getLogValue(userId) {
  console.log("Funzione getLogValue con ID utente: " + userId);
}
