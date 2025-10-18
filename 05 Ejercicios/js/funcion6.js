function validarn(e) {
    var codigoTecla = (document.all) ? e.keyCode : e.which;
    if (codigoTecla == 8) return true; 
    var regla = /[0-9]/; 
    var caracter = String.fromCharCode(codigoTecla);
    return regla.test(caracter);
}

function calcularEdad() {
    const anioInput = parseInt(document.getElementById("añoi").value);
    const mesInput = parseInt(document.getElementById("mesi").value);
    const diaInput = parseInt(document.getElementById("diai").value);

    if (isNaN(anioInput) || isNaN(mesInput) || isNaN(diaInput)) {
        alert("Por favor, ingresa el año, mes y día de nacimiento.");
        return;
    }
    
    if (mesInput < 1 || mesInput > 12) {
        alert("El mes debe ser un número entre 1 y 12.");
        return;
    }
    if (diaInput < 1 || diaInput > 31) {
        alert("El día debe ser un número entre 1 y 31.");
        return;
    }
    
    const nacimientoDate = new Date(anioInput, mesInput - 1, diaInput);
    const hoyDate = new Date();

    if (nacimientoDate.getFullYear() !== anioInput || nacimientoDate > hoyDate) {
        alert("La fecha de nacimiento no es válida o es posterior a la fecha actual.");
        return;
    }

    let edadCalculada = hoyDate.getFullYear() - nacimientoDate.getFullYear();
    
    const mesHoy = hoyDate.getMonth();
    const diaHoy = hoyDate.getDate();
    
    if (mesHoy < (mesInput - 1) || (mesHoy === (mesInput - 1) && diaHoy < diaInput)) {
        edadCalculada--; 
    }

    document.getElementById("edadi").value = edadCalculada + " años";
}

function borrarf() {
    document.getElementById("edadi").value = "";
    document.getElementById("diai").value = "";
    document.getElementById("mesi").value = "";
    document.getElementById("añoi").value = "";
}