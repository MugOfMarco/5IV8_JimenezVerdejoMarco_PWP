function filtrarEntrada(e){
    var tecla = (document.all)? e.keyCode : e.which;
    if (tecla == 8) return true;
    var expresion = /[0-9\d .]/;
    var caracter = String.fromCharCode(tecla);
    return expresion.test(caracter);
    
}

function generarPromedio(){
    var val1 = parseFloat(document.getElementById("nota1").value);
    var val2 = parseFloat(document.getElementById("nota2").value);
    var val3 = parseFloat(document.getElementById("nota3").value);
    var valExamen = parseFloat(document.getElementById("notaExamen").value);
    var valProyecto = parseFloat(document.getElementById("notaProyecto").value);

    var promedioParcial = (val1 + val2 + val3) / 3;

    var pesoParciales = promedioParcial * 0.55;
    var pesoExamen = valExamen * 0.3;
    var pesoProyecto = valProyecto * 0.15;

    var califTotal = pesoParciales + pesoExamen + pesoProyecto;

    document.getElementById("promedioFinal").value = califTotal.toFixed(2);
}

function limpiarDatos(){
    document.getElementById("nota1").value = "";
    document.getElementById("nota2").value = "";
    document.getElementById("nota3").value = "";
    document.getElementById("notaExamen").value = "";
    document.getElementById("notaProyecto").value = "";
    document.getElementById("promedioFinal").value = "";
}