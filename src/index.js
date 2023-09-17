const elInput = document.querySelector('.todo__input');
const btnInput = document.querySelector('.todo__btn');
const todoList = document.querySelector('.todo__list');
const explanations = document.querySelector('.explanations');
const todoTask = document.querySelector('.todo__task')

let arrayTask = [];

function Task(id, text, status) {
	this.id;
	this.text;
	this.status;
}

function creationObj() {
	let task = new Task();
	task.id = Date.now();
	task.text = elInput.value;
	task.status = false;
	arrayTask.push(task);
	return task;
}

function renderBtnDelete(task, id) {
	let removeBtn = document.createElement('button');

	task.append(removeBtn);
	removeBtn.classList.add('btn-remove');
	removeBtn.classList.add('btn-reset');
	removeBtn.addEventListener('click', () => {
		deleteTask(task, id);
		if (arrayTask.length == 0) {
			todoTask.append(explanations);
		}
	})
}

function deleteTask(task, id) {
	const index = arrayTask.findIndex(n => n.id === id);
	if (index !== -1) {
		arrayTask.splice(index, 1);
	}
	task.remove();
	console.log(arrayTask);
}

function renderCheck(task, t) {
	let check = document.createElement('input');
	check.setAttribute('type', 'checkbox');
	check.setAttribute('value', 'false');
	check.classList.add('custom-checkbox__input');
	task.append(check);

	check.addEventListener('click', (e) => {
		let enabled = e.target.checked;
		check.setAttribute('value', enabled);
		t.status = enabled;
		console.log(arrayTask);
	})
}

function renderP(task, value) {
	let pTask = document.createElement('p');
	pTask.classList.add('todo__p');
	pTask.textContent = value;
	task.append(pTask);
}

function renderTask() {
	btnInput.addEventListener('click', () => {
		if (elInput.value) {
			explanations.remove();
			let inputText = elInput.value;
			let liTask = document.createElement('li');
			liTask.classList.add('todo__item');
			liTask.classList.add('custom-checkbox__text');
			let t = creationObj();
			renderP(liTask, inputText);
			renderCheck(liTask, t);
			renderBtnDelete(liTask, t.id)
			todoList.append(liTask);
			elInput.value = '';
			console.log(arrayTask);
		}
	})
}


renderTask();














