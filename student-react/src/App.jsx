import { useEffect, useState } from "react";

function App() {
  const [students, setStudents] = useState([]);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [course, setCourse] = useState("");
  const [marks, setMarks] = useState("");

  const [updateName, setUpdateName] = useState("");
  const [updateMarks, setUpdateMarks] = useState("");

  // GET - Get all students
  const getStudents = async () => {
    const response = await fetch("http://localhost:3000/students");
    const data = await response.json();
    setStudents(data);
  };

  useEffect(() => {
    getStudents();
  }, []);

  // POST - Add student
  const addStudent = async () => {
    await fetch("http://localhost:3000/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: name,
        age: Number(age),
        course: course,
        marks: Number(marks)
      })
    });

    setName("");
    setAge("");
    setCourse("");
    setMarks("");

    getStudents();
  };

  // PUT - Update student
  const updateStudent = async () => {
    await fetch(`http://localhost:3000/students/${updateName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        marks: Number(updateMarks)
      })
    });

    setUpdateName("");
    setUpdateMarks("");

    getStudents();
  };

  // DELETE - Delete student
  const deleteStudent = async (studentName) => {
    await fetch(`http://localhost:3000/students/${studentName}`, {
      method: "DELETE"
    });

    getStudents();
  };

  return (
    <div>
      <h1>Student Management System</h1>

      <h2>Add Student</h2>

      <input
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />

      <input
        placeholder="Course"
        value={course}
        onChange={(e) => setCourse(e.target.value)}
      />

      <input
        placeholder="Marks"
        value={marks}
        onChange={(e) => setMarks(e.target.value)}
      />

      <button onClick={addStudent}>Add Student</button>

      <h2>Update Student</h2>

      <input
        placeholder="Student Name"
        value={updateName}
        onChange={(e) => setUpdateName(e.target.value)}
      />

      <input
        placeholder="New Marks"
        value={updateMarks}
        onChange={(e) => setUpdateMarks(e.target.value)}
      />

      <button onClick={updateStudent}>Update Marks</button>

      <h2>Students</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Name</th>
            <th>Age</th>
            <th>Course</th>
            <th>Marks</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {students.map((student) => (
            <tr key={student._id}>
              <td>{student.name}</td>
              <td>{student.age}</td>
              <td>{student.course}</td>
              <td>{student.marks}</td>
              <td>
                <button onClick={() => deleteStudent(student.name)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;