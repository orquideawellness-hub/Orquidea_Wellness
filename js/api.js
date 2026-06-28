const API = {

  async enviarMensajeOrquia(mensaje) {

    const response = await fetch("https://orquidea-wellness-vrwb.onrender.com/api/ia/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mensaje })
    });

    const data = await response.json();

    console.log("BACKEND RAW:", data);

    if (!data.ok || !data.data) {
      throw new Error(data.error || "Respuesta inválida del backend");
    }

    return data.data;
  }

};
