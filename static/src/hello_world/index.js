'use strict';

import Vue from 'vue';
import vueEasyRenderer from './plugin';
import HelloWord from './hello_world.vue';

Vue.use(vueEasyRenderer);
const app = new Vue(HelloWord);
app.$mount('#app');
