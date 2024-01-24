<?php
include "index.php";

if (isset($_GET['id'])) {
    $userId = $_GET['id'];

    if ($conn) {
        $stmt = $conn->prepare("SELECT log FROM persona WHERE id = ?");
        if ($stmt) {
            $stmt->bind_param('s', $userId);
            $stmt->execute();

            $result = $stmt->get_result()->fetch_assoc();

            if ($result) {
                $logValue = $result['log'];

                header('Content-Type: application/json');
                echo json_encode(['log' => $logValue]);
            } else {
                echo "Errore: Utente non trovato.";
            }
        } else {
            echo "Errore nella preparazione della query: " . $conn->error;
        }
    } else {
        echo "Errore nella connessione al database.";
    }
} else {
    echo "Errore: ID utente non fornito.";
}
?>