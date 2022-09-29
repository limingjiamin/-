<template>
    <el-form :model="formInline" class="demo-form-inline box">
        <div>
            <el-form-item label="优惠券名称">
                <el-input v-model="formInline.cou_titie" placeholder="优惠券名称" style="width: 61.5%;" autocomplete="off">
                </el-input>
            </el-form-item>
        </div>
        <div>
            <el-form-item label="优惠券类型">
              <el-select v-model="formInline.cou_type" placeholder="全部">
                <el-option label="全场赠券" value="全场赠券" />
                <el-option label="会员赠券" value="会员赠券" />
                <el-option label="购物赠券" value="购物赠券" />
                <el-option label="注册赠券" value="注册赠券" />
              </el-select>
            </el-form-item>
          </div>
    </el-form>
</template>

<script lang="ts">
    import { defineComponent, reactive, onUpdated, } from "vue";
    interface Search {
        cou_titie: string
        cou_type:string
    }
    class FormInline {
        formInline: Search = {
            cou_titie:"",
            cou_type:""
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
        justify-content: flex-start;
        align-items: center;
        flex-wrap: wrap;
    }

    .box>div {
        width: 33%
    }
</style>