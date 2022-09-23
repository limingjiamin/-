<template>
  <div class="common-layout">
    <el-container>
      <el-header class="yanse">用来存放{{ }}和数据列表</el-header>
      <el-main>
        <el-table :data="tableData" border style="width: 100%" @selection-change="xuan">
          <el-table-column type="selection" align="center" width="100" />
          <el-table-column prop="sp_num" label="编号" align="center" width="150" />
          <el-table-column prop="sp_titie" label="商品名称" align="center" width="240" />
          <el-table-column label="是否推荐" align="center" width="220">
            <template #default="scope">
              <el-switch v-model="scope.row.recommend" class="ml-2" @change="meg(scope.row)" style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                " />
            </template>
          </el-table-column>
          <el-table-column prop="sp_sort" label="排序" align="center" width="160" />
          <el-table-column prop="state" label="状态" align="center" width="160" />
          <el-table-column label="操作" align="center" width="260">
            <template #default="scope">
              <el-button size="small" type="primary" plain @click="edit(scope.row)">设置排序</el-button>
              <el-button size="small" type="danger" plain @click="delect(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>

        <el-dialog v-model="dialogVisible" title="设置排序" width="30%" align="left">
          <el-form-item label="排序 :" label-width="150px" style="width: 80%;font-size:25px ;">
            <el-input v-model="dia_from.sp_sort" autocomplete="off" size=large style="font-size:18px ;" />
          </el-form-item>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="commit">确定</el-button>
            </span>
          </template>
        </el-dialog>

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
        <batch />
        <pag />
      </el-footer>
    </el-container>
  </div>
</template>

<script>
  import $http from "@/axios/index";
  import pag from "@/components/PagingView.vue";
  import batch from "@/components/BatchView.vue";
  export default {
    name: "NewProductRecommend",
    components: { pag, batch },
    created() {
      this.page = this.$store.state.page;
      this.batch = this.$store.state.batch;
      this.http({});
    },
    data() {
      return {
        page: {},
        tableData: [],
        dialogVisible: false,
        dialog: false,
        dia_from: "",
        del_id: 0,
        batch: {}
      };
    },
    methods: {
      http(param) {
        $http("/market/special", param, "POST").then((data) => {
          data.data.forEach((elem) => {
            if (elem.recommend == "0") {
              elem.recommend = false;
              elem.state = "未推荐"
            } else {
              elem.recommend = true;
              elem.state = "推荐中"
            }
          });
          this.tableData = data.data;
          this.page.page_count = data.count;
        });
      },
      meg(paylody) {
        //  发起请求改变数据库中marke表中上线的状态。
        $http("/market/recommend", {
          id: paylody.sp_id,
          recommend: paylody.recommend,
        }).then((data) => {
          console.log(data);
        });
      },
      delect(pay) {
        // 1.弹出确定对话框，提示用户
        this.dialog = true;
        this.del_id = pay.sp_id;
        this.del(pay)
      },
      del() {
        this.dialog = false;
        //发起ajax请求删除数据
        $http("/market/special_delete", { sp_id: this.del_id }).then(data => {
          if (data.code != 400) {
            this.page.page_count--;
          }
        })
      },
      edit(pay) {
        this.dialogVisible = true;
        this.dia_from = JSON.parse(JSON.stringify(pay));
      },
      commit() {
        // 根据id修改数据
        $http("/market/sort", {
          id: this.dia_from.sp_id,
          sort: this.dia_from.sp_sort
        }).then((data) => {
          if (data.code != 400) {
            this.http(this.page);
          }
        })
      },
      xuan(value) {
        //  需要想vuex中暴露一个选择框选择的元素id
        let arr = [];
        value.forEach(elem => arr.push(elem.sp_id));
        this.$store.state.batch.change_num = arr
      }
    },
    watch: {
      page: {
        handler: function () {
          this.http(this.page);
        },
        deep: true,
      },
      'batch.change_ajax': {
        handler: function (value) {
          if (value) {
            // 发起ajax请求
            this.http(this.page);
            // 释放vuex.batch 恢复原来的样式
            this.$store.state.batch.change_num = "";
            this.$store.state.batch.change_ajax = false;
          }
        },
        deep: true,
      }
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
    justify-content: space-between;
    align-items: center;
  }
</style>