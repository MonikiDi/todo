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

function Task(text, status) {
	this.id = Date.now();
	this.text = text;
	this.status = status;
}
function TaskService() {
	let tasks = [];

	function addTask(text, status = false) {
		tasks.push(new Task(text, status))
	}

	function removeTask(id) {
		tasks = tasks.filter((task) => task.id !== id)
	}

	function updateTask(id, newTask) {
		tasks = tasks.map((task) => {
			return task.id === id ? {
				...task,
				...newTask
			} : task
		})
	}

	function getAllTask() {
		return tasks
	}

	function getTask(id) {
		return tasks.filter((task) => task.id === id)[0]
	}

	return {
		addTask: addTask,
		removeTask: removeTask,
		updateTask: updateTask,
		getAllTask: getAllTask,
		getTask: getTask
	}
}

function addEvent(el, trigger, cb) {
	el.addEventListener(trigger, cb)

	return function removeEvent() {
		el.removeEventListener(trigger,cb)
	}
}

function TaskComponent(taskService) {
	this.listener = [];
	this.taskService = taskService;

	function templateTask(task) {
		return `
		<li class="todo__item custom-checkbox__text">
			<input id="done_task_${task.id}" type="checkbox" class="custom-checkbox__input" ${task.status && 'checked'}>
			<p class="todo__p ${task.status && 'delete__p'}">${task.text}</p>
			<button id="delete_${task.id}" class="btn-remove btn-reset"></button>
		</li>
	`
	}

	const renderTasks = () => {
		eventUnsubscription();

		clear();
		renderInfoTask();

		const tasks = this.taskService.getAllTask();
		if(!tasks.length) {
			return todoTask.append(explanations)
		}

		todoList.innerHTML = tasks.map(templateTask).join('')

		eventSubscription(tasks)
	}

	const clear = () => {
		todoList.innerHTML = '';
		explanations.remove()
	}

	const renderInfoTask =() => {
		const tasks = this.taskService.getAllTask();
		spanValue.textContent = tasks.length.toString()
		spanDoneTask.textContent = tasks.filter(({status}) => status).length.toString()
		spanDoneTaskTwo.textContent = `из ${tasks.length}`;
	}

	const  eventUnsubscription =() => {
		this.listener.forEach((unsubscribe) => unsubscribe())
		this.listener = [];
	}

	const eventSubscription = () => {
		this.taskService.getAllTask().forEach((task) => {
			const nodeDelete = todoList.querySelector(`#delete_${task.id}`)
			const nodeDone = todoList.querySelector(`#done_task_${task.id}`)

			this.listener.push(addEvent(nodeDelete, 'click', () => {
				this.taskService.removeTask(task.id);
				renderTasks(taskService)
			}))
			this.listener.push(addEvent(nodeDone, 'click', (event) => {
				this.taskService.updateTask(task.id, {
					status: event.target.checked
				});
				renderTasks(taskService)
			}))
		})
	}

	return {
		render: renderTasks.bind(this)
	}
}

function app() {
	const taskService = new TaskService();
	const component = new TaskComponent(taskService);

	component.render();

	btnInput.addEventListener('click', () => {
		taskService.addTask(todoInput.value)
		component.render()
	})
}

app()
