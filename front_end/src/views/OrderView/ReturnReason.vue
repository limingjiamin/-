<template>
  <el-table
      ref="multipleTableRef"
      :data="tableData"
      size="large"
      stripe="true"
      border
      @selection-change="handleSelectionChange"
  >
    <el-table-column align="center" type="selection" />
    <el-table-column align="center" property="id" label="编号"  />
    <el-table-column align="center" property="reason" label="原因类型" />
    <el-table-column align="center" property="sort" label="排序" />
    <el-table-column align="center" property="status" label="是否可用" />
    <el-table-column align="center" property="add_time" label="添加时间" show-overflow-tooltip />
    <el-table-column align="center" label="操作" >
      <template #default="scope">
        <el-button type="primary" @click="handleEdit(scope.$index, scope.row)"
        >编辑</el-button
        >
        <el-button
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
        >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts" setup>
import axios from 'axios/index'
import { Ref,ref,onBeforeMount} from 'vue'
import { ElTable } from 'element-plus'
interface Order{
  id: number
  reason: string
  add_time: string
  sort: number
  status: string
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
const tableData: Ref<Order[]> = ref([])
//通过组合式api的形式使用api
onBeforeMount(  ()=>{
  axios({
    url:'http://localhost:3000/order/return_reason',
    method:'get',
    params:{
      // 当前页码
      page_num:1,
      // 展示数量
      page_size:10,
    }
  }).then(({data})=>{
    if(data.code===0){
      tableData.value=data.data
    }
  })
})

</script>

<style scoped></style>
