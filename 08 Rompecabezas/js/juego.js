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

function intercambiarPosiciones(filaPos1, columnaPos1, filaPos2, columnaPos2) {
    var pos1 = matriz[filaPos1,columnaPos1];
    var pos2 = matriz[filaPos2, columnaPos2];

    //intercambio

    matriz[filaPos1,columnaPos1] = pos1;
    matriz[filaPos2,columnaPos2] = pos2;

}