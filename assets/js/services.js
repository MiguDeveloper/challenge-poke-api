const urlApi = 'https://pokeapi.co/api/v2/pokemon/';

const getNumAleatorio = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min * 1;
};

document.addEventListener('DOMContentLoaded', () => {
  getPokemon();
});

const getPokemon = async () => {
  try {
    const numRamdom = getNumAleatorio(1, 151);
    const urlPokemonSeleccionado = `${urlApi}${numRamdom}`;
    const rpta = await fetch(urlPokemonSeleccionado);

    if (!rpta.ok) {
      throw 'Error no se pudo realizar la peticion';
    }
    const data = await rpta.json();

    const pokemon = {
      name: data.name,
      img: data.sprites.other.dream_world.front_default,
      hp: data.stats[0].base_stat,
      experiencia: data.base_experience,
      ataque: data.stats[1].base_stat,
      especial: data.stats[3].base_stat,
      defensa: data.stats[2].base_stat,
    };
    pintarCard(pokemon);
  } catch (error) {
    throw error;
  }
};

const pintarCard = (pokemon) => {
  const flex = document.querySelector('.flex');
  const template = document.querySelector('#template-card').content;
  const clone = template.cloneNode(true);
  const fragment = document.createDocumentFragment();

  clone.querySelector('.card-body-img').setAttribute('src', pokemon.img);

  clone.querySelector(
    '.card-body-title'
  ).innerHTML = `${pokemon.name} <span>${pokemon.hp} hp</span>`;

  clone.querySelector('.card-body-text').innerText = pokemon.experiencia;

  clone.querySelectorAll(
    '.card-footer-social h3'
  )[0].innerText = `${pokemon.ataque}K`;

  clone.querySelectorAll(
    '.card-footer-social h3'
  )[1].innerText = `${pokemon.especial}K`;
  clone.querySelectorAll(
    '.card-footer-social h3'
  )[2].innerText = `${pokemon.defensa}K`;

  fragment.appendChild(clone);
  flex.appendChild(fragment);
};
