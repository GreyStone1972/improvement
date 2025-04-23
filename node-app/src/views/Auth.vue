<template>
  <div class="auth">
        <div class="string"><p>Имя</p> <input type="text" v-model="form.username" /></div> 
        <div class="string"><p>Пароль</p> <input type="password" v-model="form.password" /></div> 
    <div class="btns">
      <button class="button" @click="login">Log in</button>
      <button class="button"><RouterLink to="/">На главную</RouterLink></button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'Auth',
  data() {
    return {
      form: {
        username: '',
        password: ''
      },
    }
  },

  methods: {
    ...mapActions('store', [
      'setIsAdmin'
    ]),

    login() {
      axios
        .get('http://127.0.0.1:3000/login', {
          params: this.form
        })
        .then((res) => {
          if(res.data.data[0].username  === 'admin' && res.data.data[0].password === 'admin'){
            console.log(res.data.data[0])
            this.setIsAdmin()

          console.log(this.form.username)
          this.form.username = ''
          this.form.password = ''
          console.log(this.form.username)
          this.$router.push('/')
        }else{
          this.$router.push('/')
        }
        })
        .catch((err) => {
          alert(err.response.data.msg)
        })
        console.log(this.form.username)
    }
  },
  computed: {
        ...mapGetters('store', [
            'getIsAdmin'
        ])
    }
}

</script>
<style>
* {
  margin: 5px;
  padding: 5px;
}
.auth{
  margin: 70px 0;
  display: flex;
  flex-direction: column;
  text-align: left;
  background-color: #f2f2f2;
  width: 50%;
}

.string{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.btns{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
}

.button {
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  height: 52px;
}

.button:hover, .router_link:hover {
  background-color: rgb(100, 180, 217);
}

a{
  text-decoration: none;
}

a:visited {
    color: white;
}
</style>