<template>
  <el-card shadow="never">
    <div class="box">
      <div class="item">
        <el-icon>
          <List/>
        </el-icon>
        <slot name="name"></slot>
      </div>
      <div>
        <slot name="btn"></slot>
      </div>
    </div>
  </el-card>
</template>
<style scoped lang="less">
.box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  display: inline-flex;
  justify-content: space-between;
  align-items: center;

  .el-icon {
    font-size: 18px
  }
}
</style>
