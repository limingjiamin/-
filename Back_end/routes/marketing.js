var express = require("express");
var router = express.Router();
const mysql = require("../mysql/marketing.js");


// 秒杀活动表格数据
router.post("/seckill", async (req, res) => {
  let data = await mysql.seckill("seckill",req.body);
  if(data.length==0){
    res.json({
        code:400,
        data:"数据库没有这么多的数据"
    })
  }else{
    res.json({
        code:200,
        data:data,
    });
  }
});


module.exports = router;