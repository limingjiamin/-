var express = require("express");
var router = express.Router();
const mysql = require("../mysql/select.js");

//导航栏请求
router.get("/navigation", async (req, res) => {
  let data = await mysql.navigation("nav");
   for(let key of data){
    if(key.menu!=""&&key.menu!="0"){
     key.menu = await mysql.navigation(key.menu);
    }
   }
  res.json(data);
});

router.post("/route", async(req, res) => {
  let data=await mysql.route(req.body);
  if(typeof data=="string"){
    res.json({
      code: 400,
      data: data,
    });
  }else{
    if(data.length==0){
      res.json({
        code: 400,
        data: "请输入正确的路由",
      });
    }else{
      res.json({
        code: 200,
        data: data,
      });
    }
  }
})


//批量数据请求
router.post("/batch", async (req, res) => {
  let data = await mysql.batch("batch", req.body);
  if (data.length == 0) {
    res.json({
      code: 400,
      data: "路由错误",
    });
  } else {
    let arr = [];
    for (let key of data) {
      arr.push({
        value: key.titie,
        label: key.titie,
      });
    }
    res.json({
      code: 200,
      data: arr,
    });
  }
});

// 批量删除
router.post("/batch_delete",async(req,res)=>{
 let data= await mysql.batch_delete(req.body);
 if(typeof data=="string"){
  res.json({
    code: 400,
    data: "请输入正确的订单id号",
  });
}else{
if (data.affectedRows > 0) {
  res.json({
    code: 0,
    type:"del",
    data: "删除成功",
  });
} else {
  res.json({
    code: 400,
    data: `没有该条id=${req.query.id}数据`,
  });
}
}
})
// 批量修改
router.post("/batch_update", async (req, res) => {
// 进行数据验证是否能够修改
  //  1.获取所有的数据内容
   let data= await mysql.batch_select(req.body);
   let arr=[];
  if(req.body.value=="已发货"){
    // 遍历data 寻找field 字段为 "待发货"
    data.forEach(elem => {
      if(elem[req.body.field]=="待发货") arr.push(elem[req.body.pri]);
    });
  }else if(req.body.value=="已关闭"){
    // 遍历data 寻找field 字段为 "已完成"
    data.forEach(elem => {
      if(elem[req.body.field]=="已完成") arr.push(elem[req.body.pri]);
    });
  }else{
    // 遍历data 是否一致，不一致则修改。
    data.forEach(elem => {
      if(elem[req.body.field]!=req.body.value) arr.push(elem[req.body.pri]);
    });
  }
  req.body.id=String(arr);
  let data2=await mysql.batch_update(req.body);
  res.json(arr)
  });


module.exports = router;
