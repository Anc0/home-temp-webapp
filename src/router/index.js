import Vue from 'vue'
import Router from 'vue-router'
import Topics from '@/components/Topics'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'topics',
      component: Topics
    },
  ]
})
