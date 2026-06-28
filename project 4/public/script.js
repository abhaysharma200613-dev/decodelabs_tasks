const API = "http://localhost:5000/tasks";

async function loadTasks() {

    const res = await fetch(API);

    const tasks = await res.json();

    let html = "";

    tasks.forEach(task => {

        html += `
        <div class="task">

            <span class="${task.completed ? 'completed' : ''}">
                ${task.title}
            </span>

            <div class="actions">

                <button class="complete"
                onclick="completeTask(${task.id})">
                Complete
                </button>

                <button class="delete"
                onclick="deleteTask(${task.id})">
                Delete
                </button>

            </div>

        </div>
        `;

    });

    document.getElementById("taskList").innerHTML = html;

}

async function addTask() {

    const title = document.getElementById("taskInput").value;

    if(title==""){
        alert("Please enter a task");
        return;
    }

    await fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify({title})
    });

    document.getElementById("taskInput").value="";

    loadTasks();

}

async function completeTask(id){

    await fetch(API+"/"+id,{
        method:"PUT"
    });

    loadTasks();

}

async function deleteTask(id){

    await fetch(API+"/"+id,{
        method:"DELETE"
    });

    loadTasks();

}

loadTasks();