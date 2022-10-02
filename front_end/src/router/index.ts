import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import LayoutView from "@/views/LayoutView/LayoutView.vue";
const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/home",
  },
  {
    path: "/",
    component: LayoutView,
    children: [
      {
        path: "home",
        name: "home",
        component: () => import("../views/HomeView/HomeView.vue"),
        meta: { isAuth: true, title: "首页" },
        props: true,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/LoginView/LoginView.vue"),
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
        component: () => import("@/views/CommodityView/AddGoods.vue"),
        meta: { isAuth: true, title: "添加商品" },
      },
      {
        path: "brand-management",
        name: "brand-management",
        component: () => import("@/views/CommodityView/BrandManagement.vue"),
        meta: { isAuth: true, title: "品牌管理" },
      },
      {
        path: "goods-categories",
        name: "goods-categories",
        component: () => import("@/views/CommodityView/GoodsCategories.vue"),
        meta: { isAuth: true, title: "商品分类" },
      },
      {
        path: "goods-list",
        name: "goods-list",
        component: () => import("@/views/CommodityView/GoodsList.vue"),
        meta: { isAuth: true, title: "商品列表" },
      },
      {
        path: "product-types",
        name: "product-types",
        component: () => import("@/views/CommodityView/ProductTypes.vue"),
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
        component: () => import("@/views/OrderView/OrderList.vue"),
        meta: { isAuth: true, title: "订单列表" },
      },
      {
        path: "order-settings",
        name: "order-settings",
        component: () => import("@/views/OrderView/OrderSettings.vue"),
        meta: { isAuth: true, title: "订单设置" },
      },
      {
        path: "return-application",
        name: "return-application",
        component: () => import("@/views/OrderView/ReturnApplication.vue"),
        meta: { isAuth: true, title: "退货申请处理" },
      },
      {
        path: "return-reason",
        name: "return-reason",
        component: () => import("@/views/OrderView/ReturnReason.vue"),
        meta: { isAuth: true, title: "退货原因处理" },
      },
      {
        path: "order-detail",
        name: "order-detail",
        component: () => import("@/views/OrderView/OrderDetail.vue"),
        meta: { isAuth: true, title: "订单详情" },
      },
      {
        path: "deliver-goods",
        name: "deliver-goods",
        component: () => import("@/views/OrderView/DeliverGoods.vue"),
        meta: { isAuth: true, title: "发货信息" },
      },
      {
        path: "return-application-detail",
        name: "return-application-detail",
        component: () =>
          import("@/views/OrderView/ReturnApplicationDetail.vue"),
        meta: { isAuth: true, title: "退货详情" },
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
        component: () => import("@/views/MarketingView/AdvertisingList.vue"),
        meta: { isAuth: true, title: "广告列表" },
      },
      {
        path: "brand-recommend",
        name: "brand-recommend",
        component: () => import("@/views/MarketingView/BrandRecommend.vue"),
        meta: { isAuth: true, title: "品牌推荐" },
      },
      {
        path: "coupon-list",
        name: "coupon-list",
        component: () => import("@/views/MarketingView/CouponList.vue"),
        meta: { isAuth: true, title: "优惠卷列表" },
      },
      {
        path: "new-product-recommend",
        name: "new-product-recommend",
        component: () =>
          import("@/views/MarketingView/NewProductRecommend.vue"),
        meta: { isAuth: true, title: "新品推荐" },
      },
      {
        path: "popular-recommend",
        name: "popular-recommend",
        component: () => import("@/views/MarketingView/PopularRecommend.vue"),
        meta: { isAuth: true, title: "人气推荐" },
      },
      {
        path: "seckill-activity",
        name: "seckill-activity",
        component: () => import("@/views/MarketingView/SeckillActivity.vue"),
        meta: { isAuth: true, title: "秒杀活动列表" },
      },
      {
        path: "special-recommend",
        name: "special-recommend",
        component: () => import("@/views/MarketingView/SpecialRecommend.vue"),
        meta: { isAuth: true, title: "专题推荐" },
      },
      {
        path: "spike-time",
        name: "spike-time",
        component: () => import("@/views/MarketingView/SpikeTime.vue"),
        meta: { isAuth: true, title: "秒杀时间" },
      },
      {
        path: "spike-times",
        name: "spike-times",
        component: () => import("@/views/MarketingView/SeckTimes.vue"),
        meta: { isAuth: true, title: "秒杀时间表" },
      },
      {
        path: "coupon-history",
        name: "coupon-history",
        component: () => import("@/views/MarketingView/CouponHistory.vue"),
        meta: { isAuth: true, title: "优惠券详情" },
      },
      {
        path: "coupon-update",
        name: "coupon-update",
        component: () => import("@/views/MarketingView/CouponUpdate.vue"),
        meta: { isAuth: true, title: "优惠券修改" },
      },
      {
        path: "advertis-update",
        name: "advertis-update",
        component: () => import("@/views/MarketingView/AdvertisingEdit.vue"),
        meta: { isAuth: true, title: "广告修改" },
      },
      {
        path: "spike-comm",
        name: "spike-comm",
        component: () => import("@/views/MarketingView/SpikeComm.vue"),
        meta: { isAuth: true, title: "秒杀商品" },
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
        component: () => import("@/views/PermissionsView/MenuList.vue"),
        meta: { isAuth: true, title: "菜单列表" },
      },
      {
        path: "resource-list",
        name: "resource-list",
        component: () => import("@/views/PermissionsView/ResourceList.vue"),
        meta: { isAuth: true, title: "资源列表" },
      },
      {
        path: "role-list",
        name: "role-list",
        component: () => import("@/views/PermissionsView/RoleList.vue"),
        meta: { isAuth: true, title: "角色列表" },
      },
      {
        path: "user-list",
        name: "user-list",
        component: () => import("@/views/PermissionsView/UserList.vue"),
        meta: { isAuth: true, title: "用户列表" },
      },
    ],
  },
  {
    // 404
    path: "/*",
    name: "notfound",
    component: () => import("@/views/NotFound/NotFound.vue"),
    meta: { isAuth: true, title: "404" },
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
// 路由守卫
router.beforeEach((to, from, next) => {
  const token: string | null = localStorage.getItem("token");
  if (!token && to.path !== "/login") {
    next("/login");
  } else {
    next();
  }
});

export default router;
