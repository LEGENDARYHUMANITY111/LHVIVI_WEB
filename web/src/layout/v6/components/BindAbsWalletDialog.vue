<template>
    <div>
        <Dialog :show="show" :title="title" @close="closeDialogClick" :close-on-click-modal="closeOnClickModal"
            :show-close="showClose" :close-on-press-escape="false">
            <template #content>
                <div>
                    <h1>Connect Abstract Wallet</h1>

                    <div class="walletBox">
                        <div class="item">
                            <el-button @click="connectAbsWalletMetamask" :disabled="currentChannel === 'agw'">
                                <div class="btnBox">
                                    <div class="img">
                                        <img src="@/assets/lhs/v4/image/MetaMask.png" />
                                    </div>
                                    <div class="name">
                                        <template v-if="metamaskAddress">
                                            ({{ metamaskAddress.slice(0, 6) }}...{{ metamaskAddress.slice(-4) }}) Disconnect Metamask
                                        </template>
                                        <template v-else>
                                            Connect Metamask
                                        </template>
                                    </div>
                                </div>
                            </el-button>
                        </div>

                        <div class="item">
                            <el-button
                                :loading="isConnecting"
                                @click="handleConnectAgw"
                                :disabled="!isAgwInstalled() || currentChannel === 'metamask'"
                            >
                            <div class="btnBox">
                                <div class="img">
                                        <img src="@/assets/lhs/v4/image/abs-logo.svg" />
                                    </div>
                                    <div class="name">
                                        <template v-if="isConnecting">
                                            <i class="el-icon-loading"></i>
                                            Connecting...
                                        </template>
                                        <template v-else-if="!isAgwInstalled()">
                                            <i class="el-icon-warning"></i> Install
                                            AGW
                                        </template>
                                        <template v-else>
                                            {{
                                                isConnected
                                                    ? `(${walletAddress?.slice(0, 6)}...${walletAddress?.slice(-4)}) Disconnect AGW`
                                                    : 'Connect AGW'
                                            }}
                                        </template>
                                    </div>
                            </div>
                            </el-button>
                        </div>

                    </div>

                    <div class="tips">
                        <p>You can only choose one of the following two methods</p>
                        <p>After binding, the NFT list in the wallet will be automatically obtained</p>
                    </div>

                </div>
            </template>
        </Dialog>

        <AbsWalletConnector ref="absWalletRef" />
    </div>
</template>
<script lang="ts" setup>

// 组件相关代码
import Dialog from '@/layout/v5/components/Dialog.vue'
import { computed, onMounted, reactive, ref, watch } from 'vue';
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
})


watch(
    () => prop.show,
    (newVal, oldVal) => {
        console.log(oldVal);
        if (newVal == true) {

        }
    }
)




const emit = defineEmits(['closeDialog'])
const closeDialogClick = (res) => {
    emit('closeDialog', res)
}

import AbsWalletConnector from '@/layout/v5/components/Web3AbsNetwork.vue';
const absWalletRef = ref<any>();
import {
   bindAbstractWallet,
   deleteAbstractWallet,
   getBindAbstractWallet,
} from '@/api/lhs/user';

const metamaskAddress = ref<string>('');
const currentChannel = ref<string>('')

const connectAbsWalletMetamask = async () => {
    if(metamaskAddress.value){
        disconnectWalletMetamask();
        currentChannel.value = '';
        return;
    }
    currentChannel.value = 'metamask';
   absWalletRef.value.connectWallet().then((res) => {
      console.log('connectAbsWallet', res);
      metamaskAddress.value = res;
      bindAbstractWallet({ address: res,type:0 }).then((res) => {
         console.log('bindAbstractWallet', res);
      });
   }).catch((err) => {
      console.log('connectAbsWallet', err);
      showNotification(err.message || 'Failed to connect to wallet', 'error');
      currentChannel.value = '';
      metamaskAddress.value = '';
   }); // 直接调用组件暴露的方法
};

const disconnectWalletMetamask = async () => {
   absWalletRef.value.disconnectWallet().then((res) => {
      deleteAbstractWallet({ address: res }).then((res) => {
        metamaskAddress.value = ''
         console.log('deleteAbstractWallet', res);
         //absNftPageChange(1, 4);
      });
   }); // 直接调用组件暴露的方法
};


import { useAgwWallet } from '@/composables/useAgwWallet';

const {
   walletAddress,
   isConnecting,
   isConnected,
   isAgwInstalled,
   connectWallet,
   disconnectWallet,
   error
} = useAgwWallet();
import { useUserStoreHook } from '@/store/modules/lhs/user';
import { showNotification } from '@/utils/utils';
const useUserStore = useUserStoreHook();

const handleConnectAgw = async () => {
   try {
      if (isConnected.value) {
        disconnectAgwWallet();
         showNotification('AGW Wallet disconnected','success');
         currentChannel.value = '';
      } else {
        currentChannel.value = 'agw';
         await connectWallet();
         console.log('address=======================', walletAddress.value);
         if(walletAddress.value){
            bindAbstractWallet({ address: walletAddress.value,type:1 }).then((res) => {
                showNotification(
                `AGW Wallet connected: ${walletAddress.value?.slice(0, 6)}...${walletAddress.value?.slice(-4)}`,'success'
                );
            });
         }
      }
   } catch (err: any) {
      currentChannel.value = '';
      console.error('AGW connection error:', err);
      // Only show error notification if it's not a user rejection
      if (!err.message.includes('rejected') && !err.message.includes('cancelled')) {
         showNotification(err.message || 'Failed to connect AGW wallet', 'error');
      }
   }
};

const disconnectAgwWallet = () => {
    deleteAbstractWallet({ address: walletAddress.value }).then((res) => {
         console.log('deleteAbstractWallet', res);
         //absNftPageChange(1, 4);
         disconnectWallet()
      });
}


const getBindAbstractWalletData = async () => {
   getBindAbstractWallet().then((res) => {
      console.log('getBindAbstractWallet', res);
      if(res?.channel === 0) {
        metamaskAddress.value = res.address;
        currentChannel.value = 'metamask';
      }else if(res?.channel === 1) {
        walletAddress.value = res.address;
        currentChannel.value = 'agw';
        isConnected.value = true;
      }
   });
}

onMounted(() => {
   getBindAbstractWalletData();
})


</script>
<style lang="scss" scoped>
@import "/src/assets/v5/css/common.scss";

.el-button--btn1 {
    background-image: none;
    background-color: #7140EB;
    color: #fff;
}

.tips {
    margin-top: 30px;
    color: #606266;
}

:deep(.el-button) {
    height: auto;    
}

.walletBox {
    display: flex;
    justify-content: center;
    margin: 30px;
    flex-direction: column;
    align-items: center;

    .item {
        margin-bottom: 10px;
        .btnBox {
            padding: 5px;
            display: flex;
            align-items: center;
            .name {
            margin-left: 10px;
            font-size: 16px;
        }
        }
        
    }
}
</style>