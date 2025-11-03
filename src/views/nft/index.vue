<template>
    <div :style="{ minHeight: 'calc(' + height + ' - 107px - 120px)' }">


        <div class="headerBox">
            <div class="bg">
                <div class="circle">
                    <img class="figure" src="@/assets/nft/image/circ 2.png" />
                </div>
                <div class="butterfly"></div>
                <div class="coin"></div>
            </div>
            <div class="cnt">
                <div class="bannerAds">
                    <img class="" src="@/assets/nft/image/geniusnft 2.png" />
                </div>
                <div class="bannerTitle">
                    Explore <span class="hightligth"> the Future of Art</span> in<br />
                    LHT NFT Collection
                </div>

                <Button class="btn1" text-color="#000" @btn-click="toMint('')">
                    <template #default>
                        <div>
                            <img src="@/assets/nft/image/VectorXing.png" />
                        </div>
                        <div class="txt">Genesis Mint Start</div>
                        <div>
                            <img src="@/assets/nft/image/VectorXing.png" />
                        </div>
                    </template>
                </Button>
            </div>
        </div>


        <div class="circleSwiper">


            <div class="bgWid">
                <div class="bg"></div>
            </div>

            <div class="swiperImgBox">
                <img class="" src="@/assets/nft/image/Mask group.svg" />
            </div>

            <div class="swiperNext">

                <div class="cnt">
                    <div class="left">
                        <h1>
                            The Genesis NFT <br /> Collection
                        </h1>
                        <div class="desc">
                            This June, unleash your passion for history and innovation with the LHT Genesis NFT
                            collection. Prepare to own a piece of humanity’s most iconic creations, immortalized on
                            Web3.
                        </div>

                        <div style="margin-top: 50px;">
                            <!-- <Button class="btn4" text-color="#000" @btn-click="openLoginDialog">
                                <template #default>
                                    <div class="outer">
                                        <div class="inner">
                                            <div class="txt">Mint</div>
                                            <div>
                                                <img src="@/assets/nft/image/Untitled.png" />
                                            </div>

                                        </div>
                                    </div>
                                </template>
                            </Button> -->
                        </div>
                    </div>
                    <div class="right">
                        <div class="m1">
                            <div class="item">
                                <img class="" src="@/assets/nft/image/Vector 70.png" />
                                <div class="title">
                                    @Genesis NFT

                                </div>
                            </div>
                            <div class="item">
                                <img class="" src="@/assets/nft/image/Vector 71.png" />
                                <div class="title">@Genesis NFT </div>
                            </div>
                        </div>
                        <div class="m2">
                            <div class="item">
                                <img class="" src="@/assets/nft/image/Vector 72.png" />
                                <div class="title">@Genesis NFT </div>
                            </div>
                            <div class="item">
                                <img class="" src="@/assets/nft/image/Vector 73.png" />
                                <div class="title">@Genesis NFT </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="fenge">
                    <div class="item">
                        <img class="" src="@/assets/nft/image/Genesis NFT.png" />
                        <img class="dot" src="@/assets/nft/image/Vector.png" />
                        <img class="" src="@/assets/nft/image/Genesis NFT.png" />
                        <img class="dot" src="@/assets/nft/image/Vector.png" />
                        <img class="" src="@/assets/nft/image/Genesis NFT.png" />
                        <img class="dot" src="@/assets/nft/image/Vector.png" />
                        <img class="" src="@/assets/nft/image/Genesis NFT.png" />
                        <img class="dot" src="@/assets/nft/image/Vector.png" />
                        <img class="" src="@/assets/nft/image/Genesis NFT.png" />
                        <img class="dot" src="@/assets/nft/image/Vector.png" />
                        <img class="" src="@/assets/nft/image/Genesis NFT.png" />
                        <img class="dot" src="@/assets/nft/image/Vector.png" />
                    </div>
                </div>

                <div class="carousel2">

                    <CarouselPlay :sliders="resp.carouselPlay" :autoplay="true" v-if="resp.carouselPlay.length > 0" />

                </div>



                <div style="" class="circle2" v-if="resp.categoryNft.length > 0">
                    <div class="bgWid2">
                        <div class="bg2"></div>
                    </div>
                    <div class="circle2Cnt">


                        <h1 class="h1">NFT Tiers</h1>

                        <el-scrollbar>
                            <div class="nftCollect">
                                <template v-for="(item, index) in resp.categoryNft" :key="index">
                                    <div class="item" @click="toMint(item.name)">
                                        <div class="img">
                                            <img class="" v-if="item.image" :src="img(item.image)" />
                                            <img class="" v-else src="@/assets/nft/image/User 0003.png" />
                                        </div>
                                        <div class="titleBox">
                                            <div class="title">{{ item.type }} TIER</div>
                                            <div class="info2">{{ item.planned_nft_num }} / Pcs</div>
                                        </div>
                                        <div class="desc">
                                            {{ item.remark }}
                                        </div>
                                        <Button class="btn2" v-if="item.id">
                                            <template #default>
                                                <div class="txt">Mint</div>
                                            </template>
                                        </Button>
                                    </div>
                                </template>


                            </div>

                        </el-scrollbar>


                    </div>
                </div>


            </div>
        </div>


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
                <div style="margin-top: 30px;">
                    <Button class="btn7" @btn-click="toMint('')">
                        <template #default>
                            <div>
                                <img src="@/assets/nft/image/VectorWhite.png" />
                            </div>
                            <div class="txt">COMING SOON</div>
                            <div>
                                <img src="@/assets/nft/image/VectorWhite.png" />
                            </div>
                        </template>
                    </Button>
                </div>
            </div>
        </div>


        <!-- <div class="nftList">
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
                                </div>
                            </div>
                        </div>
                    </div>
                </template>



            </div>
        </div>

        <div class="" style="text-align: center;margin: 50px 0">
            <Button class="btn4" text-color="#000" @btn-click="openLoginDialog">
                <template #default>
                    <div class="outer">
                        <div class="inner">
                            <div class="txt">LAUNCHING END OF MAY</div>
                            <div>
                                <img src="@/assets/nft/image/Untitled.png" />
                            </div>

                        </div>
                    </div>
                </template>
            </Button>
        </div> -->

        <div class="nftSub">

            <div class="left">
                <!-- todo -->
                <h1 class="h1">
                    Coming up next
                </h1>
                <div class="geniusBox">
                    <div class="zl">/Genesis:</div>
                    <div></div>
                    <div class="genBtn">Stay Tuned</div>
                </div>
            </div>
            <div class="right">
                <img src="@/assets/nft/image/tmp2.png" />
            </div>

        </div>


        <div class="lineBox">
            <div class="bg">
                <div class="line">
                    <div class="line">
                        <div class="line">
                            <div class="line">
                                <div class="line">
                                    <div class="line">
                                        <div class="line">

                                        </div>

                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="cnt">
                <h1>Join us as we redefine art and ownership in the
                    <br /> digital age with LHT’s Genesis NFTs.
                </h1>
                <div class="join" style="text-align: center;margin-top: 60px">
                    <Button class="btn4" text-color="#000">
                        <template #default>
                            <div class="outer">
                                <div class="inner">
                                    <div class="txt">JOIN US</div>
                                    <div>
                                        <img src="@/assets/nft/image/Untitled.png" />
                                    </div>

                                </div>
                            </div>
                        </template>
                    </Button>
                </div>
            </div>
        </div>






    </div>

</template>
<script lang="ts" setup>


import { computed, reactive, ref, watch } from 'vue';
import Button from '@/layout/v4/components/Button.vue'
import CarouselPlay from '@/layout/v4/components/CarouselPlay.vue'
import { getHomeCategoryNft, getNftAds } from '@/api/lht/nft'

import img1 from '@/assets/nft/image/Rectangle 208.png';
import img2 from '@/assets/nft/image/Rectangle 209.png';
import img3 from '@/assets/nft/image/Rectangle 210.png';
import img4 from '@/assets/nft/image/Rectangle 211.png';

const toMint = (name: string) => {
    return toUrl('/collection', {
        name: name
    });
}

import { useUserStoreHook } from '@/store/modules/lhs/user'
import { formatMoney, img } from '@/utils/utils';
import { toUrl } from '@/utils/router';
const useUserStore = useUserStoreHook();
const isLogin = computed(() => useUserStore.isLogin())

const height = window.innerHeight + 'px';
const bannerHeight = (window.innerWidth / 1920 * 666) + 'px'

const emit = defineEmits(['showLoginDialog'])
const openLoginDialog = () => {
    if (!isLogin.value) {
        emit('showLoginDialog', {})
    } else {
        toUrl('/collection')
    }
}

const resp = reactive({
    categoryNft: [],
    carouselPlay: [],
    recommendNfts: []
})
const loginedRequest = () => {
    getHomeCategoryNft({}).then((res) => {
        resp.categoryNft = res
    })
    // getNftAds({}).then((res) => {
    //     resp.carouselPlay = res
    // })
    // getNftAds({}).then((res) => {
    //     resp.recommendNfts = res
    // })
    resp.carouselPlay = [
        {
            image: img1,
        },
        {
            image: img2,
        },
        {
            image: img3,
        },
        {
            image: img4,
        },
        {
            image: img1,
        },
        {
            image: img2,
        },
        {
            image: img3,
        },
        {
            image: img4,
        }
    ];
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

</script>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";

.headerBox {
    position: relative;
    height: 934px;
    width: 100%;
    overflow: hidden;

    .bg,
    .cnt {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
    }

    .bg {
        z-index: 900;

        .circle {
            right: -236px;
            display: inline;
            position: absolute;
        }

        .coin {
            right: 183px;
            position: absolute;
            bottom: 40px;
            content: '';
            width: 107px;
            height: 106px;
            background-image: url('@/assets/nft/image/Home Coin Inline 1.png');
            -webkit-animation: coin 3s infinite;
        }

        @-webkit-keyframes coin {
            0% {
                bottom: 40px;
            }

            50% {
                bottom: 20px;
            }

            100% {
                bottom: 40px;
            }
        }

        .butterfly:before {
            left: 195px;
            position: absolute;
            bottom: 214px;
            content: '';
            width: 167px;
            height: 106px;
            background-image: url('@/assets/nft/image/butterfly min 1.png');
            -webkit-animation: butterfly 1s infinite;

        }

        @-webkit-keyframes butterfly {
            0% {
                bottom: 214px;
            }

            50% {
                transform: rotate3d(-5, 1, 1, 10deg);
                bottom: 200px;
            }

            100% {
                bottom: 214px;
            }
        }

        .figure {
            animation: 0ms;
            -webkit-animation: rotateImg 30s linear infinite;
            //vertical-align: middle;
        }

        @keyframes rotateImg {
            0% {
                transform: rotate(0);
            }

            25% {
                transform: rotate(90deg);
            }

            50% {
                transform: rotate(180deg);
            }

            75% {
                transform: rotate(270deg);
            }

            100% {
                transform: rotate(360deg);
            }
        }

        @-webkit-keyframes rotateImg {
            0% {
                -webkit-transform: rotate(0);
            }

            25% {
                -webkit-transform: rotate(90deg);
            }

            50% {
                -webkit-transform: rotate(180deg);
            }

            75% {
                -webkit-transform: rotate(270deg);
            }

            100% {
                -webkit-transform: rotate(360deg);
            }
        }
    }

    .cnt {
        z-index: 900;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;

        .bannerAds {
            height: 414px;
        }

        .bannerTitle {
            font-size: 46px;
            font-weight: 600;
            text-align: center;
            line-height: 60px;
            text-transform: uppercase;
            margin-top: 30px;

            .hightligth {
                color: #A660FF;
            }
        }
    }
}

.circleSwiper {
    width: 100%;
    // height: 760px;
    position: relative;
    // overflow: hidden;

    .bgWid {
        position: absolute;
        top: 400px;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 1;
        overflow: hidden;

        .bg {
            position: absolute;
            left: 50%;
            width: 200%;
            height: 3000px;
            border-radius: 50% 50% 0 0;
            border: 1px solid #FFE1FF;
            background-color: #FFE1FF;
            -webkit-transform: translate(-50%, 0);
            -ms-transform: translate(-50%, 0);
            -o-transform: translate(-50%, 0);
            transform: translate(-50%, 1);
        }
    }

    .swiperImgBox {
        position: relative;
        z-index: 0;
        color: #fff;
        text-align: center;

        img {
            width: 100%;
        }
    }

    .swiperNext {
        position: relative;
        width: 100%;
        z-index: 2;
        background-image: linear-gradient(180deg, #FFE1FF, #FFFFFF);
        margin-top: -180px;
        overflow: hidden;

        .cnt {
            margin: 0 auto;
            width: fit-content;
            display: flex;

            .left {
                max-width: 710px;
                display: flex;
                flex-direction: column;
                justify-content: center;

                h1 {
                    font-size: 72px;
                    // font-family: 
                }

                .desc {
                    margin-top: 30px;
                    font-size: 28px;
                }
            }

            .right {
                display: flex;

                .m2 {
                    margin-top: 80px;
                }

                .item {
                    border-radius: 10px;
                    padding: 20px 20px 30px 20px;
                    border: 1px solid #fff;
                    background-color: #FFFFFF;
                    box-shadow: 0px 2px 8px rgb(0, 0, 0, 0.15);
                    margin-left: 30px;
                    margin-top: 30px;

                    img {
                        border-radius: 20px 0 20px 0;
                        overflow: hidden;
                    }

                    .title {
                        font-size: 21px;
                        font-family: IBMIBM Plex Sans;
                        margin-top: 20px;
                    }
                }

                .item:hover {
                    img {
                        transform: scale(1.05);
                        transition: transform 500ms;
                    }
                }
            }


        }


        .fenge {
            border: 1px solid #000;
            border-left: none;
            border-right: none;
            margin: 30px 0;
            overflow: hidden;
            margin: 120px 0 60px 0;

            .item {
                height: 80px;
                display: flex;
                align-items: center;

                .dot {
                    margin: 30px;
                }
            }
        }

        .carousel2 {
            // height: 350px;
            // background-color: #efefef;
        }


        .circle2 {
            min-height: 1500px;
            position: relative;
            overflow: hidden;

            .bgWid2 {
                position: absolute;
                top: -1600px;
                right: 0;
                bottom: 0;
                left: 0;
                z-index: 1;
                overflow: hidden;

                .bg2 {
                    position: absolute;
                    left: 50%;
                    width: 200%;
                    height: 3100px;
                    border-radius: 0 0 50% 50%;
                    border: 1px solid #FFE1FF;
                    background-color: #FFE1FF;
                    -webkit-transform: translate(-50%, 0);
                    -ms-transform: translate(-50%, 0);
                    -o-transform: translate(-50%, 0);
                    transform: translate(-50%, 1);
                }
            }

            .circle2Cnt {
                position: relative;
                z-index: 2;
                color: #fff;
                text-align: center;
                min-height: 820px;
                background-image: linear-gradient(0deg, #FFE1FF, #FFFFFF);
                padding-top: 84px;

                .h1 {
                    color: #000;
                    font-size: 64px;
                }

                .nftCollect {
                    display: flex;
                    margin: 50px auto 50px auto;
                    justify-content: space-between;
                    width: fit-content;

                    .item {
                        border: 1px solid #DDE3E7;
                        background-color: #fff;
                        padding: 20px;
                        margin-left: 50px;
                        width: 410px;
                        border-radius: 10px;

                        .img {
                            width: 100%;
                            border-radius: 10px;
                            overflow: hidden;

                            img {
                                width: 100%;
                            }
                        }

                        .titleBox {
                            display: flex;
                            border-bottom: 1px solid #DEDEDE;
                            color: #000;
                            padding: 20px 0;
                            justify-content: space-between;
                            align-items: center;

                            .title {
                                font-size: 28px;
                                font-family: Poppins;
                                font-weight: 400;
                                text-transform: uppercase;
                            }

                            .info2 {
                                padding: 5px 10px;
                                border-radius: 50px;
                                background-color: #F6F6F6;
                            }
                        }

                        .desc {
                            color: #616366;
                            padding: 20px 0;
                            line-height: 24px;
                            text-align: left;
                            height: 40px;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            line-height: 30px;
                        }

                    }

                    .item:hover {
                        .img {
                            transform: scale(1.05);
                            transition: transform 500ms;
                        }
                    }

                    .item:first-child {
                        margin-left: 0;
                    }
                }
            }

        }



    }









}

.btn1,
.btn7,
.btn2 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 54px;
    margin-top: 30px;
    border: 1.2px solid #24282B;
    border-radius: 50px;
    font-size: 20px;
    font-family: Poppins;
    font-weight: 600;
    cursor: pointer;

    .sub {
        font-size: 16px;
        font-weight: normal;
        margin-left: 10px;
    }

    img {
        margin: 0 20px;
        width: 14px;
    }
}

.btn1 {
    height: 56px;
}

.btn2 {
    background-color: #000;
    height: 44px;
}

.btn7 {
    border: 1.2px solid #FFF;
    text-transform: uppercase;
}

.btn3,
.btn4 {
    .outer {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 380px;
        height: 60px;
        background: linear-gradient(-45deg, transparent 12px, #ccc 0) right,
            linear-gradient(135deg, transparent 12px, #ccc 0) left;
        background-size: 50% 100%;
        background-repeat: no-repeat;
    }

    .inner {
        width: calc(100% - 4px);
        height: calc(100% - 4px);
        background: linear-gradient(-45deg, transparent 11px, #fff 0) right,
            linear-gradient(135deg, transparent 11px, #fff 0) left;
        background-size: 50% 100%;
        background-repeat: no-repeat;
        display: flex;
        justify-content: center;
        align-items: center;
        font-family: IBM Plex Sans;
        font-size: 24px;
        font-weight: 400;

        img {
            width: 14px;
            margin: 0 20px;
        }
    }
}

.btn1:hover,
.bt2:hover,
.btn3:hover,
.btn4:hover,
.btn7:hover {
    transform: scale(1.05);
    transition: transform 500ms;
}

.lineBox {

    height: 600px;
    margin: 100px auto 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    .bg {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        .line {
            margin: 0 auto;
            width: 82%;
            height: calc(100% - 100px);
            border: 1px solid rgba(50, 57, 54, 0.6);
            border-bottom: none;
            padding-top: 100px;
        }
    }

    .cnt {
        position: relative;
        width: fit-content;
        text-align: center;


        h1 {
            background-color: rgb(255, 255, 255, 0.95);
            padding: 30px;
        }
    }
}




.nftSub {
    min-height: 718px;
    background-color: #FFE1FF;
    background-image: url('@/assets/nft/image/Vector-bgsub.png');
    display: flex;
    justify-content: space-between;
    overflow: hidden;

    .left {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        width: 100%;

        .h1 {
            font-size: 64px;
            text-transform: uppercase;
        }

        .geniusBox {
            margin-top: 30px;
            padding: 10px;
            background-color: #fff;
            width: 560px;
            border-radius: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 50px;

            .zl {
                width: 115px;
                height: 50px;
                border-radius: 60px;
                background-color: #E5D1FF;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .genBtn {
                width: 137px;
                height: 53px;
                background-color: #212121;
                border-radius: 12px;
                color: #fff;
                display: flex;
                justify-content: center;
                align-items: center;
            }
        }
    }


}


@media screen and (max-width: 800px) {
    .headerBox {
        width: calc(100% - 20px);
        margin: 0 auto;
        height: 680px;

        .cnt {
            .bannerAds {
                width: 100%;
                height: auto;

                img {
                    width: 100%;
                }
            }
        }


    }

    .circleSwiper {
        .swiperNext {
            .cnt {
                flex-direction: column;

                .left {
                    width: calc(100% - 20px);
                    margin: 0 auto;

                    h1 {
                        font-size: 68px;
                    }

                }

                .right {
                    display: none;
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .m2 {
                        margin-top: 30px;
                    }

                    .m1,
                    .m2 {
                        .item {
                            width: fit-content;
                            margin-left: 0;
                        }
                    }


                }


            }

            .fenge {
                margin: 0;
            }

            .circle2 {
                min-height: 1100px;

                .circle2Cnt {
                    .nftCollect {
                        flex-direction: column;
                        align-items: center;

                        .item {
                            width: calc(100% - 60px);
                            margin-bottom: 30px;
                            margin-left: 0;

                        }
                    }
                }

                .bgWid2 {
                    .bg2 {
                        border-radius: 0;
                        height: auto;
                    }
                }
            }
        }
    }

    .nftSub {
        flex-direction: column;
        align-items: center;
        justify-content: center;

        .h1 {
            text-align: center;
        }

        .left {
            .geniusBox {
                width: calc(100% - 40px);
            }
        }

        .right {
            img {
                width: 100%
            }
        }
    }




}

@media screen and (max-width: 500px) {

    .btn3,
    .btn4 {
        .outer {
            width: calc(100% - 40px);
            min-width: 320px;

            .txt {
                font-size: 18px;
                ;
            }
        }
    }

    .headerBox {
        .bg {
            .butterfly:before {
                left: 10px;
                //top: 100px;
            }

            .coin {
                display: none
            }
        }
    }

    .btn1,
    .btn7 {
        width: calc(100% - 20px);
        margin: 30px auto;

        .txt {
            font-size: 18px;
        }
    }

    .circleSwiper {
        .swiperNext {
            .cnt {

                .right {
                    flex-direction: column;
                    justify-content: center;
                    align-items: center;

                    .m2 {
                        margin-top: 30px;
                    }

                    .m1,
                    .m2 {
                        .item {
                            width: fit-content;
                            margin-left: 0;
                        }
                    }


                }
            }
        }
    }

    .lineBox {
        display: none
    }


}
</style>