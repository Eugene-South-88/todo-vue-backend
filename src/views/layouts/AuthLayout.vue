<template>
  <user-login-app v-if="openLogin"/>
  <user-registration-app v-else/>
</template>

<script setup>
import UserLoginApp from "../../components/UserLoginApp.vue";
import UserRegistrationApp from "../../components/UserRegistrationApp.vue";
import {ref} from "vue";


const openLogin = ref(true)
</script>


