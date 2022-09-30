<template>
    <el-form :model="formInline" class="demo-form-inline box">
        <div>
            <el-form-item label="广告名称">
                <el-input v-model="formInline.ad_titie" placeholder="广告名称" style="width: 61.5%;" autocomplete="off">
                </el-input>
            </el-form-item>
        </div>
        <div>
            <el-form-item label="广告位置">
                <el-select v-model="formInline.ad_pos" placeholder="全部">
                    <el-option label="PC首页轮播" value="PC首页轮播" />
                    <el-option label="APP首页轮播" value="APP首页轮播" />
                </el-select>
            </el-form-item>
        </div>
        <div>
            <el-form-item label="到期时间">
                <el-date-picker v-model="formInline.e_time" type="date" placeholder="请选择时间" />
            </el-form-item>
        </div>
    </el-form>
</template>

<script lang="ts">
    import { defineComponent, reactive, onUpdated, } from "vue";

    interface Search {
        ad_titie: string
        ad_pos: string
        e_time: string
    }
    class FormInline {
        formInline: Search = {
            ad_titie: "",
            ad_pos: "",
            e_time: ""
        }
    }
    export default defineComponent({
        props: ["queren"],
        setup(props, { emit }) {
            const { formInline } = reactive(new FormInline());
            // 定义自定义事件,当queren改变是发起传值
            const que = (qq:number) => {
                if(qq==1){
                    emit("newarr", formInline)
                }else{
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
            return { formInline, resetForm }
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