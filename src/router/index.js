import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AddTaskView from '../views/AddTaskView.vue'
import CardView from '../views/CardView.vue'
import ExitView from '../views/ExitView.vue'
import NotFoundView from '../views/NotFoundView.vue'
const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                requiresAuth: true,
            },
            children: [
                {
                    path: 'add-task',
                    name: 'add-task',
                    component: AddTaskView,
                },
                {
                    path: 'card/:id',
                    name: 'card',
                    component: CardView,
                },
                {
                    path: 'exit',
                    name: 'exit',
                    component: ExitView,
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: LoginView,
        },
        {
            path: '/register',
            name: 'register',
            component: RegisterView,
        },
        
        {
            path: '/:pathMatch(.*)*',
            name: 'not-found',
            component: NotFoundView,
        },
    ],
})
router.beforeEach((to) => {
    const isAuthenticated =
        localStorage.getItem('isAuthenticated') === 'true'
    if (to.meta.requiresAuth && !isAuthenticated) {
        return {
            name: 'login',
        }
    }
    if (
        (to.name === 'login' || to.name === 'register') &&
        isAuthenticated
    ) {
        return {
            name: 'home',
        }
    }
    return true
})
export default router