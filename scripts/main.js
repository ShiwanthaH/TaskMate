let storedTasks = [];

// access dom elements
const taskList = document.querySelector('.task-list');
const taskForm = document.querySelector('.task-form');

const title = document.getElementById("title");
const status = document.getElementById("status");
const date = document.getElementById("date");

// template objects
const taskDetails = (id, title, status, date) => {
    return (
    `
    <div class="task-details">
        <div class="details">
            <h3>${title}</h3>
            <p>Status: ${status}</p>
            <p>Date: ${date}</p>
        </div>
        <div class="actions" id="${id}">
            <select class="update-action">
                <option></option>
                <option value="to-do">To-do</option>
                <option value="doing">Doing</option>
                <option value="done">Done</option>
            </select>

            <button class="delete-btn">Delete</button>
        </div>
    </div>
    `)
}

// db processes
const addToLocalStorage = () => {
    const tasksJSON = JSON.stringify(storedTasks);
    localStorage.setItem("tasks", tasksJSON);
}

// handle form submit
taskForm.addEventListener('submit', (e) => {
    addTask(e);
});

// init delete buttons
const initDeleteBtns = () => {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
        btn.addEventListener('click', (e) => {
            deleteTask(e);
        })
    })
}
 
// init action dropdowns
const initSelectActions = () => {
    document.querySelectorAll(".update-action").forEach((select) => {
        select.addEventListener('change', (e) => {
            updateTask(e);
        })
    })
}

// get tasks
const getTasks = () => {
    if(localStorage.getItem('tasks')) {
        const storedTasksJSON = localStorage.getItem("tasks");
        storedTasks = JSON.parse(storedTasksJSON);
        storedTasks.map((task, index) => {
            taskList.innerHTML += taskDetails(index, task.title, task.status, task.date);
        })
        initDeleteBtns();
        initSelectActions();
        return;
    }

    const tasksJSON = JSON.stringify(tasksList);
    localStorage.setItem("tasks", tasksJSON);
    getTasks();
}

// add new task
const addTask = (e) => {
    e.preventDefault();
    if(title.value) {
        if(status.value) {
            if(date.value) {
                storedTasks.push({title: title.value, status:status.value, date:date.value});
                addToLocalStorage();
                taskList.innerHTML = "";
                getTasks();
            }
            console.error("Date is required");
        }
        console.error("Status is required");
    }
    console.error("Title is required");
}

// delete a task
const deleteTask = (e) => {
    const idx = e.target.parentElement.id;
    storedTasks.splice(idx, 1);
    addToLocalStorage();
    taskList.innerHTML = "";
    getTasks();
}

// update a task
const updateTask = (e) => {
    const idx = e.target.parentElement.id;
    console.log(idx, e.target.value);
    storedTasks = storedTasks.map((task, index) => {
        if(idx == index) {
            return {...task, status:e.target.value};
        }
        return task;
    })
    console.log(storedTasks);
    addToLocalStorage();
    taskList.innerHTML = "";
    getTasks();
}

getTasks();