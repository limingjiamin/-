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
    <el-table-column align="center" property="status" label="是否可用">
      <template #default="scope">
        <el-switch v-model="scope.row.status" />
      </template>
    </el-table-column>
    <el-table-column align="center" property="add_time" label="添加时间" show-overflow-tooltip />
    <el-table-column align="center" label="操作" >
      <template #default="scope">
        <el-button type="primary" @click="handleEdit(scope.row,true)"
        >编辑</el-button
        >
        <el-button
            type="danger"
            @click="handleDelete(scope.row,true)"
        >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="buttom-part">
    <BatchView/>
    <PagingView/>
  </div>

  <!--  删除信息的对话框提示-->
  <el-dialog
      v-model="centerDialogVisible"
      title="删除提示"
      width="30%"
      center>
    <el-icon color="#E6A23C" size="18px"><WarningFilled /></el-icon>
    <span>确定要删除这条订单信息吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="centerDialogVisible=false">取消</el-button>
        <el-button type="primary" @click="confirmDialog(false)"
        >确认</el-button
        >
      </span>
    </template>
  </el-dialog>
<!--  编辑信息的对话框-->
  <el-dialog
      v-model="editDialog"
      title="编辑退货原因"
      width="30%"
      center>
<!--编辑的表单-->
    <el-form
        ref="editItem"
        label-position="Right"
        label-width="auto"
        :model="editForm"
    >
      <el-form-item label="原因类型：">
        <el-input v-model="editForm.reason"/>
      </el-form-item>
      <el-form-item label="排序：">
        <el-input  v-model="editForm.sort"/>
      </el-form-item>
      <el-form-item label="是否启用：">
         <el-switch v-model="editForm.status"/>
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmEdit(false)"
        >确认</el-button>
         <el-button @click="editDialog = false">取消</el-button>
      </span>
    </template>

  </el-dialog>
</template>

<script lang="ts" setup>
import PagingView from  '@/components/PagingView.vue'
import BatchView from '@/components/BatchView.vue'
import axios from 'axios/index'
import {Ref, ref, onBeforeMount, reactive} from 'vue'
import {ElMessage, ElTable, FormInstance} from 'element-plus'
interface Order{
  id: number
  reason: string
  add_time: string
  sort: number
  status: boolean
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const multipleSelection = ref<Order[]>([])
const handleSelectionChange = (val: Order[]) => {
  multipleSelection.value = val
}

const tableData: Ref<Order[]> = ref([])

// 请求渲染表格方法
const renderTable=()=>{
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
      // 处理表格数据
      data.data.forEach((item:Order)=>{
        item.status=Boolean(Number(item.status))
      })
      tableData.value=data.data
    }
  })
}

//通过组合式api的形式使用api
onBeforeMount(()=>{
  renderTable()
})


// 消息提示
const tips_success = () => {
  ElMessage({
    message: '操作成功！',
    type: 'success',
  })
}
const tips_error = () => {
  ElMessage.error('操作失败！')
}
// 删除信息的id中转变量存放proxy
let delete_item:Order
// 删除的对话框
let centerDialogVisible =ref(false)
// 传递行参数
const handleDelete = ( row: Order,flag:boolean) => {
  centerDialogVisible.value=flag
  delete_item=row
}
// 删除功能的实现
const confirmDialog=(flag:boolean)=>{
  centerDialogVisible.value=flag
  axios({
    url:'http://localhost:3000/order/return_reason_delete',
    method:'get',
    params:{
      id:delete_item.id
    }
  }).then(({data})=>{
    if(data.code===0){
      tips_success()
      // 重新渲染列表
      renderTable()
    }else{
      tips_error()
    }
  })
}


// 编辑的表格
const editItem=ref<FormInstance>()
let editForm=reactive({
  id: "",
  reason: "",
  add_time: "",
  sort: "",
  status: "",
})

// 编辑的逻辑
let editDialog=ref(false)
let edit_item:Order
const handleEdit = (row: Order,flag:boolean) => {
  editDialog.value=flag

  console.log("2222222222222222222222",edit_item)

}



const confirmEdit=(flag:boolean)=>{
  editDialog.value=flag
  // axios({
  //   url:'http://localhost:3000/order/return_reason_edit',
  //   method:'post',
  //   data:{
  //     id :edit_item.id,
  //     reason:edit_item.reason,
  //     sort :edit_item.sort,
  //     status:edit_item.status,
  //   }
  // }).then(({data})=>{
  //   console.log(data)
  // })
}


</script>

<style scoped>
.buttom-part{
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
