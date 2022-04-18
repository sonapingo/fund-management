<template>
    <div class="fillContainer">
        <div>
            <el-form :inline="true" ref="add_data">
                <el-form-item class="btnRight">
                    <el-button type="primary" size="small" icon="view" @click="handleAdd()">添加</el-button>
                </el-form-item>
            </el-form>
        </div>
        <el-table v-if="tableData.length > 0" :data="tableData" style="width: 100%" max-height="450" border>
            <el-table-column align='center' type="index" label="序号" width="70">
            </el-table-column>
            <el-table-column align='center' prop="date" label="创建时间" width="250">
                <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span style="margin-left: 10px">{{ scope.row.date }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="type" label="收支类型" width="150">
            </el-table-column>
            <el-table-column align="center" prop="describe" label="收支描述" width="180">
            </el-table-column>
            <el-table-column align="center" prop="income" label="收入" width="170">
                <template slot-scope="scope">
                    <span style="color: #00d053;">{{ scope.row.income }}</span>
                </template>
            </el-table-column>
            <el-table-column align='center' prop="expend" label="支出" width="170">
                <template slot-scope="scope">
                    <span style="color: #f56767;">{{ scope.row.expend }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="cash" label="账户现金" width="170">
                <template slot-scope="scope">
                    <span style="color:#4db3ff">{{ scope.row.cash }}</span>
                </template>
            </el-table-column>
            <el-table-column align="center" prop="remark" label="备注" width="220">
            </el-table-column>
            <el-table-column prop="operation" align="center" label="操作" fixed="right" width="320">
                <template slot-scope="scope">
                    <el-button type="warning" icon="edit" size="small" @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-button size="small" icon="delete" type="danger" @click="handleDelete(scope.$index, scope.row)">
                        删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: 'fundlist',
    data() {
        return {
            tableData: []
        }
    },
    created() {
        this.getProfile()
    },
    methods: {
        getProfile() {
            this.$axios.get('/api/profiles')
                .then(res => {
                    this.tableData = res.data
                })
                .catch(err => console.log(err))
        },
        handleEdit(index, row) {

        },
        handleDelete(index, row) {

        }
    }
}
</script>

<style scoped>
.fillContainer {
    width: 100%;
    height: 100%;
    padding: 16px;
    box-sizing: border-box;
}
</style>