
$(document).ready( function() {
	$('#btn1').click(panelToggle);
	$('#btn2').click(changeBGColor);
	$('#btn3').click(changeTitle);	
});

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
	$('#panel3 .panel-heading').html('TEST');
}