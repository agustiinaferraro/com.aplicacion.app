var estadoJuego = ["", "", "", "", "", "", "", "", ""]; // array con 9 posiciones vacias para el tablero


var celdas = document.querySelectorAll('.celda'); //selecciona todas las celdas del tablero con la clase 'celda'

var estadoDisplay = document.getElementById('estado'); // selecciona el h2 con id estado


var botonReiniciar = document.getElementById('botonReiniciar'); //selecciona el boton de reinicio

var juegoActivo = true; //indica si el juego esta activo

var jugadorActual = '♥️'; //empieza corazon


estadoDisplay.textContent = `Turno de: ${jugadorActual}`; //muestra el turno del jugador actual (al principio no aparecia)


function manejarCeldaClic(eventoCelda) {// funcion que se llama cuando se hace click en una celda

    var celdaClicada = eventoCelda.target;  // con target se obtiene la celda en la que se hace click

    var indiceCeldaClicada = parseInt(celdaClicada.getAttribute('data-index')); //obtiene el valor de data-index

    if (estadoJuego[indiceCeldaClicada] !== "" || !juegoActivo) { //verifica si la celda esta ocupada o el juego no esta activo

        return; //no hace nada si la celda ya esta ocupada o el juego termino
    }

    //marcar la celda con el simbolo del jugador actual
    estadoJuego[indiceCeldaClicada] = jugadorActual; //actualiza el array con el simbolo del jugador
    celdaClicada.textContent = jugadorActual; //muestra el simbolo en la celda
    celdaClicada.classList.add('desactivado'); //desactiva la celda para que no se pueda hacer click

    //asigna la clase segun el jugador actual para cambiar el color
    if (jugadorActual === '♥️') {
            celdaClicada.classList.add('corazon');
        } else {
            celdaClicada.classList.add('estrella');
    }

    validarResultado(); // verificar si hay un ganador o empate
}

function validarResultado() { //funcion para verificar el resultado del juego
    var combinacionesGanadoras = [ //combinaciones ganadoras posibles
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
    for (var i = 0; i < combinacionesGanadoras.length; i++) {
        // obtiene los indices de una combinacion ganadora
        var a = combinacionesGanadoras[i][0];
        var b = combinacionesGanadoras[i][1];
        var c = combinacionesGanadoras[i][2];

        // verifica si todos los indices tienen el mismo simbolo
        if (estadoJuego[a] && estadoJuego[a] === estadoJuego[b] && estadoJuego[a] === estadoJuego[c]) {
            var colorGanador = jugadorActual === '♥️' ? 'lightgreen' : 'lightblue';

            //resalta las celdas ganadoras
            celdas[a].style.backgroundColor = colorGanador;
            celdas[b].style.backgroundColor = colorGanador;
            celdas[c].style.backgroundColor = colorGanador;
            estadoDisplay.textContent = `¡Ganador: ${jugadorActual}!`; // muestra el ganador
            terminarJuego(); // termina el juego
            return; // sale de la funcion
        }
    }

    // verifica si hay empate
    var esEmpate = true; // supone que es empate

    //comprueba si todas las celdas estan ocupadas
    for (var i = 0; esEmpate && i < estadoJuego.length; i++) {
        if (estadoJuego[i] === "") { // si hay una celda vacia
            esEmpate = false; //no es empate, todavia hay espacio
        }
    }

    if (esEmpate) {
        estadoDisplay.textContent = "¡Empate!"; //mostrar el empate
        terminarJuego(); //termina el juego
    } else {
        //cambiar el turno del jugador si el juego sigue activo
        jugadorActual = (jugadorActual === '♥️') ? '⭐' : '♥️'; //cambia el jugador
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
}

//funcion para reiniciar el juego
function reiniciarJuego() {
    juegoActivo = true; //reactivar el juego
    jugadorActual = (Math.random() < 0.5) ? '♥️' : '⭐'; // selecciona al azar entre corazon y estrella
    estadoJuego = ["", "", "", "", "", "", "", "", ""]; //limpia el tablero
    estadoDisplay.textContent = `Turno de: ${jugadorActual}`; //muestra el turno del nuevo jugador
    celdas.forEach(function(celda) {
        celda.textContent = ""; //limpia el contenido de la celda
        celda.classList.remove('desactivado', 'corazon', 'estrella'); //reactiva las celdas
        celda.style.backgroundColor = ''; //quita el color de fondo
    });
    botonReiniciar.disabled = true; //desactiva el boton de reinicio
}

//asigna eventos a las celdas y al boton de reinicio
celdas.forEach(function(celda) {
    celda.addEventListener('click', manejarCeldaClic); // asigna click a cada celda
});
botonReiniciar.addEventListener('click', reiniciarJuego); //asigna click al boton de reinicio

//selecciona todas las celdas con la clase celda y las recorre una por una
document.querySelectorAll('.celda').forEach(celda => {
    
    // a cada celda le agrega un eventlistener para detectar cuando se haga click
    celda.addEventListener('click', function() {
        
        //si la celda tiene la data corazon
        if (celda.dataset.type === 'corazon') {
            // Agrega la clase corazon a la celda, (y le cambia el color en el css)
            celda.classList.add('corazon'); 
        } 
        // si tiene data estrella 
        else if (celda.dataset.type === 'estrella') {
            // lo mismo
            celda.classList.add('estrella'); 
        }
    });
});
