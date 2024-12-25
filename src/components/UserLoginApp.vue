<template>
  <div class="container" v-if="!token">
    <h1 class="title">Вход</h1>

    <div>
      <input class="input" v-model="username" placeholder="Имя"/>

      <input class="input" v-model="password" type="password" placeholder="Пароль"/>

      <button class="button" @click="loginUser">Войти</button>
      <p
          style="cursor: pointer; color: blue"
      >
        Зарегистрироваться
      </p>
    </div>
  </div>

  <div v-else-if="token" class="container">
    <h2>Welcome, {{ user?.username }}</h2>

    <button class="button" @click="logoutUser">Logout</button>
  </div>
</template>

<script setup>
import {fetchCurrentUser, handleLogin, logout} from "../api/users.js";
import {onMounted, ref} from "vue";
import router from "../router/router.js";

const username = ref('');
const password = ref('');
const token = ref(localStorage.getItem('token') || null);
const user = ref(null);

const fetchUser = async () => await fetchCurrentUser(token.value, user, () => logout(token, user))

const loginUser = async () => {
  await handleLogin(username.value, password.value, token, fetchUser)
  await router.push('/')
}

const logoutUser = () => logout(token, user);

onMounted(() => {
  fetchUser();
})
</script>

<style lang="scss" scoped>

</style>
