<template>
  <div class="common-layout">
    <el-container class="aside-part">
      <el-aside><AsideView></AsideView></el-aside>
      <el-container>
        <el-header class="top-header">
          <!--          面包屑-->
          <div class="fold-menu">
            <el-icon><Expand /></el-icon>
          </div>
          <!--          用户信息-->
          <div class="toolbar">
            <el-dropdown>
              <el-avatar :icon="UserFilled" />
              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item>首页</el-dropdown-item>
                  <el-dropdown-item>退出</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideView from "@/components/AsideView";

export default {
  name: "LayoutView",
  components: {
    AsideView,
  },
};
</script>
<style lang="less">
.el-header {
  border: 1px solid #e6e6e6;
  border-left: none;
  border-right: none;
}
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  //width: 200px;
  min-height: 400px;
}
.fold-menu {
  font-size: 24px;
}
</style>
