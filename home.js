// Funzione per ottenere dinamicamente il valore di log dal lato server
function getLogValue(userId) {
    var endpoint = 'home.php?id=' + userId;
  
    fetch(endpoint)
        .then(response => {
            if (!response.ok) {
                throw new Error('Errore nella richiesta per ottenere il valore di log');
            }
            return response.json();
        })
        .then(data => {
            var logValue = parseInt(data.log);
            console.log("Valore di log ricevuto:", logValue);
            modifyMenu(logValue,userId);
        })
        .catch(error => {
            console.error(error);
        });
  }
  
  //ottieni il valore di log quando si carica la pagina, utilizzando l'userId estratto dall'URL
  var urlParams = new URLSearchParams(window.location.search);
  
  if (urlParams.has('id')) {
    var userId = urlParams.get('id');
    getLogValue(userId);
  
    // Impostazione corretta dell'URL per il link al catalogo
    var catalogLink = document.querySelector('.menu li:nth-child(2) a');
    catalogLink.href = "catalogo.html?id=" + userId;
    var bookingsLink = document.querySelector('.menu li:nth-child(3) a');
    bookingsLink.href = "prenotazioni_.php?id=" + userId;
  
  } else {
    console.log("Nessun ID utente presente nell'URL");
  }
  
  function modifyMenu(logState) {
    var catalogLink = document.querySelector('.menu li:nth-child(2) a'); // Selezione del link "Case in catalogo"
    var loginLink = document.querySelector('.cta a:nth-child(1)'); // Selezione del link "Login"
    var registerLink = document.querySelector('.cta a:nth-child(2)'); // Selezione del link "Registrati"
    var logoutLink = document.getElementById('logoutLink');
    var bookingsCTA = document.getElementById('bookingsLink');
  
    if (logState === 1) { // Se il valore del log è 1, l'utente è loggato:
        catalogLink.textContent = 'Catalogo';
        loginLink.style.display = 'none';
        bookingsLink.textContent = 'Prenotazioni';
        bookingsLink.style.display = 'inline-block';
        bookingsCTA.style.display = 'block';
        registerLink.style.display = 'none';
        logoutLink.style.display = 'block';
  
    } else { // Altrimenti, l'utente non è loggato:
        catalogLink.textContent = 'Catalogo';
        bookingsLink.style.display = 'none';
        bookingsCTA.style.display = 'none';
        loginLink.style.display = 'inline-block';
        registerLink.style.display = 'inline-block';
        logoutLink.style.display = 'none'; 
    }
  }
  
  // Funzione per ottenere dinamicamente l'ID utente dalla URL del catalogo
  function getUserIdFromURL() {
    var urlParams = new URLSearchParams(window.location.search);
  
    if (urlParams.has('id')) {
      return urlParams.get('id');
    } else {
      return null;
    }
  }
  
  var userIdFromCatalogo = getUserIdFromURL();
  
  if (userIdFromCatalogo) {
    console.log("ID utente ricevuto dalla pagina del catalogo:", userIdFromCatalogo);
  } else {
    console.log("Nessun ID utente presente nell'URL della pagina del catalogo");
  }