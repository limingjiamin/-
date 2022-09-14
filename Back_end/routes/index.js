var express = require("express");
var router = express.Router();
const mysql = require("../mysql/select.js");


//导航栏请求
router.get("/navigation", async (req, res) => {
  let data = await mysql.navigation("nav");
   for(let key of data){
    if(key.menu!=""){
     key.menu = await mysql.navigation(key.menu);
    }
   }
  res.json(data);
});






module.exports = router;
