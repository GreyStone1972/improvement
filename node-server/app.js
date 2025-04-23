// Import Express
const express = require('express')
// Create an app
const app = express()
// Set cross -domain access
const cors = require('cors')
const fileUpload = require('express-fileupload')
app.use(express.static('public'))
app.use(express.static(__dirname + '/dist'));
app.use(fileUpload())
app.use(cors({
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}))

// Test interface
app.get('/info', (req, res) => {
  res.send("Hello!")
})

app.listen(3000, () => {
  console.log('express server running at http://127.0.0.1:' + 3000)
})


let { conMysql } = require('./mysql')
// Get all user information
app.get('/getUser', (req, res) => {
  let sql = 'select * from userinfo'
  conMysql(sql).then(result => {
    res.send(result)
  })
})

app.get('/getNews', (req, res) => {
  let sql = 'SELECT * FROM news'
  conMysql(sql).then(result => {
    res.send(result)
  })
})

app.get('/getNewsById', (req, res) => {
  console.log(req.params.id)
  console.log(req.query.id)
  console.log(req.params.id)
  let sql =`'SELECT * FROM news where id_news = '${req.query.id}'`
  conMysql(sql).then(result => {
    res.send(result)
  })
})

// Create a unified return message object
class Response {
  constructor(isSucceed, msg, code, data) {
    this.isSucceed = isSucceed;
    this.msg = msg;
    this.code = code;
    this.data = data;
  }
}

// Log in
app.get('/login', (req, res) => {
  let sql = `select * from userinfo where username = '${req.query.username}'`
  conMysql(sql).then(result => {
  	// When the input password and the password in the database can be successfully logged in, returned to the successful data
    if (result[0].password === req.query.password) {
      let response = new Response(true, 'login successful', 200, result)
      res.send(response)
    } else {
      // Otherwise, the login will fail, and the specific data will be not returned
      let response = new Response(false, 'wrong user name or password', 400)
      res.status(400).send(response)
    }
  }).catch(err => {
    res.status(500).send('The database is connected to an error!')
  })
})

// change Password
app.post('/updatePassword', (req, res) => {
  let sql = `update userinfo set password = '${req.query.newPassword}' where username = '${req.query.username}'`
  conMysql(sql).then(result => {
    if (result.affectedRows == 1) {
      let response = new Response(true, 'Successfully modified', 200)
      res.send(response)
    } else {
      let response = new Response(false, 'Modification failed, please try again later', 400)
      res.status(400).send(response)
    }
  }).catch(err => {
    res.status(500).send('The database is connected to an error!')
  })
})

// file upload api
app.post('/news', (req, res) => {
  console.log(req.files)
  console.log('Файл не добавлен')
  if(req.files === null) {
    
    let news = req.body.newsDescription
    let sql = `INSERT INTO news SET news_description = '${news}', news_media = '${null}'`
  conMysql(sql)
    .then(result => {
          if (result.affectedRows == 1) {
            let response = new Response(true, 'Successfully added', 200, `${news}`)
            res.send(response)
          } else {
            let response = new Response(false, 'Addition failed, please try again later', 400)
            res.status(400).send(response)
          }
        })
    .catch(err => {
        res.status(500).send('The database is connected to an error!')
  })
  } else {
     // accessing the file
    const myFile = req.files.file
    console.log(myFile)
    //  mv() method places the file inside public directory
    myFile.mv(`../node-app/public/${myFile.name}`, function (err) {
    });

  let news = req.body.newsDescription
    const imageUrl = myFile.name

  let sql = `INSERT INTO news (news_description, news_media) values ('${news}', '${imageUrl}')`
  conMysql(sql)
  }
})


app.delete('/news', (req, res) => { 
  let sql = `DELETE FROM news WHERE id_news = '${req.query.id}'`
  conMysql(sql)
    .then(result => {
      console.log('${req.query.id}')
          if (result.affectedRows == 1) {
            let response = new Response(true, 'Successfully deleted', 200, `${req.query.id}`)
            res.send(response)
          } else {
            let response = new Response(false, 'Addition failed, please try again later', 400)
            res.status(400).send(response)
          }
        })
    .catch(err => {
        res.status(500).send('The database is connected to an error!')
  })
})

app.put('/news', (req, res) => { 
console.log(req.body.file)
if(req.body.file == 'hui'){
  let news = req.body.newsDescription
  let id = req.query.id
  let sql = `UPDATE news SET news_description = '${news}', news_media = '${null}' WHERE id_news = '${id}'`
conMysql(sql)
} else if(req.files == null){
    let news = req.body.newsDescription
    let id = req.query.id
    let sql = `UPDATE news SET news_description = '${news}' WHERE id_news = '${id}'`
  conMysql(sql)
  } else      {
    // accessing the file
const myFile = req.files.file
console.log(myFile)
//  mv() method places the file inside public directory
myFile.mv(`../node-app/public/${myFile.name}`, function (err) {
    if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occured" })
    }
    // returing the response with file path and name
    return res.send({name: myFile.name, path: `/${myFile.name}`})
});
  let id = req.query.id
  console.log(id)
  let news = req.body.newsDescription
  console.log(news)

  console.log(myFile.name)
  let sql = `UPDATE news SET news_description = '${news}', news_media = '${myFile.name}' WHERE id_news = '${id}'`
  conMysql(sql)
   }
})