const fotoInput = document.getElementById("fotoInput");

const previewOriginal = document.getElementById("previewOriginal");

fotoInput.addEventListener("change", function () {

    const archivo = this.files[0];

    if (!archivo) return;

    previewOriginal.src = URL.createObjectURL(archivo);

    previewOriginal.classList.remove("d-none");

});