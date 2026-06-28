const UI = {

  loader(elemento, estado = true) {
    if (!elemento) return;

    elemento.innerHTML = estado
      ? "⏳ Procesando..."
      : "";
  },

  escribirLento(elemento, texto, velocidad = 15) {
    if (!elemento) return;

    elemento.innerHTML = "";

    let i = 0;

    const intervalo = setInterval(() => {

      elemento.innerHTML += texto.charAt(i);
      i++;

      if (i >= texto.length) {
        clearInterval(intervalo);
      }

    }, velocidad);
  },

  scrollBottom(elemento) {
    if (!elemento) return;
    elemento.scrollTop = elemento.scrollHeight;
  },

  notificacion(mensaje, tipo = "info") {

    console.log(`[${tipo.toUpperCase()}] ${mensaje}`);

  }

};