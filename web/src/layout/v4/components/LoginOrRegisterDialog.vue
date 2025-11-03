<template>
    <Dialog :show="show" :title="title" @close="closeDialogClick" :close-on-press-escape="false"
        :close-on-click-modal="false">
        <template #content>
            <div class="dialogCnt">
                <div class="logo">
                    <div class="img">
                        <img src="@/assets/nft/image/20240522182441.png" />
                    </div>
                </div>

                <h2 class="h2">
                    EARLY ACCESS MEMBERS
                </h2>

                <template v-if="isLogin == true">
                    <div class="btnBox" style="margin-top: 20px;">
                        <div class="btn" @click="logout">
                            <div class="cnt">
                                Logout
                            </div>
                        </div>
                    </div>
                    <p style="color: #ccc; cursor: pointer;text-align: center;">
                        You have logged in
                    </p>
                </template>
                <template v-else>
                    <div class="btnBox">
                        <div class="btn" @click="clickLoginBtn">
                            <div class="cnt">
                                Login Account
                            </div>
                        </div>
                    </div>

                    <div class="xy">
                        <el-checkbox v-model="form.check" @click="dialogXyVisible = !dialogXyVisible">User
                            Registration Agreement</el-checkbox>
                    </div>

                    <!-- <p style="color: #ccc; cursor: pointer;text-align: center;">
                        I don't have an account yet. Go and <span style="color: #51A7F5;"
                            @click="openEnterInvateCodeDialog">register</span>
                    </p> -->
                </template>

            </div>
        </template>
    </Dialog>
    <LoginMethodDialog ref="LoginMethodDialogRef" :title="loginTitle" :show="LoginMethodDialogShow"
        @close-dialog="closeLoginMethodDialog" />

    <EnterInvitationCodeDialog ref="EnterInvateCodeDialogRef" :show="EnterInvateCodeDialogShow"
        @close-dialog="closeEnterInvateCodeDialog" :close-on-click-modal="false" :show-close="true"
        @validate-invate-code-result="validateInvateCodeResult" />
</template>
<script lang="ts" setup>
import Dialog from '@/layout/v4/components/Dialog.vue'
import { computed, reactive, ref } from 'vue';
import { useUserStoreHook } from '@/store/modules/lhs/user';
import LoginMethodDialog from '@/layout/v4/components/LoginMethodDialog.vue'
import EnterInvitationCodeDialog from '@/layout/v4/components/EnterInvitationCodeDialog.vue'
import { showNotification } from '@/utils/utils';


const loginTitle = ref('')
const LoginMethodDialogShow = ref(false)
const closeLoginMethodDialog = () => {
    LoginMethodDialogShow.value = false
}
const openLoginMethodDialog = (title: string) => {
    loginTitle.value = title
    LoginMethodDialogShow.value = true
}

const EnterInvateCodeDialogShow = ref(false)
const closeEnterInvateCodeDialog = () => {
    EnterInvateCodeDialogShow.value = false
}
const openEnterInvateCodeDialog = () => {
    EnterInvateCodeDialogShow.value = true
}

const validateInvateCodeResult = (res) => {
    if (res) {
        openLoginMethodDialog('Register')
    }
}

const userStore = useUserStoreHook();
const isLogin = computed(() => userStore.isLogin())
// 组件相关代码
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

const form = reactive({
    check: true,
})

const dialogXyVisible = ref(false)

const clickLoginBtn = () => {
    if (form.check) {
        openLoginMethodDialog('Login')
    } else {
        showNotification('Please check and agree to the user agreement', 'notice')
    }
}

type LoginDialogType = InstanceType<typeof LoginMethodDialog>;
const LoginMethodDialogRef = ref<null | LoginDialogType>(null);

const logout = () => {
    LoginMethodDialogRef.value?.logout()
}


defineExpose({
    logout
})

</script>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";

.dialogCnt {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;

    .logo {
        .img {

            width: 200px;

            img {
                width: 100%;
            }
        }
    }

    .h2 {
        margin: 30px 0;
    }

    .xy {
        margin: 30px 0 10px 0;
    }

}

.btn {
    width: 260px;
    height: 50px;
    font-size: 24px;
    background-image: linear-gradient(153deg, #D7BC84, #CDCDCD);
}
</style>