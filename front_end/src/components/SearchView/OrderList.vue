<template>
    <el-form :model="formInline" class="demo-form-inline box">
      <div>
        <el-form-item label="输入搜索">
          <el-input v-model="formInline.order_num" placeholder="订单编号" style="width: 61.5%;"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label=" 收 货 人">
          <el-input v-model="formInline.account" placeholder="收货人姓名/手机号码" style="width: 61.5%;"></el-input>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="提交时间">
            <el-date-picker v-model="formInline.commite_time" type="date" placeholder="请选择时间"/>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="订单状态">
          <el-select v-model="formInline.status" placeholder="全部">
            <el-option label="待付款" value="待付款" />
            <el-option label="待发货" value="待发货" />
            <el-option label="已发货" value="已发货" />
            <el-option label="已完成" value="已完成" />
            <el-option label="已关闭" value="已关闭" />
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="订单分类">
          <el-select v-model="formInline.type" placeholder="全部">
            <el-option label="正常订单" value="正常订单" />
            <el-option label="秒杀订单" value="秒杀订单" />
          </el-select>
        </el-form-item>
      </div>
      <div>
        <el-form-item label="订单来源">
          <el-select v-model="formInline.way" placeholder="全部">
            <el-option label="PC订单" value="PC订单" />
            <el-option label="APP订单" value="APP订单" />
          </el-select>
        </el-form-item>
      </div>
    </el-form>
  </template>
  
  <script lang="ts">
    import { defineComponent, reactive, onUpdated } from "vue";
    interface Search {
      order_num: String
      account: String
      commite_time: String
      status: String
      type: String
      way: String
    }
    class FormInline {
      formInline: Search = {
        order_num: "",
        account: "",
        category: "",
        commite_time: "",
        status: "",
        way: "",
      }
    }
    export default defineComponent({
      props: ["queren"],
      setup(props, { emit }) {
        const { formInline } = reactive(new FormInline());
        // 定义自定义事件,当queren改变是发起传值
        const que = () => {
          emit("newarr", formInline)
        }
        const resetForm = () => {
          for (let key in formInline) {
            formInline[key as keyof typeof formInline] = "";
          }
        }
        onUpdated(() => {
          if (props.queren == 1) {
            que();
          }
          if (props.queren == 3) {
            resetForm();
            que();
          }
        })
        return {  formInline, resetForm}
      }
    })
  </script>
  <style scoped>
    .box {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-wrap: wrap;
    }
  
    .box>div {
      width: 33%
    }
  </style>