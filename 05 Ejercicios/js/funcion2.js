function permitirNumeros(evento){
    var codigoTecla = (document.all)? evento.keyCode : evento.which;
    if (codigoTecla == 8) return true;
    var patronNumerico = /[0-9\d .]/;
    var caracter = String.fromCharCode(codigoTecla);
    return patronNumerico.test(caracter);
}

function ejecutarCalculoTotal(){
    var salario = parseFloat(document.getElementById("salarioBase").value);
    var venta1 = parseFloat(document.getElementById("montoVenta1").value);
    var venta2 = parseFloat(document.getElementById("montoVenta2").value);
    var venta3 = parseFloat(document.getElementById("montoVenta3").value);

    var bono1 = venta1 * 0.1;
    var bono2 = venta2 * 0.1;
    var bono3 = venta3 * 0.1;

    var sueldoFinal = salario + bono1 + bono2 + bono3;

    document.getElementById("pagoFinal").value = "$" + sueldoFinal.toFixed(2);
    document.getElementById("comision1").value = "$" + bono1.toFixed(2);
    document.getElementById("comision2").value = "$" + bono2.toFixed(2);
    document.getElementById("comision3").value = "$" + bono3.toFixed(2);
}

function limpiarFormulario(){
    document.getElementById("pagoFinal").value = "";
    document.getElementById("comision1").value = "";
    document.getElementById("comision2").value = "";
    document.getElementById("comision3").value = "";
    document.getElementById("montoVenta1").value = "";
    document.getElementById("montoVenta2").value = "";
    document.getElementById("montoVenta3").value = "";
    document.getElementById("salarioBase").value = "";
}