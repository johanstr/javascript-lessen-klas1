/*
*   Onderstaande globale variabele bevat de link naar een api op ons forum
*   Deze gaan we gebruiken om met AJAX en jQuery de index pagina te vullen
*   met database gegevens.
*/
var link_server = "http://localhost/school/1718/klas1/js/lessen/les10/app/api.php";

var component = '<!-- BEGIN VAN EEN THREAD -->' +
                '<a href="thread.html" class="collection-item avatar collection-link">' +
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

