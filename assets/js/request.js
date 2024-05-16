// URL
const BASE_URL = 'https://pokeapi.co/api/v2/pokemon/'

const requestPokemon = async (pokemonId) => {
	try {
		const response = await fetch(`${BASE_URL}${pokemonId}`)
		if (!response.ok) {
			// console.error(`No se encontró el Pokemon con el ID ${pokemonId}`);
			return null
		}
		const data = await response.json()
		return data
	} catch (error) {
		console.error(`Hubo un error en la petition: ${error}`)
	}
}
