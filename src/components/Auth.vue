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

<script>
import { register, login, getCurrentUser } from '../api';

export default {
  data() {
    return {
      username: '',
      password: '',
      token: localStorage.getItem('token') || null,
      user: null,
    };
  },
  async created() {
    if (this.token) {
      try {
        const response = await getCurrentUser(this.token);
        this.user = response.data;
      } catch (err) {
        console.error('Error fetching user:', err);
        this.logout();
      }
    }
  },
  methods: {
    async handleRegister() {
      try {
        await register(this.username, this.password);
        alert('Registration successful. Now log in!');
      } catch (err) {
        console.error('Error registering:', err);
        alert('Registration failed!');
      }
    },
    async handleLogin() {
      try {
        const response = await login(this.username, this.password);
        this.token = response.data.token;
        localStorage.setItem('token', this.token);

        const userResponse = await getCurrentUser(this.token);
        this.user = userResponse.data;
        alert('Login successful!');
      } catch (err) {
        console.error('Error logging in:', err);
        alert('Login failed!');
      }
    },
    logout() {
      this.token = null;
      this.user = null;
      localStorage.removeItem('token');
    },
  },
};
</script>
