var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/
$(document).ready(function (){
  MatchGame.renderCards(MatchGame.generateCardValues(), $("#game"));
});

/*
  Generates and returns an array of matching card values.
 */
MatchGame.generateCardValues = function () {
  var valueArray = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
  var nbValues = valueArray.length;
  var returnArray = [];
  var randomIndex;

  //console.debug("valueArray ==> " + valueArray);
  //console.debug("nbValues ==> " + nbValues);

  for (var i = 0; i < nbValues; i++){
    randomIndex = Math.floor(Math.random() * (nbValues - i));
    //console.debug("randomIndex ==> " + randomIndex);
    returnArray.push(valueArray[randomIndex]);
    valueArray.splice(randomIndex, 1);
  }

  console.debug("randomArray ==> " + returnArray);
  return returnArray;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/
MatchGame.renderCards = function(cardValues, $game) {
  var nbValues = cardValues.length;
  var cardColor = ['hsl(25, 85%, 65%)', 'hsl(55, 85%, 65%)', 'hsl(90, 85%, 65%)', 'hsl(160, 85%, 65%)', 'hsl(220, 85%, 65%)', 'hsl(265, 85%, 65%)', 'hsl(310, 85%, 65%)', 'hsl(360, 85%, 65%)']

  $game.empty();
  $game.data('flippedCards', {list: [ ]});

  for(var i = 0; i < nbValues; i++){
    var $card = $('<div class="card col-3"></div>');

    $card.data('value', cardValues[i]);
    $card.data('flipped', false);
    $card.data('color', cardColor[cardValues[i] - 1]);
    $game.append($card);
    //    console.debug("cardValue ==> " + cardValues[i]);
    //    console.debug("cardColor[n] ==> " + cardColor[cardValues[i] - 1]);
  }

  $(".card").click(function(){
    console.debug("PRÉ clickkk!!!");
    MatchGame.flipCard($(this), $game);
    console.debug("clickkk!!!");
  });
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
   //Est-ce que la carte est face contre terre
console.debug("flip_00");
console.debug("$game.data('flippedCards').list.length ==> " + $game.data('flippedCards').list.length)
  if ($game.data('flippedCards').list.length < 2) {
    if ($card.data('flipped') == false){
 console.debug("flip_01");
      //ajout de la classe pour la carte tournée
      $card.addClass('faceup');
      //Changer le couleur de fond ==> utilisation de l'attribut "data" de la carte
      $card.css('background-color', $card.data('color'));
      //Afficher le nombre
      $card.text($card.data('value'));
      //Mettre l'attribut «flipped» à «true»
      $card.data('flipped', true);
 console.debug("flip_02");
      $game.data('flippedCards').list.push($card);
      //S'il s'agit de la 2e carte tournée
      if ($game.data('flippedCards').list.length == 2) {
        console.debug("Hourra! 2 cartes");
        //Valider s'il y a correspondance entre les deux cartes retournées
        if ($game.data('flippedCards').list[0].data('value') == $game.data('flippedCards').list[1].data('value')){
          //Si oui, on grise les cartes
          $game.data('flippedCards').list[0].addClass('matched');
          $game.data('flippedCards').list[1].addClass('matched');
          $game.data('flippedCards').list[0].css('background-color', 'rgb(153, 153, 153)');
          $game.data('flippedCards').list[1].css('background-color', 'rgb(153, 153, 153)');

 console.debug("flip_03_2cartesPareils");
        }
      }
    }
  } else {
console.debug("flip_04_reinit");
    //Si non, on remet les paramètres par défaut de carte et on change l'attribut «flipped» à false
    //Réinitialisation 1ère carte
    console.debug("flip_05_reinit...wait...");
    setTimeout(MatchGame.reInit($card, $game), 1578);
console.debug("flip_06_reinit");
    $game.data('flippedCards').list = [];
    console.debug("reinit liste");
  }
};

MatchGame.reInit = function($card, $game){
  if ($game.data('flippedCards').list[0].hasClass('matched') == false){
    console.debug("flip_05_1_reinit...POSTwait...");
    $game.data('flippedCards').list[0].removeClass('faceup');
    $game.data('flippedCards').list[0].css('background-color', 'rgb(32, 64, 86)');
    $game.data('flippedCards').list[0].empty();
    $game.data('flippedCards').list[0].data('flipped', false);
    //Réinitialisation 2e carte
    $game.data('flippedCards').list[1].removeClass('faceup');
    $game.data('flippedCards').list[1].css('background-color', 'rgb(32, 64, 86)');
    $game.data('flippedCards').list[1].empty();
    $game.data('flippedCards').list[1].data('flipped', false);
  }
};
