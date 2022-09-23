<template>
  <div>
    <el-select v-model="value" clearable placeholder="批量操作">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-button type="primary" class="positions" @click="bacth">确定</el-button>

    <el-dialog v-model="dialog" title="提示" width="30%" align="left">
      <div class="wei">
        <el-avatar
          src="http://icon.chrafz.com/uploads/151023/1-151023213T2X7.png"
        />
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
    this.$store.state.batch.change_num = "";
    this.$store.state.batch.change_ajax = false;
    // 1.获取当前的路由地址
    let route = this.$route.name;
    // 2.将路由地址当做参数发起请求
    // 3.获取到数据赋值给this.oiptions
    $http("/batch", { addrss: route }, "POST").then(({ data }) => {
      this.options = data;
    });
  },
  data() {
    return {
      options: [],
      value: "",
      dialog: false,
    };
  },
  methods: {
    bacth() {
      // 1.获取当前表格的选择情况
      if (this.$store.state.batch.change_num != "") {
        // 2.获取当前选择器的lebel(this.value)
        if (this.value != "") {
          this.dialog = true;
        }
      }
    },
    que() {
      this.dialog = false;
      let path = "",
        id = [];
      for (let key in this.$store.state.batch.change_num) {
        id.push(this.$store.state.batch.change_num[key]);
      }
      // 根据路由发起请求获取表格和主键
      $http("/route", { address: this.$route.name }, "POST").then((data) => {
        if (data.code != 400) {
          let param = {
            table: data.data[0].table_name, //表格
            pri: data.data[0].column_name, //主键
            id: `[${id}]`, //数据源
            field: "", //字段名
            value: "", //值
          };
          switch (this.value) {
            case "批量删除":
              path = "/batch_delete";
              break;
            case "商品上架":
              path = "/batch_update";
              param.field = "putaway";
              param.value = "1";
              break;
            case "商品下架":
              path = "/batch_update";
              param.field = "putaway";
              param.value = "0";
              break;
            case "设为推荐":
              path = "/batch_update";
              param.field = "recommend";
              param.value = "1";
              break;
            case "取消推荐":
              path = "/batch_update";
              param.field = "recommend";
              param.value = "0";
              break;
            case "设为新品":
              path = "/batch_update";
              param.field = "is_new";
              param.value = "1";
              break;
            case "取消新品":
              path = "/batch_update";
              param.field = "is_new";
              param.value = "0";
              break;
            case "显示品牌":
              path = "/batch_update";
              param.field = "is_show";
              param.value = "1";
              break;
            case "隐藏品牌":
              path = "/batch_update";
              param.field = "is_show";
              param.value = "0";
              break;
            case "批量发货":
              path = "/batch_update";
              param.field = "status";
              param.value = "已发货";
              break;
            case "关闭订单":
              path = "/batch_update";
              param.field = "status";
              param.value = "已关闭";
              break;
            case "删除订单":
              path = "/batch_delete";
              break;
          }
          $http(path, param, "POST").then((data) => {
            if (data.code != 400) {
              if (data.type == "del") {
                this.$store.state.page.page_count -=
                  this.$store.state.batch.change_num.length;
              }
              // 告诉表格可以刷新页面了
              this.$store.state.batch.change_ajax = true;
            }
          });
          //选择框恢复初始状态
          this.value = "";
        }
      });
    },
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
