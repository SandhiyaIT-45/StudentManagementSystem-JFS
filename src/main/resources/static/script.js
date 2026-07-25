let selectedStudentId = null;
document.getElementById("studentForm").addEventListener("submit", async function(event) {

    event.preventDefault();

    const student = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        department: document.getElementById("department").value,
        email: document.getElementById("email").value,
        marks: document.getElementById("marks").value
    };

    await fetch("http://localhost:8080/students", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    alert("Student Added Successfully");

    document.getElementById("studentForm").reset();
    loadStudents();
});
async function loadStudents() {

    const response = await fetch("http://localhost:8080/students");

    const students = await response.json();

    const tableBody = document.getElementById("studentTableBody");

    tableBody.innerHTML = "";

    students.forEach(student => {

        tableBody.innerHTML += `
            <tr>
                <td>${student.id}</td>
                <td>${student.name}</td>
                <td>${student.age}</td>
                <td>${student.department}</td>
                <td>${student.email}</td>
                <td>${student.marks}</td>
                <td><button onclick="editStudent(${student.id})">Edit</button></td>
                <td><button onclick="deleteStudent(${student.id})">Delete</button></td>
            </tr>
        `;
    });
}

loadStudents();
async function deleteStudent(id){
    await fetch(`http://localhost:8080/students/${id}`,{
        method: "DELETE"
    });
   loadStudents();
}
async function editStudent(id) {

    const response = await fetch(`http://localhost:8080/students/${id}`);

    const student = await response.json();

    selectedStudentId = id;

    document.getElementById("name").value = student.name;
    document.getElementById("age").value = student.age;
    document.getElementById("department").value = student.department;
    document.getElementById("email").value = student.email;
    document.getElementById("marks").value = student.marks;

    document.getElementById("updateButton").style.display = "inline-block";
}
async function updateStudent() {

    const student = {
        name: document.getElementById("name").value,
        age: document.getElementById("age").value,
        department: document.getElementById("department").value,
        email: document.getElementById("email").value,
        marks: document.getElementById("marks").value
    };

    await fetch(`http://localhost:8080/students/${selectedStudentId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(student)
    });

    alert("Student Updated Successfully");

    document.getElementById("studentForm").reset();

    document.getElementById("updateButton").style.display = "none";

    selectedStudentId = null;

    loadStudents();
}