let mysql = require('mysql2')
const db_config = {
  host: 'localhost',
  user: 'root',
  password: 'xxxxxxxxxx', //enter your password here
  port: "3306",// Use the 3306 -side number by default
  database: 'blagoustroistvo2'// Use the database name you created, I use blagoustroistvo2 here
}
// Perform database interactions
function conMysql(sql) {
  let connect = mysql.createConnection(db_config)
  // Start link database
  connect.connect(function (err) {
    if (err) {
      console.log(`MySQL connection failed: ${err}!`)
    } else {
      console.log('MySQL connection is successful!')
    }
  })
  // Return a promise commitment object
  return new Promise((resolve, reject) => {
    connect.query(sql, (err, result) => {
      if (err) {
        reject(err)
      } else {
        // Here you need to turn the return data to JSON and then turn it back, otherwise the original data will not be any data type
        let res = JSON.parse(JSON.stringify(result))
        closeMysql(connect)
        resolve(res)
      }
    });
  })
}


// Close mysql after the query is successful
function closeMysql(connect) {
  connect.end((err) => {
    if (err) {
      console.log(`MySQL closed failure:${err}!`)
    } else {
      console.log('MySQL is closed successfully!')
    }
  })
}
// Export method
exports.conMysql = conMysql