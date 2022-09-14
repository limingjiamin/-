import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    // 登录
    path: "/login",
    name: "login",
    component: () => import("@/views/LoginView/LoginView"),
  },
  {
    path: "/",
    redirect: "/login",
  },

  {
    // 首页
    path: "",
    component: () => import("@/views/LayoutView/LayoutView"),
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("@/views/HomeView/HomeView"),
      },
    ],
  },
  {
    // 商品
    path: "/commodity",
    name: "commodity",
    component: () => import("@/views/LayoutView/LayoutView"),
    children: [
      {
        path: "add-goods",
        name: "add-goods",
        component: () => import("@/views/CommodityView/AddGoods"),
      },
      {
        path: "brand-management",
        name: "brand-management",
        component: () => import("@/views/CommodityView/BrandManagement"),
      },
      {
        path: "goods-categories",
        name: "goods-categories",
        component: () => import("@/views/CommodityView/GoodsCategories"),
      },
      {
        path: "goods-list",
        name: "goods-list",
        component: () => import("@/views/CommodityView/GoodsList"),
      },
      {
        path: "product-types",
        name: "product-types",
        component: () => import("@/views/CommodityView/ProductTypes"),
      },
    ],
  },
  {
    // 订单
    path: "/order",
    name: "order",
    component: () => import("@/views/LayoutView/LayoutView"),
    children: [
      {
        path: "/order-list",
        name: "order-list",
        component: () => import("@/views/OrderView/OrderList"),
      },
      {
        path: "/order-settings",
        name: "order-settings",
        component: () => import("@/views/OrderView/OrderSettings"),
      },
      {
        path: "/return-application",
        name: "return-application",
        component: () => import("@/views/OrderView/ReturnApplication"),
      },
      {
        path: "/return-reason",
        name: "return-reason",
        component: () => import("@/views/OrderView/ReturnReason"),
      },
    ],
  },
  {
    // 营销
    path: "/market",
    name: "market",
    component: () => import("@/views/LayoutView/LayoutView"),
    children: [
      {
        path: "advertising-list",
        name: "advertising-list",
        component: () => import("@/views/MarketingView/AdvertisingList"),
      },
      {
        path: "brand-recommend",
        name: "brand-recommend",
        component: () => import("@/views/MarketingView/BrandRecommend"),
      },
      {
        path: "coupon-list",
        name: "coupon-list",
        component: () => import("@/views/MarketingView/CouponList"),
      },
      {
        path: "new-product-recommend",
        name: "new-product-recommend",
        component: () => import("@/views/MarketingView/NewProductRecommend"),
      },
      {
        path: "popular-recommend",
        name: "popular-recommend",
        component: () => import("@/views/MarketingView/PopularRecommend"),
      },
      {
        path: "seckill-activity",
        name: "seckill-activity",
        component: () => import("@/views/MarketingView/SeckillActivity"),
      },
      {
        path: "special-recommend",
        name: "special-recommend",
        component: () => import("@/views/MarketingView/SpecialRecommend"),
      },
    ],
  },
  {
    // 权限
    path: "/permission",
    name: "permission",
    component: () => import("@/views/LayoutView/LayoutView"),
    children: [
      {
        path: "menu-list",
        name: "menu-list",
        component: () => import("@/views/PermissionsView/MenuList"),
      },
      {
        path: "resource-list",
        name: "resource-list",
        component: () => import("@/views/PermissionsView/ResourceList"),
      },
      {
        path: "role-list",
        name: "role-list",
        component: () => import("@/views/PermissionsView/RoleList"),
      },
      {
        path: "user-list",
        name: "user-list",
        component: () => import("@/views/PermissionsView/UserList"),
      },
    ],
  },
  {
    // 404
    path: "/*",
    name: "notfound",
    component: () => import("@/views/NotFound/NotFound"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
