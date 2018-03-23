
$(document).ready( function() {
	$('#btn1').click(panelToggle);
	$('#btn2').click(changeBGColor);
	$('#btn3').click(changeTitle);	
	$('#btn4').click(slidePanel);
});

function slidePanel()
{
	$('#panel4').slideToggle(2000);
}

function panelToggle()
{
	$('#panel1').fadeToggle(2000);
}

function changeBGColor()
{
	$('#panel2').toggleClass('rood');
}

function changeTitle()
{
	if($('#panel3 .panel-heading').html() === 'TEST')
		$('#panel3 .panel-heading').html('#panel3');
	else
		$('#panel3 .panel-heading').html('TEST');
}