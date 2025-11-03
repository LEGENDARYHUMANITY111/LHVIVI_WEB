<template>
    <div class="minHeight" :style="{ height: minHeight + 'px' }">
        <Dialog :show="true" title="" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false">
            <template #content>
                <div class="dynamicImg">

                    <template v-if="resp.result.status == 0">
                        <div class="spinWrap">
                            <div class="spinnerImage p20">
                                <img src="@/assets/nft/image/20240522182441.png" />
                            </div>
                            <div class="loader"></div>
                        </div>
                        <div class="loadingMessage">{{ resp.result.title }}</div>

                    </template>

                    <template v-else-if="resp.result.status == 1">
                        <div class="spinWrap">
                            <div class="spinnerImage">
                                <img src="@/assets/nft/image/success.png" />
                            </div>
                        </div>
                        <div class="loadingMessage">{{ resp.result.title }}</div>

                    </template>

                    <template v-else-if="resp.result.status == -1">
                        <div class="spinWrap">
                            <div class="spinnerImage">
                                <img src="@/assets/nft/image/error.png" />
                            </div>
                        </div>
                        <div class="loadingMessage">{{ resp.result.title }}</div>

                    </template>

                </div>

                <div class="mintdialoginfo">

                    <div>{{ resp.result.message }}</div>

                </div>

                <div class="dialogBtnBox" v-if="status != 0">
                    <el-button size="large" @click="toUrl('/user')">back</el-button>
                </div>

            </template>

        </Dialog>
    </div>
</template>

<script lang="ts" setup>
const minHeight = window.innerHeight - 110;

import Dialog from '@/layout/v5/components/Dialog.vue'
import { ref, reactive } from "vue"

import { toUrl } from '@/utils/router'

import { useRouter } from 'vue-router'
const router = useRouter()

const resp = reactive({
    result: {
        status: 0,
        title: 'Confirming',
        message: 'Confirming pay result,please waiting',
    }
})

import { getStripePayResult } from '@/api/lhs/user'

if (Object.keys(router.currentRoute.value.query).length > 0) {
    getStripePayResult(router.currentRoute.value.query).then((res) => {
        resp.result = res
    })
}


const status = ref(-1)
</script>

<style lang="scss" scoped>
@import "/src/assets/v5/css/common.scss";

.dynamicImg {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
}

.spinWrap {
    width: 120px;
    top: 42%;
    left: 50%;
    text-align: center;
}

.spinnerImage {
    height: 120px;
    width: 120px;
    position: absolute;
    top: 0;
    opacity: 1;
    border-radius: 110px;
    filter: alpha(opacity=100);

    img {
        width: 100%;
        margin: 0 auto;
    }
}

.p20 {
    padding: 20px;
    width: 80px;
    height: 80px;
    margin-top: 5px;
    opacity: 0.6;
}

.loader {
    position: absolute;
    left: 50%;
    margin-left: -65px;
    border: 5px solid #cbcbca;
    border-top: 5px solid #000;
    border-radius: 50%;
    width: 120px;
    height: 120px;
    display: inline-block;
    animation: spin 0.7s linear infinite;
}

.loadingMessage {
    box-sizing: border-box;
    width: 100%;
    margin-top: 145px;
    text-align: center;
    z-index: 100;
    outline: none;
    color: #686565;
}

.mintdialoginfo {
    padding: 30px;
    border-radius: 10px;
    background-color: #fff;
    margin: 0 auto;
    margin-top: 30px;
    line-height: 30px;
    word-break: break-all;

    .solscan {
        display: flex;
        align-items: center;

        .share {
            width: 20px;
            margin-left: 10px;
        }
    }
}

.dialogBtnBox {
    margin-top: 50px;
    text-align: right;
}



@keyframes spin {
    0% {
        transform: rotate(0deg);
        //border-color: red;
    }

    100% {
        transform: rotate(360deg);
        //border-color: green
    }
}

.oveBg {
    background-color: rgb(0, 0, 0, 0.9);
}

@media screen and (max-width: 800px) {
    .dialog {
        width: calc(100% - 40px);
    }
}
</style>
