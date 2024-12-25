<template>
  <div class="container" v-if="!token">
    <h1 class="title">Регистрация</h1>
    <div>
      <input class="input" v-model="username" placeholder="Имя"/>
      <input class="input" v-model="password" type="password" placeholder="Пороль"/>
      <button class="button" @click="registerUser">Зарегестрироваться</button>
    </div>
  </div>

  <div v-else-if="token" class="container">
    <h2>Welcome, {{ user?.username }}</h2>
    <button class="button" @click="logoutUser">Logout</button>
  </div>
</template>

<script setup>
import {handleRegister, fetchCurrentUser, logout} from "../api/users.js";
import {onMounted, ref} from "vue";

const username = ref('');
const password = ref('');
const token = ref(localStorage.getItem('token') || null);
const user = ref(null);

const fetchUser = async () => await fetchCurrentUser(token.value, user, () => logout(token, user))
const registerUser = async () => {
  await handleRegister(username.value, password.value)
}

const logoutUser = () => logout(token, user)

defineProps({
  token: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
})

onMounted(fetchUser)
</script>

<style lang="scss" scoped>

</style>
