document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const taskList = document.getElementById("taskList");

  function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const task = { id: Date.now(), text: taskText };
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));

    taskInput.value = "";
    renderTasks();
  }

  function loadTask() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    taskList.innerHTML = "";

    tasks.forEach(task => {
      const li = document.createElement("li");
      li.dataset.id = task.id;
      li.innerHTML = `
        <span>${task.text}</span>
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
      `;
      taskList.appendChild(li);
    });
  }

  function editTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const newText = prompt("Edit task:", task.text);
    if (newText === null || newText.trim() === "") return;

    task.text = newText.trim();
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  function deleteTask(taskId) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.id !== taskId);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }

  function renderTasks() {
    loadTask();
  }

  // Event delegation for buttons inside taskList
  taskList.addEventListener("click", (event) => {
    const li = event.target.closest("li");
    if (!li) return;

    const taskId = Number(li.dataset.id);

    if (event.target.classList.contains("edit-btn")) {
      editTask(taskId);
    } else if (event.target.classList.contains("delete-btn")) {
      deleteTask(taskId);
    }
  });

  // Expose addTask globally for your button
  window.addTask = addTask;

  // Initial render
  renderTasks();
});
