var instrucciones = [
    "Utiliza las flechas de navegación para mover las guíate por la imagen objetivo. ",
    "Para ordenar las piezas, guíate por la imagen objetivo.",
];

var movimientos = [

];

var rompe = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];

var rompreCorrecta = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]       
];

var filaVacia = 2;
var columnaVacia = 2;

// --- INICIO CÓDIGO AÑADIDO/MODIFICADO PARA EL RANGO ALEATORIO ---
// Define el rango mínimo y máximo de movimientos de mezcla.
const MIN_MEZCLAS = 50;
const MAX_MEZCLAS = 100;
// -----------------------------------------------------------------

function mostrarInstrucciones(instrucciones) {
    for (var i = 0; i < instrucciones.length; i++) {
        mostrarInstruccionesLista(instrucciones[i] , "lista-instrucciones");
    }
}

function mostrarInstruccionesLista(instruccion, idLista) {
    var ul = document.getElementById(idLista);
    var li = document.createElement("li");
    li.textContent = instruccion;
    ul.appendChild(li);
}

// Mostrar instrucciones al cargar
mostrarInstrucciones(instrucciones);

function checarSiGano() {
    for (var i = 0; i < rompe.length; i++) {
        for (var j = 0; j < rompe[i].length; j++) {
            var RompeActual = rompe[i][j];
            if(RompeActual != rompreCorrecta[i][j]) {
                return false;   
            }
        }
    }
    return true;
}

function mostrarCartelGanador() {
    if(checarSiGano()) {
        alert("¡Felicidades, ganaste el juego!");
    }
    return false;
}

function intercambiarPosicionesRompe(filaPos1, columnaPos1, filaPos2, columnaPos2){
    var pos1 = rompe[filaPos1][columnaPos1];
    var pos2 = rompe[filaPos2][columnaPos2];

    rompe[filaPos1][columnaPos1] = pos2;
    rompe[filaPos2][columnaPos2] = pos1;
}

function actualizarPosicionVacia(nuevaFila, nuevaColumna) {
    filaVacia = nuevaFila;
    columnaVacia = nuevaColumna;
}

function posicionValida(fila, columna) {
    return (fila >= 0 && fila <= 2 && columna >= 0 && columna <= 2);
}

//Arriba 38, Abajo 40, Izquierda 37, Derecha 39

var codigosDireccion = {
    IZQUIERDA : 37,
    ARRIBA : 38,
    DERECHA : 39,
    ABAJO : 40
}; //Es formato JSON

function moverEnDireccion(direccion) {
    var nuevaFilaPiezaVacia;
    var nuevaColumnaPiezaVacia;

    if(direccion === codigosDireccion.ABAJO) {
        nuevaFilaPiezaVacia = filaVacia + 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    } else if(direccion === codigosDireccion.ARRIBA) {
        nuevaFilaPiezaVacia = filaVacia - 1;
        nuevaColumnaPiezaVacia = columnaVacia;
    }   else if(direccion === codigosDireccion.DERECHA) {
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia + 1;
    } else if(direccion === codigosDireccion.IZQUIERDA) {
        nuevaFilaPiezaVacia = filaVacia;
        nuevaColumnaPiezaVacia = columnaVacia - 1;
    }

    if(posicionValida(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia)) {
        intercambiarPosiciones(filaVacia, columnaVacia, nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
        actualizarPosicionVacia(nuevaFilaPiezaVacia, nuevaColumnaPiezaVacia);
    }
}

function intercambiarPosiciones(fila1, columna1, fila2, columna2) {
    var pieza1 = rompe[fila1][columna1];
    var pieza2 = rompe[fila2][columna2];

    intercambiarPosicionesRompe(fila1, columna1, fila2, columna2);

    intercambiarPosicionesDOM('pieza' + pieza1, 'pieza' + pieza2);
}

function intercambiarPosicionesDOM(idPieza1, idPieza2) {
    var pieza1 = document.getElementById(idPieza1);
    var pieza2 = document.getElementById(idPieza2);

    var padre = pieza1.parentNode;

    var clonElemento1 = pieza1.cloneNode(true);
    var clonElemento2 = pieza2.cloneNode(true);

    padre.replaceChild(clonElemento1, pieza2);
    padre.replaceChild(clonElemento2, pieza1);
}

function actualizarUltimoMovimiento(direccion) {
    var ultimoMovimiento = document.getElementById("flecha");
    switch(direccion) {
        case codigosDireccion.ARRIBA:
            ultimoMovimiento.textContent = "↑";
            break;
        case codigosDireccion.ABAJO:
            ultimoMovimiento.textContent = "↓";
            break;
        case codigosDireccion.DERECHA:
            ultimoMovimiento.textContent = "→";
            break;
        case codigosDireccion.IZQUIERDA:
            ultimoMovimiento.textContent = "←";
            break;
    }
}

function mezclarPiezas(veces) {
    if(veces <= 0) {
        alert("Listo para jugar!")
        return;
    }

    var direcciones = [codigosDireccion.ABAJO, codigosDireccion.ARRIBA, codigosDireccion.IZQUIERDA, codigosDireccion.DERECHA];
    var direccion = direcciones[Math.floor(Math.random() * direcciones.length)];

    moverEnDireccion(direccion);

    setTimeout(function() {
        mezclarPiezas(veces - 1);
    }, 100 );
}

function capturarTeclas() {
    document.body.onkeydown = (function(evento) {
        if(evento.which === codigosDireccion.ARRIBA ||
                             evento.which === codigosDireccion.ABAJO ||
                             evento.which === codigosDireccion.IZQUIERDA ||
                             evento.which === codigosDireccion.DERECHA) {
        moverEnDireccion(evento.which);

        var gano = checarSiGano();
        if(gano) {
            setTimeout(function() {
                mostrarCartelGanador();
            }, 1000);
        }
}
        evento.preventDefault();
}
);
}


function iniciar() {
    // --- LÓGICA DE MEZCLA ALEATORIA APLICADA AQUÍ ---
    var rango = MAX_MEZCLAS - MIN_MEZCLAS + 1;
    var vecesAleatorias = Math.floor(Math.random() * rango) + MIN_MEZCLAS;
    
    mezclarPiezas(vecesAleatorias); // Llama con un número entre 50 y 100
    
    capturarTeclas();
}

// Iniciar el juego cuando se carga la página
window.onload = function() {
    iniciar();
};