<template>
  <div class="container" v-if="!token">
    <h1 class="title">Auth</h1>
    <h1>hello</h1>
    <div>
      <h2>Register</h2>
      <input class="input" v-model="username" placeholder="Username"/>
      <input class="input" v-model="password" type="password" placeholder="Password"/>
      <button class="button" @click="registerUser">Register</button>
      <p>Логин и пороль: 123</p>
      <h2>Login</h2>
      <button class="button" @click="loginUser">Login</button>
    </div>
  </div>

  <div v-else class="container">
    <h2>Welcome, {{ user?.username }}</h2>
    <button class="button" @click="logoutUser">Logout</button>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import {fetchCurrentUser, handleRegister, handleLogin, logout} from "../../api/users.js";

// Локальное состояние
const username = ref('');
const password = ref('');
const token = ref(localStorage.getItem('token') || null);
const user = ref(null);

//Функции-обёртка
const fetchUser = () => fetchCurrentUser(token.value, user, () => logout(token, user))
const registerUser = ()=> handleRegister(username.value, password.value)
const loginUser = ()=> handleLogin(username.value, password.value, token, fetchUser)

const logoutUser = ()=> logout(token, user)

// Запуск действия при загрузке компонента
onMounted(fetchCurrentUser);
</script>


