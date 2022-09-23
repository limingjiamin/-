<template>
  <AddView></AddView>
  <br>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    size="large"
    stripe="true"
    border
    @selection-change="handleSelectionChange"
  >
    <el-table-column align="center" type="selection" />
    <el-table-column align="center" property="id" label="服务单号" />
    <el-table-column align="center" property="order_num" label="订单编号" />
    <el-table-column
      align="center"
      property="application_time"
      label="申请时间"
      width="180"
    />
    <el-table-column align="center" property="account" label="用户账号" />
    <el-table-column align="center" property="price" label="退款金额" />
    <el-table-column align="center" property="status" label="申请状态" />
    <el-table-column
      align="center"
      property="processing_time"
      label="处理时间"
      show-overflow-tooltip
      width="180"
    />
    <el-table-column align="center" label="操作" width="140">
      <template #default="scope">
        <el-button type="primary" @click="handleEdit(scope.$index, scope.row)"
          >查看详情</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="buttom-part">
    <BatchView />
    <PagingView />
  </div>
</template>

<script lang="ts" setup>
import PagingView from "@/components/PagingView.vue";
import BatchView from "@/components/BatchView.vue";
import AddView from '@/components/AddView.vue'
import axios from "axios/index";
import { Ref, ref, onBeforeMount } from "vue";
import { ElTable } from "element-plus";
interface Application {
  id: number;
  application_time: string;
  processing_time: string;
  status: string;
  consumer_id: number;
  order_id: number;
  account: string;
  price: number;
  order_num: string;
}
const handleEdit = (index: number, row: Application) => {
  console.log(index, row);
};
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<Application[]>([]);
const handleSelectionChange = (val: Application[]) => {
  multipleSelection.value = val;
};
const tableData: Ref<Application[]> = ref([]);
//通过组合式api的形式使用api
onBeforeMount(() => {
  axios({
    url: "http://localhost:3000/order/return_application",
    method: "get",
    params: {
      // 当前页码
      page_num: 1,
      // 展示数量
      page_size: 10,
    },
  }).then(({ data }) => {
    if (data.code === 0) {
      data.data.forEach((item: Application) => {
        item.application_time=item.application_time.slice(0,-5).replace('T',' ')
        item.processing_time=item.processing_time.slice(0,-5).replace('T',' ')

      });
      tableData.value = data.data;
    }
  });
});
</script>

<style scoped>
.buttom-part {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
