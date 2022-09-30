<template>
  <el-card class="box-card">
    <div class="box">
      <div class="box">
        <Search style="width: 1em; height: 1em; margin-right: 8px" />
        <h3>筛选搜索</h3>
      </div>
      <div>
        <el-button type="primary" plain @click="reset">重置</el-button>
        <el-button type="success" plain @click="search">查询结果</el-button>
      </div>
    </div>
    <div class="box2">
      <component :is="haha" :queren=queren @newarr="formInline"></component>
    </div>
  </el-card>

</template>
<script lang="ts">
  /*  1、引入注册组件
 2、使用组件时在标签上添加   @refresh="接收事件名"
 3、接收事件名
 // 根据参数的类型来决定状态
     if(typeof paylody == "object"){
       this.state=1;//自定义的状态属性储存整个页面状态
       this.paylody=paylody;//自定义的参数属性储存搜索的参数
       this.search();//调用搜索的方法
     }else{
       this.state=0;
       this.http();//调用普通表格数据的方法
     }
 4、搜索方法
   search() {
     $http("/search",
       {
         address: this.$route.path.split("/")[2],
         field: this.paylody,
         page: this.page,
       },
       "POST").then(({data,count}) => {
         this.$store.state.page.page_count=count;
         this.tableData=data;
       })
   },
 5、凡是涉及到请求的都要判断模式
     if(this.state==0){
       this.http(this.page);
     }else{
       this.search(this.page);
     }
*/
  import { defineComponent, ref, defineAsyncComponent } from "vue";
  import $http from "@/axios/http";
  export default defineComponent({
    computed: {
      haha() {
        let name = this.$route.path.split("/")[2]
        return defineAsyncComponent(() => import(`./SearchView/${name}.vue`));
      }
    },
    setup(props, { emit }) {
      let queren = ref < number > (0);
      // 确认方法
      const search = () => {
        queren.value = 1;
      }
      // 重置按钮
      const reset = () => {
        queren.value = 3;
      }
      const formInline = (paylody = {}) => {
        queren.value = 0;
        if (typeof paylody == "object") {
          //判断其中数据是否为空，提取不为空的对象(复制的新数组)
          let obj = Object.assign({}, paylody)
          for (let key in obj) {
            if (obj[key as keyof typeof obj] == "") {
              delete obj[key as keyof typeof obj]
            }
          }
          // 判断obj是否为空,不为空,向父元素暴露一个指令，告诉父元素可以刷新表格了
          if (Object.keys(obj).length != 0) {
            emit("refresh", obj)
          } else {
            alert("请选择您的条件！主人");
          }
        } else {
          emit("refresh", "empty")
        }
      }
      return { search, reset, queren, formInline }
    },
  })

</script>
<style scoped>
  .box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .box2 {
    box-sizing: border-box;
    padding: 10px;
  }
</style>