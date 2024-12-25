import {createRouter, createWebHistory} from 'vue-router'
import {useMainStore} from "../store/main.js";

import AuthView from "../views/AuthView.vue";
import AppView from "../views/AppView.vue";

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/login',
			component: AuthView,
			meta: {
				layout: 'AuthLayout',
			}
		},
		{
			path: '/',
			component: AppView,
			meta: {
				layout: 'AppLayout',
			}
		}
	]
});

router.afterEach((to) => {
	const store = useMainStore();

	store.activeLayout = to.meta.layout;
});

export default router;
