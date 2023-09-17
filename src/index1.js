const todoList = document.querySelector('.todo__list');
const todoTask = document.querySelector('.todo__task');
const todoCheck = document.querySelector('.todo__check');
const todoInput = document.querySelector('.todo__input');
const btnInput = document.querySelector('.todo__btn');
const todoDone = document.querySelector('.todo__done');
const spanValue = document.querySelector('.info__value');
const doneContent = document.querySelector('.done__content');
const spanDoneTask = document.querySelector('.done__value');
const spanDoneTaskTwo = document.querySelector('.done__total');
const explanations = document.querySelector('.explanations');

let arrayTask = [];
function Task(id, text, status) {
	this.id;
	this.text;
	this.status;
}

function creationObjectTask() {
	let task = new Task();
	task.id = Date.now();
	task.text = todoInput.value;
	task.status = false;
	arrayTask.push(task);
	return task;
}

function render(where, element) {
	let drawElement = element
	where.append(element);
	return drawElement
}

function renderCheck() {
	let check = document.createElement('input');
	check.setAttribute('type', 'checkbox');
	check.setAttribute('value', 'false');
	check.classList.add('custom-checkbox__input');
	return check
}

function renderP() {
	let pTask = document.createElement('p');
	pTask.classList.add('todo__p');
	pTask.textContent = todoInput.value;
	return pTask
}

function renderBtnDelete() {
	let removeBtn = document.createElement('button');
	removeBtn.classList.add('btn-remove');
	removeBtn.classList.add('btn-reset');
	return removeBtn;
}

function renderLi() {
	let liTask = document.createElement('li');
	liTask.classList.add('todo__item');
	liTask.classList.add('custom-checkbox__text');
	return liTask;
}

function deleteTask(removeBtn, liTask, id) {
	removeBtn.addEventListener('click', () => {
		const index = arrayTask.findIndex(n => n.id === id);
		if (index !== -1) {
			arrayTask.splice(index, 1);
		}
		liTask.remove();
		showsTotalTasks();
		showsCompletedTasks()
		if (arrayTask.length == 0) {
			render(todoTask, explanations)
			spanDoneTaskTwo.textContent = '';
		}
		console.log(arrayTask);
	})
}

function choiceCheck(check, task, pTask) {
	check.addEventListener('click', (e) => {
		let enabled = e.target.checked;
		check.setAttribute('value', enabled);
		task.status = enabled;
		pTask.classList.remove('delete__p')
		if (enabled) {
			pTask.classList.add('delete__p');
		}
		showsCompletedTasks();
		console.log(arrayTask);
	})
}

function showsTotalTasks() {
	let totalTaks = arrayTask.length;
	spanValue.textContent = totalTaks;
}

function showsCompletedTasks() {
	let completedTasks = 0
	arrayTask.forEach(e => {
		if (e.status == true) {
			completedTasks += 1
		}
	})
	spanDoneTask.textContent = completedTasks;
	spanDoneTaskTwo.textContent = `из ${arrayTask.length}`;
}

function renderTask() {
	btnInput.addEventListener('click', () => {
		if (todoInput.value) {
			let task = creationObjectTask();
			explanations.remove();
			let liTask = renderLi();
			let checkTask = render(liTask, renderCheck());
			let pTask = render(liTask, renderP());
			let removeBtn = render(liTask, renderBtnDelete());
			render(todoList, liTask);
			todoInput.value = '';
			deleteTask(removeBtn, liTask, task.id);
			choiceCheck(checkTask, task, pTask);
			showsTotalTasks();
			if (arrayTask.length !== 0) {
				showsCompletedTasks();
			}
			console.log(arrayTask);
		}
	})
}

renderTask();

