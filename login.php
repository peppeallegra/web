<?php
include "index.php";

// Recupera i valori dal form e proteggi da SQL injection
$email = mysqli_real_escape_string($conn, $_POST['email']);
$password = mysqli_real_escape_string($conn, $_POST['password']);

$sql = "SELECT * FROM persona WHERE email='$email'";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    $row = $result->fetch_assoc();
    if (password_verify($password, $row['password'])) {
        // Credenziali corrette, esegui il login
        session_start();
        $_SESSION['user_id'] = $row['id'];
        $_SESSION['user_email'] = $row['email'];

        // Aggiorna l'attributo log a 1 (booleano true)
        $updateSql = "UPDATE persona SET log = 1 WHERE id = '" . $row['id'] . "'";
        $conn->query($updateSql);

        echo $row['id'];
    } else {
        echo "Password errata";
    }
} else {
    echo "Utente non trovato";
}


$conn->close();
?>
