function validarEntradaNumerica(e){
    var teclaCodigo = (document.all)? e.keyCode : e.which;
    if (teclaCodigo == 8) return true;
    var expresion = /[0-9\d .]/;
    var caracter = String.fromCharCode(teclaCodigo);
    return expresion.test(caracter);
}

function checarRangoMeses() {
    var campoMeses = document.getElementById("periodoTiempo");
    var numMeses = parseInt(campoMeses.value);

    if (numMeses < 1 || numMeses > 18) {
        alert("Ingresar mínimo un mes y máximo 18 meses");
        return false;
    }
    return true;
}

function procesarCalculo(){
    var monto = document.getElementById("montoCapital").value;
    var meses = document.getElementById("periodoTiempo").value;

    var capitalBase = parseFloat(monto);
    var periodos = parseInt(meses);
    const tasaFijaMensual = 0.00648; 

    var montoTotal = capitalBase * Math.pow((1 + tasaFijaMensual), periodos);

    document.getElementById("saldoFinal").value = "$" + montoTotal.toFixed(2);
}

function limpiarCampos(){
    document.getElementById("saldoFinal").value = "";
    document.getElementById("montoCapital").value = "";
    document.getElementById("periodoTiempo").value = "";
}