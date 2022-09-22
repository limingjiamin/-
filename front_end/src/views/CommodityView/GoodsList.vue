<template>
  <div>
    <form_list #formBtn>
      <el-button>重置</el-button>
      <el-button class="button" type="primary" @click="onSubmit">搜索</el-button>
    </form_list>
    <form_list #form_list>
        <form>
          <input type="text">
        </form>
    </form_list>
     <add>
      <el-button>添加</el-button>
    </add>
  </div>
</template>
<script>
  import { ref } from "vue";
  import add from "../../components/AddView.vue";
  import form_list from "../../components/SearchView.vue"
  export default{
    name: "LayoutView",
    components: {
    add,
    form_list
  },
  }
</script>



