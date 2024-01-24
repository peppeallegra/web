<?php
// Connessione al database
$servername = "172.17.0.1";
$username = "root";
$password = "root";
$dbname = "Web";
$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {
die("Connection failed: " . $conn->connect_error);
}
?>