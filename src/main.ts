import Vue from 'vue';
import './plugins/vuetify';
import App from './App.vue';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

import 'vue-material-design-icons/styles.css';
import router from './router';
import store from './store';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
