import Vue from 'vue';
import App from './gm_toolkit/Main.vue';
import '@mdi/font/css/materialdesignicons.css';

import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';
import gmToolkitTheme from '@/gm_toolkit/vuetify_theme';

Vue.config.productionTip = false;

import router from './router';
import store from './store';

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    primary: '#37474f',
    secondary: '#2979ff',
    ...gmToolkitTheme,
  },
});

import './gm_toolkit/styles.css';

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
