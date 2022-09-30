<template>
  <SearchView></SearchView>
  <br>
  <AddView>
    <template v-slot:name>
      <span >数据列表</span>
    </template>
  </AddView>
  <br>
  <el-table
    ref="multipleTableRef"
    :data="tableData"
    stripe="true"
    border
    @selection-change="handleSelectionChange"
  >
    <el-table-column align="center" type="selection" />
    <el-table-column align="center" property="id" label="编号" width="65" />
    <el-table-column
      align="center"
      property="order_num"
      label="订单编号"
      width="150"
    />
    <el-table-column align="center" property="commite_time" label="提交时间"  width="180"/>
    <el-table-column align="center" property="account" label="用户账号" />
    <el-table-column align="center" property="price" label="订单金额" />
    <el-table-column align="center" property="way" label="支付方式" />
    <el-table-column align="center" property="source" label="订单来源" />
    <el-table-column
      align="center"
      property="status"
      label="订单状态"
      show-overflow-tooltip
    />
    <el-table-column align="center" label="操作" width="250">
      <template #default="scope">
        <el-button @click="handleEdit(scope.row)"
          >查看订单</el-button
        >
        <el-button
          v-if="scope.row.status === '已关闭'"
          @click="handleDelete(scope.row, true)"
          type="danger"
          plain
          >删除订单</el-button
        >
        <el-button
          v-else-if="scope.row.status === '待发货'"
          type="primary"
          @click="handleDeliver(scope.row)"
          plain
          >订单发货</el-button
        >
        <el-button
          v-else-if="scope.row.status === '已完成'"
          type="success"
          @click="orderTrackingDialog = true"
          plain
          >订单跟踪</el-button
        >
        <el-button
          v-else-if="scope.row.status === '已发货'"
          type="success"
          @click="orderTrackingDialog = true"
          plain
          >订单跟踪</el-button
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
        <el-button @click="centerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmDialog(false)">确认</el-button>
      </span>
    </template>
  </el-dialog>

  <!--订单跟踪-->
  <el-dialog title="订单跟踪" v-model="orderTrackingDialog" width="40%">
    <el-steps :active="4" finish-status="success" direction="vertical">
      <el-step title="订单已提交，等待付款" description="2022-04-01 12:00:00" />
      <el-step title="订单付款成功" description="2022-04-01 12:00:00" />
      <el-step
        title="在北京市进行下级地点扫描，等待付款"
        description="2022-04-01 12:00:00"
      />
      <el-step
        title="在分拨中心广东深圳公司进行卸车扫描"
        description="2022-04-01 12:00:00"
      />
      <el-step
        title="在广东深圳公司进行发出扫描"
        description="2022-04-01 12:00:00"
      />
      <el-step
        title="到达目的地网点广东深圳公司，快件很快进行派送"
        description="2022-04-01 12:00:00"
      />
      <el-step
        title="订单已签收，期待再次为您服务"
        description="2022-04-01 12:00:00"
      />
    </el-steps>
  </el-dialog>
</template>

<script lang="ts" setup>
import axios from "axios/index";
import { Ref, ref, onBeforeMount } from "vue";
import { ElMessage, ElTable } from "element-plus";
import AddView from '@/components/AddView.vue'
import PagingView from "@/components/PagingView.vue";
import BatchView from "@/components/BatchView.vue";
import SearchView from "@/components/SearchView.vue";
import {useRouter} from "vue-router";
const router=useRouter()
interface Order {
  id: number;
  order_num: string;
  commite_time: string;
  price: number;
  way: string;
  source: string;
  type: string;
  status: string;
  delivery: string;
  logistics: string;
  growth_value: number;
  currency: number;
  freight: number;
  remarks: string;
  consumer_id: string;
  goods_id: number;
  c_id: string;
  account: string;
  password: string;
  phone: string;
  postal_code: string;
  address: string;
  name: string;
  integral: number;
}

// 全选的实现
const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<Order[]>([]);
const handleSelectionChange = (val: Order[]) => {
  multipleSelection.value = val;
};
const tableData: Ref<Order[]> = ref([]);

// 删除的对话框
let centerDialogVisible = ref(false);
// 订单跟踪的对话框
let orderTrackingDialog = ref(false);

// 请求渲染表格方法
const renderTable = () => {
  axios({
    url: "http://localhost:3000/order/order_list",
    method: "get",
    params: {
      // 当前页码
      page_num: 1,
      // 展示数量
      page_size: 50,
    },
  }).then(({ data }) => {
    if (data.code === 0) {
      data.data.forEach((item: Order) => {
        item.commite_time=item.commite_time.slice(0,-5).replace('T',' ')
      });
      tableData.value = data.data;
    }
  });
};
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
const handleDelete = (row: Order, flag: boolean) => {
  centerDialogVisible.value = flag;
  delete_item = row;
};
// 删除功能的实现
const confirmDialog = (flag: boolean) => {
  centerDialogVisible.value = flag;
  axios({
    url: "http://localhost:3000/order/order_delete",
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

//通过组合式api的形式使用api,初始化渲染表格
onBeforeMount(() => {
  renderTable();
});

// 查看订单
const handleEdit = ( row: Order) => {
  router.push({
    name:'order-detail',
    path:'order-detail',
    query:{
      id:row.id
    }
  });
};
const handleDeliver=(row:Order)=>{
  router.push({
    name:'deliver-goods',
    path:'deliver-goods',
    query:{
      id:row.id,
      num:row.order_num,
      name:row.name,
      phone:row.phone,
      postal_code:row.postal_code,
      address:row.address
    }
  })
}
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
.buttom-part {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
