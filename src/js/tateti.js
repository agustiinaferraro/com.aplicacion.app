let estadoJuego = ["", "", "", "", "", "", "", "", ""]; // array con 9 posiciones vacias para el tablero
const celdas = document.querySelectorAll('.celda'); //selecciona todas las celdas del tablero con la clase 'celda'
const estadoDisplay = document.getElementById('estado'); // selecciona el h2 con id estado
const botonReiniciar = document.getElementById('botonReiniciar'); //selecciona el boton de reinicio
const botonBack = document.getElementById('btn-g1-back'); //selecciona el boton de volver atrás

let juegoActivo = true; //indica si el juego esta activo
let jugadorActual = '♥️'; //empieza corazon


estadoDisplay.textContent = `Turno de: ${jugadorActual}`; //muestra el turno del jugador actual (al principio no aparecia)


function manejarCeldaClic(eventoCelda) {// funcion que se llama cuando se hace click en una celda

    const celdaClicada = eventoCelda.target;  // con target se obtiene la celda en la que se hace click

    const indiceCeldaClicada = parseInt(celdaClicada.getAttribute('data-index')); //obtiene el valor de data-index

    if (estadoJuego[indiceCeldaClicada] !== "" || !juegoActivo) { //verifica si la celda esta ocupada o el juego no esta activo

        return; //no hace nada si la celda ya esta ocupada o el juego termino
    }

    //marca la celda con el simbolo del jugador actual
    estadoJuego[indiceCeldaClicada] = jugadorActual; //actualiza el array con el simbolo del jugador
    celdaClicada.textContent = jugadorActual; //muestra el simbolo en la celda
    celdaClicada.classList.add('desactivado'); //desactiva la celda para que no se pueda hacer click

    //asigna la clase segun el jugador actual para cambiar el color
    if (jugadorActual === '♥️') {
            celdaClicada.classList.add('corazon');
        } else {
            celdaClicada.classList.add('estrella');
    }

    //botonBack.disabled = true;

    validarResultado(); // verifica si hay un ganador o empate
}

function validarResultado() { //funcion para verificar el resultado del juego
    const combinacionesGanadoras = [ //combinaciones ganadoras posibles
        [0, 1, 2], // fila superior
        [3, 4, 5], //fila del medio
        [6, 7, 8], //fila inferior
        [0, 3, 6], // columna izquierda
        [1, 4, 7], //columna central
        [2, 5, 8], // columna derecha
        [0, 4, 8], // diagonal principal
        [2, 4, 6]  //diagonal secundaria
    ];

    //verifica cada combinacion ganadora
    for (let i = 0; i < combinacionesGanadoras.length; i++) {
        // obtiene los indices de una combinacion ganadora
        const a = combinacionesGanadoras[i][0];
        const b = combinacionesGanadoras[i][1];
        const c = combinacionesGanadoras[i][2];

        // verifica si todos los indices tienen el mismo simbolo
        if (estadoJuego[a] && estadoJuego[a] === estadoJuego[b] && estadoJuego[a] === estadoJuego[c]) {
            const colorGanador = jugadorActual === '♥️'
            ? 'linear-gradient(to top, #556B2F, #6B8E23)'  // para cora
            : 'linear-gradient(to top, #F08113, #f9a345)'; // para estrella

            //resalta las celdas ganadoras
            celdas[a].style.background = colorGanador;
            celdas[b].style.background = colorGanador;
            celdas[c].style.background = colorGanador;

            estadoDisplay.textContent = `¡Ganador: ${jugadorActual}!`; // muestra el ganador
            terminarJuego(); // termina el juego
            return; // sale de la funcion
        }
    }

    // verifica si hay empate
    let esEmpate = true; // supone que es empate

    //comprueba si todas las celdas estan ocupadas
    for (let i = 0; esEmpate && i < estadoJuego.length; i++) {
        if (estadoJuego[i] === "") { // si hay una celda vacia
            esEmpate = false; //no es empate, todavia hay espacio
        }
    }

    if (esEmpate) {
        estadoDisplay.textContent = "¡Empate!"; //mostrar el empate
        terminarJuego(); //termina el juego
    } else {
        //cambiar el turno del jugador si el juego sigue activo
        jugadorActual = (jugadorActual === '♥️') ? '★' : '♥️'; //cambia el jugador
        estadoDisplay.textContent = `Turno de: ${jugadorActual}`; //actualiza el mensaje de estado
    }
}

//funcion para terminar el juego
function terminarJuego() {
    juegoActivo = false; //desactiva el juego
    botonReiniciar.disabled = false; //habilita el boton de reinicio
    celdas.forEach(function(celda) {
    celda.classList.add('desactivado'); //desactiva todas las celdas

    });

    //botonBack.disabled = false;
}

function reiniciarJuego() {
    //limpia el tablero
    estadoJuego = ["", "", "", "", "", "", "", "", ""]; 
    juegoActivo = true; // Reactivar el juego
    jugadorActual = (Math.random() < 0.5) ? '♥️' : '★'; //selecciona al azar entre corazon y estrella
    estadoDisplay.textContent = `Turno de: ${jugadorActual}`; // muestra el turno del jugador actual

    // limpia las celdas
    celdas.forEach(function(celda) {
        celda.textContent = ""; //limpia el contenido de la celda
        celda.classList.remove('desactivado', 'corazon', 'estrella'); //reactiva las celdas
        celda.style.background = ''; // saca el color de fondo
    });

    //vuelve a asignar el evento de click en las celdas
    celdas.forEach(function(celda) {
        celda.addEventListener('click', manejarCeldaClic); //asigna nuevamente el evento de click
    });

    //control de botones
   // botonBack.disabled = false; 
    botonReiniciar.disabled = true;
}

//asigna eventos a las celdas y al boton de reinicio
celdas.forEach(function(celda) {
    celda.addEventListener('click', manejarCeldaClic); // asigna el evento click a cada celda
});
botonReiniciar.addEventListener('click', reiniciarJuego); // asigna el evento click al boton de reinicio



