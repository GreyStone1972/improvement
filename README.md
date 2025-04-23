Для входа в режим администрирования набрать в адресной строке:

http://localhost:5173/auth

Затем в открывшейся форме ввести значения:

Имя:    admin
Пароль: admin

База данных находится в папке: Dump20250423

Пароль от базы придумайте сами и внесите его в файл mysql.js:

const db_config = {
  host: 'localhost',
  user: 'root',
  password: 'your_password',                  // Use your own password
  port: "3306",                               // Use the 3306 -side number by default
  database: 'blagoustroistvo2'                // Use the database name you created
} 
