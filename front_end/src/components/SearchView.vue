<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>
          <el-icon><Search /></el-icon>
          筛选搜索
        </span>
        <div>
          <!-- 搜索按钮插槽 -->
          <slot name="formBtn"></slot>
        </div>
      </div>
    </template>
    <div class="text item">
      <!-- <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="输入搜索">
          <el-input v-model="formInline.name" placeholder="商品名称"></el-input>
        </el-form-item>
        <el-form-item label="商品货号">
          <el-input v-model="formInline.num" placeholder="商品货号"></el-input>
        </el-form-item>
        <el-form-item label="商品分类">
          <el-cascader
            :options="options"
            v-model="formInline.category"
            :show-all-levels="false"
          />
        </el-form-item>
        <el-form-item label="商品品牌">
          <el-select v-model="formInline.brand" placeholder="商品品牌">
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="上架状态">
          <el-select v-model="formInline.state" placeholder="上架状态">
            <el-option label="未上架" value="0" />
            <el-option label="已上架" value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="审核状态">
          <el-select v-model="formInline.examine" placeholder="审核状态">
            <el-option label="未审核" value="0" />
            <el-option label="已审核" value="1" />
          </el-select>
        </el-form-item>
      </el-form> -->
      <slot name="form_list"></slot>
    </div>
  </el-card>
</template>
<script lang="ts" setup>
import { reactive } from "vue";

const formInline = reactive({
  name: "",
  num: "",
  category: "",
  brand: "",
  state: "",
  examine: "",
});

const onSubmit = () => {
  console.log(formInline);
};
const options = [
  {
    value: "guide",
    label: "Guide",
    children: [
      {
        value: "disciplines",
        label: "Disciplines",
      },
      {
        value: "navigation",
        label: "Navigation",
      },
    ],
  },
  {
    value: "component",
    label: "Component",
    children: [
      {
        value: "basic",
        label: "Basic",
      },
      {
        value: "form",
        label: "Form",
      },
      {
        value: "data",
        label: "Data",
      },
      {
        value: "notice",
        label: "Notice",
      },
      {
        value: "navigation",
        label: "Navigation",
      },
      {
        value: "others",
        label: "Others",
      },
    ],
  },
];
</script>
<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.el-card {
  margin: 20px;
}
.el-form {
  margin-left: 80px;
}
</style>
