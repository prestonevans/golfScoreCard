// create variable to store golf course promise from function
let coursePromise = getCourseInfo();

//grab form to prevent defaulf from happening
const form = document.querySelector('form');

//grab table to append data
const table = document.querySelector('table');

// grab player template
const playerTemplate = document.querySelector('#playerContent');

//event listener to prevent the default of a form being submitted
form.addEventListener('submit', (e) => {
	// prevent form from default action
	e.preventDefault();

	table.classList.remove('hidden');

	//get the number of players selected from user
	const numberOfPlayers = document.querySelector('#numberOfPlayers');
	const numberOfPlayersInput = numberOfPlayers.options[numberOfPlayers.selectedIndex].value;

	// get the tee the players will play from
	const teeSelect = document.querySelector('#teeSelect');
	const teeSelectInput = teeSelect.options[teeSelect.selectedIndex].value;

	// remove form from body
	document.querySelector('form').remove();

	// creates holes row
	createHoles();

	// create yards,hcp, and par rows from api
	// create players after api rows are created
	// make players dynamic
	coursePromise.then((data) => {
		// assign api data to variable
		const course = data.data;

		// create yard, hcp, and par rows
		createCourse(course, teeSelectInput);

		//create player rows
		createPlayers(numberOfPlayersInput);

		// make players dynamic
		for (let i = 0; i < numberOfPlayersInput; i++) {
			document.querySelectorAll(`.player${i} input`).forEach((input) => {
				input.addEventListener('change', () => {
					let total = 0;
					let frontNine = 0;
					let backNine = 0;
					document.querySelectorAll(`.player${i} input`).forEach((input, index) => {
						if (index < 9) {
							frontNine += Number(input.value);
						} else {
							backNine += Number(input.value);
						}
						total += Number(input.value);
					});
					document.querySelector(`.player${i} .out`).innerText = frontNine;
					document.querySelector(`.player${i} .in`).innerText = backNine;
					document.querySelector(`.player${i} .total`).innerText = total;
				});
			});
		}

		// note that player names are contenteditable
		for (let i = 0; i < numberOfPlayersInput; i++) {
			document.querySelectorAll(`.player${i} :first-child`).forEach((name) => {
				name.addEventListener('blur', () => {
					if (name.childElementCount !== 0) {
						name.children[0].remove();
					}
				});
			});
		}

		// fix enter from breaking table
		document.querySelectorAll('[contenteditable]').forEach((input) => {
			input.addEventListener('keypress', (evt) => {
				if (evt.keyCode === 13) {
					evt.preventDefault();
				}
			});
		});
	});
});

// function to fetch data from api
function getCourseInfo() {
	const coursePromise = fetch('https://golf-courses-api.herokuapp.com/courses/11819').then((response) =>
		response.json()
	);
	return coursePromise;
}

//function to create holes row
function createHoles() {
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
}

// function to create yards, hcp, and par rows for table
function createCourse(course, teeSelectInput) {
	const yards = document.createElement('tr');
	const hcp = document.createElement('tr');
	const par = document.createElement('tr');
	for (let i = 0; i < 18; i++) {
		let td = document.createElement('td');
		if (i === 0) {
			td.innerText = 'Yards';
			td.colSpan = '2';
			yards.append(td);
			td = document.createElement('td');
			td.innerText = 'HCP';
			td.colSpan = '2';
			hcp.append(td);
			td = document.createElement('td');
			td.innerText = 'PAR';
			td.colSpan = '2';
			par.append(td);
		}
		td = document.createElement('td');
		td.innerText = course.holes[i].teeBoxes[teeSelectInput].yards;
		yards.append(td);
		td = document.createElement('td');
		td.innerText = course.holes[i].teeBoxes[teeSelectInput].hcp;
		hcp.append(td);
		td = document.createElement('td');
		td.innerText = course.holes[i].teeBoxes[teeSelectInput].par;
		par.append(td);
	}
	table.append(yards);
	table.append(hcp);
	table.append(par);
}

// function to create player rows
function createPlayers(players) {
	for (let i = 0; i < players; i++) {
		const playerEl = document.importNode(playerTemplate.content, true);
		const tr = document.createElement('tr');
		tr.classList.add(`player${i}`);
		tr.append(playerEl);
		table.append(tr);
	}
}
