import { defineStore } from 'pinia';

export const useMainStore = defineStore('main', {
  state: () => ({
    activeLayout: 'AuthLayout',
  }),
});
