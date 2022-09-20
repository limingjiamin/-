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
  route(param) {
    let { address } = param;
    let table = "";
    switch (address) {
      case "advertising-list":table="advertis"; break;
    }
    return table;
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
  // 批量数据删除
  batch_delete(param) {
    let table=this.route(param);
    sql= `delete from ${table} where ${id} in ()`; 
    let sql2=`update ${table} SET myfield = 'value' WHERE ${id} in ('other_values');`
  }
}

module.exports = new select();
