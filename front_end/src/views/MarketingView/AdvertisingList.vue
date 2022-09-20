<template>
  <div class="common-layout">
    <el-container>
      <el-header class="yanse">用来存放{{ batch_titie}}和数据列表</el-header>
      <el-main>
        <el-table :data="tableData" border style="width: 100%" @selection-change="xuan">
          <el-table-column type="selection" align="center" />
          <el-table-column prop="ad_num" label="编号" align="center" width="85" />
          <el-table-column prop="ad_titie" label="广告名称" align="center" width="135" />
          <el-table-column prop="ad_pos" label="广告位置" align="center" width="120" />
          <el-table-column label="广告图片" align="center" width="150">
            <template #default="scope">
              <el-image style="width: 100px; height: 100px" :src="scope.row.ad_img" fit="fill" />
            </template>

          </el-table-column>>
          <el-table-column prop="time" label="时间" align="center" width="233" />
          <el-table-column label="上线/下线" align="center" width="110">
            <template #default="scope">
              <el-switch v-model="scope.row.ad_upper" class="ml-2" @change="meg(scope.row)" style="
                  --el-switch-on-color: #13ce66;
                  --el-switch-off-color: #ff4949;
                " />
            </template>
          </el-table-column>
          <el-table-column prop="ad_count" label="点击次数" align="center" width="105" />
          <el-table-column prop="ad_order" label="生成订单" align="center" width="105" />
          <el-table-column label="操作" align="center" width="200">
            <template #default="scope">
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
        <batch/>
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
    name: "AdvertisingList",
    components: { pag ,batch},
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
        dia_from: {},
        del_id: 0,
        batch:{}
      };
    },
    methods: {
      http(param) {
        $http("/market/advertis", param).then((data) => {
          data.data.forEach((elem) => {
            if (elem.ad_upper == "0") {
              elem.ad_upper = false;
            } else {
              elem.ad_upper = true;
            }
            elem.time = "开始时间 : " + elem.s_time.slice(0, -5).replace("T", " ") + "结束时间 : " + elem.e_time.slice(0, -5).replace("T", " ");
          });
          this.tableData = data.data;
          this.page.page_count = data.count;
        });
      },
      meg(paylody) {
        //  发起请求改变数据库中marke表中上线的状态。
        $http("/market/upper", {
          id: paylody.ad_id,
          upper: paylody.ad_upper,
        }).then((data) => {
          console.log(data);
        });
      },
      delect(pay) {
        // 1.弹出确定对话框，提示用户
        this.dialog = true;
        this.del_id = pay.ad_id;

      },
      del() {
        this.dialog = false;
        //发起ajax请求删除数据
        $http("/market/advertis_delete", { id: this.del_id }).then(data => {
          if (data.code != 400) {
            this.http();
          }
        })
      },
      edit(pay){
        // 跳到编辑页面
        let canshu=JSON.parse(JSON.stringify(pay));
        console.log(1);
        this.$router.push({
          path:"advertis-update",
          query:canshu,
        })
      },
      xuan(value){
        //  需要想vuex中暴露一个选择框的情况
          this.$store.state.batch.change_num=value;
      }
    },
    watch: {
      page: {
        handler: function () {
          this.http(this.page);
        },
        deep: true,
      },
     'batch.change_ajax':{
        handler: function (value) {
          if(value!=""){
            // 遍历
            let param={};
            /* for(let key in this.$store.state.batch.change_num){

            } */
            // 发起ajax请求
            // 释放vuex.batch
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