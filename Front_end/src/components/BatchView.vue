<template>
  <div>
    <el-cascader
      :options="options"
      clearable
      placeholder="批量操作"
      v-model="value"
    />
    <el-button type="primary" class="position" @click="bacth">确定</el-button>
  </div>
</template>
<script>
import $http from "@/axios/index.js";
export default {
  created() {
    //发起ajax请求获取option数据
    // 1.获取当前的路由地址
    let route = this.$route;
    // 2.将路由地址当做参数发起请求
    // 3.获取到数据赋值给this.oiptions
    $http("/batch", { addrss: route }, "POST").then(
      ({ data }) => (this.options = data)
    );
  },
  data() {
    return {
      options: [
        {
          value: "consistency",
          label: "sjdncm",
        },
        {
          value: "feedback",
          label: "Feedback",
        },
        {
          value: "2",
          label: "nihao",
        },
        {
          value: "controllability",
          label: "Controllability",
        },
      ],
      value: "",
    };
  },
  methods: {
    //当点击确定是

    // 2.获取当前选择器的lebel
    // 3.将这个lebel暴露给表格
    bacth() {
      // 1.获取当前表格的选择情况（ajax请求获取，表格将表明发给）
      $http("获取表格的地址/do");
      console.log(this.value);
    },
  },
};
</script>
<style scoped>
.position {
  margin-left: 1rem;
}
</style>
