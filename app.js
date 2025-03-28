require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const todosRouter = require('./routes/todos');

const app = express();
const port = process.env.PORT || 3000;

// Подключение к MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Успешное подключение к MongoDB'))
  .catch((err) => console.error('Ошибка подключения к MongoDB:', err));

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Базовый маршрут
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// Маршрут Каталог
app.get('/catalog', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'catalog.html'));
});

// Маршрут О нас
app.get('/about', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'about.html'));
});

// Маршрут Корзина
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'cart.html'));
});

// Подключаем маршруты todos
app.use('/todos', todosRouter);

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
}); 