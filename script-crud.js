const taskListContainer = document.querySelector('.app__section-task-list');
const taskForm = document.querySelector('.app__form-add-task');
const toggleTaskFormButton = document.querySelector('.app__button--add-task');
const formLabel = document.querySelector('.app__form-label');
const textArea = document.querySelector('.app__form-textarea');
const cancelButton = document.querySelector('.app__form-footer__button--cancel');

let tasks = [];

const taskIconSvg = `<svg class="app__section-task-icon-status" width="24" height="24" viewBox="0 0 24 24"
fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="12" cy="12" r="12" fill="#FFF" />
<path
    d="M9 16.1719L19.5938 5.57812L21 6.98438L9 18.9844L3.42188 13.4062L4.82812 12L9 16.1719Z"
    fill="#01080E" />
</svg>`

const clearForm = () => {
    textArea.value = '';
    taskForm.classList.add('hidden');
}

function createTask(task) {
    const li = document.createElement('li');
    li.classList.add('app__section-task-list-item');

    const svgIcon = document.createElement('svg');
    svgIcon.innerHTML = taskIconSvg;

    const paragraph = document.createElement('p');
    paragraph.classList.add('app__section-task-list-item-description');

    paragraph.textContent = task.description;

    li.appendChild(svgIcon);
    li.appendChild(paragraph);

    return li;
}

toggleTaskFormButton.addEventListener('click', () => {
    formLabel.textContent = "Adicionando tarefa";
    taskForm.classList.toggle('hidden');
});

taskForm.addEventListener('submit', (ev) => {
    ev.preventDefault();
    console.log(ev);
    const task = {
        description: textArea.value,
        done: false
    }
    tasks.push(task);
    const taskItem = createTask(task);
    taskListContainer.appendChild(taskItem);
    clearForm();
});

// tasks.forEach(task => {
//     const taskItem = createTask(task);
//     taskListContainer.appendChild(taskItem);
// });

cancelButton.addEventListener('click', () => {
    clearForm();
});

