import { register, login, getCurrentUser } from './api.js';
import router from "../router/router.js";

export const fetchCurrentUser = async (token, userRef, logoutCallback) => {
  if (token) {
    try {
      const response = await getCurrentUser(token);
      userRef.value = response.data;
    } catch (err) {
      console.error('Error fetching user:', err);
      logoutCallback();
    }
  }
};

export const handleRegister = async (username, password) => {
  try {
    await register(username, password);
    alert('Registration successful. Now log in!');
  } catch (err) {
    console.error('Error registering:', err);
    alert('Registration failed!');
  }
};

export const handleLogin = async (username, password, tokenRef, fetchUserCallback) => {
  try {
    const response = await login(username, password);
    tokenRef.value = response.data.token;
    localStorage.setItem('token', tokenRef.value);

    await fetchUserCallback();
  } catch (err) {
    console.error('Error logging in:', err);
    alert('Login failed!');
  }
};

export const logout = (tokenRef, userRef) => {
  // Очистка данных токена и пользователя
  tokenRef.value = null;
  userRef.value = null;

  // Удаление токена из локального хранилища
  localStorage.removeItem('token');

  // Очистка кэшированных данных и сессионных данных, если есть
  sessionStorage.clear();
  localStorage.clear(); // или удаление только специфичных данных, если нужно

  // Перенаправление на страницу входа или главную
  router.push('/login');
};

