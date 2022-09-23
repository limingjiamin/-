<template>
  <el-switch v-model="value1" />
</template>

<script lang="ts" setup>
import * as echarts from 'echarts/core'
import { ref } from "vue";

const value1 = ref(true);
</script>
