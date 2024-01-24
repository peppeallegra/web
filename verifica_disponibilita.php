<?php
include 'index.php';

$id_casa = $_POST['id_casa'];
$checkin = $_POST['checkin'];
$checkout = $_POST['checkout'];


$query = "SELECT COUNT(*) as count FROM prenotazioni WHERE id_casa = $id_casa AND ('$checkin' BETWEEN checkin AND checkout OR '$checkout' BETWEEN checkin AND checkout)";

$result = mysqli_query($conn, $query);

if ($result) {
    $row = mysqli_fetch_assoc($result);
    $count = $row['count'];

    if ($count == 0) {
        echo "disponibile";
    } else {
        echo "non_disponibile";
    }
} else {
    echo "errore: " . mysqli_error($conn);
}

mysqli_close($conn);
?>
