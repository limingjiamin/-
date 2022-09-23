<template>
  <AddView>
    <el-button type="primary" @click="handleAdd(true)">添加</el-button>
  </AddView>
  <br>
<!--  表格-->
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    size="large"
    stripe="true"
    border
    @selection-change="handleSelectionChange"
  >
    <el-table-column align="center" type="selection" />
    <el-table-column align="center" property="id" label="编号" />
    <el-table-column align="center" property="reason" label="原因类型" />
    <el-table-column align="center" property="sort" label="排序" />
    <el-table-column align="center" property="status" label="是否可用">
      <template #default="scope">
        <el-switch v-model="scope.row.status" />
      </template>
    </el-table-column>
    <el-table-column
      align="center"
      property="add_time"
      label="添加时间"
      show-overflow-tooltip
    />
    <el-table-column align="center" label="操作">
      <template #default="scope">
        <el-button type="primary" @click="handleEdit(scope.row, true)"
          >编辑</el-button
        >
        <el-button type="danger" @click="handleDelete(scope.row, true)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <div class="buttom-part">
    <BatchView />
    <PagingView />
  </div>
  <!--  删除信息的对话框提示-->
  <el-dialog v-model="centerDialogVisible" title="删除提示" width="30%" center>
    <el-icon color="#E6A23C" size="18px"><WarningFilled /></el-icon>
    <span>确定要删除这条订单信息吗？</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmDialog(false)">确认</el-button>
        <el-button @click="centerDialogVisible = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
  <!--  编辑信息的对话框-->
  <el-dialog
      v-model="editDialog"
      :title="dialog_title"
      width="30%"
      @close="closeDialog(editItem)"
      center>
    <!--编辑的表单-->
    <el-form
      ref="editItem"
      label-position="Right"
      label-width="auto"
      :model="editForm"
    >
      <el-form-item label="原因类型：">
        <el-input v-model="editForm.reason" />
      </el-form-item>
      <el-form-item label="排序：">
        <el-input v-model="editForm.sort" />
      </el-form-item>
      <el-form-item label="是否启用：">
        <el-switch v-model="editForm.status" />
      </el-form-item>
    </el-form>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="confirmForm(false)">确认</el-button>
        <el-button @click="editDialog = false">取消</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import PagingView from "@/components/PagingView.vue";
import BatchView from "@/components/BatchView.vue";
import AddView from "@/components/AddView.vue"
import * as moment from 'moment'
import axios from "axios/index";
import { Ref, ref, onBeforeMount, reactive } from "vue";
import { ElMessage, ElTable, FormInstance } from "element-plus";
interface Order {
  id: number;
  reason: string;
  add_time: string;
  sort: number;
  status: boolean;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<Order[]>([]);
const handleSelectionChange = (val: Order[]) => {
  multipleSelection.value = val;
};

const tableData: Ref<Order[]> = ref([]);

// 请求渲染表格方法
const renderTable = () => {
  axios({
    url: "http://localhost:3000/order/return_reason",
    method: "get",
    params: {
      // 当前页码
      page_num: 1,
      // 展示数量
      page_size: 10,
    },
  }).then(({ data }) => {
    if (data.code === 0) {
      // 处理表格数据
      data.data.forEach((item: Order) => {
        item.status = Boolean(Number(item.status));
        item.add_time=item.add_time.slice(0,-5).replace('T',' ')
      });
      tableData.value = data.data;
    }
  });
};

//通过组合式api的形式使用api
onBeforeMount(() => {
  renderTable();
});

// 消息提示
const tips_success = () => {
  ElMessage({
    message: "操作成功！",
    type: "success",
  });
};
const tips_error = () => {
  ElMessage.error("操作失败！");
};
// 删除信息的id中转变量存放proxy
let delete_item: Order;
// 删除的对话框
let centerDialogVisible = ref(false);
// 传递行参数
const handleDelete = (row: Order, flag: boolean) => {
  centerDialogVisible.value = flag;
  delete_item = row;
};
// 删除功能的实现
const confirmDialog = (flag: boolean) => {
  centerDialogVisible.value = flag;
  axios({
    url: "http://localhost:3000/order/return_reason_delete",
    method: "get",
    params: {
      id: delete_item.id,
    },
  }).then(({ data }) => {
    if (data.code === 0) {
      tips_success();
      // 重新渲染列表
      renderTable();
    } else {
      tips_error();
    }
  });
};
// 添加与编辑的标题
let dialog_title=ref('')
// 编辑的表格
const editItem = ref<FormInstance>();
let editForm = reactive({
  id: "",
  reason: "",
  sort: "",
  status: "0",
});

// 编辑的逻辑
let editDialog = ref(false);
const handleEdit = (row: Order, flag: boolean) => {
  editDialog.value = flag;
  editForm.id=String(row.id)
  editForm.reason=row.reason
  editForm.sort=String(row.sort)
  editForm.status=String(row.status)
  dialog_title.value="编辑退货原因"

};

const confirmEdit = (flag: boolean) => {
  editDialog.value = flag;
  axios({
    url:'http://localhost:3000/order/return_reason_edit',
    method:'post',
    data:{
      id :editForm.id,
      reason:editForm.reason,
      sort :editForm.sort,
      status:String(Number(editForm.status)),
    }
  }).then(({data})=>{
    if (data.code === 0) {
      tips_success();
      // 重新渲染列表
      renderTable();
    } else {
      tips_error();
    }
  })
};
// 添加
const handleAdd=(flag:boolean,addForm:Order)=>{
  editDialog.value = flag;
  dialog_title.value="添加退货原因"
}
const confirmAdd = (flag: boolean) => {
  editDialog.value = flag;
  axios({
    url:'http://localhost:3000/order/return_reason_add',
    method:'post',
    data:{
      reason:editForm.reason,
      sort :editForm.sort,
      status:String(Number(editForm.status)),
      add_time:moment().format('YYYY-MM-DD HH:mm:ss')
    }
  }).then(({data})=>{
    if (data.code === 0) {
      tips_success();
      // 重新渲染列表
      renderTable();
      // 清空表单
    } else {
      tips_error();
    }
  })
};
const confirmForm=(flag:boolean)=>{
  if(dialog_title.value==="添加退货原因"){
    confirmAdd(flag)
  }else{
    confirmEdit(flag)
  }
}
// 清空表单
const closeDialog=()=>{
  editForm.id=''
  editForm.sort=''
  editForm.status='0'
  editForm.reason=''
}

</script>

<style scoped>
.buttom-part {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
