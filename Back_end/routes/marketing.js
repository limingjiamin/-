var express = require("express");
var router = express.Router();
const mysql = require("../mysql/marketing.js");

// 秒杀活动表格数据
router.post("/seckill", async (req, res) => {
  let data = await mysql.seckill("seckill", req.body);
  let count = await mysql.count("seckill");
  if (data.length == 0) {
    res.json({
      code: 400,
      data: "数据库没有这么多的数据",
    });
  } else {
    res.json({
      code: 200,
      count: count[0].a,
      data: data,
    });
  }
});
//专题表格
router.post("/special", async (req, res) => {
  let data = await mysql.seckill("special", req.body);
  let count = await mysql.count("special");
  if (data.length == 0) {
    res.json({
      code: 400,
      data: "数据库没有这么多的数据",
    });
  } else {
    res.json({
      code: 200,
      count: count[0].a,
      data: data,
    });
  }
});


//秒杀活动上下线
router.get("/upper_line", async (req, res) => {
  let data = await mysql.upper_line("seckill", req.query);
  if (typeof data == "string") {
    res.json({
      code: 400,
      meg: data,
    });
  } else {
    if (data.affectedRows > 0) {
      res.json({
        code: 200,
        data: "修改成功",
      });
    } else {
      res.json({
        code: 400,
        data: `修改失败`,
      });
    }
  }
});

// 秒杀活动活动编辑
router.get("/seckill_edit", async (req, res) => {
  let data = await mysql.seckill_edit("seckill", req.query);
  if (typeof data == "string") {
    res.json({
      code: 400,
      meg: data,
    });
  } else {
    if (data.affectedRows > 0) {
      res.json({
        code: 200,
        data: "修改成功",
      });
    } else {
      res.json({
        code: 400,
        data: `修改失败`,
      });
    }
  }
});

// 秒杀活动删除
router.get("/seckill_delete", async (req, res) => {
  let data = await mysql.seckill_delete("seckill", req.query);
  if (typeof data == "string") {
    res.json({
      code: 400,
      meg: data,
    });
  } else {
    if (data.affectedRows > 0) {
      res.json({
        code: 200,
        data: "删除成功",
      });
    } else {
      res.json({
        code: 400,
        data: `删除失败`,
      });
    }
  }
});
//优惠券表格
router.get("/coupon", async (req, res) => {
  let data = await mysql.seckill("coupon", req.query);
  let count = await mysql.count("coupon");
  if (data.length == 0) {
    res.json({
      code: 400,
      data: "数据库没有这么多的数据",
    });
  } else {
    res.json({
      code: 200,
      count: count[0].a,
      data: data,
    });
  }
});
// 优惠券删除
router.get("/coupon_delete", async (req, res) => {
  let data = await mysql.coupon_delete("coupon", req.query);
  if (typeof data == "string") {
    res.json({
      code: 400,
      meg: data,
    });
  } else {
    if (data.affectedRows > 0) {
      res.json({
        code: 200,
        data: "删除成功",
      });
    } else {
      res.json({
        code: 400,
        data: `删除失败`,
      });
    }
  }
});
// 广告数据请求
router.get("/advertis", async (req, res) => {
  let data = await mysql.seckill("advertis", req.query);
  let count = await mysql.count("advertis");
  if (data.length == 0) {
    res.json({
      code: 400,
      data: "数据库没有这么多的数据",
    });
  } else {
    res.json({
      code: 200,
      count: count[0].a,
      data: data,
    });
  }
});
// 广告删除
router.get("/advertis_delete", async (req, res) => {
  let data = await mysql.advertis_delete("advertis", req.query);
  if (typeof data == "string") {
    res.json({
      code: 400,
      meg: data,
    });
  } else {
    if (data.affectedRows > 0) {
      res.json({
        code: 200,
        data: "删除成功",
      });
    } else {
      res.json({
        code: 400,
        data: `删除失败`,
      });
    }
  }
});

//秒杀活动上下线
router.get("/upper", async (req, res) => {
  let data = await mysql.upper("advertis", req.query);
  if (typeof data == "string") {
    res.json({
      code: 400,
      meg: data,
    });
  } else {
    if (data.affectedRows > 0) {
      res.json({
        code: 200,
        data: "修改成功",
      });
    } else {
      res.json({
        code: 400,
        data: `修改失败`,
      });
    }
  }
});
module.exports = router;
