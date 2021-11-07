const form = document.querySelector('form');
const table = document.querySelector('table');
form.addEventListener('submit', (e) => {
	e.preventDefault();
	const numberOfPlayers = document.querySelector('#numberOfPlayers');
	const numberOfPlayersInput = numberOfPlayers.options[numberOfPlayers.selectedIndex].value;

	const teeSelect = document.querySelector('#teeSelect');
	const teeSelectInput = teeSelect.options[teeSelect.selectedIndex].value;
	// console.log(numberOfPlayersInput);
	// console.log(teeSelectInput);

	let tr = document.createElement('tr');
	for (let i = 1; i <= 18; i++) {
		let td = document.createElement('td');
		if (i === 1) {
			td.innerText = 'Hole';
			td.colSpan = '2';
			tr.append(td);
		}
		td = document.createElement('td');
		td.innerText = `${i}`;
		tr.append(td);
		if (i === 18) {
			td = document.createElement('td');
			td.rowSpan = '4';
			td.textContent = 'Out';
			tr.append(td);
			td = document.createElement('td');
			td.rowSpan = '4';
			td.textContent = 'In';
			tr.append(td);
			td = document.createElement('td');
			td.rowSpan = '4';
			td.textContent = 'Total';
			tr.append(td);
		}
	}
	table.append(tr);
});
