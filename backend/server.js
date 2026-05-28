const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let tasks = [];

app.get("/", (req, res) => {
  res.send("Task Manager Backend Running");
});

app.get("/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/tasks", (req, res) => {
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    dueDate: req.body.dueDate,
    priority: req.body.priority,
    completed: false,
  };

  tasks.push(newTask);
  res.json({ message: "Task Added Successfully", task: newTask });
});

app.put("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );

  res.json({ message: "Task Updated Successfully" });
});

app.delete("/tasks/:id", (req, res) => {
  const id = Number(req.params.id);

  tasks = tasks.filter((task) => task.id !== id);

  res.json({ message: "Task Deleted Successfully" });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});