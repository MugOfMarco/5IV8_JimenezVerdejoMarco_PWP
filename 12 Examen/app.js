window.onload = () => {
    disneyApp();
};

// Función principal que encapsula toda la lógica de la aplicación
const disneyApp = () => {

    //URL Base de la API 
    const disneyApiUrl = "https://api.disneyapi.dev/";  

    // Función para buscar películas por título ---
    const inputBusqueda = document.getElementById("disney-input");
    const botonBuscar = document.getElementById("btn-search");
    const contenedorResultados = document.getElementById("contenedor-resultados");

    const getCharacterData = (characterName) => {

    const url = `${disneyApiUrl}character?name=${encodeURIComponent(characterName)}`;

    return fetch(url, { method: 'GET' })

            .then((res) => {
                

                if (!res.ok) {
                    throw new Error(`Error HTTP: ${res.status}`);
                }
                return res.json();
            })
            .catch((error) => {

                console.error("Error en el fetch:", error);
                return { requestFailed: true, error: error };
            });
        }


};