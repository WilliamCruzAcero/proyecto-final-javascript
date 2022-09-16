const pokeContainer = document.querySelector(".poke-container");
const spinner = document.querySelector("#spinner");
const previous = document.querySelector("#previous");
const next = document.querySelector("#next");


let offset = 1;
let limit = 8;
// evento de boton anterior//
previous.addEventListener("click", () => {
    if (offset != 1){
        offset -= 9;
        removeChildNodes(pokeContainer); 
        fetchPokemon(offset, limit);
    }    
});

//evento de boton siguiente//
next.addEventListener("click", () => {
    offset += 9;
    removeChildNodes(pokeContainer); 
    fetchPokemon(offset, limit);
}); 

function fetchPokemon(id) {

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}/`)
    .then(resp => resp.json())
    .then((data) => {
        crearPokemon(data);
        spinner.style.display = "none";  
    });
}

function fetchPokemons(offset, limit){
    spinner.style.display = "block";
    for (let i = offset; i <= offset + limit; i++){
        fetchPokemon(i)
    }
}  


function crearPokemon(pokemon){

    const flipCard = document.createElement('div');
    flipCard.classList.add("flip-card");
    
    const cardContainer = document.createElement('div');
    cardContainer.classList.add("card-container");  

    flipCard.appendChild(cardContainer);

    const card = document.createElement('div');
    card.classList.add('poke-block');

    const spriteContainer = document.createElement('div');
    spriteContainer.classList.add('img-container');

    const sprite = document.createElement('img');
    sprite.src = sprite.src = pokemon.sprites.front_default;

    spriteContainer.appendChild(sprite);

    const numero = document.createElement('p');
    numero.textContent = `#${pokemon.id.toString().padStart(3, 0)}`;

    const name = document.createElement('p');
    name.classList.add('nombre');
    name.textContent = pokemon.name

    card.appendChild(spriteContainer);
    card.appendChild(numero);
    card.appendChild(name);

    const cardBack = document.createElement('div');
    cardBack.classList.add('poke-block-back');
    
    cardBack.appendChild(progressBars(pokemon.stats));
 
    cardContainer.appendChild(card);
    cardContainer.appendChild(cardBack);
    pokeContainer.appendChild(flipCard); 
  


}

/* agrega barras de porgreso */

function progressBars(stats){
    const statsContainer = document.createElement('div');
    statsContainer.classList.add("stats-container");

    for (let i = 0; i < 3; i++){
        const stat = stats[i];

        const statPercent = stat.base_state  / 2 + "%";
        const statContainer = document.createElement('div');
        statContainer.classList.add("stat-container");

        const statName = document.createElement('div');
        statName.textContent = stat.stat.name;

        const progress = document.createElement('div');
        progress.classList.add("progress");
        
        const progressBar = document.createElement('div');
        progressBar.classList.add("progress-bar");
        progressBar.setAttribute("aria-valuenow", stat.base_stat); 
        progressBar.setAttribute("aria-valuenow", 0); 
        progressBar.setAttribute("aria-valuenow", 200);
        progressBar.style.width = statPercent; 

        progressBar.textContent = stat.base_stat;

        progress.appendChild(progressBar);
        statContainer.appendChild(statName);
        statContainer.appendChild(progress);
        statsContainer.appendChild(statContainer);
    }

    return statsContainer; 
}  

function removeChildNodes(parent){ 
    while (parent.firstChild){
        parent.removeChild(parent.firstChild);
    }
}

fetchPokemons(offset, limit) 