<template>
    <div class="common-layout">
        <el-container>
            <el-header>用来存放{{ tableData[0] }}和数据列表</el-header>
            <el-main>
                <el-table :data="tableData" border style="width: 100%" :row-style="asd" :header-row-style="asd">
                    <el-table-column prop="p_id" label="编号" align="center" width="100" />
                    <el-table-column prop="p_name" label="商品名称" align="center" width="130" />
                    <el-table-column prop="art_no" label="货号" align="center" width="140" />
                    <el-table-column prop="p_price" label="商品价格" align="center" width="150" />
                    <el-table-column prop="inventory" label="剩余数量" align="center" width="120" />
                    <el-table-column prop="price" label="秒杀价格" align="center" width="150" />
                    <el-table-column prop="num" label="秒杀数量" align="center" width="120" />
                    <el-table-column prop="pr" label="限购数量" align="center" width="100" />
                    <el-table-column prop="sort" label="排序" align="center" width="100" />
                    <el-table-column label="操作" align="center" width="180">
                        <template #default="scope">
                            <el-button size="small" type="primary" plain @click="edit(scope.row)">编辑</el-button>
                            <el-button size="small" type="danger" plain @click="delect(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
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

                <el-dialog v-model="dialogVisible" title="秒杀商品信息" width="35%" align="left">
                    <el-form :model="dia_from">
                        <el-form-item label="商品名称 :" label-width="150px">
                            <span>{{dia_from.p_name}}</span>
                        </el-form-item>
                        <el-form-item label="货号:" label-width="150px">
                            <span>{{dia_from.art_no}}</span>
                        </el-form-item>
                        <el-form-item label="商品价格 :" label-width="150px">
                            <span>{{dia_from.p_price}}</span>
                        </el-form-item>
                        <el-form-item label="秒杀价格 :" label-width="150px">
                            <el-input v-model="dia_from.price" placeholder="请输入价格" style="width:200px;">
                                <template #prepend>￥</template>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="剩余数量 :" label-width="150px">
                            <span>{{dia_from.inventory}}</span>
                        </el-form-item>
                        <el-form-item label="秒杀数量 :" label-width="150px">
                            <el-input v-model="dia_from.num" placeholder="请输入秒杀数量" style="width:200px;"></el-input>
                        </el-form-item>
                        <el-form-item label="限购数量 :" label-width="150px">
                            <el-input v-model="dia_from.pr" placeholder="请输入限购数量" style="width:200px;"></el-input>
                        </el-form-item>
                        <el-form-item label="排序 :" label-width="150px">
                            <el-input v-model="dia_from.sort" placeholder="请输入排序" style="width:200px;"></el-input>
                        </el-form-item>
                    </el-form>
                    <template #prepend>
                        <el-select v-model="select" placeholder="Select" style="width: 115px">
                            <el-option label="Restaurant" value="1" />
                            <el-option label="Order No." value="2" />
                            <el-option label="Tel" value="3" />
                        </el-select>
                    </template>
                    <template #footer>
                        <span class="dialog-footer">
                            <el-button @click="dialogVisible = false">取消</el-button>
                            <el-button type="primary" @click="comit(dia_from)">确定</el-button>
                        </span>
                    </template>
                </el-dialog>
            </el-main>
            <el-footer class="pag_wei">
                <pag />
            </el-footer>
        </el-container>
    </div>
</template>
<script>
    import $http from "@/axios/index";
    import pag from "@/components/PagingView.vue";
    export default {
        name: "SpikeComm",
        components: { pag },
        created() {
            // 根据count 是否发起请求{
            this.$store.state.page.page_count = "";
            if (this.$route.query.count > 0) {
                // 将请求的参数进行合并
                this.value = Object.assign(this.value, this.$store.state.page)
                this.page = this.$store.state.page;
                this.$store.state.page.page_count = this.$route.query.count;
                //    调用请求
                this.http(this.value)
            }

        },
        data() {
            return {
                tableData: [],
                value: {
                    time_id: this.$route.query.time_id,
                    seckill_id: this.$route.query.seckill_id
                },
                page: {},
                asd: {
                    height: 60 + "px",
                    fontSize: 16 + "px",
                },
                dia_from: {},
                dialogVisible: false,
                dialog: false,
                del_id: 0,
            }
        },
        methods: {
            http(param) {
                $http("/market/seckill_shop", param).then((data) => {
                    if (data.code != 400) {
                        data.data.forEach(elem => {
                            elem.art_no = "NO." + elem.art_no;
                            elem.p_price = "￥" + elem.p_price;
                            elem.price = "￥" + elem.price;
                        });
                        this.tableData = data.data;
                    }
                });
            },
            edit(pay) {
                //  弹出对话框，获取到当前数据
                this.dialogVisible = true;
                this.dia_from = JSON.parse(JSON.stringify(pay));
                this.dia_from.price = this.dia_from.price.slice(1);
            },
            comit(value) {
                this.dialogVisible = false;
                //  修改数据库的secill_comm表
                console.log(value);
                $http("/market/secli_comm", {
                    id: value.id,
                    price: value.price,
                    pr: value.pr,
                    sort: value.sort,
                    num: value.num
                }).then(data => {
                    if (data.code != 400) {
                        this.http(this.value);
                    }
                })
            },
            delect(pay) {
                // 1.弹出确定对话框，提示用户
                this.dialog = true;
                this.del_id = pay.id;
            },
            del() {
                this.dialog = false;
                $http("/market/seckill_comm_del", { id: this.del_id }).then((data) => {
                    if (data.code != 400) {
                        this.$store.state.page.page_count--;
                    }
                });
            },
        },
        watch: {
            page: {
                handler: function () {
                    this.value = Object.assign(this.value, this.$store.state.page)
                    /* this.http(this.page); */
                },
                deep: true,
            },
        },
    }
</script>
<style scoped>
    .pag_wei {
        display: flex;
        justify-content: flex-end;
    }
</style>