<template>
  <div class="wei">
    <el-form ref="ruleFormRef" :model="form" :rules="rules" label-width="120px" class="box" size="large" status-icon>
      <el-form-item label="广告名称 : " class="box2" prop="ad_titie">
        <el-input v-model="form.ad_titie" />
      </el-form-item>
      <el-form-item label="广告位置 : ">
        <el-select v-model="form.ad_pos" placeholder="请选择位置">
          <el-option label="APP首页轮播" value="APP首页轮播" />
          <el-option label="PC首页轮播" value="PC首页轮播" />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间 : " prop="s_time">
        <el-date-picker v-model="form.s_time" type="datetime" placeholder="请选择开始时间" />
      </el-form-item>
      <el-form-item label="结束时间 : " prop="e_time">
        <el-date-picker v-model="form.e_time" type="datetime" placeholder="请选择结束时间" />
      </el-form-item>
      <el-form-item label="上线/下线 : ">
        <el-radio-group v-model="form.ad_upper">
          <el-radio label="1" size="large">上线</el-radio>
          <el-radio label="0" size="large">下线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告图片 : ">
        <el-upload ref="upload" v-model:file-list="fileList" :limit="1" style="width: 600px;" class="upload-demo"
          :auto-upload="false" :on-exceed="handleExceed" list-type="picture" :before-upload="beforeAvatarUpload"
          action="http://127.0.0.1:8080/upload">
          <el-button type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">
              只能上传jpg/png文件,且不超过10MB
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="排序 : ">
        <el-input v-model.number="form.ad_sort" />
      </el-form-item>
      <el-form-item label="广告链接 : " prop="ad_href">
        <el-input v-model="form.ad_href" />
      </el-form-item>
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
  import type { FormInstance, FormRules, UploadInstance, UploadProps, UploadRawFile } from 'element-plus';
  import { genFileId } from 'element-plus';
  const ruleFormRef = ref < FormInstance > ();
  const upload = ref < UploadInstance > ()
  const $route = useRoute();
  const $router = useRouter();
  const formData = reactive({
    form: {},
    from: {},
    fileList: [{
      name: "",
      url: "",
    }],
    rules: {
      ad_titie: [
        { required: true, message: '广告名称不能为空哦！主人', trigger: 'blur' },
        { min: 2, max: 20, message: '请输入2-20个字符哦!主人', trigger: 'blur' }
      ],
      e_time: [
        { type: 'date', required: true, message: '必须选择时间哦！主人', trigger: 'change' },
      ],
      s_time: [
        { type: 'date', required: true, message: '必须选择时间哦！主人', trigger: 'change' },
      ],
      ad_href: [
        { required: true, message: 'Please input email address', trigger: 'blur', },
        { type: 'url', message: 'Please input correct email address', trigger: ['blur', 'change'], },
      ]
    }
  })
  const { form, fileList, rules, from } = toRefs(formData)
  // 判断是否传过来值，没有默认为添加模式
  onMounted(() => {
    if ($route.query.id) {
      http();
    }
  })
  // 请求的方法
  const http = async () => {
    let { data } = await $http("/market/advertis_select", { id: $route.query.id });
    formData.fileList[0].url = data[0].ad_img;
    formData.form = data[0];
    formData.from = JSON.parse(JSON.stringify(data[0]));
  }
  // 覆盖文件
  const handleExceed: UploadProps['onExceed'] = (files) => {
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    upload.value!.handleStart(file)
  }
  // 限制文件的大小
  const beforeAvatarUpload = (file) => {
    const isJPG = file.type === "image/jpeg" || file.type === "image/png";
    const isLt = file.size / 1024 / 1024 < 10;
    if (!isJPG) {
      alert("上传头像图片只能是 JPG和png 格式!");
    }
    if (!isLt) {
      alert("上传头像图片大小不能超过 10MB!");
    }
    return isJPG && isLt;
  }
  // 提交表单
  const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
      if (valid) {
        let obj = Object.assign({}, form.value);
        obj.ad_img = obj.ad_img ? fileList.value[0].url : ""
        // 处理当前的form表单数据, 又是否为空的存在
        for (let key in obj) {
          if (obj[key as keyof typeof obj] == from.value[key as keyof typeof obj]) {
            if (key != "ad_id") {
              delete obj[key as keyof typeof obj];
            }
          }
        }
        // 判断当前是添加还是修改
        if ($route.query.id) {
          // 发起修改的ajax请求
          $http("/market/advertis_update", obj, "POST").then(({ data }) => {
            alert(data);
            from.value = JSON.parse(JSON.stringify(form.value));
          })
        } else {
          // 发起添加的ajax请求
          $http("/market/advertis_add", obj, "POST").then((data) => {
            alert(data.data);
            $router.push({
              path: "advertis-update",
              query: { id: data.ad_id },
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
</style>