
var registrationSuccess = false; // Variabile per tenere traccia della registrazione avvenuta con successo

document.getElementById('registrationForm').addEventListener('submit', function(event) {
    var password = document.getElementById('password').value;
    var verificaPassword = document.getElementById('verificaPassword').value;
    var passwordError = document.getElementById('passwordError');

    if (password !== verificaPassword) {
        passwordError.style.display = 'block';
        event.preventDefault(); // Impedisce l'invio del form se le password non corrispondono
    } else {
        passwordError.style.display = 'none';

        // Recupera i dati del form
        var formData = new FormData(this);

        var xhr = new XMLHttpRequest();
        xhr.open('POST', 'register.php', true);
        xhr.onload = function() {
            if (xhr.status === 200) {
                console.log(xhr.responseText); 
                // Controlla la risposta dal backend
                if (xhr.responseText.includes('Dati inseriti correttamente nel database')) {
                    registrationSuccess = true;
                    alert("Registrazione effettuata con successo");
                    window.location.href = "login.html"; // Reindirizza immediatamente alla pagina login.html
                } else {
                    alert("Si è verificato un errore durante la registrazione: " + xhr.responseText); // Mostra la risposta del server nell'alert
                }
            }
        };
        xhr.onerror = function() {
            alert("Si è verificato un errore di rete.");
        };
        xhr.send(formData);

        // Impedisci l'invio del form immediato
        event.preventDefault();
    }
});

