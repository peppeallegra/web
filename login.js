document.getElementById('loginForm').addEventListener('submit', function(event) {
    // Recupera i dati del form
    var formData = new FormData(this);

    // Effettua una chiamata AJAX per il login
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'login.php', true);
    xhr.onload = function() {
        if (xhr.status === 200) {
            console.log(xhr.responseText);

            // Controlla la risposta dal backend
            if (xhr.responseText.includes('Password errata')) {
                alert("Password errata");
            } else if (xhr.responseText.includes('Utente non trovato')) {
                alert("Utente non trovato");
            } else {
                // Login riuscito, ottieni l'ID dell'utente dalla risposta
                var userId = xhr.responseText.trim();
                
                var pagePath = "home.html?id=" + userId;

                // Reindirizza alla pagina corrispondente
                window.location.href = pagePath;
            }
        }
    };
    xhr.onerror = function() {
        alert("Si è verificato un errore di rete.");
    };
    xhr.send(formData);

    // Impedisci l'invio del form immediato
    event.preventDefault();
});
