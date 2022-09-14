var express = require("express");
var router = express.Router();
const mysql = require("../mysql/home.js");

/* GET users listing. */
router.get("/address", (res) => {
  res.json({ address: "成都市金牛区营口北路为民新居" });
});

router.get("/dishes_list", async (req, res, next) => {
  let data = await mysql.dishes_list("dishes_list");
  console.log(data);
  res.json(data);
});

router.get("/shop_list", async (req, res, next) => {
  let data = await mysql.shop_list("shops");
  if (data.length == 0) {
    res.json({ code: 400 });
  } else {
    res.json({ code: 200, data: data });
  }
});

router.get("/shop_img", async (req, res, next) => {
  let data = await mysql.shop_img("shops", req.query);
  if (typeof data == "string") {
    res.json({ code: 400, meg: data });
  } else {
    res.json({ code: 200, data: data });
  }
});

router.get("/nav_list", async (req, res, next) => {
  let data = await mysql.nav_list("nav", req.query);
  if (typeof data == "string") {
    res.json({ code: 400, meg: data });
  } else if (data.length == 0) {
    res.json({ code: 400, meg: "该商家还没有分类哦" });
  } else {
    res.json({ code: 200, data: data });
  }
});

router.get("/foods_list", async (req, res, next) => {
  let data = await mysql.foods_list("foods", req.query);
  if (typeof data == "string") {
    res.json({ code: 400, meg: data });
  } else if (data[0].length == 0) {
    res.json({ code: 400, meg: "没有该商家" });
  } else if (data[1].length == 0) {
    res.json({ code: 400, meg: "该商家暂没有上架商品" });
  } else if (data[2].length == 0) {
    res.json({ code: 400, meg: "该列表没有商品" });
  } else {
    res.json({ code: 200, data: data[2] });
  }
});
module.exports = router;
