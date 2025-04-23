<template>
  <div>
    username:<input type="text" v-model="form.username" /><br />
    New Password:<input type="text" v-model="form.newPassword" /><br />
    New Password:<input type="text" v-model="form.rePassword" /><br />
    <button @click="update">confirm</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() {
    return {
      form: {
        username: '',
        newPassword: '',
        rePassword: ''
      }
    }
  },
  methods: {
    update() {
      if (
        this.form.username == '' ||
        this.form.newPassword == '' ||
        this.form.rePassword == ''
      ) {
        alert('Data cannot be empty')
        return
      }
      axios
        .post(
          'http://127.0.0.1:3000/updatePassword',
          {},
          {
            params: this.form
          }
        )
        .then((res) => {
          alert(res.data.msg)
          this.$router.push('/')
          alert('After modifying the password, please log in')
        })
        .catch((err) => {
          alert(err.response.data.msg)
        })
    }
  }
}
</script>
<style>
</style>