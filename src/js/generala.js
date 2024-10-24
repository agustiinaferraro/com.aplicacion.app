let dices; 
let selectedDices; // segundo array

const DICE_SIZE = 100;
const DOT_RADIUS = 0.1 * DICE_SIZE;
const AT_QUARTER = 0.25 * DICE_SIZE;
const AT_HALF = 0.5 * DICE_SIZE;
const AT_3QUARTER = 0.75 * DICE_SIZE;

const initGame = () => { //funcion para el click en los dados
  dices = [0, 0, 0, 0, 0];
  selectedDices = [false, false, false, false, false]; // segundo array lo inicializo todo en false

  document.querySelectorAll(".dice-container .dice").forEach(diceElement => { //div de cada dado
    diceElement.addEventListener("click", () => toggleDiceSelection(parseInt(diceElement.getAttribute("class").replace("dice d", "")))); //toggleDiceSelection es para invertir el true/false (si era false pone true)
  });
  
  drawDices(); // Dibuja los dados al iniciar
}

const drawDices = () => {
  dices.forEach((dice, i) => {
    const diceElement = document.querySelector(`.dice-container .dice.d${i}`);
    if (selectedDices[i]) { //otra vez tiene que estar el if, porque cuando se resetee, van a estar todos los dados en false y va a haber que sacarle las clases a todos
      diceElement.classList.add("selected");
    } else {
      diceElement.classList.remove("selected");
    }
    showDice(diceElement, dice); // Cambiado para mostrar el dado correcto
  });
}

const rollDices = () => {
  for (let i = 0; i < dices.length; i++) {
    if (selectedDices[i]) { //si el dado está seleccionado
      dices[i] = Math.floor(Math.random() * 6) + 1; //lo tiro
    }
  }
  selectedDices = [false, false, false, false, false] // cuando termine con todos los dados reseto la selección
  drawDices(); //vuelvo a dibujar
}

const toggleDiceSelection = diceNumber => { //recibe el nro de los div (0,1,2,3 o 4)
  selectedDices[diceNumber] = !selectedDices[diceNumber]; //en el array de selectedDices va a invertir el valor de lo que había en esa posición
  const diceElement = document.querySelector(`.dice-container .dice.d${diceNumber}`) //selecciona el dado que corresponde al número que se recibe (diceNumber)
  if (selectedDices[diceNumber]) { //si selectedDices[diceNumber] es true 
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