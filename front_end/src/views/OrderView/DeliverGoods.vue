<template>
<div>发货订单</div>
</template>

<script lang="ts" setup>
import {useRoute} from "vue-router";
import $http from "@/axios/http"
import {onBeforeMount} from "vue";
const route=useRoute()
// onBeforeMount(()=>{
//   $http('/order/order_view',{id:route.query.id}).then((data)=>{
//     console.log(data)})
// })
</script>

<style scoped>

</style>
