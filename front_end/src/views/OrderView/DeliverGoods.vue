<template>
  <AddView>
    <template v-slot:name>
      <span>发货列表</span>
    </template>
  </AddView>
  <br>
  <el-table border="true" :data="tableData">
    <el-table-column align="center" property="num" label="订单编号"/>
    <el-table-column align="center" property="name" label="发货人"/>
    <el-table-column align="center" property="phone" label="手机号码"/>
    <el-table-column align="center" property="postal_code" label="邮政编码"/>
    <el-table-column align="center" property="address" label="收货地址"/>
    <el-table-column align="center" property="delivery" label="配送方式">
      <template #default="scope">
        <el-select v-model="delivery" placeholder="请选择物流">
          <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value"
          />
        </el-select>
      </template>
    </el-table-column>
    <el-table-column align="center" property="logistics " label="物流单号" width="200">
      <template #default="scope">
        <el-input v-model="logistics" placeholder="请选输入物流单号"/>
      </template>
    </el-table-column>
  </el-table>
  <br>
  <el-row style="display: inline-flex; justify-content: center;align-items: center; width: 100%;">
    <el-button type="primary" @click="submitForm" size="large">确定</el-button>
    <el-button @click="resetForm" size="large">取消</el-button>
  </el-row>
</template>

<script lang="ts" setup>
import {useRoute ,useRouter} from "vue-router";
import AddView from "@/components/AddView.vue"
import {ref} from "vue";
import axios from "axios/index";
import {ElMessage} from "element-plus";

const route = useRoute()
const router=useRouter()
let tableData = [{
  num: route.query.num,
  name: route.query.name,
  phone: route.query.phone,
  postal_code: route.query.postal_code,
  address: route.query.address
}]
const delivery = ref('')
const logistics = ref('')
const options = [
  {
    value: '圆通',
    label: '圆通',
  },
  {
    value: '顺丰',
    label: '顺丰',
  },
  {
    value: '韵达',
    label: '韵达',
  },
  {
    value: '中通',
    label: '中通',
  },
]

const submitForm = () => {
  if(delivery.value == ''||logistics.value == ''){
    tips_error()
  }else{
    axios({
      url: 'http://localhost:3000/order/deliver_goods_edit',
      method: 'post',
      data: {
        id: route.query.id,
        delivery: delivery.value,
        logistics: logistics.value
      }
    }).then((data) => {
      tips_success()
      setTimeout(()=>{
        router.go(-1)
      },1000)
    })
  }
}
const resetForm = () => {
  if(delivery.value == ''||logistics.value == ''){
    tips_error()
  }else{
  delivery.value = '';
  logistics.value = '';
  tips_success();
  }
}
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
</script>

<style scoped>

</style>
