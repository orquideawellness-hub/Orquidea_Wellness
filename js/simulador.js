// ===============================
// VISTA PREVIA DE LA FOTO
// ===============================

const fotoInput = document.getElementById("fotoInput");
const previewOriginal = document.getElementById("previewOriginal");

fotoInput.addEventListener("change", function () {

    const archivo = this.files[0];

    if (!archivo) return;

    previewOriginal.src = URL.createObjectURL(archivo);
    previewOriginal.classList.remove("d-none");

});


// ===============================
// ELEMENTOS DEL SIMULADOR
// ===============================

const btnProbar = document.getElementById("btnProbar");
const previewIA = document.getElementById("previewIA");
const btnRecomendaciones = document.getElementById("btnRecomendaciones");
const recomendaciones = document.getElementById("recomendaciones");


// ===============================
// BOTÓN PROBAR
// ===============================

btnProbar.addEventListener("click", async () => {

    const tratamientos = [...document.querySelectorAll(".tratamiento:checked")]
        .map(t => t.value);

    if (tratamientos.length === 0) {

        alert("Seleccione al menos un tratamiento.");

        return;

    }

    try {

        const resultado = await API.ejecutarSimulador(tratamientos);

        // Imagen de resultado (por ahora es una imagen de prueba)
        previewIA.src = resultado.imagen;
        previewIA.classList.remove("d-none");

        // Ocultar recomendaciones inicialmente
        recomendaciones.style.display = "none";
        recomendaciones.innerHTML = "";

        resultado.recomendaciones.forEach(r => {

            recomendaciones.innerHTML += `<li>${r}</li>`;

        });

        btnRecomendaciones.classList.remove("d-none");

    } catch (error) {

        console.error(error);

        alert("Error al ejecutar el simulador.");

    }

});


// ===============================
// MOSTRAR / OCULTAR RECOMENDACIONES
// ===============================

btnRecomendaciones.addEventListener("click", () => {

    if (recomendaciones.style.display === "none") {

        recomendaciones.style.display = "block";
        btnRecomendaciones.textContent = "Ocultar sugerencias";

    } else {

        recomendaciones.style.display = "none";
        btnRecomendaciones.textContent = "Ver sugerencias adicionales";

    }

});