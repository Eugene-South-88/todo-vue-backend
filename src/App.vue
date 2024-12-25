<script setup>
import {storeToRefs} from "pinia";
import {useMainStore} from "./store/main.js";

import AppLayout from "./layouts/AppLayout.vue";
import AuthLayout from "./layouts/AuthLayout.vue";

const components = {
  AppLayout,
  AuthLayout
};

const store = useMainStore();
const {activeLayout} = storeToRefs(store);
</script>

<template>
  <component :is="components[activeLayout]"/>
</template>

<script>

</script>
