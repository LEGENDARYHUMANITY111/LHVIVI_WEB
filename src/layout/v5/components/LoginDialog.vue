<template>
    <Dialog :show="show" :title="title" @close="closeDialogClick">
        <template #content>
            <div v-if="!userPassDialogShow">
                <div v-loading="opLoading">


                        <div class="phantomBox" @click="LoginWithPhantom">
                            <img class="logo" src="@/assets/v5/image/Phantom-Logo-Black.svg" />
                            <div class="lastUsed" v-if="lastLoginedMethod == 'phantom'">
                                <div class="tips">
                                    <div class="tip-trangle-bottom"></div>
                                    Last used
                                </div>
                            </div>
                        </div>

                        <p class="more">More login methods</p>

                        <div class="morelogin">
                            <div class="item" @click="loginX">
                                <div class="lastUsed" v-if="lastLoginedMethod == 'twitter'">
                                    <div class="tips">
                                        <div class="tip-trangle-bottom"></div>
                                        Last used
                                    </div>
                                </div>
                                <div class="img">
                                    <img src="@/assets/lhs/v4/image/login-twitter-x-light.svg" />
                                </div>
                                <div class="name">
                                    Twitter
                                </div>
                            </div>
                            <div class="item" @click="loginGoogle">
                                <div class="lastUsed" v-if="lastLoginedMethod == 'google'">
                                    <div class="tips">
                                        <div class="tip-trangle-bottom"></div>
                                        Last used
                                    </div>
                                </div>
                                <div class="img">
                                    <img src="@/assets/lhs/v4/image/login-google-active.svg" />
                                </div>
                                <div class="name">
                                    Google
                                </div>
                            </div>
                            <div class="item" @click="loginEmail">
                                <div class="lastUsed" v-if="lastLoginedMethod == 'email'">
                                    <div class="tips">
                                        <div class="tip-trangle-bottom"></div>
                                        Last used
                                    </div>
                                </div>
                                <div class="img">
                                    <img src="@/assets/lhs/v4/image/username.svg" />
                                </div>
                                <div class="name">
                                    Email
                                </div>
                            </div>

                            <div class="item" @click="loginMetamask">
                                <div class="lastUsed" v-if="lastLoginedMethod == 'metamask'">
                                    <div class="tips">
                                        <div class="tip-trangle-bottom"></div>
                                        Last used
                                    </div>
                                </div>
                                <div class="img">
                                    <img src="@/assets/lhs/v4/image/MetaMask.png" />
                                </div>
                                <div class="name">
                                    Metamask
                                </div>
                            </div>

                            <!-- <div class="loginBox" @click="logout">
                                <div class="img">
                                    <img src="@/assets/lhs/v4/image/MetaMask.png" />
                                </div>
                                <div class="name">
                                    Logout(Test Item Without Prod)
                                </div>
                            </div> -->

                        </div>
                </div>
            </div>

            <div style="display: flex; justify-content: center; flex-direction: column;" v-else>
                 <el-form
                ref="formRef"
                :model="validateForm"
                label-width="auto"
                class="demo-ruleForm"
            >
                <el-form-item
                label=""
                prop="email"
                :rules="[
                    { required: true, message: 'Please must input a valid email address' },
                    { type: 'email', message: 'Please must input a valid email address' },
                ]"
                >
                <el-input
                    v-model.email="validateForm.email"
                    autocomplete="off"
                    autosize
                    placeholder="Please must input a valid email address"
                    style="min-height: 40px;width: 100%;"
                />

                </el-form-item>

                <el-form-item
                label=""
                prop="verifyCode"
                :rules="[
                    { required: true, message: 'Email verification code must be filled in', trigger: 'blur' },
                    { pattern: /^\d{6}$/, message: 'The email verification code must be a 6-digit number', trigger: 'blur' }
                ]"
                style="margin-top:30px"
                >
                <div style="display: flex; width: 100%;">
                    <el-input
                    v-model="validateForm.verifyCode"
                    placeholder="Email verification code"
                    maxlength="6"
                    style="flex: 1; min-height: 40px;"
                    />
                    <el-button
                    :disabled="countdown > 0"
                    @click="sendCode"
                    style="margin-left: 10px; min-width: 120px; height: 40px;"
                    type="primary"
                    >
                    {{ countdown > 0 ? `${countdown} Resend` : 'Send' }}
                    </el-button>
                </div>
                </el-form-item>
            </el-form>
            <div style="margin-top: 50px;display: flex;justify-content: end;">
                <el-button @click="userPassDialogShow = false">Cancel</el-button>
                <el-button type="primary"  @click="submitForm(formRef)" :disabled="!(sendCodeSuccess===true && validateForm.verifyCode.length === 6)">
                    Login
                </el-button>
            </div>
            </div>
        </template>
    </Dialog>

    <Web3authNoModalSol ref="Web3authNoModalSolRef" msg="login" />
    <Web3authNoModalEth ref="Web3authNoModalEthRef" msg="login" />
    <MintNFT ref="mintNftRef" @callback="mintNftCallback" :show="show" />

</template>
<script lang="ts" setup>

import { computed, reactive, ref, watch,onUnmounted } from 'vue';

import { useUserStoreHook } from '@/store/modules/lhs/user'
import { sendEmailCodeApi } from '@/api/lhs/user';
const useUserStore = useUserStoreHook();
const isLogin = computed(() => useUserStore.isLogin())

// 组件相关代码
import Dialog from '@/layout/v5/components/Dialog.vue'
const prop = defineProps({
    title: {
        type: String,
        default: 'LOGIN'
    },
    show: {
        type: Boolean,
        default: false
    }
})
const emit = defineEmits(['closeDialog'])
const closeDialogClick = (res) => {
    opLoading.value = false
    emit('closeDialog', res)
}


const opLoading = ref(false)

// 登录相关代码
import Web3authNoModalSol from '@/layout/v5/components/Web3authNoModalSol.vue'
import Web3authNoModalEth from '@/layout/v5/components/Web3authNoModalEth.vue'

import MintNFT from '@/layout/v5/components/MintNft.vue'
const mintNftRef = ref(null)
const lastLoginedMethod = ref('')
const LoginWithPhantom = async () => {
    opLoading.value = true
    mintNftRef.value?.loginWithPhantom();
}
const mintNftCallback = (res) => {
    opLoading.value = false
    if (res.action == 'logined' && res.status == 1) {
        closeDialogClick({});
        localStorage.setItem('last_logined_method', 'phantom')
    }
}

const userPassDialogShow = ref(false)

type LoginType = InstanceType<typeof Web3authNoModalSol>;
const Web3authNoModalSolRef = ref<null | LoginType>(null);

type LoginType2 = InstanceType<typeof Web3authNoModalEth>;
const Web3authNoModalEthRef = ref<null | LoginType2>(null);

const loginGoogle = () => {
    opLoading.value = true
    Web3authNoModalSolRef.value?.loginGoogle()
}

const loginX = () => {
    opLoading.value = true
    Web3authNoModalSolRef.value?.loginX()
}

const loginEmail = () => {
    //
    userPassDialogShow.value = true
}

const loginDiscord = () => {
    opLoading.value = true
    Web3authNoModalSolRef.value?.loginDiscord()
}

const loginMetamask = () => {
    Web3authNoModalEthRef.value?.loginMetamask().then(() => {
        closeDialogClick(false)
    })
}

const logout = () => {
    Web3authNoModalSolRef.value?.logout()
    Web3authNoModalEthRef.value?.logout()
}


// 账号登录start

import type { FormInstance } from 'element-plus'

const formRef = ref<FormInstance>()

const validateForm = reactive({
    email: '',
    verifyCode: '',
})

const loading = ref(false)
const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
       useUserStore.storeUserLoginByLocalEmailCode(validateForm).then((res) => {
            console.log("login");
            loading.value = false;
            localStorage.removeItem('shareCode')
            closeDialogClick({})
            validateForm.email = '';
            validateForm.verifyCode = ''
        })
      console.log('submit!')
    } else {
      console.log('error submit!')
    }
  })
}


// 账号登录end


watch(
    () => prop.show,
    (newVal, oldVal) => {
        console.log(oldVal);
        opLoading.value = false
        if (newVal == true) {
            lastLoginedMethod.value = localStorage.getItem('last_logined_method') || ''
        }
    }
)

defineExpose({
    logout
})

const countdown = ref(0)
let countdownTimer: ReturnType<typeof setInterval> | null = null

const sendCodeSuccess = ref(false)
const sendCode = () => {
    const emailReg = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    if (!emailReg.test(validateForm.email)) {
        ElMessage.error('Please enter a valid email address.');
        return
    }
  // 2、请求发送邮件
  sendEmailCodeApi({email: validateForm.email}).then((res) => {
    console.log('FFFFFFFFFFFFFFFFFFF',res);
    if (res.timestamp - 5 > 0) {
        sendCodeSuccess.value = true
        countdown.value = res.timestamp
        // 3、成功则开始倒计时
        startCountdown()
    }
  })
  
}

const startCountdown = () => {
  countdownTimer && clearInterval(countdownTimer)
  countdownTimer = setInterval(() => {
    if (countdown.value > 1) {
      countdown.value--
    } else {
      clearInterval(countdownTimer!)
      countdown.value = 0
    }
  }, 1000)
}

onUnmounted(() => {
  countdownTimer && clearInterval(countdownTimer)
})

</script>
<style lang="scss" scoped>
@import "/src/assets/v5/css/common.scss";

.phantomBox {
    padding: 30px;
    box-shadow: 0 2px 8px 0 rgb(0, 0, 0, 0.15);
    border-radius: 10px;
    background-color: #fff;
    cursor: pointer;
    position: relative;

    .logo {
        max-width: 280px;
    }
}

.lastUsed {
    padding: 5px 10px;
    background-color: #f56c6c;
    color: #fff;
    font-size: 14px;
    border-radius: 10px;
    position: absolute;
    right: -10px;
    top: -30px;

    .tips {
        position: relative;

        .tip-trangle-bottom {
            position: absolute;
            bottom: -15px;
            right: 15px;
            width: 0;
            height: 0;
            border-left: 15px solid transparent;
            border-right: 15px solid transparent;
            border-top: 15px solid #f56c6c;
        }

    }
}



.more {
    padding: 30px 0 10px 0;
}

.morelogin {
    width: 100%;
    display: inline-flex;

    .item {
        border: 1px solid #383733;
        border-radius: 60px;
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3px 20px 3px 3px;
        position: relative;
        cursor: pointer;

        .img {
            width: 30px;
            height: 30px;
            border-radius: 35px;
            background-color: #000;
            padding: 5px;

            img {
                width: 100%;
            }
        }

        .name {
            margin-left: 10px;
            min-width: 70px;
        }
    }

    .item:hover {
        border-color: #666;
        background-color: #000;
        color: #fff;
    }
}

@media screen and (max-width: 860px) {
    .morelogin {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .item {
            margin-right: 0;
            margin-top: 20px;
        }
    }
}

:deep(.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover) {
    background-color: #ccc;
    border-color: #ddd;
}
</style>