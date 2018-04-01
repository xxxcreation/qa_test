// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

const config = {
  apiKey: 'AIzaSyCQxqtSmGj1sA3bLmiiXf8dOM09o_uuVQg',
  authDomain: 'chat-numa.firebaseapp.com',
  databaseURL: 'https://chat-numa.firebaseio.com',
  projectId: 'chat-numa',
  storageBucket: 'chat-numa.appspot.com',
  messagingSenderId: '994949321373'
}
firebase.initializeApp(config)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
