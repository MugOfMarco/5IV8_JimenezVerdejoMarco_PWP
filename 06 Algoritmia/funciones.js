function InvertirPalabras() {
    //Agarro lo que se ponga en el input y lo defino
    let TextoOriginal = document.getElementById('p1-input').value;
     
    //Lo paso a un arreglo
    let ArrayPalabras = TextoOriginal.split(' ');
    
    // invierto las palabras de ese arreglo que cree
    ArrayPalabras.reverse();

    //y pasarlo a una cadena de texto
    let TextoFinal = ArrayPalabras.join(' ');

    document.getElementById('p1-output').textContent = TextoFinal;


}

function CalcularVector() {

    var p2_x1 = document.querySelector("#p1_x1").value;
    var p2_x2 = document.querySelector("#p1_x2").value;
    var p2_x3 = document.querySelector("#p1_x3").value;
    var p2_x4 = document.querySelector("#p1_x4").value;
    var p2_x5 = document.querySelector("#p1_x5").value;

    var p2_y1 = document.querySelector("#p1_y1").value;
    var p2_y2 = document.querySelector("#p1_y2").value;
    var p2_y3 = document.querySelector("#p1_y3").value;
    var p2_y4 = document.querySelector("#p1_y4").value;
    var p2_y5 = document.querySelector("#p1_y5").value;

    //Creamos los vectores
    var v1 = [p2_x1, p2_x2, p2_x3, p2_x4, p2_x5];
    var v1 = [p2_y1, p2_y2, p2_y3, p2_y4, p2_y5];

    v1 = v1.sort(function(a,b){return b-a});
    v2 = v2.sort(function(a,b){return b-a});

    v2 = v2.reverse();

    var p2_producto = 0;

    for(var i = 0; i < v1.length; i++){

        p2_producto += v1[i] * v2[i] ;

    }

    document.querySelector("#p2_resultado").textContent = "El producto escalar minimo es: " + p2_producto;

}

function CalcularPalabras() {
    //Agarrar lo que se ponga en el input y definirlo
    let palabrasOriginales = document.getElementById('p3-input').value;

    //Separarlas mediante las comas
    let ArrayPalabras = palabrasOriginales.split(',')

    //ahora hacer un array por si hay espacios dentro de las palabras
    let palabras = ArrayPalabras.map(palabra => palabra.trim() );

    //declarar variables donde se guardara el output
    let PalabraGanadora = ''
    let CaracteresUnicos = 0;

    //bucle para comparar cada palabras
    for (i=0; i<palabras.length; i++ ){

        //visualizar cada cosa no repetida y contar cuantas letras no repetidas hay
        const LetrasUnicas = new Set (palabras[i].toLowerCase());
        const Conteo = LetrasUnicas.size;

        //comparación de las palabras 
        if (Conteo > CaracteresUnicos){
            CaracteresUnicos = Conteo;
            PalabraGanadora = palabras[i];
        }
    }

        if (PalabraGanadora) { 
        let mensajeFinal = `La palabra con más caracteres únicos es: "${PalabraGanadora}" (${CaracteresUnicos}).`;
        document.getElementById('p3-output').textContent = mensajeFinal;
        } else {
        document.getElementById('p3-output').textContent = "Por favor, ingresa al menos una palabra.";
        }
}