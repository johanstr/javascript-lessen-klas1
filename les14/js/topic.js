function findGetParameter(parameterName) {
    var result = null,
        tmp = [];
    var items = location.search.substr(1).split("&");
    for (var index = 0; index < items.length; index++) {
        tmp = items[index].split("=");
        if (tmp[0] === parameterName) result = decodeURIComponent(tmp[1]);
    }
    return result;
}
/*
*   Onderstaande globale variabele bevat de link naar een api op ons forum
*   Deze gaan we gebruiken om met AJAX en jQuery de index pagina te vullen
*   met database gegevens.
*/
var topic_id = findGetParameter('id');
var link_server = "http://localhost/school/1718/klas1/js/lessen/les12/app/api.php?page=topic&id=" + topic_id;

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
var component = '            <!-- BEGIN TOPIC -->' +
'<div class="card cyan lighten-5">' +
'    <div class="card-content">' +
'        <div class="collection">' +
'            <div class="collection-item row">' +
'                <div class="col s3">' +
'                    <div class="avatar collection-link">' +
'                        <div class="row">' +
'                            <div class="col s3">' +
'                                <img src="http://www.gravatar.com/avatar/fc7d81525f7040b7e34b073f0218084d?s=50" alt="" class="square">' +
'                            </div>' +
'                            <div class="col s9">' +
'                                <p class="user-name">@USERNAME@</p>' +
'                            </div>' +
'                        </div>' +
'                        <p class="post-timestamp">' +
'                            Gepost op @CREATED_AT@' +
'                        </p>' +
'                    </div>' +
'                </div>' +
'                <div class="col s9">' +
'                    <div class="row last-row">' +
'                        <div class="col s12">' +
'                            <p>' +
'                                @REPLYCONTENT@' +
'                            </p>' +
'                        </div>' +
'                    </div>' +
'                    <div class="row last-row block-timestamp">' +
'                        <div class="col s6 push-s6">' +
'                            <p class="post-timestamp last-post-timestamp">Laatst aangepast op: @UPDATED_AT@</p>' +
'                        </div>' +
'                    </div>' +
'                </div>' +
'            </div>' +
'        </div>' +
'    </div>' +
'</div>' +
'<!-- EINDE TOPIC -->';

/*
 * content_component wordt hieronder gevuld met de DIV uit de pagina waarin
 * we alle threads willen gaan tonen. Dus hier gaan we steeds de HTML-code,
 * zoals dit in de variabele hierboven staat, per thread toevoegen.
 */
var content_component = $('#content');

function showReplies(data)
{
    for(var rij = 0; rij < data.length; rij++) {

        var topic_component = component;

        topic_component = 
            topic_component.replace('@UPDATED_AT@', data[rij].updated_at);

        topic_component =
            topic_component.replace('@REPLYCONTENT@', data[rij].content.substr(1, 200));

        topic_component = 
            topic_component.replace('@USERNAME@', data[rij].username);

        topic_component = 
            topic_component.replace('@CREATED_AT@', data[rij].created_at);

        content_component.append(topic_component);
    }
    
}

$.ajax(link_server)
    .done( showReplies );