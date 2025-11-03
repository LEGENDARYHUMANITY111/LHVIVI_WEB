<template>
    <div class="pageBox">
        <div class="banner">
            <el-carousel height="1059px">
                <el-carousel-item>
                    <img src="/src/assets/v6/image/image 12.png" />
                </el-carousel-item>
                <el-carousel-item>
                    <img src="/src/assets/v6/image/image 452.png" />
                </el-carousel-item>
            </el-carousel>
        </div>

        <div class="cntBox">
            <div class="leftBox">
                <div class="filterBox" v-for="item in filterList.filter_list" :key="item.key">
                    <div class="filterTitle">
                        <div class="icon"></div>
                        <div class="title">{{ item.name }}</div>
                    </div>
                    <template v-if="item.key === 'nft_color'">
                        <div class="colorBox">
                            <div class="color" v-for="item2 in item.value" :key="item2.value" :style="{ backgroundColor: `#${item2.value}` }" :class="{ checked: item2.checked }" @click="handleFilterChange(item.key, item2.value)"></div>
                        </div>
                    </template>
                    <template v-else>
                        <div class="filterItem" v-for="item2 in item.value" :key="item2.value">
                            <div class="checkbox">
                                 <el-checkbox 
                                    :model-value="item2.checked"
                                    @click="handleFilterChange(item.key, item2.value)">
                                    {{ item2.name }}
                                </el-checkbox>
                            </div>
                            <div class="text">({{ item2.count || 0 }})</div>
                        </div>
                    </template>
                </div>
            </div>
            <div class="rightBox">
                <template v-if="Object.keys(filterParams).length > 0">
                    <template v-if="resp.lists.data.length > 0">
                        <div class="nftBoxContentBox">
                                <div class="nftListBox">
                            <div v-for="(item,index) in resp.lists.data" :key="index" class="nftListItem">
                                <div class="nftListItemImg">
                                        <img :src="item.ipfs_image|| img(item.image)" />
                                    </div>
                                    <div class="nftListItemInfoBox">
                                        <div class="nftListItemInfoTitleBox">
                                            <div class="nftListItemInfoTitle">{{item.name}}</div>
                                            <div class="nftListItemInfoAmount">1</div>
                                    </div>
                                    <div></div>
                                    <div class="nftListItemInfoArtist">
                                        <div class="avatar-group">
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=1" />
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=2" />
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=3" />
                                        </div>
                                        <div class="nftListItemInfoArtistName">
                                            Artist
                                        </div>
                                    </div>
                                </div>
                                <div class="nftListItemFooter">
                                    <div class="nftListItemFooterLeft">
                                        <div class="nftListItemFooterLeftPriceTitle">
                                            <div class="nftListItemFooterLeftPriceNum">
                                                Price
                                            </div>
                                            <div class="nftListItemFooterLeftPriceAmount">
                                                {{parseFloat(item?.category?.mint_price).toFixed(2)}} USD
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nftListItemFooterRight">
                                       <el-button type="success" round @click="showArtNftDetail(item.id)">Available</el-button>
                                    </div>
                                </div>
                            </div>
                        </div>
                            </div>
                            <div class="pager">
                   <el-pagination
                      layout="prev, pager, next"
                      background
                      :total="resp.lists.total"
                      :page-size="resp.lists.per_page"
                      @change="fetchFilteredData"
                   />
                </div>
                    </template>
                    <template v-else>
                        <div class="noDataBox">
                            <div class="noDataBoxIcon"></div>
                            <div class="noDataBoxTxt">No Data</div>
                        </div>
                    </template>
                </template>
                <template v-else>
                    <div class="nftBox">
                    
                    <div class="title1Box">
                        <div class="title1Left">
                            <div class="title1Icon">
                                <img src="/src/assets/v6/image/Icon.png" />
                            </div>
                            <div class="title1TxtBox">
                                <div class="title1TxtMain">Latest Collection</div>
                                <div class="title1TxtSub">Explore the latest art from Mago Nagasaka, exhibited in the MAGO Moon Museum.</div>
                            </div>
                        </div>
                        <div class="rightTxt">View All</div>
                    </div>
                    <div class="nftBoxContentBox bg1">
                        <div class="title2Box">
                            <div class="title2Left">
                                <div class="title2LeftMain">
                                    MAGO Moon Museum
                                </div>
                                <div class="title2LeftSubBox">
                                    <div class="title2LeftSubBox_icon">
                                        <img src="/src/assets/v6/image/image 16.png"></img>
                                    </div>
                                    <div class="title2LeftSubBox_txt">
                                        Mago Creation
                                    </div>
                                </div>
                            </div>
                            <div class="title2Right">
                                <div class="title2RightBg"></div>
                                <div class="title2RightTxt">View exhibition</div>
                            </div>
                        </div>

                        <div class="title3Box">
                            <div class="title3BoxMan">
                                RWA
                            </div>
                            <div class="title3BoxSub">
                                Physical artwork that comes with the Digitized Article (NFT) of your purchase. Available only during the primary sale. Secondary sales are limited to the Digitized Article only.
                            </div>
                        </div>

                        <div class="nftListBox">
                            <template v-for="(item,index) in resp.lists.data" :key="index">
                                <div class="nftListItem" v-if="index < 6">
                                <div class="nftListItemImg">
                                        <img :src="item.ipfs_image" />
                                    </div>
                                    <div class="nftListItemInfoBox">
                                        <div class="nftListItemInfoTitleBox">
                                            <div class="nftListItemInfoTitle">{{item.name}}</div>
                                            <div class="nftListItemInfoAmount">1</div>
                                    </div>
                                    <div></div>
                                    <div class="nftListItemInfoArtist">
                                        <div class="avatar-group">
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=1" />
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=2" />
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=3" />
                                        </div>
                                        <div class="nftListItemInfoArtistName">
                                            Artist
                                        </div>
                                    </div>
                                </div>
                                <div class="nftListItemFooter">
                                    <div class="nftListItemFooterLeft">
                                        <div class="nftListItemFooterLeftPriceTitle">
                                            <div class="nftListItemFooterLeftPriceNum">
                                                Price
                                            </div>
                                            <div class="nftListItemFooterLeftPriceAmount">
                                                {{parseFloat(item?.category?.mint_price).toFixed(2)}} USD
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nftListItemFooterRight">
                                       <el-button type="success" round @click="showArtNftDetail(item.id)">Available</el-button>
                                    </div>
                                </div>
                                 </div>
                            </template>
                            
                        </div>

                        <div class="title3Box">
                            <div class="title3BoxMan">
                                Digitized Article
                            </div>
                            <div class="title3BoxSub">
                                 An NFT created from an ultra-high-resolution 3D scan of the physical artwork using LEGENDARY HUMANITY technology. 
Depending on the piece, it enables various experiences such as “Exhibit-to-Earn” and “Wear-to-Earn.”
                            </div>
                        </div>

                        <div class="nftListBox">
                            <template v-for="(item,index) in resp.lists.data" :key="index">
                                <div class="nftListItem" v-if="index < 6">
                                <div class="nftListItemImg">
                                        <img :src="item.ipfs_image" />
                                    </div>
                                    <div class="nftListItemInfoBox">
                                        <div class="nftListItemInfoTitleBox">
                                            <div class="nftListItemInfoTitle">{{item.name}}</div>
                                            <div class="nftListItemInfoAmount">1</div>
                                    </div>
                                    <div></div>
                                    <div class="nftListItemInfoArtist">
                                        <div class="avatar-group">
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=1" />
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=2" />
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=3" />
                                        </div>
                                        <div class="nftListItemInfoArtistName">
                                            Artist
                                        </div>
                                    </div>
                                </div>
                                <div class="nftListItemFooter">
                                    <div class="nftListItemFooterLeft">
                                        <div class="nftListItemFooterLeftPriceTitle">
                                            <div class="nftListItemFooterLeftPriceNum">
                                                Price
                                            </div>
                                            <div class="nftListItemFooterLeftPriceAmount">
                                                {{parseFloat(item?.category?.mint_price).toFixed(2)}} USD
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nftListItemFooterRight">
                                       <el-button type="success" round @click="showArtNftDetail(item.id)">Available</el-button>
                                    </div>
                                </div>
                                 </div>
                            </template>
                        </div>

                    </div>
                </div>

                <div class="nftBox">
                    <div class="title1Box">
                        <div class="title1Left">
                            <div class="title1Icon">
                                <img src="/src/assets/v6/image/Ico2n.png" />
                            </div>
                            <div class="title1TxtBox">
                                <div class="title1TxtMain">Explore</div>
                            </div>
                        </div>
                    </div>
                    <div class="nftBoxContentBox bg2">
                        <div class="title2Box">
                            <div class="title2Left">
                                <div class="title2LeftMain">
                                    LA MUSEUM
                                </div>
                                <div class="title2LeftSubBox">
                                    <div class="title2LeftSubBox_icon">
                                        <img src="/src/assets/v6/image/image 16.png"></img>
                                    </div>
                                    <div class="title2LeftSubBox_txt">
                                        LAILA
                                    </div>
                                </div>
                            </div>
                            <div class="title2Right">
                                <div class="title2RightBg"></div>
                                <div class="title2RightTxt">View exhibition</div>
                            </div>
                        </div>

                        <div class="title3Box">
                            <div class="title3BoxMan">
                                RWA
                            </div>
                            <div class="title3BoxSub">
                                Physical artwork that comes with the Digitized Article (NFT) of your purchase. Available only during the primary sale. Secondary sales are limited to the Digitized Article only.
                            </div>
                        </div>

                        <div class="nftListBox">
                            <template v-for="(item,index) in resp.lists.data" :key="index">
                                <div class="nftListItem" v-if="index < 6">
                                <div class="nftListItemImg">
                                        <img :src="item.ipfs_image" />
                                    </div>
                                    <div class="nftListItemInfoBox">
                                        <div class="nftListItemInfoTitleBox">
                                            <div class="nftListItemInfoTitle">{{item.name}}</div>
                                            <div class="nftListItemInfoAmount">1</div>
                                    </div>
                                    <div></div>
                                    <div class="nftListItemInfoArtist">
                                        <div class="avatar-group">
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=1" />
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=2" />
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=3" />
                                        </div>
                                        <div class="nftListItemInfoArtistName">
                                            Artist
                                        </div>
                                    </div>
                                </div>
                                <div class="nftListItemFooter">
                                    <div class="nftListItemFooterLeft">
                                        <div class="nftListItemFooterLeftPriceTitle">
                                            <div class="nftListItemFooterLeftPriceNum">
                                                Price
                                            </div>
                                            <div class="nftListItemFooterLeftPriceAmount">
                                                {{parseFloat(item?.category?.mint_price).toFixed(2)}} USD
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nftListItemFooterRight">
                                       <el-button type="success" round @click="showArtNftDetail(item.id)">Available</el-button>
                                    </div>
                                </div>
                                 </div>
                            </template>
                        </div>

                        <div class="title3Box">
                            <div class="title3BoxMan">
                                Digitized Article
                            </div>
                            <div class="title3BoxSub">
                                 An NFT created from an ultra-high-resolution 3D scan of the physical artwork using LEGENDARY HUMANITY technology. 
Depending on the piece, it enables various experiences such as “Exhibit-to-Earn” and “Wear-to-Earn.”
                            </div>
                        </div>

                        <div class="nftListBox">
                            <template v-for="(item,index) in resp.lists.data" :key="index">
                                <div class="nftListItem" v-if="index < 6">
                                <div class="nftListItemImg">
                                        <img :src="item.ipfs_image" />
                                    </div>
                                    <div class="nftListItemInfoBox">
                                        <div class="nftListItemInfoTitleBox">
                                            <div class="nftListItemInfoTitle">{{item.name}}</div>
                                            <div class="nftListItemInfoAmount">1</div>
                                    </div>
                                    <div></div>
                                    <div class="nftListItemInfoArtist">
                                        <div class="avatar-group">
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=1" />
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=2" />
                                            <img class="avatar" src="https://i.pravatar.cc/40?img=3" />
                                        </div>
                                        <div class="nftListItemInfoArtistName">
                                            Artist
                                        </div>
                                    </div>
                                </div>
                                <div class="nftListItemFooter">
                                    <div class="nftListItemFooterLeft">
                                        <div class="nftListItemFooterLeftPriceTitle">
                                            <div class="nftListItemFooterLeftPriceNum">
                                                Price
                                            </div>
                                            <div class="nftListItemFooterLeftPriceAmount">
                                                {{parseFloat(item?.category?.mint_price).toFixed(2)}} USD
                                            </div>
                                        </div>
                                    </div>
                                    <div class="nftListItemFooterRight">
                                       <el-button type="success" round @click="showArtNftDetail(item.id)">Available</el-button>
                                    </div>
                                </div>
                                 </div>
                            </template>
                        </div>

                    </div>
                </div>
                </template>
                


                
            </div>
        </div>


        <ArtDialog :show="showNftDetailDialog && 'id' in resp.currentInfo" :close-on-press-escape="false" :close-on-click-modal="false" @close="closeNftDetailDialog">
            <template #content>
                <div class="artDialogBox">
                    <div class="artDialogTitle">
                        <div class="htitle" style="margin: 0 0 60px 0;">
                            <div class="bgl"></div>
                            <div class="txt">
                                {{resp.currentInfo.name}}
                            </div>
                            <div class="bgr"></div>
                        </div>
                    </div>
                    <div class="artDialogCntBox">
                        <div class="nftImgBox">
                            <img :src="img(resp.currentInfo.image)" />
                        </div>
                        <div class="nftDetail" style="height: 500px;">
                           
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

import ArtDialog from '@/layout/v6/components/ArtDialog.vue'
import Button from '@/layout/v5/components/Button.vue'
import { getArtNftList,getArtNftInfo, getArtNftFilterList, getArtNftListV6 } from '@/api/lht/nft'
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
        per_page: 24,
        total: 0
    },
    data: [],
    currentInfo: {},
})

const filterList = reactive({
    filter_list: []
})

const showNftDetailDialog = ref(false)

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

// mint

import MintArtNftDialog from '@/layout/v6/components/MintArtNftDialog.vue'
import { getStripeProxyMintPayUrl } from "@/api/lhs/user";
import { onMounted } from "vue";
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

const filterParams: Record<string, any> = {};
// 在 setup 中定义获取列表数据的函数
const fetchFilteredData = (page:number, limit:number) => {
    // 构建筛选参数
    filterList.filter_list.forEach(group => {
        const checkedItem = group.value.find(item => item.checked);
        if (checkedItem) {
            filterParams[group.key] = checkedItem.value;
        }
    });
    
    // 构建请求参数
    const params = {
        page: page,
        limit: limit,
        ...filterParams
    };
    
    // 调用接口获取数据
    return getArtNftListV6(params).then((res) => {
        resp.lists = res;
        resp.data = res.data || [];
        return res;
    });
};

// 修改 handleFilterChange 方法
const handleFilterChange = (key: string, value: string) => {
    const filterGroup = filterList.filter_list.find(item => item.key === key);
    if (!filterGroup) return;
    
    // 更新选中状态
    let isChecked = false;
    filterGroup.value.forEach(item => {
        if (item.value === value) {
            item.checked = !item.checked;
            isChecked = item.checked;
        } else {
            item.checked = false;
        }
    });
    
    // 更新 filterParams
    if (isChecked) {
        filterParams[key] = value;
    } else {
        delete filterParams[key];
    }
    
    // 强制触发Vue的响应式更新
    filterList.filter_list = [...filterList.filter_list];
    
    // 调用获取数据的函数
    fetchFilteredData(resp.lists.current_page, resp.lists.per_page);
};

// 在组件挂载时获取筛选条件并加载数据
onMounted(() => {

    getArtNftFilterList({}).then((res) => {
        filterList.filter_list = res.filter_list;
        fetchFilteredData(resp.lists.current_page, resp.lists.per_page);
    })
});

</script>

<style lang="scss" scoped>
@import "/src/assets/v6/css/common.scss";

.pageBox {
    min-height: calc(100vh - 110px);
    width: calc(100% - 40px);
    max-width: 1920px;
    min-width: 370px;
    margin: 0 auto;
}

.banner {
    height: 1059px;
    background-color: #efefef;
    margin-top: 120px;
}

.cntBox {
    margin-top: 100px;
    display: flex;
    justify-content: space-between;
    padding-bottom: 50px;

    .leftBox {
        width: 262px;
    }

    .filterBox {
        border-bottom: 1px solid #C7C7C7;
        padding: 20px 0;

        .filterTitle {
            display: flex;
            justify-content: start;
            align-items: center;

            margin-bottom: 10px;

            .icon {
                width: 10px;
                height: 10px;
                margin-right: 10px;
                background-color: #000;
            }
        }

        .filterItem {
            display: flex;
            justify-content: space-between;
            align-items: center;

            .text {
                color: #ccc;
                font-size: 14px;
            }
        }

        .colorBox {
            .color {
                width: 28px;
                height: 28px;
                border: 1px solid #ebebeb;
                border-radius: 28px;
                display: inline-block;
                margin-right: 20px;
                margin-top: 10px;
                cursor: pointer;
            }

            .color.checked {
                border-color: #000;
                background-image: url('/src/assets/v6/image/Icon.png');
                background-size: cover;
            }

            .color1 {
                background: linear-gradient(135deg, #000000 50%, #ffffff 50%);
            }
            .color2 {
                background-color: #E33434;
            }
            .color3 {
                background-color: #E39D34;
            }
            .color4 {
                background-color: #E3D734;
            }
            .color5 {
                background-color: #91E334;
            }
            .color6 {
                background-color: #2EBF70;
            }
            .color7 {
                background-color: #4DC9DC;
            }
            .color8 {
                background-color: #3489E3;
            }
            .color9 {
                background-color: #7734E3;
            }
            .color10 {
                background-color: #E334AE;
            }
            .color11 {
                background-color: #fff;
            }
            .color12 {
                background-color: #C0C0C0;
            }
            .color13 {
                background-color: #000000;
            }
            .color14 {
                background-color: #fff;
            }
        }
    }

    .filterBox:last-child {
        border-bottom: none;
    }


    .rightBox {
       width: 100%;
       width: calc(100% - 262px - 30px);


        .nftBox {
            background: linear-gradient( 177deg, rgba(89,107,120,0.13) 0%, rgba(0,0,0,0) 50%, rgba(89,107,120,0.13) 100%);
            border-radius: 10px 10px 10px 10px;
            padding: 40px;
            margin-bottom: 50px;


            .title1Box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 30px;

                .title1Left {
                    display: flex;
                    align-items: center;
                    .title1Icon {
                        width: 35px;
                        height: 35px;
                        margin-right: 20px;
                        img {
                            width: 100%;
                            height: 100%;
                        }
                    }

                    .title1TxtBox {
                        height: 100%;
                        display: flex;
                        flex-direction: column;
                        align-items: start;

                        .title1TxtMain {
                            font-weight: 400;
                            font-size: 20px;
                            color: #2C3D49;
                            line-height: 20px;
                        }

                        .title1TxtSub {
                            font-weight: 400;
                            font-size: 13px;
                            color: #65696C;
                            line-height: 14px;
                            text-align: left;
                            font-style: normal;
                            margin-top: 6px;
                        }
                    }
                }

                .rightTxt {
                     color: #ccc;
                    margin-left: 20px;
                    font-size: 14px;
                    padding: 10px;
                    background-color: #fff;
                    border-radius: 4px;
                }
            }

            .title2Box {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 20px;

                .title2Left{
                    width: 200px;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;

                    .title2LeftMain {
                        font-weight: 400;
                        font-size: 20px;
                        color: #2C3D49;
                        line-height: 20px;
                        text-align: left;
                        font-style: normal;
                    }
                    .title2LeftSubBox {
                        display: flex;
                        justify-content: start;
                        align-items: center;
                        margin-top: 10px;
                        
                        .title2LeftSubBox_icon {
                            margin-right: 10px;
                            width: 28px;
                            height: 30px;
                            img {
                                width: 100%;
                                height: 100%;
                            }
                        }
                        .title2LeftSubBox_txt {
                            font-weight: 400;
                            font-size: 14px;
                            color: #171717;
                            line-height: 21px;
                            text-align: left;
                            font-style: normal;
                        }
                    }
                }

                .title2Right {
                    width: calc(100% - 200px);
                    display: flex;
                    align-items: center;
                    .title2RightBg {
                        width: calc(100% - 140px);
                        height: 3px;
                        background: linear-gradient( 94deg, rgba(0,0,0,0) 0%, rgba(89,107,120,0.13) 100%);
                        border-radius: 4px 4px 4px 4px;
                    }
                    .title2RightTxt {
                        margin-left: 20px;
                        font-weight: 600;
                        font-size: 14px;
                        color: #1B2832;
                        font-style: normal;
                        width: 120px;
                        text-align: center;
                    }
                }
            }

            .title3Box {
                margin: 30px 0;
                .title3BoxMain {
                    font-weight: bold;
                    font-size: 30px;
                    color: #000000;
                    line-height: 20px;
                    text-align: left;
                    font-style: normal;
                }
                .title3BoxSub {
                    margin-top: 13px;
                    font-weight: 400;
                    font-size: 15px;
                    color: #000000;
                    line-height: 20px;
                    text-align: left;
                    font-style: normal;
                }
            }

            

            .bg1 {
                background: linear-gradient( 176deg, rgba(205,0,0,0.5) 0%, rgba(212,209,0,0.5) 50%, rgba(1,32,0,0.5) 100%);
            }

            .bg2 {
                background: linear-gradient( 176deg, rgba(98,189,255,0.13) 0%, rgba(0,95,164,0.2) 50%, rgba(0,27,46,0.5) 100%);
            }
            

        }

        .nftBoxContentBox {
                border-radius: 7px 7px 7px 7px;
                padding: 30px;

                .nftListBox {
                    //margin-top: 30px;
                    .nftListItem {
                        width: 228px;
                        border-radius: 4px;
                        background-color: #fff;
                        display: inline-block;
                        margin-right: 15px;
                        margin-bottom: 20px;
                        border: 1px solid #ccc;
                        .nftListItemImg {
                            width: 100%;
                            height: 228px;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                            img {
                                max-width: 100%;
                                max-height: 100%;
                            }
                            border-bottom: 1px solid rgba(89,107,120,0.13);
                        }
                        .nftListItemInfoBox {
                            width: 100%;
                            height: 108px; 
                            padding: 15px;
                            width: calc(100% - 30px);
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            .nftListItemInfoTitleBox {
                                display: flex;
                                justify-content: space-between;
                                align-items: center;
                               

                                .nftListItemInfoTitle {
                                    width: calc(100% - 80px - 20px);
                                    font-weight: bold;
                                    font-size: 16px;
                                    color: #415462;
                                    line-height: 21px;
                                    text-align: left;
                                    font-style: normal;
                                }

                                .nftListItemInfoAmount {
                                    margin-left: 20px;
                                    width: 80px;
                                    font-weight: 400;
                                    font-size: 13px;
                                    color: #171717;
                                    line-height: 19px;
                                    text-align: right;
                                    font-style: normal;
                                }
                            }

                            .nftListItemInfoArtist {
                                display: flex;
                                align-items: center;
                                justify-content: start;
                                .avatar-group {
                                    display: flex;
                                    align-items: center;
                                    .avatar {
                                        width: 20px;
                                        height: 20px;
                                        border-radius: 4px;
                                        border: 1px solid #fff;
                                        margin-left: -10px; /* 控制重叠程度 */
                                        background: #eee;
                                    }
                                    .avatar:first-child {
                                        margin-left: 0;
                                    }
                                }
                               
                                .nftListItemInfoArtistName {
                                    font-weight: 400;
                                    font-size: 14px;
                                    color: #171717;
                                    line-height: 21px;
                                    text-align: left;
                                    font-style: normal;
                                    margin-left: 10px;
                                }
                            }
                        }
                        .nftListItemFooter {
                            width: calc(100% - 20px);
                            padding: 0 10px;
                            height: 56px;
                            background: rgba(89,107,120,0.13);
                            display: flex;
                            justify-content: space-between;
                            align-items: center;
                            .nftListItemFooterLeft {
                                .nftListItemFooterLeftPriceTitle {
                                    font-weight: 400;
                                    font-size: 11px;
                                    color: #415462;
                                    line-height: 14px;
                                    text-align: left;
                                    font-style: normal;
                                }
                                .nftListItemFooterLeftPriceAmount {
                                    font-weight: 600;
                                    font-size: 14px;
                                    color: #415462;
                                    line-height: 21px;
                                    text-align: left;
                                    font-style: normal;
                                }
                            }
                            .nftListItemFooterRight {

                            }
                        }
                    }
                    .nftListItem:last-child {
                        margin-right: 0;
                    }
                }
            }



    }
}

.noDataBox {
 display: flex;
 flex-direction: column;
 align-items: center;
 justify-content: center;
 .noDataTxt {
    font-weight: 600;
    font-size: 14px;
    color: #415462;
    line-height: 21px;
    text-align: left;
    font-style: normal;
 }
 .noDataImg {
    
 }
}

@media screen and (max-width: 750px) and (min-width: 86px) {
    .cntBox {
        flex-direction: column;
        .leftBox {
            width: 100%;
            margin-bottom: 30px;
        }
        .rightBox {
            width: 100%;
            .nftBox {
                .nftBoxContentBox {
                    .nftListBox {
                        text-align: center;
                        .nftListItem:last-child {
                            margin-right: 15px;
                        }
                    }
                }
            }
        }
    }
}

@media screen and (max-width: 400px) and (min-width: 86px) {
    .cntBox {
        .rightBox {
            .nftBox {
                .nftBoxContentBox {
                    .nftListBox {
                        .nftListItem {
                            width: 100%;
                        }
                    }
                }
            }
        }
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

@media screen and (max-width: 960px) {
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