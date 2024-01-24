<?php
session_start();

if (isset($_SESSION['user_id'])) {
    $userId = $_SESSION['user_id'];
    echo $userId;
} else {
    echo 'Nessun ID utente presente nella sessione';
}
?>
