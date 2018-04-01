<template>
  <div class="question">
    Title: {{question.title}}
    Content: {{question.content}}
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'question',
  data: function () {
    return {
      question_id: this.$route.params.question_id,
      question: {'title': '', 'conetnt': ''}
    }
  },
  created: function () {
    let ref = firebase.database().ref('questions').child(this.$route.params.question_id)
    ref.once('value').then((snapshot) => {
      const val = snapshot.val()
      let data = {
        'key': this.$route.params.question_id,
        'title': val.title,
        'content': val.content
      }
      this.question = data
    })
  },
  methods: {
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
</style>
