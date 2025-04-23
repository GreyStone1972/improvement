  <template>
    <div class="container">
      <div class="field">
        <label class="label">Описание новости</label>
        <div class="control"></div>
      <textarea
            cols="30" rows="5"
            type="text"
            placeholder="News Description"
            v-model="form.newsDescription"
          />
        </div>
        <div class="field">
          <label>File
            <input type="file" id="file" name="file" ref="file" v-on:change="handleFileUpload()"/>
          </label>
        </div>
          <div class="control">
               <button class="button" @click="saveNews">Сохранить</button>
               <button class="button"><RouterLink class="router_link" to="/">На главную</RouterLink></button> 
          </div>
      </div>
  </template>
  
  <script>
  import axios from "axios"
  import { FormData } from "formdata-node"
  export default {
    name: "AddNews",
    data() {
      return {
        form: {
          newsDescription: '',
          file: ''
        }
      }
    },

    methods: {

      async saveNews() {
        let formData = new FormData()
        formData.append('file', this.form.file)   
        formData.append('newsDescription', this.form.newsDescription)
        console.log(formData)
          await axios.post("http://127.0.0.1:3000/news", formData,
          {
            headers: {
                 "Content-Type": "multipart/form-data"
             }
          }
        )
          .then((res) => {
          }) 
          .catch ((err) => {
            console.log(err)
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

  </style>