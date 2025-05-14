
function openModal() {
    document.getElementById("crud-modal").classList.remove("hidden");
}

function closeModal() {
    document.getElementById("crud-modal").classList.add("hidden");
}

document.getElementById("open-modal").addEventListener("click", openModal);
document.getElementById("close-modal").addEventListener("click", closeModal);
document.getElementById("task-form").addEventListener("submit", addTask);

let tasks = [];

function addTask(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    if (name === "" || description === "") {
        alert("Please enter both task & description.");
        return;
    }

    const validCategories = ["todo", "inprogress", "done"];
    if (!validCategories.includes(category)) {
        alert("Category is not valid");
        return;
    }

    const task = {
        name,
        description,
        category
    };

    tasks.push(task);
    renderTasks();
    resetForm();
    closeModal();
}

function renderTasks() {
    document.getElementById("todo-tasks").innerHTML = "";
    document.getElementById("inprogress-tasks").innerHTML = "";
    document.getElementById("done-tasks").innerHTML = "";

    tasks.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.classList.add("bg-gray-100", "p-2", "rounded", "w-full", "mt-2", "shadow", "overflow-y-auto");
        taskElement.innerHTML = `

            <strong>${task.name}</strong>
            <p>${task.description}</p>

            <div c">
            <button class='edit-btn bg-blue-500 text-white px-2 py-1 rounded' onclick='editTask(${index})'>Edit</button>
            <button class='delete-btn bg-red-500 text-white px-2 py-1 rounded' onclick='deleteTask(${index})'>Delete</button>

            </div>

        `;
        document.getElementById(task.category + "-tasks").appendChild(taskElement);
    });
}

function resetForm() {
    document.getElementById("name").value = "";
    document.getElementById("description").value = "";
}

function editTask(index) {
    document.getElementById("category").classList.remove("hidden");
    document.getElementById("name").value = tasks[index].name;
    document.getElementById("description").value = tasks[index].description;

    tasks.splice(index, 1);
    renderTasks();
    openModal();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

