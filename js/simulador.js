document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // FOTO PREVIEW
    // ===============================
    const fotoInput = document.getElementById("fotoInput");
    const previewOriginal = document.getElementById("previewOriginal");

    if (fotoInput) {
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
    // ESTADO INICIAL (CLAVE)
    // ===============================
    if (previewIA) previewIA.classList.add("d-none");
    if (btnRecomendaciones) btnRecomendaciones.classList.add("d-none");
    if (recomendaciones) recomendaciones.innerHTML = "";

    // ===============================
    // CLICK PROBAR
    // ===============================
    if (btnProbar) {
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
                if (resultado.imagen && previewIA) {
                    previewIA.src = resultado.imagen;
                    previewIA.classList.remove("d-none");
                }

                // ===========================
                // RECOMENDACIONES
                // ===========================
                if (recomendaciones) {

                    recomendaciones.innerHTML = "";

                    resultado.recomendaciones.forEach(texto => {
                        const li = document.createElement("li");
                        li.textContent = texto;
                        recomendaciones.appendChild(li);
                    });
                }

                // mostrar botón
                if (btnRecomendaciones) {
                    btnRecomendaciones.classList.remove("d-none");
                    btnRecomendaciones.textContent = "Ver sugerencias adicionales";
                }

                // ocultar lista al inicio
                if (recomendaciones) {
                    recomendaciones.style.display = "none";
                }

            } catch (err) {
                console.error(err);
                alert("Error al ejecutar el simulador.");
            }

        });
    }

    // ===============================
    // TOGGLE RECOMENDACIONES
    // ===============================
    if (btnRecomendaciones && recomendaciones) {
        btnRecomendaciones.addEventListener("click", () => {

            const oculto = recomendaciones.style.display === "none";

            recomendaciones.style.display = oculto ? "block" : "none";

            btnRecomendaciones.textContent = oculto
                ? "Ocultar sugerencias"
                : "Ver sugerencias adicionales";

        });
    }

});