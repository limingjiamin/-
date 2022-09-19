import { createRouter, createWebHashHistory } from "vue-router";
import LayoutView from "@/views/LayoutView/LayoutView.vue";
var routes = [
  {
    path: "/",
    component: LayoutView,
    children: [
      {
        path: "home",
        name: "home",
        component: function () {
          return import("../views/HomeView/HomeView.vue");
        },
        meta: { isAuth: true, title: "首页" },
        props: true,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: function () {
      return import("../views/LoginView/LoginView.vue");
    },
    meta: { isAuth: false, title: "登录" },
  },
  {
    // 商品
    path: "/commodity",
    name: "commodity",
    component: LayoutView,
    children: [
      {
        path: "add-goods",
        name: "add-goods",
        component: function () {
          return import("@/views/CommodityView/AddGoods.vue");
        },
        meta: { isAuth: true, title: "添加商品" },
      },
      {
        path: "brand-management",
        name: "brand-management",
        component: function () {
          return import("@/views/CommodityView/BrandManagement.vue");
        },
        meta: { isAuth: true, title: "品牌管理" },
      },
      {
        path: "goods-categories",
        name: "goods-categories",
        component: function () {
          return import("@/views/CommodityView/GoodsCategories.vue");
        },
        meta: { isAuth: true, title: "商品分类" },
      },
      {
        path: "goods-list",
        name: "goods-list",
        component: function () {
          return import("@/views/CommodityView/GoodsList.vue");
        },
        meta: { isAuth: true, title: "商品列表" },
      },
      {
        path: "product-types",
        name: "product-types",
        component: function () {
          return import("@/views/CommodityView/ProductTypes.vue");
        },
        meta: { isAuth: true, title: "商品类型" },
      },
    ],
  },
  {
    // 订单
    path: "/order",
    name: "order",
    component: LayoutView,
    children: [
      {
        path: "order-list",
        name: "order-list",
        component: function () {
          return import("@/views/OrderView/OrderList.vue");
        },
        meta: { isAuth: true, title: "订单列表" },
      },
      {
        path: "order-settings",
        name: "order-settings",
        component: function () {
          return import("@/views/OrderView/OrderSettings.vue");
        },
        meta: { isAuth: true, title: "订单设置" },
      },
      {
        path: "return-application",
        name: "return-application",
        component: function () {
          return import("@/views/OrderView/ReturnApplication.vue");
        },
        meta: { isAuth: true, title: "退货申请处理" },
      },
      {
        path: "return-reason",
        name: "return-reason",
        component: function () {
          return import("@/views/OrderView/ReturnReason.vue");
        },
        meta: { isAuth: true, title: "退货原因处理" },
      },
    ],
  },
  {
    // 营销
    path: "/market",
    name: "market",
    component: LayoutView,
    children: [
      {
        path: "advertising-list",
        name: "advertising-list",
        component: function () {
          return import("@/views/MarketingView/AdvertisingList.vue");
        },
        meta: { isAuth: true, title: "广告列表" },
      },
      {
        path: "brand-recommend",
        name: "brand-recommend",
        component: function () {
          return import("@/views/MarketingView/BrandRecommend.vue");
        },
        meta: { isAuth: true, title: "品牌推荐" },
      },
      {
        path: "coupon-list",
        name: "coupon-list",
        component: function () {
          return import("@/views/MarketingView/CouponList.vue");
        },
        meta: { isAuth: true, title: "优惠卷列表" },
      },
      {
        path: "new-product-recommend",
        name: "new-product-recommend",
        component: function () {
          return import("@/views/MarketingView/NewProductRecommend.vue");
        },
        meta: { isAuth: true, title: "新品推荐" },
      },
      {
        path: "popular-recommend",
        name: "popular-recommend",
        component: function () {
          return import("@/views/MarketingView/PopularRecommend.vue");
        },
        meta: { isAuth: true, title: "人气推荐" },
      },
      {
        path: "seckill-activity",
        name: "seckill-activity",
        component: function () {
          return import("@/views/MarketingView/SeckillActivity.vue");
        },
        meta: { isAuth: true, title: "秒杀活动列表" },
      },
      {
        path: "special-recommend",
        name: "special-recommend",
        component: function () {
          return import("@/views/MarketingView/SpecialRecommend.vue");
        },
        meta: { isAuth: true, title: "专题推荐" },
      },
    ],
  },
  {
    // 权限
    path: "/permission",
    name: "permission",
    component: LayoutView,
    children: [
      {
        path: "menu-list",
        name: "menu-list",
        component: function () {
          return import("@/views/PermissionsView/MenuList.vue");
        },
        meta: { isAuth: true, title: "菜单列表" },
      },
      {
        path: "resource-list",
        name: "resource-list",
        component: function () {
          return import("@/views/PermissionsView/ResourceList.vue");
        },
        meta: { isAuth: true, title: "资源列表" },
      },
      {
        path: "role-list",
        name: "role-list",
        component: function () {
          return import("@/views/PermissionsView/RoleList.vue");
        },
        meta: { isAuth: true, title: "角色列表" },
      },
      {
        path: "user-list",
        name: "user-list",
        component: function () {
          return import("@/views/PermissionsView/UserList.vue");
        },
        meta: { isAuth: true, title: "用户列表" },
      },
    ],
  },
  {
    // 404
    path: "/*",
    name: "notfound",
    component: function () {
      return import("@/views/NotFound/NotFound.vue");
    },
    meta: { isAuth: true, title: "404" },
  },
];
var router = createRouter({
  history: createWebHashHistory(),
  routes: routes,
});
// 路由守卫
router.beforeEach(function (to, from, next) {
  var token = localStorage.getItem("token");
  if (!token && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});
// if(to.meta.isAuth){
//   if(localStorage.getItem('authorize')){
//     next()
//   }else{
//     alert("没有权限无法访问")
//   }
// }
// }
export default router;
//# sourceMappingURL=index.js.map
