<template>
  <div class="box">
    <el-card class="box-card">
      <div class="list">
        <el-icon><List /></el-icon>
        数据列表
      </div>
      <div class="btn">
        <slot></slot>
        <!-- <el-button>添加</el-button> -->
      </div>
    </el-card>
  </div>
</template>
<script></script>
<style scoped lang="less">
.el-card.is-always-shadow {
   box-shadow:none;
}
.box {
  .box-card {
    height: 70px;
    .list {
      float: left;
      margin: 6px;
    }
    .btn {
      float: right;
      margin: 0 2px;
    }
  }
}
</style>
