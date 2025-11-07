window.onload = () => {
    disneyApp();
};

// Función principal que encapsula toda la lógica de la aplicación
const disneyApp = () => {

    //URL Base de la API 
    const disneyApiUrl = "https://api.disneyapi.dev/";  

    // Función para buscar películas por título 
    const inputBusqueda = document.getElementById("searchInput"); 
    const botonBuscar = document.getElementById("searchButton");
    //----------------------


    const contenedorResultados = document.getElementById("contenedor-resultados");

    const getCharacterData = (characterName) => {

    const url = characterName 
            ? `${disneyApiUrl}character?name=${encodeURIComponent(characterName)}`
            : `${disneyApiUrl}character`; // Opcional: buscar todos si está vacío


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

    botonBuscar.onclick = async () => {
    
        const characterName = inputBusqueda.value.trim();
        const data = await getCharacterData(characterName);

        // Limpiar resultados anteriores
        contenedorResultados.innerHTML = '';
        if (data.requestFailed) {
            contenedorResultados.innerHTML = `<p>Error al obtener los datos. Por favor, inténtalo de nuevo más tarde.</p>`;
            return;
        }
        if (data.count === 0) {
            contenedorResultados.innerHTML = `<p>No se encontraron personajes con el nombre "${characterName}".</p>`;
            return;
        }
        // Mostrar resultados
        data.data.forEach((character) => {
            const characterDiv = document.createElement('div');
            characterDiv.classList.add('character-card');
            characterDiv.innerHTML = `
                <h3>${character.name}</h3>
                <img src="${character.imageUrl}" alt="${character.name}" />
                <p><strong>Films:</strong></p>
                <ul>
                    ${character.films.map(film => `<li>${film}</li>`).join('')}
                </ul>
            `;
            contenedorResultados.appendChild(characterDiv);
        });


    }

    


};