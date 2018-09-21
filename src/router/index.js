import Vue from 'vue'
import Router from 'vue-router'
import Topics from '@/components/Topics'
import TopicDetail from '@/components/TopicDetail'

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'topics',
      component: Topics
    },
    {
      path: "/topic",
      name: "topic-detail",
      component: TopicDetail
    }
  ]
})
