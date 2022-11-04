import { createRouter, createWebHistory, RouteRecordRaw, RouterOptions } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SearchFriends from "../views/SearchFriends.vue";
import LoginGuard from "../views/LoginGuard.vue";
import authService from "../services/AuthService";
import useUserStore from "../store/user/useUserStore";

const routes: RouteRecordRaw[] = [
  { path: '/',name:"Login2",component: Login},
  { path: "/login",name:"Login", component: Login },
  { path: "/search-friends",name:"Search friends", component: SearchFriends },
  {path:'/login-guard',name:"Login guard",component:LoginGuard}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const GUARD_PATHS = [ "/search-friends"];
router.beforeEach((guard) => {
  const { path } = guard;
  if (!!GUARD_PATHS.find((eachPath) => path === eachPath)) {
    if (!authService.validateAuthToken()) {
      const { logout } = useUserStore();
      logout();
      return { path: "/login-guard", query: {} };
    }
    return true;
  }
  return true;
});

export default router;
