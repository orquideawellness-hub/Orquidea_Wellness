function ejecutarSimulador() {
  const input = document.getElementById("inputSimulador").value.toLowerCase().trim();
  const resultado = document.getElementById("resultadoSimulador");

  if (!input) {
    resultado.innerHTML = "⚠️ Describe cómo te sientes para generar una recomendación.";
    return;
  }

  let respuesta = "";

  // 🧠 Reglas simples de simulación IA
  if (input.includes("estres") || input.includes("ansiedad") || input.includes("tension")) {
    respuesta = `
      🌿 Recomendación de Bienestar:<br><br>
      • Terapia de respiración profunda (5-10 min)<br>
      • Aromaterapia con lavanda<br>
      • Masaje cervical relajante<br>
      • Evitar pantallas por 30 min<br><br>
      💡 Enfoque: reducir activación del sistema nervioso
    `;
  }

  else if (input.includes("dolor") || input.includes("musculo") || input.includes("cuerpo")) {
    respuesta = `
      💆 Recomendación Física:<br><br>
      • Masaje terapéutico localizado<br>
      • Estiramientos suaves<br>
      • Aplicación de calor local<br>
      • Hidratación constante<br><br>
      💡 Enfoque: recuperación muscular y circulación
    `;
  }

  else if (input.includes("cansancio") || input.includes("fatiga") || input.includes("agotado")) {
    respuesta = `
      🌙 Recomendación de Recuperación:<br><br>
      • Descanso profundo (7-8 horas)<br>
      • Té relajante (manzanilla o menta)<br>
      • Evitar sobreestimulación<br>
      • Meditación ligera<br><br>
      💡 Enfoque: restauración de energía
    `;
  }

  else {
    respuesta = `
      🌸 Recomendación General:<br><br>
      • Masaje relajante completo<br>
      • Sesión de respiración consciente<br>
      • Actividad ligera al aire libre<br>
      • Hidratación y descanso<br><br>
      💡 Enfoque: equilibrio general cuerpo-mente
    `;
  }

  resultado.innerHTML = respuesta;
}