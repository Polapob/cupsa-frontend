import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import CheckFriend from "../views/CheckFriend.vue";
import CheckMemberStatus from "../views/CheckMemberStatus.vue";
import Vue from "vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: Login },
  { path: "/check-friend", component: CheckFriend },
  { path: "/check-member-status", component: CheckMemberStatus },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
