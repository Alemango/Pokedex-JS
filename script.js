const pokeCard = document.querySelector('[data-poke-card]');
const pokeName = document.querySelector('[data-poke-name]');
const pokeImg = document.querySelector('[data-poke-img]');
const pokeImgContainer = document.querySelector('[data-poke-img-container]');
const pokeId = document.querySelector('[data-poke-id]');
const pokeTypes = document.querySelector('[data-poke-types]');
const pokeStats = document.querySelector('[data-poke-stats]');
const pokeAntLink = document.querySelector('[poke-ant-link]');
const pokeAntImg = document.querySelector('[poke-ant-img]');
const pokeActLink = document.querySelector('[poke-act-link]');
const pokeActImg = document.querySelector('[poke-act-img]');
const pokeSigLink = document.querySelector('[poke-sig-link]');
const pokeSigImg = document.querySelector('[poke-sig-img]');
const pokeForm = document.querySelector('[poke-form]');

let idAnt;
let idSig;

const typeColors = {
    electric: '#E3E0078C',
    normal: '#C8C3D3',
    fire: '#FF675CCC',
    water: '#0596C780',
    ice: '#A2BEC8',
    rock: '#785C408C',
    flying: '#C2FAEA',
    grass: '#04AD168C',
    psychic: '#FFC6D9',
    ghost: '#561D2580',
    bug: '#B1EE268C',
    poison: '#7956638C',
    ground: '#D2B074',
    dragon: '#9022F18C',
    steel: '#BBB8BE99',
    fighting: '#CD680980',
    fairy: '#B20C6180',
    dark:'#808080',
    default: '#F3EBE2',
};


const searchPokemon = event => {
    event.preventDefault();
    let { value } = event.target.pokemon;
    fetch(`https://pokeapi.co/api/v2/pokemon/${value.toLowerCase()}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

const renderPokemonData = data => {
    const sprite =  data.sprites.other.home.front_default;
    const badSprite = data.sprites.front_default;
    const { stats, types } = data;
    let ant = parseInt(data.id) - 1;
    let sig = ant + 2;

    pokeName.textContent = data.name;
    pokeImg.setAttribute('src', sprite);
    pokeActImg.setAttribute('src', badSprite);
    pokeId.textContent = `(#${data.id})`;

    pokeAntImg.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${ant}.png`);
    pokeSigImg.setAttribute('src', `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${sig}.png`);

    pokeAntLink.setAttribute('href', 'javascript:anterior()');
    pokeSigLink.setAttribute('href', 'javascript:siguiente()');

    idAnt = ant;
    idSig = sig;

    setCardColor(types);
    renderPokemonTypes(types);
    renderPokemonStats(stats);
}


const setCardColor = types => {
    const colorOne = typeColors[types[0].type.name];
    const colorTwo = types[1] ? typeColors[types[1].type.name] : typeColors.default;
    pokeCard.style.background =  `radial-gradient(${colorTwo} 67%, ${colorOne} 33%)`;
    pokeCard.style.backgroundSize = ' 1200px 1200px';
}

const renderPokemonTypes = types => {
    pokeTypes.innerHTML = '';
    types.forEach(type => {
        const colorOne = typeColors[types[0].type.name];
        const typeTextElement = document.createElement("div");
        typeTextElement.style.background = `radial-gradient( ${colorOne} 20%, transparent 80%)`;
        typeTextElement.textContent = type.type.name;
        pokeTypes.appendChild(typeTextElement);
    });
}

const renderPokemonStats = stats => {
    pokeStats.innerHTML = '';
    stats.forEach(stat => {
        const statElement = document.createElement("div");
        const statElementName = document.createElement("div");
        const statElementAmount = document.createElement("div");
        statElementName.textContent = stat.stat.name;
        statElementAmount.textContent = stat.base_stat;
        statElement.appendChild(statElementName);
        statElement.appendChild(statElementAmount);
        pokeStats.appendChild(statElement);
    });
}

const renderNotFound = () => {
    pokeName.textContent = 'No encontrado';
    pokeImg.setAttribute('src', './assets/img/psyduck-2.jpg');
    pokeCard.style.background =  '#fff';
    pokeTypes.innerHTML = '';
    pokeStats.innerHTML = '';
    pokeId.textContent = '';
    pokeActImg.setAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png')
    pokeAntImg.setAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png')
    pokeSigImg.setAttribute('src', 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/54.png')
}

function anterior(){
    fetch(`https://pokeapi.co/api/v2/pokemon/${idAnt}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}

function siguiente(){
    fetch(`https://pokeapi.co/api/v2/pokemon/${idSig}`)
        .then(data => data.json())
        .then(response => renderPokemonData(response))
        .catch(err => renderNotFound())
}