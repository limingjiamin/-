<template>
    <el-form :model="formInline" class="demo-form-inline box">
        <div>
            <el-form-item label="活动名称">
                <el-input v-model="formInline.titie" placeholder="活动名称" style="width: 61.5%;"></el-input>
            </el-form-item>
        </div>
        
    </el-form>
</template>

<script lang="ts">
    import { defineComponent, reactive, onUpdated } from "vue";
    interface Search {
        titie: String
    }
    class FormInline {
        formInline: Search = {
            titie: "",
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
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    }

    .box>div {
        width: 33%
    }
</style>