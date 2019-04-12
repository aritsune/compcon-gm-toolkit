import Vue from 'vue';
import App from './App.vue';

Vue.config.productionTip = false;

import BootstrapVue from 'bootstrap-vue';
import './scss/theme.scss';
import 'vue-material-design-icons/styles.css';
import Fragment from 'vue-fragment';

Vue.use(BootstrapVue);

Vue.use(Fragment.Plugin);

new Vue({
  render: h => h(App),
}).$mount('#app');
