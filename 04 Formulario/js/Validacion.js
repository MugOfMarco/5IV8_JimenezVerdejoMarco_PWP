/*
Java script es un lenguaje multiparadigma,
Acepta la programación funcional, estructurada, POO, orientada a eventos
Dentro de JS, no existe el typado de variables 
    (int, string, float,etc.)

Solo existen 3 tipos de variables de acuaerdo al estandar ES6
    (VAR, LET, CONST)
*/

function validar(formulario){
    //quiero validar que el campo nombre acepte mas de 3 caracteres
    if(formulario.nombre.value.length < 4){
        alert("Por favor escriba mas de 3 caracteres en el campo nombre");
        formulario.nombre.focus();
        return false;
    }

    //validación para unicamente letras
    var checkStr = formulario.nombre.value;
    alert(checkStr);

    var abcOK = "QWERTYUIOPASDFGHJKLÑZXCVBNM" + "qwertyuiopasdfghjklzxcvbnm"

    var allvaldo = true;

    //tenemos que comparar la cadena de nombre vs abc

    for(var i = 0; i <checkStr.length; i++){
        var caracteres = checkStr.charAt(i);
        for (var j = 0; j <abcOK.length; j++){
            if(caracteres == abcOK.charAt(j)){
                break;
            }

        }
        if (j == abcOK.length){
            allvaldo= false;
            break;
        }
    }
    if(!allvaldo){
        alert("Esccriba unicamente letras en el campo nombre");
        formulario.nombre.focus();
        return false;
    }

    //validación para unicamente letras
    var checkStr = formulario.nombre.value;
    alert(checkStr);

    var numOK = "1234567890"

    var allvaldo = true;

    //tenemos que comparar la cadena de nombre vs abc

    for(var i = 0; i <checkStr.length; i++){
        var caracteres = checkStr.charAt(i);
        for (var j = 0; j <abcOK.length; j++){
            if(caracteres == abcOK.charAt(j)){
                break;
            }

        }
        if (j == abcOK.length){
            allvaldo= false;
            break;
        }
    }
    if(!allvaldo){
        alert("Esccriba unicamente digitos en el campo nombre");
        formulario.edad.focus();
        return false;
    }

    //vamos a crear una funcion de una expresion regular para validar el correo electronico
    //texto.texto@texto.texto


var b = /^[^@\s]+[^@\.\s] + (\.[^@\.\s] +)+$/;

var txt = formulario.correo.value;
alert ("Email " + (b.test(txt) ? " " : " no ") + "valido");

    return b.test;
}

