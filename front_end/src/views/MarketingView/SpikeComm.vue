<template>
  <div>
    {{ tableData }}
  </div>
</template>
<script>
import $http from "@/axios/index";
export default {
  name: "SpikeComm",
  created() {
    // 根据count 是否发起请求
    // 分页要传
    this.http({
      time_id: this.$route.query.time_id,
      seckill_id: this.$route.query.seckill_id,
    });
  },
  methods: {
    http(param) {
      $http("/market/seckill_shop", param).then((data) => {
        console.log(data);
        if (data.code != 400) {
          this.tableData = data.data;
        }
      });
    },
  },
};
</script>
