import { createWebHistory,createRouter } from "vue-router";

const history = createWebHistory();
const routes = [
    {
      path: "/",
      name: 'Home',
      component: ()=> import('../views/Home.vue'),
    },
    {
      path: "/detail/:id",
      name: 'Detail',
      component: ()=> import('../views/Detail.vue'),
    }, 
  ]

const router = createRouter({
  history,
  routes,
})

export default router;