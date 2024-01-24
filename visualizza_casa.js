function updateTotal() {
    var checkinInput = $("#checkin");
    var checkoutInput = $("#checkout");

    var today = new Date();
    today.setDate(today.getDate() + 1); // Imposta la prima data prenotabile come il giorno successivo
    var checkinDate = new Date(checkinInput.val());
    var checkoutDate = new Date(checkoutInput.val());

    // Imposta l'attributo min nel campo di input della data di check-out
    checkoutInput.attr("min", formatDate(checkinDate));

    // Imposta l'attributo min nel campo di input della data di check-in
    checkinInput.attr("min", formatDate(today));

    // Imposta l'attributo max nel campo di input della data di check-in
    checkinInput.attr("max", formatDate(checkoutDate));

    var nights = dateDiffInDays(checkinDate, checkoutDate);
    var totalPrice = nights * 100;
    $("#total-price").text(totalPrice);
}

function book() {
    var checkinDate = new Date($("#checkin").val());
    var checkoutDate = new Date($("#checkout").val());

    // Controllo che il check-out sia successivo al check-in
    if (checkoutDate <= checkinDate) {
        alert("La data di check-out deve essere successiva alla data di check-in.");
        return;
    }

    // Controllo che il check-out non sia prima della data odierna
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    if (checkoutDate < today) {
        alert("La data di check-out non può essere precedente alla data odierna.");
        return;
    }

    // Ottieni l'userId dalla URL
    var userId = getUserIdFromUrl();

    // Ottieni l'id_casa dalla URL
    var urlParams = new URLSearchParams(window.location.search);
    var idCasa = urlParams.get('id_casa');

    // Calcola il totalPrice
    var nights = dateDiffInDays(checkinDate, checkoutDate);
    var totalPrice = nights * 100;

    // Invia la richiesta al server per verificare la disponibilità
    $.ajax({
        type: "POST",
        url: "verifica_disponibilita.php",
        data: {
            id_casa: idCasa,
            checkin: formatDate(checkinDate),
            checkout: formatDate(checkoutDate)
        },
        success: function(response) {
            if (response === "disponibile") {
                // Reindirizza alla pagina prenotazione.html con l'userId, l'id_casa, le date di prenotazione e il totalPrice
                window.location.href = "payment.php?userId=" + userId + "&id_casa=" + idCasa + "&checkin=" + formatDate(checkinDate) + "&checkout=" + formatDate(checkoutDate) + "&prezzo=" + totalPrice;
            } else {
                alert("Casa non disponibile per le date scelte.");
            }
        }
    });
}



function getUserIdFromUrl() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('userId');
}

function formatDate(date) {
    var year = date.getFullYear();
    var month = (date.getMonth() + 1).toString().padStart(2, '0');
    var day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function dateDiffInDays(a, b) {
    const timeDiff = b.getTime() - a.getTime();
    return Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
}

$(document).ready(function() {
    updateTotal(); // Chiamata quando la pagina viene caricata
});
