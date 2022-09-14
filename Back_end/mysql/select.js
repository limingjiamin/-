const pool = require("./pool.js");

let sql = "";
//创建查询语句
class select {
  constructor() {}
  //导航栏
  navigation(table) {
    sql = `select * from ${table}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }


}

module.exports = new select();
