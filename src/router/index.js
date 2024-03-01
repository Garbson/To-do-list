import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "login",
      component: () => import("../views/LoginView.vue"),
    },
    {
      path: "/registro",
      name: "registro",
      component: () => import("../views/RegistroView.vue"),
    },
    {
      path: "/tarefas",
      name: "tarefas",
      component: () => import("../views/TarefasView.vue"),
      meta: { requiresAuth: true }, // Requer autenticação
    },
    {
      path: "/todolist",
      name: "TO DO LIST",
      component: () => import("../views/TodolistView.vue"),
      meta: { requiresAuth: true }, // Requer autenticação
    },
   
  ],
});

router.beforeEach((to, from, next) => {
  // Verifique se a rota requer autenticação
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // Verifique se o usuário está autenticado no Local Storage
    const auth = localStorage.getItem("auth");
    if (auth !== "true") { // Certifique-se de comparar com a string "true"
      // Redirecione para a página de login se o usuário não estiver autenticado
      next({ name: "login" });
    } else {
      // Continue para a rota desejada se o usuário estiver autenticado
      next();
    }
  } else {
    // Continue para a rota desejada se a autenticação não for necessária
    next();
  }
});

export default router;
