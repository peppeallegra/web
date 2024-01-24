<?php

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    include "index.php";

    // Recupero dei dati dal modulo
    $nome = $_POST['nome'];
    $cognome = $_POST['cognome'];
    $email = $_POST['email'];
    $numero_carta = $_POST['numero_carta'];
    $cvv = $_POST['cvv'];
    $scadenza_carta = $_POST['scadenza_carta'];
    $numero_persone = $_POST['numero_persone'];

    // Altri campi nascosti dal modulo
    $userid = $_POST['userid'];
    $id_casa = $_POST['id_casa'];
    $checkin = $_POST['checkin'];
    $checkout = $_POST['checkout'];
    $prezzo = $_POST['prezzo'];

    $queryCasa = "SELECT max_ospitanti FROM casa WHERE id = $id_casa";

    $resultCasa = $conn->query($queryCasa);

    if ($resultCasa === FALSE) {
        $response = "Errore nella query per ottenere il massimo numero di ospiti dalla tabella casa: " . $conn->error;
    } else {
            $rowCasa = $resultCasa->fetch_assoc();

            if ($rowCasa) {
                $maxOspitanti = $rowCasa['max_ospitanti'];

                // Verifica se il numero di persone è minore o uguale al massimo consentito
                if ($numero_persone <= $maxOspitanti) {
                    $queryInsert = "INSERT INTO prenotazioni (id_casa, id_persona, nome, cognome, email, checkin, checkout, numero_carta, numero_persone, totale)
                                    VALUES ('$id_casa', '$userid', '$nome','$cognome', '$email', '$checkin', '$checkout', '$numero_carta', '$numero_persone', '$prezzo')";

                    if ($conn->query($queryInsert) === TRUE) {
                        $response = "Prenotazione effettuata con successo!";
                    } else {
                        $response = "Errore durante l'inserimento nella tabella prenotazioni: " . $conn->error;
                    }
                } else {
                    $response = "Il numero di persone supera il massimo consentito per questa casa.";
                }
            } else {
                $response = "Errore: Non è stato possibile ottenere il massimo numero di ospiti dalla tabella casa.";
            }
        }

    $conn->close();

    echo $response;
} else {
    http_response_code(405);
    echo "Invalid request method";
}

?>
