<template>
  <span>{{tableData}}</span>
  <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
  >
    <el-table-column type="selection" />
    <el-table-column property="id" label="编号" width="80" />
    <el-table-column property="order_num" label="订单编号" />
    <el-table-column property="commite_time" label="提交时间" />
    <el-table-column property="account" label="用户账号" />
    <el-table-column property="price" label="订单金额" />
    <el-table-column property="way" label="支付方式" />
    <el-table-column property="source" label="订单来源" />
    <el-table-column property="status" label="订单状态" show-overflow-tooltip />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
        >Edit</el-button
        >
        <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
        >Delete</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import axios from 'axios/index'
import { ref,onMounted ,onBeforeMount} from 'vue'
import { ElTable } from 'element-plus'
interface Order{
  id: number,
  order_num: string,
  commite_time: string,
  price: number,
  way: string,
  source: string,
  type: string,
  status: string,
  delivery: string,
  logistics: string,
  growth_value: number,
  currency: number,
  freight: number,
  remarks: string,
  consumer_id: string,
  goods_id: number,
  c_id: string,
  account: string,
  password: string,
  phone: string,
  postal_code: string,
  address: string,
  name: string,
  integral: number

}
const handleEdit = (index: number, row: Order) => {
  console.log(index, row)
}
const handleDelete = (index: number, row: Order) => {
  console.log(index, row)
}
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Order[]>([])
const handleSelectionChange = (val: Order[]) => {
  multipleSelection.value = val
}
// let tableData: Order[]=[{
//   "id": 1,
//   "order_num": "20222380951031",
//   "commite_time": "2022-08-27T00:11:16.000Z",
//   "price": 231.75,
//   "way": "未支付",
//   "source": "APP订单",
//   "type": "秒杀订单",
//   "status": "已关闭",
//   "delivery": "暂无",
//   "logistics": "暂无",
//   "growth_value": 185,
//   "currency": 305,
//   "freight": 14.9,
//   "remarks": "红色",
//   "consumer_id": "8",
//   "goods_id": 4,
//   "c_id": "8",
//   "account": "wrRklJ",
//   "password": "NUdvnT",
//   "phone": "2081944374",
//   "postal_code": "650792",
//   "address": "中国广州市白云区小坪东路835号8栋",
//   "name": "方璐",
//   "integral": 463
// }]
//通过组合式api的形式使用api
onMounted(  ()=>{
  axios({
    url:'http://localhost:3000/order/order_list',
    method:'get',
    params:{
      // 当前页码
      page_num:1,
      // 展示数量
      page_size:10,
    }
  }).then(({data})=>{
    if(data.code===0){
      // let tableData=data.data
      let tableData: Order[]=data.data
      console.log(data.data)
      console.log("----------------------")
      console.log(tableData)
    }
  })
})

</script>

<style scoped></style>
