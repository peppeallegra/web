<?php
include "index.php";

// Recupera i valori dal form con protezione da SQL injection
$numeroCartaID = mysqli_real_escape_string($conn, $_POST['numeroCartaID']);
$nome = mysqli_real_escape_string($conn, $_POST['nome']);
$cognome = mysqli_real_escape_string($conn, $_POST['cognome']);
$dataNascita = date('Y-m-d', strtotime($_POST['dataNascita']));
$residenza = mysqli_real_escape_string($conn, $_POST['residenza']);
$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, $_POST['password']);
$hashedPassword = password_hash($password, PASSWORD_DEFAULT);


$sql = "INSERT INTO persona (id, nome, cognome, data_di_nascita, residenza, email, password, log) 
        VALUES ('$numeroCartaID', '$nome', '$cognome', '$dataNascita', '$residenza', '$email', '$hashedPassword',0)";


if ($conn->query($sql) === TRUE) {
    echo "Dati inseriti correttamente nel database";
} else {
    echo "Errore nell'inserimento dei dati nel database: " . $conn->error;
}

$conn->close();
?>
