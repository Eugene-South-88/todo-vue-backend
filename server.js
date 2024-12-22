import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
const PORT = 3000;
const SECRET_KEY = "supersecretkey"; // Меняйте на более сложный ключ в продакшене
const DATA_FILE = "./data.json";
const USERS_FILE = "./users.json";

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Инициализация данных
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}
if (!fs.existsSync(USERS_FILE)) {
  fs.writeFileSync(USERS_FILE, JSON.stringify([]));
}

// Чтение/запись данных
const readData = (file) => JSON.parse(fs.readFileSync(file, "utf-8"));
const writeData = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2));

// Middleware для проверки токена
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Token required" });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
};

// Регистрация пользователя
app.post("/auth/register", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const users = readData(USERS_FILE);
  const existingUser = users.find((u) => u.username === username);
  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: Date.now(), username, password: hashedPassword };
  users.push(newUser);
  writeData(USERS_FILE, users);

  res.status(201).json({ message: "User registered successfully" });
});

// Вход пользователя
app.post("/auth/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: "Username and password are required" });
  }

  const users = readData(USERS_FILE);
  const user = users.find((u) => u.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid username or password" });
  }

  const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, { expiresIn: "1h" });
  res.json({ token });
});

// Получить текущего пользователя
app.get("/auth/me", authenticateToken, (req, res) => {
  res.json(req.user);
});

// CRUD для элементов (с авторизацией)
app.get("/items", authenticateToken, (req, res) => {
  const data = readData(DATA_FILE);
  res.json(data);
});

app.get("/items/:id", authenticateToken, (req, res) => {
  const data = readData(DATA_FILE);
  const item = data.find((i) => i.id === parseInt(req.params.id));
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: "Item not found" });
  }
});

app.post("/items", authenticateToken, (req, res) => {
  const data = readData(DATA_FILE);
  const newItem = {
    id: Date.now(),
    ...req.body,
    userId: req.user.id, // Привязка элемента к пользователю
  };
  data.push(newItem);
  writeData(DATA_FILE, data);
  res.status(201).json(newItem);
});

app.put("/items/:id", authenticateToken, (req, res) => {
  const data = readData(DATA_FILE);
  const index = data.findIndex((i) => i.id === parseInt(req.params.id) && i.userId === req.user.id);
  if (index !== -1) {
    data[index] = { ...data[index], ...req.body };
    writeData(DATA_FILE, data);
    res.json(data[index]);
  } else {
    res.status(404).json({ error: "Item not found or not owned by user" });
  }
});

app.delete("/items/:id", authenticateToken, (req, res) => {
  const data = readData(DATA_FILE);
  const newData = data.filter((i) => i.id !== parseInt(req.params.id) || i.userId !== req.user.id);
  if (newData.length !== data.length) {
    writeData(DATA_FILE, newData);
    res.json({ message: "Item deleted" });
  } else {
    res.status(404).json({ error: "Item not found or not owned by user" });
  }
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
