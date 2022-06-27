import axios from 'axios';

const baseUrl = 'https://pokeapi.co/api/v2/pokemon?limit=151&offset=0';

// Invoking get method to perform a GET request
export const fetchPokemons = async () => {
    const url = baseUrl;
    const response = await axios.get(url);
    return response.data.results;
};

export const fetchPokemon = async (url:string) => {
    const response = await axios.get(url);
    return response.data;
};

