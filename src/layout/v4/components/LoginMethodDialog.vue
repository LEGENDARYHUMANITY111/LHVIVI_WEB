<template>
    <Dialog :show="show" :title="title" @close="closeDialogClick">
        <template #content>
            <div>
                <div class="loginBox" @click="loginX">
                    <div class="img">
                        <img src="@/assets/lhs/v4/image/login-twitter-x-light.svg" />
                    </div>
                    <div class="name">
                        X
                    </div>
                </div>

                <div class="loginBox" @click="loginGoogle">
                    <div class="img">
                        <img src="@/assets/lhs/v4/image/login-google-active.svg" />
                    </div>
                    <div class="name">
                        Google
                    </div>
                </div>

                <div class="loginBox" @click="loginDiscord">
                    <div class="img">
                        <img src="@/assets/lhs/v4/image/login-discord-active.svg" />
                    </div>
                    <div class="name">
                        Discord
                    </div>
                </div>

                <!-- <div class="loginBox" @click="loginMetamask">
                    <div class="img">
                        <img src="@/assets/lhs/v4/image/MetaMask.png" />
                    </div>
                    <div class="name">
                        Metamask
                    </div>
                </div> -->

                <!-- <div class="loginBox" @click="logout">
                    <div class="img">
                        <img src="@/assets/lhs/v4/image/MetaMask.png" />
                    </div>
                    <div class="name">
                        Logout(Test Item Without Prod)
                    </div>
                </div> -->
            </div>
        </template>
    </Dialog>

    <Web3authNoModalSol ref="Web3authNoModalSolRef" msg="login" />
    <Web3authNoModalEth ref="Web3authNoModalEthRef" msg="login" />
</template>
<script lang="ts" setup>
// 组件相关代码
import Dialog from '@/layout/v4/components/Dialog.vue'
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
    emit('closeDialog', res)
}


// 登录相关代码
import Web3authNoModalSol from '@/layout/v4/components/Web3authNoModalSol.vue'
import Web3authNoModalEth from '@/layout/v4/components/Web3authNoModalEth.vue'
import { ref } from 'vue';

type LoginType = InstanceType<typeof Web3authNoModalSol>;
const Web3authNoModalSolRef = ref<null | LoginType>(null);

type LoginType2 = InstanceType<typeof Web3authNoModalEth>;
const Web3authNoModalEthRef = ref<null | LoginType2>(null);

const loginGoogle = () => {
    Web3authNoModalSolRef.value?.loginGoogle()
}

const loginX = () => {
    Web3authNoModalSolRef.value?.loginX()
}

const loginDiscord = () => {
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

defineExpose({
    logout
})

</script>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";

.loginBox {
    border: 1px solid #383733;
    padding: 10px 15px;
    display: flex;
    border-radius: 20px;
    align-items: center;
    margin-top: 20px;
    cursor: pointer;
    //background-color: #000;
    //color: #fff;

    .img {
        width: 25px;
        height: 25px;
        border-radius: 32px;
        background-color: #000;
        padding: 5px;
        margin-right: 15px;

        img {
            width: 100%;
        }
    }
}

.loginBox:hover {
    border-color: #666;
    background-color: #000;
    color: #fff;
}
</style>