<template>
    <div class="container">
      <div class="field">
        <label class="label">Описание новости</label>
        <div class="control">
        
            <textarea
                cols="30" rows="5"
                type="text"
                placeholder="News Description"
                v-model="newsDescriptionForEdit"
                />
        </div>

        </div>
        <div class="field">
          
          <label><p>Сейчас загружен файл: {{ fileForEdit }} 
            <img class="mini" ref="image" :src="`../../public/${fileForEdit}`"  /></p>
            <video width="400px" :src="`../../public/${fileForEdit}`" type="video/mp4" onerror="this.remove()">
              <source>
            </video>
            <input type="file" id="file" name="file" ref="file" v-on:change="handleFileUpload()"/>
            <button @click="deleteImage">Убрать изображение из новости</button>
          </label>
        </div>
          <div class="control">
               <button class="button" @click="updateNews(id)">Сохранить</button>
               <button class="button"><RouterLink class="router_link" to="/">На главную</RouterLink></button> 
          </div>
          </div>
  </template>

<script>
import { RouterLink } from 'vue-router'
import axios from 'axios'
 import { FormData } from "formdata-node"
import { mapActions, mapGetters } from 'vuex'
    export default {
        name: "EditNews",
        data(){
            return {
                id: '',
                newsDescriptionForEdit: '',
                fileForEdit: '',
                news: [],
                form: {
                newsDescription: '',
                file: ''
                }
            }
        },

        mounted: function () {
            this.getNewsById()
    },

    methods: {

      async getNewsById() {
        axios.get(
            `http://localhost:3000/getNews`
          )
          .then((res) => {
            this.news = res.data
            console.log(res.data)
            console.log(this.news)
            let item = this.news.find((item) => item.id_news === this.id);
            console.log(item)
            this.newsDescriptionForEdit = item.news_description
            this.fileForEdit = item.news_media
            console.log(this.newsDescriptionForEdit)
            this.form.file = item.news_media
            console.log(this.form.file)
          })
          .catch((err) => {
            console.log(err)
            })

            this.id = +this.$route.params.id
            console.log(this.id)
    },

    deleteImage() {
      this.form.file = 'hui'
      this.fileForEdit = null
      console.log(this.form.file)
      console.log(this.fileForEdit)
    },
    

      async updateNews(id){
        console.log(id)
        let formData = new FormData()
        this.form.newsDescription = this.newsDescriptionForEdit
        console.log(this.form.newsDescription) 
        console.log(this.form.file)
        formData.append('file', this.form.file)  
        formData.append('newsDescription', this.form.newsDescription)
        console.log(formData)

      axios.put('http://127.0.0.1:3000/news', 
        formData,
          {
            headers: {
                 "Content-Type": "multipart/form-data"
             },
             params: {id}
          })
        .then((res) => {
          this.news = res.data
        })
        .catch((err) => {
          alert(err.response.data.msg)
        })
        this.form.newsDescription = ''
         this.form.file = '' 
    },
    handleFileUpload(){
        this.form.file = this.$refs.file.files[0]
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
    width: 100%;
  }
  
  label {
    float: left;
  }
  
 textarea {
    width: 100%;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    margin-top: 6px;
    margin-bottom: 16px;
    resize: vertical;
  }
  
  input[type=submit] {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  input[type=submit]:hover {
    background-color: #45a049;
  }

  label {
    display: flex;
    flex-direction: column;
    justify-content: left;
  }

  .mini{
    width: 150px;
  }

  </style>