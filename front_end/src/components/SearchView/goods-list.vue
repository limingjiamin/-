<template>
  <el-form :model="formInline" class="demo-form-inline box">
    <div>
      <el-form-item label="输入搜索">
        <el-input v-model="formInline.name" placeholder="商品名称" style="width: 61.5%;"></el-input>
      </el-form-item>
    </div>
    <div>
      <el-form-item label="商品货号">
        <el-input v-model="formInline.num" placeholder="商品货号" style="width: 61.5%;"></el-input>
      </el-form-item>
    </div>
    <div>
      <el-form-item label="商品分类">
        <el-cascader :options="options" v-model="formInline.category" placeholder="商品分类" />
      </el-form-item>
    </div>
    <div>
      <el-form-item label="商品品牌">
        <el-select v-model="formInline.brand" placeholder="商品品牌">
          <el-option label="小米" value="小米" />
          <el-option label="七匹狼" value="七匹狼" />
          <el-option label="海澜之家" value="海澜之家" />
          <el-option label="苹果" value="苹果" />
          <el-option label="华为" value="华为" />
          <el-option label="格力" value="格力" />
          <el-option label="方太" value="方太" />
          <el-option label="万和" value="万和" />
          <el-option label="OPPO" value="OPPO" />
        </el-select>
      </el-form-item>
    </div>
    <div>
      <el-form-item label="上架状态">
        <el-select v-model="formInline.state" placeholder="上架状态">
          <el-option label="未上架" value="0" />
          <el-option label="已上架" value="1" />
        </el-select>
      </el-form-item>
    </div>
    <div>
      <el-form-item label="审核状态">
        <el-select v-model="formInline.examine" placeholder="审核状态">
          <el-option label="未审核" value="0" />
          <el-option label="已审核" value="1" />
        </el-select>
      </el-form-item>
    </div>
  </el-form>
</template>

<script lang="ts">
  import { defineComponent, reactive, onUpdated } from "vue";
  interface Search {
    name: string
    num: string
    category: string
    brand: string
    state: string
    examine: string
  }
  class FormInline {
    formInline: Search = {
      name: "",
      num: "",
      category: "",
      brand: "",
      state: "",
      examine: "",
    }
  }
  export default defineComponent({
    props: ["queren"],
    setup(props, { emit }) {
      const options = [
        {
          value: '服装',
          label: '服装',
          children: [
            {
              value: '外套',
              label: '外套',
            },
            {
              value: 'T恤',
              label: 'T恤',
            },
            {
              value: '休闲裤',
              label: '休闲裤',
            },
            {
              value: '牛仔裤',
              label: '牛仔裤',
            },
            {
              value: '衬衫',
              label: '衬衫',
            },
            {
              value: '男鞋',
              label: '男鞋',
            }
          ]
        },
        {
          value: '手机数码',
          label: '手机数码',
          children: [
            {
              value: '手机通讯',
              label: '手机配件',
            },
            {
              value: '手机配件',
              label: '手机配件',
            },
            {
              value: '摄影摄像',
              label: '摄影摄像',
            },
            {
              value: '影音娱乐',
              label: '影音娱乐',
            },
            {
              value: '数码配件',
              label: '数码配件',
            },
            {
              value: '智能设备',
              label: '智能设备',
            },
          ]
        },
        {
          value: '家用电器',
          label: '手机数码',
          children: [
            {
              value: '电视',
              label: '电视',
            },
            {
              value: '空调',
              label: '空调',
            },
            {
              value: '洗衣机',
              label: '洗衣机',
            },
            {
              value: '冰箱',
              label: '冰箱',
            },
            {
              value: '厨卫大电',
              label: '厨卫大电',
            },
            {
              value: '厨卫小电',
              label: '厨卫小电',
            },
            {
              value: '生活电器',
              label: '生活电器',
            },
          ]
        },
        {
          value: '家具家装',
          label: '手机数码',
          children: [
            {
              value: '厨房卫浴',
              label: '厨房卫浴',
            },
            {
              value: '灯饰照明',
              label: '灯饰照明',
            },
            {
              value: '五金工具',
              label: '五金工具',
            },
            {
              value: '卧室家具',
              label: '卧室家具',
            },
            {
              value: '客厅家具',
              label: '客厅家具',
            },
          ]
        },
        {
          value: '汽车用品',
          label: '手机数码',
          children: [
            {
              value: '全车整车',
              label: '全车整车',
            },
            {
              value: '车载电器',
              label: '车载电器',
            },
            {
              value: '维修保养',
              label: '维修保养',
            },
            {
              value: '汽车装饰',
              label: '汽车装饰',
            },
          ]
        }
      ]
      const { formInline } = reactive(new FormInline());
      // 定义自定义事件,当queren改变是发起传值
      const que = (qq: number) => {
        if (qq == 1) {
          emit("newarr", formInline)
        } else {
          emit("newarr", "reset")
        }
      }
      const resetForm = () => {
        for (let key in formInline) {
          formInline[key as keyof typeof formInline] = "";
        }
      }
      onUpdated(() => {
        if (props.queren == 1) {
          que(1);
        }
        if (props.queren == 3) {
          resetForm();
          que(0);
        }
      })
      return { options, formInline, resetForm }
    }
  })
</script>
<style scoped>
  .box {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
  }

  .box>div {
    width: 33%
  }
</style>
