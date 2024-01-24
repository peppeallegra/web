<?php
include "index.php";

// Recupera l'ID dalla stringa URL
$id = isset($_GET['id']) ? $_GET['id'] : '0';
$userId = isset($_GET['userId']) ? $_GET['userId'] : '0';

$sql = "SELECT log FROM persona WHERE id = '$id' OR id = '$userId'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();

    
    if ($row['log'] != 1) {
        // Il valore di log non è 1, reindirizza alla pagina di login
        header("Location: login.html");
        exit();
    }
} else {
    // L'ID non è presente nel database, reindirizza alla pagina di login
    header("Location: login.html");
    exit();
}

$conn->close();
?>
