const DICE_SIZE = 100;
const DOT_RADIUS = 0.1 * DICE_SIZE;
const AT_QUARTER = 0.25 * DICE_SIZE;
const AT_HALF = 0.5 * DICE_SIZE;
const AT_3QUARTER = 0.75 * DICE_SIZE;

const reEscalera = /12345|23456|13456/;
const reGenerala = /1{5}|2{5}|3{5}|4{5}|5{5}|6{5}/;
const rePoker = /1{4}(2|3|4|5|6)|12{4}|2{4}(3|4|5|6)|(1|2)3{4}|3{4}(4|5|6)|(1|2|3)4{4}|4{4}(5|6)|(1|2|3|4)5{4}|5{4}6|(1|2|3|4|5)6{4}/;
const reFull = /1{3}(2{2}|3{2}|4{2}|5{2}|6{2})|1{2}(2{3}|3{3}|4{3}|5{3}|6{3})|2{3}(3{2}|4{2}|5{2}|6{2})|2{2}(3{3}|4{3}|5{3}|6{3})|3{3}(4{2}|5{2}|6{2})|3{2}(4{3}|5{3}|6{3})|4{3}(5{2}|6{2})|4{2}(5{3}|6{3})|5{3}6{2}|5{2}6{3}/;

const game = {
  dices: [0, 0, 0, 0, 0,],
  selectedDices: [false, false, false, false, false],
  players: 2, //numero de jugadores
  turn: 1, //turno de los jugadores
  moves: 1, //tiro de los jugadores
}

const initGame = () => { //funcion para el click en los dados
  game.dices = [0, 0, 0, 0, 0];
  game.selectedDices = [false, false, false, false, false]; // segundo array lo inicializo todo en false
  game.turn = 1; //turno del jugador
  game.moves = 1; //arranca en el primer tiro

  document.querySelectorAll(".dice-container .dice").forEach(diceElement => { //div de cada dado
    diceElement.addEventListener("click", () => toggleDiceSelection(parseInt(diceElement.getAttribute("class").replace("dice d", "")))); //toggleDiceSelection es para invertir el true/false (si era false pone true)
  });
  
  drawDices(); // Dibuja los dados al iniciar
  drawState(); //actualiza el div con el jugador y el tiro 
}

const igGameMatch = regex => { //expresion regular como parametro
  return game.dices.slice().sort((d1, d2) => d1 - d2).join("").match(regex) !== null; //game.dices array //en d1 y d2 ordena de menor a mayor, //join lo convierte en un string con el separador vacio, //la funcion match devuelve la expresion logica, y si no matchea devuelve null
}

const drawDices = () => {
  game.dices.forEach((dice, i) => {
    const diceElement = document.querySelector(`.dice-container .dice.d${i}`);
    if (game.selectedDices[i]) { //otra vez tiene que estar el if, porque cuando se resetee, van a estar todos los dados en false y va a haber que sacarle las clases a todos
      diceElement.classList.add("selected");
    } else {
      diceElement.classList.remove("selected");
    }
    showDice(diceElement, dice); // Cambiado para mostrar el dado correcto
  });
}

const drawState = () => { //funcion para actualizar los datos
  document.getElementById("generala-player").innerHTML = game.turn; //actualiza el turno del jugador
  document.getElementById("generala-moves").innerHTML = game.moves; //actualiza el tiro del jugador
}

const rollDices = () => {
  for (let i = 0; i < game.dices.length; i++) {
    if (game.moves === 1 || game.selectedDices[i]) { //la condicion 1 es para que en el primer turno de c/jugador no se tenga que elegir ningun dado (puede tirar sin seleccionar nada) //si el dado esta seleccionado
      game.dices[i] = Math.floor(Math.random() * 6) + 1; //lo tiro
    }
  }
  game.selectedDices = [false, false, false, false, false] // cuando termine con todos los dados reseto la selección
  drawDices(); //vuelvo a dibujar

  game.moves++;
  if (game.moves > 3) { //si ya se terminan las jugadas vuelve a la primera en game.moves = 1
    game.moves = 1; //vuelve al primer tiro
    game.turn++;
    if (game.turn > game.players) { //si game.turn es mayor a game.playes
      game.turn = 1; //game.turn es igual a 1
    }
  }
  drawState(); //una  vez que cambio el turno, actualiza el estado de juego (div)
}

const toggleDiceSelection = diceNumber => { //recibe el nro de los div (0,1,2,3 o 4)
  game.selectedDices[diceNumber] = !game.selectedDices[diceNumber]; //en el array de selectedDices va a invertir el valor de lo que había en esa posición
  const diceElement = document.querySelector(`.dice-container .dice.d${diceNumber}`) //selecciona el dado que corresponde al número que se recibe (diceNumber)
  if (game.selectedDices[diceNumber]) { //si selectedDices[diceNumber] es true 
    diceElement.classList.add("selected"); // agrega esa clase para cambiar el estilo
  } else {
    diceElement.classList.remove("selected"); // si es false quita el estilo
  }
}

/* Draw dices code begins */
const drawDot = (ctx, x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, DOT_RADIUS, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#000000";
  ctx.fill();
  ctx.closePath();
}

const showDice = (contDiv, number) => {
  contDiv.innerHTML = null; // Limpia el contenido
  let canvas = document.createElement("canvas");
  canvas.setAttribute("width", "" + DICE_SIZE);
  canvas.setAttribute("height", "" + DICE_SIZE);
  drawDice(canvas, number);
  contDiv.appendChild(canvas);
}

const drawDice = (cont, number) => {
  let ctx = cont.getContext("2d");

  // Borro
  ctx.clearRect(0, 0, DICE_SIZE, DICE_SIZE);

  // Dado
  ctx.beginPath();
  ctx.rect(0, 0, DICE_SIZE, DICE_SIZE);
  ctx.fillStyle = "#ffffff";
  ctx.fill();
  ctx.closePath();

  switch (number) {
    case 1:
      drawDot(ctx, AT_HALF, AT_HALF);
      break;
    case 2:
      drawDot(ctx, AT_3QUARTER, AT_QUARTER);
      drawDot(ctx, AT_QUARTER, AT_3QUARTER);
      break;
    case 3:
      drawDot(ctx, AT_HALF, AT_HALF);
      drawDot(ctx, AT_3QUARTER, AT_QUARTER);
      drawDot(ctx, AT_QUARTER, AT_3QUARTER);
      break;
    case 4:
      drawDot(ctx, AT_3QUARTER, AT_QUARTER);
      drawDot(ctx, AT_QUARTER, AT_3QUARTER);
      drawDot(ctx, AT_QUARTER, AT_QUARTER);
      drawDot(ctx, AT_3QUARTER, AT_3QUARTER);
      break;
    case 5:
      drawDot(ctx, AT_HALF, AT_HALF);
      drawDot(ctx, AT_3QUARTER, AT_QUARTER);
      drawDot(ctx, AT_QUARTER, AT_3QUARTER);
      drawDot(ctx, AT_QUARTER, AT_QUARTER);
      drawDot(ctx, AT_3QUARTER, AT_3QUARTER);
      break;
    case 6:
      drawDot(ctx, AT_3QUARTER, AT_QUARTER);
      drawDot(ctx, AT_QUARTER, AT_3QUARTER);
      drawDot(ctx, AT_QUARTER, AT_QUARTER);
      drawDot(ctx, AT_3QUARTER, AT_3QUARTER);
      drawDot(ctx, AT_QUARTER, AT_HALF);
      drawDot(ctx, AT_3QUARTER, AT_HALF);
  }
}
/* Draw dices code ends */

document.getElementById("dice-roll").addEventListener("click", rollDices);

document.addEventListener("DOMContentLoaded", () => { initGame() });