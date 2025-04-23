<template>
     <main>
      <div class="header">
        <img  class="head" src="../img/i.webp" alt=""> 
        <div class="name">
          <h1>Благоустройство города</h1>
          <p>Ваш город</p>
        </div>
  
        <img class="head2" src="../img/U77ffEqcbZM.jpg" alt="">

        
        </div>
      <nav>
        <RouterLink class="link" to="/">Главная</RouterLink>
        <RouterLink class="link" to="/">О нас</RouterLink>
        <RouterLink class="link" to="/email">Написать нам</RouterLink>
        <RouterLink v-if="this.admin" class="link" to="/addNews">Добавить новости</RouterLink>
      </nav>
      <div class="content">
          <div class="left">
            <h3>О нас</h3>
            <p>Тут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текстаТут будет много текста</p>
          </div>
          <div class="right">
            <h3>Новости</h3>
            <p v-if="this.admin == 'true'">Привет, Админ</p>
            <p v-if="this.admin == 'true'"> <button class="button" @click="cancelAdmin">Выйти из администрирования</button></p>

            <div v-f="this.admin == 'true'" class="new" v-for="(itemNew, index) in news" :key="index">
                <h4>{{ itemNew.news_date }}</h4>
                <p>{{ itemNew.news_description }}</p>
                <img ref="image" :src="itemNew.news_media" onerror="this.remove()" />
                <video v-if="itemNew.news_media !== null" :src="itemNew.news_media" type="video/mp4" onerror="this.remove()" controls>
                  <source>
                </video>
                <div v-if="this.admin == 'true'" class="media">
                  <button class="button" @click="deleteNews(itemNew.id_news)">Удалить</button>
                  <button class="button"><RouterLink :to="{ name: 'EditNews', params: { id: itemNew.id_news } }">Редактировать</RouterLink></button>
                </div>
            </div>

            <div v-if="this.admin == 'false'" class="new" v-for="(itemNew, index) in showFirstTen" :key="index">
                <h4>{{ itemNew.news_date }}</h4>
                <p>{{ itemNew.news_description }}</p>
                <img ref="image" :src="itemNew.news_media" onerror="this.remove()" />
                <video v-if="itemNew.news_media !== null" :src="itemNew.news_media" type="video/mp4" onerror="this.remove()" controls>
                  <source>
                </video>
                <div v-if="this.admin == 'true'" class="media">
                  <button class="button" @click="deleteNews(itemNew.id_news)">Удалить</button>
                  <button class="button"><RouterLink class="smalLink" :to="{ name: 'EditNews', params: { id: itemNew.id_news } }">Редактировать</RouterLink></button>
                </div>
            </div>
          </div>
      </div>    
      <footer>Связаться с нами по WhatsApp
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
              <a href="https://api.whatsapp.com/send?phone=79998887766" class="float" target="_blank">
                  <i class="fa fa-whatsapp my-float"></i>
              </a>
              <button class="up"><a href="#"><div class="arrow"></div></a></button>
      </footer>
    </main>


</template>

<script>
import { RouterLink } from 'vue-router'
import axios from 'axios'
import Auth from './Auth.vue'
import { mapActions, mapGetters } from 'vuex'


export default {
  name: "Home",
  components:{
      Auth
    },
    data() {
      return {
        news: [],
        admin: false
      }
    },
    mounted() {
        this.getNews()
        this.admin = localStorage.getItem('isAdmin')
        console.log(this.admin)
    },
    methods: {
      ...mapActions('store', [
      'noAdmin'
    ]),
    ...mapGetters('store', [
            'getIsAdmin'
        ]),

        cancelAdmin(){
          this.noAdmin()
          console.log(this.getIsAdmin())
          location.reload()
        },

      async getNews() {

        axios
        .get('http://127.0.0.1:3000/getNews')
        .then((res) => {
          this.news = res.data
          console.log(this.news)
          for(let i = 0; i < this.news.length; i++){
            console.log(this.news[i].news_media)
              let date = this.news[i].news_date
              date = date.replace("T", " / ")
              date = date.replace(/-/g, ".")
              date = date.slice(0, -8)
              this.news[i].news_date = date
          }
        })
        .catch((err) => {
          alert(err.response.data.msg)
        })
    },

    //Delete news
    async deleteNews(id){
      console.log(id)
      axios
        .delete('http://127.0.0.1:3000/news', {
        params: {id}
      })
        .then((res) => {
          this.news = res.data
        })
        .catch((err) => {
          alert(err.response.data.msg)
        })
    },

  }, 
      computed: {
        showFirstTen() { 
          return this.news.slice(-10)
        },
      }
}

</script>

<style>

template{
  margin: 0px;
  padding: 0px;
    width: 100%;
    height: 100%;
}


.content {
    margin: 0px;
    padding: 0pz;
    width: 100%;
    height: 100%;
}

main{
  margin: 0px;
  padding: 0px;
  width: 100%;
  height: 100%;
  
}

.media{
  display: flex;
    flex-direction: row;
    justify-content: left;
}

img {
    width: 70%;
}
.head{
  width: 300px;
}

.head2{
  width: 250px;
  height: 200px;
}

nav {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 2px solid rgb(100, 180, 217);
    background-color: rgba(0, 0, 0, 0.3);
    padding: 0;
}


h3{
  margin: auto;
}

h4{
  font-weight: bold;
}

.header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
}

.name {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
}

.left{
    width: 20%;
}

.right{
    width: 80%;
    text-align: center;
}

.new{
    display: flex;
    flex-direction: column;
    justify-content: left;
    text-align: left;
    border-bottom: 1px solid rgb(100, 180, 217);
    padding: 0 50px;
}

.link{
  color: rgb(35, 100, 205);
  font-weight: bold;
  text-decoration: none;
  background-color: rgba(0, 0, 0, 0.01);
  height: 100%;
  margin: 0;
}

.smalLink{
  color: white;
}

.smalLink:visited{
  color: white;
}

.link:hover{
  background-color: rgba(0, 0, 0, 0.3);
}


.link:visited{
  color: rgb(35, 100, 205);
}

.button{
  width: fit-content;
}

footer{
	width: 100%;
	background-color: rgba(0, 0, 0, 0.3);
	color: #000;
	border-top: 1px solid rgb(100, 180, 217);
	display: flex;
	flex-direction: column;
  justify-content: center;
  text-align: center;
}

footer p{
	font-size: 10px;
	margin: 5px auto;
	display: flex;
  -webkit-box-pack: center;
  -webkit-justify-content: center;
      -ms-flex-pack: center;
	  flex-direction: column;
    justify-content: center;
}

.up{
  width: 20px;
  position: absolute;
  bottom: 10px;
  right: 150px;
}

@media(max-width: 716px){
   .header {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    } 
        img, h3{
      margin: 0 auto;
      text-align: center;
    }
}

@media(max-width: 600px){


    .content{
    display: flex;
    flex-direction: column;
    justify-content: center;
    }


    .left{
        width: 100%;
    }
    .right{
        width: 100%;
    }

    .new{
      text-align: left;
    }
}


.up{
	width: 50px;
	height: 50px;
	border: 0;
	border-radius: 30px;
	margin: 0 0 50px 10px;
	position: fixed;
	bottom: 5px;
	right: 30px;
	 box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.5);
	vertical-align: middle;
	background: rgb(133, 133, 133) ;
	-webkit-transition: 0.3s;
    transition: 0.3s;
}

.arrow{
	width: 12px;
	height: 12px;
	border-top: 2px solid #000;
	border-right: 2px solid #000;
	border-bottom: 0;
	border-left: 0;
	transform: rotate(-45deg);
	position: relative;
	margin-left: 8px;
  margin-top: -2px;
}
</style>