import Vue from 'vue';
import Router from 'vue-router';
import Sewadals from '@/view/Sewadals';
import Entry from '@/view/Entry';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/Sewadals',
      name: 'Sewadals',
      component: Sewadals,
    },
    {
      path: '/Entry',
      name: 'Entry',
      component: Entry,
    },
  ],
});
