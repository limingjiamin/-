<template>
  <div>
    <el-select v-model="value" clearable placeholder="批量操作">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <el-button type="primary" class="positions" @click="bacth">确定</el-button>

    <el-dialog v-model="dialog" title="提示" width="30%" align="left">
      <div class="wei">
        <el-avatar src="http://icon.chrafz.com/uploads/151023/1-151023213T2X7.png" />
        <span style="margin-left: 5%; font-size: 18px">是否要删除这些数据</span>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialog = false">取消</el-button>
          <el-button type="primary" @click="que">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script>
  import $http from "@/axios/index.js";
  export default {
    created() {
      this.$store.state.batch.change_num=0;
      this.$store.state.batch.change_ajax="";
      // 1.获取当前的路由地址
      let route = this.$route.name;
      // 2.将路由地址当做参数发起请求
      // 3.获取到数据赋值给this.oiptions
      $http("/batch", { addrss: route }, "POST").then(
        ({ data }) => { this.options = data }
      );
    },
    data() {
      return {
        options: [
        ],
        value: "",
        dialog: false,
      };
    },
    methods: {
      bacth() {
        // 1.获取当前表格的选择情况
        if (this.$store.state.batch.change_num != 0) {
          // 2.获取当前选择器的lebel(this.value)
          // 3.将这个lebel暴露给表格
          if (this.value != "") {
            this.dialog=true;
          }
        }
      },
      que(){
        this.dialog=false;
        let a={address:this.$route.name,type:"POST"};
        switch (this.value){
          case "批量删除": a.path="/batch_delete"; break;
          case "商品上架": a.path="/batch_shop_shangjia"; break;
          case "商品下架": a.path="/batch_shop_xiajia"; break;
          case "设为推荐": a.path="/batch_recomm"; break;
          case "取消推荐": a.path="/batch_recomm-no"; break;
          case "设为新品": a.path="/batch_new"; break;
          case "取消新品": a.path="/batch_new-no"; break;
          case "转移到分类": a.path="/batch_class"; break;
          case "移入回收站": a.path="/batch_recovery"; break;
          case "显示品牌": a.path="/batch_brand"; break;
          case "隐藏品牌": a.path="/batch_brand-no"; break;
          case "批量发货": a.path="/batch_consignment"; break;
          case "关闭订单": a.path="/batch_order-no"; break;
          case "删除订单": a.path="/batch_order-del"; break;
        }
        this.$store.state.batch.change_ajax = a;
        this.value="";
      }
    },
  };
</script>
<style scoped>
  .positions {
    margin-left: 1rem;
  }

  .wei {
    display: flex;
    align-items: center;
  }
</style>