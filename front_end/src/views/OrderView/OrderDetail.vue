<template>
  <div class="order-detail">
    <el-steps :active="1">
      <el-step title="订单提交" description="" />
      <el-step title="支付订单" description="" />
      <el-step title="平台发货" description="" />
      <el-step title="确认收货" description="" />
      <el-step title="完成评价" description="" />
    </el-steps>
    <el-card shadow="never">
      <el-row>
        <el-icon><Flag /></el-icon>
        <el-icon><Management /></el-icon>基本信息
      </el-row>
      <el-table>
        a
      </el-table>
      <el-row>
        <el-icon><Management /></el-icon>收货人信息
      </el-row>
      <el-row>
        <el-icon><Management /></el-icon>商品信息
      </el-row>
    </el-card>
  </div>

</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import $http from "@/axios/http"
import {onBeforeMount, ref, Ref} from "vue";

const route = useRoute()

interface Details{
  account: string
  address: string
  c_id:string
  commite_time: string
  consumer_id: string
  coupon_id: number
  currency: number
  delivery: string
  freight: number
  goods_id: number
  growth_value: number
  id: number
  integral: number
  logistics: string
  name: string
  order_num: string
  password: string
  phone: string
  postal_code: string
  price: number
  remarks: string
  source: string
  status: string
  type: string
  way?: string//可变参数
}
const orderDetails: Ref<Details[]> = ref([]);
onBeforeMount(() => {
  $http('/order/order_view', {id: route.query.id}).then(({data}) => {
    orderDetails.value=data[0]
  })
})
</script>

<style scoped>
.order-detail {
  width: 80%;
  margin: 0 auto;
  background-color: #13ce66;
}
.el-steps{
  width: 90%;
  margin:0 auto;
  font-size: 26px;
}
</style>
