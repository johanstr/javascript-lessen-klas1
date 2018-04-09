/*
*   Onderstaande globale variabele bevat de link naar een api op ons forum
*   Deze gaan we gebruiken om met AJAX en jQuery de index pagina te vullen
*   met database gegevens.
*/
var link_server = "http://localhost/school/1718/klas1/js/lessen/les13/app/api.php?page=profile&id=1";

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
