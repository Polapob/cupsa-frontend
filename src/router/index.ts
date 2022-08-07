import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import SearchFriends from "../views/SearchFriends.vue";
import CheckMemberStatus from "../views/CheckMemberStatus.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/search-friends", component: SearchFriends },
  { path: "/check-member-status", component: CheckMemberStatus },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
