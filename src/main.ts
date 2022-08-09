import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { faArrowLeft, faArrowRight, faUserSecret } from "@fortawesome/free-solid-svg-icons";
import { VueQueryPlugin } from "vue-query";

library.add(faArrowLeft, faArrowRight, faUserSecret);

createApp(App).component("font-awesome-icon", FontAwesomeIcon).use(router).use(VueQueryPlugin).mount("#app");
