const API = {

  async simularRespuestaSimulador(texto) {
    return new Promise((resolve) => {
      setTimeout(() => {

        resolve({
          ok: true,
          data: {
            respuesta: "Respuesta simulada desde API (listo para IA real)"
          }
        });

      }, 600);
    });
  },

  async enviarMensajeOrquia(mensaje) {
    return new Promise((resolve) => {
      setTimeout(() => {

        resolve({
          ok: true,
          data: {
            respuesta: "Respuesta simulada de Orquía (IA futura)"
          }
        });

      }, 700);

    });
  }

};