import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import 'vuetify/src/stylus/app.styl';

Vue.use(Vuetify, {
  iconfont: 'mdi',
  theme: {
    primary: '#37474f',
    secondary: '#d84315',
    //
    'role--striker': '#bd3f39',
    'role--tank': '#d67e08',
    'role--controller': '#398ad6',
    'role--support': '#6aa84f',
    'role--artillery': '#a64d79',
  },
});
