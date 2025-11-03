<template>
    <div class="pageCnt" :style="{ minHeight: 'calc(' + height + ' - 107px - 120px)' }">


        <div class="userBox">
            <h1 class="title">My account</h1>
            <div class="userCnt">
                <div class="left">
                    <div class="img" v-if="userInfo.headimg.length > 0">
                        <img :src="img(userInfo.headimg)" />
                    </div>
                    <div>
                        <h2>{{ userInfo.nickname }}</h2>
                        <div class="walletBox">
                            <div class="imgwallet">
                                <img src="@/assets/nft/image/Wallet.png" />
                            </div>
                            <div class="wallet" @click="copy(userInfo.username)">
                                {{ userInfo.username }}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="right">
                    <div class="invateBox">
                        <div class="img">
                            <!-- <img src="@/assets/nft/image/add 1.png" /> -->
                            <qrcode-vue :value="resp.invateCode.url" :size="80" level="h" :render-as="renderAs" />
                        </div>
                        <div>
                            <div class="h2">
                                Invitation code
                            </div>
                            <div class="code" @click="copy(resp.invateCode.url)">
                                {{ resp.invateCode.code }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="info2">
            <div class="box">
                <h1 class="title">NFT</h1>
                <div class="totalVal">total value</div>
                <div class="totalAmount"><span class="gray">≈</span>{{ resp.tokenValues.nft || '-' }}<span
                        class="unit">USDT</span>
                </div>
                <div class="nftCnt">
                    <template v-for="(item, index) in resp.myMintedNfts.data" :key="index">
                        <div class="item">
                            <div class="img">
                                <img :src="img(item.image)" />
                            </div>
                            <div class="title">
                                {{ item.name }}
                            </div>
                        </div>
                    </template>

                </div>
                <div class="pager" v-if="resp.myMintedNfts.total > 4">
                    <el-pagination layout="prev, pager, next" :total="resp.myMintedNfts.total" :page-size="4"
                        @change="nftPageChange" />
                </div>
            </div>
            <div class="box">
                <h1 class="title">Purchase History</h1>
                <div class="totalVal">Total Cost</div>
                <div class="totalAmount"><span class="gray">≈</span>{{ resp.tokenValues.my_order_cost || '-' }}<span
                        class="unit">USDT</span></div>
                <div class="tableCnt">
                    <el-table :data="resp.orderPage.data" stripe style="width: 100%" max-height="320">
                        <el-table-column prop="NFT" label="NFT" width="200">
                            <template #default="{ row }">
                                <div class="commission_nft_box">
                                    <div class="img">
                                        <img :src="img(row.nft.image)" />
                                    </div>
                                    <div class="name">{{ row.nft.name }}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="Nft Address" width="200">
                            <template #default="{ row }">
                                {{ row.nft_address }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="state" label="Orign Price" width="120">
                            <template #default="{ row }">
                                {{ formatMoney(row.nft_usdt_price, 2) }} {{ row.pay_coin }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="mint_pay_price" label="Pay Price" width="120">
                            <template #default="{ row }">
                                {{ formatMoney(row.pay_amount, 2) }} {{ row.pay_coin }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="mint_time" label="Mint Time" width="200" />
                    </el-table>
                    <div class="pager" v-if="resp.orderPage.total > 15">
                        <el-pagination layout="prev, pager, next" :total="resp.orderPage.total" :page-size="15"
                            @change="changeOrderPage" />
                    </div>
                </div>
            </div>
            <div class="box">
                <h1 class="title">Token</h1>
                <div class="totalVal">total value</div>
                <div class="totalAmount"><span class="gray">≈</span>{{ resp.tokenValues.commission || '-' }}</div>
                <div class="tokenCnt">
                    <div class="item" v-for="(item, index) in resp.myTokens" :key="index">
                        <div class="flex4">
                            <img v-if="'image' in item" src="@/assets/nft/image/G-logo-b 1.png" />
                            <span style="font-size: 28px; font-weight: 600;">{{ item.name }}</span>
                        </div>
                        <!-- <div class="flex4">
                            <div class="subTitle">Accumulated</div>
                            <div class="subVal">{{ formatMoney(item.total, 2) }}</div>
                        </div> -->
                        <div class="flex4">
                            <div class="subTitle">Balance</div>
                            <div class="subVal">{{ formatMoney(item.value, 2) }}</div>
                        </div>
                        <div class="flex4">
                            <div style="display:flex;justify-content: end">
                                <Button class="btn1" @btn-click="withdrawal">
                                    <template #default>
                                        <div>Withdrawal</div>
                                    </template>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class=" box">
                <h1 class="title">Invitation rewards</h1>
                <div class="totalVal">total kickback</div>
                <div class="totalAmount"><span class="gray">≈</span>{{ resp.tokenValues.commission ||
        '-' }}<span class="unit">USDT</span></div>
                <div class="tableCnt">
                    <el-table :data="resp.commisionPage.data" stripe style="width: 100%" max-height="320">
                        <el-table-column prop="NFT" label="NFT" width="200">
                            <template #default="{ row }">
                                <div class="commission_nft_box">
                                    <div class="img">
                                        <img :src="img(row.nft.image)" />
                                    </div>
                                    <div class="name">{{ row.nft.name }}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="state" label="Minted User" width="200">
                            <template #default="{ row }">
                                <div class="commission_user_box">
                                    <div class="img">
                                        <!-- <img v-if="row.mintedMember.headimg" :src="img(row.mintedMember.headimg)" /> -->
                                        <el-avatar> {{
        row.mintedMember.nickname.substring(row.mintedMember.nickname.length
            - 1)
    }} </el-avatar>
                                    </div>
                                    <div class="name">{{ row.mintedMember.nickname }}</div>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="mint_pay_price" label="Minted Price" width="120">
                            <template #default="{ row }">
                                {{ formatMoney(row.mint_pay_price, 2) }} {{ row.coin_name }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="" label="Commission" width="120">
                            <template #default="{ row }">
                                {{ formatMoney(row.commission, 2) }} {{ row.coin_name }}
                            </template>
                        </el-table-column>
                        <el-table-column prop="create_time" label="Date" width="200" />
                    </el-table>
                    <div class="pager" v-if="resp.commisionPage.total > 15">
                        <el-pagination layout="prev, pager, next" :total="resp.commisionPage.total" :page-size="15"
                            @change="changeCommissionPage" />
                    </div>
                </div>
            </div>
        </div>


    </div>

</template>
<script lang="ts" setup>


import { computed, reactive, ref, watch } from 'vue';
import { getMyInvateCodeList } from '@/api/lhs/user';

import QrcodeVue from 'qrcode.vue'
import type { Level, RenderAs } from 'qrcode.vue'
import Button from '@/layout/v4/components/Button.vue'

const renderAs = ref<RenderAs>('svg')

import { getNftCommissionPage, getNftTokenValues, getMyMintedNftPages, getNftOrderPage, getMyTokens } from '@/api/lht/nft'

const toMint = (nftHash: string) => {
    toUrl('/detail?id=' + nftHash);
}

import { useUserStoreHook } from '@/store/modules/lhs/user'
import { img, copy, showNotification, formatMoney } from '@/utils/utils';
import { toUrl } from '@/utils/router';
const useUserStore = useUserStoreHook();
const isLogin = computed(() => useUserStore.isLogin())
const userInfo = computed(() => useUserStore.info)

const height = window.innerHeight + 'px';

const emit = defineEmits(['showLoginDialog'])
const openLoginDialog = () => {
    if (!isLogin.value) {
        emit('showLoginDialog', {})
    }
}

const withdrawal = () => {
    showNotification('Coming soon', 'error')
}

const resp = reactive({
    categoryNft: [],
    carouselPlay: [],
    invateCode: {},
    commisionPage: {},
    tokenValues: {},
    myMintedNfts: {},
    orderPage: {},
    myTokens: [],
})
const loginedRequest = () => {

    if (isLogin.value) {

        getMyInvateCodeList({}).then((res) => {
            if (res.length > 0) {
                resp.invateCode = res[0]
            }
        })

        getNftCommissionPage({ page: 1 }).then((res) => {
            resp.commisionPage = res
        })

        getNftTokenValues({}).then((res) => {
            resp.tokenValues = res
        })

        getMyMintedNftPages({ page: 1, limit: 4 }).then((res) => {
            resp.myMintedNfts = res
        })

        getNftOrderPage({ page: 1 }).then((res) => {
            resp.orderPage = res;
        })

        getMyTokens({}).then((res) => {
            resp.myTokens = res;
        })

    } else {
        toUrl('/');
    }
}

const nftPageChange = (currentPage, pageSize) => {
    getMyMintedNftPages({ page: currentPage, limit: pageSize }).then((res) => {
        resp.myMintedNfts = res
    })
}

const changeCommissionPage = (page) => {
    getNftCommissionPage({ page: page }).then((res) => {
        resp.commisionPage = res
    })
}

const changeOrderPage = (page) => {
    getNftOrderPage({ page: page }).then((res) => {
        resp.orderPage = res
    })
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

















import { ref } from 'vue'
import dayjs from 'dayjs'

const now = new Date()

const tableData = ref([
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-03',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-01',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
    {
        date: '2016-05-02',
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    },
])


const onAddItem = () => {
    now.setDate(now.getDate() + 1)
    tableData.value.push({
        date: dayjs(now).format('YYYY-MM-DD'),
        name: 'Tom',
        state: 'California',
        city: 'Los Angeles',
        address: 'No. 189, Grove St, Los Angeles',
        zip: 'CA 90036',
    })
}

</script>
<style lang="scss" scoped>
@import "/src/assets/nft/css/v4.scss";

.pageCnt {
    width: calc(100% - 140px);
    margin: 0 auto;
}

.userBox {
    width: calc(100% - 60px - 4px);
    flex-direction: column;
    border-radius: 20px;
    border: 1px solid #909090;
    padding: 0 30px 30px 30px;

    .userCnt {
        margin-top: 30px;
        display: flex;
        justify-content: space-between;

        .left {
            display: flex;
            align-items: center;

            .img {
                width: 100px;
                height: 100px;
                border-radius: 100px;
                border: 1px solid #000;
                overflow: hidden;
                margin-right: 30px
            }

            .walletBox {
                display: flex;

                .imgwallet {
                    width: 18px;
                    margin-right: 5px;

                    img {
                        width: 100%;
                    }
                }

                .wallet {
                    cursor: pointer;
                    word-break: break-all;
                    line-height: 20px;
                }
            }


        }

        .invateBox {
            border: 1px solid #080A0C;
            padding: 10px 30px;
            border-radius: 20px;
            display: flex;
            background-color: #fff;
            align-items: center;

            .img {
                width: 78px;
                padding: 10px 30px 10px 0;

                img {
                    width: 100%;
                }
            }

            .h2 {
                color: #000;
                font-family: "Helvetica Neue";
                font-size: 20px;
                font-weight: 400;
            }

            .code {
                color: #080A0C;
                font-variant-numeric: lining-nums proportional-nums;
                font-family: Kanit;
                font-size: 36px;
                font-weight: 600;
                cursor: pointer;
                text-align: center;
            }
        }
    }
}

.title {
    color: #000;
    font-family: "PP Fragment";
    font-size: 52px;
    font-style: normal;
    font-weight: 400;
}

.info2 {
    margin-bottom: 50px;

    .box {
        width: calc(50% - 20px - 60px - 4px);
        display: inline-flex;
        flex-direction: column;
        margin-top: 40px;
        border-radius: 20px;
        border: 1px solid #909090;
        margin-left: 40px;
        padding: 0 30px 30px 30px;
        height: 600px;
    }

    .box:nth-child(odd) {
        margin-left: 0;
    }



    .totalVal {
        color: #000;
        font-family: "PP Fragment";
        font-size: 24px;
        font-style: normal;
        font-weight: 400;
        text-transform: capitalize;
    }

    .totalAmount {
        color: #070707;
        font-variant-numeric: lining-nums proportional-nums;
        font-family: Kanit;
        font-size: 48px;
        font-style: normal;
        font-weight: 600;

        .gray {
            color: #C2CAD6;
            margin-right: 5px;
        }

        .unit {
            margin-left: 5px;
            font-size: 16px;
            font-weight: normal
        }
    }

    .nftCnt {
        margin-top: 15px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;

        .item {
            border: 1px solid #999;
            border-radius: 10px;
            padding: 10px;
            width: 140px;
            display: inline-flex;
            flex-direction: column;
            //margin-right: 15px;
            margin-top: 15px;
            cursor: pointer;

            .img {
                width: 140px;
                height: 230px;
                overflow: hidden;
                border-radius: 10px;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                }
            }

            .img:hover {
                transform: scale(1.03);
                transition: all .5s ease-in-out;
            }

            .title {
                font-size: 14px;
                margin-top: 10px;
                overflow: hidden;
                text-overflow: ellipsis;
                line-height: 30px;
                height: 30px;
            }
        }

        .item:last-child {
            margin-right: 0;
        }
    }

    .tokenCnt {
        margin-top: 15px;

        .item {
            margin-top: 15px;
            border: 1px solid #999;
            border-radius: 10px;
            padding: 10px;
            display: flex;
            align-items: center;

            .flex4 {
                flex: 4;
                text-align: center;
            }

            .subTitle {
                color: #6D7F9C;
                font-variant-numeric: lining-nums proportional-nums;
                font-family: Kanit;
                font-size: 14px;
                font-weight: 300;
            }

            .subVal {
                color: #080A0C;
                font-variant-numeric: lining-nums proportional-nums;
                font-family: Kanit;
                font-size: 18px;
                font-style: normal;
                font-weight: 600;
                margin-top: 5px;
            }
        }
    }

    .tableCnt {
        margin-top: 30px;


    }
}

.pager {
    margin-top: 20px;
}

.commission_nft_box,
.commission_user_box {
    display: flex;
    align-items: center;

    .img {
        width: 60px;
        margin-right: 10px;

        img {
            width: 100%;
        }
    }
}

.commission_user_box {
    .img {
        width: 40px;
        border-radius: 40px;
        overflow: hidden;
    }
}

.btn1 {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px !important;
    border-radius: 12px;
    font-size: 16px;
    font-family: Poppins;
    font-weight: 600;
    cursor: pointer;
    background-color: #000;
    width: fit-content;
    padding: 0 15px;
}

.btn1:hover {
    transform: scale(1.03);
    transition: transform .5s;
    color: #fff;
}

@media screen and (max-width: 800px) {
    .pageCnt {
        width: calc(100% - 20px)
    }

    .info2 {
        .box {
            width: calc(100% - 60px - 2px);
            margin-left: 0;
            height: auto;
        }
    }

    .btn1 {
        font-size: 14px;
        padding: 0 5px;
    }

    // .tokenCnt {
    //     .item {
    //         flex-direction: column;

    //         .flex4 {
    //             margin-top: 20px;
    //         }
    //     }
    // }
}

@media screen and (max-width: 500px) {
    .userCnt {
        flex-direction: column;

        .right {
            margin-top: 30px;
        }
    }
}
</style>