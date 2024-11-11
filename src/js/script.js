function hideAllSections() {
  Array.from(document.querySelectorAll(".game")).concat([document.getElementById("main")])
    .forEach(element => element.classList.add("nodisp")); // se les agrega la clase nodisp a todas esas secciones. nodisp tiene display none (para que al principio no se vea todo eso)
}

function showSection(sectionId) {
  document.getElementById(sectionId).classList.remove("nodisp"); //hace lo contrario a la funcion hideAllSections, le saca la clase nodisp a las secciones
}

function setupButtons() { //cada vez que se toque un boton (un juego), se oculta todo y se muestra unicamente el juego que se selecciono
    document.querySelectorAll(".game") //selecciona todas las clases .game
      .forEach(gameElement => {
        const id = gameElement.getAttribute("id") //devuelve todos los id
        document.getElementById(`btn-${id}`).addEventListener("click", () => { //concatena el id del boton (btn-id del juego seleccionado)
            hideAllSections(); // oculta las secciones que no se necesitan mostrar cuando se hace click
            showSection(id); //muestra la seccion corresponeidnde con el id del boton que se toco
        });
        document.getElementById(`btn-${id}-back`).addEventListener("click", () => { //cuando toca el boton para volver
            hideAllSections(); //se ocultan lo que no deberia verse (el juego en el que estaba)
            showSection("main"); //vuelve mostrar el main (seccion con los 3 botones de los juegos)
        });
    });
}

function initApp() {
  setupButtons(); //llama a la funcion que configura los botones de los juegos para que tengan los eventos de click 
}

document.addEventListener("DOMContentLoaded", initApp());//el evento DOMContentLoaded se dispara cuando el HTML carga,
// y llama a la funcion initApp para iniciar la app