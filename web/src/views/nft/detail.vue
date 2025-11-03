<template>
    <div :style="{ minHeight: 'calc(' + height + ' - 107px - 120px)' }">

        <div class="container">

            <div class="banner2">
                <div class="bg">
                    <img class="" src="@/assets/nft/image/banner3.png" />
                </div>
                <div class="cnt">
                    <h1 class="h1">Signature Co-Branded NFTs</h1>
                    <div class="desc">
                        Don’t miss our Signature Collections developed in collaboration with world-renowned artists and
                        fashion
                        icons. These unique digital assets seamlessly blend high art with high fashion, creating an
                        unprecedented
                        digital experience.
                    </div>
                    <!-- <div style="margin-top: 30px;">
                    <Button class="btn7" @btn-click="openLoginDialog">
                        <template #default>
                            <div>
                                <img src="@/assets/nft/image/VectorWhite.png" />
                            </div>
                            <div class="txt">LAUNCHING END OF MAY</div>
                            <div>
                                <img src="@/assets/nft/image/VectorWhite.png" />
                            </div>
                        </template>
</Button>
</div> -->
                </div>
            </div>

            <div class="detail" v-if="Object.keys(resp.nftModel).length > 0">
                <div class="media">
                    <img :src="img(resp.nftModel.image)" />
                </div>
                <div class="infoBox">
                    <h1>{{ resp.nftModel.name }}</h1>
                    <div class="process">
                        <div class="titleBox">
                            <div class="title">{{ resp.nftModel.mint_pecent }}% minted</div>
                            <div>{{ resp.nftModel.minted_mum }} / {{ resp.nftModel.supply }}</div>
                        </div>
                        <div>
                            <el-progress :percentage="resp.nftModel.mint_pecent" :color="customColors"
                                :show-text="false" :stroke-width="17" />
                        </div>
                    </div>
                    <div class="infoCntBox">

                        <div class="grayBox">
                            <div class="item">
                                <div class="title">Total</div>
                                <div class="value">{{ resp.nftModel.supply }}</div>
                            </div>
                            <div class="item">
                                <div class="title">Minted</div>
                                <div class="value">{{ resp.nftModel.minted_mum }}</div>
                            </div>
                            <div class="item">
                                <div class="title">Discount</div>
                                <div class="value">
                                    <div>{{ formatMoney(resp.show_calc_mint_price, 2) }} {{ paycoin }}</div>
                                    <div class="del">
                                        {{ formatMoney(resp.show_calc_mint_origin_price, 2) }} {{ paycoin }}
                                    </div>
                                </div>
                            </div>

                            <div class="item">
                                <div class="title">Payment</div>
                                <div class="valued" v-if="'solana' in resp.solusdt">
                                    <el-radio-group v-model="paycoin" @change="payCoinChange">
                                        <el-radio-button label="SOL" value="SOL" />
                                        <el-radio-button label="USDT" value="USDT" />
                                    </el-radio-group>
                                </div>
                            </div>
                            <div class="item">
                                <div class="title">Rate</div>
                                <div class="valued" v-if="'solana' in resp.solusdt">1 Sol ≈ {{ resp.solusdt.solana.usd
                                    }} USDT
                                </div>
                            </div>
                            <div class="item">
                                <div class="title">Qty</div>
                                <div>
                                    <el-input-number v-model="mintNum" :min="1" :max="resp.nftModel.remaining_num || 1"
                                        @change="handleMintNumChange" />
                                </div>
                            </div>
                        </div>


                        <template v-if="resp.nftModel.calc_mint_status == 1 && resp.calc_mint_price > 0">

                            <template v-if="WalletLoginPublicKey">
                                <div class="btn1" @click="disconnectWallet">disconnect <span class="sub">
                                        ({{ formatWalletAddress(WalletLoginPublicKey) }})
                                    </span>
                                </div>
                            </template>
                            <template v-else>
                                <div class="btn1" @click="connectWallet">Connect Your Wallet</div>
                            </template>

                            <Button class="btn2" @btn-click="batchMintNft" :loading="mintLoading"
                                :disabled="!('solana' in resp.solusdt)">
                                <template #default>
                                    <div>{{ mintBtnText }}</div>
                                    <!-- <div>
                                        <img src="@/assets/nft/image/Group 119.png" />
                                    </div> -->
                                </template>
                            </Button>
                            <!-- <div class="mintMsg"
                                :class="resp.mintResult.status === null ? '' : (resp.mintResult.status === true ? 'msgSuccess' : 'msgError')">
                                {{ resp.mintResult.message }}
                            </div> -->

                        </template>

                        <template v-else-if="resp.nftModel.status == 1">
                            <div class="btn1">
                                <div>Solscan <span class="sub">({{
        formatWalletAddress(resp.nftModel.tx) }})</span></div>
                                <div>
                                    <img src="@/assets/nft/image/share.png" />
                                </div>
                            </div>
                            <Button class="btn2" @btn-click="getNftNext">
                                <template #default>
                                    <div>Next</div>
                                    <!-- <div>
                                        <img src="@/assets/nft/image/Group 119.png" />
                                    </div> -->
                                </template>
                            </Button>
                        </template>

                        <template v-else-if="resp.nftModel.status == -1">
                            <Button class="btn2" @btn-click="getNftNext">
                                <template #default>
                                    <div>Next</div>
                                    <!-- <div>
                                        <img src="@/assets/nft/image/Group 119.png" />
                                    </div> -->
                                </template>
                            </Button>
                        </template>



                        <div class="remark">
                            <p>Description:</p>
                            {{ resp.nftModel.description }}

                        </div>

                        <div class="remark">
                            <div>Attributes:</div>
                            <div style="padding: 20px 0;">
                                <el-tag style="margin-right: 10px;" type="info"
                                    v-for="(item, index) in resp.nftModel.attrs" :key="index">
                                    {{ item.trait_type }}: {{ item.value }}
                                </el-tag>
                            </div>
                        </div>

                        <div class="nftStatus">
                            <div class="item">
                                <p>Status</p>
                                <p class="val">{{ resp.nftModel.status_txt }}</p>
                            </div>
                            <div class="item">
                                <p>Type</p>
                                <p class="val">Genesis NFT</p>
                            </div>
                            <div class="item">
                                <p>Artist</p>
                                <p class="val">James Smith</p>
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            <div class="nftList">
                <h1>
                    Featured Nfts
                </h1>
                <div class="listBox">


                    <template v-for="(item, index) in resp.recommendNfts" :key="index">
                        <div class="item" v-if="index < 4" @click="toUrl('/detail?id=' + item.nft_hash)">
                            <div class="img">
                                <img :src="img(item.image)" />
                            </div>
                            <div class="title">
                                {{ item.name }}
                            </div>
                            <div class="attr">
                                <div class="item2">
                                    <p>Status</p>
                                    <p class="val">{{ item.status_txt }}</p>
                                </div>
                                <div class="item2">
                                    <p>Price</p>
                                    <div class="val">
                                        <div>{{ formatMoney(item.mint_origin_price, 2) }} Usd</div>
                                        <!-- <img src="@/assets/nft/image/eth-black.png" /> -->
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>



                </div>
            </div>

        </div>

    </div>
    <MintNftDialog ref="mintDialogRef" :close-on-click-modal="false" :show-close="false" :close-on-press-escape="false"
        @next-btn="nextNft" @mint-result="mintResult" />
</template>
<script lang="ts" setup>

import MintNftDialog from '@/layout/v4/components/MintNftDialog.vue'
import Button from '@/layout/v4/components/Button.vue'
import { computed, onMounted, onUnmounted, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { formatMoney, showNotification } from '@/utils/utils';

import { useUserStoreHook } from '@/store/modules/lhs/user'
import { toUrl } from '@/utils/router';
const useUserStore = useUserStoreHook();
const isLogin = computed(() => useUserStore.isLogin())

const emit = defineEmits(['showLoginDialog'])
const openLoginDialog = () => {
    emit('showLoginDialog', {})
}

import { getNftDetail, getSolUsdt, getNftAds } from '@/api/lht/nft'

const paycoin = ref('USDT')
const mintNum = ref(1);

const decimals = 2;

const payCoinChange = (selectedCoin: string) => {
    console.log('payCoinChange', selectedCoin, resp.solusdt);
    if ("solana" in resp.solusdt) {
        if (selectedCoin == 'USDT') {
            resp.calc_mint_price = resp.nftModel.mint_pay_price;
            resp.calc_mint_origin_price = resp.nftModel.mint_origin_price;
        } else {
            resp.calc_mint_price = (Math.ceil(resp.nftModel.mint_pay_price / resp.solusdt.solana.usd * 1000000) / 1000000).toFixed(decimals);
            resp.calc_mint_origin_price = (Math.ceil(resp.nftModel.mint_origin_price / resp.solusdt.solana.usd * 1000000) / 1000000).toFixed(decimals);
        }

        // 计算显示价格
        resp.show_calc_mint_price = (Math.ceil(resp.calc_mint_price * mintNum.value * 1000000) / 1000000).toFixed(decimals);
        resp.show_calc_mint_origin_price = (Math.ceil(resp.calc_mint_origin_price * mintNum.value * 1000000) / 1000000).toFixed(decimals);

        console.log("FFFFFFFFFFFFFFFFFF", resp);

    }
}

const mintDialogRef = ref(null);

const connectWallet = () => {
    if (!isLogin.value) {
        openLoginDialog()
        return
    }

    if (typeof (window.solana) == 'undefined') {

        showNotification("Please Install Phantom Wallet!", 'error');
        return;
    } else {
        mintDialogRef.value?.connectWallet()
    }


}

const disconnectWallet = () => {
    if (!isLogin.value) {
        openLoginDialog()
        return
    }
    mintDialogRef.value?.disconnectWallet()
}

const mintLoading = ref(false)
const mintBtnText = ref('Mint')
const resp = reactive({
    mintResult: {
        status: null,
        message: null,
        data: null
    },
    nftModel: {},
    nft_hash: '',
    calc_mint_price: 0, // 单个，单个主要用于计算
    calc_mint_origin_price: 0, // 单个 
    show_calc_mint_price: 0,
    show_calc_mint_origin_price: 0,
    solusdt: {

    },
    recommendNfts: []
})

const router = useRouter()
const query = computed(() => router.currentRoute.value.query)


const getNftDetailByHash = (hashId) => {
    getNftDetail({ id: hashId }).then((res) => {
        resp.nftModel = res
        // 重新计算下价格
        payCoinChange(paycoin.value)
    })
    getNftAds({}).then((res) => {
        resp.recommendNfts = res
    })
}

const getNftNext = () => {

}

const nextNft = () => {
    getNftNext()
}

if ("id" in query.value && Object.keys(query.value.id).length > 0) {
    getNftDetailByHash(query.value.id)
} else {
    getNftNext()
}

const mintNft = () => {

    if (isLogin.value) {
        //resp.mintResult.message = 'minting…'
        resp.mintResult.status = null;
        //mintBtnText.value = 'Minting…';
        if (!mintLoading.value) {
            mintLoading.value = true
            let toRecipintAddress = 'AzfrPGg4AFLR5LDnPEDvdA4jiYxKV1Ru2ZcqzLyN4kvg';
            let amount = resp.calc_mint_price;
            let nftHash = resp.nftModel.nft_hash;
            if (amount > 0) {
                mintDialogRef.value?.mintNft(nftHash, paycoin.value, toRecipintAddress, {
                    amount: amount,
                    mint_origin_price: resp.calc_mint_origin_price,
                    discount_price: (parseInt((resp.calc_mint_origin_price - amount) * 1000000) / 1000000).toFixed(4)
                })
            }
        }
    } else {
        openLoginDialog();
    }
}

const batchMintNft = () => {

    if (isLogin.value) {
        resp.mintResult.status = null;
        if (!mintLoading.value) {
            let amount = resp.calc_mint_price;
            let nftHash = resp.nftModel.nft_hash;
            if (amount > 0) {
                mintLoading.value = true
                mintDialogRef.value?.batchMintNft(nftHash, mintNum.value, paycoin.value, {
                    amount: amount,
                    mint_origin_price: resp.calc_mint_origin_price,
                    discount_price: (parseInt((resp.calc_mint_origin_price - amount) * 1000000) / 1000000).toFixed(4)
                })
            }
        }
    } else {
        openLoginDialog();
    }
}

const mintResult = (data) => {
    mintLoading.value = false
    console.log("mintResult", data)
    resp.mintResult = data
    if (resp.mintResult.status == true) {
        // mintBtnText.value = 'Mint Next';
        // resp.mintResult.message = formatWalletAddress(data.message) + ' (complated)'
        getNftDetailByHash(query.value.id)
    } else {
        mintBtnText.value = 'Mint';
    }
}



import { formatWalletAddress, img } from '@/utils/utils'

const WalletLoginPublicKey = computed(() => mintDialogRef.value?.loginPublicKey)




const height = window.innerHeight + 'px';
const bannerHeight = (window.innerWidth / 1920 * 666) + 'px'




const loginedRequest = () => {

}

loginedRequest()

watch(isLogin, (value) => {
    if (value) {
        // 已经登录，执行代码
        console.log("登录成功");
    } else {
        // 未登录，执行代码
        console.log("退出登录");
    }
    loginedRequest()
});

watch(
    () => query.value.id,
    (newPath, oldPath) => {
        // 路由变化，执行相应操作
        getNftDetailByHash(query.value.id)
    }
)


const percentage = ref(20)
const customColor = ref('#409eff')

const customColors = [
    { color: '#f56c6c', percentage: 20 },
    { color: '#e6a23c', percentage: 40 },
    { color: '#5cb87a', percentage: 60 },
    { color: '#1989fa', percentage: 80 },
    { color: '#6f7ad3', percentage: 100 },
]

const customColorMethod = (percentage: number) => {
    if (percentage < 30) {
        return '#909399'
    }
    if (percentage < 70) {
        return '#e6a23c'
    }
    return '#67c23a'
}
const increase = () => {
    percentage.value += 10
    if (percentage.value > 100) {
        percentage.value = 100
    }
}
const decrease = () => {
    percentage.value -= 10
    if (percentage.value < 0) {
        percentage.value = 0
    }
}



const solUsdt = () => {
    resp.solusdt = {}
    getSolUsdt().then(res => {
        resp.solusdt = res;
        payCoinChange(paycoin.value)
    })
}

solUsdt();

let tm;
onMounted(() => {
    tm = setInterval(() => {
        console.log(new Date())
        solUsdt()
    }, 300000);
})

onUnmounted(() => {
    if (tm) clearInterval(tm)
});


const handleMintNumChange = (value: number) => {
    console.log("handleMintNumChange ", value, mintNum.value)
    payCoinChange(paycoin.value)
}



</script>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";

.container {

    .detail {
        margin-top: 142px;
        width: 100%;
        display: flex;
        justify-content: space-evenly;

        .media {
            img {
                width: 813px;
            }
        }

        .media:hover {
            transform: scale(1.03);
            transition: all .5s ease-in-out;
        }

        .infoBox {
            width: 620px;

            .infoCntBox {
                width: calc(100% - 60px);
                padding: 30px;
                border-radius: 12px;
                border: 1px solid #E3E3E3;
                margin-top: 20px;

                .grayBox {
                    padding: 20px;
                    background-color: #F6F6F6;
                    border-radius: 12px;

                    .item {
                        display: flex;
                        justify-content: space-between;
                        margin-bottom: 30px;

                        .title {
                            font-size: 21px;
                            font-family: IBM Plex Sans;
                            font-weight: 500;
                            color: #666;
                        }

                        .value {
                            font-family: Poppins;
                            font-weight: 600;
                            font-size: 28px;
                            color: #333;
                            text-align: right;

                            .del {
                                font-size: 18px;
                                color: #ccc;
                                text-decoration: line-through;
                                font-weight: normal
                            }
                        }
                    }

                    .item:last-child {
                        margin-bottom: 0;
                    }
                }

                .btn1,
                .btn2 {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 65px !important;
                    margin-top: 30px;
                    border: 1.2px solid #24282B;
                    border-radius: 12px;
                    font-size: 24px;
                    font-family: Poppins;
                    font-weight: 600;
                    cursor: pointer;

                    .sub {
                        font-size: 16px;
                        font-weight: normal;
                        color: #ccc;
                        margin-left: 10px;
                    }

                    img {
                        margin-left: 20px;
                        width: 20px;
                    }
                }

                .btn2 {
                    background-color: #16161A !important;
                    color: #FFF;
                    width: 100%;
                }

                .btn1:hover,
                .btn2:hover {
                    transform: scale(1.03);
                    transition: transform .5s;
                }

                .mintMsg {
                    margin-top: 10px;
                    text-align: center;
                    color: #000;
                }

                .msgSucces {
                    color: green;
                }

                .msgError {
                    color: red;
                }

                .remark {
                    font-family: Poppins;
                    font-weight: 400;
                    font-size: 18px;
                    color: #000;
                    margin-top: 30px;
                }

                .nftStatus {
                    width: 100%;
                    display: flex;
                    margin-top: 30px;

                    .item {
                        flex: 4;
                        font-family: Poppins;
                        font-size: 18px;
                        font-weight: 500;
                        color: #706F6F;

                        .val {
                            font-size: 20px;
                            color: #000;
                        }
                    }
                }
            }

            .process {
                .titleBox {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 10px;
                    font-size: 20px;
                    font-family: Poppins;
                    color: #A3A3A3;

                    .title {
                        color: #000;
                        font-weight: 600;
                    }

                }
            }
        }
    }



}

@media screen and (max-width: 800px) {
    .container {
        .detail {
            flex-direction: column;

            .media {
                img {
                    width: 100%;
                }
            }
        }

        .nftList {
            margin: 30px 0;

            .listBox {
                text-align: center;
                flex-direction: column;

                .item {
                    margin-right: 0;

                    .img {
                        img {
                            width: 100%;
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 1600px) {
    .detail {
        flex-direction: column;
        align-items: center;

        .infoBox {
            width: 100% !important;
        }
    }
}
</style>