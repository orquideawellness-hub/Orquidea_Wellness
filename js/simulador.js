document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // FOTO PREVIEW
    // ===============================
    const fotoInput = document.getElementById("fotoInput");
    const previewOriginal = document.getElementById("previewOriginal");

    if (fotoInput && previewOriginal) {
        fotoInput.addEventListener("change", function () {
            const archivo = this.files[0];
            if (!archivo) return;

            previewOriginal.src = URL.createObjectURL(archivo);
            previewOriginal.classList.remove("d-none");
        });
    }

    // ===============================
    // ELEMENTOS
    // ===============================
    const btnProbar = document.getElementById("btnProbar");
    const previewIA = document.getElementById("previewIA");
    const btnRecomendaciones = document.getElementById("btnRecomendaciones");
    const recomendaciones = document.getElementById("recomendaciones");

    // ===============================
    // VALIDACIÓN DOM (CRÍTICO)
    // ===============================
    if (!btnProbar || !previewIA || !btnRecomendaciones || !recomendaciones) {
        console.error("❌ Falta algún elemento del DOM del simulador");
        return;
    }

    // ===============================
    // ESTADO INICIAL
    // ===============================
    previewIA.classList.add("d-none");
    btnRecomendaciones.classList.add("d-none");
    recomendaciones.innerHTML = "";
    recomendaciones.style.display = "none";

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

            console.log("RESULTADO SIMULADOR:", resultado);

            // ===========================
            // IMAGEN IA
            // ===========================
            if (resultado.imagen) {
                previewIA.src = resultado.imagen;
                previewIA.classList.remove("d-none");
            }

            // ===========================
            // RECOMENDACIONES
            // ===========================
            recomendaciones.innerHTML = "";

            if (Array.isArray(resultado.recomendaciones)) {
                resultado.recomendaciones.forEach(texto => {
                    const li = document.createElement("li");
                    li.textContent = texto;
                    recomendaciones.appendChild(li);
                });
            }

            // ===========================
            // MOSTRAR BOTÓN
            // ===========================
            btnRecomendaciones.classList.remove("d-none");
            btnRecomendaciones.textContent = "Ver sugerencias adicionales";

            // mantener oculto inicialmente
            recomendaciones.style.display = "none";

        } catch (err) {
            console.error("ERROR SIMULADOR:", err);
            alert("Error al ejecutar el simulador.");
        }

    });

    // ===============================
    // TOGGLE RECOMENDACIONES
    // ===============================
    btnRecomendaciones.addEventListener("click", () => {

        const oculto = recomendaciones.style.display === "none";

        recomendaciones.style.display = oculto ? "block" : "none";

        btnRecomendaciones.textContent = oculto
            ? "Ocultar sugerencias"
            : "Ver sugerencias adicionales";

    });

});