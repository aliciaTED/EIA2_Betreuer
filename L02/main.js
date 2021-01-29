"use strict";
var Miniuno;
(function (Miniuno) {
    // Variablen & Arrays zum Spiel
    let drawPile = []; // Ziehstapel/Kartenstapel
    let discardPile = []; // Ablagestapel
    let computerHand = []; // Hand des Computers
    let playerHand = []; // Hand des Spielers
    let topCard; // oberste Karte auf dem discardPile(Ablagestapel)
    window.onload = function () {
        startGame();
        //document.getElementById("start").addEventListener("click", startGame, false); // Klick auf den Start-Button soll Spiel beginnen und Karten sichtbar machen
        console.log("Spiel kann gestartet werden.");
    };
    // Funktion zum Starten des Spiels, d.h. Karten mischen und an beide Spieler aufteilen, sowie 1. Karte auf Ablagestapel legen
    function startGame() {
        let handCards = prompt("Wie viele Karten sollen gespielt werden?", "");
        clearAllHTML();
        generatePiles(); // alle Karten generieren
        shufflePile(drawPile); // Kartenstapel mischen
        dealCards(handCards); // Karten verteilen
        updateHTML(); // damit werden auch die Karten für die einzelnen Piles genereriert und angezeigt
    }
    function generatePiles() {
        let generatedCardNumber; // Variable zum Erstellen der Kartennummer/-zahl
        let generatedCardColor; // Variable zum Erstellen der Kartenfarbe
        // Farbe der Karte bestimmen, 4 verschiedene Fälle bzw. Bedingungen möglich --> 1 Bedingung pro Farbe
        for (let j = 0; j < 4; j++) {
            if (j == 0) {
                generatedCardColor = "redCard"; // Zugriff auf Klasse "redCard" 
            }
            else if (j == 1) {
                generatedCardColor = "blueCard"; // Zugriff auf Klasse "blueCard"
            }
            else if (j == 2) {
                generatedCardColor = "greenCard"; // Zugriff auf Klasse "greenCard"
            }
            else if (j == 3) {
                generatedCardColor = "yellowCard"; // Zugriff auf Klasse "yellowCard"
            }
            // Wertigkeit der Karte bestimmen
            for (let i = 1; i <= 9; i++) {
                generatedCardNumber = i; // höchste Nummer soll bei 9 sein
                let generatedCard = {
                    cardNumber: generatedCardNumber,
                    cardColor: generatedCardColor
                };
                drawPile.push(generatedCard); // alles muss dem Kartenstapel (drawPile) hinzugefügt werden
            }
        }
        console.log("Karten wurden erstellt und in den Stapel eingefügt.");
    }
    function shufflePile(pile) {
        let m = pile.length, t, i;
        while (m) { // ungemischte Karten als Abbruchskriterium
            i = Math.floor(Math.random() * m--); // Zugriff auf zufällige Karte
            // zufällige Karte tauschen --> mischen
            t = pile[m];
            pile[m] = pile[i];
            pile[i] = t;
        }
        console.log("Karten wurden gemischt.");
        return pile;
    }
    function dealCards(_handCards) {
        for (let i = 0; i < _handCards; i++) {
            computerHand.push(drawPile[0]);
            drawPile.splice(0, 1);
            playerHand.push(drawPile[0]);
            drawPile.splice(0, 1);
            // push fügt Karten dem "Handarray" hinzu und splice löscht ausgeteilte Karten aus dem Kartenstapel (drawPile); i bestimmt Anzahl der Karten --> 7 Karten pro Hand
        }
        // eine Karte soll auf dem Ablagestapel angezeigt werden, damit das Spiel begonnen werden kann
        discardPile.push(drawPile[0]);
        drawPile.splice(0, 1);
        // Consolelogs zur Überprüfung
        console.log(computerHand);
        console.log(discardPile);
        console.log(drawPile);
        console.log(playerHand);
        console.log("Alle Karten wurden verteilt.");
    }
    function updateHTML() {
        clearAllHTML();
        generateHTML();
    }
    function generateHTML() {
        for (let i = 0; i < playerHand.length; i++) { // mehrere Handkarten erstellen
            generatePlayerHand(i);
        }
        for (let i = 0; i < computerHand.length; i++) { // mehrere Computerkarten erstellen
            generateComputerHand(i);
        }
        generateDiscardPile(); // Ablagestapel soll erstellt, aber nur mit einer Karte angezeigt werden, daher keine Schleife
        generateDrawPile(); // Kartenstapel zum Ziehen soll erstellt, aber nur mit einer Karte angezeigt werden, daher keine Schleife
    }
    // Funktionen zum Erzeugen der HTML-Elemente (d.h. <div>, die mit CSS zu Karten gestyled wurden; Verwendung von AppendChild hilfreich, Aufruf durch updateHTML()
    function generatePlayerHand(numberOfCard) {
        let holdingDivPlayer = document.createElement("div"); // div mithilfe von CSS gestyled stellt jede Karte dar
        holdingDivPlayer.setAttribute("id", "player" + (numberOfCard + 1)); // Zugriff auf Player-Section, in der div erstellt werden soll
        holdingDivPlayer.setAttribute("class", playerHand[numberOfCard].cardColor); // Zugriff auf Farbklasse inkl. generelles Styling einer Karte
        holdingDivPlayer.addEventListener("click", function () { playCard(numberOfCard); }, false); // Funktion playCard() wird aufgerufen, Parameter (Kartenzahl) kann eingesetzt werden
        document.getElementById("player").appendChild(holdingDivPlayer); // erstellte Karte wird zur Player-Section hinzugefügt (Zugriff über ID)
        // Festlegung der Wertigkeit/Zahl der Karte
        let newCardNumber = document.createElement("p"); // Zahl wird innerhalb eines <p> erstellt
        newCardNumber.innerHTML = playerHand[numberOfCard].cardNumber + ""; // Zugriff auf Wertigkeit bzw. Zahl, die in HTML eingefügt werden soll
        newCardNumber.setAttribute("class", "cardNumber"); // Zugriff auf Klasse bzw. Styling der Zahl
        holdingDivPlayer.appendChild(newCardNumber); // Zahl wird zur Player-Section hinzugefügt
    }
    function generateComputerHand(numberOfCard) {
        let holdingDivComputer = document.createElement("div");
        holdingDivComputer.setAttribute("id", "computer" + (numberOfCard + 1));
        holdingDivComputer.setAttribute("class", "hiddenCard"); // soll verdeckt angezeigt werden --> hiddenCard
        document.getElementById("computer").appendChild(holdingDivComputer);
        // Überprüfen der Computer-Hand, bis Code vollständig
        /* let newCardNumber : HTMLElement = document.createElement("p");
          newCardNumber.innerHTML = computerHand[numberOfCard].cardNumber + "";
          newCardNumber.setAttribute("class", "cardNumber");
          holdingDivComputer.appendChild(newCardNumber);*/
    }
    function generateDrawPile() {
        let holdingDivDraw = document.createElement("div");
        holdingDivDraw.setAttribute("id", "draw");
        holdingDivDraw.setAttribute("class", "hiddenCard");
        holdingDivDraw.addEventListener("click", drawCard, false);
        document.getElementById("drawPile").appendChild(holdingDivDraw); // Karte soll genau auf gepunkteter Fläche erscheinen, daher Zugriff auf #drawPile
    }
    function generateDiscardPile() {
        let holdingDivDiscard = document.createElement("div");
        holdingDivDiscard.setAttribute("id", "discard");
        holdingDivDiscard.setAttribute("class", discardPile[discardPile.length - 1].cardColor);
        document.getElementById("discardPile").appendChild(holdingDivDiscard); // Karte soll genau auf gepunkteter Fläche erscheinen --> #discardPile
        // Festlegung der Wertigkeit/Zahl der Karte
        let newCardNumber = document.createElement("p");
        newCardNumber.innerHTML = discardPile[discardPile.length - 1].cardNumber + "";
        newCardNumber.setAttribute("class", "cardNumber");
        holdingDivDiscard.appendChild(newCardNumber);
    }
    function playCard(nrOfcardPlayed) {
        topCard = discardPile[discardPile.length - 1];
        let playedCard = playerHand[nrOfcardPlayed];
        if (topCard.cardColor == playedCard.cardColor || topCard.cardNumber == playedCard.cardNumber) { // überprüfen, ob Karte auf discardPile abgelegt werden darf --> entweder gleiche Farbe ODER gleiche Zahl ODER beides
            discardPile.push(playedCard); // gespielte Karte zum Ablagestapel hinzufügen
            topCard = playedCard;
            console.log(topCard);
            playerHand.splice(nrOfcardPlayed, 1); // gespielte Karte aus der Spielerhand entfernen
            updateHTML();
            console.log(playerHand);
            console.log(discardPile);
            console.log("Spieler hat eine Karte abgelegt.");
            if (playerHand.length == 0) {
                endGame(); // Funktion, die über Gewinn entscheiden bzw. diesen überprüft
            }
            else {
                setTimeout(computerPlaysCard, 450);
            } // nach kurzer Verzögerung wird Funktion für Gegnerzug aufgerufen/ausgeführt
        }
        else {
            alert("Diese Karte kann nicht abgelegt werden. Du musst ziehen oder eine andere Karte legen.");
            console.log("Karte kann nicht abgelegt werden. Spieler zieht & Computer ist dran.");
        }
    }
    function computerPlaysCard() {
        let playedCard = false; // Konnte Computer eine Karte legen? Ja --> true; nein --> false
        let topCard = discardPile[discardPile.length - 1];
        for (let i = 0; i < computerHand.length; i++) {
            if (computerHand[i].cardColor == topCard.cardColor || computerHand[i].cardNumber == topCard.cardNumber) { // Computer kann Karte legen, wenn Farbe oder Kartenzahl übereinstimmen
                topCard = computerHand[i];
                discardPile.push(topCard);
                computerHand.splice(i, 1);
                setTimeout(function () { updateHTML(); }, 500);
                if (computerHand.length == 0) { // überprüfen, ob Computer gewonnen hat, d.h. keine Karten mehr auf der Hand
                    endGame();
                }
                else {
                    playedCard = true; // Karte konnte gelegt werden (true)
                }
                break;
            }
        }
        if (playedCard == false) { // keine Karte aus der Computerhand kann abgelegt werden (false), d.h. Computer muss eine Karte ziehen
            let drawnCard = drawPile[drawPile.length - 1];
            computerHand.push(drawnCard);
            drawPile.splice(drawPile.length - 1, 1);
            setTimeout(function () { updateHTML(); }, 450);
            console.log("Computer hat eine Karte gezogen. (" + drawnCard.cardNumber + " " + drawnCard.cardColor + ")");
        }
    }
    function drawCard() {
        let drawnCard = drawPile[drawPile.length - 1];
        playerHand.push(drawnCard);
        drawPile.splice(drawPile.length - 1, 1);
        updateHTML();
        console.log("Der Spieler hat eine Karte gezogen. (" + drawnCard.cardNumber + " " + drawnCard.cardColor + ")");
        console.log(playerHand);
        console.log(drawPile);
        computerPlaysCard();
    }
    function clearAllHTML() {
        clearHTML();
    }
    function clearHTML() {
        // Computerkarten leeren
        let computerHandHTML = document.getElementById("computer");
        while (computerHandHTML.hasChildNodes()) {
            computerHandHTML.removeChild(computerHandHTML.firstChild);
        }
        // Playerkarten leeren
        let playerHandHTML = document.getElementById("player");
        while (playerHandHTML.hasChildNodes()) {
            playerHandHTML.removeChild(playerHandHTML.firstChild);
        }
        // Kartenstapel leeren
        let drawPileHTML = document.getElementById("drawPile");
        while (drawPileHTML.hasChildNodes()) {
            drawPileHTML.removeChild(drawPileHTML.firstChild);
        }
        // Ablagestapel leeren
        let discardPileHTML = document.getElementById("discardPile");
        while (discardPileHTML.hasChildNodes()) {
            discardPileHTML.removeChild(discardPileHTML.firstChild);
        }
    }
    function endGame() {
        if (playerHand.length == 0) {
            alert("Du hast gewonnen!");
        }
        else if (computerHand.length == 0) {
            alert("Du hast verloren!");
        }
    }
})(Miniuno || (Miniuno = {}));
//# sourceMappingURL=main.js.map