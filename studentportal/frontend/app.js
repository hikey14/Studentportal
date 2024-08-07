document.getElementById('addStudentButton').addEventListener('click', addStudent);

function addStudent() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const attendance = document.getElementById('attendance').value;
    const cgpa = document.getElementById('cgpa').value;

    fetch('http://localhost:5000/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, age, attendance, cgpa })
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            console.error('Error:', data.error);
        } else {
            appendStudent(data);
        }
    });
}

function fetchStudents() {
    fetch('http://localhost:5000/students')
    .then(response => response.json())
    .then(data => {
        const studentList = document.getElementById('studentList');
        studentList.innerHTML = '';
        data.forEach(student => appendStudent(student));
    });
}

function appendStudent(student) {
    const studentList = document.getElementById('studentList');
    const li = document.createElement('li');
    li.textContent = `${student.name} - Age: ${student.age}, Attendance: ${student.attendance}%, CGPA: ${student.cgpa}`;
    studentList.appendChild(li);
}

document.addEventListener('DOMContentLoaded', fetchStudents);
