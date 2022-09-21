const mysql = require("mysql");
//创建pool连接池
let pool = mysql.createPool({
  host: "localhost",
  post: 3306,
  user: "root",
  password: "123456",
  database: "management",
  connectionLimit: 10,
});

module.exports = pool;
