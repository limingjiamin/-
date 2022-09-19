<template>
  <div class="top-header">
    <!--面包屑-->
    <div class="fold-menu">
      <el-icon><Expand /></el-icon>
    </div>
    <!--用户信息-->
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
  </div>
</template>

<style lang="less">
.top-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.fold-menu {
  font-size: 24px;
}
</style>
