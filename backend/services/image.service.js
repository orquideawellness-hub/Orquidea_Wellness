exports.generarImagen = async (tratamientos, resumen) => {

    const tratamientosTexto = Array.isArray(tratamientos)
        ? tratamientos.join(", ")
        : String(tratamientos || "");

    const prompt = `
dermatology clinical photography, realistic medical portrait,
adult patient, neutral expression, front view,
clean clinical white background, soft studio lighting,
high detail skin texture, realistic skin pores,

condition: ${resumen},
treatments: ${tratamientosTexto},

professional skincare before and after,
ultra realistic, 4k, sharp focus, medical aesthetic
`;

    // 🔥 SERVICIO GRATIS (SIN API KEY)
    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    return url;
};