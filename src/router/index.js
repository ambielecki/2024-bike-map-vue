import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MapIndexView from "@/views/Map/MapIndexView.vue";
import MapCreateView from "@/views/Map/MapCreateView.vue";

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
            component: MapCreateView
        }
    ]
})

export default router
