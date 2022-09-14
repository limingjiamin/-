const pool = require("./pool.js");
let sql = "";
//创建查询语句
class home {
  constructor() {}

   //   菜品列表
  dishes_list(table){
     sql=`select * from ${table}`;
     return new Promise(resolve => {
        pool.query(sql,(err, result) => {
            if (err) throw err;
            resolve(result);
        })
     })
  }
  // 商家列表
  shop_list(table){
   sql=`select * from ${table}`; 
   return new Promise(resolve => { 
      pool.query(sql,(err, result) => {
         if (err) throw err;
            resolve(result);
      })
   });
  }

   // 商家详情
   shop_img(table,para){
      let {id}=para;
      if(id==""||id==undefined) return "请传入正确的id号" 
      sql=`select * from ${table} where id='${id}';`; 
      return new Promise(resolve => { 
         pool.query(sql,(err, result) => {
            if (err) throw err;
               resolve(result);
         })
      });
     }
   
     nav_list(table,para){
      let {id}=para;
      console.log(id);
      if(id==""||id==undefined) return "请传入正确的id号" 
      sql=`select * from ${table} where s_id='${id}';`; 
      return new Promise(resolve => { 
         pool.query(sql,(err, result) => {
            if (err) throw err;
               resolve(result);
         })
      });
     }
    
     foods_list(table,para){
      let {s_id,n_id}=para;
      if(s_id==""||s_id==undefined) return "请传入正确的商家id号" ;
      if(n_id==""||n_id==undefined) return "请传入正确的列表id号" ;
      let arr=[];
      sql=`select * from ${table} where s_id='${s_id}' and n_id='${n_id}';`; 
      let sql1=`select id from shops where id='${s_id}'`
      let sql2=`select id from nav  where s_id='${s_id}'`
      return new Promise(resolve => { 
         pool.query(sql1,(err, result) => {
            if (err) throw err;
              arr.push(result)
              pool.query(sql2,(err, result) => {
               if (err) throw err;
               arr.push(result)
               pool.query(sql,(err, result) => {
                  if (err) throw err;
                  arr.push(result)
                     resolve(arr);
               })
            })
         })
      })
     }

}
module.exports = new home();