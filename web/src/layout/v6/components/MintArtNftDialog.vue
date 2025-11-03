<template>
    <el-dialog class="dialogArt2" :model-value="show" width="600" :title="title" modal-class="oveBg"
        :close-on-click-modal="closeOnClickModal" :show-close="showClose" :close-on-press-escape="closeOnPressEscape">
        <div class="dynamicImg">

            <template v-if="status == 0">
                <div class="spinWrap">
                    <div class="spinnerImage p20">
                        <img src="@/assets/nft/image/20240522182441.png" />
                    </div>
                    <div class="loader"></div>
                </div>
                <div class="loadingMessage">Waiting...</div>

            </template>

            <template v-else-if="status == 1">
                <div class="spinWrap">
                    <div class="spinnerImage">
                        <img src="@/assets/nft/image/success.png" />
                    </div>
                </div>
                <div class="loadingMessage">Successfully</div>

            </template>

            <template v-else-if="status == -1">
                <div class="spinWrap">
                    <div class="spinnerImage">
                        <img src="@/assets/nft/image/error.png" />
                    </div>
                </div>
                <div class="loadingMessage">Failure</div>

            </template>

        </div>

        <div class="mintdialoginfo" v-if="info.length > 0">

            <div v-for="(item, index) in info">{{ item.message }}</div>


        </div>

        <div class="dialogBtnBox" v-if="status != 0">
            <el-button size="large" @click="closeDialog">Close</el-button>
            <!-- <el-button v-if="status == 1" style="background-color: #000; height: 40px;" size="large" type="primary"
                @click="onClickNextBtn">Mint
                Next</el-button> -->
        </div>

        <slot name="content" />
    </el-dialog>

    <MintNFT ref="mintNftRef" @callback="mintNftCallback" :show="show" />

</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import MintNFT from '@/layout/v6/components/MintNft.vue';

const mintNftRef = ref(null)
const status = ref(0);
const info = computed(() => mintNftRef.value?.MessageArrayExpose)
//const info = ref('')
const loginPublicKey = computed(() => mintNftRef.value?.walletPublicKey)
const show = ref(false)

const emit = defineEmits(['nextBtn', 'mintResult']);
const onClickNextBtn = () => {
    emit('nextBtn')
    closeDialog()
}
const closeDialog = () => {
    show.value = false
}

const prop = defineProps({
    title: {
        type: String,
        default: ''
    },
    class: {
        type: String,
        default: ''
    },
    closeOnClickModal: {
        type: Boolean,
        default: true
    },
    showClose: {
        type: Boolean,
        default: true
    },
    closeOnPressEscape: {
        type: Boolean,
        default: true
    },
    width: {
        type: String,
        default: '425px'
    },
    height: {
        type: String,
        default: '100px'
    },
    fontSize: {
        type: String,
        default: '29px'
    },
    fontFamily: {
        type: String,
        default: 'Poppins'
    },
    backgroundImage: {
        type: String,
        default: 'linear-gradient(153deg, #D7BC84, #CDCDCD)'
    },
    disabled: {
        type: Boolean,
        default: false
    },
    loading: {
        type: Boolean,
        default: false
    }
})

const mintArtNft = (id: number,payCoin:string,payAmount:number,orginPrice:number,discountPrice:number) => {
    show.value = true
    mintNftRef.value?.mintArtNft(id,payCoin,payAmount,orginPrice,discountPrice);
}

const connectWallet = () => {
    mintNftRef.value?.connectWallet();
}

const disconnectWallet = () => {
    mintNftRef.value?.disconnectWallet();
}

const burnNftWithUsdtPayment = (mintAddress:string,tokenAmount:number,recipientAddress:string) => {
    show.value = true
    mintNftRef.value?.burnNftWithUsdtPayment(mintAddress,tokenAmount,recipientAddress);
}

const mintNftCallback = (res) => {
    console.log("mintNftCallback",res)
    if ("status" in res) {
        status.value = res.status;
    }
    if ("message" in res) {
        info.value = res.message
    }
    emit('mintResult', {
        status: res.status,
        message: res.message || '',
        data: res.data
    })
}

watch(show, (newVal, oldVal) => {
    console.log('new', newVal)
    console.log('old', oldVal)
    if (newVal) {
        console.log("watch mintnft dialog show", show);

        status.value = 0;
    }
}
)

defineExpose({
    connectWallet,
    loginPublicKey,
    mintArtNft,
    disconnectWallet,
    burnNftWithUsdtPayment
})

</script>

<style lang="scss" scoped>
.dialogArt2 {
    color: #000;

    .el-dialog__title {
        color: #000;
        font-size: 18px;
        font-family: Poppins;
    }

    .el-dialog__body {
        color: #000;
    }
}

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
    .dialogArt2 {
        width: calc(100% - 40px);
    }
}
</style>
<style lang="scss" scoped>
//@import "/src/assets/nft/css/v4.scss";</style>