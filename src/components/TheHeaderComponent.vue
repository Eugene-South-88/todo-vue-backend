<template>
  <header class="header">
    <div class="logo">
      <h2>Welcome, {{ user?.username }}</h2>
    </div>
    <nav>
      <ul class="nav-links">
        <li>
          <button class="button" @click="logoutUser">Logout</button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import {onMounted, ref} from "vue";
import router from "../router/router.js";

import {logout} from "../api/users.js";
import {getCurrentUser} from "../api/api.js";

const token = ref(localStorage.getItem('token') || null);
const user = ref(null);

const logoutUser = () => {
  logout(token, user)
  router.push('/login')
}

onMounted(() => {
  getCurrentUser()
      .then((res) => {
        user.value = res.data;
      })
      .catch((err) => {
        console.error('Error fetching user:', err);

        logoutUser();
      })
});
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #2c3e50;
  color: white;
}

.logo h1 {
  margin: 0;
}

.nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
}

.nav-links li {
  margin-left: 20px;
}

.nav-links a {
  color: white;
  text-decoration: none;
  font-size: 16px;
}

.nav-links a:hover {
  text-decoration: underline;
}
</style>
