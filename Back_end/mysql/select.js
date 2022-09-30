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
    if (address == "" || address == undefined) return "请输入路由地址";
    let table = "";
    switch (address) {
      case "advertising-list":
        table = "advertis";
        break;
      case "goods-list":
        table = "commodity";
        break;
      case "brand-management":
        table = "brand";
        break;
      case "order-list":
        table = "order-list";
        break;
      case "return-application":
        table = "return-application";
        break;
      case "return-reason":
        table = "return-reason";
        break;
      case "brand-recommend":
        table = "brand";
        break;
      case "new-product-recommend":
        table = "commodity";
        break;
      case "popular-recommend":
        table = "commodity";
        break;
      case "special-recommend":
        table = "special";
        break;
    }
    sql = `SELECT  table_name,column_name  FROM  INFORMATION_SCHEMA.KEY_COLUMN_USAGE  WHERE  TABLE_NAME= '${table}';`;
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
    if (addrss == "advertising-list" || addrss == "return-reason")
      addrss = "return-application";
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
    let { table, pri, id } = param;
    sql = `delete from ${table} where ${pri} in (${id.slice(1, -1)})`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  // 批量数据修改
  batch_update(param) {
    let { table, pri, id, field, value } = param;
    console.log(id, typeof id);
    sql = `update ${table} set ${field} = '${value}' WHERE ${pri} in (${id});`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  // 批量数据查看
  batch_select(param) {
    let { table, pri, id, field } = param;
    sql = `select ${pri},${field} from ${table} where ${pri} in (${id.slice(
      1,
      -1
    )})`;
    return new Promise((resolve) => {
      pool.query(sql, (err, result) => {
        if (err) throw err;
        resolve(result);
      });
    });
  }
  // 搜索根据路由选择表格
  tables(param) {
    let { address, field, page = {} } = param;
    if (address == "" || address == undefined) return "请输入路由地址";
    if (Object.keys(field).length == 0) return "没有参数";
    let count =
      page.page_size == undefined || page.page_size == "" ? 5 : page.page_size;
    let state =
      page.page_num == undefined || page.page_num == ""
        ? 0
        : (page.page_num - 1) * page.page_size;
    // 处理参数field
    let str = "";
    // 模糊名单
    let arr = [
      "ad_titie",
      "p_name",
      "account",
      "titie",
      "cou_titie",
      "b_time",
      "sp_titie",
    ];
    let num;
    for (let key in field) {
      num = arr.indexOf(key);
      if (address == "order-list") {
        if (key == "account") {
          let phone = field[key].match(/\d/gi) || [];
          if (phone.length == field[key].trim().length) {
            key = "b.phone";
            num = -1;
          } else {
            key = "b.account";
          }
        } else {
          key = "a." + key;
        }
      }
      if (address == "return-application") {
        if (key == "account") key = "b.account";
        if (key == "price" || key == "order_num") key = "c." + key;
        key = "a." + key;
      }
      if (num > -1) {
        str += `${key} regexp '${
          field[key.split(".")[key.split(".").length - 1]]
        }' && `;
      } else {
        str += `${key} = '${
          field[key.split(".")[key.split(".").length - 1]]
        }' && `;
      }
    }
    str = str.slice(0, -4);
    let sql2 = "";
    switch (address) {
      case "goods-list":
        sql = ` select * from commodity where ${str}limit ${state},${count};`;
        sql2 = ` select count(1) from commodity where ${str};`;
        break;
      case "brand-management":
        sql = `select * from brand where ${str}limit ${state},${count};`;
        sql2 = `select count(1) from brand where ${str};`;
        break;
      case "order-list":
        table = ["order-list", "consumer"];
        sql = `select a.*,b.account,b.phone from order_list a left join consumer b on a.consumer_id=b.c_id where ${str} limit ${state},${count};`;
        sql2 = `select count(1) from order_list a left join consumer b on a.consumer_id=b.c_id where ${str};`;
        break;
      case "return-application":
        sql = `select a.*,b.account,c.price,c.order_num from return_application a left join consumer b on a.consumer_id=b.c_id left join order_list c on a.order_id=c.id where ${str}limit ${state},${count}`;
        sql2 = `select count(1) from return_application a left join consumer b on a.consumer_id=b.c_id left join order_list c on a.order_id=c.id where ${str}`;
        break;
      case "seckill-activity":
        sql = `select * from seckill where ${str}limit ${state},${count}`;
        sql2 = `select count(1) from seckill where ${str};`;
        break;
      case "coupon-list":
        sql = `select * from coupon where ${str}limit ${state},${count}`;
        sql2 = `select count(1) from coupon where ${str}`;
        break;
      case "brand-recommend":
        sql = `select * from brand where ${str}limit ${state},${count}`;
        sql2 = `select count(1) from brand where ${str}`;
        break;
      case "new-product-recommend":
        sql = `select id,p_id,p_name,recommend,sort from commodity  where is_new='1' && ${str} limit ${state},${count}`;
        sql2 = `select count(1) from commodity  where is_new='1' && ${str} `;
        break;
      case "popular-recommend":
        sql = `select id,p_id,p_name,recommend,sort from commodity where pro>2999 && ${str} order by sell_num desc limit ${state},${count}`;
        sql2 = `select count(1) from commodity where pro>2999 && ${str}`;
        break;
      case "special-recommend":
        sql = `select * from special where ${str}limit ${state},${count}`;
        sql2 = `select count(1) from special where ${str}`;
        break;
      case "advertising-list":
        sql = `select * from advertis where ${str}limit ${state},${count};`;
        sql2 = `select count(1) from advertis where ${str};`;
        break;
      /*   case "user-list":
        table = ["consumer"];
        break;
      case "menu-list":
        table = ["menu"];
        break;
      case "resource-list":
        table = ["resource"];
        break; */
    }
    return new Promise((resolve) => {
      let newarr = [];
      pool.query(sql2, (err, result) => {
        if (err) throw err;
        if (result[0]["count(1)"] == 0) {
          resolve("没有符合条件的数据");
        } else {
          newarr.push(result[0]["count(1)"]);
          pool.query(sql, (err, result) => {
            if (err) throw err;
            newarr.push(result);
            resolve(newarr);
          });
        }
      });
    });
  }
}

module.exports = new select();
