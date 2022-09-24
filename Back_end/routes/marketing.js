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
// 品牌表格
router.post("/brand", async (req, res) => {
  let data = await mysql.seckill("brand", req.body);
  let count = await mysql.count("brand");
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
// 新品表格
router.post("/new_product", async (req, res) => {
  let data = await mysql.new_product("commodity", req.body);
  let count = await mysql.counts("commodity");
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

router.post("/pro_product", async (req, res) => {
  let data = await mysql.pro_product("commodity", req.body);
  let count = await mysql.pro_count("commodity");
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
router.get("/seckill_comm_del", async (req, res) => {
  let data = await mysql.seckill_comm_del("secli_comm", req.query);
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

router.post("/coupon_history", async (req, res) => {
  let data = await mysql.coupon_history("coupon", req.body);
  if (typeof data == "string") {
    res.json({
      code: 400,
      meg: data,
    });
  } else {
    if (data.length > 0) {
      res.json({
        code: 200,
        data: data,
      });
    } else {
      res.json({
        code: 400,
        data: data,
      });
    }
  }
});

// 专题删除
router.get("/special_delete", async (req, res) => {
  let data = await mysql.special_delete("special", req.query);
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

// 品牌删除
router.get("/brand_delete", async (req, res) => {
  let data = await mysql.brand_delete("brand", req.query);
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

//专题推荐修改
router.get("/recommend", async (req, res) => {
  let data = await mysql.recommend("special", req.query);
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

router.get("/new_recommend", async (req, res) => {
  let data = await mysql.recommends("commodity", req.query);
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

//品牌推荐修改
router.get("/recommends", async (req, res) => {
  let data = await mysql.recommends("brand", req.query);
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

//专题排序修改
router.get("/sort", async (req, res) => {
  let data = await mysql.sort("special", req.query);
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

//品牌排序修改
router.get("/sorts", async (req, res) => {
  let data = await mysql.sorts("brand", req.query);
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

router.get("/new_sort", async (req, res) => {
  let data = await mysql.sorts("commodity", req.query);
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
router.get("/pro_sort", async (req, res) => {
  let data = await mysql.sorts("commodity", req.query);
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
//秒杀商品修改
router.get("/secli_comm", async (req, res) => {
  let data = await mysql.secli_comm("secli_comm", req.query);
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

router.get("/seckill_time", async (req, res) => {
  let data = await mysql.seckill_time(req.query);
  if (typeof data == "string") {
    res.json({
      code: 400,
      data: data,
    });
  } else {
    res.json({
      code: 200,
      data: data,
    });
  }
});

router.get("/seckill_shop", async (req, res) => {
  let data = await mysql.seckill_shop(req.query);
  if (typeof data == "string") {
    res.json({
      code: 400,
      data: data,
    });
  } else {
    if (data.length == 0) {
      res.json({
        code: 400,
        data: data,
      });
    } else {
      res.json({
        code: 200,
        data: data,
      });
    }
  }
});

router.get("/new_delete", async (req, res) => {
  let data = await mysql.new_delete("commodity", req.query);
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
router.get("/pro_delete", async (req, res) => {
  let data = await mysql.pro_delete("commodity", req.query);
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
module.exports = router;
