import { createRouter, createWebHistory, RouteRecordRaw, RouterOptions } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SearchFriends from "../views/SearchFriends.vue";
import LoginGuard from "../views/LoginGuard.vue";
import authService from "../services/AuthService";
import useUserStore from "../store/user/useUserStore";
import ViewFriend from "../views/ViewFriend.vue";

const routes: RouteRecordRaw[] = [
  { path: "/", name: "Login2", component: Login },
  { path: "/login", name: "Login", component: Login },
  { path: "/search-friends", name: "Search friends", component: SearchFriends },
  { path: "/login-guard", name: "Login guard", component: LoginGuard },
  { path: "/view-friend/:id", name: "View friend", component: ViewFriend, props: true },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((guard) => {
  const { path } = guard;
  if (path == "/search-friends" || path.includes("/view-friend")) {
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
