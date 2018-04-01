<template>
  <div class="timeline">
    <div class='user_info'>
      {{name}}
    </div>

    <button id="create" @click='questionModal = true'>質問を作成する</button>

    <div class='question_list'>
      <div class='question_item'
        v-for='q in questionList'>
        <span @click='goQuestion(q.key)'>{{q.title}}</span>
      </div>
    </div>

    <!-- <button @click="signOut">Sign out</button> -->

    <div class='modal_back'
      v-if='questionModal'
      @click='questionModal = false'>
    </div>

    <div class='modal_content' v-if='questionModal'>
      <div>
        Title: <input id="title" v-model='title' />
      </div>

      <div>
        Content: <input id="content" v-model='content' />
      </div>

      <div>
        <button id="send" @click='send'>投稿</button>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'timeline',
  data: function () {
    return {
      title: '',
      content: '',
      questionList: [],
      questionModal: false,
      name: firebase.auth().currentUser.displayName
    }
  },
  created: function () {
    let ref = firebase.database().ref('questions')
    ref.once('value').then((snapshot) => {
      snapshot.forEach((childSnapshot) => {
        let data = {
          'key': childSnapshot.key,
          'title': childSnapshot.val().title,
          'content': childSnapshot.val().content
        }
        this.questionList.push(data)
      })
    })
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    },
    send: function () {
      let ref = firebase.database().ref('questions')
      let newKey = ref.push().key
      firebase.database().ref('questions/' + newKey).set({
        'title': this.title,
        'content': this.content
      })

      this.reset()
    },
    reset: function () {
      this.title = ''
      this.content = ''
      this.questionModal = false
    },
    goQuestion: function (key) {
      this.$router.push({name: 'Question', params: {question_id: key}})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #35495E;
}

.modal_back {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
}

.modal_content {
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translateY(-50%) translateX(-50%);
  transform: translateY(-50%) translateX(-50%);

  width: 50%;
  height: 80%;
  background-color: #ffffff;
}
</style>
