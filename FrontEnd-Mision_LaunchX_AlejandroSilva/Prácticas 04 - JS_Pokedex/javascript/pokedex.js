const baseURL = 'https://pokeapi.co/api/v2/pokemon/';
const pokemon = document.getElementById('pokemonName');
const buttonSearch = document.getElementById('searchPokemon');
const buttonDelete = document.getElementById('deletePokemon');
const appNode = document.getElementById('app');

buttonSearch.addEventListener('click', insertPokemon);
buttonSearch.addEventListener('touchstart', insertPokemon);
buttonDelete.addEventListener('click', deletePokemon);
buttonDelete.addEventListener('touchstart', deletePokemon);

function insertPokemon(){
    window.fetch(`${baseURL}${pokemon.value.toLowerCase()}`).then(response => {
        if(response.status === 404){
            alert('Este pokemon no existe o no esta disponible, intenta de nuevo');
        } else{
            return response.json();
        }
    }).then(responseJSON => {
        const allItems = [];
        const result = [];

        for(let pokemonInfo in responseJSON){
            result.push([pokemonInfo, responseJSON[pokemonInfo]]);
        }

        //Visualizar en consola la informacion de la API
        console.table(result);

        //Crear imagen
        const pokemonImage =document.createElement('img');
        pokemonImage.src = result[14][1].front_default;

        //Nombre
        const pokemonName = document.createElement('h2');
        pokemonName.innerText  = `Name: ${result[10][1]}`;

        //Tipo
        const pokemonType = document.createElement('h2');
        pokemonType.innerText = `Type: ${result[16][1][0].type.name}`;

        //Estadisticas
        let pokemonStats0 = document.createElement('h3');
        pokemonStats0.innerText = `\nStats: \n ${result[15][1][0].stat.name}: ${result[15][1][0].base_stat}`;

        let pokemonStats1 = document.createElement('h3');
        pokemonStats1.innerText = `${result[15][1][1].stat.name}: ${result[15][1][1].base_stat}`;

        let pokemonStats2 = document.createElement('h3');
        pokemonStats2.innerText = `${result[15][1][2].stat.name}: ${result[15][1][2].base_stat}`;

        //Movimientos
           let pokemonMoves0 = document.createElement('h3');
           let pokemonMoves1 = document.createElement('h3');
           let pokemonMoves2 = document.createElement('h3');
            pokemonMoves0.innerText = `\nMoves: \n ${result[9][1][0].move.name}`;
            pokemonMoves1.innerText = `${result[9][1][1].move.name}`;
            pokemonMoves2.innerText = `${result[9][1][2].move.name}`;

        let counter = 0;
        //Contenedor
        if(counter < 5){
            counter++;
            const container = document.createElement('div');
            container.append(pokemonName, pokemonImage, pokemonType, pokemonStats0, pokemonStats1, pokemonStats2,  pokemonMoves0, pokemonMoves1, pokemonMoves2);
            container.classList.add('container');

            allItems.push(container);

            appNode.append(...allItems);

        } else if (counter > 5){
            deletePokemon();
        }
    })
}

function deletePokemon(){
    let allPokemon = appNode.childNodes;
    allPokemon = Array.from(allPokemon);

    allPokemon.forEach(pokemon => {
        pokemon.remove();
    })
}
