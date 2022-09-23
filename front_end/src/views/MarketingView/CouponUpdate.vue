<template>
  <div>编辑{{ this.$route.query.comm }}</div>
</template>
<script>
export default {
  created() {
    console.log(this.$route.query.comm);
  },
};
</script>
