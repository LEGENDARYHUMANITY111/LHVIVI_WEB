<template>
    <div class="page">
        <div class="header">
            <div class="headerbg"></div>
            <div class="headerCnt">
                <div class="posCnt">
                    <div class="userinfo">

                        <div class="flexl">
                            <div class="avatar">
                                <img src="@/assets/v5/image/avatar.png" />
                            </div>
                            <div class="info">
                                <div class="accountTile">
                                    <img src="@/assets/v5/image/Frame 482053.png" />
                                    My account
                                </div>
                                <div class="nickname">Vivian zhao</div>
                                <div class="wallet">
                                    <img src="@/assets/v5/image/Vector 57.png" />
                                    ENg9EgAvbVD6Fq7cdaR5snmLcA7v4RNSzbjByZYipdtr
                                </div>
                            </div>
                        </div>
                        <div class="flexr">
                            <div class="invateCodeBox">
                                <div class="qrcode">
                                    <img src="@/assets/v5/image/tmp2.png" />
                                </div>
                                <div class="codeBox">
                                    <div class="title">Invitation code</div>
                                    <div class="code">245-374</div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="h2title">
                        Airdrop
                    </div>

                    <div class="coinList">
                        <div class="item">
                            <div class="valueKey">VIVI</div>
                            <div class="valueBox">
                                <div class="value">$ 100.<span>00</span></div>
                                <div class="income">+12%</div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="valueKey">USDT</div>
                            <div class="valueBox">
                                <div class="value">$ 1000.<span>00</span></div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="valueKey">SOL</div>
                            <div class="valueBox">
                                <div class="value">$ 500.<span>00</span></div>
                            </div>
                        </div>
                        <div class="item">
                            <div class="valueKey">VINW</div>
                            <div class="valueBox">
                                <div class="value">$ 0.<span>00</span></div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>

        <div class="posCnt">
            <div class="nftBox">
                <div class="flexl">
                    <div class="iconTitleBox">
                        <img src="@/assets/v5/image/icont1.png" />
                        <span>NFT</span>
                    </div>
                    <div class="pageCnt">
                        <div class="totalVal">
                            <div class="valueKey">Total Value</div>
                            <div class="valueBox">
                                <div class="value">$ 0.<span>00</span></div>
                            </div>
                        </div>
                        <div class="pageNftList">
                            <el-scrollbar>
                                <div class="pageNftListFlex">
                                    <div class="item">
                                        <img src="@/assets/v5/image/tmp3.png" />
                                    </div>
                                    <div class="item">
                                        <img src="@/assets/v5/image/tmp3.png" />
                                    </div>
                                    <div class="item">
                                        <img src="@/assets/v5/image/tmp3.png" />
                                    </div>
                                    <div class="item">
                                        <img src="@/assets/v5/image/tmp3.png" />
                                    </div>
                                </div>

                            </el-scrollbar>

                        </div>

                    </div>
                    <div class="pager">
                        <el-pagination background layout="prev, pager, next" :total="1" />
                    </div>
                </div>
                <div class="flexr">
                    <div class="iconTitleBox">
                        <img src="@/assets/v5/image/icont2.png" />
                        <span>Purchase History</span>
                    </div>
                    <div class="pageCnt"></div>
                    <div class="pager">
                        <el-pagination background layout="prev, pager, next" :total="1" />
                    </div>
                </div>
            </div>

            <div class="rewardBox">
                <div class="item">
                    <div class="iconTitleBox">
                        <img src="@/assets/v5/image/icont4.png" />
                        <span>Rewards</span>
                    </div>
                    <div class="pageCnt"></div>
                    <div class="pager">
                        <el-pagination background layout="prev, pager, next" :total="1" />
                    </div>
                </div>
                <div class="item">
                    <div class="iconTitleBox">
                        <img src="@/assets/v5/image/icont3.png" />
                        <span>Reward history</span>
                    </div>
                    <div class="pageCnt"></div>
                    <div class="pager">
                        <el-pagination background layout="prev, pager, next" :total="1" />
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
@import "/src/assets/v5/css/common.scss";

.posCnt {
    max-width: 1700px;
    margin: 0 auto;
}

.page {
    width: 100%;
    position: relative;
    background-image: url('@/assets/v5/image/user_mbg.jpg');
    background-position: center center;
    background-size: 100%;
    height: 100%;
    padding-bottom: 30px;

    .header {
        width: 100%;
        height: 870px;
        position: relative;
        background-image: url('@/assets/v5/image/lh_mypage_bg.jpg');
        background-repeat: no-repeat;
        background-position: top left;

        .headerbg {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-image: url('@/assets/v5/image/lh_mypage_topbg.jpg');
            background-repeat: no-repeat;
            background-position: top left;
            background-size: 100%;
            z-index: 991;
        }

        .headerCnt {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 994;

            .userinfo {
                width: calc(100% - 60px);
                height: 160px;
                margin-top: 360px;
                border-radius: 20px;
                box-shadow: 0 4px 4px 0 rgba(214, 174, 239, 0.1);
                border: 1px solid #fff;
                background-image: url('@/assets/v5/image/lh_mypage_userbg.png');
                background-size: cover;
                background-position: center center;
                background-color: #fff;
                display: flex;
                justify-content: space-between;
                padding: 30px;

                .flexl {
                    display: flex;
                    position: relative;

                    .avatar {
                        position: absolute;
                        top: -60px;
                        width: 210px;
                        height: 210px;
                        padding: 5px;
                        border-radius: 220px;
                        background-color: #FFF;
                        overflow: hidden;

                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .info {
                        margin-left: 260px;

                        .accountTile {
                            padding: 10px 20px;
                            background-color: #fff;
                            border-radius: 40px;
                            width: fit-content;
                            font-family: Poppins;
                            font-size: 20px;
                            font-weight: 400;
                            text-align: left;
                            display: flex;
                            align-items: center;
                            color: #7140EB;

                            img {
                                margin-right: 10px;
                            }
                        }

                        .nickname {
                            font-family: Poppins;
                            font-size: 32px;
                            font-weight: 700;
                            line-height: 48px;
                            margin: 10px 0;
                        }

                        .wallet {
                            display: flex;
                            align-items: center;
                            font-size: 18px;
                            word-wrap: break-word;
                            word-break: break-all;

                            img {
                                width: 24px;
                                height: 24px;
                                margin-right: 10px
                            }
                        }
                    }
                }

                .flexr {

                    .invateCodeBox {
                        border-radius: 20px;
                        border: 1px solid rgb(0, 0, 0, 0.1);
                        padding: 15px 30px;
                        display: flex;
                        align-items: center;

                        .qrcode {
                            margin-right: 20px;
                        }

                        .codeBox {
                            text-align: center;

                            .title {
                                font-size: 20px;
                                font-weight: 400;
                                text-transform: uppercase;
                            }

                            .code {
                                font-family: Kanit;
                                font-size: 36px;
                                font-weight: 600;
                            }
                        }
                    }
                }
            }

            .h2title {
                font-family: Abhaya Libre ExtraBold;
                font-size: 48px;
                font-weight: 800;
                line-height: 56.63px;
                margin: 30px 0;
            }

            .coinList {
                display: flex;
                justify-content: space-between;

                .item {
                    border: 1px solid #E5E5EA;
                    width: calc(100% / 4 - 70px);
                    border-radius: 20px;
                    padding: 20px;
                    height: 100px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }

            }
        }

    }

    .valueKey {
        font-family: Poppins;
        font-size: 24px;
        font-weight: 400;
        text-align: left;
        color: #AEAEB2;
    }

    .valueBox {
        display: flex;
        align-items: baseline;

        .value {
            font-family: Kanit;
            font-size: 42px;
            font-weight: 600;

            span {
                font-size: 30px;
                font-weight: 500;
            }
        }

        .income {
            padding: 5px 10px;
            background-color: #E3F2EB;
            color: #39A06F;
            font-family: Kanit;
            font-size: 24px;
            font-weight: 500;
            border-radius: 5px;
            margin-left: 10px;
            line-height: 30px;
        }
    }

    .nftBox {
        height: 600px;
        display: flex;

        .pageNftList {
            width: 100%;
            margin-top: 20px;
            height: calc(100% - 80px);

            .pageNftListFlex {
                display: inline-flex;

                .item {
                    width: 240px;
                    height: 320px;
                    border-radius: 20px;
                    overflow: hidden;
                    margin-right: 20px;

                    img {
                        width: 100%;
                        height: 100%;
                        box-shadow: 5px 5px 10px 0 rgb(0, 0, 0, 0.1);
                    }

                }
            }



        }

        .flexl {
            flex: 8;
            height: calc(100% - 60px);
            margin-right: 30px;
            border: 1px solid #E5E5EA;
            border-radius: 20px;
            background-color: #FCFCFE;
            padding: 30px;
        }

        .flexr {
            flex: 4;
            height: calc(100% - 60px);
            border: 1px solid #E5E5EA;
            border-radius: 20px;
            background-color: #FCFCFE;
            padding: 30px;
        }
    }

    .rewardBox {
        height: 470px;
        display: flex;
        margin-top: 30px;
        justify-content: space-between;

        .item {
            height: calc(100% - 60px);
            border: 1px solid #E5E5EA;
            border-radius: 20px;
            background-color: #FCFCFE;
            width: calc(50% - 15px - 60px);
            padding: 30px;
        }
    }

    .iconTitleBox {
        display: flex;
        align-items: center;
        margin-bottom: 10px;

        img {
            width: 40px;
            height: 40px;
            margin-right: 20px;
        }

        span {
            font-family: Abhaya Libre ExtraBold;
            font-size: 48px;
            font-weight: 800;
        }
    }

    .pageCnt {
        width: 100%;
        // background-color: red;
        padding-top: 15px;
        height: calc(100% - 115px);
    }

    .pager {
        width: 100%;
        height: 40px;
        margin-top: 15px;
    }

}



@media screen and (max-width: 860px) {

    .posCnt {
        max-width: 100%;
        margin: 0 10px;
    }

    .page {

        .header {
            height: 1150px;

            .headerbg {
                background-size: 200%;
            }

            .headerCnt {

                .userinfo {
                    height: 500px;
                    margin-top: 200px;
                    flex-direction: column;

                    .flexl {
                        width: 100%;
                        justify-content: center;

                        .info {
                            margin-left: 0;
                            margin-top: 180px;
                            justify-content: center;
                            display: flex;
                            flex-direction: column;
                            align-items: center;
                        }
                    }
                }

                .coinList {
                    flex-direction: column;
                    display: block;

                    .item {
                        width: calc(100% / 2 - 60px);
                        margin-bottom: 20px;
                        height: 70px;
                        display: inline-flex;
                        margin-right: 20px;
                    }

                    .item:nth-child(2n) {
                        margin-right: 0;
                    }

                }
            }

        }

        .valueKey {
            font-size: 16px;
        }

        .valueBox {

            .value {
                font-size: 28px;

                span {
                    font-size: 20px;
                }
            }

            .income {
                display: none;
                font-size: 20px;
            }
        }

        .nftBox {
            height: 1300px;
            display: flex;
            flex-direction: column;

            .pageNftList {
                width: 100%;
                margin-top: 20px;
                height: calc(100% - 80px);
                display: flex;
                justify-content: space-around;
            }

            .flexl {
                flex: 12;
                height: 540px;
                margin-right: 0;
                border: 1px solid #E5E5EA;
                border-radius: 20px;
                background-color: #FCFCFE;
                padding: 30px;
            }

            .flexr {
                margin-top: 30px;
                flex: 12;
                height: 540px;
                border: 1px solid #E5E5EA;
                border-radius: 20px;
                background-color: #FCFCFE;
                padding: 30px;
            }
        }

        .rewardBox {
            height: 1000px;
            flex-direction: column;
            margin-top: 0;

            .item {
                margin-top: 30px;
                height: calc(100% - 60px);
                border: 1px solid #E5E5EA;
                border-radius: 20px;
                background-color: #FCFCFE;
                width: calc(100% - 60px);
                padding: 30px;
            }
        }

        .iconTitleBox {
            span {
                font-family: Abhaya Libre ExtraBold;
                font-size: 34px;
                font-weight: 800;
            }
        }

    }

}
</style>