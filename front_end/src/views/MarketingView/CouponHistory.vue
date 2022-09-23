<template>
    <div class="common-layout">
        <el-container>
            <div class="wei">
                <el-table :data="tableData" border style="width: 100%" :row-style="yangshi"
                    :header-cell-style="yangshi2">
                    <el-table-column prop="cou_titie" label="优惠卷名称" align="center" width="245" />
                    <el-table-column prop="cou_type" label="优惠券类型" align="center" width="200" />
                    <el-table-column prop="cou_shop" label="可使用商品" align="center" width="215" />
                    <el-table-column prop="cou_thres" label="使用门槛" align="center" width="215" />
                    <el-table-column prop="cou_value" label="面值" align="center" width="215" />
                    <el-table-column prop="cou_states" label="状态" align="center" width="200" />
                </el-table>
            </div>
            <div class="wei">
                <el-table :data="tableData" border style="width: 100%" :row-style="yangshi"
                    :header-cell-style="yangshi2">
                    <el-table-column prop="time" label="有效期" align="center" width="245" />
                    <el-table-column prop="cou_count" label="总发行量" align="center" width="200" />
                    <el-table-column prop="cou_receive" label="已领取" align="center" width="215" />
                    <el-table-column prop="num1" label="待领取" align="center" width="215" />
                    <el-table-column prop="cou_use" label="已使用" align="center" width="215" />
                    <el-table-column prop="num2" label="未使用" align="center" width="200" />
                </el-table>
            </div>
            <el-main>
                <el-table :data="tableData2" border style="width: 100%">
                    <el-table-column prop="cou_num" label="优惠码" align="center" width="210" />
                    <el-table-column prop="cou_titie" label="领取会员" align="center" width="170" />
                    <el-table-column prop="cou_type" label="领取方式" align="center" width="180" />
                    <el-table-column prop="cou_shop" label="领取时间" align="center" width="200" />
                    <el-table-column prop="cou_thres" label="当前状态" align="center" width="150" />
                    <el-table-column prop="cou_value" label="使用时间" align="center" width="190" />
                    <el-table-column prop="cou_plat" label="订单编号" align="center" width="190" />
                </el-table>
            </el-main>
            <el-footer class="pag_wei">
                <pag />
            </el-footer>
        </el-container>
    </div>
</template>
<script>
    import $http from "@/axios/index";
    export default {
        name: "CouponHistory",
        created() {
            $http("/market/coupon_history", { id: this.$route.query.id }, "POST").then(data => {
                if (data.code != 400) {
                    this.tableData = data.data;
                    this.tableData[0].cou_thres = `满${this.tableData[0].cou_thres}元可用`;
                    this.tableData[0].cou_value = `${this.tableData[0].cou_value}元`
                    this.tableData[0].cou_states = this.tableData[0].cou_states == 1 ? "未过期" : "已过期"
                    this.tableData[0].s_time =this.tableData[0].s_time.substring(0, 10);
                    this.tableData[0].e_time = this.tableData[0].e_time.substring(0, 10);
                    this.tableData[0].time = this.tableData[0].s_time + "至" + this.tableData[0].e_time;
                    this.tableData[0].num1 = this.tableData[0].cou_count - this.tableData[0].cou_receive;
                    this.tableData[0].num2 = this.tableData[0].cou_receive - this.tableData[0].cou_use;
                }
            })
        },
        data() {
            return {
                tableData: [],
                yangshi: {
                    height: 60 + "px",
                    fontSize: "18px"
                },
                yangshi2: {
                    height: 50 + "px",
                    fontSize: "18px",
                    backgroundColor: "rgb(238, 249, 255)"
                }
            }
        },
        methods: {

        },
        watch: {

        }
    }
</script>
<style>
    .wei {
        width: 97%;
        margin: 0 auto;
        background: rgb(238, 249, 255);
    }
</style>