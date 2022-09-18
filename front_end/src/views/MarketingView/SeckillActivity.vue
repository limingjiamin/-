<!--<template>-->
<!--  <div class="common-layout">-->
<!--    <el-container>-->
<!--      <el-header class="yanse">用来存放搜索和数据列表</el-header>-->
<!--      <el-main>-->
<!--        <el-table :data="tableData" border style="width: 100%">-->
<!--          <el-table-column type="selection" align="center" />-->
<!--          <el-table-column prop="num" label="编号" align="center" />-->
<!--          <el-table-column prop="titie" label="活动标题" align="center" />-->
<!--          <el-table-column prop="state" label="活动状态" align="center" />-->
<!--          <el-table-column prop="s_time" label="开始时间" align="center" />-->
<!--          <el-table-column prop="e_time" label="结束时间" align="center" />-->
<!--          &lt;!&ndash;          <el-table-column label="上线/下线" align="center">&ndash;&gt;-->
<!--          &lt;!&ndash;            <template #default="scope">&ndash;&gt;-->
<!--          &lt;!&ndash;              <el-switch&ndash;&gt;-->
<!--          &lt;!&ndash;                v-model="scope.row.upper_line"&ndash;&gt;-->
<!--          &lt;!&ndash;                class="ml-2"&ndash;&gt;-->
<!--          &lt;!&ndash;                @change="meg(scope.row)"&ndash;&gt;-->
<!--          &lt;!&ndash;                style="&ndash;&gt;-->
<!--          &lt;!&ndash;                  &#45;&#45;el-switch-on-color: #13ce66;&ndash;&gt;-->
<!--          &lt;!&ndash;                  &#45;&#45;el-switch-off-color: #ff4949;&ndash;&gt;-->
<!--          &lt;!&ndash;                "&ndash;&gt;-->
<!--          &lt;!&ndash;              />&ndash;&gt;-->
<!--          &lt;!&ndash;            </template>&ndash;&gt;-->
<!--          &lt;!&ndash;          </el-table-column>&ndash;&gt;-->
<!--          &lt;!&ndash;          <el-table-column label="操作" align="center">&ndash;&gt;-->
<!--          &lt;!&ndash;            <template #default="scope">&ndash;&gt;-->
<!--          &lt;!&ndash;              <el-button size="small" plain>设置商品</el-button>&ndash;&gt;-->
<!--          &lt;!&ndash;              <el-button size="small" type="primary" plain>编辑</el-button>&ndash;&gt;-->
<!--          &lt;!&ndash;              <el-button size="small" type="danger" plain>删除</el-button>&ndash;&gt;-->
<!--          &lt;!&ndash;            </template>&ndash;&gt;-->
<!--          &lt;!&ndash;          </el-table-column>&ndash;&gt;-->
<!--        </el-table>-->
<!--      </el-main>-->
<!--      <el-footer class="yanse">分页组件</el-footer>-->
<!--    </el-container>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--import $http from "@/axios/index";-->
<!--export default {-->
<!--  name: "SeckillActivity",-->
<!--  created() {-->
<!--    $http("/market/seckill", {}, "POST").then(({ data }) => {-->
<!--      data.forEach((elem) => {-->
<!--        if (elem.upper_line == "0") {-->
<!--          elem.upper_line = false;-->
<!--        } else {-->
<!--          elem.upper_line = true;-->
<!--        }-->
<!--        elem.s_time = elem.s_time.substring(0, 10);-->
<!--        elem.e_time = elem.e_time.substring(0, 10);-->
<!--      });-->
<!--      this.tableData = data;-->
<!--    });-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      tableData: [],-->
<!--    };-->
<!--  },-->
<!--  methods: {-->
<!--    meg(e) {-->
<!--      console.log(e);-->
<!--    },-->
<!--  },-->
<!--};-->
<!--</script>-->

<!--<style scoped>-->
<!--.yanse {-->
<!--  background: rgb(0, 229, 255);-->
<!--}-->

<!--thead {-->
<!--  color: blue;-->
<!--}-->
<!--</style>-->
