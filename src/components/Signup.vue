<template>
  <div class="signup">
    <h2>Sign up</h2>

    <div class='set_mail_password' v-if='!show_username'>
      <input type="text" placeholder="email" v-model="email">
      <input type="password" placeholder="Password" v-model="password">
      <button @click="show_username = true">Register</button>
    </div>

    <div class='set_username' v-if='show_username'>
      <input type="text" placeholder="username" v-model="username">
      <button @click="signUp">OK</button>
    </div>

    <p>Do you have an account? 
      <router-link to="/signin">sign in now!!</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Signup',
  data: function () {
    return {
      email: '',
      password: '',
      username: '',
      show_username: false
    }
  },
  methods: {
    signUp: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then(
        (user) => {
          user.updateProfile({
            displayName: this.username
          })
          this.$router.push('/signin')
        },
        (err) => {
          alert(err.message)
        }
      )
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

.signin {
  margin-top: 20px;

  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center
}
input {
  margin: 10px 0;
  padding: 10px;
}
</style>
