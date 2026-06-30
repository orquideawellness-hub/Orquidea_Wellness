exports.generarImagen = async (tratamientos, resumen) => {

    const tratamientosTexto = Array.isArray(tratamientos)
        ? tratamientos.join(", ")
        : String(tratamientos || "");

    // 🔥 PROMPT PRO (CONSISTENTE Y CONTROLADO)
    const prompt = `
dermatology clinical photography, realistic patient portrait,
neutral adult patient, front face, professional medical studio lighting,
clean white clinic background, high detail skin texture,

condition: ${resumen},
treatments: ${tratamientosTexto},

before and after skincare visualization style,
scientific aesthetic, ultra realistic, 4k, sharp focus
`;

    const url = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`;

    return url;
};