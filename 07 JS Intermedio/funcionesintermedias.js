/*

Js maneja variables del siguiente modo:


var -> una varia de acceso local y global dependiendo de donde se declare
l

*/

var x = "hola";

let y = "habia una vez";

console.log(x);



//como usamos las funciones

function suma(a, b) {

    return a + b;
}

console.log(`Esta suma es de: ${suma(5, 3)}`);

//Las funciones flechas, nos ayudam a realizar operaciones de una forma mas sencilla, de acuerdo a la siguiente estructura


// "cadena" -> id, clase, metodo, nombre, atirbuto

/*

const RazasDePerro = [
    "Labrador", "Bulldog", "Beagle", "Poodle", "Chihuahua", "Boxer", "Dachshund", "Rottweiler", "Siberian Husky", "Golden Retriever"

];

//for clasico
for(let i = 0; i < RazasDePerro.length; i++) {
    console.log(RazasDePerro[i]);
}

//for of
for(const Raza of RazasDePerro) {

    console.log(Raza);
}

//for in
for(const indice in RazasDePerro) {

    console.log(RazasDePerro[indice]);
}

*/

//for Each itera sobre cada elemento del array y no devuelve nada
//todos los foreach son funciones flechas por defecto

RazasDePerro.forEach( Raza => console.log(Raza) );

//la estructura de un foreach es la siguiente
//array.forEach( (elemento, indice, array) => { codigo a ejecutar } );

//funcion map
//el map itera sobre cada elemento del array y devuelve un nuevo array con los elementos modificados    
const RazasEnMayusculas = RazasDePerro.map( Raza => Raza.toUpperCase() );
console.log(RazasEnMayusculas);

//find devuelve el primer elemento que cumpla con la condicion
const RazaEncontrada = RazasDePerro.find( Raza => Raza === "Beagle" );
console.log(RazaEncontrada);

if(RazasDePerro.find( Raza => Raza === "Pastor Aleman")) {
    console.log("Se encontro la raza");
    console.log(RazasDePerro)
} else {
    RazasDePerro.push("Pastor Aleman");
    console.log("No se encontro la raza, se agrego");
    console.log(RazasDePerro)
};

//FINDINDEX -> nos permite realizar busquedas y nos devuelve el indice del elemento encontrado, regresa el indice o -1 si no lo encuentra, esta funcuin particularmente utilo cuando necesitamos modificar o eliminar de un arreglo orginal, dentro de una copia del mismo
const indiceBulldog = RazasDePerro.findIndex( Raza => Raza === "Bulldog" );
if(indiceBulldog != -1) {
    //si se encuentra y esta dentro del arreglo
    console.log(RazasDePerro[indiceBulldog]);
    //aparte le voy a decir que agregue}