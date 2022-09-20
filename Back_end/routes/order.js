var express = require("express");
var router = express.Router();
const mysql = require("../mysql/order.js");

//订单表格数据
router.get("/order_list", async (req, res) => {
  let data = await mysql.list("order_list", req.query);
  let count= await mysql.count("order_list");
  if (data.length == 0) {
    res.json({
      code: 1,
      data: "数据库没有这么多的数据",
    });
  } else {
    res.json({
      code: 0,
      count:count[0].a,
      data: data,
    });
  }
});

//查看订单
router.get("/order_view", async (req, res) => {
  let data = await mysql.order_select("order_list", req.query);
  if (typeof data=="string") {
    res.json({
      code: 1,
      data: "数据库该条id的数据",
    });
  } else {
    res.json({
      code: 0,
      data: data,
    });
  }
});

//删除订单
router.get("/order_delete", async (req, res) => {
  let data = await mysql.order_delete("order_list", req.query);
  if(typeof data=="string"){
    res.json({
      code: 1,
      data: "请输入正确的订单id号",
    });
  }else{
  if (data.affectedRows > 0) {
    res.json({
      code: 0,
      data: "删除成功",
    });
  } else {
    res.json({
      code: 1,
      data: `没有该条id=${req.query.id}数据`,
    });
  }
}
});

//确定发货
router.post("/deliver_goods_edit", async (req,res)=>{
  let data = await mysql.goods_edit("order_list", req.body);
  console.log(data);
  if(typeof data=="string"){
    res.json({
      code: 1,
      data: data,
    });
  }else{
  if (data.affectedRows > 0) {
    res.json({
      code: 0,
      data: "修改成功",
    });
  } else {
    res.json({
      code: 1,
      data: `没有该条id=${req.query.id}数据`,
    });
  }
}
})

//订单设置
router.post("/order_setting",async (req,res)=>{
  let data= await mysql.order_set("order_setting",req.body);
  if(typeof data=="string"){
    res.json({
      code: 1,
      data: data,
    });
  }else{
  if (data.affectedRows > 0) {
    res.json({
      code: 0,
      data: "设置成功",
    });
  } else {
    res.json({
      code: 1,
      data: `设置失败`,
    });
  }
}
})

//退货表格
router.get("/return_application", async (req, res) => {
  let data = await mysql.list("return_application", req.query);
  let count= await mysql.count("return_application");
  if (data.length == 0) {
    res.json({
      code: 1,
      data: "数据库没有这么多的数据",
    });
  } else {
    res.json({
      code: 0,
      count:count[0].a,
      data: data,
    });
  }
});

//退货详情
router.get("/return_application_details",async (req,res)=>{
  let data=await mysql.application("return_application", req.query);
  if (typeof data=="string") {
    res.json({
      code: 1,
      data: "数据库该条id的数据",
    });
  } else {
    res.json({
      code: 0,
      data: data,
    });
  }
})

//退货原因设置表格
router.get("/return_reason", async (req, res) => {
  let data = await mysql.list("return_reason", req.query);
  let count= await mysql.count("return_reason");
  if (data.length == 0) {
    res.json({
      code: 1,
      data: "数据库没有这么多的数据",
    });
  } else {
    res.json({
      code: 0,
      count:count[0].a,
      data: data,
    });
  }
});

//退货原因编辑
router.post("/return_reason_edit",async(req,res)=>{
  let data = await mysql.reason_edit("return_reason", req.body);
  if(typeof data=="string"){
    res.json({
      code: 1,
      data: data,
    });
  }else{
  if (data.affectedRows > 0) {
    res.json({
      code: 0,
      data: "设置成功",
    });
  } else {
    res.json({
      code: 1,
      data: `设置失败`,
    });
  }
}
})

//退货原因删除
router.get("/return_reason_delete",async(req,res)=>{
let data= await mysql.reason_delete("return_reason",req.query);
if(typeof data=="string"){
  res.json({
    code: 1,
    data: data,
  });
}else{
if (data.affectedRows > 0) {
  res.json({
    code: 0,
    data: "删除成功",
  });
} else {
  res.json({
    code: 1,
    data: `删除失败`,
  });
}
}
})

// 添加退货原因
router.post("/return_reason_add",async(req,res)=>{
  let data=await mysql.reason_add("return_reason",req.body);
  if(typeof data=="string"){
    res.json({
      code: 1,
      data: data,
    });
  }else{
  if (data.affectedRows > 0) {
    res.json({
      code: 0,
      data: "插入成功",
    });
  } else {
    res.json({
      code: 1,
      data: `插入失败`,
    });
  }
  }
})
module.exports = router;
