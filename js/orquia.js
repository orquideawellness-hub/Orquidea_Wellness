// =====================================================
// 🤖 MOTOR DE GESTOS E INTERACTIVIDAD DE ORQUIA
// =====================================================
const robotImg = document.getElementById("robot-avatar");
const contenedorMascota = document.getElementById("contenedor-mascota");
const burbujaMascota = document.getElementById("burbuja-mascota");
const btnCaminar = document.getElementById("btn-toggle-caminar"); // Botón nuevo

let mascotaTimeout = null;
let enModoCaminar = false; // Control de estado
let intervaloFrasesCaminata = null;

function cambiarGesto(nombreArchivo, textoBurbuja = null, duracion = 0) {
    if (!robotImg) return;

    robotImg.src = `assets/bot-pet/${nombreArchivo}`;

    if (textoBurbuja) {
        burbujaMascota.textContent = textoBurbuja;
        burbujaMascota.classList.remove("d-none");
    } else {
        burbujaMascota.classList.add("d-none");
    }

    if (mascotaTimeout) clearTimeout(mascotaTimeout);

    // Si está en "modo caminar", bloqueamos el auto-regreso a idle para no interrumpir su paseo
    if (duracion > 0 && !enModoCaminar) {
        mascotaTimeout = setTimeout(() => {
            robotImg.src = "assets/bot-pet/orquia-idle.png";
            burbujaMascota.classList.add("d-none");
        }, duracion);
    }
}

// ✨ Lógica del botón de Caminar / Detener (ACTUALIZADA)
if (btnCaminar) {
    btnCaminar.addEventListener("click", () => {
        enModoCaminar = !enModoCaminar;

        if (enModoCaminar) {
            btnCaminar.innerHTML = "🛑";
            contenedorMascota.classList.add("modo-caminando");
            contenedorMascota.classList.remove("pausado");
            
            // Mensaje inicial inmediato
            cambiarGesto("orquia-caminando.png", "¡A caminar! 🚶‍♀️");

            // Lógica de frases cíclicas
            const frases = [
                "¡No hay nada como el ejercicio!",
                "¡Siento mis raíces muy fuertes!",
                "¡Un descansito no me vendría mal!"
            ];
            let indice = 0;

            intervaloFrasesCaminata = setInterval(() => {
                if (enModoCaminar) {
                    cambiarGesto("orquia-caminando.png", frases[indice]);
                    indice = (indice + 1) % frases.length; // Vuelve al inicio al terminar
                }
            }, 28000); // Cambia cada 6 segundos

        } else {
            btnCaminar.innerHTML = "🚶";
            contenedorMascota.classList.add("pausado");
            
            // ¡IMPORTANTE! Limpiamos el intervalo para que no sigan saliendo mensajes
            clearInterval(intervaloFrasesCaminata);
            
            cambiarGesto("orquia-idle.png", null, 0);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        cambiarGesto("orquia-saludando.png", "¡Hola! Bienvenido a OrquIA 🌸", 3500);
    }, 1000);
});

if (contenedorMascota) {
    contenedorMascota.addEventListener("click", () => {
        cambiarGesto("orquia-saludando.png", "¡Hola! ¿En qué te puedo ayudar hoy? ✨", 3000);
    });
}

// =====================================================
// 💬 FUNCIONALIDAD ORIGINAL DEL CHAT + GESTOS
// =====================================================
async function enviarMensaje() {
    const input = document.getElementById("inputChat");
    const chatBox = document.getElementById("chatBox");

    const mensaje = input.value.trim();
    if (!mensaje) return;

    const userMsg = document.createElement("div");
    userMsg.className = "msg user";
    userMsg.innerHTML = mensaje;
    chatBox.appendChild(userMsg);

    input.value = "";

    const botMsg = document.createElement("div");
    botMsg.className = "msg bot";
    botMsg.innerHTML = "🌿 OrquIA está pensando...";
    chatBox.appendChild(botMsg);

    chatBox.scrollTop = chatBox.scrollHeight;

    const textoMin = mensaje.toLowerCase();
    let gestoEspecialActivado = false;

    // Lista de saludos posibles
    const saludosUsuario = ["hola", "holi", "buenos días", "buenas tardes", "buenas noches"];

    // Buscamos si el texto del usuario coincide con alguno de nuestra lista
    const saludoEncontrado = saludosUsuario.find(saludo => textoMin.includes(saludo));

    if (saludoEncontrado) {
        // Respuesta dinámica: OrquIA saluda repitiendo lo que dijo el usuario
        // Por ejemplo: si dijo "holi", OrquIA responde "¡Holi! 👋"
        const saludoCapitalizado = saludoEncontrado.charAt(0).toUpperCase() + saludoEncontrado.slice(1);

        cambiarGesto("orquia-saludando.png", `¡${saludoCapitalizado}! 👋`, 2500);
        gestoEspecialActivado = true;
    } else if (textoMin.includes("gracias") || textoMin.includes("agradezco") || textoMin.includes("excelente")) {
        cambiarGesto("orquia-saltando.png", "¡De nada! Con muchísimo gusto 🥰", 2500);
        gestoEspecialActivado = true;

        // 🔥 Efecto de despedida y desvanecimiento (ACTUALIZADO)
    } else if (textoMin.includes("adios") || textoMin.includes("adiós") || textoMin.includes("chau") || textoMin.includes("hasta pronto") || 
    textoMin.includes("hasta luego") || textoMin.includes("bye") || textoMin.includes("nos vemos")) {

        // Reseteamos el estado del botón por si estaba caminando
        enModoCaminar = false;
        if (btnCaminar) {
            btnCaminar.innerHTML = "🚶";
            btnCaminar.title = "Hazme caminar";
        }

        // Limpiamos los rastros de caminata para que vuelva a su sitio antes de irse
        contenedorMascota.classList.remove("modo-caminando", "pausado");

        cambiarGesto("orquia-caminando.png", "¡Hasta pronto! Cuídate mucho... ✨", 4000);
        contenedorMascota.classList.add("mascota-despedida");
        gestoEspecialActivado = true;

        setTimeout(() => {
            contenedorMascota.classList.remove("mascota-despedida");
            cambiarGesto("orquia-idle.png");
        }, 4000);

    } else if (textoMin.includes("me encanta") || textoMin.includes("te amo") || textoMin.includes("me encantas") || textoMin.includes("te quiero") || 
    textoMin.includes("eres increible") || textoMin.includes("eres increíble") || textoMin.includes("fantástico") || 
    textoMin.includes("eres maravillosa") || textoMin.includes("buenisimo")) {
        cambiarGesto("orquia-brillos.png", "¡Me haces brillar de emoción! 💖✨", 3000);
        gestoEspecialActivado = true;
    } else if (textoMin.includes("malo") || textoMin.includes("no sirve") || textoMin.includes("me averguenza") || textoMin.includes("me avergüenza") ||
    textoMin.includes("preocupada") ||textoMin.includes("preocupado") || textoMin.includes("raro")) {
        cambiarGesto("orquia-sorprendida.png", "¡Oh! ¿Qué pasó? 😮", 3000);
        gestoEspecialActivado = true;
    } else if (textoMin.includes("triste") || textoMin.includes("llorar") || textoMin.includes("murio") || textoMin.includes("murió") || textoMin.includes("falleció") || textoMin.includes("fallecio") || textoMin.includes("me siento solo") || textoMin.includes("me siento sola") || textoMin.includes("pena")) {
        cambiarGesto("orquia-triste.png", "Oh no, no me gusta verte así... 🥀", 4000);
        gestoEspecialActivado = true;
    }

    if (!gestoEspecialActivado && !enModoCaminar) {
        cambiarGesto("orquia-pensando.png", "Analizando datos... 🤔");
    }

    try {
        const respuesta = await API.enviarMensajeOrquia(mensaje);
        console.log("RESPUESTA API:", respuesta);
        botMsg.innerHTML = respuesta || "⚠️ Sin respuesta del sistema";

        if (!enModoCaminar) {
            if (textoMin.includes("me encanta") || textoMin.includes("te amo")) {
                cambiarGesto("orquia-brillos.png", "¡Para eso estoy! ✨", 3000);
            } else {
                cambiarGesto("orquia-feliz.png", "¡Listo! Espero te sirva ✨", 3000);
            }
        }

    } catch (error) {
        botMsg.innerHTML = "⚠️ Error de conexión con OrquIA";
        if (!enModoCaminar) {
            cambiarGesto("orquia-triste.png", "Perdón, algo salió mal... 🥀", 4000);
        }
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById("inputChat").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        enviarMensaje();
    }
});