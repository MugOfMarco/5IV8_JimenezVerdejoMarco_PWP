/*
Este es un ejemplo de una API REST utilizando una llamada con fetch, el cual sirve para obtener información de un servidor externo.
*/

const pokeapiURL = 'https://pokeapi.co/api/v2/';


const Pokedex = () => {
    //primero necesitamos obetner todas la
    const pokemonStatsElement = {
        hp: document.getElementById("PokemonStatHp"),   
        attack: document.getElementById("PokemonStatAttack"),
        defense: document.getElementById("PokemonStatDefense"),
        specialAttack: document.getElementById("PokemonStatSpecialAttack"),
        specialDefense: document.getElementById("PokemonStatSpecialDefense"),
        speed: document.getElementById("PokemonStatSpeed")     
    
    };

    //Necesitamos un auxiliarque nos permita utilizar la clase de los tipos de pokemon
    let currentClassType = null;
    
    //tiene que cambiar los elementos de la imagen para ello debemos crear un templae que se encarge de eso
    const imageTemplate = <img className="PokeDisplay"></img>
}