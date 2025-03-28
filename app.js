require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const todosRouter = require('./routes/todos');

const app = express();
const port = process.env.PORT || 3000;

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((err) => console.error('Ошибка подключения к MongoDB:', err));

// Middleware
app.use(express.json());

// Базовый маршрут
app.get('/', (req, res) => {
  res.send('Добро пожаловать в Мебельный магазин!');
});

// Маршрут О нас
app.get('/about', (req, res) => {
  res.send('О нас');
});

// Подключаем маршруты todos
app.use('/todos', todosRouter);

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
}); 