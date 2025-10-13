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