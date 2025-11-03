<template>
    <div class="pageBox">
        <div class="mbNav">
            Home -> My NFTs
        </div>

        <div class="pageCnt">
            <div class="nftBox">
                <div class="nftItem" v-for="item in resp.myMintedNfts?.data" :key="item">
                    <div class="img">
                        <img :src="img(item.image)" />
                    </div>
                    <div class="nftBottom">
                        <div class="desc">
                            <div class="name">
                                {{ item.name }}
                            </div>
                            <div class="desc">
                                {{ item.description }}
                                </div>
                        </div>
                        <div class="btnBox">
                        <!-- <Button text-color="#000" class="main-btn widthbtn btnThemes4" @btn-click="showNftDetailDialog(item.category_id)">
                            View Detail
                        </Button> -->
                        <template v-if="item.burn_id == 0">
                            <Button text-color="#fff" class="main-btn widthbtn btnThemes3" @btn-click="showNftDetailDialog(item.nft_hash)">
                            Redeem
                        </Button>
                        </template>
                        <template v-else>
                            <Button text-color="#fff" class="main-btn widthbtn btnThemes3" disabled>
                            Redeemed
                        </Button>
                        </template>
                        
                        </div>
                    </div>
                </div>
                <div v-if="resp.myMintedNfts?.data?.length === 0" class="noData">
                    No Data
                </div>
            </div>
            <div v-if="resp.myMintedNfts?.data?.length > 0" class="pager">
                   <el-pagination
                      layout="prev, pager, next"
                      background
                      :total="resp.myMintedNfts?.total"
                      :page-size="pageSize"
                      @change="nftPageChange"
                   />
                </div>
        </div>
    </div>

    <template v-if="windowWidth <= 800">
        <NftDetailDrawer :nft-id="currentNftId" :show="nftDetailDialogShow"
            @close-drawer="closeNftDetailDialog" />
    </template>
    <template v-else>
        <NftDetailDialog :nft-id="currentNftId" :show="nftDetailDialogShow"
            @close-dialog="closeNftDetailDialog" />
    </template>

</template>

<script lang="ts" setup>
import { getMyMintedNftPages } from '@/api/lht/nft';
import { img } from '@/utils/utils';
import { onMounted, reactive } from 'vue';
import Button from '@/layout/v6/components/Button.vue';
import { ref } from 'vue';

import NftDetailDialog from '@/layout/v6/components/NftDetailDialog2.vue'
import NftDetailDrawer from '@/layout/v6/components/NftDetailDrawer2.vue'

const pageSize = 8;
const resp = reactive({
    myMintedNfts: {},
 });

 getMyMintedNftPages({ page: 1, limit: pageSize }).then((res) => {
    resp.myMintedNfts = res;
});

const nftPageChange = (currentPage) => {
    getMyMintedNftPages({ page: currentPage, limit: pageSize }).then((res) => {
       resp.myMintedNfts = res;
    });
 };

 const windowWidth = ref(0)
 const nftDetailDialogShow = ref(false)
onMounted(() => {
    getWindowResize()
    window.addEventListener('resize', getWindowResize)
})
// 获取屏幕尺寸
const getWindowResize = () => {
    windowWidth.value = window.innerWidth
    nftDetailDialogShow.value = false
}

const currentNftId = ref(0)
const showNftDetailDialog = (id) => {
    currentNftId.value = id
    nftDetailDialogShow.value = true
}

const closeNftDetailDialog = () => {
    nftDetailDialogShow.value = false
     getMyMintedNftPages({ page: 1, limit: pageSize }).then((res) => {
        resp.myMintedNfts = res;
    });
}

</script>

<style lang="scss" scoped>
@import "/src/assets/v6/css/common.scss";

.pageBox {
    min-height: calc(100vh - 110px);
    width: calc(100% - 40px);
    max-width: 1920px;
    min-width: 370px;
    margin: 0 auto;
    padding-bottom: 120px;
}

.mbNav {
    height: 60px;
    margin-top: 120px;
    font-size: 24px;
    font-weight: 600;
    color: #000;
    display: flex;
    align-items: center;
    justify-content: start;
}

.nftBox {
    margin: 40px auto;
    width: 100%;
}

.nftItem {
    width: calc((100% - 60px - 12px) / 4);
    display: inline-block;
    margin-bottom: 20px;
    margin-right: 20px;
    border: 1px solid #efefef;
    .img {
        width: 100%;
        img {
            width: 100%;
            height: calc(100% - 80px);
        }
    }
    .nftBottom {
        padding: 20px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        .desc {
            .name {
                font-size: 24px;
                font-weight: 600;
                color: #000;
            }
            .desc {
                margin-top: 10px;
                font-size: 16px;
                color: #666;
            }
        }
        .btnBox {
            margin-top: 30px;
            width: 100%;
            display: flex;
            justify-content: space-between;
        }
    }
}
.nftItem:nth-child(4n) {
    margin-right: 0;
}
.pager {
    width: 100%;
    margin-top: 15px;
    display: flex;
    justify-content: end;
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
        width: calc(50% - 10px);
        background-image: linear-gradient( 270deg, #9E36CF 19%, rgba(158,54,207,0.21) 91%);
        padding: 5px 0;
        text-align: center;
        font-size: 20px;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.18);
        border-radius: 4px;
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
        background-image: none;
        background-color: #AEAEB2;
        ::v-deep(.btnCnt) {
            background-color: #AEAEB2;
        }
    }
    // themes 3 end

    // themes 3
    .btnThemes4 {
        width: calc(50% - 10px);
        background-image: linear-gradient( 138deg, rgba(89,107,120,0.13) 0%, rgba(0,0,0,0) 50%, rgba(89,107,120,0.13) 100%);
        padding: 5px 0;
        text-align: center;
        font-size: 20px;
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.18);
        border-radius: 4px;
        ::v-deep(.btnCnt) {
            ::v-deep(.btnCnt) {
                background-color: #0C0D0E;
                color: #fff;
            }
        }
    }

    .btnThemes4:not(.disabled):hover {
        box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.18);
        color: #333;
    }

    .btnThemes4.disabled {
        background-color: #AEAEB2;
        ::v-deep(.btnCnt) {
            background-color: #AEAEB2;
        }
    }
    // themes 3 end

    .noData {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        color: #666;
        height: 600px;
    }

    @media screen and (max-width: 860px) {
        .nftItem {
            width: calc((100% - 20px - 8px) / 2);
        }
        .nftItem:nth-child(2n) {
            margin-right: 0;
        }
        .btnThemes3 {
            font-size: 16px;
        }
        .btnThemes4 {
            font-size: 16px;
        }
    }
</style>