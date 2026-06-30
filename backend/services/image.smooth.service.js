const sharp = require("sharp");

/**
 * 🧴 Suavizado tipo dermatología clínica PRO
 * - reduce textura de piel
 * - mantiene rasgos faciales
 * - evita look "borroso artificial"
 */
exports.suavizarImagen = async (buffer) => {
    try {

        const result = await sharp(buffer)
            .resize(1024, 1024, { fit: "cover" })

            // 🔬 ajuste color clínico leve
            .modulate({
                brightness: 1.03,
                saturation: 1.08
            })

            // 🧴 suavizado controlado (clave clínica)
            .blur(0.8)

            // 🔍 suavizado de grano fino (más realista que sharpen)
            .median(2)

            .jpeg({ quality: 92 })

            .toBuffer();

        return `data:image/jpeg;base64,${result.toString("base64")}`;

    } catch (error) {
        console.error("ERROR smoothing:", error);

        return null;
    }
};