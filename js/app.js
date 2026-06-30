/* ==========================================
   ORQUÍDEA WELLNESS - app.js
========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================================
       ELEMENTOS DEL DOM
    ========================================== */
    const contenedor = document.getElementById("contenedorServicios");
    const buscador = document.getElementById("buscarServicio");
    const botonesFiltro = document.querySelectorAll(".filtro-btn");
    const darkModeBtn = document.getElementById("darkModeBtn");
    const whatsappBtn = document.getElementById("whatsappBtn");
    const formCita = document.getElementById("formCita");
    const scrollTopBtn = document.getElementById("scrollTopBtn");

    let categoriaActual = "Todos";

    /* ==========================================
       RENDERIZAR SERVICIOS
    ========================================== */
    function renderizarServicios(lista) {

        if (!contenedor) return;

        contenedor.innerHTML = "";

        if (lista.length === 0) {
            contenedor.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-warning">
                        No se encontraron tratamientos.
                    </div>
                </div>
            `;
            return;
        }

        lista.forEach(servicio => {

            const precioTexto = servicio.precio !== null
                ? `S/ ${servicio.precio}`
                : "Consultar precio";

            contenedor.innerHTML += `
                <div class="col-md-6 col-lg-4 fade-up">

                    <div class="servicio-card h-100">

                        <div class="servicio-header">

                            <span class="servicio-categoria">
                                ${servicio.categoria}
                            </span>

                            <h4 class="mt-2">
                                ${servicio.tratamiento}
                            </h4>

                        </div>

                        <div class="servicio-body d-flex flex-column">

                            <p class="flex-grow-1">
                                ${servicio.descripcion}
                            </p>

                            <div class="servicio-precio mb-3">
                                ${precioTexto}
                            </div>

                            <button class="btn btn-gold reservar-btn"
                                data-servicio="${servicio.tratamiento}">

                                Reservar

                            </button>

                        </div>

                    </div>

                </div>
            `;
        });

        activarAnimaciones();
        activarBotonesReserva();
    }

    /* ==========================================
       FILTRAR SERVICIOS
    ========================================== */
    function filtrarServicios() {

        const texto = buscador
            ? buscador.value.toLowerCase().trim()
            : "";

        let resultado = servicios.filter(servicio => {

            const coincideCategoria =
                categoriaActual === "Todos" ||
                servicio.categoria === categoriaActual;

            const coincideTexto =
                servicio.tratamiento.toLowerCase().includes(texto) ||
                servicio.descripcion.toLowerCase().includes(texto);

            return coincideCategoria && coincideTexto;
        });

        renderizarServicios(resultado);
    }

    /* ==========================================
       BUSCADOR
    ========================================== */
    if (buscador) {
        buscador.addEventListener("input", filtrarServicios);
    }

    /* ==========================================
       FILTROS
    ========================================== */
    botonesFiltro.forEach(btn => {

        btn.addEventListener("click", () => {

            botonesFiltro.forEach(b =>
                b.classList.remove("active")
            );

            btn.classList.add("active");

            categoriaActual = btn.dataset.categoria;

            filtrarServicios();
        });

    });

    /* ==========================================
       MODO OSCURO
    ========================================== */
    if (darkModeBtn) {

        const darkGuardado = localStorage.getItem("darkMode");

        if (darkGuardado === "true") {

            document.body.classList.add("dark-mode");

            darkModeBtn.innerHTML =
                `<i class="bi bi-sun-fill"></i>`;
        }

        darkModeBtn.addEventListener("click", () => {

            document.body.classList.toggle("dark-mode");

            const activo =
                document.body.classList.contains("dark-mode");

            localStorage.setItem("darkMode", activo);

            darkModeBtn.innerHTML = activo
                ? `<i class="bi bi-sun-fill"></i>`
                : `<i class="bi bi-moon-stars-fill"></i>`;
        });
    }

    /* ==========================================
       WHATSAPP
    ========================================== */

    const numeroWhatsapp = "51947048574"; // CAMBIAR

    if (whatsappBtn) {

        whatsappBtn.href =
            `https://wa.me/${numeroWhatsapp}`;

        whatsappBtn.target = "_blank";
    }

    /* ==========================================
       BOTONES RESERVAR
    ========================================== */
    function activarBotonesReserva() {

        const botones =
            document.querySelectorAll(".reservar-btn");

        botones.forEach(btn => {

            btn.addEventListener("click", () => {

                const servicio =
                    btn.dataset.servicio;

                const mensaje =
                    `Hola, deseo reservar una cita para: ${servicio}`;

                const url =
                    `https://wa.me/${numeroWhatsapp}?text=${encodeURIComponent(mensaje)}`;

                window.open(url, "_blank");
            });

        });
    }

    /* ==========================================
   FORMULARIO - FORMSPREE
========================================== */
    if (formCita) {

        formCita.addEventListener("submit", async (e) => {

            e.preventDefault();

            const boton = formCita.querySelector("button");

            boton.disabled = true;
            boton.innerHTML = `
    <span class="spinner-border spinner-border-sm me-2"></span>
    Enviando...
`;

            try {

                const respuesta = await fetch(formCita.action, {

                    method: "POST",

                    body: new FormData(formCita),

                    headers: {
                        "Accept": "application/json"
                    }

                });

                if (respuesta.ok) {

                    Swal.fire({

                        icon: "success",

                        title: "¡Solicitud enviada!",

                        text: "Hemos recibido tu solicitud. Nos comunicaremos contigo muy pronto.",

                        confirmButtonColor: "#B89C65"

                    });

                    formCita.reset();

                } else {

                    Swal.fire({

                        icon: "error",

                        title: "No se pudo enviar",

                        text: "Inténtalo nuevamente en unos minutos.",

                        confirmButtonColor: "#B89C65"

                    });

                }

            } catch (error) {

                Swal.fire({

                    icon: "error",

                    title: "Error de conexión",

                    text: "Verifica tu conexión a Internet.",

                    confirmButtonColor: "#B89C65"

                });

            }

            boton.disabled = false;
            boton.innerHTML = `
    <i class="bi bi-calendar-check me-2"></i>
    Solicitar cita
`;

        });

    }

    /* ==========================================
       ANIMACIONES SCROLL
    ========================================== */
    function activarAnimaciones() {

        const elementos =
            document.querySelectorAll(".fade-up");

        const observer =
            new IntersectionObserver(entradas => {

                entradas.forEach(entrada => {

                    if (entrada.isIntersecting) {

                        entrada.target.classList.add("show");

                    }

                });

            }, {
                threshold: 0.15
            });

        elementos.forEach(el =>
            observer.observe(el)
        );
    }

    /* ==========================================
       NAVBAR SCROLL
    ========================================== */
    window.addEventListener("scroll", () => {

        const navbar =
            document.getElementById("navbar");

        if (!navbar) return;

        if (window.scrollY > 50) {

            navbar.style.boxShadow =
                "0 5px 20px rgba(0,0,0,.15)";

        } else {

            navbar.style.boxShadow = "none";

        }

    });

    

    /* ==========================================
       INICIALIZAR
    ========================================== */
    renderizarServicios(servicios);

});
/* ==========================================
   BOTÓN VOLVER ARRIBA
========================================== */

if (scrollTopBtn) {

    window.addEventListener("scroll", () => {

        if (window.scrollY > 500) {
            scrollTopBtn.classList.add("show");
        } else {
            scrollTopBtn.classList.remove("show");
        }

    });

}