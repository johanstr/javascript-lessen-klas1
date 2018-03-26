/*  ==========================================================================
    CONSTANTEN
    ==========================================================================
    Constanten zijn variabelen die niet gewijzigd zullen en kunnen worden
    in onze applicatie. We gebruiken ze eigenlijk vaak om waarden die we
    vaak gebruiken voor b.v. controles een duidelijker naam te geven. 
    Hierdoor kunnen we in onze code makkelijker lezen wat we bedoelen.
    Dus puur voor de leesbaarheid van onze code.
    ==========================================================================
 */
const SPELER1               = 0;
const SPELER2               = 1;
const CARD_BACK             = 0;
const CARD_FRONT            = 1;
const OFF                   = false;
const ON                    = true;
const YES                   = true;
const NO                    = false;
const NO_CARD_CLICKED       = -1;
const FIRST_CARD_CLICKED    = 0;
const LAST_CARD_CLICKED     = 1;

/*  ==========================================================================
    VARIABELEN
    ==========================================================================
    Variabelen zullen wel gewijzigd worden. Op z'n minst om bij het starten
    van ons programma ze alvast te vullen met een object of een waarde.
    ==========================================================================
 */
var speelveld;                  // Element
var game_button;                // Element
var score_speler_1;             // Element
var score_speler_2;             // Element
var rondescore_speler_1;        // Element
var rondescore_speler_2;        // Element
var huidige_speler = SPELER1;   // Welke speler is aan de beurt
var naam_speler_1;              // Element
var naam_speler_2;              // Element
var cards = [                   // De nummers zijn tevens de namen van de jpeg
  1, 2, 3, 4, 5, 6, 7, 8,       // afbeeldingen (1.jpg bijvoorbeeld)
  1, 2, 3, 4, 5, 6, 7, 8
];
/*
    In de onderstaande array houden we bij op welke twee kaarten geclicked is
    We kunnen deze array ook gebruiken om te controleren of het maximaal
    aantal aan te klikken kaarten al is bereikt.
 */
var cards_clicked = [ NO_CARD_CLICKED, NO_CARD_CLICKED ];

var ronde_scores = [ 0, 0 ];    // Hier houden we tijdelijk de rondescores bij
var totaal_scores = [ 0, 0 ];   // Hier houden we de totaal scores per speler bij

/*  ==========================================================================
    FUNCTIES
    ==========================================================================
    Hieronder schrijven we al onze functies die samen het spel vormen en het
    dus mogelijk maken ons spel ook echt te spelen.
    De twee kernfuncties zijn:
    
    clickOnGameButton
    -----------------
    Deze functie gaat alle kliks op de button afhandelen en de dingen doen
    die we in de voorbereiding hebben bedacht.
    
    clickOnCard
    -----------
    Deze functie gaat alle kliks op de kaarten afhandelen. In deze functie
    wordt eigenlijk het spel gespeeld en moeten we dus ook verschillende
    controles inbouwen

    ==========================================================================
 */

/*  onload functie
    --------------
    Wordt alleen uitgevoerd na het laden van de pagina
 */
window.onload = function() {
    // Button binnenhalen en click event koppelen
    game_button = document.getElementById('game-button');
    game_button.onclick = clickOnGameButton;

    // Speler info binnenhalen
    score_speler_1 = document.getElementById('score-speler-1');
    score_speler_2 = document.getElementById('score-speler-2');
    rondescore_speler_1 = document.getElementById('rondescore-speler-1');
    rondescore_speler_2 = document.getElementById('rondescore-speler-2');
    naam_speler_1 = document.getElementById('name-speler-1');
    naam_speler_2 = document.getElementById('name-speler-2');

    // Speelkaarten binnenhalen
    speelveld = document.getElementsByClassName('play-card');
};

/*
    getCardImageTag()
    -----------------
    Maak de image tag af met een kaart op basis van de kaartnummer
    Een kaartnummer loopt van 0 t/m 15

    @return string  De image-tag naar een juiste afbeelding

    TYPE:   Hulpfunctie
 */
function getCardImageTag(card_index)
{
    /*
        Onderstaande opdracht levert bijvoorbeeld het volgende op als card_index gelijk is 1
        en op cards[1] staat het afbeeldingsnummer 8:

        <img class="play-card-img" src="img/8.jpg" />
     */
    return '<img  class="play-card-img" src="img/' + cards[card_index] + ".jpg\" />"
}

/*
    toggleClickOnCards()
    --------------------
    Activeer of deactiveer klikken op de cards
 */
function toggleClickOnCards(activate)
{
    for(var index = 0; index < speelveld.length; index++) {
        if(activate === ON)
            speelveld[index].parentElement.addEventListener('click', clickOnCard);
        else
            speelveld[index].parentElement.removeEventListener('click', clickOnCard);
    }
}

/*
    toggleClickOnCards()
    --------------------
    Activeer of deactiveer klikken op de cards
 */
function toggleClickOnSingleCard(card_number, activate)
{
    if(card_number >= 0 && card_number <= 15) {
        if(activate === ON)
            speelveld[card_number].parentElement.addEventListener('click', clickOnCard);
        else
            speelveld[card_number].parentElement.removeEventListener('click', clickOnCard);
    }
}

/*
    setClickOffOnClickedCards()
    ---------------------------
    Turns off the click event handler on the cards clicked.
    This function will be used in case of equal cards.
*/
function setClickOffOnClickedCards()
{
    speelveld[cards_clicked[FIRST_CARD_CLICKED]].parentElement.removeEventListener('click', clickOnCard);
    speelveld[cards_clicked[LAST_CARD_CLICKED]].parentElement.removeEventListener('click', clickOnCard);
}

/*
    resetScores()
    -------------
    Reset de rondescores
 */
function resetScores()
{
    ronde_scores[SPELER1] = 0;
    rondescore_speler_1.innerHTML = "0";
    ronde_scores[SPELER2] = 0;
    rondescore_speler_2.innerHTML = "0";
}

/*
    clickOnGameButton()
    -------------------
    Handel de clicks op de button af
 */
function clickOnGameButton(event)
{
    shuffleCards();         // Kaarten schudden
    resetScores();          // Reset rondescores

    huidige_speler = determineStartingPlayer();
    showCurrentPlayer();

    // Eerst kijken we naar de tekst op de knop om te bepalen wat er
    // moet gebeuren
    if(event.target.innerText === "Start") {
        toggleClickOnCards(ON);   // Klikken mogelijk maken
        event.target.innerText = "Reset";
    }
}

/*
    clickOnCard()
    -------------
    Handel de clicks op de cards af
    In deze functie handelen we een ronde af
 */
function clickOnCard(event)
{
    // Voorbereiden van lokale variabelen
    var cellNumber = event.target.parentElement.parentElement.parentElement.cellIndex;
    var rowNumber = event.target.parentElement.parentElement.parentElement.parentElement.rowIndex;
    var cardNumber = (rowNumber * 4) + cellNumber;

    // Hieronder volgt de logica
    if(!maxCardsClicked()) {
        // Kaart omdraaien en tijdelijk klikken onmogelijk maken
        flipCard(cardNumber);
        toggleClickOnSingleCard(cardNumber, OFF);
        // Kaart toevoegen aan array
        addCardClicked(cardNumber);

        //Zijn de kaarten gelijk? Ja, dan punten toekennen
        // en beurt houden. Nee, dan kaarten terugdraaien en beurt naar
        // volgende speler
        if(maxCardsClicked()) {
            // Twee kaarten zijn gedraaid, dus nu heeft het pas zin
            // om te controleren of ze gelijk zijn
            if(areCardsEqual()) {
                // Kaarten zijn gelijk
                ronde_scores[huidige_speler] += 1;  // Punt toevoegen
                if(huidige_speler === SPELER1)
                    rondescore_speler_1.innerHTML = parseInt(rondescore_speler_1.innerHTML) + 1;
                else
                    rondescore_speler_2.innerHTML = parseInt(rondescore_speler_2.innerHTML) + 1;
                //setClickOffOnClickedCards();  // Klikken is al uit
                resetCardsClicked();
            } else {
                // Kaarten zijn niet gelijk
                // Dus beide kaarten terug draaien en klikken weer mogelijk maken
                setTimeout( function() {
                    flipCard(cards_clicked[FIRST_CARD_CLICKED]);
                    flipCard(cards_clicked[LAST_CARD_CLICKED]);
                    toggleClickOnSingleCard(cards_clicked[FIRST_CARD_CLICKED], ON);
                    toggleClickOnSingleCard(cards_clicked[LAST_CARD_CLICKED], ON);
                   
                    // Beurt overgeven aan andere speler
                    switchTurn();

                    resetCardsClicked();
                }, 3000 );
            }
        }

        // Controleren of we alle kaarten al gedraaid hebben
        // want dan eindigt de ronde
        if(endOfRoundReached()) {
            endRound();
        }
    }
}

/*
    switchTurn()
    ------------
    Switch the turn
*/
function switchTurn()
{
    if(huidige_speler === SPELER1) {
        huidige_speler = SPELER2;
    } else {
        huidige_speler = SPELER1;
    }

    showCurrentPlayer();
}

/*
    endOfRoundReached()
    -------------------
    Testing if all cards are used in this round.

    @return bool    Yes if all cards are used, otherwise No
*/
function endOfRoundReached()
{
    if((ronde_scores[SPELER1] + ronde_scores[SPELER2]) === 8)
        return YES;

    return NO;
}

/*
    endRound()
    ----------
    Einde van een ronde. Dus afhandelen wanneer een ronde ten einde is
 */
function endRound()
{
    //Einde van een ronde afhandelen
    toggleClickOnCards(OFF);
    game_button.innerText = "Start";
    //Ronde scores optellen bij totaal en laten zien
    showRoundScores();
    resetScores();

    setTimeout(function() {
        // Flip all cards back
        for(var card_number = 0; card_number < speelveld.length; card_number++) {
            flipCard(card_number);
        }
    }, 3000);
}

/*
    areCardsEqual()
    ---------------
    Controleren of twee gekozen kaarten gelijk zijn
    We gebruiken daarvoor de cards_clicked array,
    als het goed is registreren we daar steeds de gekozen
    kaarten.

    @return boolean     true als ze gelijk zijn, anders false
 */
function areCardsEqual()
{
    if(cards[cards_clicked[FIRST_CARD_CLICKED]] === cards[cards_clicked[LAST_CARD_CLICKED]])
        return YES;

    return NO;
}

/*
    shuffleCards()
    --------------
    Shuffle de kaarten
    Hulpfunctie
 */
function shuffleCards()
{
    var i = 0;
    var j = 0;
    var temp = null;

    for (i = cards.length - 1; i > 0; i -= 1) {
        j = Math.floor(Math.random() * (i + 1));
        temp = cards[i];
        cards[i] = cards[j];
        cards[j] = temp;
    }
}

/*
    countCardsClicked()
    -------------------
    Tel het aantal kaarten die een speler heeft aangeklikt.

    @return int Aantal kaarten die aangeklikt zijn
 */
function countCardsClicked()
{
    var clicked = 0;

    if(cards_clicked[FIRST_CARD_CLICKED] !== NO_CARD_CLICKED)
        clicked++;

    if(cards_clicked[LAST_CARD_CLICKED] !== NO_CARD_CLICKED)
        clicked++;

    return clicked;
}

/*
    maxCardsClickedReached()
    ------------------------
    Hebben we het maximaal aantal kaarten per beurt bereikt?

    @return boolean True als er 2 kaarten zijn aangeklikt, anders False
 */
function maxCardsClicked()
{
    return (countCardsClicked() === 2);
}

/*
    resetCardsClicked()
    -------------------
    Reset de array cards_clicked, zodat we weer op 0 kaarten staan
 */
function resetCardsClicked()
{
    cards_clicked[FIRST_CARD_CLICKED] = NO_CARD_CLICKED;
    cards_clicked[LAST_CARD_CLICKED] = NO_CARD_CLICKED;
}

/*
    addCardClicked()
    ----------------
    Adds a card on which is clicked to the cards_clicked array
    checking if there is room left.
*/
function addCardClicked(card_number)
{
    if(cards_clicked[FIRST_CARD_CLICKED] === NO_CARD_CLICKED) {
        cards_clicked[FIRST_CARD_CLICKED] = card_number;
    } else if(cards_clicked[LAST_CARD_CLICKED] === NO_CARD_CLICKED) {
        cards_clicked[LAST_CARD_CLICKED] = card_number;
    }
}

/*
    determineStartingPlayer()
    -------------------------
    Bepaal random (willekeurig) welke van de 2 spelers mag beginnen

    @return int Speler nummer (0 of 1)
 */
function determineStartingPlayer()
{
    return Math.round(Math.random());
}

/*
    showCurrentPlayer()
    -------------------
    Toont op het scherm welke speler aan de beurt is
 */
function showCurrentPlayer()
{
    if (huidige_speler === SPELER1) {
        naam_speler_1.style.color = "red";
        naam_speler_2.style.color = "black";
    } else if (huidige_speler === SPELER2) {
        naam_speler_1.style.color = "black";
        naam_speler_2.style.color = "red";
    } else {
        naam_speler_1.style.color = "black";
        naam_speler_2.style.color = "black";
    }
}

/*
    flipCard(carddiv)
    ---------------
    Draait kaart om van gegeven object carddiv. Als de kaart al is omgedraaid dan
    draaien we de kaart weer terug. Dit doen we met een CSS-class.
*/
function flipCard(card_index) 
{
    if(speelveld[card_index].classList.contains('flipped')) {
        speelveld[card_index].classList.remove('flipped');
        speelveld[card_index].children[CARD_FRONT].innerHTML = "";
    } else {
        speelveld[card_index].children[CARD_FRONT].innerHTML = getCardImageTag(card_index);
        speelveld[card_index].classList.add('flipped');
    }
}

/*
    showRoundScores()
    -----------------
    Add the round scores to the total and show them.
*/
function showRoundScores()
{
    score_speler_1.innerHTML = parseInt(score_speler_1.innerHTML) + 
                                ronde_scores[SPELER1];
    score_speler_2.innerHTML = parseInt(score_speler_2.innerHTML) +
                                ronde_scores[SPELER2];
}