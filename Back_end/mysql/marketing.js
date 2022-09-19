const pool = require("./pool.js");

let sql = "";
//创建查询语句
class marketing {
  constructor() {}
  //秒杀活动表格
  count(table) {
    sql = `select count(1) a from ${table}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  seckill(table, parameter) {
    let count =
      parameter.page_size == undefined || parameter.page_size == ""
        ? 5
        : parameter.page_size;
    let state =
      parameter.page_num == undefined || parameter.page_num == ""
        ? 0
        : (parameter.page_num - 1) * parameter.page_size;
    sql = `select * from ${table} limit ${state},${count}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  //秒杀表格上线状态
  upper_line(table, param) {
    let { id, upper_line } = param;
    if (id == undefined || id == "") return "请输入正确的id号";
    if (upper_line == undefined || upper_line == "") return "请输入正确的状态";
    upper_line = upper_line ? 1 : 0;
    sql = `update ${table} set upper_line='${upper_line}' where id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  // 秒杀表格编辑
  seckill_edit(table, param) {
    let { id, upper_line, titie, s_time, e_time } = param;
    let str = "";
    if (id == undefined || id == "") return "请输入订单id";
    if (upper_line != undefined && upper_line != "")
      str += `upper_line='${upper_line}',`;
    if (titie != undefined && titie != "") str += `titie='${titie}',`;
    if (s_time != undefined && s_time != "") str += `s_time='${s_time}',`;
    if (e_time != undefined && e_time != "") str += `e_time='${e_time}',`;
    str = str.slice(0, -1);
    sql = `update ${table} set ${str} where id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  //  秒杀表格删除
  seckill_delete(table, param) {
    let { id } = param;
    if (id == undefined || id == "") return "请输入订单id";
    sql = `delete from ${table} where id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
}

module.exports = new marketing();
