const API = "/api/students";

async function addStudent() {
    const student = {
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        course: document.getElementById("course").value
    };

    await fetch(API,{
        method:"POST",
        headers:{
            "Content-Type":"application/json"
        },
        body:JSON.stringify(student)
    });

    loadStudents();
}

async function loadStudents() {
    const res = await fetch(API);
    const data = await res.json();

    let output = "";

    data.forEach(student => {
        output += `
        <div class="card">
            <h3>${student.name}</h3>
            <p>${student.email}</p>
            <p>${student.course}</p>
            <button onclick="deleteStudent('${student._id}')">
                Delete
            </button>
        </div>`;
    });

    document.getElementById("students").innerHTML = output;
}

async function deleteStudent(id) {
    await fetch(API + "/" + id,{
        method:"DELETE"
    });

    loadStudents();
}

loadStudents();