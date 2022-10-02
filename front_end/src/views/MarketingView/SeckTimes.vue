<template>
    <div>
        <AddView>
            <template #name>
                <p>数据列表</p>
            </template>
            <template #btn>
                <div>
                    <el-button color="#f01af9" :dark="isDark" plain @click="dialogVisible=true">添加</el-button>
                </div>
            </template>
        </AddView>
        <el-table :data="tableData" border style="width:95%;margin:40px auto" :row-style="asd" :header-row-style="asd">
            <el-table-column prop="num" label="编号" align="center" width="180" />
            <el-table-column prop="titie" label="秒杀时间段名称" align="center" width="200" />
            <el-table-column prop="s_time" label="每日开始时间" align="center" width="240" />
            <el-table-column prop="e_time" label="每日结束时间" align="center" width="240" />
            <el-table-column label="启用" align="center" width="155">
                <template #default="scope">
                    <el-switch v-model="scope.row.statas" class="ml-2" @change="meg(scope.row)" style="
                              --el-switch-on-color: #13ce66;
                              --el-switch-off-color: #ff4949;
                            " />
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="250">
                <template #default="scope">
                    <el-button size="small" type="primary" plain @click="edit(scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" plain @click="delect(scope.row.id)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-dialog v-model="dialogVisible" title="添加时间段" width="35%" align="left">
            <el-form :model="dia_from">
                <el-form-item label="秒杀时间段名称:" label-width="120px">
                    <el-input v-model="dia_from.titie" autocomplete="off" />
                </el-form-item>
                <el-form-item label="每日开始时间" label-width="120px">
                    <el-time-picker v-model="dia_from.s_time" type="date" placeholder="请选择时间" style="width: 100%" />
                </el-form-item>
                <el-form-item label="每日结束时间" label-width="120px">
                    <el-time-picker v-model="dia_from.e_time" type="date" placeholder="请选择时间" style="width: 100%" />
                </el-form-item>
                <el-form-item label="是否启用" label-width="120px">
                    <el-radio-group v-model="dia_from.statas">
                        <el-radio label="1" size="large">启用</el-radio>
                        <el-radio label="0" size="large">禁用</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogVisible = false">取消</el-button>
                    <el-button type="primary" @click="comit()">确定</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialog" title="提示" width="30%" align="left">
            <div class="wei">
                <el-avatar src="http://icon.chrafz.com/uploads/151023/1-151023213T2X7.png" />
                <span style="margin-left: 5%; font-size: 18px">是否要删除该条数据</span>
            </div>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialog = false">取消</el-button>
                    <el-button type="primary" @click="del">确定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>

</template>
<script lang="ts" setup>
    import AddView from "@/components/AddView.vue";
    import { reactive, onMounted, ref, toRefs } from "vue"
    import $http from "@/axios/http"
    //定义请求获取秒杀表格数据
    const obj = reactive({
        asd: {
            height: 60 + "px",
            fontSize: 16 + "px",
        },
        tableData: [],
        dia_from: {},
        dialogVisible: false,
        dialog: false,
        del_id: 0,
        statas:1,
    })
    const { asd, tableData, dia_from, dialogVisible, dialog, del_id,statas } = toRefs(obj)
    // 请求的方法
    const http = async () => {
        let { data } = await $http("/market/times");
        if (data.length > 0) {
            data.forEach(elem => {
                elem.statas = elem.statas == "0" ? false : true;
            })
        }
        obj.tableData = data;
    }
    // 添加确认方法
    const comit = () => {
        dialogVisible.value = false;
        if (statas) {
            $http("/market/times_edit", obj.dia_from).then(({ data }) => {
                if (data == "修改成功") {
                    http();
                }
                alert(data);
                obj.dia_from = {};
            })
        } else {
            // 判断对象的长度是否
            if (Object.keys(obj.dia_from).length == 4) {
                $http("/market/times_add", obj.dia_from).then(({ data }) => {
                    if (data == "添加成功") {
                        http();
                    }
                    alert(data);
                    obj.dia_from = {};
                    obj.statas=1;
                })
            }
        }
    }
    const meg = (pay) => {
        $http("/market/times_meg", { statas: pay.statas, id: pay.id }).then(() => {
            http();
        })
    }
    // 编辑方法
    const edit = (pay) => {
        dialogVisible.value = true;
        let haha = Object.assign({}, pay)
        haha.statas = haha.statas == true ? "1" : "0";
        let time: string = (new Date).toLocaleDateString();
        haha.e_time = `${time}T${haha.e_time}`;
        haha.s_time = `${time}${haha.s_time}`;
        obj.dia_from = haha;
        obj.statas=0
    }
    // 删除方法
    const delect = (pay) => {
        dialog.value = true;
        del_id.value = pay;
    }
    const del = () => {
        dialog.value = false;
        $http("/market/times_del", { id: del_id.value }).then(({ data }) => {
            if (data == "删除成功") {
                http();
            }
            alert(data);
            dia_id.value = 0;
        })
    }
    onMounted(() => {
        http();
    })
</script>

<style scoped>
    .wei {
        display: flex;
        align-items: center;
    }

    .dialog-footer button:first-child {
        margin-right: 10px;
    }

    .pag_wei {
        display: flex;
        justify-content: flex-end;
    }
</style>