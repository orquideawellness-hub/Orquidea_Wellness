const API = {

  async enviarMensajeOrquia(mensaje) {

    const response = await fetch("http://localhost:3000/api/ia/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ mensaje })
    });

    const data = await response.json();

    return data.data;
  },

  async simularRespuestaSimulador(texto) {

    const response = await fetch("http://localhost:3000/api/ia/simulador", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ texto })
    });

    const data = await response.json();

    return data.data;
  }

};