import Vue from 'vue';
import './plugins/vuetify'
import App from './App.vue';

Vue.config.productionTip = false;

import BootstrapVue from 'bootstrap-vue';
import './scss/theme.scss';
import 'vue-material-design-icons/styles.css';
import Fragment from 'vue-fragment';
import router from './router'

Vue.use(BootstrapVue);

Vue.use(Fragment.Plugin);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
