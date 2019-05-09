import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    primary: '#37474f',
    secondary: '#2979ff',
    //
    'role--striker': '#bd3f39',
    'role--tank': '#d67e08',
    'role--controller': '#398ad6',
    'role--support': '#6aa84f',
    'role--artillery': '#a64d79',

    'system--weapon': '#cc0000',
    'system--system': '#2aa780',
    'system--trait': '#bd6579',

    template: '#ad8951',
  },
});
