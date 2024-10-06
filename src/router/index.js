import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapIndexView from "@/views/map/MapIndexView.vue";
import MapCreateView from "@/views/map/MapCreateView.vue";
import LoginView from "@/views/auth/LoginView.vue";
import { useUserStore } from "@/stores/user.js";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView
        },
        {
            path: '/map',
            name: 'map',
            component: MapIndexView
        },
        {
            path: '/map/create',
            name: 'map_create',
            component: MapCreateView,
            beforeEnter: (to, from) => {
                if (!useUserStore().is_logged_in && !useUserStore().checkCachedToken()) {
                    return false;
                }
            }
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView
        },
    ]
})

export default router
