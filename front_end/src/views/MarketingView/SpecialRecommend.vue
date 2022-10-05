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
            <el-button color="#626aef" :dark="isDark" plain @click="select">选择商品</el-button>
          </div>
        </template>
      </AddView>
      <el-main>
        <el-table :data="tableData" border style="width: 100%" @selection-change="xuan">
          <el-table-column type="selection" align="center" width="100" />
          <el-table-column prop="sp_num" label="编号" align="center" width="150" />
          <el-table-column prop="sp_titie" label="专题名称" align="center" width="240" />
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
        <el-dialog v-model="dialogs" title="选择专题" width="54%" align="left">
          <el-input v-model="dia_search.search" placeholder="专题名称搜索" style="width: 300px;">
            <template #append>
              <el-button :icon="dia_search.Search" @click="sear(dia_search.search)"></el-button>
            </template>
          </el-input>
          <el-table :data="dia_search.tableData" border style="width: 100%;margin-top: 30px;" @selection-change="xuanze"
            :row-style="asd" :header-row-style="asd">
            <el-table-column type="selection" align="center" width="100" />
            <el-table-column prop="sp_titie" label="专题名称" align="center" width="300" />
            <el-table-column prop="sp_type" label="所属分类" align="center" width="200" />
            <el-table-column prop="sp_time" label="添加时间" align="center" width="269" />
          </el-table>
          <div style="display:flex; justify-content: flex-end; margin-top: 30px;">
            <el-pagination background layout="prev, pager, next" :total="dia_search.page.page_count"
              :page-size="dia_search.page.page_size" @current-change="handleCurrentChange" />
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogs = false">取消</el-button>
              <el-button type="primary" @click="queding">确定</el-button>
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
  import SearchView from "@/components/SearchView.vue";
  import AddView from "@/components/AddView.vue";
  import { Search } from '@element-plus/icons-vue'
  export default {
    name: "SpecialRecommend",
    components: { pag, batch, SearchView, AddView },
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
        dialogs: false,
        dia_from: "",
        del_id: 0,
        batch: {},
        state: 0,
        paylody: "",
        dia_search: {
          Search,//搜索图标
          search: "",//搜索框的文本
          tableData: [],//表格元素
          page: {//分页
            page_size: 5,
            page_count: 0,
            page_num: 1,
          },
          state: 0,//当前模式
          pay: "",//搜索的参数
          select: [],//选中的元素
        },
        asd: {
          height: 60 + "px",
          fontSize: 16 + "px",
        },
      };
    },
    methods: {
      http(param) {
        $http("/market/special", param, "POST").then((data) => {
          if (data.data.length != 0) {
            data.data.forEach((elem) => {
              if (elem.recommend == "0") {
                elem.recommend = false;
                elem.state = "未推荐"
              } else {
                elem.recommend = true;
                elem.state = "推荐中"
              }
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
            if (data.length > 0) {
              data.forEach((elem) => {
                if (elem.recommend == "0") {
                  elem.recommend = false;
                  elem.state = "未推荐"
                } else {
                  elem.recommend = true;
                  elem.state = "推荐中"
                }
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
      meg(paylody) {
        //  发起请求改变数据库中marke表中上线的状态。
        $http("/market/recommend", {
          id: paylody.sp_id,
          recommend: paylody.recommend,
        }).then(() => {
          if (this.state == 0) {
            this.http(this.page);
          } else {
            this.search(this.page);
          }
        });
      },
      delect(pay) {
        // 1.弹出确定对话框，提示用户
        this.dialog = true;
        this.del_id = pay.sp_id;
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
        this.dialogVisible = false;
        $http("/market/sort", {
          id: this.dia_from.sp_id,
          sort: this.dia_from.sp_sort
        }).then((data) => {
          if (data.code != 400) {
            if (this.state == 0) {
              this.http(this.page);
            } else {
              this.search(this.page);
            }
          }
        })
      },
      xuan(value) {
        //  需要想vuex中暴露一个选择框选择的元素id
        let arr = [];
        value.forEach(elem => arr.push(elem.sp_id));
        this.$store.state.batch.change_num = arr
      },
      select() {
        this.dialogs = true;
        this.dia_search.tableData.length = 0;
        this.dia_search.search = "";
        this.dia_search.state = 0;
        this.dia_search.select.length = 0;
        this.dia_search.page = {
          page_size: 5,
          page_count: 0,
          page_num: 1,
        };
        this.https();
      },
      https() {
        $http("/market/special", this.dia_search.page, "POST").then(({ data, count }) => {
          data.forEach(elem => elem.sp_time =elem.sp_time.slice(0,-5).replace("T"," "))
          this.dia_search.page.page_count = count;
          this.dia_search.tableData = data;
        })
      },
      https_search() {
        $http("/market/special_select_search", {
          page: JSON.stringify(this.dia_search.page),
          search: this.dia_search.pay,
        }).then(({ data, count }) => {
          data.forEach(elem => elem.sp_time =elem.sp_time.slice(0,-5).replace("T"," "))
          this.dia_search.page.page_count = count;
          this.dia_search.tableData = data;
        })
      },
      handleCurrentChange(value) {
        this.dia_search.page.page_num = value;
        if (this.dia_search.state) {
          this.https_search();
        } else {
          this.https();
        }
      },
      sear(pay) {
        if (pay.trim().length > 0) {
          this.dia_search.state = 1;
          this.dia_search.page = {
            page_size: 5,
            page_count: 0,
            page_num: 1,
          };
          this.dia_search.pay = pay;
          this.https_search();
        } else {
          this.dia_search.state = 0;
        }
      },
      queding() {
        if (this.dia_search.select.length == 0) {
          alert("请选择商品");
        } else {
          let data = confirm("是否进行添加操作");
          if (data) {
            // 发起ajax请求
            // 退出
            this.dialogs = false;
          }
        }
      },
      xuanze(value) {
        // 保存选中的元素
        this.dia_search.select = value;
      }
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
      'batch.change_ajax': {
        handler: function (value) {
          if (value) {
            // 发起ajax请求
            if (this.state == 0) {
              this.http(this.page);
            } else {
              this.search(this.page);
            }
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