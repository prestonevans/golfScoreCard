const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const numberOfPlayers = document.querySelector('#numberOfPlayers');
	const numberOfPlayersInput = numberOfPlayers.options[numberOfPlayers.selectedIndex].value;
	console.log(numberOfPlayersInput);
});
