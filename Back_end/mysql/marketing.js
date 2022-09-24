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
  counts(table) {
    sql = `select count(1) a from ${table} where is_new='1';`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  pro_count(table) {
    sql = `select count(1) a from ${table} where pro>2999;`;
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
  new_product(table, parameter) {
    let count =
      parameter.page_size == undefined || parameter.page_size == ""
        ? 5
        : parameter.page_size;
    let state =
      parameter.page_num == undefined || parameter.page_num == ""
        ? 0
        : (parameter.page_num - 1) * parameter.page_size;
    sql = `select id,p_id,p_name,recommend,sort from ${table}  where is_new='1' limit ${state},${count}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  pro_product(table, parameter) {
    let count =
      parameter.page_size == undefined || parameter.page_size == ""
        ? 5
        : parameter.page_size;
    let state =
      parameter.page_num == undefined || parameter.page_num == ""
        ? 0
        : (parameter.page_num - 1) * parameter.page_size;
    sql = `select id,p_id,p_name,recommend,sort from ${table} where pro>2999 order by sell_num desc limit ${state},${count}`;
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
    upper_line = upper_line == "true" ? 1 : 0;
    sql = `update ${table} set upper_line='${upper_line}' where id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  upper(table, param) {
    let { id, upper } = param;
    if (id == undefined || id == "") return "请输入正确的id号";
    if (upper == undefined || upper == "") return "请输入正确的状态";
    upper = upper == "true" ? 1 : 0;
    sql = `update ${table} set ad_upper='${upper}' where ad_id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  recommend(table, param) {
    let { id, recommend } = param;
    if (id == undefined || id == "") return "请输入正确的id号";
    if (recommend == undefined || recommend == "") return "请输入正确的状态";
    recommend = recommend == "true" ? 1 : 0;
    sql = `update ${table} set recommend='${recommend}' where sp_id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  recommends(table, param) {
    let { id, recommend } = param;
    if (id == undefined || id == "") return "请输入正确的id号";
    if (recommend == undefined || recommend == "") return "请输入正确的状态";
    recommend = recommend == "true" ? 1 : 0;
    sql = `update ${table} set recommend='${recommend}' where id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  sort(table, param) {
    let { id, sort } = param;
    if (id == undefined || id == "") return "请输入正确的id号";
    if (sort == undefined || sort == "") return "请输入正确的状态";
    sql = `update ${table} set sp_sort='${sort}' where sp_id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  sorts(table, param) {
    let { id, sort } = param;
    if (id == undefined || id == "") return "请输入正确的id号";
    if (sort == undefined || sort == "") return "请输入正确的状态";
    sql = `update ${table} set sort='${sort}' where id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  secli_comm(table, param) {
    let { price, num, pr, sort, id } = param;
    let str = "";
    if (id == undefined || id == "") return "请输入id";
    if (price != undefined && price != "") str += `price='${price}',`;
    if (num != undefined && num != "") str += `num='${num}',`;
    if (pr != undefined && pr != "") str += `pr='${pr}',`;
    if (sort != undefined && sort != "") str += `sort='${sort}',`;
    str = str.slice(0, -1);
    sql = `update ${table} set ${str} where comm_id=${id}`;
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
  seckill_comm_del(table, param) {
    let { id } = param;
    if (id == undefined || id == "") return "请输入订单id";
    sql = `delete from ${table} where comm_id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  coupon_delete(table, param) {
    let { cou_id } = param;
    if (cou_id == undefined || cou_id == "") return "请输入订单id";
    sql = `delete from ${table} where  cou_id=${cou_id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  coupon_history(table, param) {
    let { id } = param;
    if (id == undefined || id == "") return "请输入订单id";
    sql = `select * from ${table} where cou_id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  special_delete(table, param) {
    let { sp_id } = param;
    if (sp_id == undefined || sp_id == "") return "请输入订单id";
    sql = `delete from ${table} where  sp_id=${sp_id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  brand_delete(table, param) {
    let { id } = param;
    if (id == undefined || id == "") return "请输入订单id";
    console.log(id);
    sql = `delete from ${table} where  id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  advertis_delete(table, param) {
    let { id } = param;
    if (id == undefined || id == "") return "请输入订单id";
    sql = `delete from ${table} where  ad_id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  seckill_time(param) {
    let { id } = param;
    if (id == undefined || id == "") return "请输入活动id";
    sql = `select  f.*,g.qq counts  from  seclill_time  f  left join (select  d.id  , ifNULL(e.qq,0) qq  from 
    (select id,count(1) '数量' from (select a.id,b.* from seclill_time a left join secli_comm b on a.id=b.time_id)   c  group by id)  d   left join
    (select count(1) qq,time_id from  secli_comm where seckill_id=${id} group by time_id) e 
    on d.id=e.time_id) g on f.id=g.id;`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  seckill_shop(param) {
    let { time_id, seckill_id } = param;
    if (time_id == undefined || time_id == "") return "请输入活动time_id";
    if (seckill_id == undefined || seckill_id == "")
      return "请输入活动seckill_id";
    sql = `select a.id,a.p_id,a.p_name,a.art_no,a.p_price,a.inventory,b.price,b.num,b.pr,b.sort from commodity a right join secli_comm b on a.id=b.comm_id  where b.seckill_id=${seckill_id} and b.time_id=${time_id};`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  new_delete(table, param) {
    let { id } = param;
    if (id == undefined || id == "") return "请输入订单id";
    sql = `update ${table} set is_new='0' where id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  pro_delete(table, param) {
    let { id } = param;
    if (id == undefined || id == "") return "请输入订单id";
    sql = `update ${table} set pro=null where id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
}

module.exports = new marketing();
