 // genera un nro random entre 1 y 6
 function obtenerNumeroAleatorio() {
    return Math.floor(Math.random() * 6) + 1; // nro entre 1 y 6
  }

  function tirarDados() {  // lanzamiento de los 5 dados
    // Genera y asigna un nro aleatorio a cada dado
    document.getElementById('dado1').innerText = obtenerNumeroAleatorio();
    document.getElementById('dado2').innerText = obtenerNumeroAleatorio();
    document.getElementById('dado3').innerText = obtenerNumeroAleatorio();
    document.getElementById('dado4').innerText = obtenerNumeroAleatorio();
    document.getElementById('dado5').innerText = obtenerNumeroAleatorio();
  }