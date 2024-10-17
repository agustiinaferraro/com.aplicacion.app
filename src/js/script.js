import { Preferences } from '@capacitor/preferences';

function hideAllSections() {
  Array.from(document.querySelectorAll(".game")).concat([document.getElementById("main"),document.getElementById("perfil")])
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

async function getPreference(key) { // funcion asincrona para obtener un valor de las preferencias
  const { value } = await Preferences.get({ key }); // busca el valor almacenado con la clave (key) proporcionada
  return value === null ? null : JSON.parse(value); //si el valor es null, devuelve null; si no, convierte el valor (que esta en texto) a un objeto
}

async function setPreference(key, obj) { //funcion asincrona para guardar un valor en las preferencias
    await Preferences.set({ key, value: JSON.stringify(obj) });//convierte el objeto (obj) a texto y lo guarda con la clave (key) en las preferencias
}

function initApp() {
  setupButtons(); //llama a la funcion que configura los botones de los juegos para que tengan los eventos de click
  getPreference("config").then(config => { //obtiene las preferencias almacenadas bajo la clave "config". Esta operacion es asincronica, por eso devuelve una promesa
    hideAllSections(); //oculta las secciones al cargar la app
    if (config === null) { // si no hay datos cargados
      showSection("perfil"); //se muestra el perfil
    } else {
        showSection("main"); // si hay datos guardados, se muestra el menu de juegos
    }
    
  });
}

document.getElementById("savePreferences").addEventListener("click", e => { //añade un evento de click al boton de guardar
  e.preventDefault();

  //crea un objeto con el nombre y el nick del form
  const config = {
    name: document.getElementById("name").value, //valor name
    nick: document.getElementById("nick").value //valor nick
  };
  if (config.name.length === 0 || config.nick.length === 0) { //si no hay nombre ni apodo
      alert("Debe completar ambos campos!"); //se muestra este mensaje
  } else {
      setPreference("config", config).then(() =>{// Si los campos estan completos, guarda la configuracion en las preferencias
        hideAllSections(); //oculta las secciones (como el perfil, ya que los datos estan cargados)
        showSection("main"); //muestra el menu de juegos
      });
  }
});

document.addEventListener("DOMContentLoaded", initApp());//el evento DOMContentLoaded se dispara cuando el HTML carga,
// y llama a la funcion initApp para iniciar la app