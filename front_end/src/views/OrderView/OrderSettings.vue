<template>
  <div class="setting-form">
    <el-form
        ref="orderSetting"
        label-width="150px"
        :model="ruleForm"
        :rules="rules"
        size="large"
    >
      <el-form-item label="秒杀订单超过：" prop="seckill_order" >
        <el-col :span="13">
          <el-input v-model.number="ruleForm.seckill_order">
            <template #append>分</template>
          </el-input>
        </el-col>
        <el-col :span="10" :offset="1">
          <span>未付款，订单自动关闭</span>
        </el-col>
      </el-form-item>
      <el-form-item label="正常订单超过：" prop="normal_order">
        <el-col :span="13">
          <el-input v-model.number="ruleForm.normal_order" >
            <template #append>分</template>
          </el-input>
        </el-col>
        <el-col :span="10" :offset="1">
          <span>未付款，订单自动关闭</span>
        </el-col>
      </el-form-item>
      <el-form-item label="发货超过：" prop="delivery_time">
        <el-col :span="13">
          <el-input v-model.number="ruleForm.delivery_time" >
            <template #append>天</template>
          </el-input>
        </el-col>
        <el-col :span="10" :offset="1">
          <span>未收货，订单自动提交</span>
        </el-col>
      </el-form-item>
      <el-form-item label="订单完成超过：" prop="close_transaction">
        <el-col :span="13">
          <el-input v-model.number="ruleForm.close_transaction" >
            <template #append>天</template>
          </el-input>
        </el-col>
        <el-col :span="10" :offset="1">
          <span>自动结束交易，不能申请售后</span>
        </el-col>
      </el-form-item>
      <el-form-item label="订单完成超过：" prop="praise">
        <el-col :span="13">
          <el-input v-model.number="ruleForm.praise" >
            <template #append>天</template>
          </el-input>
        </el-col>
        <el-col :span="10" :offset="1">
          <span>自动五星好评</span>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(orderSetting)">提交</el-button>
        <el-button @click="resetForm(orderSetting)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import axios from "axios/index";
import { ElMessage } from 'element-plus'
const orderSetting = ref<FormInstance>()
const ruleForm = reactive({
  id: 1,
  seckill_order: '',
  normal_order: '',
  delivery_time: '',
  close_transaction: '',
  praise: ''
})
const rules = reactive<FormRules>({
  seckill_order: [
    {required: true,type: 'number', min: 1, max: 1440, message: '请填入正确的时间', trigger: 'change'}
  ],
  normal_order: [
    {required: true,type: 'number', min: 1, max: 1440, message: '请填入正确的时间', trigger: 'change'}
  ],
  delivery_time: [
    {required: true,type: 'number', min: 1, max: 30, message: '请填入正确的时间', trigger: 'change'}
  ],
  close_transaction: [
    {required: true,type: 'number', min: 1, max: 14, message: '请填入正确的时间', trigger: 'change'}
  ],
  praise: [
    {required: true,type: 'number', min: 1, max: 14, message: '请填入正确的时间', trigger: 'change'}
  ]
})

const tips_success = () => {
  ElMessage({
    message: '设置修改成功！',
    type: 'success',
  })
}
const tips_error = () => {
  ElMessage.error('设置修改失败！')
}
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      axios({
        url:'http://localhost:3000/order/order_setting',
        method:'post',
         data:{
          seckill_order:ruleForm.seckill_order,
          normal_order: ruleForm.normal_order,
          delivery_time: ruleForm.delivery_time,
          close_transaction: ruleForm.close_transaction,
          praise: ruleForm.praise,
        }
      }).then(({data})=>{
       if(data.code===0){
         tips_success()
         formEl.resetFields()
       }else{
         tips_error()
       }
      })
    } else {
      console.log('error submit!')
      return false
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>
<style scoped>
.setting-form {
  width: 600px;
  margin: 15px auto;
  padding: 60px;
  border: 1px solid #e6e6e6;
}

span {
  color: #606266;
}
</style>
