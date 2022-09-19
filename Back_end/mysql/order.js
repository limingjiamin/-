const pool = require("./pool.js");

let sql = "";
//创建查询语句
class order {
  constructor() {}
  count(table){
    sql=`select count(1) a from ${table}`
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  //订单列表数据
  list(table, parameter) {
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
  //查看某一订单信息
  order_select(table, param) {
    let { id } = param;
    if (id == undefined || id == "") return "请输入订单id";
    sql = `select * from ${table} left join consumer on consumer_id=c_id where id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  //删除订单信息
  order_delete(table, param) {
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
  //确认发货
  goods_edit(table, param) {
    let { id, delivery, logistics } = param;
    if (id == undefined || id == "") return "请输入订单id";
    if (delivery == undefined || delivery == "")
      return "请选择订单id为${id}的配送方式";
    if (logistics == undefined || logistics == "")
      return `请输入订单id为${id}的物流单号`;
    sql = `update ${table} set delivery='${delivery}',logistics='${logistics}' where id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  //订单设置
  order_set(table, param) {
    let {
      seckill_order,
      normal_order,
      delivery_time,
      close_transaction,
      praise,
    } = param;
    if (seckill_order == undefined || seckill_order == "")
      return "请输入seckill_order";
    if (normal_order == undefined || normal_order == "")
      return "请输入normal_order";
    if (delivery_time == undefined || delivery_time == "")
      return "请输入delivery_time";
    if (close_transaction == undefined || close_transaction == "")
      return "请输入close_transaction";
    if (praise == undefined || praise == "") return "请输入praise";
    sql = `update ${table} set seckill_order='${seckill_order}',normal_order='${normal_order}',
        delivery_time='${delivery_time}',
        close_transaction='${close_transaction}',
        praise='${praise}' where id=1`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  //订单详情
  application(table, param) {
    let { id } = param;
    if (id == undefined || id == "") return "请输入订单id";
    sql = `select a.*,b.*,c.* 
    from ${table} a 
    left join consumer b
    on a.consumer_id=b.c_id
    left join order_list c
    on a.order_id=c.id
     where a.id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }

  // 退货原因编辑
  reason_edit(table, param) {
    let { id, reason, sort, status } = param;
    let str = "";
    if (id == undefined || id == "") return "请输入id";
    if (reason != undefined && reason != "") str += `reason='${reason}',`;
    if (sort != undefined && sort != "") str += `sort='${sort}',`;
    if (status != undefined && status != "") str += `status='${status}',`;
    if (str == "") {
      return "请输入正确的参数";
    } else {
      str = str.slice(0, -1);
    }
    sql = `update ${table} set ${str} where id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  //退货原因删除
  reason_delete(table, param) {
    let { id } = param;
    sql = `delete  from ${table} where id=${id}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  // 添加退货原因
  reason_add(table, param) {
    let str = "";
    let { reason, sort, status } = param;
    if (reason != undefined && reason != "") str += `reason='${reason}',`;
    if (sort != undefined && sort != "") str += `sort='${sort}',`;
    if (status != undefined && status != "") str += `status='${status}',`;
    if (str == "") {
      return "请输入正确的参数";
    } else {
      str = str.slice(0, -1);
    }
    sql = `insert into ${table} set ${str}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
}

module.exports = new order();
