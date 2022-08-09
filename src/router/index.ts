import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SearchFriends from "../views/SearchFriends.vue";
import CheckMemberStatus from "../views/CheckMemberStatus.vue";
import LoginGuard from "../views/LoginGuard.vue";
import authService from "../services/AuthService";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/search-friends", component: SearchFriends },
  { path: "/check-member-status", component: CheckMemberStatus },
  { path: "/login-guard", component: LoginGuard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const GUARD_PATHS = ["/check-member-status", "/search-friends"];
router.beforeEach((guard) => {
  const { path } = guard;
  if (!!GUARD_PATHS.find((eachPath) => path === eachPath)) {
    console.log("pass-this =", path);
    if (!authService.validateAuthToken()) {
      return { path: "/login-guard", query: {} };
    }
    return true;
  }
  return true;
});

export default router;
