//agarro el h1
const myGamesEl = document.getElementById("mygames");

//agarro el div main
const mainEl = document.getElementById("main");

//agarro el div del juego 3
const g3 = document.getElementById("g3");

//agarro el boton para volver atras en el juego 3
const btnBack = document.getElementById("btn-g3-back");

//agarro el h3 vacio para el estado del juego (nombre del jugador y nro de pregunta)
const estadoTrivia = document.getElementById("estado-trivia");

// agarro el div donde va a ir el contenido de la trivia (todo lo que va debajo del estado)
const contenedorTrivia = document.getElementById("trivia-g3"); //es un div vacio, para cargarle el contenido

// array unidimensional que almacena los nombres de los dos jugadores (posicion 0 para el jugador 1, y 1 para el jugador 2)
let nombres = ["", ""];

// variable que indica que jugador esta jugando actualmente, empieza en 0
let jugadorActual = 0;

//variable que indica la pregunta actual (de 0 a 7)
let rondaActual = 0;

//array bidimensional que almacena las preguntas para cada jugador. En c/array va un jugador
let preguntasJugador = [[], []];

//array bidimensional que almacena las respuestas de c/jugador
let respuestasJugador = [[], []];

// array de objetos con las propiedades: preguntas, opciones, respuesta correcta y versiculo
const preguntasBiblia = [
  { pregunta: "¿Quién fue tragado por un gran pez?", opciones: ["Jonás", "Pedro", "Pablo", "José"], respuestaCorrecta: 0, versiculo: "Jonás 2:1 - Entonces Jonás oró al Señor su Dios desde el vientre del pez." },
  { pregunta: "¿Cuál fue el primer milagro de Jesús?", opciones: ["Sanar un ciego", "Multiplicar panes", "Caminar sobre el agua", "Convertir agua en vino"], respuestaCorrecta: 3, versiculo: "Juan 2:1-11 - Jesús convirtió el agua en vino en las bodas de Caná." },
  { pregunta: "¿Qué apóstol negó a Jesús tres veces?", opciones: ["Pedro", "Juan", "Tomás", "Andrés"], respuestaCorrecta: 0, versiculo: "Mateo 26:69-75 - Pedro negó a Jesús tres veces antes del gallo cantar." },
  { pregunta: "¿Dónde nació Jesús?", opciones: ["Nazaret", "Jerusalén", "Belén", "Egipto"], respuestaCorrecta: 2, versiculo: "Mateo 2:1 - Jesús nació en Belén de Judea." },
  { pregunta: "¿Quién construyó el arca?", opciones: ["Abraham", "Moisés", "Noé", "David"], respuestaCorrecta: 2, versiculo: "Génesis 6:14 - Hazte un arca de madera de gofer." },
  { pregunta: "¿Qué alimento cayó del cielo a los israelitas?", opciones: ["Pan", "Maná", "Fruta", "Agua"], respuestaCorrecta: 1, versiculo: "Éxodo 16:15 - Era maná lo que comieron los israelitas." },
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
  //le agrego la clase small al h1 para achicarlo
  myGamesEl.classList.add("small");
}


function restaurarMyGames() {
  //le saco la clase para agrandar el h1
  myGamesEl.classList.remove("small");
}

function iniciarIngresoNombres() {
  achicarMyGames(); //achico myGames cuando empieza el juego
  estadoTrivia.textContent = ""; // limpio cualquier texto previo del estado del juego

  // inserto en el div de la trivia el formulario para ingresar el nombre del Jugador 1
  contenedorTrivia.innerHTML = ` 
    <div style="text-align:center; max-width: 300px; margin: auto;">
      <h3>Ingresar nombre del Jugador 1</h3>
      <input type="text" id="input-nombre" placeholder="Jugador 1" style="padding:8px; font-size:1.1em;" />
      <button id="btn-siguiente-nombre" disabled style="margin-top:10px; padding:8px 16px; font-size:1.1em;">Siguiente</button>
    </div>
  `;

  // variable para controlar en qué etapa del ingreso de nombres estamos (0 para jugador 1, 1 para jugador 2)
  let etapa = 0;

  // selecciono el input y el boton para poder trabajar con ellos
  const inputNombre = document.getElementById("input-nombre");
  const btnSiguiente = document.getElementById("btn-siguiente-nombre");

  // habilito el boton solo si hay texto (evito que este vacio)
  inputNombre.addEventListener("input", () => {
    btnSiguiente.disabled = inputNombre.value.trim() === "";
  });

  // funcion que se ejecuta al hacer click en el boton "siguiente" (para procesar el nombre ingresado)
  btnSiguiente.onclick = () => {
    // con la propiedad value obtengo el texto del input, y con trim elimino los posibles espacios en blanco
    const nombre = inputNombre.value.trim();

    // guardo el nombre ingresado en el array "nombres" en la posición según la etapa actual (jugador 1 o jugador 2)
    nombres[etapa] = nombre; //nombres es el array, etapa la posición, y nombre es lo que ingresó el usuario

    // incrementa la variable etapa para pasar al jugador 2
    etapa++; 

    // si ya se ingresó el nombre del jugador 1, estoy en el 2
    if (etapa === 1) {

      // muestro el formulario para que el jugador 2 ingrese su nombre, reescribiendo con innerHTML el contenido anterior
      contenedorTrivia.innerHTML = `
        <div style="text-align:center; max-width: 300px; margin: auto;">
          <h3>Ingresar nombre del Jugador 2</h3>
          <input type="text" id="input-nombre" placeholder="Jugador 2" style="padding:8px; font-size:1.1em;" />
          <button id="btn-siguiente-nombre" disabled style="margin-top:10px; padding:8px 16px; font-size:1.1em;">Comenzar Juego</button>
        </div>
      `;

      // selecciono el nuevo input y botón para el jugador 2
      const inputNombre2 = document.getElementById("input-nombre");
      const btnSiguiente2 = document.getElementById("btn-siguiente-nombre");

      // habilito el botón solo si hay texto (evito que esté vacío)
      inputNombre2.addEventListener("input", () => {
        btnSiguiente2.disabled = inputNombre2.value.trim() === "";
      });

      // función que se ejecutará cuando se haga click en el botón "comenzar juego" del jugador 2
      btnSiguiente2.onclick = () => {
        // obtengo el texto ingresado en el input para el jugador 2, eliminando posibles espacios
        const nombre2 = inputNombre2.value.trim();

        // guardo el nombre ingresado del jugador 2 en la posición 1 del array "nombres"
        nombres[1] = nombre2;

        // ejecuta la funciOn que inicia el juego con los datos ya ingresados
        prepararJuego();
      };
    }
  };
}


//funcion que prepara y comienza el juego, configura preguntas y estado inicial
function prepararJuego() {

  //creo una copia del arrat preguntasbiblia con el operador spread (...) para ordenarlo con sort de forma aleatoria con random
  const preguntasMezcladas = [...preguntasBiblia].sort(() => Math.random() - 0.5); //si le resto 0.5, hay 50% de probabilidades 
                                                                                // de que den nros positivos o negativos al restar 0.5, 
                                                                                // cambiando el orden de los elementos al azar


  //le doy las primeras 8 preguntas al primer jugador, y despues las segundas 8 preguntas                                                                             
  preguntasJugador[0] = preguntasMezcladas.slice(0, 8); 
  preguntasJugador[1] = preguntasMezcladas.slice(8, 16);


  //inicializo el array de respuestas del jugador 0 como vacio, para empezar sin respuestas previas
  respuestasJugador[0] = [];

  //lo mismo con el jugador 2 xd
  respuestasJugador[1] = [];


  jugadorActual = 0; //reinicio al primer jugador para que comience el juego desde el inicio
  rondaActual = 0; //reinicio la ronda actual para empezar desde la primera pregunta

  //ejecuto la funcion mostrar preginta
  mostrarPregunta();
}


// funcion para mostrar la pregunta y opciones al turno actual del jugador
function mostrarPregunta() {

  //obtengo la pregunta actual del jugador segun el turno y la ronda
  const pregunta = preguntasJugador[jugadorActual][rondaActual];

  //muestra en la pantalla quin está jugando y q nro de pregunta es (rondaActual + 1 porque empieza en 0)
  estadoTrivia.innerHTML = `
    <span style="font-weight: 700; color:rgb(38, 231, 150);">
      ${nombres[jugadorActual]}
    </span>, pregunta ${rondaActual + 1} / 8
  `;
  
  //agrego esto al div de la trivia
  //pregunta es la variable que contiene el array de preguntas, y .pregunta agarro la propiedad pregunta
  // ${ concateno accedo a la propiedad opciones del objeto pregunta, map recorre el arrar opciones
  // op es cada opcion, i el indice de la opcion (0, 1, 2, 3)
  // el map crea un boton con el texto del boton siendo la opcion ${op}
  //un atributo data-i con el indice, para saber que opcion es (para detectar cual clickea)
  //join("") convierte ese array de botones en un string para insertar en el html

  //el P queda vacio, pero despues va a aparecer el mensaje correcto o incorrecto, y el versiculo
  //sreo el boton para pasar a la siguiente pregunta, empieza deshabilitado
  contenedorTrivia.innerHTML = `
    <h3>${pregunta.pregunta}</h3>
    <div class="opciones-container">
      ${pregunta.opciones.map((op, i) => `<button class="opcion" data-i="${i}">${op}</button>`).join("")}
    </div>
    <p id="feedback">
      <span id="mensaje-feedback"></span>
      <span id="versiculo" style="font-size:0.9em; color:#555;"></span>
    </p>
    <button id="btn-siguiente" disabled>Siguiente</button>
  `;

  //agarro los elementos con esa clase, devuelvo un array y lo recorro con foreach, btn es cada botón
  document.querySelectorAll(".opcion").forEach(btn => {

  //al hacer click llamo a manejarRespuesta 
  //y para cada boton (variable btn) leo su indice guardado en el atributo data-i con btn.dataset.i
  //dataset es un objeto que contiene todos los atributos html que empiezan con data de un elemento
    btn.onclick = () => manejarRespuesta(parseInt(btn.dataset.i)); //parseint transforma el atributo html a nro, 
                              // porque la funcion manejar respuesta espera un nro para comparar la opcion elegida con la rta correcta
  });

  //agarro el boton "siguiente"
  const btnSiguiente = document.getElementById("btn-siguiente");

  //deshabilito el boton siguiente para que no se pueda hacer click
  btnSiguiente.disabled = true;

  //cuando le hago click a "siguiente"
  btnSiguiente.onclick = () => {

    //incrementa la variable rondaactual 
    rondaActual++; 

    //si la ronda actual es igual a 8
    if (rondaActual >= 8) { 

      //se ejecuta la funcion para mostrar el resultado individual del jugador
      mostrarResultadoIndividual(); 

      //si no es igual a 8 
    } else {

      //se ejecuta la funcion de mostrar pregunta
      mostrarPregunta();
    }
  };

  //actualizarColorFondoJugador();
}


//funcion que recibe la ocion elegida, muestra si acerto, guarda la respuesta y activa el boton "siguiente"
function manejarRespuesta(indiceSeleccionado) {

  //obtengo la pregunta actual segun el jugador y la ronda
  const pregunta = preguntasJugador[jugadorActual][rondaActual];

  //vuelvo a seleccionar los botones ".opcion" porque al cambiar el contenido con innerHTML
  // los botones viejos desaparecen y se crean nuevos, por eso necesito obtener los nuevos para usarlos
  const botones = document.querySelectorAll(".opcion");

  //obtengo el "mensaje-feedback" donde se va a mostrar el texto incorrecto o correcto
  const mensajeFeedback = document.getElementById("mensaje-feedback");

  //obtengo el "versiculo" donde se va a mostrar el versiculo
  const versiculoFeedback = document.getElementById("versiculo");


  //si el boton "siguiente" no esta dehabilitado devuelve lo de abajo
  if (!document.getElementById("btn-siguiente").disabled) return;

  //comparo si el indice seleccionado  es igual al indice de la respuesta correcta
  //si es asi, `esCorrecto` sera true, si no, false
  const esCorrecto = indiceSeleccionado === pregunta.respuestaCorrecta;

 // con push guardo si el jugador actual respondió bien o mal
  respuestasJugador[jugadorActual].push(esCorrecto);

  //recorro todos los botones de respuesta y accedo a su indice
  botones.forEach((btn, i) => {

    //desactivo los clicks en los botones para que no se puedan tocar
    btn.style.pointerEvents = "none";

    // si este boton corresponde a la respuesta correcta, lo marco en verde
    if (i === pregunta.respuestaCorrecta) {

      //la opcion correcta se pone en verde
      btn.style.background = "linear-gradient(135deg, #43a047 0%, #80e27e 100%)"; 
      btn.style.color = "#fff";
    }

    //si el indice es distinto al de la respuesta correcta
    if (i === indiceSeleccionado && i !== pregunta.respuestaCorrecta) {

      //la opcion se pone roja
      btn.style.background = "linear-gradient(135deg, #e53935 0%, #ff6f60 100%)"; 
      btn.style.color = "#fff";
    }
  });


  // textContent pone ese texto dentro del elemento para mostrar el mensaje al usuario
  mensajeFeedback.textContent = esCorrecto ? "¡CORRECTO!" : "¡ERROR!";

  //si es correcto el mensaje se muestra en verde, si es incorrecto en rojo
  mensajeFeedback.style.color = esCorrecto ? "#4CAF50" : "#f44336";

  //accedo a la propiedad "versiculo" del objeto "pregunta" 
  // y la muestra como texto en el html 
  versiculoFeedback.textContent = pregunta.versiculo;

  //habilita el boton "siguiente"
  document.getElementById("btn-siguiente").disabled = false;
}


//funcion para mostrar el resultado final de un jugador
//contando cuantas respuestas correctas tuvo y mostrando un mensaje con ese puntaje
function mostrarResultadoIndividual() {

  //creo la variable "puntaje" que guarda las respuestas del jugador actual (usando su indice)
  //despues .filter(boolean) crea un array, lo recorre y deja solo las respuestas true (correctas)
  // .length cuenta los elementos del array
  const puntaje = respuestasJugador[jugadorActual].filter(Boolean).length;

  // inserto en el contenedor el mensaje que muestra el nombre del jugador actual
  // y cuantas respuestas correctas (puntaje) tuvo

  //creo un boton y le pongo un texto dinamico:
  //si el jugador actual es el 0, el texto es "Turno de [nombre del jugador 2]".
  // Si el jugador actual no es 0 (es 1), el texto será "Ver Resultados Finales".
  contenedorTrivia.innerHTML = `
    <h3 style="color: rgb(255, 255, 255); font-style: italic;">
      <span style="font-weight: bold; color: rgb(255, 255, 255);">${nombres[jugadorActual]}</span>, respondiste 
      <span style="font-weight: bold; color:rgb(50, 218, 120);">${puntaje}</span> de 
      <span style="font-weight: bold; color: rgb(254, 254, 254);">8</span> correctamente.
    </h3>
    <button 
      id="btn-siguiente-turno" 
      cursor: pointer;"
    >
      ${jugadorActual === 0 
        ? `Turno de <span style="font-weight: bold; color: rgb(254, 254, 254);">${nombres[1]}</span>` 
        : "Ver Resultados Finales"
      }
    </button>
  `;



  // limpio el texto que muestra el estado actual del juego
  estadoTrivia.textContent = "";
  
  //funcion que se ejecuta cuando se hace clicK "siguiente turno" o "ver resultados finales"
  document.getElementById("btn-siguiente-turno").onclick = () => {

    // si es el turno del jugador 1
    if (jugadorActual === 0) {

      //cambio el turno al jugador 2
      jugadorActual = 1;

      //reinicio la ronda a 0 para el jugador 2
      rondaActual = 0;

      //le muestro la primera pregunta del jugador 2
      mostrarPregunta();
    } else {

      //se ejecuta la funcion para mostrar los resultados finales
      mostrarResultadosFinales();
    }
  };
  //actualizarColorFondoJugador();
}


//funcion para mostrar los puntajes finales de ambos jugadores y anunciar los resultados finales
function mostrarResultadosFinales() {

//creo un array "puntajes" que para cada jugador cuenta cuantas respuestas true tiene en su array de respuestas
//para cada jugador en "respuestasJugador", uso .map para crear un nuevo array "puntajes" que contiene
// la cantidad de respuestas true de cada jugador 
//esto se logra filtrando solo los valores verdaderos con .filter(Boolean) y contando con .length
  const puntajes = respuestasJugador.map(r => r.filter(Boolean).length);

  // declaro la variable "ganador" usando un operador ternario anidado:
  //si los puntajes de los jugadores son iguales, "ganador" es "empate"
  //si el puntaje del jugador 0 es mayor, "ganador" es el nombre del jugador 0
  //si no, "ganador" es el nombre del jugador 1
  let ganador = puntajes[0] === puntajes[1] ? "Empate" : puntajes[0] > puntajes[1] ? nombres[0] : nombres[1];

  const modal = document.createElement("div"); //creo un div con los siguientes estilos:
  modal.style.position = "fixed";
  modal.style.top = "0";
  modal.style.left = "0";
  modal.style.width = "100%";
  modal.style.height = "100%";
  modal.style.display = "flex";
  modal.style.justifyContent = "center";
  modal.style.alignItems = "center";
  modal.style.zIndex = "9999";

  //actualizo el contenido del modal para mostrar los resultados finales:
  //muestro el nombre y puntaje de cada jugador
  //muestro un mensaje que dice si hubo empate o quien gano
  //agrego botones para: volver a jugar con los mismos jugadores, cambiar jugadores o volver al menu
modal.innerHTML = `
  <div style="
    background: linear-gradient(to top, #222, #444);
    box-shadow:
      inset 0 2px 4px rgba(255,255,255,0.1),
      0 6px 0 #000,
      0 10px 15px rgba(0,0,0,0.6);
    color: #ddd;
    overflow: hidden;
    padding: 30px;
    border-radius: 10px;
    max-width: 380px;
    text-align: center;
    box-shadow: 0 0 10px #000;
  ">
    <h2>Resultados Finales</h2>
    <p><span style="font-weight:bold; color:#3498db;">${nombres[0]}</span>: <span style="font-weight:bold; font-size:1em; color:#fff;">${puntajes[0]}</span> / 8</p>
    <p><span style="font-weight:bold; color:#2ecc71;">${nombres[1]}</span>: <span style="font-weight:bold; font-size:1em; color:#fff;">${puntajes[1]}</span> / 8</p>
    <h3 style="font-weight:bold; font-size:2em; color:#fff;">${ganador === "Empate" ? "¡Es un empate!" : `¡Ganó ${ganador}!`}</h3>
    <button id="btn-rejugar" style="margin-top:20px; padding:8px 20px; font-size:1.1em; color:#fff; border:none; border-radius:5px; cursor:pointer;">Volver a jugar</button><br/>
    <button id="btn-cambiar-jugadores" style="margin-top:10px; padding:8px 20px; font-size:1.1em; color:#fff; border:none; border-radius:5px; cursor:pointer;">Cambiar jugadores</button><br/>
    <button id="btn-cerrar-modal" style="margin-top:10px; padding:8px 20px; font-size:1.1em; color:#fff; border:none; border-radius:5px; cursor:pointer;">Volver al menú</button>
  </div>
`;

  //agrego el modal que acabo de crear al final del body de la pag
  document.body.appendChild(modal);

  //cuando hago click en el boton para volver al menu
  document.getElementById("btn-cerrar-modal").onclick = () => { 

    //se elimina  el modal del body, sacandolo de la pantalla
    document.body.removeChild(modal);

    //ejecuto la funcion para volver al menu
    resetJuego();
  };


  //cuando hago click en el boton volver a jugar con los mismos jugadores
  document.getElementById("btn-rejugar").onclick = () => {

    //se elimina  el modal del body, sacandolo de la pantalla
    document.body.removeChild(modal);

    //ejecuta la funcion para volver a jugar
    prepararJuego();
  };

  //cuando hago click en cambiar de jugadores
  document.getElementById("btn-cambiar-jugadores").onclick = () => {

    //se elimina  el modal del body, sacandolo de la pantalla
    document.body.removeChild(modal);

    //ejecuto la funcion para empezar desde el principio
    iniciarIngresoNombres();
  };
}


function resetJuego() {
  nombres = ["", ""];  //limpio los nombres de los jugadores
  jugadorActual = 0; //reinicio el jugador actual a 0 (primer jugador)
  rondaActual = 0; //reinicio la ronda actual a 0 (primera pregunta)
  preguntasJugador = [[], []]; // limpio las preguntas asignadas a cada jugador
  respuestasJugador = [[], []]; // limpio las respuestas guardadas de cada jugador
  estadoTrivia.textContent = ""; // limpio el texto de estado del juego en pantalla
  contenedorTrivia.innerHTML = ""; // limpio el contenido visible de la trivia
  g3.classList.add("nodisp"); // oculto la sección del juego (g3)
  mainEl.classList.remove("nodisp"); // muestro la pantalla principal (mainEl)
  restaurarMyGames(); // restauro el tamaño original de mygames (quito clase "small")
}

btnBack.onclick = () => {
  resetJuego(); //al hacer click en el boton de volver, reinicio el juego
};

//cuando hago click en el boton de trivias
document.getElementById("btn-g3").onclick = () => {

  //oculto todos los elementos con clase "game"
  document.querySelectorAll(".game").forEach(g => g.classList.add("nodisp"));

  //oculto el elemento principal mainEl
  mainEl.classList.add("nodisp");

  //muestro el contenedor g3
  g3.classList.remove("nodisp");

  //inicio el proceso para ingresar los nombres de los jugadores
  iniciarIngresoNombres();
};