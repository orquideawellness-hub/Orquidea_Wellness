async function enviarMensaje() {

  const input = document.getElementById("inputChat");
  const chatBox = document.getElementById("chatBox");

  const mensaje = input.value.trim();
  if (!mensaje) return;

  // 👤 mensaje usuario
  const userMsg = document.createElement("div");
  userMsg.className = "msg user";
  userMsg.innerHTML = mensaje;
  chatBox.appendChild(userMsg);

  input.value = "";

  // ⏳ loader bot
  const botMsg = document.createElement("div");
  botMsg.className = "msg bot";
  botMsg.innerHTML = "🌿 OrquIA está pensando...";
  chatBox.appendChild(botMsg);

  chatBox.scrollTop = chatBox.scrollHeight;

  try {

    const response = await fetch("http://localhost:4000/api/ia/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        mensaje: mensaje
      })
    });

    const data = await response.json();

    botMsg.innerHTML = data.data;

  } catch (error) {

    botMsg.innerHTML = "⚠️ Error de conexión con OrquIA";

  }

  chatBox.scrollTop = chatBox.scrollHeight;
}