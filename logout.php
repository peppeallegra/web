<?php
include "index.php"; 
session_start(); 

if (isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];  

    $sql = "UPDATE persona SET log = 0 WHERE id = '$userId'";

    if ($conn->query($sql) === TRUE) {
        // Elimina tutte le variabili di sessione
        session_unset();
        // Distruggi la sessione
        session_destroy();

        // Reindirizza alla pagina home
        header("Location: home.html");
        exit();
    } else {
        echo "Errore nell'aggiornamento del database: " . $conn->error;
    }
} else {
    echo "ID dell'utente non trovato nella sessione.";
}

$conn->close();
?>