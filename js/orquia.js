function enviarMensaje() {
  const input = document.getElementById("inputChat");
  const chatBox = document.getElementById("chatBox");

  const mensaje = input.value.trim();
  if (!mensaje) return;

  // 🟢 Mostrar mensaje del usuario
  const userMsg = document.createElement("div");
  userMsg.className = "msg user";
  userMsg.innerHTML = mensaje;
  chatBox.appendChild(userMsg);

  input.value = "";

  // 🔵 Simular respuesta de IA
  setTimeout(() => {
    const botMsg = document.createElement("div");
    botMsg.className = "msg bot";

    botMsg.innerHTML = generarRespuestaIA(mensaje.toLowerCase());
    chatBox.appendChild(botMsg);

    chatBox.scrollTop = chatBox.scrollHeight;
  }, 600);
}


// 🧠 Motor simple de respuesta tipo IA
function generarRespuestaIA(texto) {

  if (texto.includes("estres") || texto.includes("ansiedad")) {
    return "🌿 Entiendo tu estado. Te recomiendo una sesión de respiración profunda y masaje relajante para reducir tensión.";
  }

  if (texto.includes("dolor") || texto.includes("musculo")) {
    return "💆 Podría ayudarte un masaje terapéutico y estiramientos suaves. ¿Dónde sientes el dolor?";
  }

  if (texto.includes("cansado") || texto.includes("fatiga")) {
    return "🌙 Tu cuerpo necesita descanso. Prioriza sueño profundo y desconexión digital.";
  }

  if (texto.includes("hola") || texto.includes("buenas")) {
    return "✨ Hola, soy Orquía. Estoy aquí para ayudarte a equilibrar tu bienestar físico y emocional.";
  }

  return "🌸 Cuéntame un poco más para poder darte una recomendación más precisa sobre tu bienestar.";
}