<template>
    <div>

        <div class="artContenter" style="min-height: 1000px;">


            <div class="headerBox">
                <div class="headerBg"></div>
                <div class="bannerBox">
                    <div class="bimg"></div>
                    <div class="cnt1">
                        <div class="h1">
                            長坂 真護（NAGASAKA MAGO）
                        </div>
                        <div class="desc">
                            ARTIST <br />
                            Representative Director of MAGO CREATION Ltd <br />
                            Representative Director of MAGO MOTORS JAPAN Ltd <br />
                            MAGO MOTORS LTD CEO <br />
                            IU Information Management and Innovation University Visiting Professor
                        </div>
                    </div>
                    <div class="cnt2">
                        <div class="cnt2Box">
                            <div class="h1">
                                About NFT 
                            </div>
                            <div class="desc">
                                In addition, if MAGO's reputation as an artist is enhanced through these activities, it is not impossible for the value of the artworks purchased to increase by 100 times compared to when they were purchased.
                                In the past, MAGO sold paintings on the streets of New York for $300, but now they have a value of $30000 among collectors.
                                Ownership of Ghanaian artworks=
                                Culture possesses art pieces
                                Economic investment enhances the value of art
                                The Development of Slums in Society

                                <div class="cnt3"></div>
                            </div>
                        </div>
                        
                    </div>
                </div>
            </div>

            <div class="cnt4">
                <div class="htitle">
                    <div class="bgl"></div>
                    <div class="txt">
                        ABOUT NFT
                    </div>
                    <div class="bgr"></div>
                </div>
                <div class="desc">
                    In addition, if MAGO's reputation as an artist is enhanced through these activities, it is not impossible for the value of the artworks purchased to increase by 100 times compared to when they were purchased.
In the past, MAGO sold paintings on the streets of New York for $300, but now they have a value of $30000 among collectors.
Ownership of Ghanaian artworks=
Culture possesses art pieces
Economic investment enhances the value of art
The Development of Slums in Society
                </div>
            </div>

            <div class="artCntBox">
                <div class="cnt5">
                    <div class="htitle">
                        <div class="bgl"></div>
                        <div class="txt">
                            NFT
    artwork display
                        </div>
                        <div class="bgr"></div>
                    </div>
                    <div class="NftBox">

                        <template v-for="(item, index) in resp.data" :key="index">
                            <div class="nftItem">
                                <div class="nftImg">
                                    <img :src="img(item.image||'')" />
                                    <div class="gjFlag">
                                        <img src="@/assets/v5/image/artwork_icon_01.png" />
                                    </div>
                                </div>
                                <div class="nftTitleBox">
                                    <div class="left">{{formatMoney(item.mint_usdt,2)}}USTD</div>
                                    <div class="right" :class="{disabled:item.minted_member_id>0}" @click="showArtNftDetail(item.id)" v-loading="getArtNftLoadingId==item.id">
                                        <img src="@/assets/v5/image/artwork_icon_gouwuche.png" />
                                    </div>
                                </div>
                            </div>
                        </template>

                    </div>

                    <div class="artCntPagerBox">
                        <Button text-color="#000" class="main-btn widthbtn btnThemes4" @btn-click="LoadMore">
                            Load More →
                        </Button>
                    </div>

                </div>
            </div>

            <div class="artCntBox">
                <div class="cnt5">
                    <div class="htitle">
                        <div class="bgl"></div>
                        <div class="txt">
                            NFT
Rights and Prices
                        </div>
                        <div class="bgr"></div>
                    </div>
                    <div class="txtImgBox">
                        <div class="left">
                            Information waiting to be replaced
In addition, if MAGO's reputation as an artist is enhanced through these activities, it is not impossible for the value of the artworks purchased to increase by 100 times compared to when they were purchased.
In the past, MAGO sold paintings on the streets of New York for $300, but now they have a value of $30000 among collectors.
Ownership of Ghanaian artworks=
Culture possesses art pieces
Economic investment enhances the value of art
The Development of Slums in Society
This is the spirit of sustainable capitalism. 
Economic investment enhances the value of art
The Development of Slums in Society
This is the spirit of sustainable capitalism. 
                        </div>
                        <div class="right">
                            <img src="@/assets/v5/image/rights_pic_01.png" />
                        </div>
                    </div>
                    
                </div>
            </div>
            

            <div class="footBg">
                <div class="btnBox">
                    <img src="@/assets/v5/image/icon_enter@2x.png" />
                </div>
            </div>


        </div>

        <ArtDialog :show="showNftDetailDialog && 'id' in resp.currentInfo" :close-on-press-escape="false" :close-on-click-modal="false" @close="closeNftDetailDialog">
            <template #content>
                <div class="artDialogBox">
                    <div class="artDialogTitle">
                        <div class="htitle" style="margin: 0 0 60px 0;">
                            <div class="bgl"></div>
                            <div class="txt">
                                Artist NFT
                            </div>
                            <div class="bgr"></div>
                        </div>
                    </div>
                    <div class="artDialogCntBox">
                        <div class="nftImgBox">
                            <img :src="img(resp.currentInfo.image)" />
                        </div>
                        <div class="nftDetail" style="height: 500px;">
                            <div class="htitle" style="margin: 0 0 60px 0;">
                                <div class="bg3"></div>
                                <div class="txt">
                                    {{resp.currentInfo.name}}
                                </div>
                            </div>
                            <div class="nftInfo">
                                <div class="item1">
                                    <div class="item1_half">
                                        <div class="t1">
                                            Discount
                                        </div>
                                        <div class="v1">
                                            {{resp.currentInfo.price.pay[currentCoinType]}}{{resp.currentInfo.price.unit[currentCoinType]}}
                                            <div class="del1">
                                                {{resp.currentInfo.price.orign[currentCoinType]}}{{resp.currentInfo.price.unit[currentCoinType]}}
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="item1_half">
                                        <div class="t1">
                                            Payment
                                        </div>
                                        <div class="payBox">
                                            <template v-for="(item, index) in resp.currentInfo.price.pay">
                                                <template v-if="resp.currentInfo.price.pay[index]>0">
                                                    <div class="item" :class="{actvie: currentCoinType==index}" @click="changeCoinType(index)">
                                                        {{ index }}
                                                    </div>
                                                </template>
                                            </template>
                                            
                                            <!-- <div class="item" :class="{actvie: currentCoinType=='SOL'}" @click="changeCoinType('SOL')">
                                                SOL
                                            </div>
                                            <div class="item" :class="{actvie: currentCoinType=='Credit Card'}" @click="changeCoinType('Credit Card')">
                                                Credit Card
                                            </div> -->
                                        </div>
                                        <div class="del1">&nbsp;</div>
                                    </div>
                                </div>
                                <div class="item2">
                                    <div class="t1">Qty</div>
                                    <div class="account">1</div>
                                </div>
                                <div class="item3">
                                    <div class="item3_item">
                                        <div class="t2">
                                            Status
                                        </div>
                                        <div class="v2">
                                            {{resp.currentInfo.tx==''?'Mint':'Complated'}}
                                        </div>
                                    </div>
                                    <div class="item3_item">
                                        <div class="t2">
                                            Type
                                        </div>
                                        <div class="v2">
                                            {{resp.currentInfo.page_type}}
                                        </div>
                                    </div>
                                    <div class="item3_item">
                                        <div class="t2">
                                            Airist
                                        </div>
                                        <div class="v2">
                                            {{resp.currentInfo.page_artist}}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="artDialogFoot">
                        <Button @btn-click="mintNft(resp.currentInfo.id)" text-color="#FFF" class="main-btn widthbtn btnThemes3" :disabled="(resp.currentInfo.minted_member_id>0||resp.currentInfo.is_upload!=1)">
                            Mint
                        </Button>
                    </div>
                </div>
                
            </template>
        </ArtDialog>
        <MintArtNftDialog ref="mintDialogRef" :close-on-click-modal="false" :show-close="false"
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
import { ref, reactive, computed } from "vue";

import ArtDialog from '@/layout/v5/components/ArtDialog.vue'
import Button from '@/layout/v5/components/Button.vue'
import { getArtNftList,getArtNftInfo } from '@/api/lht/nft'
import { formatMoney, img } from "@/utils/utils";

import { useUserStoreHook } from '@/store/modules/lhs/user';
const useUserStore = useUserStoreHook();
const isLogin = computed(() => useUserStore.isLogin())

const emit = defineEmits(['showLoginDialog'])

const resp = reactive({
    lists: {
        current_page: 0,
        data:[],
        last_page: 1,
        per_page: 9,
        total: 0
    },
    data: [],
    currentInfo: {},
})

const showNftDetailDialog = ref(false)
const showMintNftDialog = ref(false)

const LoadMore = () => {
    getArtNftList({page:resp.lists.current_page+1,limit: resp.lists.per_page}).then((res) => {
        resp.lists = res;
        if(res.data.length > 0){
            resp.data = resp.data.concat(res.data);
        }
    })
}
LoadMore();

const getArtNftLoadingId = ref(0);
const showArtNftDetail = (id:number) => {
    getArtNftLoadingId.value = id;
    getArtNftInfo(id,{}).then((res) => {
        if("id" in res) {
            resp.currentInfo = res;
            showNftDetailDialog.value = true
        }
    }).finally(() => {
        setTimeout(() => {
            getArtNftLoadingId.value = 0
        }, 1000);
    })
}

const currentCoinType = ref('USDT');

const closeNftDetailDialog = () => {
    showNftDetailDialog.value = false
    resp.currentInfo = {}
    currentCoinType.value = 'USDT'
}


const closeMintNftDetailDialog = () => {
    showNftDetailDialog.value = false
    showMintNftDialog.value = false
}

const mintNft33 = (id:number) => {
    if(!isLogin.value) {
        showNftDetailDialog.value = false
        emit('showLoginDialog', {})
        return;
    }

    showMintNftDialog.value = true;
}


// mint

import MintArtNftDialog from '@/layout/v5/components/MintArtNftDialog.vue'
import { getStripeProxyMintPayUrl } from "@/api/lhs/user";
const mintDialogRef = ref(null);


// 信用卡
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
    getStripeProxyMintPayUrl({mint_amount:1,collect_id:0,nft_id:resp.currentInfo.id}).then((res) => {
        window.location.href = res.url
    }).catch((e) => {
        goLoading.value = false
    })
}



const mintNft = (id: number) => {

    if(!isLogin.value) {
        showNftDetailDialog.value = false
        emit('showLoginDialog', {})
    } else {
        if (currentCoinType.value == 'Credit Card') {
            dialogVisible.value = true
        } else {
            // 用合集ID，取对应数量的NFT用于铸造
            mintDialogRef.value?.mintArtNft(id,currentCoinType.value,resp.currentInfo.price.pay[currentCoinType.value],resp.currentInfo.price.orign[currentCoinType.value],resp.currentInfo.price.discount[currentCoinType.value]);
        }
    }
    
}
const mintResult = (data) => {
    console.log("mintResult", data)
    showArtNftDetail(resp.currentInfo.id);
}


const changeCoinType = (type:string) => {
    currentCoinType.value = type
}


</script>

<style lang="scss" scoped>
@import "/src/assets/v5/css/common.scss";


.artContenter {

    .artCntBox {
        max-width: 1350px;
        margin: 0 auto;
    }

    .headerBox {
        min-height: 1600px;

        .headerBg {
            background-image: url("@/assets/v5/image/banner_bg_02.png");
            width: 100%;
            height: 237px;
            background-repeat: no-repeat;
            background-size: cover;
            background-position: top center;
        }

        .bannerBox {
            max-width: 1350px;
            height: 1280px;
            margin: -160px auto 30px auto;
            position: relative;

            .bimg {
                background-image: url("@/assets/v5/image/pic_changban_star.png");
                background-repeat: no-repeat;
                z-index: 11;
                position: absolute;
                top: 0;
                bottom: 0;
                left: 0;
                right: 0;
            }

            .cnt1 {
                color: white;
                position: absolute;
                top: 570px;
                left: 100px;
                width: 540px;
                height: 200px;
                z-index: 12;
            }

            .cnt2 {
                width: 100%;
                color: white;
                position: absolute;
                top: 1070px;
                z-index: 10;

                .cnt2Box {
                    border: 2px solid #000000;
                    background-color: #fff;
                    width: calc(88% - 560px);
                    margin: 0 auto;
                    height: 100%;
                    padding: 60px;
                    padding-right: 500px;
                    padding-bottom: 120px;
                    .desc {
                        text-transform: uppercase;
                    }
                    position: relative;

                    .cnt3 {
                        width: 80px;
                        height: 30px;
                        position: absolute;
                        right: 60px;
                        bottom: 30px;
                        background-image: url("@/assets/v5/image/banner_icon_enter.png");
                        background-repeat: no-repeat;
                        cursor: pointer;
                    }
                    .cnt3:hover{
                        transform: scale(1.05);
                        transition: transform 500ms;
                    }
                }
            }

            

        }

    }

    .h1 {
        font-family: Microsoft YaHei;
        font-weight: bold;
        font-size: 27px;
        color: #000000;
        line-height: 25px;
    }

    .desc {
        margin-top: 20px;
        font-weight: 300;
        font-size: 16px;
        color: #000000;
        line-height: 24px;
    }

    .cnt4 {
        display: none;
    }

    .NftBox {
        padding: 30px 0;
        width: 100%;

        .nftItem:nth-child(3n+2) {
            margin-left: 30px;
            margin-right: 30px;
        }

        .nftItem {
            width: 425px;
            height: 450px;
            border: 1px solid #000000;
            display: inline-block;
            margin-top: 30px;

            .nftImg {
                height: 370px;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                img {
                    max-width: calc(100% - 20px);
                    max-height: calc(100% - 20px);
                    overflow: hidden;
                }
                border-bottom: 1px solid #000000;
                position: relative;

                .gjFlag {
                    width: 56px;
                    height: 40px;
                    position: absolute;
                    bottom: 20px;
                    left: -1px;
                    img {
                        max-width: 100%;
                        max-height: 100%;
                        width: 100%;
                        height: 100%;
                    }
                }
            }

            .nftTitleBox {
                width: 100%;
                height: 79px;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .left {
                    width: calc(100% - 97px - 40px);
                    height: 100%;
                    display: flex;
                    justify-content: start;
                    align-items: center;
                    padding: 0 20px;

                    font-family: Microsoft YaHei;
                    font-weight: bold;
                    font-size: 31px;
                    color: #000000;
                    line-height: 39px;
                }
                .right {
                    width: 97px;
                    height: 100%;
                    background-color: #2E2F30;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    cursor: pointer;
                    img:hover {
                        transform: scale(1.05);
                        transition: transform 500ms;
                    }
                }

                .right.disabled {
                    background-color: #F0F0F0;
                    cursor: no-drop;
                }
            }

        }

       
    }

    .artCntPagerBox {
        padding: 60px;
        display: flex;
        justify-content: center;
    }

    .txtImgBox {
        width: 1200px;
        margin: 0 auto;
        justify-content: space-around;
        display: flex;
        align-items: center;
        padding-top: 30px;
        .left {
            width: 540px;
            font-family: Source Han Sans CN;
            font-weight: 300;
            font-size: 22px;
            color: #000000;
            line-height: 30px;
        }
        .right {
            width: 460px;
        }
    }

    .btnBox {
        text-align: center;
        margin-top: -200px;
        img {
            cursor: pointer;
            width: 344px;
            height: 79px;
        }
    }

    .footBg {
        height: 624px;
        width: 100%;
        background-image: url("@/assets/v5/image/botton_pic_01.png");
        background-repeat: no-repeat;
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
    }
}

.htitle {
    margin: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    .bgl,.bgr,.bg3 {
        width: 30px;
        height: 30px;
    }
    .txt {
        font-family: Microsoft YaHei;
        font-weight: bold;
        font-size: 36px;
        color: #000000;
        text-transform: uppercase;
    }
    .bgl,.bg3 {
        margin-right: 30px;
        background-color: #DA183B;
    }
    .bgr {
        margin-left: 30px;
        background-color: #F3BD1D;
    }

    .bg3 {
        background-color: #02723F;
        width: 16px;
        height: 16px;
    }
}

.artDialogBox {
    padding: 0 50px;
    .artDialogCntBox {
        display: flex;
        justify-content: space-between;
        align-items: center;
        .nftImgBox {
            width:300px;
            border: 1px solid #000;
            display: flex;
            justify-content: center;
            align-items: center;
            margin-right: 50px;
            padding: 20px;
            box-shadow: 3px 9px 5px 0px rgba(221,221,221,0.46);
            img {
                max-width: 100%;
                max-height: 100%;
            }
        }

        .nftDetail {
            width: 635px;
            .nftInfo {
                .item1,.item2,.item3 {
                    padding: 20px 0;
                }
                .item2 {
                    border-top: 1px solid #000;
                    border-bottom: 1px solid #000;
                    display: flex;
                    align-items: center;
                    .account {
                        background-color: #F4F4F4;
                        color: #000;
                        width: 120px;
                        height: 24px;
                        text-align: center;
                        margin-left: 20px;
                        line-height: 24px;
                    }
                }
                .item1 {
                .item1_half {
                    display: inline-block;
                    width: 50%;
                }
                }
                .item3{
                    .item3_item {
                        width: 33%;
                        display: inline-block
                    }
                }
            }
        }

        .payBox {
            display: flex;
            justify-content: start;
            align-items: center;
            height: 50px;
            .item {
                border: 1px solid #000;
                border-right: none;
                padding: 5px 10px;
                cursor: pointer;

                font-family: Source Han Sans CN;
                font-weight: 800;
                font-size: 22px;
            }
            .item:nth-last-child(1){
                border-right: 1px solid #000;
            }
            .item.actvie {
                background-color: #000;
                color: #fff;
            }
        }

        .t1 {
            font-family: Source Han Sans CN;
            font-weight: 800;
            font-size: 16px;
            color: #000000;
            line-height: 48px;
        }

        .v1 {
            font-family: Source Han Sans CN;
            font-weight: 800;
            font-size: 30px;
            color: #000000;
            line-height: 48px;
            width: fit-content;
            text-align: right;
        }

        .t2 {
            font-family: Source Han Sans CN;
            font-weight: 400;
            font-size: 12px;
            color: #000000;
        }

        .v2{
            font-family: Source Han Sans CN;
            font-weight: 800;
            font-size: 16px;
            color: #000000;
            line-height: 48px;
            text-transform: uppercase;
        }

        .del1 {
            font-family: Source Han Sans CN;
            font-weight: 400;
            font-size: 14px;
            color: #999999;
            line-height: 23px;
            text-decoration-line: line-through;
        }

    }

    .artDialogFoot {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .main-btn {
        width: fit-content;
        padding: 2px;
        ::v-deep(.btnCnt) {
            border-radius: 10px;
            height: calc(100%);
        }
        ::v-deep(.el-button.is-disabled, .el-button.is-disabled:focus, .el-button.is-disabled:hover) {
            background: transparent;
            color: #fff;
        }
    }

    // themes 3
    .btnThemes3 {
        background-color: #000;
        padding: 10px 50px;
        text-align: center;
        font-size: 32px;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.18);
        ::v-deep(.btnCnt) {
            ::v-deep(.btnCnt) {
                background-color: #0C0D0E;
                color: #fff;
            }
        }
    }

    .btnThemes3:not(.disabled):hover {
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.18);
        color: #fff;
    }

    .btnThemes3.disabled {
        background-color: #AEAEB2;
        ::v-deep(.btnCnt) {
            background-color: #AEAEB2;
        }
    }
    // themes 1 end
}


// themes 4
.btnThemes4 {
    background-color: #FFF;
    padding: 10px 50px;
    text-align: center;
    font-size: 32px;
    border:2px solid #000;
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.18);
    ::v-deep(.btnCnt) {
        ::v-deep(.btnCnt) {
            background-color: #FFF;
            color: #000;
        }
    }
}

.btnThemes4:not(.disabled):hover {
    box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.18);
    color: #000;
}

.btnThemes4.disabled {
    ::v-deep(.btnCnt) {
        background-color: #AEAEB2;
    }
}
// themes 4 end

@media screen and (max-width: 960px) {
    .artContenter {
        .headerBox {
            min-height: 1120px;

            .bannerBox {
                width: 100%;
                height: 1120px;

                .bimg {
                    background-image: url("@/assets/v5/image/banner_pic.png");
                    background-position: top center;
                }

                .cnt1 {
                    color: white;
                    position: absolute;
                    top: auto;
                    left: 100px;
                    bottom: 0;
                    left: 30px;
                    right: 30px;
                    text-align: center;
                    margin: 0 auto;
                }

                .cnt2 {
                    display: none;
                }

                

            }

        }

        .h1 {

        }

        .desc {
            line-height: 32px;
        }

        .cnt4,.cnt5 {
            display: block;
            width: calc(100% - 40px);
            margin: 50px auto;
            text-align: center;
        }
        
        .txtImgBox {
            flex-direction: column;
            width: calc(100% - 40px);
            .left {
                margin-bottom: 90px;
            }
        }

        .footBg {
            background-image: url("@/assets/v5/image/botton_bg.png");
            background-position: top center;
        }
    }

    .artDialogBox {
        padding: 0;
        .artDialogCntBox {
            flex-direction: column;
            .nftImgBox {
                margin-right: 0;
                margin-bottom: 50px;
            }
            .nftDetail {
                width: 100%;
            }
        }
    }
}

</style>