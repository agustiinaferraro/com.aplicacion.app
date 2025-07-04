const myGamesEl = document.getElementById("mygames");
const mainEl = document.getElementById("main");
const g3 = document.getElementById("g3");
const btnBack = document.getElementById("btn-g3-back");
const estadoTrivia = document.getElementById("estado-trivia");
const contenedorTrivia = document.getElementById("trivia-g3");

let nombres = ["", ""];
let jugadorActual = 0;
let rondaActual = 0;
let preguntasJugador = [[], []];
let respuestasJugador = [[], []];

const preguntasBiblia = [
  { pregunta: "¿Quién fue tragado por un gran pez?", opciones: ["Jonás", "Pedro", "Pablo", "José"], respuestaCorrecta: 0, versiculo: "Jonás 2:1 - Entonces Jonás oró al Señor su Dios desde el vientre del pez." },
  { pregunta: "¿Cuál fue el primer milagro de Jesús?", opciones: ["Sanar un ciego", "Multiplicar panes", "Caminar sobre el agua", "Convertir agua en vino"], respuestaCorrecta: 3, versiculo: "Juan 2:1-11 - Jesús convirtió el agua en vino en las bodas de Caná." },
  { pregunta: "¿Qué apóstol negó a Jesús tres veces?", opciones: ["Pedro", "Juan", "Tomás", "Andrés"], respuestaCorrecta: 0, versiculo: "Mateo 26:69-75 - Pedro negó a Jesús tres veces antes del gallo cantar." },
  { pregunta: "¿Dónde nació Jesús?", opciones: ["Nazaret", "Jerusalén", "Belén", "Egipto"], respuestaCorrecta: 2, versiculo: "Mateo 2:1 - Jesús nació en Belén de Judea." },
  { pregunta: "¿Quién construyó el arca?", opciones: ["Abraham", "Moisés", "Noé", "David"], respuestaCorrecta: 2, versiculo: "Génesis 6:14 - Hazte un arca de madera de gofer." },
  { pregunta: "¿Qué cayó del cielo para alimentar a los israelitas?", opciones: ["Pan", "Maná", "Fruta", "Agua"], respuestaCorrecta: 1, versiculo: "Éxodo 16:15 - Era maná lo que comieron los israelitas." },
  { pregunta: "¿Quién fue el primer hombre creado?", opciones: ["Adán", "Noé", "Caín", "Abel"], respuestaCorrecta: 0, versiculo: "Génesis 2:7 - Dios formó al hombre del polvo de la tierra." },
  { pregunta: "¿Cuántos libros tiene la Biblia?", opciones: ["66", "72", "70", "80"], respuestaCorrecta: 0, versiculo: "La Biblia tiene 66 libros: 39 en el Antiguo Testamento y 27 en el Nuevo." },
  { pregunta: "¿Qué hizo Moisés con el Mar Rojo?", opciones: ["Lo cruzó caminando", "Lo navegó", "Lo partió", "Lo secó"], respuestaCorrecta: 2, versiculo: "Éxodo 14:21 - Moisés extendió su mano sobre el mar, y lo dividió." },
  { pregunta: "¿Qué instrumento tocaba David?", opciones: ["Arpa", "Flauta", "Trompeta", "Tambor"], respuestaCorrecta: 0, versiculo: "1 Samuel 16:23 - David tomaba el arpa y tocaba con su mano." },
  { pregunta: "¿Quién traicionó a Jesús?", opciones: ["Pedro", "Judas", "Tomás", "Mateo"], respuestaCorrecta: 1, versiculo: "Mateo 26:48-50 - Judas entregó a Jesús con un beso." },
  { pregunta: "¿Qué día resucitó Jesús?", opciones: ["Sábado", "Domingo", "Viernes", "Lunes"], respuestaCorrecta: 1, versiculo: "Mateo 28:1-6 - Jesús resucitó el domingo." },
  { pregunta: "¿Qué signo marcó el pacto con Noé?", opciones: ["Arco iris", "Estrella", "Llueve fuego", "Paloma"], respuestaCorrecta: 0, versiculo: "Génesis 9:13 - Mi arco he puesto en las nubes." },
  { pregunta: "¿Cuál es el primer libro de la Biblia?", opciones: ["Éxodo", "Génesis", "Levítico", "Salmos"], respuestaCorrecta: 1, versiculo: "Génesis 1:1 - En el principio creó Dios los cielos y la tierra." },
  { pregunta: "¿Qué pidió Salomón a Dios?", opciones: ["Riqueza", "Sabiduría", "Poder", "Victoria"], respuestaCorrecta: 1, versiculo: "1 Reyes 3:9 - Da a tu siervo corazón entendido." },
  { pregunta: "¿Quién fue lanzado al foso de los leones?", opciones: ["Daniel", "David", "Elías", "Moisés"], respuestaCorrecta: 0, versiculo: "Daniel 6:16 - Entonces el rey mandó, y trajeron a Daniel, y le echaron en el foso." }
];

function achicarMyGames() {
  myGamesEl.classList.add("small");
}

function restaurarMyGames() {
  myGamesEl.classList.remove("small");
}

function iniciarIngresoNombres() {
  achicarMyGames();
  estadoTrivia.textContent = "";
  contenedorTrivia.innerHTML = `
    <div style="text-align:center; max-width: 300px; margin: auto;">
      <h3>Ingresar nombre del Jugador 1</h3>
      <input type="text" id="input-nombre" placeholder="Jugador 1" padding:8px; font-size:1.1em;" />
      <button id="btn-siguiente-nombre" style="margin-top:10px; padding:8px 16px; font-size:1.1em;">Siguiente</button>
    </div>
  `;

  let etapa = 0;
  document.getElementById("btn-siguiente-nombre").onclick = () => {
    const nombre = document.getElementById("input-nombre").value.trim();
    if (!nombre) return alert("Por favor ingresa un nombre");

    nombres[etapa] = nombre;
    etapa++;
    if (etapa === 1) {
      contenedorTrivia.innerHTML = `
        <div style="text-align:center; max-width: 300px; margin: auto;">
          <h3>Ingresar nombre del Jugador 2</h3>
          <input type="text" id="input-nombre" placeholder="Jugador 2" padding:8px; font-size:1.1em;" />
          <button id="btn-siguiente-nombre" style="margin-top:10px; padding:8px 16px; font-size:1.1em;">Comenzar Juego</button>
        </div>
      `;
      document.getElementById("btn-siguiente-nombre").onclick = () => {
        const nombre2 = document.getElementById("input-nombre").value.trim();
        if (!nombre2) return alert("Por favor ingresa un nombre");
        nombres[1] = nombre2;
        prepararJuego();
      };
    }
  };
}

function prepararJuego() {
  const preguntasMezcladas = [...preguntasBiblia].sort(() => Math.random() - 0.5);

  preguntasJugador[0] = preguntasMezcladas.slice(0, 8);
  preguntasJugador[1] = preguntasMezcladas.slice(8, 16);

  respuestasJugador[0] = [];
  respuestasJugador[1] = [];
  jugadorActual = 0;
  rondaActual = 0;

  mostrarPregunta();
}

function mostrarPregunta() {
  const pregunta = preguntasJugador[jugadorActual][rondaActual];
  estadoTrivia.innerHTML = `<strong>${nombres[jugadorActual]}</strong>, pregunta ${rondaActual + 1} / 8`;

  contenedorTrivia.innerHTML = `
    <h3>${pregunta.pregunta}</h3>
    <div class="opciones-container">
      ${pregunta.opciones.map((op, i) => `<button class="opcion" data-i="${i}">${op}</button>`).join("")}
    </div>
    <p id="feedback">
      <span id="mensaje-feedback"></span><br/>
      <span id="versiculo" style="font-size:0.9em; color:#555;"></span>
    </p>
    <button id="btn-siguiente" disabled>Siguiente</button>
  `;

  document.querySelectorAll(".opcion").forEach(btn => {
    btn.onclick = () => manejarRespuesta(parseInt(btn.dataset.i));
  });

  const btnSiguiente = document.getElementById("btn-siguiente");
  btnSiguiente.disabled = true;
  btnSiguiente.onclick = () => {
    rondaActual++;
    if (rondaActual >= 8) {
      mostrarResultadoIndividual();
    } else {
      mostrarPregunta();
    }
  };

  //actualizarColorFondoJugador();
}

function manejarRespuesta(indiceSeleccionado) {
  const pregunta = preguntasJugador[jugadorActual][rondaActual];
  const botones = document.querySelectorAll(".opcion");
  const mensajeFeedback = document.getElementById("mensaje-feedback");
  const versiculoFeedback = document.getElementById("versiculo");

  if (!document.getElementById("btn-siguiente").disabled) return;

  const esCorrecto = indiceSeleccionado === pregunta.respuestaCorrecta;
  respuestasJugador[jugadorActual].push(esCorrecto);

  botones.forEach((btn, i) => {
    btn.style.pointerEvents = "none";
    if (i === pregunta.respuestaCorrecta) {
      btn.style.background = "linear-gradient(135deg, #43a047 0%, #80e27e 100%)";  // Verde suave y fresco
      btn.style.color = "#fff";
    }
    if (i === indiceSeleccionado && i !== pregunta.respuestaCorrecta) {
      btn.style.background = "linear-gradient(135deg, #e53935 0%, #ff6f60 100%)";  // Rojo intenso y degradado
      btn.style.color = "#fff";
    }
  });

  mensajeFeedback.textContent = esCorrecto ? "¡CORRECTO!" : "¡ERROR!";
  mensajeFeedback.style.color = esCorrecto ? "#4CAF50" : "#f44336";
  versiculoFeedback.textContent = pregunta.versiculo;

  document.getElementById("btn-siguiente").disabled = false;
}

function mostrarResultadoIndividual() {
  const puntaje = respuestasJugador[jugadorActual].filter(Boolean).length;
  contenedorTrivia.innerHTML = `
    <h3>${nombres[jugadorActual]}, respondiste ${puntaje} de 8 correctamente.</h3>
    <button id="btn-siguiente-turno" style="padding:8px 20px; font-size:1.1em;">
      ${jugadorActual === 0 ? `Turno de ${nombres[1]}` : "Ver Resultados Finales"}
    </button>
  `;
  estadoTrivia.textContent = "";
  
  document.getElementById("btn-siguiente-turno").onclick = () => {
    if (jugadorActual === 0) {
      jugadorActual = 1;
      rondaActual = 0;
      mostrarPregunta();
    } else {
      mostrarResultadosFinales();
    }
  };
  //actualizarColorFondoJugador();
}

function mostrarResultadosFinales() {
  const puntajes = respuestasJugador.map(r => r.filter(Boolean).length);
  let ganador = puntajes[0] === puntajes[1] ? "Empate" : puntajes[0] > puntajes[1] ? nombres[0] : nombres[1];

  const modal = document.createElement("div");
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  //modal.style.backgroundColor = "rgba(0,0,0,0.6)";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "9999";

  modal.innerHTML = `
    <div style="background: linear-gradient(to top, #222, #444);
      box-shadow:
        inset 0 2px 4px rgba(255,255,255,0.1),
        0 6px 0 #000,
        0 10px 15px rgba(0,0,0,0.6);
      color: #ddd;
      overflow: hidden; padding:30px; border-radius:10px; max-width: 380px; text-align:center; box-shadow: 0 0 10px #000;">
      <h2>Resultados Finales</h2>
      <p>${nombres[0]}: ${puntajes[0]} / 8</p>
      <p>${nombres[1]}: ${puntajes[1]} / 8</p>
      <h3>${ganador === "Empate" ? "¡Es un empate!" : `¡Ganó ${ganador}!`}</h3>
      <button id="btn-rejugar" style="margin-top:20px; padding:8px 20px; font-size:1.1em;">Volver a jugar (mismos jugadores)</button><br/>
      <button id="btn-cambiar-jugadores" style="margin-top:10px; padding:8px 20px; font-size:1.1em;">Cambiar jugadores</button><br/>
      <button id="btn-cerrar-modal" style="margin-top:10px; padding:8px 20px; font-size:1.1em;">Volver al menú</button>
    </div>
  `;

  document.body.appendChild(modal);

  document.getElementById("btn-cerrar-modal").onclick = () => {
    document.body.removeChild(modal);
    resetJuego();
  };

  document.getElementById("btn-rejugar").onclick = () => {
    document.body.removeChild(modal);
    prepararJuego();
  };

  document.getElementById("btn-cambiar-jugadores").onclick = () => {
    document.body.removeChild(modal);
    iniciarIngresoNombres();
  };
}

/*
function actualizarColorFondoJugador() {
g3.style.background = jugadorActual === 0
  ? "linear-gradient(135deg, #90EE90 0%, #4CAF50 100%)"
  : "linear-gradient(135deg, #ADD8E6 0%, #2196F3 100%)";
}*/


function resetJuego() {
  nombres = ["", ""];
  jugadorActual = 0;
  rondaActual = 0;
  preguntasJugador = [[], []];
  respuestasJugador = [[], []];
  estadoTrivia.textContent = "";
  contenedorTrivia.innerHTML = "";
  g3.classList.add("nodisp");
  mainEl.classList.remove("nodisp");
  restaurarMyGames();
}

btnBack.onclick = () => {
  resetJuego();
};

document.getElementById("btn-g3").onclick = () => {
  document.querySelectorAll(".game").forEach(g => g.classList.add("nodisp"));
  mainEl.classList.add("nodisp");
  g3.classList.remove("nodisp");
  iniciarIngresoNombres();
};