var hariultuud = [
    'таслал', 
    'цоорхой',
    'сохор', 
    'хөлдөнө', 
    'дөрөв', 
    'о'
]

var answer = '';
var maxWrong = 6;
var mistakes = 0;
var guessed = [];
var wordStatus = null;
var asuultuud = ['Нар, сар, од гурвын дунд юу байдаг вэ?', 'Дүүргэж болдоггүй ямар сав байдаг вэ?', 'Ямар хүн толинд хардаггүй вэ?', 'Яарвал даарна яарахгүй бол яах вэ?', 'Нэг айлын гурван эрэгтэй хүүхэд бүр нэг эгчтэй. Энэ айл хэдэн хүүхэдтэй вэ?', 'Номын голд юу байдаг вэ'];
var Hint = '';

function randomWord() {
  var Random = Math.floor(Math.random() * hariultuud.length);
  answer = hariultuud[Random];
  Hint = asuultuud[Random];
}

function generateButtons() {
  // buttonsHTML ni tsagaan tolgoin usegnuud aguulsan husnegt baina.
  // split() ni temdegt moriig salgaad husnegtiin element tus burt ni hiij ogno. Splits a string into an array of substrings, and returns the array.
  // map() ni husnegtend baigaa elementiin toogoor davtalt hiine. Calls a function once for each element in an array.
  // join() ni returns an array as a string
  let buttonsHTML = 'абвгдеёжзийклмноөпрстуүфхцчшщъыьэюя'.split('').map(letter =>
    `
      <button class="keyboardButton" id='`+ letter+`' onClick="TaajBui('` + letter + `')">
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function TaajBui(chosenLetter) {
  if(guessed.indexOf(chosenLetter) == -1){
    guessed.push(chosenLetter);
  }
  else{
    null;
  }
  // guessed.indexOf(chosenLetter) == -1 ? guessed.push(chosenLetter) : null;
  document.getElementById(chosenLetter).setAttribute('disabled', true);

  if (answer.indexOf(chosenLetter) >= 0) {
    guessedWord();
    checkIfGameWon();
  } else if (answer.indexOf(chosenLetter) == -1) {
    mistakes++;
    updateMistakes();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './img2/' + mistakes + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus == answer) {
    document.getElementById('hangmanPic').src = './img2/' + 7 + '.jpg';
    document.getElementById('keyboard').innerHTML = 'You Won!!!';
  }
}

function checkIfGameLost() {
  if (mistakes == maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The answer was: ' + answer;
    document.getElementById('keyboard').innerHTML = 'You Lost!!!';
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(letter => (guessed.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateMistakes() {
  document.getElementById('mistakes').innerHTML = mistakes;
}
function giveHint(){
  document.getElementById('Hint').innerHTML = Hint;
}

function reset() {
  mistakes = 0;
  guessed = [];
  document.getElementById('hangmanPic').src = 'img2/0.jpg';

  randomWord();
  guessedWord();
  updateMistakes();
  generateButtons();
  giveHint();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
giveHint();
generateButtons();
guessedWord();