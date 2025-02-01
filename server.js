const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Enable CORS for your front-end domain
app.use(cors({
  origin: 'https://digitalecho.xyz', // Replace with your front-end domain
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

// Middleware to parse JSON requests
app.use(express.json());

// In-memory storage for tasks (replace with a database in production)
let tasks = [
  { id: 1, task: 'Learn Full-Stack Development', completed: false },
  { id: 2, task: 'Build a To-Do List App', completed: false },
];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  if (!task) {
    return res.status(400).json({ error: 'Task is required' });
  }
  const newTask = { id: Date.now(), task, completed: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Update a task (mark as completed)
app.put('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === taskId);
  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }
  task.completed = !task.completed;
  res.json(task);
});

// Delete a task
app.delete('/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  tasks = tasks.filter((t) => t.id !== taskId);
  res.status(204).send();
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});