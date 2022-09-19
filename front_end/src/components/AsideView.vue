<template>
  <el-row class="tac">
    <el-col>
      <el-menu
        background-color="#304156"
        class="el-menu-vertical-demo"
        default-active="/home"
        text-color="rgb(191, 203, 217)"
        @open="handleOpen"
        @close="handleClose"
        router
      >
        <el-menu-item index="/home">
          <el-icon><HomeFilled /></el-icon>
          <template #title>
            <span>首页</span>
          </template>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>
            <el-icon><Goods /></el-icon>
            <span>商品</span>
          </template>
          <el-menu-item index="/commodity/goods-list">
            <el-icon><Menu /></el-icon>
            <template #title>
              <span>商品列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/commodity/add-goods">
            <el-icon><DocumentAdd /></el-icon>
            <template #title>
              <span>添加商品</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/commodity/goods-categories">
            <el-icon><Grid /></el-icon>
            <template #title>
              <span>商品分类</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/commodity/product-types">
            <el-icon><Tickets /></el-icon>
            <template #title>
              <span>商品类型</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/commodity/brand-management">
            <el-icon><PriceTag /></el-icon>
            <template #title>
              <span>品牌管理</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="3">
          <template #title>
            <el-icon><List /></el-icon>
            <span>订单</span>
          </template>
          <el-menu-item index="/order/order-list">
            <el-icon><Menu /></el-icon>
            <template #title>
              <span>订单列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/order/order-settings">
            <el-icon><setting /></el-icon>
            <template #title>
              <span>订单设置</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/order/return-application">
            <el-icon><SoldOut /></el-icon>
            <template #title>
              <span>退货申请处理</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/order/return-reason">
            <el-icon><TakeawayBox /></el-icon>
            <template #title>
              <span>退货原因设置</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="4">
          <template #title>
            <el-icon><DataAnalysis /></el-icon>
            <span>营销</span>
          </template>
          <el-menu-item index="/market/seckill-activity">
            <template #title>
              <el-icon><AlarmClock /></el-icon>
              <span>秒杀活动列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/market/coupon-list">
            <template #title>
              <el-icon><Ticket /></el-icon>
              <span>优惠卷列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/market/brand-recommend">
            <template #title>
              <el-icon><PriceTag /></el-icon>
              <span>品牌推荐</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/market/new-product-recommend">
            <template #title>
              <el-icon><Opportunity /></el-icon>
              <span>新品推荐</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/market/popular-recommend">
            <template #title>
              <el-icon><TrophyBase /></el-icon>
              <span>人气推荐</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/market/special-recommend">
            <template #title>
              <el-icon><ReadingLamp /></el-icon>
              <span>专题推荐</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/market/advertising-list">
            <template #title>
              <el-icon><DataAnalysis /></el-icon>
              <span>广告列表</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
        <el-sub-menu index="5">
          <template #title>
            <el-icon><Key /></el-icon>
            <span>权限</span>
          </template>
          <el-menu-item index="/permission/user-list">
            <template #title>
              <el-icon><UserFilled /></el-icon>
              <span>用户列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/permission/role-list">
            <template #title>
              <el-icon><HelpFilled /></el-icon>
              <span>角色列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/permission/menu-list">
            <template #title>
              <el-icon><Menu /></el-icon>
              <span>菜单列表</span>
            </template>
          </el-menu-item>
          <el-menu-item index="/permission/resource-list">
            <template #title>
              <el-icon><Histogram /></el-icon>
              <span>资源列表</span>
            </template>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
// import { ref } from "vue";
// const isCollapse = ref(true);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};
</script>

<style scoped>
.el-menu {
  height: 100vh;
}
span {
  font-size: 18px;
}
</style>
