
from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)

students = []

@app.route("/")
def home():
    return render_template("index.html", students=students)

@app.route("/add", methods=["POST"])
def add_student():
    name = request.form["name"]
    age = request.form["age"]
    course = request.form["course"]

    student = {
        "name": name,
        "age": age,
        "course": course
    }

    students.append(student)
    return redirect(url_for("home"))

if __name__ == "__main__":
    app.run(debug=True)
