document.addEventListener("DOMContentLoaded", () => {

    // ===============================
    // VALIDACIÓN API
    // ===============================
    if (typeof API === "undefined") {
        console.error("❌ API no está definida (revisa api.js)");
        return;
    }

    // ===============================
    // ELEMENTOS
    // ===============================
    const fotoInput = document.getElementById("fotoInput");
    const previewOriginal = document.getElementById("previewOriginal");

    const btnProbar = document.getElementById("btnProbar");
    const previewIA = document.getElementById("previewIA");
    const btnRecomendaciones = document.getElementById("btnRecomendaciones");
    const recomendaciones = document.getElementById("recomendaciones");

    if (!btnProbar || !previewIA || !btnRecomendaciones || !recomendaciones) {
        console.error("❌ Falta algún elemento del DOM del simulador");
        return;
    }

    // ===============================
    // PREVIEW IMAGEN ORIGINAL
    // ===============================
    if (fotoInput && previewOriginal) {
        fotoInput.addEventListener("change", function () {
            const archivo = this.files?.[0];
            if (!archivo) return;

            previewOriginal.src = URL.createObjectURL(archivo);
            previewOriginal.classList.remove("d-none");
        });
    }

    // ===============================
    // ESTADO INICIAL
    // ===============================
    function resetUI() {
        previewIA.classList.add("d-none");
        previewIA.src = "";

        recomendaciones.innerHTML = "";
        recomendaciones.style.display = "none";

        btnRecomendaciones.classList.add("d-none");
        btnRecomendaciones.textContent = "Ver sugerencias adicionales";
    }

    resetUI();

    let isLoading = false;

    // ===============================
    // BOTÓN PROBAR
    // ===============================
    btnProbar.addEventListener("click", async () => {

        if (isLoading) return;

        const tratamientos = [...document.querySelectorAll(".tratamiento:checked")]
            .map(t => t.value);

        if (tratamientos.length === 0) {
            alert("Seleccione al menos un tratamiento.");
            return;
        }

        try {
            isLoading = true;
            btnProbar.disabled = true;
            btnProbar.textContent = "Procesando...";

            resetUI();

            const resultado = await API.ejecutarSimulador(tratamientos);

            console.log("RESULTADO SIMULADOR:", resultado);

            // ===========================
            // IMAGEN IA
            // ===========================
            if (resultado?.imagen) {
                previewIA.src = resultado.imagen;
                previewIA.classList.remove("d-none");
            }

            // ===========================
            // RECOMENDACIONES
            // ===========================
            const lista = Array.isArray(resultado?.recomendaciones)
                ? resultado.recomendaciones
                : [];

            lista.forEach(texto => {
                const li = document.createElement("li");
                li.textContent = texto;
                recomendaciones.appendChild(li);
            });

            btnRecomendaciones.classList.remove("d-none");
            recomendaciones.style.display = "none";

        } catch (err) {
            console.error("ERROR SIMULADOR:", err);
            alert("Error al ejecutar el simulador.");

        } finally {
            isLoading = false;
            btnProbar.disabled = false;
            btnProbar.textContent = "Probar simulación";
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