<!DOCTYPE html>
<html>
	<head>
		<title>jQuery Formulier Manipulatie</title>

		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
		<link rel="stylesheet" href="css/style.css" />
	</head>

	<body>
		<div class="row">
			<div class="col-md-2"></div>

			<div class="col-md-8">
				<div class="form">
					<h1>Groep samenstellen</h1>
					<hr />
					<form action="" method="POST">
						<div class="form-group">
							<label for="groepsnaam">Groepsnaam: </label>
							<input type="text" name="groepsnaam" />
						</div>
						
						<fieldset>
							<legend>&nbsp;Groepsleden&nbsp;</legend>
							<button class="btn btn-primary btn-sm ruimte"><i class="glyphicon glyphicon-plus"></i>&nbsp;Toevoegen</button>
							<div class="form-group">
								<label for="groepsleden[]">Naam: </label>
								<input type="text" name="groepsleden[]" />
							</div>
							
						</fieldset>
					</form>
				</div>
			</div> <!-- END OF CONTAINER -->

			<div class="col-md-2"></div>
		</div>

		<script src="js/jquery-3.3.1.min.js"></script>
		<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
		<script src="js/groups.js"></script>
	</body>
</html>