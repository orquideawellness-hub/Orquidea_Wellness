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
    // RESET UI
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

        const archivo = fotoInput.files[0];
        const tratamientos = [...document.querySelectorAll(".tratamiento:checked")].map(t => t.value);

        if (!archivo) { alert("Por favor, sube una foto."); return; }
        if (tratamientos.length === 0) { alert("Seleccione al menos un tratamiento."); return; }

        // Crear FormData para enviar archivo + datos
        const formData = new FormData();
        formData.append("foto", archivo);
        formData.append("tratamientos", JSON.stringify(tratamientos));

        try {
            isLoading = true;
            btnProbar.disabled = true;
            btnProbar.textContent = "Procesando...";
            resetUI();

            // Llamada al endpoint PRO que procesa imágenes
            const response = await fetch(`${API_BASE}/api/ia/simulador-img`, {
                method: "POST",
                body: formData 
            });

            const resultado = await response.json();
            if (!resultado.ok) throw new Error(resultado.error);

            console.log("RESULTADO SIMULADOR:", resultado);

            // 🧠 ANTES / DESPUÉS
            if (resultado.imagenAntes) {
                previewOriginal.src = resultado.imagenAntes;
                previewOriginal.classList.remove("d-none");
            }
            if (resultado.imagenDespues) {
                previewIA.src = resultado.imagenDespues;
                previewIA.classList.remove("d-none");
            }

            // 🧬 SCORE CLÍNICO
            if (resultado.skinScore !== undefined) {
                const scoreDiv = document.createElement("div");
                const valoracion = resultado.metadata?.confidence || "media";
                scoreDiv.innerHTML = `
                    <div class="alert alert-info mt-3">
                        <h5>🧬 Skin Score: ${resultado.skinScore}/100</h5>
                        <p><strong>Condición:</strong> ${resultado.labels?.join(", ") || "general"}</p>
                        <small>Valoración: ${valoracion}</small>
                    </div>`;
                document.getElementById("scoreContainer")?.replaceChildren(scoreDiv);
            }

            // 📋 RECOMENDACIONES
            (resultado.recomendaciones || []).forEach(texto => {
                const li = document.createElement("li");
                li.textContent = texto;
                recomendaciones.appendChild(li);
            });

            btnRecomendaciones.classList.remove("d-none");
        } catch (err) {
            console.error("ERROR SIMULADOR:", err);
            alert("Error al ejecutar el simulador: " + err.message);
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
        btnRecomendaciones.textContent = oculto ? "Ocultar sugerencias" : "Ver sugerencias adicionales";
    });
});