function procesarPorcentajes(){
    var grupoTotal = parseFloat(document.getElementById("totalAlumnos").value);
    var hombres = parseFloat(document.getElementById("numHombres").value);
    var mujeres = parseFloat(document.getElementById("numMujeres").value);

    var porcentajeH = (hombres * 100) / grupoTotal;
    var porcentajeM = (mujeres * 100) / grupoTotal;

    document.getElementById("resHombres").value = porcentajeH.toFixed(2) + "%";
    document.getElementById("resMujeres").value = porcentajeM.toFixed(2) + "%";
}

function soloEnteros(e){
    var tecla = (document.all)? e.keyCode : e.which;
    if (tecla == 8) return true;
    var regla = /[0-9\d]/;
    var char = String.fromCharCode(tecla);
    return regla.test(char);
}

function reiniciarForm(){
    document.getElementById("resHombres").value = "";
    document.getElementById("resMujeres").value = "";
    document.getElementById("totalAlumnos").value = "";
    document.getElementById("numHombres").value = "";
    document.getElementById("numMujeres").value = "";
}

function verificarYProcesar() {
    var grupoTotal = parseFloat(document.getElementById("totalAlumnos").value);
    var hombres = parseFloat(document.getElementById("numHombres").value);
    var mujeres = parseFloat(document.getElementById("numMujeres").value);

    if (isNaN(grupoTotal) || isNaN(hombres) || isNaN(mujeres)) {
        alert("Por favor, ingrese valores numéricos válidos en todos los campos.");
        return; 
    }

    var conteo = hombres + mujeres;

    if (Math.round(conteo * 100) / 100 !== Math.round(grupoTotal * 100) / 100) {
        alert("La suma de hombres y mujeres no es igual a la cantidad de estudiantes");
        return; 
    }
    
    procesarPorcentajes();
}