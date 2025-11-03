<template>
    <Dialog :show="show" :title="title" @close="closeDialogClick">
        <template #content>

            <h2>Did you save your Wallet PrivateKey?</h2>
            <ul class="desc">
                <li>Save it in a secure location</li>
                <li>If security has been compromised, regenerate it</li>
                <li>Treat it like a password or a set of keys</li>
                <li>DO NOT store it in public places or shared docs</li>
            </ul>

            <div class="list">
                <div class="item">{{ resp.showTxt }}</div>
            </div>
            <div class="btnBox" v-if="resp.token.length > 10">
                <div class="btn" @click="exportPrivateKey">
                    <div class="cnt">
                        Export, copy
                    </div>
                </div>
            </div>
        </template>
    </Dialog>
</template>
<script lang="ts" setup>
// 组件相关代码
import Dialog from '@/layout/v4/components/Dialog.vue'
import { computed, reactive, ref, watch } from 'vue';
import { getMemberExtend } from '@/api/lhs/user';
import { copy, showNotification } from '@/utils/utils';
import bs58 from "bs58";

import { useUserStoreHook } from '@/store/modules/lhs/user'
const useUserStore = useUserStoreHook();
const isLogin = computed(() => useUserStore.isLogin())

const prop = defineProps({
    title: {
        type: String,
        default: ''
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
    token: '',
    showTxt: '***********'
})

const exportPrivateKey = () => {
    if (resp.token.length > 32) {
        const base58privatekey = bs58.encode(Buffer.from(resp.token, "hex"))

        copy(base58privatekey)
    } else {
        showNotification("export private key fail", 'error')
    }
}

watch(
    () => prop.show,
    (newVal, oldVal) => {
        console.log('new', newVal)
        console.log('old', oldVal)
        if (newVal && isLogin.value) {
            getMemberExtend({}).then((res) => {
                resp.token = res.token
                resp.showTxt = (res.token.substr(0, 4) + '***' + res.token.substr(res.token.length - 4, 4))
            })
        }
    }
)
</script>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";

.desc {
    li {
        padding: 5px 0;
    }
}

.list {
    margin-top: 30px;

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