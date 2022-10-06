<template>
  <div class="wei">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px" class="box" size="large" status-icon>
      <el-form-item label="优惠券类型 : " class="box2">
        <el-select v-model="form.cou_type" placeholder="请选择位置">
          <el-option label="全场赠券" value="全场赠券" />
          <el-option label="会员赠券" value="会员赠券" />
          <el-option label="购物赠券" value="购物赠券" />
          <el-option label="注册赠券" value="注册赠券" />
        </el-select>
      </el-form-item>
      <el-form-item label="优惠券名称 : " prop="cou_titie">
        <el-input v-model="form.cou_titie" class="box3" />
      </el-form-item>
      <el-form-item label="适用平台 : ">
        <el-select v-model="form.cou_plat" placeholder="请选择位置">
          <el-option label="全平台" value="全平台" />
          <el-option label="移动平台" value="移动平台" />
          <el-option label="PC平台" value="PC平台" />
        </el-select>
      </el-form-item>
      <el-form-item label="总发行量 : " prop="cou_count">
        <el-input v-model="form.cou_count" class="box3" />
      </el-form-item>
      <el-form-item label="面额 : " prop="cou_value">
        <el-input v-model="form.cou_value" class="box3" />
      </el-form-item>
      <el-form-item label="每人限领 : ">
        <el-input v-model="form.cou_xian" class="box3" />
      </el-form-item>
      <el-form-item label="使用门槛 : " prop="cou_thres">
        <el-input v-model="form.cou_thres" class="box3">
          <template #prepend>满</template>
          <template #append>元可用</template>
        </el-input>
      </el-form-item>
      <el-form-item label="领取日期 : ">
        <el-date-picker v-model="form.s_time" type="datetime" placeholder="请选择开始时间" />
      </el-form-item>
      <el-form-item label="有效期 : ">
        <el-date-picker v-model="form.s_time" type="datetime" placeholder="请选择结束时间" />
        <span style="margin:0 10px ;">至</span>
        <el-date-picker v-model="form.e_time" type="datetime" placeholder="请选择结束时间" />
      </el-form-item>
      <el-form-item label="可使用的商品 : ">
        <el-button-group>
          <el-button :type="form.cou_shop=='全场通用'?'primary':''" @click="quan">全场通用</el-button>
          <el-button :type="form.cou_shop=='指定分类'?'primary':''" @click="zhitype">指定分类</el-button>
          <el-button :type="form.cou_shop=='指定商品'?'primary':''" @click="zhishop">指定商品</el-button>
        </el-button-group>
      </el-form-item>
      <div v-if="form.cou_shop=='指定分类'">
        <el-form-item>
          <el-cascader :options="options" clearable placeholder="请选择分类的商品" @change="handleSelect" />
          <el-button type="primary" style="margin-left:10px;" @click="tian">添加</el-button>
        </el-form-item>
        <el-form-item style="width:600px;">
          <el-table :data="tableData" border style="width: 100%" :row-style="asd" :header-row-style="asd">
            <el-table-column prop="cou_num" label="分类名称" align="center" width="360" />
            <el-table-column label="操作" align="center" width="120">
              <template #default="scope">
                <el-button size="small" type="danger" plain @click="shanchu(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </div>
      <div v-if="form.cou_shop=='指定商品'">
        <el-form-item>
          <el-autocomplete v-model="state" :fetch-suggestions="querySearch" clearable class="box3"
            placeholder="商品名称/商品货号" @select="handleSelect">
            <template #default="{ item }">
              <div class="box4">
                <span class="value">{{ item.value }}</span>
                <span class="link">{{ item.link }}</span>
              </div>

            </template>
          </el-autocomplete>
          <el-button type="primary" style="margin-left:10px ;" @click="tianjia">添加</el-button>
        </el-form-item>
        <el-form-item style="width:600px;">
          <el-table :data="tableData" border style="width: 100%" :row-style="asd" :header-row-style="asd">
            <el-table-column prop="p_name" label="商品名称" align="center" width="180" />
            <el-table-column prop="art_no" label="货号" align="center" width="180" />
            <el-table-column label="操作" align="center" width="120">
              <template #default="scope">
                <el-button size="small" type="danger" plain @click="shanchu(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-form-item>
      </div>
      <el-form-item label="广告备注 : ">
        <el-input v-model="form.ad_rem" type="textarea" :rows="4" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
  import $http from "@/axios/http";
  import { onMounted, ref, reactive, toRefs } from "vue";
  import { useRoute, useRouter } from "vue-router";
  import type { FormInstance, FormRules } from 'element-plus';
  interface RestaurantItem {
    value: string
    link: string
  }
  const ruleFormRef = ref < FormInstance > ();
  const restaurants = ref < RestaurantItem[] > ([])
  const $route = useRoute();
  const $router = useRouter();
  const formData = reactive({
    form: {},
    from: {},
    tableData: [],
    pay: {},//临时储存对象
    asd: {
      height: 60 + "px",
      fontSize: 16 + "px",
    },
    state: "",
    options: [
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
    ],
    rules: {
      cou_titie: [
        { required: true, message: '优惠卷名称不能为空哦！主人', trigger: 'blur' },
        { min: 2, max: 20, message: '请输入2-20个字符哦!主人', trigger: 'blur' }
      ],
      cou_count: [
        { required: true, message: '最低发行数量为0,不能为空', trigger: 'blur' },
        { min: 1, max: 5, message: '主人您可以发布0-10000张劵哦', trigger: 'blur' }
      ],
      cou_value: [
        { required: true, message: '面额不能为空啊，主人', trigger: 'blur' },
        { min: 1, max: 4, message: '主人,你是想让我赔死嘛!最高到9999元哦', trigger: 'blur' }
      ],
      cou_thres: [
        { required: true, message: '主人,怎么不能设置门槛呢', trigger: 'blur' },
        { min: 1, max: 5, message: '主人,门槛不能太高哦!最高为99999', trigger: 'blur' }
      ],
    }
  })
  const { form, rules, from, options, asd, state, tableData, pay } = toRefs(formData);
  // 判断是否传过来值，没有默认为添加模式
  onMounted(() => {
    if ($route.query.id) {
      http();
    }
  })
  // 请求的方法
  const http = async () => {
    let { data } = await $http("/market/coupon_select", { id: $route.query.id });
    data[0].cou_count = data[0].cou_count.toString();
    data[0].cou_value = data[0].cou_value.toString();
    data[0].cou_thres = data[0].cou_thres.toString();
    formData.form = data[0];
    formData.from = JSON.parse(JSON.stringify(data[0]));
  }
  const querySearch = (queryString: string, cb: any) => {
    const results = queryString
      ? restaurants.value.filter(createFilter(queryString))
      : restaurants.value
    cb(results)
  }
  const createFilter = (queryString: string) => {
    return (restaurant: RestaurantItem) => {
      return (
        restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
      )
    }
  }
  const loadAll = () => {
    $http("/market/coupon_select_shop").then(({ data }) => {
      restaurants.value = data;
    })
  }
  const handleSelect = (item: RestaurantItem) => {
    pay.value = item;
  }
  const tianjia = () => {
    tableData.value.push({
      p_name: pay.value.value,
      art_no: "NO." + pay.value.link,
    })
  }
  const tian = () => {
    tableData.value.push({
      cou_num: pay.value[0] + ">" + pay.value[1],
    })
  }
  const shanchu = (pay: RestaurantItem) => {
    tableData.value.splice(tableData.value.indexOf(pay), 1)
  }
  // 按钮组
  const quan = () => {
    form.value.cou_shop = '全场通用';
    tableData.value = [];
    pay.value = {};
  }
  const zhitype = () => {
    form.value.cou_shop = '指定分类';
    tableData.value = [];
    pay.value = {};
  }
  const zhishop = () => {
    form.value.cou_shop = '指定商品';
    tableData.value = [];
    pay.value = {};
    loadAll();
  }
  // 提交表单
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        let obj = Object.assign({}, form.value);
        // 处理当前的form表单数据, 又是否为空的存在
        for (let key in obj) {
          if (obj[key as keyof typeof obj] == from.value[key as keyof typeof obj]) {
            if (key != "cou_id") {
              delete obj[key as keyof typeof obj];
            }
          }
        }
        // 判断当前是添加还是修改
        if ($route.query.id) {
          // 发起修改的ajax请求
          $http("/market/coupon_update", obj, "POST").then(({ data }) => {
            alert(data);
            from.value = JSON.parse(JSON.stringify(form.value));
          })
        } else {
          // 发起添加的ajax请求
          $http("/market/coupon_add", obj, "POST").then((data) => {
            alert(data.data);
            $router.push({
              path: "coupon-update",
              query: { id: data.cou_id },
            })
          })
        }

      } else {
        alert('出错了!主人,请主人在自己检查下哦')
        return false
      }
    })
  }
</script>
<style scoped>
  .wei {
    width: 60%;
    margin: 0 auto;
    font-size: 20px;
    border: 0.5px solid rgb(239, 239, 239);
    border-radius: 10px;
  }

  .wei>.box {
    width: 80%;
    margin: 0 auto;
  }

  .box2 {
    margin-top: 50px;
  }

  .box3 {
    width: 300px;
  }

  .box4 {
    display: flex;
    justify-content: space-between;
  }
</style>