/*
*   Onderstaande globale variabele bevat de link naar een api op ons forum
*   Deze gaan we gebruiken om met AJAX en jQuery de index pagina te vullen
*   met database gegevens.
*/
var link_server = "http://localhost/school/1718/klas1/js/lessen/les12/app/api.php";

/*
 * component is een variabele waarin alle HTML-code staat die we willen gebruiken
 * om iedere thread op een juiste manier in de pagina te kunnen injecteren.
 * In deze string staan een aantal placeholders, nl:
 *      @TITLE@         Deze vervangen we later door de echte titel van een thread
 *      @CONTENT@       Deze vervangen we later door de echte content van een thread
 *      @USERNAME@      Deze vervangen we later door de echte username van de user die de thread heeft gemaakt
 *      @TOPICCOUNT@    Deze vervangen we later door het echte aantal topics van een thread
 * 
 * Het vervangen doen we uiteindelijk in de functie showThreads.
 */
var component = '<!-- BEGIN VAN EEN THREAD -->' +
                '<a href="thread.html?id=@THREAD_ID@" class="collection-item avatar collection-link">' +
                '    <img src="img/icon-php.png" alt="" class="circle">' +
                '    <div class="row">' +
                '        <div class="col s9">' +
                '        <div class="row last-row">' +
                '            <div class="col s12">' +
                '            <span class="title">@TITLE@</span>' +
                '            <p>@CONTENT@</p>' +
                '            </div>' +
                '        </div>' +
                '        <div class="row last-row">' +
                '            <div class="col s12 post-timestamp">Moderator: @USERNAME@</div>' +
                '        </div>' +
                '        </div>' +
                '        <div class="col s3">' +
                '        <h6 class="title center-align">Statistieken</h6>' +
                '        <p class="center-align">@TOPICCOUNT@ topics</p>' +
                '        </div>' +
                '     </div>' +
                '</a>' +
                '<!-- EINDE VAN EEN THREAD -->';

/*
 * content_component wordt hieronder gevuld met de DIV uit de pagina waarin
 * we alle threads willen gaan tonen. Dus hier gaan we steeds de HTML-code,
 * zoals dit in de variabele hierboven staat, per thread toevoegen.
 */
var content_component = $('#content');

/*
 * showThreads
 * -----------
 * Deze functie laat de database gegevens zien in de pagina.
 * De database gegevens zijn via een AJAX-call naar de server
 * teruggekomen in de variabele data.
 * De variabele data is een JSON-format array. Iedere
 * rij in de array data is een JavaScript-object.
 * De kolomnamen uit de database tabel zijn ook de properties
 * in zo'n object. Dus we hebben title, content, username en TopicCount
 * als property in zo'n object.
 */
function showThreads(data)
{
    /*
     * Met de onderstaande for-lus lopen we door
     * de array data heen om iedere thread te
     * kunnen injecteren in HTML-code
     */
    for(var rij = 0; rij < data.length; rij++) {
        /*
         * thread_component vullen we met de onderstaande
         * regel steeds weer opnieuw met schone HTML-code
         * zodat we de inhoud van een thread clean kunnen
         * injecteren in deze HTML-code.
         */
        var thread_component = component;

        /*
         * Met de onderstaande opdracht vervangen we steeds
         * een stukje uit de HTML-code door de inhoud van 
         * de array data (dus de data uit de database) per
         * thread.
         */
        thread_component = 
            thread_component.replace('@THREAD_ID@', data[rij].id);

        thread_component = 
            thread_component.replace('@TITLE@', data[rij].title);

        thread_component =
            thread_component.replace('@CONTENT@', data[rij].content.substr(1, 200));    // de content kan soms te groot worden
                                                                                        // met .substr(1,200) pakken we alleen
                                                                                        // de eerste 200 tekens van de content.
        thread_component = 
            thread_component.replace('@USERNAME@', data[rij].username);

        thread_component = 
            thread_component.replace('@TOPICCOUNT@', data[rij].TopicCount);
        
        /*
         * Met onderstaande code voegen we nu de hierboven
         * gevulde HTML-code toevoegen aan de DIV in onze
         * pagina.
         */
        content_component.append(thread_component);
    }
}

/*
 * De onderstaande twee regels zijn (met jQuery) genoeg
 * om een AJAX-call naar de server te sturen.
 */
$.ajax(link_server)
    .done( showThreads );
/*
 * De regel hierboven is nodig om jQuery te vertellen
 * welke functie moet worden uitgevoerd als de 
 * AJAX-call afgehandeld is en er dus een response
 * van de server is gekomen.
 */
