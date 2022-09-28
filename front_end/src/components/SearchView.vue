<template>
  <el-card class="box-card">
    <div class="box">
      <div class="box">
        <Search style="width: 1em; height: 1em; margin-right: 8px" />
        <h3>筛选搜索</h3>
      </div>
      <div>
        <el-button type="primary" plain @click="reset">重置</el-button>
        <el-button type="success" plain @click="search">查询结果</el-button>
      </div>
    </div>
    <div class="box2">
      <!-- <GoodsList :queren=queren @newarr="formInline"></GoodsList> -->
      <!-- <BrandMan :queren=queren @newarr="formInline"></BrandMan> -->
      <!-- <OrderList :queren=queren @newarr="formInline"></OrderList> -->
      <ReturnList :queren=queren @newarr="formInline"></ReturnList>
    </div>

  </el-card>

</template>
<script lang="ts">
  import { reactive, defineComponent, ref } from "vue";
  import GoodsList from "@/components/SearchView/GoodsList.vue";
  import BrandMan from "@/components/SearchView/BrandMan.vue";
  import OrderList from "@/components/SearchView/OrderList.vue";
  import ReturnList from "@/components/SearchView/ReturnList.vue";
  import $http from "@/axios/http";
  export default defineComponent({
    components: { GoodsList, BrandMan, OrderList, ReturnList },
    setup() {
      let queren = ref < number > (0);
      // 确认方法
      const search = () => {
        queren.value = 1;
      }
      // 重置按钮
      const reset = () => {
        queren.value = 3;
      }
      const formInline = (paylody: Object) => {
        queren.value = 0;
        //判断其中数据是否为空，提取不为空的对象(复制的新数组)
        let obj: Object = Object.assign({}, paylody)
        for (let key in obj) {
          if (obj[key as keyof typeof obj].toString() == "") {
            delete obj[key as keyof typeof obj]
          }
        }
        // 判断obj是否为空,不为空,发起ajax请求获取表格搜索数据
        if (Object.keys(obj).length != 0) {
          // $http("/market/advertis").then(data=>console.log(data))
          console.log("这是ajax");
        }
      }
      return { search, reset, queren, formInline }
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