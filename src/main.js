import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import LoginPage from '@/components/LoginPage.vue'
import ToDos from "@/components/ToDos.vue";
import NoWhere from "@/components/NoWhere.vue";

Vue.use(VueRouter);

const routes = [
  { path: '*', component: NoWhere },
  { path: '/', component: LoginPage },
  { path: '/todos', component: ToDos },
];

Vue.config.productionTip = false;

const router = new VueRouter({
  mode:'history',
  routes,
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app')
