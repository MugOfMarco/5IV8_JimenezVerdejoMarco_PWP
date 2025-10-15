function aplicarDescuento(){
    var costoInicial = parseFloat(document.getElementById("valorArticulo").value);
    var rebaja = costoInicial * 0.15;
    var costoFinal = costoInicial - rebaja;

    document.getElementById("precioBruto").value = costoInicial.toFixed(2);
    document.getElementById("cantidadRebajada").value = rebaja.toFixed(2);
    document.getElementById("pagoNeto").value = costoFinal.toFixed(2);
}

function soloNumeros(e){
    var codigoTecla = (document.all)? e.keyCode : e.which;
    if (codigoTecla == 8) return true;
    var regla = /[0-9\d .]/;
    var caracter = String.fromCharCode(codigoTecla);
    return regla.test(caracter);
}

function limpiarEntradas(){
    document.getElementById("pagoNeto").value = "";
    document.getElementById("precioBruto").value = "";
    document.getElementById("cantidadRebajada").value = "";
    document.getElementById("valorArticulo").value = "";
}

