<template>
    <div>

        <div class="homeBanner">
            <div class="homeBg">
                <div class="homeBannerBg"></div>
                <div class="homeBannerRight">
                    <div class="cnt">
                        <div class="homeRbg1"></div>
                        <div class="homeRbg2"></div>
                    </div>
                </div>

                <div class="anim_Coin"></div>
            </div>

            <div class="PosCnt">

                <div class="cnt">
                    <div class="titleH1">GENESIS <span>NFT</span></div>
                    <div class="intro">Explore <span>The Future of Art</span> in<br />
                        L-H NFT Collection</div>

                    <el-button type="btn4" @click="toUrl('/art')">
                        <div class="btnBox">
                            <div class="title" data-id="#tier">Artist NFT</div>
                            <div><img src="@/assets/v5/image/i.unicon-arrow-up-right.png" /></div>
                        </div>
                    </el-button>
                </div>

            </div>
        </div>

        <div class="caseBox">
            <div class="caseBg">
                <div class="butterfly"></div>
            </div>


            <div class="PosCnt">

                <div class="cnt">
                    <div class="topBg"></div>
                    <div class="flexl">
                        <div class="flex6">
                            <div class="item">
                                <img src="@/assets/v5/image/p1.png" />
                            </div>
                            <div class="item">
                                <img src="@/assets/v5/image/p2.png" />
                            </div>
                        </div>
                        <div class="flex6">
                            <div class="item">
                                <img src="@/assets/v5/image/p3.png" />
                            </div>
                        </div>
                    </div>
                    <div class="flexr">
                        <div class="h1">
                            The Genesis NFT<br /> Collection
                        </div>
                        <div class="intro">
                            This May, unleash your passion for history and innovation with the LHT Genesis NFT
                            collection. Prepare to own a piece of humanity’s most iconic creations, immortalized on
                            Web3.
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div class="nftBox" ref="tierRef">
            <div class="nftBg">
                <div class="butterflyBg">
                    <div class="butterfly"></div>
                </div>
            </div>

            <div class="PosCnt">

                <div class="cnt">

                    <h1 class="h1 txtCenter">NFT Tiers</h1>

                    <div class="nftListBox">
                        <template v-for="(item, index) in resp.categoryNft" :key="index">
                            <div class="item" :class="index == 1 ? 'active' : ''">
                                <div class="img">
                                    <img class="" v-if="item.image" :src="img(item.image)" />
                                    <img v-else src="@/assets/v5/image/Rectangle 212.png" />
                                </div>
                                <div class="info">
                                    <div class="grid1">
                                        <div class="title">{{ item.name }}</div>
                                        <div class="amount">{{ item.planned_nft_num }} / Pcs</div>
                                    </div>
                                    <div class="grid2">
                                        <div class="item2">
                                            <div class="key">Status</div>
                                            <div class="value">{{item.frontend_status_text}}</div>
                                        </div>
                                        <div class="item2">
                                            <div class="key">Price</div>
                                            <div class="value">{{ formatMoney(item.mint_price, 2) }} USDT</div>
                                        </div>
                                    </div>
                                    <div class="grid3">
                                        <el-button :type="index == 1 ? 'btn1' : 'btn2'"
                                            @click="showNftDetailDialog(item.id)">
                                            <div class="title">Mint</div>
                                        </el-button>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>

                </div>

            </div>
        </div>

        <div class="brandBox">
            <div class="brandBg">
                <div class="flower"></div>
            </div>
            <div class="container">
                <div class="cnt">
                    <div class="bg"></div>
                    <div class="PosCnt">

                        <div class="h1">
                            Signature Co-Branded NFTs
                        </div>

                        <div class="intro">
                            Don’t miss our Signature Collections developed in collaboration with world-renowned artists
                            and fashion icons. These unique digital assets seamlessly blend high art with high fashion,
                            creating an unprecedented digital experience.
                        </div>

                        <el-button type="btn3" @click="scrollToTier">
                            <div class="title">COMING SOON</div>
                        </el-button>

                    </div>
                </div>
            </div>
        </div>

        <div class="partnerBox">
            <div class="partnerBg"></div>

            <div class="PosCnt">

                <div class="cnt">
                    <div class="h1 txtCenter">
                        Our Partners
                    </div>
                    <div class="intro">
                        CONNECT WITH METEORN RUN ON SOCIAL MEDIA
                        Our plans & pricing are designed to meet your needs as you grow
                    </div>
                    <div class="logoBox">
                        <div class="item">
                            <img src="@/assets/v5/image/logo2.png" />
                        </div>
                        <div class="item">
                            <img src="@/assets/v5/image/X.png" />
                        </div>
                        <div class="item">
                            <img src="@/assets/v5/image/logo3.png" />
                        </div>
                    </div>

                    <div class="logoList">
                        <img src="@/assets/v5/image/Rectangle 4452.png" />
                        <img src="@/assets/v5/image/Rectangle 4453.png" />
                        <img src="@/assets/v5/image/Rectangle 4454.png" />
                        <img src="@/assets/v5/image/Rectangle 4455.png" />
                        <img src="@/assets/v5/image/Rectangle 4456.png" />
                        <img src="@/assets/v5/image/Rectangle 4460.png" />
                        <img src="@/assets/v5/image/Rectangle 4458.png" />
                        <img src="@/assets/v5/image/Group 8703.png" />
                        <img src="@/assets/v5/image/Rectangle 4457.png" />
                        <img src="@/assets/v5/image/Group 8702.png" />
                        <img src="@/assets/v5/image/Rectangle 4462.png" />
                        <img src="@/assets/v5/image/Rectangle 4464.png" />
                    </div>

                </div>

            </div>
        </div>

        <template v-if="windowWidth <= 800">
            <NftDetailDrawer :category-id="currentCategoryId" :show="nftDetailDialogShow"
                @close-drawer="closeNftDetailDialog" />
        </template>
        <template v-else>
            <NftDetailDialog :category-id="currentCategoryId" :show="nftDetailDialogShow"
                @close-dialog="closeNftDetailDialog" />
        </template>

    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted, reactive } from "vue";
import NftDetailDialog from '@/layout/v5/components/NftDetailDialog.vue'
import NftDetailDrawer from '@/layout/v5/components/NftDetailDrawer.vue'
import { getHomeCategoryNft } from '@/api/lht/nft'
import { formatMoney, img } from '@/utils/utils';
import { toUrl } from "@/utils/router";



const nftDetailDialogShow = ref(false)

const currentCategoryId = ref(0)
const showNftDetailDialog = (id) => {
    currentCategoryId.value = id
    nftDetailDialogShow.value = true
}

const closeNftDetailDialog = () => {
    nftDetailDialogShow.value = false
}


const windowWidth = ref(0)
onMounted(() => {
    getWindowResize()
    window.addEventListener('resize', getWindowResize)
})
// 获取屏幕尺寸
const getWindowResize = () => {
    windowWidth.value = window.innerWidth
    nftDetailDialogShow.value = false
}

const tierRef = ref(null)
const scrollToTier = () => {
    if (tierRef.value) {
        tierRef.value.scrollIntoView({ behavior: 'smooth' });
    }
}

const resp = reactive({
    categoryNft: []
})
getHomeCategoryNft({}).then((res) => {
    resp.categoryNft = res
})

</script>

<style lang="scss" scoped>
@import "/src/assets/v5/css/common.scss";

.homeBanner {
    width: 100%;
    height: 1200px;
    position: relative;

    .homeBg {
        position: absolute;
        z-index: 990;
        width: 100%;
        height: 100%;

        .homeBannerBg {
            position: absolute;
            left: 0;
            top: 0;
            right: 0;
            bottom: 0;
            background-image: url('@/assets/v5/image/lh_banner_bg.jpg');
            background-position: top left;
            background-size: 100%;
            background-repeat: no-repeat;
        }

        .anim_Coin {
            width: 100px;
            height: 100px;
            position: absolute;
            left: 200px;
            bottom: 120px;
            background-image: url('@/assets/v5/image/Home Coin Inline 1.png');
            animation: coin 3s infinite;
        }

        @-webkit-keyframes coin {
            0% {
                bottom: 120px;
            }

            50% {
                bottom: 100px;
            }

            100% {
                bottom: 120px;
            }
        }

        .homeBannerRight {
            width: 50%;
            position: absolute;
            top: 0;
            bottom: 0;
            right: 0;
            background-image: url('@/assets/v5/image/lh_banner_right.jpg');
            background-position: top right;
            background-size: 100%;
            background-repeat: no-repeat;

            .cnt {
                width: 100%;
                height: 100%;
                position: relative;

                .homeRbg1 {
                    width: 263px;
                    height: 261px;
                    background-image: url('@/assets/v5/image/div.image-grid-item.png');
                    background-size: 100%;
                    position: absolute;
                    top: 500px;
                    left: -50px;
                    animation: xz 3s infinite;
                }

                .homeRbg2 {
                    width: 205px;
                    height: 205px;
                    background-image: url('@/assets/v5/image/div.main-image.png');
                    background-size: 100%;
                    position: absolute;
                    top: 800px;
                    left: 180px;
                    animation: xz 3s infinite;
                }

                @-webkit-keyframes xz {
                    50% {
                        transform: rotate3d(-5, 1, 1, 10deg);
                    }
                }
            }
        }

    }

    .PosCnt {
        .cnt {
            margin-top: 300px;

            .titleH1 {
                font-family: Inter;
                font-size: 112px;
                font-weight: 800;
                line-height: 72px;
                color: #0F051D;

                span {
                    color: #8B00F3;
                }
            }

            .intro {
                margin: 60px 0;
                font-family: Adobe Gothic Std;
                font-size: 46px;
                font-weight: 700;
                line-height: 54px;
                text-transform: uppercase;

                span {
                    color: #8B00F3;
                }
            }
        }
    }

}


.PosCnt {
    position: absolute;
    z-index: 991;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;

    .cnt {
        max-width: 1500px;
        margin: 0 auto;
    }
}


.caseBox {
    width: 100%;
    height: 1100px;
    position: relative;

    .caseBg {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-image: url('@/assets/v5/image/lh_con2_bg.png');
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: top left;
    }

    .PosCnt {
        .cnt {
            display: flex;
            justify-content: space-between;
            position: relative;

            .topBg {
                width: 100px;
                height: 100px;
                position: absolute;
                top: -40px;
                left: -10px;
                background-color: rgba(224, 217, 203, 0.3);
                border: 1px solid #fff;
                box-shadow: 0 -4.43px 17px 0 rgb(255, 255, 255, 0.15);
                border-radius: 25px;
                animation: topbg 3s infinite;
            }

            @-webkit-keyframes topbg {
                50% {
                    top: -50px;
                    left: -20px;
                }
            }


            .flexl {
                flex: 5;
                height: 960px;
                display: flex;

                .flex6 {
                    display: flex;
                    flex-direction: column;
                    flex: 6;
                    align-items: center;
                    justify-content: space-around;
                }
            }

            .flexr {
                flex: 5;
                height: 800px;
                padding-left: 120px;
                display: flex;
                flex-direction: column;
                justify-content: center;

                .h1 {
                    text-align: left;
                }

                .intro {
                    font-family: Inter;
                    font-size: 28px;
                    font-weight: 400;
                    line-height: 45px;
                    text-align: left;

                }
            }
        }
    }
}

.nftBox {
    width: 100%;
    height: 1100px;
    position: relative;

    .nftBg {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;

        .butterflyBg {
            background-image: url('@/assets/v5/image/image 24.png');
            background-size: 100%;
            background-repeat: no-repeat;
            background-position: top left;
            width: 408px;
            height: 560px;
            position: absolute;
            left: 0;
            top: 30px;

            .butterfly {
                background-image: url('@/assets/v5/image/Home Coin Inline 3.png');
                background-size: 100%;
                background-repeat: no-repeat;
                width: 167px;
                height: 106px;
                top: 60px;
                left: 40px;
                position: absolute;
                animation: butterfly2 3s infinite;
            }

            @-webkit-keyframes butterfly2 {
                50% {
                    top: 80px;
                }
            }

        }
    }

    .nftListBox {
        margin: 0 auto;
        display: flex;
        justify-content: space-around;

        .item {
            width: 420px;
            height: 794px;
            box-shadow: 0 2px 12px rgb(0, 0, 0, 0.12);
            border-radius: 20px;
            margin-top: 50px;
            padding: 15px;
            overflow: hidden;

            .img {
                width: 420px;
                height: 558px;
                overflow: hidden;
                overflow: hidden;
                border-radius: 20px;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .info {
                padding: 10px;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                height: calc(794px - 558px - 20px);

                .grid1 {
                    height: 50px;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    .title {
                        font-family: Poppins;
                        font-size: 28px;
                        font-weight: 600;
                        width: calc(100% - 140px);
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        overflow: hidden;
                    }

                    .amount {
                        padding: 5px 15px;
                        background-color: #F6F6F6;
                        border-radius: 60px;
                        height: 20px;
                        color: #2e2e2e;
                    }
                }

                .grid2 {
                    height: 50px;
                    background-image: linear-gradient(90deg, #F6F6F6, #FFFFFF);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    padding: 15px;

                    .item2 {
                        width: 45%;

                        .key {
                            font-family: IBM Plex Sans;
                            font-size: 14px;
                            line-height: 18px;
                            color: #666666;
                            font-weight: 500;
                        }

                        .value {
                            font-family: Poppins;
                            font-size: 22px;
                            font-weight: 600;
                            line-height: 18px;
                            font-weight: 600;
                            color: #333;
                            margin-top: 15px;
                        }
                    }
                }

                .grid3 {
                    height: 64px;
                    margin-top: 15px;
                }
            }
        }

        .item.active {
            margin-top: 0;
            box-shadow: 0 2px 12px rgba(198, 153, 255, 1);

            .grid2 {
                background-image: linear-gradient(90deg, #FFE2FF, #FFFFFF);
            }
        }
    }
}



.brandBox {
    width: 100%;
    height: 1100px;
    position: relative;

    .brandBg {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        z-index: 998px;

        .flower {
            background-image: url('@/assets/v5/image/flower1.png');
            background-size: 100%;
            background-repeat: no-repeat;
            width: 240px;
            height: 240px;
            top: 20px;
            right: 100px;
            position: absolute;
            animation: flower 3s infinite;
        }

        @-webkit-keyframes flower {
            50% {
                transform: rotate3d(0, 0, -1, 5deg);
            }
        }
    }

    .container {
        position: absolute;
        z-index: 990;
        left: 0;
        right: 0;
        top: 180px;
        bottom: 0;

        .cnt {
            width: 1700px;
            height: 755px;
            margin: 0 auto;
            border-radius: 20px;
            overflow: hidden;
            position: relative;

            .bg {
                background-image: url('@/assets/v5/image/lh_con4_bg.jpg');
                background-size: 100%;
                background-repeat: no-repeat;
                position: absolute;
                width: 100%;
                height: 100%;
                z-index: 990;
            }

            .PosCnt {
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                align-items: center;
                color: #fff;
                height: 500px;
                padding-top: 120px;

                .h1 {
                    font-family: Abhaya Libre ExtraBold;
                    font-size: 78px;
                    font-weight: 800;
                    line-height: 80px;
                    text-transform: uppercase;
                }

                .intro {
                    font-family: Inter;
                    font-size: 20px;
                    font-weight: 400;
                    line-height: 32px;
                    text-align: center;
                    max-width: 920px
                }


            }

        }
    }
}

.partnerBox {
    width: 100%;
    height: 900px;
    position: relative;

    .partnerBg {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        background-image: url('@/assets/v5/image/P6.jpg');
        background-size: 100%;
        background-repeat: no-repeat;
        background-position: top left;
    }

    .PosCnt {
        padding-top: 50px;

        .cnt {
            text-align: center;

            .intro {
                font-family: Inter;
                font-size: 28px;
                font-weight: 400;
                line-height: 48px;
                text-align: center;
                color: #333;
                max-width: 920px;
                margin: 50px auto;
            }

            .logoBox {
                display: inline-flex;
                margin: 0 auto;
                width: fit-content;

                .item {
                    width: 176px;
                    height: 176px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
            }

            .logoList {
                margin-top: 30px;

                img {
                    margin-top: 30px;
                    margin-right: 30px;
                }
            }
        }
    }
}


.el-button--btn1,
.el-button--btn2,
.el-button--btn3,
.el-button--btn4 {
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
    background-color: #212122;
}

.el-button--btn3 {
    background-color: transparent;
    background-image: none;
    border: 1px solid #fff;
    max-width: 470px;
}

.el-button--btn4 {
    max-width: 305px;

    .btnBox {
        display: flex;
        align-items: center;

        .title {
            margin-right: 20px
        }
    }
}

@media screen and (max-width: 1700px) and (min-width: 860px) {
    .brandBox {
        .container {

            .cnt {
                width: 100%;
            }
        }
    }
}

@media screen and (max-width: 860px) {

    .PosCnt {
        .cnt {
            max-width: calc(100% - 20px);
            margin: 0 10px;
        }
    }

    .el-button--btn1,
    .el-button--btn2,
    .el-button--btn3,
    .el-button--btn4 {
        height: 50px;

        .title {
            font-size: 20px;
        }
    }

    .el-button--btn3 {
        max-width: 80%;
    }

    .homeBanner {
        height: 720px;

        .homeBg {

            background-size: cover;

            .homeBannerRight {
                width: 100%;
                top: 30px;
                opacity: 0.6;

                .cnt {

                    .homeRbg1 {
                        width: 100px;
                        height: 99px;
                        top: 60px;
                        left: 10px;
                    }

                    .homeRbg2 {
                        width: 90px;
                        height: 90px;
                        top: 280px;
                        left: 30px;
                    }


                }
            }

            .anim_Coin {
                display: none;
            }

        }

        .PosCnt {
            .cnt {
                margin-top: 150px;
                text-align: center;

                .titleH1 {
                    font-size: 60px;
                }

                .intro {
                    font-size: 30px;
                }
            }
        }

    }


    .caseBox {
        height: 920px;

        .caseBg {
            background-size: cover;
            background-position: left bottom;

            .butterfly {
                display: none;
            }
        }

        .PosCnt {
            .cnt {
                flex-direction: column;

                .flexl {
                    height: 960px;
                    width: 100%;
                    overflow-x: scroll;

                    .topBg {
                        width: 100px;
                        height: 100px;
                        top: -40px;
                        left: -10px;

                    }

                    .flex6 {
                        display: flex;
                        flex-direction: row;
                    }
                }

                .flexr {
                    width: 100%;
                    padding-left: 0;
                    height: 600px;

                    .h1 {
                        text-align: center;
                        font-size: 46px;
                    }

                    .intro {
                        font-size: 24px;
                        text-align: center;
                    }
                }
            }
        }
    }



    .brandBox {
        height: 800px;

        .brandBg {
            .flower {
                right: 0;
            }
        }

        .container {

            .cnt {
                width: 100%;
                height: 600px;


                .bg {
                    background-size: cover;
                    background-position: center center;
                }

                .PosCnt {
                    padding-top: 60px;

                    .h1 {
                        font-size: 46px;
                        text-align: center
                    }

                    .intro {
                        font-size: 20px;

                    }


                }

            }
        }
    }


    .partnerBox {
        width: 100%;
        height: 900px;
        position: relative;

        .partnerBg {
            background-size: cover;
            background-position: center center;
        }

        .PosCnt {

            .cnt {

                .intro {
                    font-size: 24px;
                }

                .logoBox {
                    .item {
                        width: 100px;
                        height: 100px;

                        img {
                            max-width: 100%;
                        }
                    }
                }

                .logoList {
                    margin-top: 10px;

                    img {
                        width: 110px;
                        margin-top: 10px;
                        margin-right: 10px;
                    }

                    img:nth-child(3n) {
                        margin-right: 0;
                    }
                }
            }
        }
    }


    .nftBox {
        height: 1950px;

        .nftBg {
            .butterflyBg {
                width: 100%;
                top: -30px;
            }
        }

        .nftListBox {
            margin: 0 auto;
            flex-direction: column;

            .item {
                width: 100%;
                padding: 0;
                height: 558px;
                position: relative;
                margin-top: 30px;

                .img {
                    width: 100%;
                }

                .info {
                    position: absolute;
                    width: calc(100% - 40px);
                    bottom: 15px;
                    left: 10px;
                    background-color: rgb(255, 255, 255, 0.6);
                    border-radius: 20px;

                    .grid1 {
                        height: 50px;
                        display: flex;
                        justify-content: space-between;
                        align-items: center;

                        .title {
                            font-size: 24px;
                        }
                    }

                    .grid2 {
                        height: 50px;
                        background-image: none;
                        border-radius: 8px;
                        display: flex;
                        align-items: center;
                        padding: 0 15px;

                        .item2 {
                            width: 50%;

                            .key {
                                font-size: 14px;
                            }

                            .value {
                                font-size: 18px;
                            }
                        }
                    }

                    .grid3 {
                        height: 54px;
                    }
                }
            }

            .item.active {
                margin-top: 30px;
            }
        }
    }

}
</style>