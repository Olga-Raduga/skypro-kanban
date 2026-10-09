import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '../views/AppLayout.vue'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import AddTaskView from '../views/AddTaskView.vue'
import CardView from '../views/CardView.vue'
import ExitView from '../views/ExitView.vue'
import NotFoundView from '../views/NotFoundView.vue'

import { hasSession } from '../services/session.js'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
          path: '/',
          component: AppLayout,

          children: [
            {
            path: '',
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
    },
  ],
})
router.beforeEach((to) => {
    const authenticated =
        hasSession()
    if (to.meta.requiresAuth && !authenticated) {
        return {
            name: 'login',
            query: {
                redirect: to.fullPath
            }
        }
    }
    if (
        authenticated &&
        (to.name === 'login' || to.name === 'register')
    ) {
        return {
            name: 'home',
        }
    }
    return true
})
export default router
