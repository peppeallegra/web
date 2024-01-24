<?php include 'check_log.php'; ?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title>Pagina pagamento</title>
	<link rel="stylesheet" type="text/css" href="payment.css">
	<script src="https://code.jquery.com/jquery-3.6.4.min.js"></script>
    <script src="payment.js" defer></script>
</head>
<body>
<header>
	<div class="container">
		<form id="prenotazione-form">
			<div class="left">
				<h3>CREDENZIALI</h3>
					<label for="nome">Nome:</label>
					<input type="text" id="nome" name="nome" required>

					<label for="cognome">Cognome:</label>
					<input type="text" id="cognome" name="cognome" required>

					<label for="email">Email:</label>
					<input type="email" id="email" name="email" required>

					<label for="numero_persone">Numero Persone:</label>
					<input type="number" id="numero_persone" name="numero_persone" required>
			</div>
			<div class="right">
				<h3>PAGAMENTO</h3>
					Accepted Card <br>
					<img src="card1.png" width="100">
					<img src="card2.png" width="50">
					<br><br>

					<label for="numero_carta">Numero Carta di Credito:</label>
					<input type="text" id="numero_carta" name="numero_carta" required>

					<label for="cvv">CVV:</label>
					<input type="text" id="cvv" name="cvv" required>

					<label for="scadenza_carta">Scadenza:</label>
					<input type="text" id="scadenza_carta" name="scadenza_carta" required>

					<input type="hidden" id="userId" name="userid">
					<input type="hidden" id="id_casa" name="id_casa">
					<input type="hidden" id="checkin" name="checkin">
					<input type="hidden" id="checkout" name="checkout">
					<input type="hidden" id="prezzo" name="prezzo">
			</div>
			<div>
				<button type="submit" id="submit">Effettua Prenotazione</button>
			</div>
		</form>
	</div>
</header>
</body>
</html>