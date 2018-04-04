/*
*   Onderstaande globale variabele bevat de link naar een api op ons forum
*   Deze gaan we gebruiken om met AJAX en jQuery de index pagina te vullen
*   met database gegevens.
*/
var link_server = "http://localhost/school/1718/klas1/js/lessen/les10/app/api.php?page=thread&id=1";

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
var component = '<!-- BEGIN TOPIC -->' + 
'<a href="topic.html" class="collection-item avatar collection-link">' + 
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
 * we alle threads willen gaan tonen. Dus hier gaan we steeds de HTML-code,
 * zoals dit in de variabele hierboven staat, per thread toevoegen.
 */
var content_component = $('#content');

