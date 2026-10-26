from flask import Flask, render_template, request, redirect
import sqlite3

app = Flask(__name__)

def connect_db():
    return sqlite3.connect("students.db")

with connect_db() as con:
    con.execute("""
        CREATE TABLE IF NOT EXISTS students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            department TEXT NOT NULL
        )
    """)

@app.route("/")
def home():
    with connect_db() as con:
        students = con.execute("SELECT * FROM students").fetchall()
    return render_template("index.html", students=students)

@app.route("/add", methods=["POST"])
def add():
    name = request.form["name"].strip()
    department = request.form["department"].strip()

    if name and department:
        with connect_db() as con:
            con.execute(
                "INSERT INTO students (name, department) VALUES (?, ?)",
                (name, department)
            )
    return redirect("/")

@app.route("/update/<int:id>", methods=["POST"])
def update(id):
    name = request.form["name"].strip()
    department = request.form["department"].strip()

    if name and department:
        with connect_db() as con:
            con.execute(
                "UPDATE students SET name=?, department=? WHERE id=?",
                (name, department, id)
            )
    return redirect("/")

@app.route("/delete/<int:id>", methods=["POST"])
def delete(id):
    with connect_db() as con:
        con.execute("DELETE FROM students WHERE id=?", (id,))
    return redirect("/")

if __name__ == "__main__":
    app.run(debug=True)
