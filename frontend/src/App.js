import { useState} from "react";
import axios from "axios";

function App() {
  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await axios.get("https://taskmanager-backend-nqjs.onrender.com");
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title || !dueDate) {
      alert("Please fill all fields");
      return;
    }

    await axios.post("https://taskmanager-backend-nqjs.onrender.com", {
      title,
      dueDate,
      priority,
    });

    setTitle("");
    setDueDate("");
    setPriority("Medium");

    fetchTasks();
  };

  const toggleComplete = async (id) => {
    await axios.put(`https://taskmanager-backend-nqjs.onrender.com${id}`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`https://taskmanager-backend-nqjs.onrender.com${id}`);
    fetchTasks();
  };

  return (
    <div style={styles.page}>

      <div style={styles.card}>

        <h1 style={styles.heading}>Smart Task Manager</h1>

        <p style={styles.subheading}>
          Organize tasks with deadlines and priorities
        </p>

        <div style={styles.form}>

          <input
            style={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Task title"
          />

          <input
            style={styles.input}
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />

          <select
            style={styles.input}
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>

          <button
            style={styles.addButton}
            onClick={addTask}
          >
            Add Task
          </button>

        </div>

        <div style={styles.taskList}>

          {tasks.length === 0 ? (

            <p style={styles.empty}>
              No tasks available
            </p>

          ) : (

            tasks.map((task) => (

              <div
                key={task.id}
                style={{
                  ...styles.taskItem,

                  borderLeft:
                    task.priority === "High"
                      ? "8px solid #ef4444"
                      : task.priority === "Medium"
                      ? "8px solid #facc15"
                      : "8px solid #22c55e",
                }}
              >

                <div>

                  <h3
                    style={{
                      ...styles.taskTitle,
                      textDecoration:
                        task.completed
                          ? "line-through"
                          : "none",
                    }}
                  >
                    {task.title}
                  </h3>

                  <p style={styles.taskText}>
                    Due: {task.dueDate}
                  </p>

                  <p
                    style={{
                      ...styles.taskText,
                      color:
                        task.priority === "High"
                          ? "#ef4444"
                          : task.priority === "Medium"
                          ? "#facc15"
                          : "#22c55e",

                      fontWeight: "bold",
                    }}
                  >
                    Priority: {task.priority}
                  </p>

                  <p style={styles.taskText}>
                    Status:{" "}
                    {task.completed
                      ? "Completed"
                      : "Pending"}
                  </p>

                </div>

                <div style={styles.actions}>

                  <button
                    style={styles.doneButton}
                    onClick={() =>
                      toggleComplete(task.id)
                    }
                  >
                    {task.completed ? "Undo" : "Done"}
                  </button>

                  <button
                    style={styles.deleteButton}
                    onClick={() =>
                      deleteTask(task.id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </div>

            ))

          )}

        </div>

      </div>

    </div>
  );
}

const styles = {

  page: {
    minHeight: "100vh",
    background:
      "linear-gradient(135deg, #0f172a, #1e293b)",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    padding: "30px",

    fontFamily: "Arial",
    color: "white",
  },

  card: {
    width: "800px",

    backgroundColor: "#111827",

    padding: "30px",

    borderRadius: "18px",

    boxShadow:
      "0 20px 40px rgba(0,0,0,0.4)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "5px",
  },

  subheading: {
    textAlign: "center",
    color: "#cbd5e1",
    marginBottom: "25px",
  },

  form: {
    display: "grid",

    gridTemplateColumns:
      "2fr 1.5fr 1fr 1fr",

    gap: "10px",

    marginBottom: "25px",
  },

  input: {
    padding: "12px",

    borderRadius: "8px",

    border: "none",

    outline: "none",
  },

  addButton: {
    padding: "12px",

    borderRadius: "8px",

    border: "none",

    backgroundColor: "#2563eb",

    color: "white",

    fontWeight: "bold",

    cursor: "pointer",
  },

  taskList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },

  taskItem: {
    backgroundColor: "#1f2937",

    padding: "18px",

    borderRadius: "12px",

    display: "flex",

    justifyContent: "space-between",

    alignItems: "center",
  },

  taskTitle: {
    margin: "0 0 8px 0",
  },

  taskText: {
    margin: "4px 0",
    color: "#cbd5e1",
  },

  actions: {
    display: "flex",
    gap: "10px",
  },

  doneButton: {
    padding: "10px",

    border: "none",

    borderRadius: "8px",

    backgroundColor: "#16a34a",

    color: "white",

    cursor: "pointer",
  },

  deleteButton: {
    padding: "10px",

    border: "none",

    borderRadius: "8px",

    backgroundColor: "#dc2626",

    color: "white",

    cursor: "pointer",
  },

  empty: {
    textAlign: "center",
    color: "#94a3b8",
  },
};

export default App;