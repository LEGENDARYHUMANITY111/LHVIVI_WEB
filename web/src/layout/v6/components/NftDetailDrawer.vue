<template>
    <div>
        <el-drawer :model-value="show" size="70%" title="" custom-class="nftDrawer" :direction="direction"
            :before-close="closeDrawerClick">
            <template #header>
                <template v-if="Object.keys(resp.nftDetail).length > 0">
                    <div>
                        <div class="nftImage">
                            <img :src="resp.nftDetail.ipfs_image" v-if="resp.nftDetail.ipfs_image" />
                            <img src="@/assets/v5/image/tmp1.jpg" v-else />
                        </div>
                    </div>
                </template>
            </template>
            <div>
                <div class="nftContent">
                    <template v-if="Object.keys(resp.nftDetail).length > 0">
                        <div class="nftDetail">
                            <div class="nftTitle">
                                {{ resp.nftDetail.name }}
                            </div>
                            <div class="progressBox">
                                <div class="progressInfo">
                                    <div>{{ resp.nftDetail.minted_progress }}% minted</div>
                                    <div>{{ resp.nftDetail.minted_num }}<span class="normal"> / {{
            resp.nftDetail.planned_nft_num }}</span></div>
                                </div>
                                <el-progress :percentage="resp.nftDetail.minted_progress" :stroke-width="15"
                                    color="#4C0DCECC" :show-text="false" />
                            </div>

                            <div class="detailTable">
                                <div class="item">
                                    <div class="itemTile">
                                        <span class="color1">●</span> Discount
                                    </div>
                                    <div>
                                        <div class="discountVal">
                                            {{ formatMoney((resp.nftDetail.price.pay[resp.nftDetail.pay_coin] *
            resp.nftDetail.mint_amount), 2) }} {{
                resp.nftDetail.price.unit[resp.nftDetail.pay_coin] }}
                                        </div>
                                        <div class="discount">
                                            {{ formatMoney(resp.nftDetail.price.orign[resp.nftDetail.pay_coin] *
            resp.nftDetail.mint_amount, 2) }} {{
                resp.nftDetail.price.unit[resp.nftDetail.pay_coin] }}
                                        </div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="itemTile">
                                        <span class="color2">●</span> Pay
                                    </div>
                                    <div>
                                        <el-radio-group v-model="resp.nftDetail.pay_coin">
                                            <el-radio-button label="SOL" />
                                            <el-radio-button label="USDT" />
                                            <!-- <el-radio-button label="Credit Card" /> -->
                                        </el-radio-group>
                                        <!-- <div class="nftPayBox">
                                        <div class="item active">SOL</div>
                                        <div class="item">USDT</div>
                                    </div> -->
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="itemTile">
                                        <span class="color3">●</span> Rate
                                    </div>
                                    <div>
                                        <div class="discountVal">1 Sol≈ {{ resp.nftDetail.price.sol_usdt }} USDT</div>
                                    </div>
                                </div>
                                <div class="item">
                                    <div class="itemTile">
                                        <span class="color4">●</span> Qty
                                    </div>
                                    <div>
                                        <el-input-number v-model="resp.nftDetail.mint_amount" :min="1"
                                            :max="resp.nftDetail.max_available_amount > 0 ? (resp.nftDetail.max_available_amount > 5 ? 5 : resp.nftDetail.max_available_amount) : 1" />
                                    </div>
                                </div>
                            </div>

                            <div class="mintBtnBox">

                                <el-button type="btn1"
                                        :disabled="!(resp.nftDetail.summary_status == 1) || !isLogin || resp.nftDetail.minted_num >= resp.nftDetail.asynced_nft_num"
                                        @click="mintNft(resp.nftDetail)">
                                        <div class="title">Mint</div>
                                    </el-button>

                            </div>

                            <div class="nftStatus" v-if="!(resp.nftDetail.summary_status == 1)">
                                <div class="item">
                                    <div class="key">Status</div>
                                    <div class="value">{{ resp.nftDetail.frontend_status_text }}</div>
                                </div>
                                <div class="item">
                                    <div class="key">Type</div>
                                    <div class="value">{{ resp.nftDetail.page_type}}</div>
                                </div>
                                <div class="item">
                                    <div class="key">Airist</div>
                                    <div class="value">{{resp.nftDetail.page_artist}}</div>
                                </div>
                            </div>

                            <div class="nftMsg" v-else>
                                Don’t miss our Signature Collections developed in collaboration with world-renowned
                                artists
                                and fashion icons. These unique digital assets seamlessly blend high art with high
                                fashion,
                                creating an unpre
                            </div>

                        </div>
                    </template>
                </div>

            </div>

        </el-drawer>
        <MintNftDialog ref="mintDialogRef" :close-on-click-modal="false" :show-close="false"
            :close-on-press-escape="false" @mint-result="mintResult" />

            <!--信用卡弹窗提示 start-->
        <el-dialog
            v-model="dialogVisible"
            title="Pay Message"
            width="500"
            align-center
            :before-close="handleClose"
            :close-on-click-modal="false"
            :close-on-press-escape="false"
            :show-close="!goLoading"
        >
            <span>
                After successful payment, NFT will be casted to your user center through the backend, which takes approximately 3-5 minutes
            </span>
            <template #footer>
            <div class="dialog-footer">
                <el-button @click="dialogVisible = false" :disabled="goLoading">Cancel</el-button>
                <el-button type="primary" @click="goPay" :loading="goLoading">
                Go Pay
                </el-button>
            </div>
            </template>
        </el-dialog>
        <!--信用卡弹框提示 end-->
    </div>
</template>
<script lang="ts" setup>

import { ElMessageBox } from 'element-plus'

import { getStripeProxyMintPayUrl } from '@/api/lhs/user';

const dialogVisible = ref(false)
const goLoading = ref(false);
const handleClose = (done: () => void) => {
  ElMessageBox.confirm('The NFT you have selected has great collectible value, don\'t miss it!',{
    closeOnClickModal: false,
    showClose: false
  })
    .then(() => {
      
    })
    .catch(() => {
      done()
    })
}

const goPay = () => {
    goLoading.value = true
    getStripeProxyMintPayUrl({mint_amount: resp.nftDetail.mint_amount,collect_id:resp.nftDetail.id}).then((res) => {
        window.location.href = res.url
    }).catch((e) => {
        goLoading.value = false
    })
}

import type { DrawerProps } from 'element-plus'


const direction = ref<DrawerProps['direction']>('btt')
// const handleClose = (done: () => void) => {
//     ElMessageBox.confirm('Are you sure you want to close this?')
//         .then(() => {
//             done()
//         })
//         .catch(() => {
//             // catch error
//         })
// }


















// 组件相关代码
import { computed, reactive, ref, watch } from 'vue';
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
    },
    categoryId: {
        type: Number,
        default: 0
    },
    nftId: {
        type: Number,
        default: 0
    }
})
const emit = defineEmits(['closeDrawer'])
const closeDrawerClick = (res) => {
    emit('closeDrawer', res)
}
import { useUserStoreHook } from '@/store/modules/lhs/user';
import { toUrl } from '@/utils/router';
const useUserStore = useUserStoreHook();
const isLogin = computed(() => useUserStore.isLogin())





import { getCollections } from '@/api/lht/nft'
import { formatMoney, img } from '@/utils/utils';
const resp = reactive({
    nftDetail: {}
})
watch(
    () => prop.show,
    (newVal, oldVal) => {
        console.log(oldVal);
        if (newVal == true) {
            getNftDetail()
        }
    }
)


const getNftDetail = () => {
    getCollections({ id: prop.categoryId, nft_id: prop.nftId }).then((res) => {
        resp.nftDetail = res[0] || {}
    })
}


// mint

import MintNftDialog from '@/layout/v5/components/MintNftDialog.vue'
const mintDialogRef = ref(null);
const mintNft = (collectModel: Object) => {
    if (collectModel.pay_coin == 'Credit Card') {
        dialogVisible.value = true
    } else {
        // 用合集ID，取对应数量的NFT用于铸造
        mintDialogRef.value?.batchMintNft(collectModel)
    }
}

const mintResult = (data) => {
    console.log("mintResult", data)
    getNftDetail()
}




</script>

<style lang="scss">
.nftDrawer {
    overflow: visible !important;

    .nftImage {
        width: 120px;
        height: 160px;
        border-radius: 10px;
        overflow: hidden;
        position: absolute;
        top: -90px;
        z-index: 9999;

        img {
            width: 100%;
        }
    }

    .el-drawer__close-btn {
        justify-content: end
    }
}
</style>

<style lang="scss" scoped>
@import "/src/assets/v5/css/common.scss";

.nftDrawer {
    .nftContent {
        display: flex;
        flex-direction: column;



        .nftDetail {
            width: 100%;

            .nftTitle {
                font-family: Adobe Gothic Std;
                font-size: 36px;
                font-weight: 700;
                text-align: left;
            }

            .progressBox {
                margin: 20px 0 30px 0;

                .progressInfo {
                    display: flex;
                    justify-content: space-between;
                    margin: 10px 0;

                    font-family: Poppins;
                    font-size: 20px;
                    font-weight: 600;
                    text-align: left;

                    .normal {
                        color: #A3A3A3;

                    }

                }
            }

            .detailTable {
                width: calc(100% - 20px);
                height: 230px;
                background-color: #fff;
                border-radius: 10px;
                box-shadow: 0 4px 4px 4px rgb(0, 0, 0, 0.1);
                padding: 10px;

                .item {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    box-shadow: 0 1px 0 0 rgb(0, 0, 0, 0.04);
                    padding: 10px 0;
                    min-height: 30px;

                    .itemTile {
                        font-family: IBM Plex Sans;
                        font-size: 16px;
                        font-weight: 500;

                        .color1 {
                            color: #5269F8;
                        }

                        .color2 {
                            color: #9DC4FF;
                        }

                        .color3 {
                            color: #8403B6;
                        }

                        .color4 {
                            color: #B775F8;
                        }
                    }

                    .discountVal {
                        font-family: Poppins;
                        font-size: 18px;
                        font-weight: 600;
                        line-height: 32px;
                    }

                    .discount {
                        font-family: Poppins;
                        font-size: 14px;
                        font-weight: 400;
                        text-align: right;
                        text-decoration: line-through;
                        color: #333333;
                        line-height: 32px;
                    }

                    .nftPayBox {
                        border-radius: 10px;
                        overflow: hidden;
                        display: flex;

                        .item {
                            font-family: IBM Plex Sans;
                            font-size: 16px;
                            font-weight: 500;
                            padding: 0 15px;
                            background-color: #F5F5F5;
                        }

                        .item.active {
                            background-color: #8557E4;
                            color: #fff;
                        }
                    }
                }
            }

            .mintBtnBox {
                margin: 50px auto;
                width: 80%;
            }

            .nftStatus {
                display: flex;

                .item {
                    min-width: 120px;

                    .key {
                        font-family: Poppins;
                        font-size: 14px;
                        font-weight: 500;
                        line-height: 29.88px;
                        text-align: left;
                        color: #706F6F;

                    }

                    .value {
                        font-family: Poppins;
                        font-size: 16px;
                        font-weight: 500;
                        line-height: 29.88px;
                        text-align: left;

                    }
                }
            }

            .nftMsg {
                font-family: Poppins;
                font-size: 18px;
                font-weight: 400;
                line-height: 24px;
                text-align: center;
            }

        }
    }
}



.el-button--btn1,
.el-button--btn2 {
    width: 100%;
    border: none;
    background-image: linear-gradient(90deg, #2600FC, #FF00EA);
    height: 54px;
    border-radius: 42px;

    .title {
        color: #fff;
        font-family: Poppins;
        font-size: 22px;
        font-weight: 500;
        line-height: 36px;
        text-align: center;
    }
}

.el-button--btn2 {
    background-image: none;
    background-color: #AEAEB2;
}

.el-button--btn1.is-disabled,
.el-button--btn2.is-disabled {
    background-image: none;
    background-color: #AEAEB2;
}
</style>