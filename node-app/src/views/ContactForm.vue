<template>
    <div class="container">
        <form ref="form" @submit.prevent="sendEmail">
          <label>Ваше имя</label>
          <input 
            type="text" 
            v-model="name"
            name="name"
            placeholder="Ваше имя"
          >
          <label>Email</label>
          <input 
            type="email" 
            v-model="email"
            name="email"
            placeholder="Ваш Email"
            >
            <label>Телефон</label>
          <input 
            type="phone" 
            v-model="phone"
            name="phone"
            placeholder="Ваш телефон"
            >
          <label>Текст сообщения</label>
          <textarea 
            name="message"
            v-model="message"
            cols="30" rows="5"
            placeholder="Введите текст сообщения">
          </textarea>

          <input type="submit" value="Отправить">
          <RouterLink to="/">Отменить</RouterLink>
        </form>
    </div>
</template>

<script>
import emailjs from 'emailjs-com'

export default {
  name: 'ContactUs',
  data() {
    return {
      name: '',
      email: '',
      message: '',
      phone: ''
    }
  },
  methods: {
    sendEmail() {
        console.log('Пытаюсь отправить')
      
        emailjs.sendForm('xxxxxxxxxxx', 'xxxxxxxxxxx', this.$refs.form, 'xxxxxxxxxxxx') //here enter the data provided by the postal service
        //warning! This code is valid only for the postal service mail.ru
       .then(() => {
            console.log('SUCCESS!')
          },
          (error) => {
            console.log('FAILED...', error.text)
          })
      // Reset form field
      this.name = ''
      this.email = ''
      this.message = ''
      this.phone = ''
      this.$router.push("/")
    }
  }
}

</script>



<style scoped>
* {box-sizing: border-box;}

.container {
  display: block;
  margin:auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 80%;
}

label {
  float: left;
}

input[type=text], [type=email], [type=phone], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit], a {
  background-color: rgba(0, 0, 0, 0.3);
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  height: 42px;
}

input[type=submit]:hover, a:hover {
  background-color: rgb(100, 180, 217);
}

</style>