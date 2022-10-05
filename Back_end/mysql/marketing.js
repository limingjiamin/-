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
    sql = `select id,p_id,p_name,recommend,sort,p_price,art_no from ${table}  where is_new='1' limit ${state},${count}`;
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
    sql = `select id,p_id,p_name,recommend,sort,p_price,art_no from ${table} where pro>2999 order by sell_num desc limit ${state},${count}`;
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
  seckill_add(table, param) {
    let { upper_line, titie, s_time, e_time } = param;
    if (upper_line == undefined || upper_line == "") return "请输入订单状态";
    if (titie == undefined || titie == "") return "请输入订单标题";
    if (s_time == undefined || s_time == "") return "请输入订单开始时间";
    if (e_time == undefined || e_time == "") return "请输入订单结束时间";
    let num = parseInt(Math.random() * (99999 - 10000 + 1) + 10000);
    sql = `insert into ${table} set upper_line='${upper_line}',titie='${titie}',s_time='${s_time}',e_time='${e_time}',num='${num}',state='活动未开始';`;
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
  advertis_select(table, param) {
    let { id } = param;
    if (id == undefined || id == "") return "请输入id";
    sql = `select *from ${table} where ad_id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  times() {
    sql = "select * from seclill_time";
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  times_add(param) {
    let { titie, e_time, s_time, statas } = param;
    if (titie == undefined || titie == "") return "请输入标题名称";
    if (e_time == undefined || e_time == "") return "请输入结束时间";
    if (s_time == undefined || s_time == "") return "请输入开始时间";
    if (statas == undefined || statas == "") return "请输入状态";
    let num = parseInt(Math.random() * (99999 - 10000 + 1) + 10000);
    e_time = e_time.slice(11, 19);
    s_time = s_time.slice(11, 19);
    sql = `insert into seclill_time set titie='${titie}',e_time='${e_time}',s_time='${s_time}',statas='${statas}',num=${num};`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  times_meg(param) {
    let { statas, id } = param;
    if (statas == undefined || statas == "") return "请输入状态";
    if (id == undefined || id == "") return "请输入id";
    statas = statas == "true" ? 1 : 0;
    sql = `update seclill_time set statas=${statas} where id=${id};`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  times_edit(param) {
    let { titie, e_time, s_time, statas, id } = param;
    if (id == undefined || id == "") return "请输入id";
    e_time = e_time.slice(11, 19);
    s_time = s_time.slice(11, 19);
    sql = `update seclill_time set titie='${titie}',e_time='${e_time}',s_time='${s_time}',statas='${statas}'where id=${id};`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  times_del(param) {
    let { id } = param;
    if (id == undefined || id == "") return "请输入id";
    sql = `delete from seclill_time where id=${id};`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  seckill_select(parameter) {
    let count =
      parameter.page_size == undefined || parameter.page_size == ""
        ? 5
        : parameter.page_size;
    let state =
      parameter.page_num == undefined || parameter.page_num == ""
        ? 0
        : (parameter.page_num - 1) * parameter.page_size;
    sql = `select id, b_name,count(1) counts from (select a.id,a.b_name from brand a left join commodity b on a.id=b.p_brand) c  group  by id limit ${state},${count};`;
    let sql2 = "select count(*) counts from brand";
    let arr = [];
    return new Promise((resolve) => {
      pool.query(sql2, (err, result) => {
        if (err) throw err;
        if (result[0].counts > 0) {
          arr.push(result[0].counts);
          pool.query(sql, (err, result) => {
            if (err) throw err;
            arr.push(result);
            resolve(arr);
          });
        } else {
          resolve(arr);
        }
      });
    });
  }
  seckill_select_search(param) {
    let { page, search } = param;
    page=JSON.parse(page);
    let count =
      page.page_size == undefined || page.page_size == ""
        ? 5
        : page.page_size;
    let state =
      page.page_num == undefined || page.page_num == ""
        ? 0
        : (page.page_num - 1) * page.page_size;
    sql = `select id, b_name,count(1) counts from (select a.id,a.b_name from brand a left join commodity b on a.id=b.p_brand) c where b_name regexp '${search}' group by id limit ${state},${count};`;
    let sql2 = `select count(*) counts from brand where b_name regexp '${search}';`;
    let arr = [];
    return new Promise((resolve) => {
      pool.query(sql2, (err, result) => {
        if (err) throw err;
        if (result[0].counts > 0) {
          arr.push(result[0].counts);
          pool.query(sql, (err, result) => {
            if (err) throw err;
            arr.push(result);
            resolve(arr);
          });
        } else {
          resolve(arr);
        }
      });
    });
  }
  new_select_search(param) {
    let { page, search } = param;
    page=JSON.parse(page);
    let count =
      page.page_size == undefined || page.page_size == ""
        ? 5
        : page.page_size;
    let state =
      page.page_num == undefined || page.page_num == ""
        ? 0
        : (page.page_num - 1) * page.page_size;
    sql = `select id,p_id,p_name,recommend,sort,p_price,art_no from commodity  where is_new='1' && p_name regexp '${search}' limit ${state},${count}`;
    let sql2 = `select count(1) counts from commodity where is_new='1' && p_name regexp '${search}';`;
    let arr = [];
    return new Promise((resolve) => {
      pool.query(sql2, (err, result) => {
        if (err) throw err;
        if (result[0].counts > 0) {
          arr.push(result[0].counts);
          pool.query(sql, (err, result) => {
            if (err) throw err;
            arr.push(result);
            resolve(arr);
          });
        } else {
          resolve(arr);
        }
      });
    });
  }
  pro_select_search(param) {
    let { page, search } = param;
    page=JSON.parse(page);
    let count =
      page.page_size == undefined || page.page_size == ""
        ? 5
        : page.page_size;
    let state =
      page.page_num == undefined || page.page_num == ""
        ? 0
        : (page.page_num - 1) * page.page_size;
    sql = `select id,p_name,p_price,art_no from commodity where pro>2999 && p_name regexp '${search}' order by sell_num desc limit ${state},${count}`;
    let sql2 = `select count(1)  counts from commodity where pro>2999 && p_name regexp '${search}';`;
    let arr = [];
    return new Promise((resolve) => {
      pool.query(sql2, (err, result) => {
        if (err) throw err;
        if (result[0].counts > 0) {
          arr.push(result[0].counts);
          pool.query(sql, (err, result) => {
            if (err) throw err;
            arr.push(result);
            resolve(arr);
          });
        } else {
          resolve(arr);
        }
      });
    });
  }
  special_select_search(param) {
    let { page, search } = param;
    page=JSON.parse(page);
    let count =
      page.page_size == undefined || page.page_size == ""
        ? 5
        : page.page_size;
    let state =
      page.page_num == undefined || page.page_num == ""
        ? 0
        : (page.page_num - 1) * page.page_size;
    sql = `select * from special where sp_titie regexp '${search}' limit ${state},${count}`;;
    let sql2 = `select count(1) counts from special where sp_titie regexp '${search}';`;
    let arr = [];
    return new Promise((resolve) => {
      pool.query(sql2, (err, result) => {
        if (err) throw err;
        if (result[0].counts > 0) {
          arr.push(result[0].counts);
          pool.query(sql, (err, result) => {
            if (err) throw err;
            arr.push(result);
            resolve(arr);
          });
        } else {
          resolve(arr);
        }
      });
    });
  }
}

module.exports = new marketing();
