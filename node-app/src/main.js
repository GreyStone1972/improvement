import emailjs from 'emailjs-com'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(emailjs)
app.mount('#app')
