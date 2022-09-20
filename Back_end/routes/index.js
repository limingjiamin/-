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

})

module.exports = router;
