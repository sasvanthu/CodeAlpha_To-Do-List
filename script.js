const form = document.getElementById('task-form');
const input = document.getElementById('task-input');
const list = document.getElementById('task-list');

// Load tasks from localStorage
window.addEventListener('DOMContentLoaded', () => {
  const savedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  savedTasks.forEach(task => addTaskToDOM(task.text, task.completed));
});

form.addEventListener('submit', e => {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText !== '') {
    addTaskToDOM(taskText);
    input.value = '';
    saveTasks();
  }
});

function addTaskToDOM(text, completed = false) {
  const li = document.createElement('li');
  if (completed) li.classList.add('completed');

  const span = document.createElement('span');
  span.textContent = text;
  span.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const actions = document.createElement('div');
  actions.classList.add('actions');

  const editBtn = document.createElement('button');
  editBtn.textContent = 'Edit';
  editBtn.onclick = () => {
    const newText = prompt('Edit your task:', span.textContent);
    if (newText) {
      span.textContent = newText.trim();
      saveTasks();
    }
  };

  const delBtn = document.createElement('button');
  delBtn.textContent = 'Delete';
  delBtn.onclick = () => {
    li.remove();
    saveTasks();
  };

  actions.append(editBtn, delBtn);
  li.append(span, actions);
  list.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  list.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.querySelector('span').textContent,
      completed: li.classList.contains('completed'),
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
