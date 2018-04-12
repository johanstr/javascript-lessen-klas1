# LES 12 - JavaScript
## AJAX en JSON 3
  
### Inleiding
In deze les maken we kennis met AJAX en JSON.  
We ontdekken eerst hoe je een AJAX call in vanilla JavaScript regelt en daarna gaan we jQuery gebruiken om hetzelfde voor elkaar te krijgen.  
  
### Doel
Met een AJAX call naar de server willen we van het forum, welke we ook voor de lessen PHP ontwikkelen, dezelfde startpagina vullen met een overzicht van alle threads.  
  
### Bestanden
  
In deze les koppelen we meerdere pagina's aan elkaar met links, waarmee we de pagina's thread.html en topic.html kunnen vertellen van welke thread of topic we een overzicht willen hebben. Bestudeer de code daarom goed om een idee te krijgen hoe dit te doen.  
  
* **index.js**  
  Dit bestand is gekoppeld aan index.html. In dit bestand gebruiken we jQuery om data,
  via een AJAX call naar api.php op de server, uit een database te halen en de data in
  de pagina te injecteren met jQuery. Dit bestand vult de startpagina.
* **thread.js**  
  In dit bestand hebben we geprogrammeerd dat we een overzicht krijgen van alle topics van een thread. In dit bestand vind je een function met de naam **findGetParameter**. Met deze function halen we gegevens van de URL om te kunnen bepalen van welke thread we een overzicht willen hebben.
* **topic.js**  
  In dit bestand hebben we geprogrammeerd dat we een overzicht krijgen van alle replies van een topic. Ook hier maken we gebruik van de URL en de function **findGetParameter**.
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
* Hoe kan ik vanuit de URL gegevens halen en gebruiken in JavaScript?