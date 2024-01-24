document.addEventListener("DOMContentLoaded", function () {
  // Recupera l'ID dell'utente dall'URL
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get('id');

  const homeLink = document.getElementById('homeLink');

  homeLink.addEventListener('click', function(event) {
    event.preventDefault(); // Impedisce il comportamento predefinito del link
    window.location.href = 'home.html?id=' + userId; 
  });


  // Chiamata AJAX per ottenere le prenotazioni dell'utente
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
          const prenotazioni = JSON.parse(this.responseText);
          mostraPrenotazioni(prenotazioni);
      }
  };

  xhr.open("GET", `prenotazioni.php?id=${userId}`, true);
  xhr.send();
});



function mostraPrenotazioni(prenotazioni) {
  const prenotazioniContainer = document.getElementById("prenotazioni-container");

  if (prenotazioni.length === 0) {
      prenotazioniContainer.innerHTML = "<p>Nessuna prenotazione trovata.</p>";
  } else {
      const oggi = new Date().toISOString().split('T')[0];

      prenotazioni.forEach((prenotazione) => {
          const prenotazioneDiv = document.createElement("div");
          prenotazioneDiv.classList.add("prenotazione");
          const casaImageSrc = `casa${prenotazione.id_casa}.jpg`;
          
          prenotazioneDiv.innerHTML = `
              <div class="image-container">
                  <img src="${casaImageSrc}" alt="Casa ${prenotazione.id_casa}">
              </div>
              <p><strong>ID Prenotazione:</strong> ${prenotazione.id}</p>
              <p><strong>Alloggio:</strong> ${prenotazione.nome_casa}</p>
              <p><strong>Data Check-in:</strong> ${prenotazione.checkin}</p>
              <p><strong>Data Check-out:</strong> ${prenotazione.checkout}</p>
              <p><strong>Numero ospiti:</strong> ${prenotazione.numero_persone}</p>
              <p><strong>Totale pagato:</strong> ${prenotazione.totale}</p>
          `;

          prenotazioniContainer.appendChild(prenotazioneDiv);

          // Controlla se la data di check-in è successiva a oggi
          if (prenotazione.checkin > oggi) {
              const eliminaButton = document.createElement("button");
              eliminaButton.classList.add("elimina-btn");
              eliminaButton.innerText = "Elimina Prenotazione";
              eliminaButton.addEventListener('click', function () {
                  eliminaPrenotazione(prenotazione.id);
              });
              
              // Aggiungi il bottone solo se prenotazioneDiv ha un nodo padre
              if (prenotazioneDiv.parentNode) {
                  prenotazioneDiv.appendChild(eliminaButton);
              }
          }
      });
  }
}



function eliminaPrenotazione(idPrenotazione) {
  const xhrDelete = new XMLHttpRequest();
  xhrDelete.onreadystatechange = function () {
      if (this.readyState == 4) {
          if (this.status == 200) {
              // Aggiorna la pagina dopo l'eliminazione
              location.reload();
          } else {
              console.error("Errore durante l'eliminazione della prenotazione");
          }
      }
  };

  // Usa il metodo DELETE per l'eliminazione
  xhrDelete.open("DELETE", `elimina_prenotazione.php?id=${idPrenotazione}`, true);
  xhrDelete.send();
}
