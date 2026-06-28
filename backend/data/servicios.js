const servicios = [

    /* ==========================
       FACIALES
    ========================== */
    {
        categoria: "FACIAL",
        tratamiento: "Limpieza Profunda",
        descripcion: "Limpieza facial profunda para revitalizar y purificar la piel.",
        precio: 80
    },
    {
        categoria: "FACIAL",
        tratamiento: "Limpieza + Dermaplaning",
        descripcion: "Exfoliación avanzada para una piel más suave y luminosa.",
        precio: 100
    },
    {
        categoria: "FACIAL",
        tratamiento: "Limpieza + Hydrafacial",
        descripcion: "Hidratación intensiva y limpieza profunda con tecnología Hydrafacial.",
        precio: 150
    },
    {
        categoria: "FACIAL",
        tratamiento: "Exosomas",
        descripcion: "Tratamiento regenerativo para mejorar la calidad de la piel.",
        precio: 250
    },
    {
        categoria: "FACIAL",
        tratamiento: "Pink Glow",
        descripcion: "Protocolo iluminador que aporta luminosidad y uniformidad.",
        precio: 350
    },
    {
        categoria: "FACIAL",
        tratamiento: "Yellow Peeling",
        descripcion: "Peeling químico para renovación celular.",
        precio: 150
    },
    {
        categoria: "FACIAL",
        tratamiento: "Rosácea",
        descripcion: "Tratamiento calmante para pieles sensibles con rosácea.",
        precio: 100
    },
    {
        categoria: "FACIAL",
        tratamiento: "Deshidratación",
        descripcion: "Hidratación profunda para restaurar la barrera cutánea.",
        precio: 100
    },
    {
        categoria: "FACIAL",
        tratamiento: "Pigmentación",
        descripcion: "Protocolo despigmentante para unificar el tono de la piel.",
        precio: 100
    },
    {
        categoria: "FACIAL",
        tratamiento: "Antiacné",
        descripcion: "Tratamiento especializado para controlar el acné.",
        precio: 120
    },
    {
        categoria: "FACIAL",
        tratamiento: "Antiage",
        descripcion: "Tratamiento rejuvenecedor y reafirmante.",
        precio: 100
    },
    {
        categoria: "FACIAL",
        tratamiento: "Acné",
        descripcion: "Control y cuidado integral para piel acneica.",
        precio: 100
    },
    {
        categoria: "FACIAL",
        tratamiento: "Dermaplaning",
        descripcion: "Exfoliación mecánica para renovar la piel.",
        precio: 50
    },
    {
        categoria: "FACIAL",
        tratamiento: "DLM Papada",
        descripcion: "Drenaje linfático manual enfocado en la zona submentoniana.",
        precio: 70
    },
    {
        categoria: "FACIAL",
        tratamiento: "Exfoliación de Labios",
        descripcion: "Renovación e hidratación para labios suaves.",
        precio: 50
    },

    /* ==========================
       CORPORALES
    ========================== */
    {
        categoria: "CORPORAL",
        tratamiento: "Exfoliación de Espalda",
        descripcion: "Limpieza y renovación de la piel de la espalda.",
        precio: 80
    },
    {
        categoria: "CORPORAL",
        tratamiento: "Reductor con Enzimas",
        descripcion: "Tratamiento reductor mediante enzimas especializadas.",
        precio: 200
    },
    {
        categoria: "CORPORAL",
        tratamiento: "Reductor con Quemadores",
        descripcion: "Protocolo corporal para apoyar la reducción localizada.",
        precio: 80
    },
    {
        categoria: "CORPORAL",
        tratamiento: "Reductor con Madera",
        descripcion: "Maderoterapia enfocada en moldeado corporal.",
        precio: 80
    },
    {
        categoria: "CORPORAL",
        tratamiento: "Drenaje Postoperatorio",
        descripcion: "Apoyo en la recuperación y disminución de edema.",
        precio: 100
    },

    /* ==========================
       REFLEXOLOGÍA
    ========================== */
    {
        categoria: "REFLEXOLOGIA",
        tratamiento: "Reflexología Podal",
        descripcion: "Estimulación de puntos reflejos para promover bienestar.",
        precio: 60
    },

    /* ==========================
       BIOMAGNETISMO
    ========================== */
    {
        categoria: "HOLISTICO",
        tratamiento: "Biomagnetismo",
        descripcion: "Terapia complementaria basada en el uso de imanes.",
        precio: null
    },

    /* ==========================
       TERAPIA FÍSICA
    ========================== */
    {
        categoria: "TERAPIA FISICA",
        tratamiento: "Alivio del Dolor",
        descripcion: "Intervención terapéutica para disminuir el dolor.",
        precio: 60
    },
    {
        categoria: "TERAPIA FISICA",
        tratamiento: "Parálisis Facial",
        descripcion: "Rehabilitación especializada para recuperación funcional.",
        precio: 60
    },
    {
        categoria: "TERAPIA FISICA",
        tratamiento: "Descarga Muscular",
        descripcion: "Técnicas terapéuticas para liberar tensión muscular.",
        precio: 60
    },
    {
        categoria: "TERAPIA FISICA",
        tratamiento: "Espolón Calcáneo",
        descripcion: "Tratamiento para aliviar dolor y mejorar la marcha.",
        precio: 60
    },
    {
        categoria: "TERAPIA FISICA",
        tratamiento: "Escoliosis",
        descripcion: "Programa terapéutico individualizado.",
        precio: 60
    },
    {
        categoria: "TERAPIA FISICA",
        tratamiento: "Tendinopatía",
        descripcion: "Recuperación funcional y manejo del dolor.",
        precio: 60
    },
    {
        categoria: "TERAPIA FISICA",
        tratamiento: "Punción Seca",
        descripcion: "Técnica invasiva para puntos gatillo miofasciales.",
        precio: 70
    },
    {
        categoria: "TERAPIA FISICA",
        tratamiento: "Parkinson",
        descripcion: "Fisioterapia para mejorar movilidad y funcionalidad.",
        precio: 60
    },
    {
        categoria: "TERAPIA FISICA",
        tratamiento: "Alzheimer",
        descripcion: "Intervenciones terapéuticas para mantener independencia.",
        precio: 60
    },

    /* ==========================
       HOLÍSTICOS
    ========================== */
    {
        categoria: "HOLISTICO",
        tratamiento: "Acupuntura",
        descripcion: "Terapia tradicional enfocada en el equilibrio energético.",
        precio: 60
    },
    {
        categoria: "HOLISTICO",
        tratamiento: "Ventosas",
        descripcion: "Terapia de succión para aliviar tensión y dolor.",
        precio: 60
    },
    {
        categoria: "HOLISTICO",
        tratamiento: "Piedras Calientes",
        descripcion: "Masaje terapéutico con piedras volcánicas.",
        precio: 60
    },
    {
        categoria: "HOLISTICO",
        tratamiento: "Bambuterapia",
        descripcion: "Estimulación corporal mediante cañas de bambú.",
        precio: 60
    },
    {
        categoria: "HOLISTICO",
        tratamiento: "Chocolaterapia",
        descripcion: "Experiencia relajante e hidratante.",
        precio: 70
    },
    {
        categoria: "HOLISTICO",
        tratamiento: "Moxibustión",
        descripcion: "Aplicación de calor terapéutico mediante artemisa.",
        precio: 60
    },
    {
        categoria: "HOLISTICO",
        tratamiento: "Pindas Herbales",
        descripcion: "Masaje con saquitos de hierbas aromáticas.",
        precio: 80
    },

    /* ==========================
       MASAJES
    ========================== */
    {
        categoria: "MASAJES",
        tratamiento: "Relajante",
        descripcion: "Masaje para reducir estrés y promover relajación.",
        precio: 50
    },
    {
        categoria: "MASAJES",
        tratamiento: "Descontracturante",
        descripcion: "Liberación de tensiones musculares profundas.",
        precio: 60
    },
    {
        categoria: "MASAJES",
        tratamiento: "Deportivo",
        descripcion: "Preparación y recuperación muscular.",
        precio: 60
    },
    {
        categoria: "MASAJES",
        tratamiento: "Drenaje",
        descripcion: "Estimulación del sistema linfático.",
        precio: 50
    },

    /* ==========================
       ORIENTACIÓN PSICOLÓGICA
    ========================== */
    {
        categoria: "PSICOLOGIA",
        tratamiento: "Consejería Individual",
        descripcion: "Espacio de escucha y orientación personalizada.",
        precio: null
    },
    {
        categoria: "PSICOLOGIA",
        tratamiento: "Manejo del Estrés",
        descripcion: "Estrategias para afrontar situaciones demandantes.",
        precio: null
    },
    {
        categoria: "PSICOLOGIA",
        tratamiento: "Regulación Emocional",
        descripcion: "Fortalecimiento de habilidades emocionales.",
        precio: null
    },
    {
        categoria: "PSICOLOGIA",
        tratamiento: "Orientación Familiar",
        descripcion: "Acompañamiento para mejorar la dinámica familiar.",
        precio: null
    },
    {
        categoria: "PSICOLOGIA",
        tratamiento: "Desarrollo Personal",
        descripcion: "Impulso del crecimiento y bienestar integral.",
        precio: null
    },
    {
        categoria: "PSICOLOGIA",
        tratamiento: "Psicoeducación",
        descripcion: "Información y herramientas para el autocuidado.",
        precio: null
    }
];
module.exports = servicios;