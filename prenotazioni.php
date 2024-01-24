<?php
include 'index.php';

// Recupera l'ID dell'utente dalla richiesta GET
$userId = $_GET['id'];

$sql = "SELECT p.*, c.nome, c.id AS nome_casa FROM prenotazioni p
        INNER JOIN casa c ON p.id_casa = c.id
        WHERE p.id_persona = '$userId'";
$result = $conn->query($sql);

$prenotazioni = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $prenotazioni[] = $row;
    }
}

// Restituisci le prenotazioni in formato JSON
echo json_encode($prenotazioni);

$conn->close();
?>
