const pool = require("./pool.js");

let sql = "";
//创建查询语句
class marketing {
  constructor() {}
  //秒杀活动表格
  
  seckill(table,parameter) {
    let count = parameter.pag_count==undefined||parameter.pag_count==""? 5 : parameter.pag_count;
    let state = parameter.pag_num==undefined ||parameter.pag_num==""? 0 : (parameter.pag_num-1)*count;
    sql = `select * from ${table} limit ${state},${count}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }


}

module.exports = new marketing();