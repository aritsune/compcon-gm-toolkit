import Vue from 'vue';
import './plugins/vuetify';
import App from './gm_toolkit/Main.vue';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

import router from './router';
import store from './store';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
