# LES 11 - JavaScript
## AJAX en JSON 5
  
### Inleiding
In deze les maken we voor de tweede keer kennis met AJAX en JSON.  
We ontdekken eerst hoe je een AJAX call in vanilla JavaScript regelt en daarna gaan we jQuery gebruiken om hetzelfde voor elkaar te krijgen.  
  
### Doel
Met een AJAX call naar de server willen we van het forum, welke we ook voor de lessen PHP ontwikkelen, dezelfde startpagina vullen met een overzicht van alle topics van een thread. We gaan nu leren hoe we informatie uit een formulier kunnen sturen naar de server om, in dit geval, de aangepaste data van een user (profiel) op te slaan in de database.  
  
### Bestanden
  
* **index.js**  
  Dit bestand is gekoppeld aan index.html. In dit bestand gebruiken we jQuery om data,
  via een AJAX call naar api.php op de server, uit een database te halen en de data in
  de pagina te injecteren met jQuery.
* **vanilla-js-ajax.js**  
  In dit bestand laten we zien hoe we hetzelfde voor elkaar krijgen als in index.js maar dan met vanilla JavaScript.
* **api.php**  
  Dit is een programmaatje welke we uitsluitend op een webserver hebben staan en vanuit een webpagina met behulp van JavaScript en een AJAX call verzoeken om data uit de database. Dit programmaatje geeft dan de gevonden data uit de database in JSON-formaat terug aan de caller (onze index.js).

### Wat moet je kennen na de lessen?
* Wat is JSON? 
* Hoe kan ik vanuit PHP data in JSON-formaat omzetten?
* Hoe stuur ik JSON-formaat data naar JavaScript vanuit PHP?
* Hoe doe ik vanuit JavaScript een AJAX call naar een PHP script op de server?
* Hoe vang ik in JavaScript de teruggestuurde data in JSON-formaat op?
* Hoe verwerk ik de ontvangen JSON data in JavaScript en laat ik de data zien?
* Hoe kan ik data uit de URL halen met JavaScript?
* Hoe kan ik data uit een formulier met JavaScript via een AJAX call sturen naar de server?