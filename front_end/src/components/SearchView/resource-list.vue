<template>
    <el-form :model="formInline" class="demo-form-inline box">
        <div>
            <el-form-item label="资源名称">
                <el-input v-model="formInline.name" placeholder="资源名称" style="width: 61.5%;" autocomplete="off">
                </el-input>
            </el-form-item>
        </div>
        <div>
            <el-form-item label="资源路径">
                <el-input v-model="formInline.urls" placeholder="资源路径" style="width: 61.5%;" autocomplete="off">
                </el-input>
            </el-form-item>
        </div>
        <div>
            <el-form-item label="资源分类">
                <el-select v-model="formInline.types" placeholder="全部">
                  <el-option label="商品模块" value="商品模块" />
                  <el-option label="订单模块" value="订单模块" />
                  <el-option label="营销模块" value="营销模块" />
                  <el-option label="权限模块" value="权限模块" />
                  <el-option label="内容模块" value="内容模块" />
                  <el-option label="其他模块" value="其他模块" />
                </el-select>
              </el-form-item>
        </div>
    </el-form>
</template>

<script lang="ts">
    import { defineComponent, reactive, onUpdated, } from "vue";
    interface Search {
        name: string
        urls: string
        types: string
    }
    class FormInline {
        formInline: Search = {
            name: "",
            urls: "",
            types: ""
        }
    }
    export default defineComponent({
        props: ["queren"],
        setup(props, { emit }) {
            console.log(props);
            const { formInline } = reactive(new FormInline());
            // 定义自定义事件,当queren改变是发起传值
            const que = () => {
                emit("newarr", formInline)
            }
            const resetForm = () => {
                for (let key in formInline) {
                    formInline[key as keyof typeof formInline] = "";
                }
            }
            onUpdated(() => {
                if (props.queren == 1) {
                    que();
                }
                if (props.queren == 3) {
                    resetForm();
                    que();
                }
            })
            return { formInline, resetForm }
        }
    })
</script>
<style scoped>
    .box {
        display: flex;
        justify-content:flex-start;
        align-items: center;
        flex-wrap: wrap;
    }

    .box>div {
        width: 33%
    }
</style>