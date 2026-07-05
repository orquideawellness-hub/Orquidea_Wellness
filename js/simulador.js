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
    // BOTÓN PROBAR (CORREGIDO)
    // ===============================
    btnProbar.addEventListener("click", async () => {
        if (isLoading) return;

        const archivo = fotoInput.files[0];
        const tratamientos = [...document.querySelectorAll(".tratamiento:checked")].map(t => t.value);

        if (!archivo) { alert("Por favor, sube una foto."); return; }
        if (tratamientos.length === 0) { alert("Seleccione al menos un tratamiento."); return; }

        const formData = new FormData();
        formData.append("foto", archivo);
        formData.append("tratamiento", tratamientos[0]); // Enviamos al menos el primero

        try {
            isLoading = true;
            btnProbar.disabled = true;
            btnProbar.textContent = "Procesando...";
            resetUI();

            // Llamada al endpoint de Render
            const response = await fetch("https://orquidea-wellness-ia-py.onrender.com/procesar-simulacion", {
                method: "POST",
                body: formData
            });

            const resultado = await response.json();
            if (!resultado.ok) throw new Error("Error en el servidor de IA");

            console.log("RESULTADO SIMULADOR:", resultado);

            // 1. Mostrar imágenes
            const previewAntes = document.getElementById("previewAntes");
            const previewIA = document.getElementById("previewIA");
            
            // Asumimos que la imagen original viene del archivo subido
            const reader = new FileReader();
            reader.onload = (e) => {
                previewAntes.src = e.target.result;
                previewAntes.classList.remove("d-none");
            };
            reader.readAsDataURL(archivo);

            // La IA nos devuelve la imagen procesada
            previewIA.src = resultado.imagen_url;
            previewIA.classList.remove("d-none");

            // 2. CORRECCIÓN: Score, Estado, Valoración y Edad
            if (resultado.skinScore !== undefined) {
                const scoreDiv = document.createElement("div");
                scoreDiv.innerHTML = `
                    <div class="alert alert-info mt-3">
                        <h5>🧬 Skin Score: ${resultado.skinScore}/100</h5>
                        <p><strong>Estado:</strong> ${resultado.condicion}</p>
                        <p><strong>Valoración:</strong> ${resultado.valoracion}</p>
                        <p><strong>Edad aparente:</strong> ${resultado.edadAparente}</p>
                    </div>`;
                document.getElementById("scoreContainer")?.replaceChildren(scoreDiv);
            }

            // 3. Recomendaciones
            const recList = document.getElementById("recomendaciones");
            recList.innerHTML = ""; // Limpiar antes de añadir
            (resultado.recomendaciones || []).forEach(texto => {
                const li = document.createElement("li");
                li.textContent = texto;
                recList.appendChild(li);
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
});