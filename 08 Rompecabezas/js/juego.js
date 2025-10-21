var instrucciones = [
    "Utiliza las flechas del teclado para mover las piezas del rompecabezas.",
    "Para ordenar las piezas, mueve las piezas adyacentes a la posición vacía.",
]

//vamos a guardar dentro de una variables, los movimientos del rompecabezas 
var movimientos = [];

//vamos a crear una matriz para saber las posiciones del rompecabezas
var matriz = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

//vamos a tener que crear una matriz donde tengamos las posiciones correctas
var matrizCorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

//necesio saber las coordenadas de la pieza vacia, la que se va a mover
var filaVacia = 2;
var columnaVacia = 2;

// necesitamos una funciones que se encargue de mostrar las instrucciones
function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
    mostrarInstruccionesLista(instrucciones[i], "lista-instrucciones");
    }

}

//Esra funcion se encarga de crear el componente li y agregarlo a la lista ul

function mostrarInstruccionesLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

function iniciar () {
    //mezclar las piezas del rompecabezas
    mezclarPiezas(30);
    //capturar las teclas
    capturarTeclas();
    

}


function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}


function posicionValida(fila, columna) {
    return (fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2);
}

//debemos crear una matriz de identificacion de movimientos
var codigosDireccion = {
    IZQUIERDA: 37,
    ARRIBA: 38,
    DERECHA: 39,
    ABAJO: 40
}; //formato JSON

//funcion que se encarga de mover las piezas del rompecabezas    

function moverEnDireccion(direccion) {
    var nuevaFilaVacia;
    var nuevaColumnaVacia; 

    //mover pieza hacia la izquierda
    if (direccion === codigosDireccion.ABAJO) {
        nuevaFilaVacia = filaVacia - 1;
        nuevaColumnaVacia = columnaVacia;
    } else if (direccion === codigosDireccion.ARRIBA) {
        nuevaFilaVacia = filaVacia + 1;
        nuevaColumnaVacia = columnaVacia;
    } else if (direccion === codigosDireccion.DERECHA) {
        nuevaFilaVacia = filaVacia;
        nuevaColumnaVacia = columnaVacia - 1;
    } else if (direccion === codigosDireccion.IZQUIERDA) {
        nuevaFilaVacia = filaVacia;
        nuevaColumnaVacia = columnaVacia + 1;
    }   

    //mando a llamar si la posicion es valida
    if (posicionValida(nuevaFilaVacia, nuevaColumnaVacia)) {
        //intercambio las posiciones
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaVacia, nuevaColumnaVacia);
        //actualizo la posicion vacia
        actualizarPosicionVacia(nuevaFilaVacia, nuevaColumnaVacia);
        //guardar el ultimo movimiento
        agregarMovimiento(direccion);
        //checar si gano        
    }   
}

function intercambiarPosiciones(fila1, columna1, fila2, columna2){
var pieza1 = matriz[fila1][columna1];
var pieza2 = matriz[fila2][columna2];

intercambiarPosicionesRompe(fila1, columna1, fila2, columna2) 

intercambiarPosicionesDOM('pieza'+pieza1, 'pieza'+pieza2);
}

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
    var elementoPieza1 = document.getElementById(idPieza1);
    var elementoPieza2 = document.getElementById(idPieza2); 

    var padre = elementoPieza1.parentNode;
    var clonElemento1 = elementoPieza1.cloneNode(true);
    var clonElemento2 = elementoPieza2.cloneNode(true);     

    padre.replaceChild(clonElemento1, elementoPieza2);
    padre.replaceChild(clonElemento2, elementoPieza1);
}

function actualizarUltimoMovimiento(direccion) {
    var ultimoMovimiento = document.getElementById("flecha");
    switch(direccion) {
        case codigosDireccion.IZQUIERDA:
            ultimoMovimiento.textContent = "←";
            break;
        case codigosDireccion.ARRIBA:
            ultimoMovimiento.textContent = "↑";
            break;
        case codigosDireccion.DERECHA:
            ultimoMovimiento.textContent = "→";
            break;
        case codigosDireccion.ABAJO:
            ultimoMovimiento.textContent = "↓";
            break;
    }  
}

function mezclarPiezas(veces) {
    if (veces <= 0) {
        alert("Asi no se puede.");
        return;
    }
    var direcciones = [codigosDireccion.ARRIBA, codigosDireccion.ABAJO, codigosDireccion.DERECHA, codigosDireccion.IZQUIERDA];
    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];
    moverEnDireccion(direccion);
    setTimeout(function() {
        mezclarPiezas(veces - 1);
    }, 100);
}   

function capturarTeclas() {
    document.body.onkeydown = (function(evento) {
       if( event.which === codigosDireccion.IZQUIERDA ||
              evento.which === codigosDireccion.ARRIBA ||
                evento.which === codigosDireccion.DERECHA ||
                    evento.which === codigosDireccion.ABAJO) {

            moverEnDireccion(evento.which);

            var gano = checarSiGano();
            if (gano) {
                setTimeout(function() {
                    mostrarCartelGanador();
                }, 500);
                evento.preventDefault();
            }
                    }
    });
}
    
//mandamos traer a la funcion que muestra las instrucciones
mostrarInstrucciones(instrucciones);

function checarSiGano() {
    for (var i = 0; i < matriz.length; i++) {
        for (var j = 0; j < matriz[i].length; j++) {
            if (matriz[i][j] !== matrizCorrecta[i][j]) {
                return false;
            }
        }
    }
    return true;
}

//mostrar en html si gano
function mostrarCartelGanador() {
    if (checarSiGano()) {
        alert("¡Felicidades! Has ganado el juego.");
    } 
    return false;
}

/*
necesitamos una funcion que se encargue de intercambiar las piezas del rompecabezas, para esto tenemos que hacer el uso de :
arreglo [][] = posicion[][]
//intercambiar

*/

function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    var pos1 = matriz[filaPos1,columnaPos1];
    var pos2 = matriz[filaPos2, columnaPos2];

    //intercambio

    matriz[filaPos1,columnaPos1] = pos1;
    matriz[filaPos2,columnaPos2] = pos2;

}