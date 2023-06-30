const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

const filterSelectMenu = document.getElementById("priorityFilter")

let task = JSON.parse(localStorage.getItem('task')) || [];

let filteredTasks = task;

taskForm.addEventListener("submit", submitHandler);
function submitHandler(e) {
  e.preventDefault();
  const data = new FormData(e.target);
  const dataObject = Object.fromEntries(data.entries());
  if(dataObject.task==''){
    window.alert("Task Can't be Empty")
    return;
  }
  e.target.reset();
  dataObject.id = Date.now();
  console.log(dataObject);
  task.push(dataObject);
  localStorage.setItem("task", JSON.stringify(task));
  filterTasks();
  renderTask();
}


taskList.addEventListener("click", deleteHandler);
function deleteHandler(e) {
  if (e.target.classList.contains("delete")) {
    const targetId = e.target.dataset.id;
    task = task.filter((item) => item.id !== Number(targetId));
    localStorage.setItem("task", JSON.stringify(task));
    filterTasks();
    renderTask();
  }
}

function getPriority(v) {
  switch (v) {
    case "1":
      return "High";
    case "2":
      return "Medium";
    case "3":
      return "Low";
    default:
      return "None";
  }
}

function renderTask() {
  taskList.innerHTML = "";
  sortedTasks = filteredTasks.sort((a, b) => b.id - a.id).sort((a, b) => a.priority - b.priority);
  
  sortedTasks.forEach((item) => {
    taskList.innerHTML += `
      <li>
      <span class="tasks">${item.task}</span>
      <span class="priority-${getPriority(item.priority)}">${getPriority(item.priority)}</span>
      <button class="delete" data-id="${item.id}">Delete</button></li>
    `;
  });
}

renderTask();


filterSelectMenu.addEventListener("change",filterTasks)

function filterTasks() {
  const selectedPriority = filterSelectMenu.value;
  console.log(selectedPriority)
  
  filteredTasks = task.filter((item) => {
    if (selectedPriority === "all") {
      return true; // Show all tasks
    } else {
      return item.priority === selectedPriority; // Show tasks with selected priority
    }
  });
  
  renderTask();
}
