<template>
  <div class="wei">
    <el-form :model="form" :rules="rules" label-width="120px" class="box" size="large">
      <el-form-item label="广告名称 : " class="box2" prop="name">
        <el-input v-model="form.ad_titie" />
      </el-form-item>
      <el-form-item label="广告位置 : ">
        <el-select v-model="form.ad_pos" placeholder="请选择位置">
          <el-option label="APP首页轮播" value="APP首页轮播" />
          <el-option label="PC首页轮播" value="PC首页轮播" />
        </el-select>
      </el-form-item>
      <el-form-item label="开始时间 : " prop="date">
        <el-date-picker v-model="form.s_time" type="datetime" placeholder="请选择开始时间" />
      </el-form-item>
      <el-form-item label="结束时间 : " prop="date">
        <el-date-picker v-model="form.e_time" type="datetime" placeholder="请选择结束时间" />
      </el-form-item>
      <el-form-item label="上线/下线 : ">
        <el-radio-group v-model="form.ad_upper">
          <el-radio label="1" size="large">上线</el-radio>
          <el-radio label="0" size="large">下线</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="广告图片 : ">
        <el-upload v-model:file-list="fileList" :limit="1" style="width: 600px;" class="upload-demo"
          :auto-upload="false" :action="url" :on-preview="handlePreview" :on-remove="handleRemove"
          :on-exceed="handleExceed" list-type="picture">
          <el-button type="primary">点击上传</el-button>
          <template #tip>
            <div class="el-upload__tip">
              只能上传jpg/png文件，且不超过10MB
            </div>
          </template>
        </el-upload>
      </el-form-item>
      <el-form-item label="排序 : ">
        <el-input v-model.number="form.ad_sort" />
      </el-form-item>
      <el-form-item label="广告链接 : ">
        <el-input v-model="form.ad_href" />
      </el-form-item>
      <el-form-item label="广告备注 : ">
        <el-input v-model="form.ad_rem" type="textarea" :rows="4"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">确认</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import $http from "@/axios/index";
  export default {
    name: "AdvertisingEdit",
    created() {
      $http("/market/advertis_select", { id: this.$route.query.id }).then((data) => {
        this.form = data.data[0];
        this.fileList[0].url = this.form.ad_img;
      });
    },
    data() {
      return {
        form: {},
        name: '',
        rules: {
          name: [
            { required: true, message: '广告名称不能为空哦！主人', trigger: 'blur', type: "object" },
            { min: 2, max: 20, message: '请输入2-20个字符哦!主人', trigger: 'blur' }
          ],
          date: [
            { type: 'date', required: true, message: '必须选择时间哦！主人', trigger: 'change' },
          ],
          ip: [
            { required: true, message: 'Please input email address', trigger: 'blur', },
            { type: 'url', message: 'Please input correct email address', trigger: ['blur', 'change'], },
          ]
        },
        url: "https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15",
        fileList: [{
          name: "",
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
        }]
      }
    },
    methods: {
      handlePreview(file) {
        console.log(file)
      },
      handleRemove(uploadFile, uploadFiles) {
        console.log(uploadFile, uploadFiles)
      },
      handleExceed(files) {

        
        console.log(this.fileList);
        console.log(files)
      }
    },
  };
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