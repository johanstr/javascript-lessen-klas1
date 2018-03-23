$( function() {

	/*
	 * fieldSet 	Bevat de gehele div, waarin de button zit en de inputs
	 *				Hier voegen we telkens een nieuwe formgroup aan toe.
	 * addButton	Is de blauwe button om een input toe te voegen
	 *				Deze hebben we nodig om een klik eventlistener aan
	 *				te koppelen.
	 * formGroup 	Dit is de div, waarin een input zit. Deze zullen
	 *				we gebruiken om a) te kopieren, b) een prullenbak
	 *				icoon toe te voegen aan de kopie en c) deze dan
	 *				toe te voegen aan de fieldset in het formulier.
	 */
	var $fieldSet = $('fieldset');
	var $addButton = $fieldSet.find('button');
	var $formGroup = $fieldSet.find('.form-group').first();
	var $newFormGroup = null;

	$addButton.click( function(e) {
		/*
		 * e.prevenyDefault() betekent dat we hiermee aangeven dat het
		 * standaard gedrag van deze button niet moet worden uitgevoerd
		 */
		e.preventDefault();

		/*
		 * Met de functie .clone() maken we een kopie van de formGroup-div
		 * en die stoppen we in dit geval in de variabele $newFormGroup
		 */
		$newFormGroup = $formGroup.clone();
		$($newFormGroup.children()[1]).val('');
		//$newFormGroup.find('input').value('');

		/*
		 * We voegen nu een icon aan het eind van de div toe
		 * deze staat dan visueel achter de input. Het gaat hier om een
		 * prullenbakje. Deze willen we kunnen gebruiken om de input die
		 * er voor staat weer te kunnen verwijderen door er op te klikken
		 */
		$newFormGroup.append('<i class="glyphicon glyphicon-trash"></i>');

		/*
		 * We zoeken de net toegevoegde icon (prullenbakje) en voegen daar
		 * direct een event listener aan toe die reageert op een klik.
		 * De bedoeling is dat we dan middels de functie removeGroupMember
		 * de inout die ervoor staat kunnen verwijderen.
		 */
		$newFormGroup.find('.glyphicon-trash').click(removeGroupMember);

		/*
		 * Nu voegen we de nieuwe (clone) div toe aan het formulier, deze is
		 * nu eveneens voorzien van een icoontje.
		 */
		$fieldSet.append($newFormGroup);
	});


	/*
	 * Dit is de functie die zal worden aangeroepen wanneer men klikt op 
	 * één van de prullenbakjes. Deze functie verwijderd dan de gehele
	 * fromgroup div uit het formulier.
	 */
	function removeGroupMember() {

		/*
		 * $(this) verwijst dus naar het element waarop geklikt is.
		 * in dit geval dus een icoontje. Met .parent() vragen we
		 * dan om het element waarin dit icoontje zit, oftewel de
		 * gehele formgroup div.
		 * Met .remove() halen we deze hele div weg uit het formulier
		 */
		$(this).parent().remove();
	}
});