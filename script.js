const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearBtn = document.getElementById("clearBtn");
const emptyMessage = document.getElementById("emptyMessage");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.className = `task ${task.completed ? "completed" : ""}`;

    li.innerHTML = `
      <input type="checkbox" ${task.completed ? "checked" : ""}>
      <span class="task-text"></span>
      <button class="delete-btn">×</button>
    `;

    li.querySelector(".task-text").textContent = task.text;

    li.querySelector("input").addEventListener("change", () => {
      task.completed = !task.completed;
      saveTasks();
      renderTasks();
    });

    li.querySelector(".delete-btn").addEventListener("click", () => {
      tasks = tasks.filter((t) => t.id !== task.id);
      saveTasks();
      renderTasks();
    });

    taskList.appendChild(li);
  });

  const remaining = tasks.filter((task) => !task.completed).length;

  taskCount.textContent =
    `${remaining} ${remaining === 1 ? "task" : "tasks"} remaining`;

  emptyMessage.style.display =
    tasks.length === 0 ? "block" : "none";
}

function addTask() {
  const text = taskInput.value.trim();

  if (!text) {
    taskInput.focus();
    return;
  }

  tasks.push({
    id: Date.now(),
    text: text,
    completed: false
  });

  taskInput.value = "";
  saveTasks();
  renderTasks();
  taskInput.focus();
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    addTask();
  }
});

clearBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  saveTasks();
  renderTasks();
});

renderTasks();
