<template>
    <div class="page">
       <div class="header">
          <!-- <div class="headerbg"></div> -->
          <div class="headerCnt">
             <div class="posCnt">
                <div class="userinfo">
                   <div class="flexl">
                      <div class="avatar">
                         <img
                            :src="img(userInfo.headimg)"
                            v-if="userInfo.headimg.length > 0"
                         />
                         <img v-else src="@/assets/v6/image/avatar-e9c2e323.png.png" />
                      </div>
                      <div class="info">
                         <div class="accountTile">
                            <img src="@/assets/v5/image/Frame 482053.png" />
                            My account
                         </div>
                         <div class="nickname">{{ userInfo.nickname }}</div>
                         <!-- <div class="wallet">
                            <img src="@/assets/v5/image/Vector 57.png" />
                            <span @click="copy(resp.wallet.solana)">
                               {{ resp.wallet.solana }}
                            </span>
                            <div
                               class="recharge"
                               style="display: flex; gap: 10px"
                            >
                               <el-button
                                  type="warning"
                                  round
                                  @click="showRechargeDialog"
                                  >Recharge</el-button
                               >
                            </div>
                         </div> -->
                      </div>
                   </div>
                   <!-- <div class="flexr">
                      <div class="invateCodeBox">
                         <div class="qrcode">
                            <qrcode-vue
                               :value="resp.invateCode.url"
                               :size="80"
                               level="h"
                               :render-as="renderAs"
                            />
                         </div>
                         <div class="codeBox">
                            <div class="title">Invitation code</div>
                            <div class="code" @click="copy(resp.invateCode.url)">
                               {{ resp.invateCode.code }}
                            </div>
                         </div>
                      </div>
                   </div> -->
                </div>
 
                <div class="h2title">Assets</div>
 
                <div class="coinList">
                   <div class="item">
                      <div class="valueKey">VIVI</div>
                      <div class="valueBox">
                         <div class="value">
                            {{ splitIntAndFloat(resp.assets.vivi)[0] }}.<span>{{
                               splitIntAndFloat(resp.assets.vivi)[1]
                            }}</span>
                         </div>
                         <div class="income">+1%</div>
                      </div>
                      <div class="valueOp">
                         <a
                            href="javascript:void(0)"
                            class="lianjie"
                            @click="showWithdrawDialog('vivi')"
                            >Withdraw</a
                         >
                      </div>
                   </div>
                   <div class="item">
                      <div class="valueKey">USDT</div>
                      <div class="valueBox">
                         <div class="value">
                            {{ splitIntAndFloat(resp.assets.usdt)[0] }}.<span>{{
                               splitIntAndFloat(resp.assets.usdt)[1]
                            }}</span>
                         </div>
                      </div>
                      <div class="valueOp">
                         <a
                            href="javascript:void(0)"
                            class="lianjie"
                            @click="showWithdrawDialog('usdt')"
                            >Withdraw</a
                         >
                      </div>
                   </div>
                   <div class="item">
                      <div class="valueKey">SOL</div>
                      <div class="valueBox">
                         <div class="value">
                            {{ splitIntAndFloat(resp.assets.sol)[0] }}.<span>{{
                               splitIntAndFloat(resp.assets.sol)[1]
                            }}</span>
                         </div>
                      </div>
                      <div class="valueOp">
                         <a
                            href="javascript:void(0)"
                            class="lianjie"
                            @click="showWithdrawDialog('sol')"
                            >Withdraw</a
                         >
                      </div>
                   </div>
                   <!-- <div class="item">
                      <div class="valueKey">VINW</div>
                      <div class="valueBox">
                         <div class="value">
                            {{ splitIntAndFloat(resp.assets.vinw)[0] }}.<span>{{
                               splitIntAndFloat(resp.assets.vinw)[1]
                            }}</span>
                         </div>
                      </div>
                      <div class="valueOp">
                         <a
                            href="javascript:void(0)"
                            class="lianjie"
                            @click="showWithdrawDialog('vinw')"
                            >Withdraw</a
                         >
                      </div>
                   </div> -->
                </div>
             </div>
          </div>
       </div>
 
       <div class="posCnt">
          <div class="nftBox">
             <div class="flexl">
               <div style="display: flex; justify-content: space-between;align-items: center;">
                  <div class="iconTitleBox">
                     <img src="@/assets/v5/image/icont1.png" />
                     <span>NFT</span>
                  </div>
                  <div class="more">
                     <a href="/order" class="lianjie" style="color: #ccc;">More</a>
                  </div>
               </div>
                
                <div class="pageCnt">
                   <div class="totalVal">
                      <div class="valueKey">Total Value</div>
                      <div class="valueBox">
                         <div class="value">
                            $
                            {{
                               resp.tokenValues.nft
                                  ? parseInt(resp.tokenValues.nft)
                                  : '-'
                            }}.<span>00</span>
                         </div>
                      </div>
                   </div>
                   <div class="pageNftList">
                      <el-scrollbar>
                         <div class="pageNftListFlex">
                            <template
                               v-for="(item, index) in resp.myMintedNfts.data"
                               :key="index"
                            >
                               <div class="item">
                                  <img :src="img(item.image)" />
                               </div>
                            </template>
                         </div>
                      </el-scrollbar>
                   </div>
                </div>
                <div class="pager">
                   <el-pagination
                      layout="prev, pager, next"
                      background
                      :total="resp.myMintedNfts.total"
                      :page-size="4"
                      @change="nftPageChange"
                   />
                </div>
             </div>
             <div class="flexr">
                <div class="iconTitleBox">
                   <img src="@/assets/v6/image/cart.png" />
                   <span>Purchase History</span>
                </div>
                <div class="pageCnt">
                   <el-table
                      :data="resp.orderPage.data"
                      stripe
                      style="width: 100%"
                      max-height="420"
                   >
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
                      <el-table-column
                         prop="state"
                         label="Orign Price"
                         width="120"
                      >
                         <template #default="{ row }">
                            {{ formatMoney(row.nft_usdt_price, 2) }}
                            {{ row.pay_coin }}
                         </template>
                      </el-table-column>
                      <el-table-column
                         prop="mint_pay_price"
                         label="Pay Price"
                         width="120"
                      >
                         <template #default="{ row }">
                            {{ formatMoney(row.pay_amount, 2) }}
                            {{ row.pay_coin }}
                         </template>
                      </el-table-column>
                      <el-table-column
                         prop="mint_time"
                         label="Mint Time"
                         width="200"
                      />
                   </el-table>
                </div>
                <div class="pager">
                   <el-pagination
                      layout="prev, pager, next"
                      background
                      :total="resp.orderPage.total"
                      :page-size="15"
                      @change="changeOrderPage"
                   />
                </div>
             </div>
          </div>
 
          <div class="nftBox" style="margin-top: 30px">
             <div class="flexr">
                <div class="iconTitleBox">
                   <img src="@/assets/v6/image/Checkcircle.png" />
                   <span>Airdrop</span>
                </div>
                <div class="pageCnt">
                   <!-- <div class="totalVal">
                      <div class="valueKey">Total Value</div>
                      <div class="valueBox">
                         <div class="value">
                            $
                            {{
                               resp.tokenValues.nft
                                  ? parseInt(resp.tokenValues.nft)
                                  : '-'
                            }}.<span>00</span>
                         </div>
                      </div>
                   </div> -->
                   <div class="airdropBox">
                      <div class="item2">
                         <div class="img">
                            <img src="/src/assets/v6/image/vivicoin.jpg" />
                         </div>
                         <div class="amountValue">
                            <div class="amount">
                               &nbsp;&nbsp; {{ resp.assets.vivi }}
                            </div>
                            <div class="value">≈ $ 0.00</div>
                         </div>
                         <div class="withdraw">
                            <el-button
                               type="btn1"
                               @click="showWithdrawDialog('vivi')"
                            >
                               Withdraw
                            </el-button>
                         </div>
                      </div>
                      <!-- <div class="item2">
                                 <div class="img">
                                     <img src="@/assets/v5/image/G-logo-b 1.png" />
                                 </div>
                                 <div class="amountValue">
                                     <div class="amount">&nbsp;&nbsp; {{ resp.assets.vinw }}</div>
                                     <div class="value">≈ $ 0.00</div>
                                 </div>
                                 <div class="withdraw">
                                     <el-button type="btn1" @click="showWithdrawDialog('vinw')">
                                         Withdraw
                                     </el-button>
                                 </div>
                             </div> -->
                   </div>
                </div>
                <div class="pager">
                   <el-pagination
                      background
                      layout="prev, pager, next"
                      :total="1"
                   />
                </div>
             </div>
             <div class="flexl absflexlBox" style="margin-right: 0; margin-left: 30px">
                <div class="iconTitleBox">
                   <img src="@/assets/v6/image/Abstract_Icon_Black1.png" />
                   <span>Abs NFT</span>
                </div>
                <div class="pageCnt">
                   <div class="totalVal">
                      <div class="valueKey">
                         <div
                            class="recharge"
                         >
                            <span style="margin-right: 10px" v-if="resp.bindAddressData.address.length > 0">
                               {{ '('+(resp.bindAddressData.channel===1?'AGW':'Metamask')+') '+`${resp.bindAddressData.address.slice(0, 6)}...${resp.bindAddressData.address.slice(-4)}` }}</span>
                            <el-button v-if="resp.bindAddressData.address.length > 0" type="success" round @click="fetchNfts" :loading="fetchLoading">Fetch Abs NFT</el-button>
                               <el-button
                               type="danger"
                               round
                               @click="showBindAbsWalletDialog"
                               >Abstract Wallet</el-button
                            >
                         </div>
                      </div>
                   </div>
                   <div class="pageNftList">
                      <el-scrollbar>
                         <div class="absNftBox">
                            <template
                               v-for="(item, index) in resp.absNfts.data"
                               :key="index"
                            >
                               <div class="item">
                                  <img :src="img(item.cover)" />
                                  <!-- <div class="absNftName">
                                     {{ item.token_id }}
                                  </div> -->
                               </div>
                            </template>
                         </div>
                      </el-scrollbar>
                   </div>
                </div>
                <div class="pager">
                   <el-pagination
                      layout="prev, pager, next"
                      background
                      :total="resp.absNfts.total"
                      :page-size="12"
                      @change="absNftPageChange"
                   />
                </div>
             </div>
          </div>
       </div>
 
       <MemberWithdrawDialog
          :show="withdrawDialogShow"
          @close-dialog="closeWithdrawDialog"
          :coin-type="withdrawCoinType"
       />
 
       <RechargeDialog
          :show="RechargeDialogShow"
          @close-dialog="closeRechargeDialog"
       />
 
       <BindAbsWalletDialog
          :show="BindAbsWalletDialogShow"
          @close-dialog="closeBindAbsWalletDialog"
       />
 
       
    </div>
 </template>
 
 <script lang="ts" setup>
 import { computed, reactive, ref, watch } from 'vue';
 import {
    getMyInvateCodeList,
    getAssets,
    getRechargeInfoApi,
    getBindAbstractWallet,
 } from '@/api/lhs/user';
 
 import QrcodeVue from 'qrcode.vue';
 import type { Level, RenderAs } from 'qrcode.vue';
 import { useUserStoreHook } from '@/store/modules/lhs/user';
 import {
    img,
    copy,
    showNotification,
    formatMoney,
    splitIntAndFloat,
 } from '@/utils/utils';
 import { toUrl } from '@/utils/router';
 const useUserStore = useUserStoreHook();
 
 const isLogin = computed(() => useUserStore.isLogin());
 const userInfo = computed(() => useUserStore.info);
 
 // 提现
 import MemberWithdrawDialog from '@/layout/v6/components/MemberWithdrawDialog.vue';
 
 const withdrawDialogShow = ref(false);
 const withdrawCoinType = ref('');
 const showWithdrawDialog = (coinType) => {
    withdrawCoinType.value = coinType;
    withdrawDialogShow.value = true;
 };
 const closeWithdrawDialog = () => {
    withdrawDialogShow.value = false;
    getAssetsData();
 };
 
 // 充值
 import RechargeDialog from '@/layout/v6/components/RechargeDialog.vue';
 const RechargeDialogShow = ref(false);
 const showRechargeDialog = () => {
    RechargeDialogShow.value = true;
 };
 const closeRechargeDialog = () => {
    RechargeDialogShow.value = false;
    getAssetsData();
 };
 
 // 绑定抽象钱包
 import BindAbsWalletDialog from '@/layout/v6/components/BindAbsWalletDialog.vue';
 import { fetchAbsNftPages, getAbsNftPages, getMyMintedNftPages, getMyTokens, getNftCommissionPage, getNftOrderPage, getNftTokenValues } from '@/api/lht/nft';
 const BindAbsWalletDialogShow = ref(false);
 const showBindAbsWalletDialog = () => {
    BindAbsWalletDialogShow.value = true;
 };
 const closeBindAbsWalletDialog = () => {
    BindAbsWalletDialogShow.value = false;
    getBindAbstractWallet().then((res) => {
       resp.bindAddressData = res;
    });
 };
 
 const resp = reactive({
    categoryNft: [],
    carouselPlay: [],
    invateCode: {},
    commisionPage: {},
    tokenValues: {},
    myMintedNfts: {},
    absNfts: {},
    orderPage: {},
    myTokens: [],
    assets: {},
    wallet: {},
    bindAddressData: {
       address: '',
       channel: -1,
    },
 });
 const loginedRequest = () => {
    if (isLogin.value) {
       getMyInvateCodeList({}).then((res) => {
          if (res.length > 0) {
             resp.invateCode = res[0];
          }
       });
       getNftCommissionPage({ page: 1 }).then((res) => {
          resp.commisionPage = res;
       });
       getNftTokenValues({}).then((res) => {
          resp.tokenValues = res;
       });
       getMyMintedNftPages({ page: 1, limit: 4 }).then((res) => {
          resp.myMintedNfts = res;
       });
       getAbsNftPages({ page: 1, limit: 12 }).then((res) => {
          resp.absNfts = res;
       });
       getNftOrderPage({ page: 1 }).then((res) => {
          resp.orderPage = res;
       });
       getMyTokens({}).then((res) => {
          resp.myTokens = res;
       });
       getRechargeInfoApi({}).then((res) => {
          resp.wallet = res;
       });
       getAssetsData();
       getBindAbstractWallet().then((res) => {
          resp.bindAddressData = res;
       });
    } else {
       toUrl('/');
    }
 };
 
 const getAssetsData = () => {
    getAssets({}).then((res) => {
       resp.assets = res;
    });
 };
 
 const nftPageChange = (currentPage, pageSize) => {
    getMyMintedNftPages({ page: currentPage, limit: pageSize }).then((res) => {
       resp.myMintedNfts = res;
    });
 };
 
 const absNftPageChange = (currentPage, pageSize) => {
    getAbsNftPages({ page: currentPage, limit: pageSize }).then((res) => {
       resp.absNfts = res;
    });
 };
 
 const changeCommissionPage = (page) => {
    getNftCommissionPage({ page: page }).then((res) => {
       resp.commisionPage = res;
    });
 };
 
 const changeOrderPage = (page) => {
    getNftOrderPage({ page: page }).then((res) => {
       resp.orderPage = res;
    });
 };
 
 loginedRequest();
 
 watch(isLogin, (value) => {
    if (value) {
       // 已经登录，执行代码
       console.log('登录成功');
    } else {
       // 未登录，执行代码
       console.log('退出登录');
    }
    loginedRequest();
 });
 
 
 
 const fetchLoading = ref(false);
 const fetchNfts = async () => {
    fetchLoading.value = true;
    fetchAbsNftPages({ address: resp.bindAddressData.address }).then((res) => {
       setTimeout(() => {
          absNftPageChange(1, 12);
          fetchLoading.value = false;
       }, 10000);
    }).finally(() => {
       fetchLoading.value = false;
    });
 };
 
 </script>
 
 <style lang="scss" scoped>
 @import '/src/assets/v5/css/common.scss';
 
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
       height: 710px;
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

          background: linear-gradient( 180deg, rgba(113,64,235,0.2) 0%, #FFFFFF 100%);
 
          .userinfo {
             width: calc(100% - 60px);
             height: 160px;
             margin-top: 180px;
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
                   border-radius: 220px;
                   background-color: #fff;
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
                      color: #7140eb;
 
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
 
                      .recharge {
                         margin-left: 10px;
                      }
 
                      img {
                         width: 24px;
                         height: 24px;
                         margin-right: 10px;
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
             justify-content: start;
 
             .item {
                border: 1px solid #e5e5ea;
                width: calc(100% / 4 - 70px);
                border-radius: 20px;
                padding: 20px;
                height: 100px;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                margin-right: 20px;
             }
             .item:last-child {
                margin-right: 0;
             }
          }
       }
    }
 
    .valueKey {
       font-family: Poppins;
       font-size: 24px;
       font-weight: 400;
       text-align: left;
       color: #aeaeb2;
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
          background-color: #e3f2eb;
          color: #39a06f;
          font-family: Kanit;
          font-size: 24px;
          font-weight: 500;
          border-radius: 5px;
          margin-left: 10px;
          line-height: 30px;
       }
    }
 
    .lianjie {
       position: relative;
       display: inline;
    }
 
    .lianjie::before {
       content: '';
       position: absolute;
       bottom: -5px;
       left: 0;
       right: 0;
       height: 2px;
       background-color: #16baaa;
       transform-origin: bottom right;
       transform: scaleX(0);
       transition: transform 0.3s ease;
    }
 
    .lianjie:hover::before {
       transform-origin: bottom left;
       transform: scaleX(1);
    }
 
    .nftBox {
       height: 600px;
       display: flex;
 
       .pageNftList {
          width: 100%;
          margin-top: 20px;
          height: calc(100% - 90px);
 
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
 
          .absNftBox {
               display: grid;
               grid-template-columns: repeat(6, 1fr); /* 6列 */
               grid-template-rows: repeat(2, 1fr);    /* 2行 */
               gap: 16px; /* item间距，可根据需要调整 */
               width: 100%;
               height: 100%;
               box-sizing: border-box;
               padding-top: 30px;
            }

            .absNftBox .item {
            width: 100%;
            height: 140px;
            overflow: hidden;
            border-radius: 20px;
            background: #fff;
            display: flex;
            align-items: center;
            justify-content: center;
            }

            .absNftBox .item img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 20px;
            box-shadow: 5px 5px 10px 0 rgb(0, 0, 0, 0.1);
            }
       }
 
       .flexl {
          width: calc(60% - 70px);
          height: calc(100% - 60px);
          margin-right: 30px;
          border: 1px solid #e5e5ea;
          border-radius: 20px;
          background-color: #fcfcfe;
          padding: 30px;
          overflow: hidden;
       }
 
       .flexr {
          width: calc(40% - 70px);
          height: calc(100% - 60px);
          border: 1px solid #e5e5ea;
          border-radius: 20px;
          background-color: #fcfcfe;
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
          border: 1px solid #e5e5ea;
          border-radius: 20px;
          background-color: #fcfcfe;
          width: calc(50% - 15px - 60px);
          padding: 30px;
       }
    }
 
    .airdropBox {
       .item2 {
          margin-top: 20px;
          width: calc(100% - 60px);
          border: 1px solid rgb(0, 0, 0, 0.5);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-radius: 20px;
          background-color: #fff;
          padding: 10px 30px;
 
          .amountValue {
             font-family: Kanit;
             font-weight: 600;
 
             .amount {
                font-size: 20px;
             }
 
             .value {
                margin-top: 5px;
                font-size: 14px;
                font-weight: normal;
             }
          }
       }
 
       .el-button--btn1 {
          background-image: none;
          background-color: #7140eb;
          color: #fff;
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
 
 @media screen and (max-width: 860px) {
    .posCnt {
       max-width: 100%;
       margin: 0 10px;
    }
 
    .page {
       .header {
          height: 1040px;
 
          .headerbg {
             background-size: 200%;
          }
 
          .headerCnt {
             .userinfo {
                height: 360px;
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
 
                      .wallet {
                         flex-direction: column;
 
                         .recharge {
                            margin-top: 20px;
                         }
                      }
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
          height: 1230px;
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
             width: calc(100% - 60px);
             min-height: 540px;
             margin-right: 0;
             border: 1px solid #e5e5ea;
             border-radius: 20px;
             background-color: #fcfcfe;
             padding: 30px;
          }
 
          .flexr {
             margin-top: 30px;
             width: calc(100% - 60px);
             height: 540px;
             border: 1px solid #e5e5ea;
             border-radius: 20px;
             background-color: #fcfcfe;
             padding: 30px;
          }

          .absflexlBox {
            margin-left: 0 !important;
            margin-top: 30px;
          }
          
          .pageNftList {
            height: 500px;
            .absNftBox {
               grid-template-columns: repeat(4, 1fr); /* 4列 */
               grid-template-rows: repeat(3, 1fr);    /* 3行 */
            }
          }

          

       }
 
       .rewardBox {
          height: 1000px;
          flex-direction: column;
          margin-top: 0;
 
          .item {
             margin-top: 30px;
             height: calc(100% - 60px);
             border: 1px solid #e5e5ea;
             border-radius: 20px;
             background-color: #fcfcfe;
             width: calc(100% - 20px);
             padding: 30px 10px;
 
             .airdropBox {
                display: flex;
                justify-content: space-between;
 
                .item2 {
                   flex-direction: column;
                   margin-top: 20px;
                   width: calc(50% - 25px);
                   padding: 10px;
 
                   .withdraw {
                      margin-top: 20px;
                   }
                }
             }
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
 