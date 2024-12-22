<template>
    <Auth />
    <Items />
</template>

<script>
import Auth from './components/Auth.vue';
import Items from './components/Items.vue';

export default {
  components: {
    Auth,
    Items,
  },
};
</script>
