/*
*   Onderstaande globale variabele bevat de link naar een api op ons forum
*   Deze gaan we gebruiken om met AJAX en jQuery de index pagina te vullen
*   met database gegevens.
*/
var link_server = "http://localhost/school/1718/klas1/js/lessen/les12/app/api.php?page=thread&id=" + thread_id;

/*
 * component is een variabele waarin alle HTML-code staat die we willen gebruiken
 * om iedere topic op een juiste manier in de pagina te kunnen injecteren.
 * In deze string staan een aantal placeholders, nl:
 *      @TOPICTITLE@        Deze vervangen we later door de echte titel van een topic
 *      @TOPICCONTENT@      Deze vervangen we later door de echte content van een topic
 *      @USERNAME@          Deze vervangen we later door de echte username van de user die de topic heeft gemaakt
 *      @REPLYCOUNT@        Deze vervangen we later door het echte aantal replies van een topic
 *      @TIMESTAMP@         Deze vervangen we later door de datum en tijd dat de topic is aangemaakt
 * 
 * Het vervangen doen we uiteindelijk in de functie showTopics.
 */
var component = '<!-- BEGIN TOPIC -->' + 
'<a href="topic.html?id=@TOPIC_ID@" class="collection-item avatar collection-link">' + 
'<img src="http://www.gravatar.com/avatar/fc7d81525f7040b7e34b073f0218084d?s=50" alt="" class="square">' + 
'' + 
'<div class="row">' + 
'  ' +      
'<div class="col s8">' + 
'<div class="row last-row">' + 
'                <div class="col s12">' + 
'                    <span class="title">@TOPICTITLE@</span>' + 
'                    <p>@TOPICCONTENT@</p>' + 
'               </div>' + 
'           </div>' + 
'           <div class="row last-row">' + 
'               <div class="col s12 post-timestamp">Gepost door: @USERNAME@ op: @TIMESTAMP@</div>' + 
'            </div>' + 
'       </div>' + 
' ' + 
'        <div class="col s2">' + 
'           <h6 class="title center-align">Replies</h6>' + 
'           <p class="center replies">@REPLYCOUNT@</p>' + 
'       </div>' + 
'' + 
'       <div class="col s2">' + 
'           <h6 class="title center-align">Status</h6>' + 
'           <div class="status-wrapper">' + 
'               <span class="status-badge status-open">open</span>' + 
'           </div>' + 
'       </div>' + 
'' + 
'   </div>' + 
'</a>' + 
'<!-- EINDE TOPIC -->';


/*
 * content_component wordt hieronder gevuld met de DIV uit de pagina waarin
 * we alle topics willen gaan tonen. Dus hier gaan we steeds de HTML-code,
 * zoals dit in de variabele hierboven staat, per topic toevoegen.
 */
var content_component = $('#content');

