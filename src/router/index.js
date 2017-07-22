import Vue from 'vue'
import Router from 'vue-router'
import Row from '@/components/Row'

Vue.use(Router)

// Copyright (c) Jay Kelkar <jkelkar@gmail.com>
// This is a placeholder for any routing that may be done in the future
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Row',
      component: Row
    }
  ]
})
