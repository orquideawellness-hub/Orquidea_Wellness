exports.simulador = (texto) => {

  texto = texto.toLowerCase();

  if (texto.includes("estres") || texto.includes("ansiedad")) {
    return "Respiración profunda + masaje relajante + aromaterapia";
  }

  if (texto.includes("dolor") || texto.includes("musculo")) {
    return "Terapia física + estiramientos + calor local";
  }

  return "Masaje relajante + equilibrio mente-cuerpo";
};


exports.orquia = (mensaje) => {

  mensaje = mensaje.toLowerCase();

  if (mensaje.includes("hola")) {
    return "Hola 🌿 soy Orquía, ¿cómo te sientes hoy?";
  }

  if (mensaje.includes("estres")) {
    return "Te recomiendo respiración guiada y una sesión relajante.";
  }

  return "Cuéntame un poco más para ayudarte mejor 🌸";
};