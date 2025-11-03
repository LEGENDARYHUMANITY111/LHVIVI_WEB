<template>
    <Dialog :show="show" :title="title" @close="closeDialogClick">
        <template #content>
            <div>

                <div class="phantomBox" @click="LoginWithPhantom">
                    <img class="logo" src="@/assets/v5/image/Phantom-Logo-Black.svg" />
                </div>

                <p class="more">More login methods</p>

                <div class="morelogin">
                    <div class="item" @click="loginX">
                        <div class="img">
                            <img src="@/assets/lhs/v4/image/login-twitter-x-light.svg" />
                        </div>
                        <div class="name">
                            Twitter
                        </div>
                    </div>
                    <div class="item" @click="loginGoogle">
                        <div class="img">
                            <img src="@/assets/lhs/v4/image/login-google-active.svg" />
                        </div>
                        <div class="name">
                            Google
                        </div>
                    </div>
                </div>
            </div>
        </template>
    </Dialog>

    <Web3authNoModalSol ref="Web3authNoModalSolRef" msg="login" />
    <MintNFT ref="mintNftRef" @callback="mintNftCallback" :show="show" />

</template>
<script lang="ts" setup>
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
    emit('closeDialog', res)
}


// 登录相关代码
import Web3authNoModalSol from '@/layout/v5/components/Web3authNoModalSol.vue'
import { ref } from 'vue';

import MintNFT from '@/layout/v5/components/MintNft.vue'
const mintNftRef = ref(null)
const LoginWithPhantom = async () => {
    mintNftRef.value?.loginWithPhantom();
}
const mintNftCallback = (res) => {
    if (res.action == 'logined' && res.status == 1) {
        closeDialogClick({});
    }
}

type LoginType = InstanceType<typeof Web3authNoModalSol>;
const Web3authNoModalSolRef = ref<null | LoginType>(null);

const loginGoogle = () => {
    Web3authNoModalSolRef.value?.loginGoogle()
}

const loginX = () => {
    Web3authNoModalSolRef.value?.loginX()
}

const loginDiscord = () => {
    Web3authNoModalSolRef.value?.loginDiscord()
}

const logout = () => {
    Web3authNoModalSolRef.value?.logout()
}

defineExpose({
    logout
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

    .logo {
        max-width: 280px;
    }
}

.more {
    padding: 30px 0 10px 0;
}

.morelogin {
    display: inline-flex;

    .item {
        border: 1px solid #383733;
        border-radius: 60px;
        margin-right: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 3px 20px 3px 3px;

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
</style>