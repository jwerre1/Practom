import { createRouter, createWebHistory } from "vue-router";
import { getSession } from "@/services/DatabaseService.js";
import Home from "../views/Home.vue";
import SignIn from "../views/SignIn.vue";
import SignUp from "../views/SignUp.vue";
import Main from "../views/Main.vue";

const loggedInCheck = async (to, from, next) => {
  const session = await getSession();
  if (session) next({ name: "Main" });
  else next();
};

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/signup",
    name: "SignUp",
    component: SignUp,
    beforeEnter: loggedInCheck,
  },
  {
    path: "/signin",
    name: "Signin",
    component: SignIn,
    beforeEnter: loggedInCheck,
  },
  {
    path: "/main",
    name: "Main",
    component: Main,
    beforeEnter: async (to, from, next) => {
      if (from.path === "/signin" || from.path === "/signup") next();
      else {
        const session = await getSession();
        console.log(session);
        if (!session) next({ name: "Signin" });
        else next();
      }
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

// route level code-splitting
// this generates a separate chunk (about.[hash].js) for this route
// which is lazy-loaded when the route is visited.
//component: () =>
//  import(/* webpackChunkName: "about" */ "../views/SignUp.vue"),
