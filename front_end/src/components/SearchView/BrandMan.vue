<template>
    <el-form :model="formInline" class="demo-form-inline box">
        <div>
            <el-form-item label="输入搜索">
                <el-input v-model="formInline.b_name" placeholder="品牌名称/关键字" style="width: 61.5%;" autocomplete="off">
                </el-input>
            </el-form-item>
        </div>
    </el-form>
</template>

<script lang="ts">
    import { defineComponent, reactive, onUpdated, } from "vue";
    import type { FormInstance } from 'element-plus';
    interface Search {
        b_name?: String
    }
    class FormInline {
        formInline: Search = {
            b_name: "",
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
                for(let key in formInline){
                  formInline[key as keyof typeof formInline]="";
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
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .box>div {
        width: 33%
    }
</style>