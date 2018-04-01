import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'
import Timeline from '@/components/Timeline'
import Question from '@/components/Question'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '*',
      redirect: 'signin'
    },
    {
      path: '/',
      name: 'Timeline',
      component: Timeline,
      meta: { requiresAuth: true }
    },
    {
      path: '/question/:question_id',
      name: 'Question',
      component: Question,
      meta: { requiresAuth: true }
    },
    {
      path: '/signin',
      name: 'Signin',
      component: Signin
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    }
  ]
})

router.beforeEach((to, from, next) => {
  let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  let currentUser = firebase.auth().currentUser
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    if (!currentUser) {
      next({
        path: '/signin',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})

export default router
