<template>
    <div class="container" v-if="!token">
      <h1 class="title">Auth</h1>
      <div>
        <h2>Register</h2>
        <input class="input" v-model="username" placeholder="Username" />
        <input class="input" v-model="password" type="password" placeholder="Password" />
        <button class="button" @click="handleRegister">Register</button>
        <p>Логин и пороль: 123</p>
        <h2>Login</h2>
        <button class="button" @click="handleLogin">Login</button>
      </div>
    </div>

    <div v-else class="container">
      <h2>Welcome, {{ user?.username }}</h2>
      <button class="button" @click="logout">Logout</button>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { register, login, getCurrentUser } from '../api';

// Локальное состояние
const username = ref('');
const password = ref('');
const token = ref(localStorage.getItem('token') || null);
const user = ref(null);

// Получение текущего пользователя
const fetchCurrentUser = async () => {
  if (token.value) {
    try {
      const response = await getCurrentUser(token.value);
      user.value = response.data;
    } catch (err) {
      console.error('Error fetching user:', err);
      logout();
    }
  }
};

// Обработка регистрации
const handleRegister = async () => {
  try {
    await register(username.value, password.value);
    alert('Registration successful. Now log in!');
  } catch (err) {
    console.error('Error registering:', err);
    alert('Registration failed!');
  }
};

// Обработка входа
const handleLogin = async () => {
  try {
    const response = await login(username.value, password.value);
    token.value = response.data.token;
    localStorage.setItem('token', token.value);

    await fetchCurrentUser();
    alert('Login successful!');
  } catch (err) {
    console.error('Error logging in:', err);
    alert('Login failed!');
  }
};

// Выход из аккаунта
const logout = () => {
  token.value = null;
  user.value = null;
  localStorage.removeItem('token');
};

// Запуск действия при загрузке компонента
onMounted(fetchCurrentUser);
</script>


