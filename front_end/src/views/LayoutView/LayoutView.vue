<template>
  <div class="common-layout">
    <el-container class="aside-part">
      <el-aside width="200px"><AsideView></AsideView></el-aside>
      <el-container>
        <el-header style="background-color: blue">Header</el-header>
        <el-main style="background-color: yellow">
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
<style lang="less"></style>
