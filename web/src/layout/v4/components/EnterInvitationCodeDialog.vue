<template>
    <Dialog :show="show" :title="title" @close="closeDialogClick" :close-on-click-modal="closeOnClickModal"
        :show-close="showClose" :close-on-press-escape="false">
        <template #content>
            <h2 class="h2">
                EARLY ACCESS MEMBERS
            </h2>
            <div class="cntBox">
                <InlineBockCode :data="resp.pasteCode" ref="pwComponentRef" @getBackInfo="getBackInfo" />
            </div>
            <div class="btnBox">
                <div class="btn">
                    <div class="cnt" @click="onSubmit">
                        Enter Invite Code
                    </div>
                </div>
            </div>
            <!-- <div class="cntBox">
                <div class="paste" @click="readText">Paste Code</div>
            </div> -->
        </template>
    </Dialog>
</template>
<script lang="ts" setup>
// 组件相关代码
import Dialog from '@/layout/v4/components/Dialog.vue'
import InlineBockCode from '@/layout/v4/components/InlineBockCode.vue'
import { modifyInvitation, checkInvationCodeAvailable } from '@/api/lhs/user'
import { showNotification } from '@/utils/utils';
import { computed, reactive, ref } from 'vue';
const pwComponentRef = ref(null)
const prop = defineProps({
    title: {
        type: String,
        default: ''
    },
    show: {
        type: Boolean,
        default: false
    },
    closeOnClickModal: {
        type: Boolean,
        default: false
    },
    showClose: {
        type: Boolean,
        default: true
    }
})
const emit = defineEmits(['closeDialog', 'validateInvateCodeResult'])
const closeDialogClick = (res) => {
    emit('closeDialog', res)
}
const resp = reactive({
    pasteCode: '',
    code: '',
    taskId: ''
})
const getBackInfo = (res) => {
    resp.code = res;
}
import { useUserStoreHook } from '@/store/modules/lhs/user';
import { toUrl } from '@/utils/router';
const useUserStore = useUserStoreHook();
const isLogin = computed(() => useUserStore.isLogin())
const onSubmit = () => {
    if (resp.code.length == 5) {
        if (isLogin.value == false) {
            // 检查验证码是否有效
            checkInvationCodeAvailable({ code: resp.code }).then(() => {
                // 检查通过，保存shareCode并执行登录
                localStorage.setItem('shareCode', resp.code)
                showNotification("Invitation code is valid, registration is automatically bound", 'success')
                closeDialogClick(false)
                emit('validateInvateCodeResult', true)
            }).catch(() => {
                localStorage.removeItem('shareCode')
            })
        } else {
            modifyInvitation({ code: resp.code, task_id: resp.taskId }).then(async (res) => {
                console.log(res);
                showNotification("Invitation binding successful.", "success")
                closeDialogClick(false)
                await useUserStore.getMemberInfo()
                toUrl('/')
            })
        }

    } else {
        showNotification("Please enter the correct invitation code.", "notice")
    }
}
</script>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";

.h2 {
    font-family: Poppins;
    font-weight: 500;
    font-size: 21px;
    color: #000;
    text-align: center
}

.cntBox {
    padding: 30px 0 0 0;
}

.btn {
    width: 220px;
    height: 42px;
    background-image: linear-gradient(153deg, #D7BC84, #CDCDCD);
}

.paste {
    text-align: center;
    font-family: Poppins;
    font-weight: 400;
    font-size: 18px;
    color: #2A94E5;
    line-height: 18px;
    cursor: pointer;
}

.btnBox {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-top: 30px;
}
</style>