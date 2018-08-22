import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Topics from '@/components/Topics'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/topics',
      name: 'topics',
      component: Topics
    },
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    }

  ]
})
