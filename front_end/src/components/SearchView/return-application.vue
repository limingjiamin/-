<template>
    <el-form :model="formInline" class="demo-form-inline box">
        <div>
            <el-form-item label="输入搜索">
                <el-input v-model="formInline.id" placeholder="服务单号" style="width: 61.5%;"></el-input>
            </el-form-item>
        </div>
        <div>
            <el-form-item label="处理状态">
                <el-select v-model="formInline.status" placeholder="全部">
                    <el-option label="待处理" value="待处理" />
                    <el-option label="退货中" value="退货中" />
                    <el-option label="已完成" value="已完成" />
                    <el-option label="已拒绝" value="已拒绝" />
                </el-select>
            </el-form-item>
        </div>
        <div>
            <el-form-item label="申请时间">
                <el-date-picker v-model="formInline.application_time" type="date" placeholder="请选择时间" />
            </el-form-item>
        </div>
        <div>
            <el-form-item label="处理时间">
                <el-date-picker v-model="formInline.processing_time" type="date" placeholder="请选择时间" />
            </el-form-item>
        </div>

    </el-form>
</template>

<script lang="ts">
    import { defineComponent, reactive, onUpdated } from "vue";
    interface Search {
        id: string
        application_time: string
        processing_time: string
        status: string
    }
    class FormInline {
        formInline: Search = {
            id: "",
            application_time: "",
            processing_time: "",
            status: "",
        }
    }
    export default defineComponent({
        props: ["queren"],
        setup(props, { emit }) {
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
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }

    .box>div {
        width: 33%
    }
</style>