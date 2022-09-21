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
    if(address=="" || address==undefined) return "请输入路由地址"
    let table = "";
    switch (address) {
      case "advertising-list":table="advertis"; break;
      case "goods-list":table="commodity"; break;
      case "brand-management":table="brand"; break;
      case "order-list":table="order-list"; break;
      case "return-application":table="return-application"; break;
      case "return-reason":table="return-reason"; break;
      case "brand-recommend":table="brand"; break;
      case "new-product-recommend":table="commodity"; break;
      case "popular-recommend":table="commodity"; break;
      case "special-recommend":table="special"; break;
    }
    sql =`SELECT  table_name,column_name  FROM  INFORMATION_SCHEMA.KEY_COLUMN_USAGE  WHERE  TABLE_NAME= '${table}';`
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
  // 批量数据删除
  batch_delete(param) {
    let {table,pri,id}= param;
    sql= `delete from ${table} where ${pri} in (${id.slice(1,-1)})`; 
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  // 批量数据修改
  batch_update(param){
    let {table,pri,id,field,value}= param;
    console.log(id,typeof id);
    sql=`update ${table} set ${field} = '${value}' WHERE ${pri} in (${id});`
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  // 批量数据查看
  batch_select(param){
    let {table,pri,id,field}= param;
    sql=`select ${pri},${field} from ${table} where ${pri} in (${id.slice(1,-1)})`
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
}

module.exports = new select();
