import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue')
  },
  {
    path: '/quadro-tarefas/:id',
    name: 'Frame',
    component: () => import(/* webpackChunkName: "about" */ '../views/FrameTasks.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
