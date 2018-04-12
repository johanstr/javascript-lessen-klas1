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

var user_id = findGetParameter('id');       // Dit is de ID van de user waarvan we de profiel
                                            // Pagina willen zien

/*
*   Onderstaande globale variabele bevat de link naar een api op ons forum
*   Deze gaan we gebruiken om met AJAX en jQuery de index pagina te vullen
*   met database gegevens.
*/
var link_server = "http://localhost/school/1718/klas1/js/lessen/les13/app/api.php?page=profile&id="+user_id;

/*
 * component is een variabele waarin alle HTML-code staat die we willen gebruiken
 * om iedere thread op een juiste manier in de pagina te kunnen injecteren.
 * In deze string staan een aantal placeholders, nl:
 *      @USERNAME@      Deze vervangen we later door de echte username van de user
 *      @EMAIL@         Deze vervangen we later door de mail van de user
 * 
 * Het vervangen doen we uiteindelijk in de functie showThreads.
 */
var component = '<form method="" action="" class="col s12">' +
'                    <div class="row">' +
'                        <div class="input-field col s12">' +
'                            <input autocomplete="off" id="username" value="@USERNAME@" type="text">' +
'                            <label for="username">Gebruikersnaam</label>' +
'                        </div>' +
'                    </div>' +
'                    <div class="row">' +
'                        <div class="input-field col s12">' +
'                            <input autocomplete="off" id="password" value="" type="password">' +
'                            <label for="password">Wachtwoord</label>' +
'                        </div>' +
'                    </div>' +
'                    <div class="row">' +
'                        <div class="input-field col s12">' +
'                            <input autocomplete="off" id="email" value="@EMAIL@" type="email">' +
'                            <label for="email">Email</label>' +
'                        </div>' +
'                    </div>' +
'                    <div class="row">' +
'                        <button type="submit" class="right btn-floating btn-large waves-effect waves-light green"><i class="material-icons">save</i>>Bewaren</button>' +
'                    </div>' +
'                </form>';

/*
 * content_component wordt hieronder gevuld met de DIV uit de pagina waarin
 * we het formulier willen gaan tonen. Dus hier gaan we steeds de HTML-code,
 * zoals dit in de variabele hierboven staat, per thread toevoegen.
 */
var content_component = $('#content');

/* HIERONDER BEGIN JE ZELF TE PROGRAMMEREN */
/* EEN OPLOSSING STAAT HIERONDER: */
function showUser(data)
{
    component = component.replace('@USERNAME@', data.username);
    component = component.replace('@EMAIL@', data.email);

    content_component.append(component);
}

$.ajax(link_server).done(showUser);