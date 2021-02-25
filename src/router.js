import { createRouter, createWebHistory } from 'vue-router'
import AllDogs from './pages/AllDogs.vue'
//import Signup from './pages/Signup.vue'
//import Login from './pages/Login.vue'
import MyLikes from './pages/MyLikes.vue'
import store from './store/index.js'
import NotFound from './pages/NotFound.vue'

const Signup = () => import('./pages/Signup.vue')
const Login = () => import('./pages/Login.vue')

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: '/dogs',
    },
    {
      path: '/dogs',
      component: AllDogs,
    },
    {
      path: '/signup',
      component: Signup,
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/likes',
      component: MyLikes,
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: '/:notFound(.*)',
      component: NotFound,
    },
  ],
})

router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth && !store.getters['auth/isAuthenticated']) {
    next('/login')
  } else {
    next()
  }
})

export default router
