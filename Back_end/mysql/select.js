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
  
   //批量操作
   batch(table, parameter) {
    let { addrss } = parameter;
    if (
      addrss == "new-product-recommend" ||
      addrss == "popular-recommend" ||
      addrss == "special-recommend"
    )
      addrss = "brand-recommend";
    if (addrss == "advertising-list") addrss = "return-application";
    sql = `select * from ${table} where addrss='${addrss}';`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

}

module.exports = new select();
