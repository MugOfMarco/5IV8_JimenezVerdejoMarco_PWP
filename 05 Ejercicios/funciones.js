
function validarn(e){
    var teclado = (document.all)? e.keycode : e.wich;
    if (teclado==8) return true;
    var patron = /[0-9\d .]/;

    var codigo = String.fromCharCode(teclado);
    return patron.test(codigo);
}

function interes (){
    var valor = document.getElementById("cantidadi");
    value;

    var parseo = parseFloat(valor);
    alert(parseo);
    var interes = parseo*(0.085);
    alert(interes);
    var total = interes + parseo;
    alert(total);
    document.getElementById("saldoi").value = "$ " + total; // Limite a 2 decimales
}

function borrar(){
       document.getElementById("saldoi").value = " "; // Limite a 2 decimales
           document.getElementById("cantidadi").value = " "; // Limite a 2 decimales

}

