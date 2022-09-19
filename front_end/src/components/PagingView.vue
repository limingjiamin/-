<template>
  <div class="wei">
    <span>共 {{ page.page_count }} 条</span>
    <el-select v-model="page.page_size" class="m-2" style="width: 100px; margin: 0 10px">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-pagination v-model:currentPage="page.page_num" v-model:page-size="page.page_size" background
      layout="prev, pager, next" :total="page.page_count" />
    <div class="wei">
      <span>前往 </span>
      <el-input v-model="page.page_num" style="width: 50px; margin: 0 10px; text-align: center" />
      <span> 页</span>
    </div>
  </div>
</template>
<script>
  // 1.从vuex中获取数据，在自己的界面
  // 2.需要一开始，就要给page_count复制
  // 3.当页面数值发现生变化是，需要自己发起ajax请求。
  export default {
    created() {
      this.page = this.$store.state.page;
      this.page.page_size = 5;
      this.page.page_num = 1;
    },
    data() {
      return {
        page: {},
        options: [
          {
            value: 5,
            label: "5条/页",
          },
          {
            value: 10,
            label: "10条/页",
          },
          {
            value: 15,
            label: "15条/页",
          },
          {
            value: 20,
            label: "20条/页",
          },
        ],
      };
    },
  };
</script>
<style scoped>
  .wei {
    margin-left: 10px;
    display: flex;
    align-items: center;
  }
</style>