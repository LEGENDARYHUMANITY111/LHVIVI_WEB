<template>
    <Dialog :show="show" :title="title" @close="closeDialogClick">
        <template #content>
            <div class="list">
                <div class="item" v-for="(item, index) in resp.myList" :key="index">{{ item.code }}</div>
            </div>
            <div class="btnBox">
                <div class="btn" @click="copyUrl(resp.myListCopyStr)">
                    <div class="cnt">
                        Copy Url
                    </div>
                </div>
            </div>
        </template>
    </Dialog>
</template>
<script lang="ts" setup>
// 组件相关代码
import Dialog from '@/layout/v4/components/Dialog.vue'
import { reactive, watch } from 'vue';
import { InvateCode } from '@/api/lhs/user/types';
import { getMyInvateCodeList } from '@/api/lhs/user';
import { copy } from '@/utils/utils';
const prop = defineProps({
    title: {
        type: String,
        default: 'Invitation Code'
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

const resp = reactive({
    myList: <InvateCode[]>[],
    myListCopyStr: ''
})

const copyUrl = (url) => {
    if (url == '') {
        url = window.location.host + '/web'
    }
    copy(url)
}

watch(
    () => prop.show,
    (newVal, oldVal) => {
        console.log('new', newVal)
        console.log('old', oldVal)
        if (newVal) {
            getMyInvateCodeList({}).then((res) => {
                resp.myList = res
                if (resp.myList.length > 0) {
                    resp.myList.forEach((val: any) => {
                        resp.myListCopyStr = resp.myListCopyStr == '' ? val.code : resp.myListCopyStr + "\n" + val.code;
                    })
                }
            })
        }
    }
)
</script>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";

.list {
    .item {
        width: calc(100% - 40px);
        padding: 15px 20px;
        background-color: #000;
        margin-top: 10px;
        border-radius: 10px;

        font-family: Unbounded;
        font-weight: 500;
        font-size: 18px;
        color: #fff;
    }
}

.btnBox {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
}
</style>