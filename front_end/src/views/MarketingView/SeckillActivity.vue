<template>
  <div class="common-layout">
    <el-container>
      <SearchView @refresh="refresh"></SearchView>
      <AddView style="margin-top: 20px;">
        <template #name>
          <p>数据列表</p>
        </template>
        <template #btn>
          <div>
            <el-button color="#626aef" :dark="isDark" plain @click="time">秒杀时间段列表</el-button>
            <el-button color="#f01af9" :dark="isDark" plain @click="add">添加活动</el-button>
          </div>
        </template>
      </AddView>
      <el-main>
        <el-table :data="tableData" border style="width: 100%" :row-style="asd" :header-row-style="asd">
          <el-table-column type="selection" align="center" />
          <el-table-column prop="num" label="编号" align="center" width="100" />
          <el-table-column prop="titie" label="活动标题" align="center" width="150" />
          <el-table-column prop="state" label="活动状态" align="center" width="150" />
          <el-table-column prop="s_time" label="开始时间" align="center" width="180" />
          <el-table-column prop="e_time" label="结束时间" align="center" width="180" />
          <el-table-column label="上线/下线" align="center" width="150">
            <template #default="scope">
              <el-switch v-model="scope.row.upper_line" class="ml-2" @change="meg(scope.row)" style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                " />
            </template>
          </el-table-column>
          <el-table-column label="操作" align="center" width="335">
            <template #default="scope">
              <el-button size="small" plain @click="setup(scope.row)">设置商品</el-button>
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

        <el-dialog v-model="dialogVisible" title="活动编辑" width="30%" align="left">
          <el-form :model="dia_from">
            <el-form-item label="活动标题:" label-width="100px">
              <el-input v-model="dia_from.titie" autocomplete="off" />
            </el-form-item>
            <el-form-item label="开始时间" label-width="100px">
              <el-date-picker v-model="dia_from.s_time" type="date" placeholder="请选择时间" style="width: 100%" />
            </el-form-item>
            <el-form-item label="结束时间" label-width="100px">
              <el-date-picker v-model="dia_from.e_time" type="date" placeholder="请选择时间" style="width: 100%" />
            </el-form-item>
            <el-form-item label="上线/下线" label-width="100px">
              <el-radio-group v-model="dia_from.upper_line">
                <el-radio label="1" size="large">上线</el-radio>
                <el-radio label="0" size="large">下线</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogVisible = false">取消</el-button>
              <el-button type="primary" @click="comit">确定</el-button>
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
  import SearchView from "@/components/SearchView.vue";
  import AddView from "@/components/AddView.vue";
  export default {
    name: "SeckillActivity",
    components: { pag, SearchView, AddView },
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
        state: 0,
        states: 1,
        paylody: "",
        asd: {
          height: 60 + "px",
          fontSize: 16 + "px",
        },
      };
    },
    methods: {
      meg(paylody) {
        //  发起请求改变数据库中marke表中上线的状态。
        $http("/market/upper_line", {
          id: paylody.id,
          upper_line: paylody.upper_line,
        }).then((data) => {
          console.log(data);
        });
      },
      http(param) {
        $http("/market/seckill", param, "POST").then((data) => {
          if (data.data.length != 0) {
            data.data.forEach((elem) => {
              if (elem.upper_line == "0") {
                elem.upper_line = false;
              } else {
                elem.upper_line = true;
              }
              elem.s_time = elem.s_time.substring(0, 10);
              elem.e_time = elem.e_time.substring(0, 10);
            });
          }
          this.tableData = data.data;
          this.page.page_count = data.count;
        });
      },
      search() {
        $http("/search",
          {
            address: this.$route.path.split("/")[2],
            field: this.paylody,
            page: this.page,
          },
          "POST").then(({ data, count }) => {
            this.$store.state.page.page_count = count;
            if (data.length != 0) {
              data.forEach((elem) => {
                if (elem.upper_line == "0") {
                  elem.upper_line = false;
                } else {
                  elem.upper_line = true;
                }
                elem.s_time = elem.s_time.substring(0, 10);
                elem.e_time = elem.e_time.substring(0, 10);
              });
            }
            this.tableData = data;
          })
      },
      refresh(paylody) {
        // 根据paylody的类型来决定状态
        if (typeof paylody == "object") {
          this.state = 1;
          this.paylody = paylody;
          this.search()
        } else {
          this.state = 0;
          this.http();
        }
      },
      edit(pay) {
        //  弹出对话框，获取到当前数据
        this.dialogVisible = true;
        this.states = 0;
        this.dia_from = JSON.parse(JSON.stringify(pay));
        this.dia_from.upper_line = this.dia_from.upper_line ? "1" : "0";
      },
      time() {
        // 打开time页面
        this.$router.push("spike-times")
      },
      add() {
        this.dialogVisible = true;
        this.states = 1;
      },
      comit() {
        this.dialogVisible = false;
        this.dia_from.s_time = this.dia_from.s_time.length != 10 ? this.dia_from.s_time.toLocaleDateString().replace(/\//ig, "-") : this.dia_from.s_time;
        this.dia_from.e_time = this.dia_from.e_time.length != 10 ? this.dia_from.e_time.toLocaleDateString().replace(/\//ig, "-") : this.dia_from.e_time;
        if (this.states) {
          $http("/market/seckill_add", this.dia_from).then(({ data }) => {
            if (data == "添加成功") {
              this.dia_from = {};
              if (this.state == 0) {
                this.http(this.page);
              } else {
                this.search(this.page);
              }
            }
            alert(data)
          })
        } else {
          // 发起ajax请求修改数据
          let param = {
            id: this.dia_from.id,
            titie: this.dia_from.titie,
            s_time: this.dia_from.s_time,
            e_time: this.dia_from.e_time,
            upper_line: this.dia_from.upper_line,
          };
          $http("/market/seckill_edit", param).then((data) => {
            if (data.code != 400) {
              //说明成功
              this.tableData.forEach((elem) => {
                if (this.state == 0) {
                  this.http(this.page);
                } else {
                  this.search(this.page);
                }
              });
            }
          });
        }
      },
      delect(pay) {
        // 1.弹出确定对话框，提示用户
        this.dialog = true;
        this.del_id = pay.id;
      },
      del() {
        this.dialog = false;
        $http("/market/seckill_delete", { id: this.del_id }).then((data) => {
          if (data.code != 400) {
            this.page.page_count--;
          }
        });
      },
      setup(pay) {
        this.$router.push({
          path: "spike-time",
          query: {
            id: pay.id,
          },
        });
      },
    },
    watch: {
      page: {
        handler: function () {
          if (this.state == 0) {
            this.http(this.page);
          } else {
            this.search(this.page);
          }
        },
        deep: true,
      },
    },
  };
</script>

<style scoped>
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