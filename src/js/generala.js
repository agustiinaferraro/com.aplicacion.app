const DICE_SIZE = 100;
const DOT_RADIUS = 0.1 * DICE_SIZE;
const AT_QUARTER = 0.25 * DICE_SIZE;
const AT_HALF = 0.5 * DICE_SIZE;
const AT_3QUARTER = 0.75 * DICE_SIZE;

//const porque a const no le puedo cambiar su valor, a let si
const reEscalera = /12345|23456|13456/;
const reGenerala = /1{5}|2{5}|3{5}|4{5}|5{5}|6{5}/;
const rePoker = /1{4}(2|3|4|5|6)|12{4}|2{4}(3|4|5|6)|(1|2)3{4}|3{4}(4|5|6)|(1|2|3)4{4}|4{4}(5|6)|(1|2|3|4)5{4}|5{4}6|(1|2|3|4|5)6{4}/;
const reFull = /1{3}(2{2}|3{2}|4{2}|5{2}|6{2})|1{2}(2{3}|3{3}|4{3}|5{3}|6{3})|2{3}(3{2}|4{2}|5{2}|6{2})|2{2}(3{3}|4{3}|5{3}|6{3})|3{3}(4{2}|5{2}|6{2})|3{2}(4{3}|5{3}|6{3})|4{3}(5{2}|6{2})|4{2}(5{3}|6{3})|5{3}6{2}|5{2}6{3}/;

const game = {
  dices: [0, 0, 0, 0, 0,],//valor inicial de los dados
  selectedDices: [false, false, false, false, false],//cuando les hago click se cambian a true para poder tirarse (en false cuando no estan seleccionados)
  players: 2, //numero de jugadores
  turn: 1, //turno de los jugadores
  moves: 1, //tiro de los jugadores
  scores: [], //array vacio donde se van a guardar los puntajes de los jugadores
  round: 1, //numero de ronda
}

const initGame = () => { //funcion para el click en los dados
  game.dices = [0, 0, 0, 0, 0];
  game.selectedDices = [false, false, false, false, false]; // segundo array lo inicializo todo en false
  game.turn = 1; //turno del jugador
  game.moves = 1; //arranca en el primer tiro
  for (let i = 0; i < game.players; i++) { //recorre el array players
    game.scores.push([" ", " ", " ", " ", " ", " ", " ", " ", " ", " ", " ", 0]);//espacios vacios si no jugue, y si jugue es un numero. El 0 es e total
  }

  document.querySelectorAll(".dice-container .dice").forEach(diceElement => { //div de cada dado
    diceElement.addEventListener("click", () => toggleDiceSelection(parseInt(diceElement.getAttribute("class").replace("dice d", "")))); //toggleDiceSelection es para invertir el true/false (si era false pone true)
  });
  
  drawDices(); //dibuja los dados al iniciar
  drawState(); //actualiza el div con el jugador y el tiro 
  drawScores();
}

const drawScores = () => {
  // encabezado tabla
  const contHeader = document.querySelector("#g2 .scores table thead tr"); //se lee desde tr
  contHeader.innerHTML = null;//se ingresa todo vacio para que despues se llene
  const cellGame = document.createElement("th");
  cellGame.innerHTML = "Juego";//le pone juego a la tabla
  contHeader.appendChild(cellGame);//le agrega juego al th (cabeza de la tabla) de la tabla
  for (let i = 0; i < game.players; i++) { 
    const cellPlayerName = document.createElement("th"); //el th crea dos elementos 
    cellPlayerName.innerHTML = `J${i + 1}`; // con el inner html le agrego el jugador al th (fila)
    contHeader.appendChild(cellPlayerName);//le agrega a contheader la fila que cree para cada jugador
  }

  // juegos
  const contGames = document.querySelector("#g2 .scores table tbody"); //lo mismo de recien pero para los juegos
  contGames.innerHTML = null; //empieza vacio
  for (let i = 0; i < 11; i++) { //recorre 11 posiciones, las de los juegos
    const contGame = document.createElement("tr"); //crea una fila
    const cellGameName = document.createElement("td"); //crea una celda
    cellGameName.innerHTML = getGameName(i); //crea las celdas y filas con el for
    contGame.appendChild(cellGameName); // le agrego la celda  a la fila
    for (let p = 0; p < game.players; p++) { // lo mismo pero para el score
      const cellPlayerScore = document.createElement("td"); //creo una celda
      cellPlayerScore.innerHTML = game.scores[p][i]; //game.scores dentro de la posicion p en la posicion i (pone una celda dentro de una fila)
      contGame.appendChild(cellPlayerScore); //agrega el score al contgame
    }
    contGames.appendChild(contGame); //se agrego el contGame al contGames
    contGame.addEventListener("click", () => {
      if (game.dices.some(dice => dice === 0)) { // si todavia no tire nada
          return; // ignoro el click
      }
     // console.info(`Attempt to score on game ${getGameName(i)}`);
    
      if (game.scores[game.turn - 1][i] !== " ") { //si ya esta anotado
        showModal("Este puntaje fue anotado"); //muestra el modal diciendo que ya esta anotado
        return;
      } else {
            //si no se anoto, muestra el modal de confirmacion
      showConfirmModal(i); 
      }
    });
  }

  // total
  const contTotal = document.createElement("tr");
  const cellTotalName = document.createElement("td");
  cellTotalName.innerHTML = "Total";
  contTotal.appendChild(cellTotalName);
  for (let p = 0; p < game.players; p++) {
    const cellPlayerTotal = document.createElement("td");
    cellPlayerTotal.innerHTML = game.scores[p][11];
    contTotal.appendChild(cellPlayerTotal);
  }
  contGames.appendChild(contTotal);
}

const isGameMatch = regex => { //expresion regular como parametro
  return game.dices.slice().sort((d1, d2) => d1 - d2).join("").match(regex) !== null; //game.dices array //en d1 y d2 ordena de menor a mayor, 
  //join lo convierte en un string con el separador vacio, //la funcion match devuelve la expresion logica, y si no matchea devuelve null
}

const calculateScore = whichGame => { //calcula los puntos
  let score = 0;
  switch (whichGame) { //el parametro es el indice de un array, arranca desde 0
    case 6: 
        if (isGameMatch(reEscalera)) { //si al primer tiro hace escalera, 
            score = game.moves === 2 ? 25 : 20; //son 25 puntos, si no es el primer tiro, son 20 (asi para todos los juegos)
        }
      break;
    case 7:
      if (isGameMatch(reFull)) {
        score = game.moves === 2 ? 35 : 30;
    }
      break;
    case 8:
      if (isGameMatch(rePoker)) {
        score = game.moves === 2 ? 45 : 40;
    }
      break;
    case 9:
      if (isGameMatch(reGenerala)) {
        score = game.moves === 2 ? 55 : 50;
    }
      break;
    case 10:
      if (isGameMatch(reGenerala)) {
        score = game.moves === 2 ? 105 : 100;
    }
      break;
      default: //clculo para numeros de 1 a 6
      //ajusta el filtro para que coincida correctamente con los dados
      score = game.dices
        .filter(dice => dice === whichGame + 1) //filtra los dados que son iguales al indice + 1
        .reduce((acc, cur) => acc + cur, 0); //uma los valores filtrados
      break; //reduce tiene dos parametros, acc: cuanto llevo acumulado. cur: valor actual del dado. 
      //Despues, suma el dado actual + lo que tenia antes, y arranco desde 0 
  }
  return score;
}

const drawDices = () => {
  game.dices.forEach((dice, i) => {
    const diceElement = document.querySelector(`.dice-container .dice.d${i}`);
    if (game.selectedDices[i]) { //otra vez tiene que estar el if, porque cuando se resetee, van a estar todos los dados en false 
      //y va a haber que sacarle las clases a todos
      diceElement.classList.add("selected");
    } else {
      diceElement.classList.remove("selected");
    }
    showDice(diceElement, dice); // muestra el dado correcto
  });
}

const drawState = () => { //funcion para actualizar los datos
  document.getElementById("generala-player").innerHTML = game.turn; //actualiza el turno del jugador
  document.getElementById("generala-moves").innerHTML = game.moves; //actualiza el tiro del jugador
}

const rollDices = () => {
  for (let i = 0; i < game.dices.length; i++) {
    if (game.moves === 1 || game.selectedDices[i]) { //la condicion 1 es para que en el primer turno de c/jugador no se tenga que elegir 
      //ningun dado (puede tirar sin seleccionar nada) //si el dado esta seleccionado
      game.dices[i] = Math.floor(Math.random() * 6) + 1; //lo tiro
    }
  }
  game.selectedDices = [false, false, false, false, false] // cuando termine con todos los dados reseto la seleccion
  drawDices(); //vuelvo a dibujar

  //console.log('---'); //en la consola dice como quedaron los dados despues del tiro, cuales son los potenciales puntajes para ese dado
  //[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach(whichGame => console.log(`Game ${getGameName(whichGame)} score: ${calculateScore(whichGame)}`));

  game.moves++;
  if (game.moves > 3) { //si ya se terminan las jugadas vuelve a la primera en game.moves = 1
      document.getElementById("dice-roll").setAttribute("disabled", "disabled");
   // game.turn++;
  } else {
    drawState(); //una  vez que cambio el turno, actualiza el estado de juego (div)
  }
}

const getGameName = whichGame => {
  const games = ['1', '2', '3', '4', '5', '6', 'E', 'F', 'P', 'G', 'D'];
  return games[whichGame];
}

const changePlayerTurn = () => {
  game.dices = [0, 0, 0, 0, 0,];
  game.selectedDices = [false, false, false, false, false];
  game.moves = 1;
  game.turn++
  if (game.turn > game.players) {
    game.turn = 1;
    game.round++;
    if (game.round > 11) { //si las rondas son mayores a 11
      gameOver(); //llama a la funcion para terminar el juego
    }
  }

  //deshabilitar el boton de volver atrás cuando se empieza el turno
  document.getElementById("btn-g2-back").setAttribute("disabled", "disabled");

  document.getElementById("dice-roll").removeAttribute("disabled");
  drawDices();
  drawState();
}

const toggleDiceSelection = diceNumber => { //recibe el nro de los div (0,1,2,3 o 4)
  game.selectedDices[diceNumber] = !game.selectedDices[diceNumber]; //en el array de selectedDices 
  //va a invertir el valor de lo que habia en esa posicion
  const diceElement = document.querySelector(`.dice-container .dice.d${diceNumber}`) //selecciona el dado que corresponde 
  //al nro que se recibe (diceNumber)
  if (game.selectedDices[diceNumber]) { //si selectedDices[diceNumber] es true 
    diceElement.classList.add("selected"); // agrega esa clase para cambiar el estilo
  } else {
    diceElement.classList.remove("selected"); // si es false quita el estilo
  }
}

const gameOver = () => {
  document.getElementById("dice-roll").setAttribute("disabled", "disabled");
  let winner = 0;
  let winningScore = 0;
  for (let i = 0; i< game.players; i++) {
    if (game.scores[i][11] > winningScore) {
      winningScore = game.scores[i][11];
      winner = i;
    }
  }
  showModal(`J${winner} won with ${winningScore} points`); 
  document.getElementById("btn-g2-back").removeAttribute("disabled");
}


const showConfirmModal = (gameIndex) => {
  const confirmModal = document.getElementById("confirm-modal");
  const confirmMessage = document.getElementById("confirm-message");
  const modalConfirmBtn = document.getElementById("modal-confirm-btn");
  const modalCancelBtn = document.getElementById("modal-cancel-btn");

  //cambia el mensaje del modal segun el juego
  confirmMessage.innerText = `¿Estás seguro de tachar o asignar el puntaje en el juego ${getGameName(gameIndex)}?`;

  confirmModal.style.display = "flex";  // muestra el modal

  modalConfirmBtn.onclick = () => { //cuando el usuario confirma
    const score = calculateScore(gameIndex); //calcula el puntaje para este juego

    game.scores[game.turn - 1][gameIndex] = score === 0 ? "X" : score; //asigna el puntaje o una "X" si el puntaje es 0

    if (score > 0) {  //actualiza el puntaje total del jugador si no es un tachado
      game.scores[game.turn - 1][11] += score;
    }

    drawScores(); //redibuja la tabla con los puntajes actualizados

    changePlayerTurn(); //cambia el turno 

    confirmModal.style.display = "none"; //cierra el modal
  };

  modalCancelBtn.onclick = () => {//cuando el usuario cancela
    confirmModal.style.display = "none"; //cierra el modal si se cancela
  };

  
  window.onclick = (event) => {
    if (event.target === confirmModal) {
      confirmModal.style.display = "none"; //cierra modal si el usuario hace click fuera del modal
    }
  };
};



const showModal = (message) => {
  const modal = document.getElementById("alert-modal");
  const modalMessage = document.getElementById("modal-message");
  const closeButton = document.getElementById("modal-close-btn");

  modalMessage.innerText = message; //actualiza el mensaje
  modal.style.display = "block"; // muestra el modal

  closeButton.onclick = () => {//cuando hace click en el boton de cerrar
    modal.style.display = "none"; //oculta el modal
  };

  window.onclick = (event) => {  //cuando hace click fuera del modal, lo cierra
    if (event.target === modal) {
      modal.style.display = "none";
    }
  };
};






/* Draw dices code begins */
const drawDot = (ctx, x, y) => {
  ctx.beginPath();
  ctx.arc(x, y, DOT_RADIUS, 0, 2 * Math.PI, false);
  ctx.fillStyle = "#262A22";
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
  ctx.fillStyle = "#ecf0f1";
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

//para cerrar el modal cuando se haga clic en el boton de "Aceptar"
document.getElementById("modal-accept-btn").addEventListener("click", () => {
  document.getElementById("alert-modal").style.display = "none";
});


document.getElementById("dice-roll").addEventListener("click", rollDices);

document.addEventListener("DOMContentLoaded", () => { initGame() });