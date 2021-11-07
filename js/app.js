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

	//get the number of players selected from user
	const numberOfPlayers = document.querySelector('#numberOfPlayers');
	const numberOfPlayersInput = numberOfPlayers.options[numberOfPlayers.selectedIndex].value;

	// get the tee the players will play from
	const teeSelect = document.querySelector('#teeSelect');
	const teeSelectInput = teeSelect.options[teeSelect.selectedIndex].value;

	// creates holes row
	createHoles();

	// create yards,hcp, and par rows from api
	// creat players after api rows are created
	coursePromise.then((data) => {
		const course = data.data;
		createCourse(course, teeSelectInput);
		//create player rows
		createPlayers(numberOfPlayersInput);
	});
});
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
	console.log(course);
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

// function to fetch data from api
function getCourseInfo() {
	const coursePromise = fetch('http://golf-courses-api.herokuapp.com/courses/11819').then((response) =>
		response.json()
	);
	return coursePromise;
}
