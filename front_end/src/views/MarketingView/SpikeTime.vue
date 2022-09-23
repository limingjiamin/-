<template>
  <div class="common-layout">
    <el-container>
      <el-header class="yanse">用来存放{{ page }}和数据列表</el-header>
      <el-main>
        <el-table
          :data="tableData"
          border
          style="width: 100%"
          :row-style="asd"
          :header-row-style="asd"
        >
          <el-table-column prop="num" label="编号" align="center" width="180" />
          <el-table-column
            prop="titie"
            label="秒杀时间段名称"
            align="center"
            width="200"
          />
          <el-table-column
            prop="s_time"
            label="每日开始时间"
            align="center"
            width="240"
          />
          <el-table-column
            prop="e_time"
            label="每日结束时间"
            align="center"
            width="240"
          />
          <el-table-column
            prop="counts"
            label="商品数量"
            align="center"
            width="180"
          />
          <el-table-column label="操作" align="center" width="250">
            <template #default="scope">
              <el-button
                size="large"
                type="primary"
                plain
                @click="meg(scope.row)"
                >商品列表</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import $http from "@/axios/index";
export default {
  name: "SpikeTime",
  created() {
    this.http({ id: this.id });
  },
  data() {
    return {
      id: this.$route.query.id,
      tableData: [],
      asd: {
        height: 60 + "px",
        fontSize: 16 + "px",
      },
    };
  },
  methods: {
    http(param) {
      $http("/market/seckill_time", param).then((data) => {
        if (data.code != 400) {
          this.tableData = data.data;
        }
      });
    },
    meg(value) {
      console.log(this.$router);
      this.$router.push({
        path: "spike-comm",
        query: {
          seckill_id: this.id,
          time_id: value.id,
          count: value.counts,
        },
      });
    },
  },
};
</script>

<style scoped>
.yanse {
  background: rgb(0, 229, 255);
}
</style>
