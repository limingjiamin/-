<template>
  <div class="order-detail">
    <el-steps :active=changeActive(orderDetails.status)>
      <el-step title="订单提交" description=""/>
      <el-step title="支付订单" description=""/>
      <el-step title="平台发货" description=""/>
      <el-step title="确认收货" description=""/>
      <el-step title="完成评价" description=""/>
    </el-steps>
    <el-row  :class="changeColor(orderDetails.status)" >
      <el-icon>
        <WarningFilled/>
      </el-icon>
      <span>当前订单状态：{{ orderDetails.status }}</span>
    </el-row>
    <el-card shadow="never">
      <el-row style="margin-top: 0">
        <el-icon>
          <Flag/>
        </el-icon>
        <span>基本信息</span>
      </el-row>
      <table>
        <tr>
          <th>订单编号</th>
          <th>发货流水号</th>
          <th>用户账号</th>
          <th>支付方式</th>
          <th>订单来源</th>
          <th>订单类型</th>
        </tr>
        <tr>
          <td>{{ orderDetails.order_num }}</td>
          <td>暂无</td>
          <td>{{ orderDetails.account }}</td>
          <td>{{ orderDetails.way }}</td>
          <td>{{ orderDetails.source }}</td>
          <td>{{ orderDetails.type }}</td>
        </tr>
        <tr>
          <th>配送方式</th>
          <th>物流单号</th>
          <th>自动确认收货时间</th>
          <th>订单可得优比</th>
          <th>订单可得成长值</th>
          <th>活动信息</th>
        </tr>
        <tr>
          <td>{{ orderDetails.delivery }}</td>
          <td>{{ orderDetails.logistics }}</td>
          <td>7</td>
          <td>{{ orderDetails.currency }}</td>
          <td>{{ orderDetails.growth_value }}</td>
          <td>暂无</td>
        </tr>
      </table>
      <el-row>
        <el-icon>
          <Flag/>
        </el-icon>
        <span>收货人信息</span>
      </el-row>
      <table>
        <tr>
          <th>收货人</th>
          <th>手机号码</th>
          <th>邮政编码</th>
          <th>收货地址</th>
        </tr>
        <tr>
          <td>{{ orderDetails.name }}</td>
          <td>{{ orderDetails.phone }}</td>
          <td>{{ orderDetails.postal_code }}</td>
          <td>{{ orderDetails.address }}</td>
        </tr>
      </table>
      <el-row>
        <el-icon>
          <Flag/>
        </el-icon>
        <span>商品信息</span>
      </el-row>
      <el-table border="true" size="large" :data="tableData">
        <el-table-column align="center" prop="img" label="商品图片">
          <template #default="scope">
            <el-image style="width: 100px; height: 100px" :src="scope.row.img" fit="fill"/>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="goodsName" label="商品名称">
          <template #default="scope">
            <p>{{ scope.row.goodsName[0] }}</p>
            <p>{{ scope.row.goodsName[1] }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="price" label="价格/货号">
          <template #default="scope">
            <p>{{ scope.row.price[0] }}</p>
            <p>{{ scope.row.price[1] }}</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="attribute" label="属性"/>
        <el-table-column align="center" prop="number" label="数量"/>
        <el-table-column align="center" prop="total" label="小计"/>
      </el-table>
    </el-card>
  </div>

</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import $http from "@/axios/http"
import {onBeforeMount, ref, Ref} from "vue";

const route = useRoute()

interface Details {
  account: string
  address: string
  c_id: string
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
    orderDetails.value = data[0]
  })
})
const tableData = [
  {
    img: 'https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180607/5ac1bf58Ndefaac16.jpg',
    goodsName: ['华为 HUAWEI P20', '品牌：华为'],
    price: ["价格：￥3788", '货号：6946605'],
    attribute: '颜色:金色;容量:16G;',
    number: 1,
    total: '￥3788',
  },
  {
    img: 'https://macro-oss.oss-cn-shenzhen.aliyuncs.com/mall/images/20180615/5acc5248N6a5f81cd.jpg',
    goodsName: ['Apple iPhone 8 Plus', '品牌：iPhone'],
    price: ["价格：￥5499", '货号：7437799'],
    attribute: '颜色:红色;容量:32G;',
    number: 1,
    total: '￥5499',
  }]
let  changeActive = (status: string) => {
  let active=0
  switch (status) {
    case "已关闭":
      active = 1
      break
    case "待发货":
      active = 2
      break
    case "已发货":
      active = 3
      break
    case "已完成":
      active = 5
      break
  }
  return active
}
let  changeColor=(status: string)=>{
  if(status==="已关闭"){
    return "warring-status"
  }else{
    return "base-status"
  }
}

</script>

<style scoped>
.order-detail {
  width: 85%;
  margin: 0 auto;
  box-sizing: border-box;
}

.el-steps {
  width: 90%;
  margin: 20px auto;
}

.el-row {
  font-size: 18px;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  margin: 30px 0;
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
}

td {
  border: 1px solid #dcdfe6;
  padding: 20px;
  text-align: center;
}

.base-status {
  background-color: #f2f6fc;
  width: 100%;
  margin-bottom: 0;
  padding: 25px;
  color: #67C23A
}
.warring-status{
  background-color: #f2f6fc;
  width: 100%;
  margin-bottom: 0;
  padding: 25px;
  color:#F56C6C
}
</style>
