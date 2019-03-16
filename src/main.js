// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import VueFire from 'vuefire';
import VueMoment from 'vue-moment';
import BootstrapVue from 'bootstrap-vue';
import App from './App';
import router from './router';

Vue.use(VueFire);
Vue.use(BootstrapVue);
Vue.use(VueMoment);

Vue.config.productionTip = false;
router.push('/Sewadals');
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
});
