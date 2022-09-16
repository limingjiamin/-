const pool = require("./pool.js");

let sql = "";
//创建查询语句
class  order{
  constructor() {}
  //订单列表数据
  list(table,parameter) {
    let count = parameter.pag_count==undefined||parameter.pag_count==""? 10 : parameter.pag_count;
    let state = parameter.pag_num==undefined ||parameter.pag_num==""? 0 : (parameter.pag_num-1)*count;
    sql = `select * from ${table} limit ${state},${count}`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  //查看某一订单信息
  order_select(table,param){
    let {id}=param;
    if(id==undefined||id=="") return "请输入订单id";
    sql=`select * from ${table} left join consumer on consumer_id=c_id where id=${id}`;
    return new Promise((resolve) => {
        pool.query(sql, (err, result) => {
          if (err) throw err;
          resolve(result);
        });
      });
  }
  //删除订单信息
  order_delete(table,param){
    let {id}=param;
    if(id==undefined||id=="") return "请输入订单id";
    sql=`delete from ${table} where id=${id}`;
    return new Promise((resolve) => {
        pool.query(sql, (err, result) => {
          if (err) throw err;
          resolve(result);
        });
      });
  }
  //确认发货
  goods_edit(table,param){
    let {id,delivery,logistics}=param;
    console.log(id);
    if(id==undefined||id=="") return "请输入订单id";
    if(delivery==undefined||delivery=="") return "请选择订单id为${id}的配送方式";
    if(logistics==undefined||logistics=="") return `请输入订单id为${id}的物流单号`;
    sql=`update ${table} set delivery='${delivery}',logistics='${logistics}' where id=${id}`;
    return new Promise((resolve) => {
        pool.query(sql, (err, result) => {
          if (err) throw err;
          resolve(result);
        });
      });
  }

}

module.exports = new order();
