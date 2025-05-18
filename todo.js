let tasks = [];

function addTask() {
    const title = document.getElementById('taskTitle').value;
    const priority = document.getElementById('priority').value;
    const deadline = document.getElementById('deadline').value;

    if (!title || !deadline) return;

    tasks.push({
        title,
        priority,
        deadline
    });
    document.getElementById('taskTitle').value = '';
    document.getElementById('deadline').value = '';
    renderTasks();
}

function getDueStatus(deadline) {
    const today = new Date();
    const dueDate = new Date(deadline);
    const diff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    if (diff < 0) return {
        text: 'Overdue',
        class: 'overdue'
    };
    else return {
        text: `Due in ${diff} days`,
        class: 'upcoming'
    };
}

function renderTasks() {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    const statusFilter = document.getElementById('statusFilter').value;
    const priorityFilter = document.getElementById('priorityFilter').value;

    tasks.forEach((task, index) => {
        const due = getDueStatus(task.deadline);

        if ((statusFilter !== 'All' && due.text !== statusFilter && due.class !== statusFilter.toLowerCase()) ||
            (priorityFilter !== 'All' && task.priority !== priorityFilter)) return;

        const taskEl = document.createElement('div');
        taskEl.className = 'task';

        taskEl.innerHTML = `
      <input type="checkbox">
      <div class="task-info">
        <span><strong>${task.title}</strong></span>
        <span class="priority-tag">${task.priority}</span>
        <span>${task.deadline} <span class="${due.class}">${due.text}</span></span>
      </div>
      <div class="task-actions">
        <i class="fas fa-edit" onclick="editTask(${index})"></i>
        <i class="fas fa-trash" onclick="deleteTask(${index})"></i>
      </div>
    `;

        list.appendChild(taskEl);
    });
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

function editTask(index) {
    const task = tasks[index];
    document.getElementById('taskTitle').value = task.title;
    document.getElementById('priority').value = task.priority;
    document.getElementById('deadline').value = task.deadline;
    deleteTask(index);
}

function filterTasks() {
    renderTasks();
}
