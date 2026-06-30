exports.generarImagen = async (imageBuffer, prompt) => {

    const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${process.env.HF_TOKEN}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                inputs: {
                    image: imageBuffer.toString("base64"),
                    prompt: prompt
                }
            })
        }
    );

    if (!response.ok) {
        const err = await response.text();
        throw new Error(err);
    }

    const blob = await response.arrayBuffer();
    const base64 = Buffer.from(blob).toString("base64");

    return `data:image/png;base64,${base64}`;
};