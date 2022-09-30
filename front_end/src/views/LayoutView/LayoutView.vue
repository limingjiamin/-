<template>
  <div class="common-layout">
    <el-container>
      <el-aside>
        <AsideView />
      </el-aside>
      <el-container>
        <el-header>
          <HeaderView />
        </el-header>
        <el-main>
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import AsideView from "@/components/AsideView.vue";
import HeaderView from "@/components/HeaderView.vue";
</script>
<style lang="less">
.el-header {
  border: 1px solid #e6e6e6;
  border-left: none;
  border-right: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-aside{
  background-color: #304156;
}
</style>
