function addTask() {
  const taskInput = document.getElementById('task-input');
  const taskText = taskInput.value.trim();

  if (taskText !== '') {
      const taskList = document.getElementById('task-list');
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `
          <span>${taskText}</span>
          <div>
              <button class="complete-button" onclick="markComplete(this)">Complete</button>
              <button class="edit-button" onclick="editTask(this)">Edit</button>
              <button class="delete-button" onclick="deleteTask(this)">Delete</button>
          </div>
      `;
      taskList.appendChild(taskItem);
      taskInput.value = '';

      saveTasksToLocalStorage();
  }
}

function markComplete(button) {
  const taskItem = button.parentElement.parentElement;
  taskItem.classList.toggle('completed');
  saveTasksToLocalStorage();
}

function editTask(button) {
  const taskItem = button.parentElement.parentElement;
  const taskText = taskItem.querySelector('span');
  const newText = prompt('Edit task:', taskText.textContent);

  if (newText !== null) {
      taskText.textContent = newText;
      saveTasksToLocalStorage();
  }
}

function deleteTask(button) {
  const taskItem = button.parentElement.parentElement;
  taskItem.remove();
  saveTasksToLocalStorage();
}

function saveTasksToLocalStorage() {
  const taskList = document.getElementById('task-list').innerHTML;
  localStorage.setItem('tasks', taskList);
}

const savedTasks = localStorage.getItem('tasks');
if (savedTasks) {
  document.getElementById('task-list').innerHTML = savedTasks;
}

function resetTasks() {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';
  localStorage.removeItem('tasks'); 
}

document.getElementById('reset-button').addEventListener('click', resetTasks);

function filterTasks() {
  const statusFilter = document.getElementById('status-filter');
  const selectedStatus = statusFilter.value.toLowerCase();

  const taskList = document.getElementById('task-list');
  const tasks = taskList.querySelectorAll('li');

  tasks.forEach(task => {
      const isCompleted = task.classList.contains('completed');
      if (selectedStatus === 'all' || (selectedStatus === 'completed' && isCompleted) || (selectedStatus === 'pending' && !isCompleted)) {
          task.style.display = 'flex';
      } else {
          task.style.display = 'none';
      }
  });
}

document.getElementById('status-filter').addEventListener('change', filterTasks);
