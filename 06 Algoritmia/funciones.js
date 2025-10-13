function InvertirPalabras() {
    //Agarro lo que se ponga en el input y lo defino
    let TextoOriginal = document.getElementById('p1-input').value;
     
    //Lo paso a un arreglo
    let ArrayPalabras = TextoOriginal.split('');
    
    // invierto las palabras de ese arreglo que cree
    ArrayPalabras.reverse();

    //y pasarlo a una cadena de texto
    let TextoFinal = ArrayPalabras.join(' ');

    document.getElementById('p1-output').textContent = TextoFinal;


}