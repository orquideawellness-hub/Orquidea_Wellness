document.addEventListener("DOMContentLoaded", () => {
    const fotoInput = document.getElementById("fotoInput");
    const previewOriginal = document.getElementById("previewOriginal");
    const btnProbar = document.getElementById("btnProbar");
    const previewAntes = document.getElementById("previewAntes");
    const previewIA = document.getElementById("previewIA");
    const btnRecomendaciones = document.getElementById("btnRecomendaciones");
    const recomendaciones = document.getElementById("recomendaciones");

    function resetUI() {
        previewIA.classList.add("d-none");
        previewAntes.classList.add("d-none");
        recomendaciones.innerHTML = "";
        recomendaciones.style.display = "none";
        btnRecomendaciones.classList.add("d-none");
        btnRecomendaciones.textContent = "Ver sugerencias adicionales";
    }

    // Toggle de recomendaciones (AHORA INTEGRADO)
    btnRecomendaciones.addEventListener("click", () => {
        const oculto = recomendaciones.style.display === "none";
        recomendaciones.style.display = oculto ? "block" : "none";
        btnRecomendaciones.textContent = oculto ? "Ocultar sugerencias" : "Ver sugerencias adicionales";
    });

    btnProbar.addEventListener("click", async () => {
        const archivo = fotoInput.files[0];
        if (!archivo) { alert("Sube una foto."); return; }

        const formData = new FormData();
        formData.append("foto", archivo);
        formData.append("tratamiento", "Antiage");

        btnProbar.disabled = true;
        btnProbar.textContent = "Procesando...";

        try {
            const response = await fetch("https://orquidea-wellness-ia-py.onrender.com/procesar-simulacion", {
                method: "POST",
                body: formData
            });

            const res = await response.json();
            console.log("Datos recibidos de Python:", res);

            // Mostrar imágenes
            previewAntes.src = URL.createObjectURL(archivo);
            previewAntes.classList.remove("d-none");
            previewIA.src = res.imagen_url;
            previewIA.classList.remove("d-none");

            // Mostrar resultados (Defensivo: si no existe, muestra N/A)
            const scoreContainer = document.getElementById("scoreContainer");
            scoreContainer.innerHTML = `
                <div class="alert alert-info mt-3">
                    <h5>🧬 Skin Score: ${res.skinScore ?? 'N/A'}/100</h5>
                    <p><strong>Estado:</strong> ${res.condicion ?? 'N/A'}</p>
                    <p><strong>Valoración:</strong> ${res.valoracion ?? 'N/A'}</p>
                    <p><strong>Edad aparente:</strong> ${res.edadAparente ?? 'N/A'}</p>
                </div>`;

            // Cargar recomendaciones
            recomendaciones.innerHTML = "";
            (res.recomendaciones || []).forEach(t => {
                const li = document.createElement("li");
                li.textContent = t;
                recomendaciones.appendChild(li);
            });

            btnRecomendaciones.classList.remove("d-none");

        } catch (e) {
            alert("Error: " + e.message);
        } finally {
            btnProbar.disabled = false;
            btnProbar.textContent = "Probar simulación";
        }
    });
});document.addEventListener("DOMContentLoaded", () => {
    const fotoInput = document.getElementById("fotoInput");
    const btnProbar = document.getElementById("btnProbar");
    const previewAntes = document.getElementById("previewAntes");
    const previewIA = document.getElementById("previewIA");
    const btnRecomendaciones = document.getElementById("btnRecomendaciones");
    const recomendaciones = document.getElementById("recomendaciones");
    const scoreContainer = document.getElementById("scoreContainer");

    function resetUI() {
        previewIA.classList.add("d-none");
        previewAntes.classList.add("d-none");
        recomendaciones.innerHTML = "";
        recomendaciones.style.display = "none";
        btnRecomendaciones.classList.add("d-none");
        btnRecomendaciones.textContent = "Ver sugerencias adicionales";
        scoreContainer.innerHTML = "";
    }

    btnRecomendaciones.addEventListener("click", () => {
        const oculto = recomendaciones.style.display === "none";
        recomendaciones.style.display = oculto ? "block" : "none";
        btnRecomendaciones.textContent = oculto ? "Ocultar sugerencias" : "Ver sugerencias adicionales";
    });

    btnProbar.addEventListener("click", async () => {
        const archivo = fotoInput.files[0];
        if (!archivo) { alert("Sube una foto."); return; }

        const formData = new FormData();
        formData.append("foto", archivo);
        formData.append("tratamiento", "Antiage");

        btnProbar.disabled = true;
        btnProbar.textContent = "Procesando...";

        try {
            const response = await fetch("https://orquidea-wellness-ia-py.onrender.com/procesar-simulacion", {
                method: "POST",
                body: formData
            });

            const res = await response.json();
            console.log("Datos recibidos:", res);

            previewAntes.src = URL.createObjectURL(archivo);
            previewAntes.classList.remove("d-none");
            previewIA.src = res.imagen_url;
            previewIA.classList.remove("d-none");

            // Renderizado de datos con validación
            scoreContainer.innerHTML = `
                <div class="alert alert-info mt-3">
                    <h5>🧬 Skin Score: ${res.skinScore || '0'}/100</h5>
                    <p><strong>Estado:</strong> ${res.condicion || 'N/A'}</p>
                    <p><strong>Valoración:</strong> ${res.valoracion || 'N/A'}</p>
                    <p><strong>Edad aparente:</strong> ${res.edadAparente || 'N/A'} años</p>
                </div>`;

            recomendaciones.innerHTML = "";
            (res.recomendaciones || []).forEach(t => {
                const li = document.createElement("li");
                li.textContent = t;
                recomendaciones.appendChild(li);
            });

            btnRecomendaciones.classList.remove("d-none");
        } catch (e) {
            alert("Error al conectar con la IA: " + e.message);
        } finally {
            btnProbar.disabled = false;
            btnProbar.textContent = "Probar simulación";
        }
    });
});