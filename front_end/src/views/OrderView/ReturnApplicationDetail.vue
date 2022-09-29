<template>
  <el-card shadow="never">
    <h3>服务单信息</h3>
    <table>
      <tr>
        <th>服务单号</th>
        <td>{{ orderDetails.id }}</td>
      </tr>
      <tr>
        <th>申请状态</th>
        <td>{{ orderDetails.status }}</td>
      </tr>
      <tr>
        <th>订单编号</th>
        <td>{{ orderDetails.order_num }}</td>
      </tr>
      <tr>
        <th>申请时间</th>
        <td>{{ orderDetails.application_time}}</td>
      </tr>
      <tr>
        <th>用户账号</th>
        <td>{{ orderDetails.account }}</td>
      </tr>
      <tr>
        <th>退货备注</th>
        <td>{{ orderDetails.remarks }}</td>
      </tr>
    </table>
    <br>
    <table>
      <tr>
        <th>定价金额</th>
        <td>{{ orderDetails.price }}</td>
      </tr>
      <tr>
        <th>收货人姓名</th>
        <td>{{ orderDetails.name }}</td>
      </tr>
      <tr>
        <th>详细地址</th>
        <td>{{ orderDetails.address }}</td>
      </tr>
      <tr>
        <th>联系电话</th>
        <td>{{ orderDetails.phone }}</td>
      </tr>
    </table>
  </el-card>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import $http from "@/axios/http"
import {onBeforeMount, ref, Ref} from "vue";

const route = useRoute()

interface Details {
  account: string
  address: string
  application_time: string
  id: number
  name: string
  order_num: string
  phone: string
  price: number
  processing_time: string
  remarks: string
  status: string
}

const orderDetails: Ref<Details[]> = ref([]);
onBeforeMount(() => {
  $http('/order/return_application_details', {id: route.query.id}).then(({data}) => {
    orderDetails.value = data[0]
  })
})
</script>

<style scoped>
.el-card {
  width: 80%;
  margin: 0 auto;
}

table {
  border: 1px solid #dcdfe6;
  color: #303133;
  border-collapse: collapse;
  width: 100%;
}

th {
  background-color: #f2f6fc;
  border: 1px solid #dcdfe6;
  padding: 20px;
  width: 40%;
}

td {
  border: 1px solid #dcdfe6;
  padding: 20px;
  width: 60%;
}
</style>
