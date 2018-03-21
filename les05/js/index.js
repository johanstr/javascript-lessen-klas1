// var lijst = document.getElementById('lijst');
var lijst = $('#lijst');
var lijstItemNummer = 0;
var image;
var imageNummer = 0;

window.onload = function() {
    // image = document.getElementsByTagName('img')[0];
    image = $('img:first-child');
    // image.addEventListener('click', changeImage);
    image.on('click', changeImage);
};

function appendItem() {
    // var lijstItem = document.createElement('li');

    // lijstItemNummer++;
    // var lijstItemText = document.createTextNode("Lijst Item " + lijstItemNummer);

    // lijstItem.appendChild(lijstItemText);

    // lijst.appendChild(lijstItem);
    lijst.add('li').html('Lijst Item' + lijstItemNummer);
}

function changeImage() {
    if(imageNummer === 0) {
        imageNummer = 1;
        image.src = 'img/test2.png';
    } else {
        imageNummer = 0;
        image.src = 'img/test.png';
    }
}