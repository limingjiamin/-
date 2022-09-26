<template>
  <div class="common-layout">
    <el-container>
      <el-header class="yanse">用来存放{{ page }}和数据列表</el-header>
      <el-main>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column type="selection" align="center" />
          <el-table-column prop="cou_num" label="编号" align="center" width="80" />
          <el-table-column prop="cou_titie" label="优惠卷名称" align="center" width="140" />
          <el-table-column prop="cou_type" label="优惠券类型" align="center" width="110" />
          <el-table-column prop="cou_shop" label="可使用商品" align="center" width="110" />
          <el-table-column prop="cou_thres" label="使用门槛" align="center" width="110" />
          <el-table-column prop="cou_value" label="面值" align="center" width="70" />
          <el-table-column prop="cou_plat" label="适用平台" align="center" width="110" />
          <el-table-column prop="time" label="有效期" align="center" width="200" />
          <el-table-column prop="cou_states" label="状态" align="center" width="80" />
          <el-table-column label="操作" align="center" width="240">
            <template #default="scope">
              <el-button size="small" plain @click="examine(scope.row)">查看</el-button>
              <el-button size="small" type="primary" plain @click="edit(scope.row)">编辑</el-button>
              <el-button size="small" type="danger" plain @click="delect(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog v-model="dialog" title="提示" width="30%" align="left">
          <div class="wei">
            <el-avatar src="http://icon.chrafz.com/uploads/151023/1-151023213T2X7.png" />
            <span style="margin-left: 5%; font-size: 18px">是否要删除该条数据</span>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialog = false">取消</el-button>
              <el-button type="primary" @click="del">确定</el-button>
            </span>
          </template>
        </el-dialog>
      </el-main>
      <el-footer class="pag_wei">
        <pag />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import $http from "@/axios/index";
  import pag from "@/components/PagingView.vue";
  export default {
    name: "CouponList",
    components: { pag },
    created() {
      this.page = this.$store.state.page;
      this.http({});
    },
    data() {
      return {
        page: {},
        tableData: [],
        dialogVisible: false,
        dialog: false,
        dia_from: {},
        del_id: 0,
      };
    },
    methods: {
      http(param) {
        $http("/market/coupon", param).then((data) => {
          data.data.forEach((elem) => {
            if (elem.cou_states == "0") {
              elem.cou_states = "已过期";
            } else {
              elem.cou_states = "未过期";
            }
            elem.cou_thres = "满" + elem.cou_thres + "元可用";
            elem.s_time = elem.s_time.substring(0, 10);
            elem.e_time = elem.e_time.substring(0, 10);
            elem.time = elem.s_time + "至" + elem.e_time;
          });
          this.tableData = data.data;
          this.page.page_count = data.count;
        });
      },
      examine(pay) {
        // 跳转到其他界面
        this.$router.push({
          path: "coupon-history",
          query: {
            id: pay.cou_id,
          },
        });
      },
      delect(pay) {
        // 1.弹出确定对话框，提示用户
        this.dialog = true;
        this.del_id = pay.cou_id;
      },
      del() {
        this.dialog = false;
        //发起ajax请求删除数据
        $http("/market/coupon_delete", { cou_id: this.del_id }).then((data) => {
          if (data.code != 400) {
            this.page.page_count--;
          }
        });
      },
      edit(pay) {
        // 跳转到其他界面

        this.$router.push({
          path: "coupon-update",
          query: {
            id: pay.id,
          },
        });
      },
    },
    watch: {
      page: {
        handler: function () {
          this.http(this.page);
        },
        deep: true,
      },
    },
  };
</script>

<style scoped>
  .yanse {
    background: rgb(0, 229, 255);
  }

  .wei {
    display: flex;
    align-items: center;
  }

  .dialog-footer button:first-child {
    margin-right: 10px;
  }

  .pag_wei {
    display: flex;
    justify-content: flex-end;
  }
</style>