<template>
    <Dialog :show="show" :title="title" @close="closeDialogClick" :close-on-click-modal="closeOnClickModal"
        :show-close="showClose" :close-on-press-escape="false">
        <template #content>
            <div>
                <div class="dialogTile">Genesis NFT</div>

                <div class="nftContent">
                    <div class="nftImage">
                        <img src="@/assets/v5/image/tmp1.jpg" />
                    </div>
                    <div class="nftDetail">
                        <div class="nftTitle">
                            Amazing digital art
                        </div>
                        <div class="progressBox">
                            <div class="progressInfo">
                                <div>50% minted</div>
                                <div>80<span class="normal"> / 160</span></div>
                            </div>
                            <el-progress :percentage="50" :stroke-width="15" color="#4C0DCECC" :show-text="false" />
                        </div>

                        <div class="detailTable">
                            <div class="item">
                                <div class="itemTile">
                                    <span class="color1">●</span> Discount
                                </div>
                                <div>
                                    <div class="discountVal">22.16 USDT</div>
                                    <div class="discount">22.16USDT</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="itemTile">
                                    <span class="color2">●</span> Payment
                                </div>
                                <div>
                                    <div class="nftPayBox">
                                        <div class="item active">SOL</div>
                                        <div class="item">USDT</div>
                                    </div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="itemTile">
                                    <span class="color3">●</span> Rate
                                </div>
                                <div>
                                    <div class="discountVal">1 Sol≈ 135.33 USDT</div>
                                </div>
                            </div>
                            <div class="item">
                                <div class="itemTile">
                                    <span class="color4">●</span> Qty
                                </div>
                                <div>
                                    <el-input-number v-model="num" :min="1" :max="10" @change="nftNumberChange" />
                                </div>
                            </div>
                        </div>

                        <div class="mintBtnBox">

                            <el-button type="btn1">
                                <div class="title">Mint</div>
                            </el-button>

                        </div>

                        <div class="nftStatus" v-if="false">
                            <div class="item">
                                <div class="key">Status</div>
                                <div class="value">Complated</div>
                            </div>
                            <div class="item">
                                <div class="key">Type</div>
                                <div class="value">Genesis NFT</div>
                            </div>
                            <div class="item">
                                <div class="key">Airist</div>
                                <div class="value">James Smith</div>
                            </div>
                        </div>

                        <div class="nftMsg" v-else>
                            Don’t miss our Signature Collections developed in collaboration with world-renowned artists
                            and fashion icons. These unique digital assets seamlessly blend high art with high fashion,
                            creating an unpre
                        </div>

                    </div>
                </div>

            </div>
        </template>
    </Dialog>
</template>
<script lang="ts" setup>
// 组件相关代码
import Dialog from '@/layout/v5/components/Dialog.vue'
import { computed, reactive, ref } from 'vue';
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
const emit = defineEmits(['closeDialog'])
const closeDialogClick = (res) => {
    emit('closeDialog', res)
}
import { useUserStoreHook } from '@/store/modules/lhs/user';
import { toUrl } from '@/utils/router';
const useUserStore = useUserStoreHook();
const isLogin = computed(() => useUserStore.isLogin())





const num = ref(1)
const nftNumberChange = (value: number) => {
    console.log(value)
}





</script>
<style lang="scss" scoped>
@import "/src/assets/v5/css/common.scss";

.dialogTile {
    font-family: Abhaya Libre ExtraBold;
    font-size: 64px;
    font-weight: 800;
    line-height: 80px;
    text-align: center;

    background-clip: text;
    -webkit-background-clip: text;
    color: transparent;
    background-image: linear-gradient(90deg, #4100F9, #C300EF 50%);
    width: fit-content;
    margin: 0 auto;

}

.nftContent {
    margin-top: 50px;
    display: flex;

    .nftImage {
        width: 585px;
        height: 780px;
        border-radius: 20px;
        overflow: hidden;
    }

    .nftDetail {
        padding: 0 30px 30px 30px;
        width: calc(100% - 585px - 60px);

        .nftTitle {
            font-family: Adobe Gothic Std;
            font-size: 48px;
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
            width: calc(100% - 60px);
            height: 330px;
            background-color: #fff;
            border-radius: 10px;
            box-shadow: 0 4px 4px 4px rgb(0, 0, 0, 0.1);
            padding: 30px;

            .item {
                display: flex;
                justify-content: space-between;
                align-items: center;
                box-shadow: 0 1px 0 0 rgb(0, 0, 0, 0.04);
                padding: 15px 0;
                min-height: 50px;

                .itemTile {
                    font-family: IBM Plex Sans;
                    font-size: 20px;
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
                    font-size: 28px;
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
                        font-size: 21px;
                        font-weight: 500;
                        padding: 0 20px;
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
            width: 60%;
        }

        .nftStatus {
            display: flex;

            .item {
                min-width: 200px;

                .key {
                    font-family: Poppins;
                    font-size: 18.01px;
                    font-weight: 500;
                    line-height: 29.88px;
                    text-align: left;
                    color: #706F6F;

                }

                .value {
                    font-family: Poppins;
                    font-size: 19.92px;
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
            text-align: left;
        }

    }
}

.el-button--btn1,
.el-button--btn2 {
    width: 100%;
    border: none;
    background-image: linear-gradient(90deg, #2600FC, #FF00EA);
    height: 64px;
    border-radius: 42px;

    .title {
        color: #fff;
        font-family: Poppins;
        font-size: 24px;
        font-weight: 500;
        line-height: 36px;
        text-align: center;
    }
}

.el-button--btn2 {
    background-image: none;
    background-color: #AEAEB2;
}
</style>