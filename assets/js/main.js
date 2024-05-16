const form = document.getElementById('form')
const pokeInput = document.querySelector('.search-input')
const cardContainer = document.querySelector('.pokemon-container')
const searchMsg = document.querySelector('.search-msg')

const getPokeData = (data) => {
	return {
		pokeName: data.name,
		image: data.sprites.front_default,
		pokeType: data.types[0].type.name,
		pokeHeight: data.height / 10,
		pokeWeight: data.weight / 10,
	}
}
const createPokeTemplateHTML = (pokeData) => {
	const { pokeName, image, pokeType, pokeHeight, pokeWeight } =
		getPokeData(pokeData)
	return `
    <div class="pokemon-card animate"> 
        <h1 class="title">${pokeName}</h2>
        <div class="img-container">
            <img src="${image}" alt="${pokeName}">
        </div>
        <div class="info-container">
            <h2>Información</h2>
            <div class="info">
                <h3>Tipo:</h3>
                <p> ${pokeType}</p>
            </div>
            <div class="info">
                <h3>Altura:</h3>
                <p> ${pokeHeight}</p>
            </div>
            <div class="info">
                <h3>Peso:</h3>
                <p> ${pokeWeight}</p>
            </div>
        </div>
    </div>
    `
}
const renderPokeCard = (pokeData) => {
	cardContainer.innerHTML = createPokeTemplateHTML(pokeData)
}
// Funcion para cambiar el mensaje
const changeSearchMsg = (pokeData) => {
	const { pokeName } = getPokeData(pokeData)
	searchMsg.textContent = `Este pokemón es: ${pokeName}`
}
const searchPokemon = async (e) => {
	e.preventDefault()
	const searchedPokemon = pokeInput.value.trim()

	if (searchedPokemon === '') {
		searchMsg.textContent = 'Por favor, ingresa un número de Pokemón'
		return
	}

	const fetchedPokemon = await requestPokemon(searchedPokemon)

	if (!fetchedPokemon) {
		searchMsg.textContent = `el pokemón numero: ${searchedPokemon} no existe`
		cardContainer.innerHTML = ''
		form.reset()
		return
	}
	renderPokeCard(fetchedPokemon)
	changeSearchMsg(fetchedPokemon)
	form.reset()
}
const init = () => {
	form.addEventListener('submit', searchPokemon)
}
init()
