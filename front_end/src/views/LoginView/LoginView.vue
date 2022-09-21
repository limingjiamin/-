<template>
  <div class="box">
    <img src="../../assets/login_center_bg.5307896.png" />
    <el-card class="box-card">
      <template #header>
        <div class="card-header"></div>
      </template>
      <div class="logo">
        <svg
          t="1663574474082"
          class="icon"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="2463"
          width="56"
          height="56"
        >
          <path
            d="M864 617.6c-19.2 0-32 12.8-32 32v195.2c0 9.6-9.6 19.2-19.2 19.2H211.2c-9.6 0-19.2-9.6-19.2-19.2v-195.2c0-19.2-12.8-32-32-32s-32 12.8-32 32v195.2C128 889.6 166.4 928 211.2 928h601.6c44.8 0 83.2-38.4 83.2-83.2v-195.2c0-19.2-12.8-32-32-32zM956.8 316.8l-105.6-204.8c-6.4-9.6-16-16-28.8-16h-640c-12.8 0-25.6 9.6-28.8 22.4l-83.2 208c-6.4 6.4-3.2 22.4-3.2 25.6v80c0 80 67.2 147.2 147.2 147.2H256c48 0 86.4-16 112-44.8 25.6 28.8 70.4 44.8 124.8 44.8h41.6c54.4 0 99.2-16 124.8-44.8 25.6 25.6 64 41.6 112 41.6h41.6c80 0 147.2-67.2 147.2-147.2v-83.2c0-3.2 0-22.4-3.2-28.8zM204.8 160h598.4l67.2 128H150.4l54.4-128z m608 352h-41.6c-19.2 0-83.2-3.2-83.2-64 0-19.2-12.8-32-32-32s-32 12.8-32 32v12.8c0 51.2-76.8 54.4-92.8 54.4h-41.6c-16 0-92.8-3.2-92.8-54.4v-6.4-3.2c0-19.2-12.8-32-32-32s-32 12.8-32 32c0 48-41.6 64-83.2 64H211.2c-44.8 0-83.2-38.4-83.2-83.2V352h768v76.8c0 44.8-35.2 83.2-83.2 83.2z"
            fill="#666666"
            p-id="2464"
          ></path>
        </svg>
      </div>
      <h2>mall-admin-web</h2>
      <div>
        <el-form
          ref="ruleFormRef"
          :model="ruleForm"
          status-icon
          :rules="rules"
          label-width="120px"
          class="demo-ruleForm"
        >
          <el-form-item prop="user">
            <el-input v-model="ruleForm.user" type="text" autocomplete="off" />
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              v-model="ruleForm.pass"
              type="password"
              autocomplete="off"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm(ruleFormRef)"
              >Submit</el-button
            >
            <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from "vue";
import type { FormInstance } from "element-plus";
// import $http from "../../api/axios";
const ruleFormRef = ref<FormInstance>();

//用户名验证
const checkUser = (rule: any, value: any, callback: any) => {
  if (value.trim() === "") {
    callback(new Error("请输入账号"));
  } else {
    callback();
  }
};
//密码验证
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Please input the password"));
  } else {
    if (ruleForm.pass !== "") {
      if (!ruleFormRef.value) return;
      ruleFormRef.value.validateField("checkPass", () => null);
    }
    callback();
  }
};
const ruleForm = reactive({
  user: "",
  pass: "",
});

const rules = reactive({
  user: [{ validator: checkUser, trigger: "blur" }],
  pass: [{ validator: validatePass, trigger: "blur" }],
});
//表单提交
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.validate((valid) => {
    if (valid) {
      //   $http("/login",ruleForm).then( data =>{
      //  if(data.code==200){
      //     console.log("submit!");
      //  }else{
      //  }
      //   })
      // })
    } else {
      console.log("error submit!");
      return false;
    }
  });
};
//表单重置
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped lang="less">
.box {
  img {
    background: rgb(64, 158, 255);
    width: 100%;
    height: auto;
    margin-top: 200px;
  }
}
.box-card {
  width: 480px;
  margin: -340px auto;
  position: relative;
  z-index: 5;
  .card-header {
    padding: none;
    height: 15px;
  }
  .logo {
    text-align: center;
    .icon {
      color: rgb(64, 158, 255);
    }
  }
  h2 {
    margin: 20px;
    text-align: center;
    color: rgb(64, 158, 255);
  }
  .el-button {
    width: 29.7%;
  }
}
.el-input {
  width: 63%;
}
</style>
