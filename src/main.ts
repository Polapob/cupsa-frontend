import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeft, faArrowRight, faUserSecret, faAnglesUp } from "@fortawesome/free-solid-svg-icons";
import { VueQueryPlugin } from "vue-query";
import { createPinia } from "pinia";

const pinia = createPinia();

library.add(faArrowLeft, faArrowRight, faUserSecret, faAnglesUp);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router).use(VueQueryPlugin).use(pinia).mount("#app");
