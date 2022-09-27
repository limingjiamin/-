<template>
  <el-card class="box-card">
    <div class="box">
      <div class="box">
        <Search style="width: 1em; height: 1em; margin-right: 8px" />
        <h3>筛选搜索</h3>
      </div>
      <div>
        <el-button type="primary" plain>重置</el-button>
        <el-button type="success" plain @click="search">查询结果</el-button>
      </div>
    </div>
    <div class="box2">
      <slots :formInline="formInline"></slots>
    </div>
    {{formInline}}
  </el-card>

</template>
<script lang="ts">
  import { reactive, defineComponent, toRefs, ref } from "vue";
  import slots from `@/components/SearchView/GoodsList.vue`;
  import $http from "@/axios/http.ts";
  interface Search {
    name: String
    num: String
    category: String
    brand: String
    state: String
    examine: String
  }
  class FormInline {
    formInline: Search = {
      name: "",
      num: "",
      category: "",
      brand: "",
      state: "",
      examine: "",
    }
  }
  export default defineComponent({
    components: { slots },
    setup() {
      // 将表单元素的数据来源进行接口规范，并实例化
      const { formInline } = reactive(new FormInline());
      //  点击确定发起ajax请求获取，表格搜索数据
      const search = () => {
        // 接收到数据后，暴露在vuex上，让表格获取。
        $http("/market/advertis").then(data=>console.log(data))
      }
      return { formInline, search }
    },

  })



</script>
<style scoped>
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .box2 {
    box-sizing: border-box;
    padding: 10px;
  }
</style>