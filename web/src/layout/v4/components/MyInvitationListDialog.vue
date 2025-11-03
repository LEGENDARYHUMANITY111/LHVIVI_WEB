<template>
    <Dialog :show="show" :title="title" @close="closeDialogClick">
        <template #content>
            <el-table :data="resp.data" style="width: 100%" row-class-name="rowx" cell-class-name="cellx">
                <el-table-column property="nickname" label="Name">
                    <template #default="scope" slot-scope="scope">
                        <div style="display: flex; align-items: center">
                            <el-avatar :size="32" />
                            <div class="" style="margin-left: 10px;">
                                {{ scope.row.nickname }}
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column property="point" label="Point" width="150" align="right" />
            </el-table>
        </template>
    </Dialog>
</template>
<script lang="ts" setup>
// 组件相关代码
import Dialog from '@/layout/v4/components/Dialog.vue'
import { reactive, watch } from 'vue';
import { MyInvicationPageList } from '@/api/lhs/user/types';
import { getInvicationList } from '@/api/lhs/user';
const prop = defineProps({
    title: {
        type: String,
        default: 'My Invitation List'
    },
    show: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['closeDialog'])
const closeDialogClick = (res) => {
    emit('closeDialog', res)
}

const resp = reactive<MyInvicationPageList>({
    total: 0,
    per_page: 1,
    data: [],
    current_page: 1,
    last_page: 1
});

watch(
    () => prop.show,
    (newVal, oldVal) => {
        console.log('new', newVal)
        console.log('old', oldVal)
        if (newVal) {
            getInvicationList({}).then((res) => {
                resp.data = res.data
            })
        }
    }
)
</script>
<style lang="scss">
.rowx {
    background-color: transparent !important;
}

.el-table th.el-table__cell {
    background-color: rgb(0, 0, 0) !important;
}

.cellx {
    background-color: transparent !important;
    border-bottom: 1px dashed #888C9C !important;
    padding: 10px 0 !important;
}

.el-table tr,
.el-table th.el-table__cell,
.el-table {
    background-color: transparent !important;
}

.el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
    border-bottom: 1px solid #888C9C;
}

.el-table .cell {
    line-height: normal;
}

.el-table__inner-wrapper::before {
    background-color: #888C9C;
}
</style>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";
</style>