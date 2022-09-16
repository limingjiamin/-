var express = require("express");
var router = express.Router();
const mysql = require("../mysql/order.js");

//订单表格数据
router.post("/order_list", async (req, res) => {
  let data = await mysql.list("order_list", req.body);
  if (data.length == 0) {
    res.json({
      code: 400,
      data: "数据库没有这么多的数据",
    });
  } else {
    res.json({
      code: 200,
      data: data,
    });
  }
});

//查看订单
router.get("/order_view", async (req, res) => {
  let data = await mysql.order_select("order_list", req.query);
  if (typeof data=="string") {
    res.json({
      code: 400,
      data: "数据库该条id的数据",
    });
  } else {
    res.json({
      code: 200,
      data: data,
    });
  }
});

//删除订单
router.get("/order_delete", async (req, res) => {
  let data = await mysql.order_delete("order_list", req.query);
  if(typeof data=="string"){
    res.json({
      code: 400,
      data: "请输入正确的订单id号",
    });
  }else{
  if (data.affectedRows > 0) {
    res.json({
      code: 200,
      data: "删除成功",
    });
  } else {
    res.json({
      code: 400,
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
      code: 400,
      data: data,
    });
  }else{
  if (data.affectedRows > 0) {
    res.json({
      code: 200,
      data: "修改成功",
    });
  } else {
    res.json({
      code: 400,
      data: `没有该条id=${req.query.id}数据`,
    });
  }
} 
})
module.exports = router;
