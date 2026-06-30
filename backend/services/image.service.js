exports.generarImagen = async (tratamientos, resumen) => {

    const tratamientosTexto = Array.isArray(tratamientos)
        ? tratamientos.join(", ")
        : String(tratamientos || "");

    // =====================================================
    // 🧠 PROMPT CLÍNICO (MODO IA VISUAL)
    // =====================================================
    const prompt = `
dermatology clinical photography, realistic medical portrait,
adult patient, neutral expression, front view,
clean clinical white background, soft studio lighting,
high detail skin texture, realistic pores,

condition: ${resumen},
treatments: ${tratamientosTexto},

before and after skincare comparison,
ultra realistic, 4k, sharp focus, dermatology aesthetic
`;

    // =====================================================
    // 🚨 MODO ACTUAL (PRODUCCIÓN SEGURA)
    // =====================================================
    // Ya NO dependemos de APIs externas (evita:
    // - ENOTFOUND
    // - rate limit
    // - queue full
    // - latency)
    // =====================================================

    const useExternalImageAPI = false;

    // =====================================================
    // 🌐 OPCIONAL (FUTURO - DESACTIVADO)
    // =====================================================
    if (useExternalImageAPI) {

        // ⚠️ Pollinations (solo referencia)
        const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

        return url;
    }

    // =====================================================
    // 🧴 MODO LOCAL (RECOMENDADO)
    // =====================================================
    // No genera imagen aquí, SOLO metadata útil

    return {
        mode: "local_pro",
        prompt,
        status: "handled_by_controller",
        note: "Imagen generada en controller con sharp (antes/después clínico)"
    };
};