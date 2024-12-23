<template>
    <Auth />
    <Items />
</template>

<script>
import Auth from './components/AuthComponent.vue';
import Items from './components/ItemsComponent.vue';

export default {
  components: {
    Auth,
    Items,
  },
};
</script>
