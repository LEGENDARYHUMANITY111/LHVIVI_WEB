<!-- filepath: /src/components/AbsWalletConnector.vue -->
<template>
  <!--<div>
    <div v-if="loading">操作中...</div>
    <div v-if="error" style="color:red;">{{ error }}</div>
    <div v-if="account">当前账户：{{ account }}</div>
    <div v-if="networkName">当前网络：{{ networkName }}</div>
    <div v-if="nfts.length">
      <h4>NFT列表：</h4>
      <ul>
        <li v-for="nft in nfts" :key="nft.tokenId">
          <div>TokenID: {{ nft.tokenId }}</div>
          <div>名称: {{ nft.name }}</div>
          <div v-if="nft.image">
            <img :src="nft.image" alt="nft image" style="max-width:120px;max-height:120px;">
          </div>
        </li>
      </ul>
    </div>
  </div>-->
</template>

<script setup lang="ts">
import { ref, defineExpose, onMounted } from 'vue'
import Web3 from 'web3'

// ========== 配置区 ==========
const ABS_MAINNET = {
  chainId: '0xAB5',
  chainName: 'Abstract',
  rpcUrls: ['https://api.mainnet.abs.xyz'],
  blockExplorerUrls: ['https://abscan.org/'],
  nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 }
}

const NFT_CONTRACT_ADDRESS = '0x67266b806a2987ef6dfaf6355ccd62c29978dbf9'
const ERC721_ABI = [
  {
    constant: true,
    inputs: [{ name: "_owner", type: "address" }],
    name: "balanceOf",
    outputs: [{ name: "balance", type: "uint256" }],
    type: "function"
  },
  {
    constant: true,
    inputs: [
      { name: "_owner", type: "address" },
      { name: "_index", type: "uint256" }
    ],
    name: "tokenOfOwnerByIndex",
    outputs: [{ name: "tokenId", type: "uint256" }],
    type: "function"
  },
  {
    constant: true,
    inputs: [{ name: "_tokenId", type: "uint256" }],
    name: "tokenURI",
    outputs: [{ name: "uri", type: "string" }],
    type: "function"
  }
]
// ===========================

const web3 = ref<Web3 | null>(null)
const account = ref<string | null>(null)
const networkName = ref<string | null>(null)
const chainId = ref<string | null>(null)
const loading = ref(false)
const error = ref<string | null>(null)
const nfts = ref<{ tokenId: string, name: string, image: string }[]>([])

// 初始化web3
async function initWeb3() {
  if (window.ethereum) {
    web3.value = new Web3(window.ethereum)
    return true
  } else {
    error.value = '请先安装 MetaMask'
    return false
  }
}

// 确保在ABS网络
async function ensureAbsNetwork() {
  if (!web3.value) await initWeb3()
  const currentChainId = await window.ethereum.request({ method: 'eth_chainId' })
  console.log('currentChainId', currentChainId.toLowerCase())
  if (currentChainId.toLowerCase() !== ABS_MAINNET.chainId.toLowerCase()) {
    await switchToAbsNetwork()
  }
}

// 切换到ABS网络
async function switchToAbsNetwork() {
  loading.value = true
  error.value = null
  try {
    if (!web3.value) {
      const ok = await initWeb3()
      if (!ok) throw new Error(error.value)
    }
    try {
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: ABS_MAINNET.chainId }]
      })
    } catch (e: any) {
      if (e.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [ABS_MAINNET]
          })
        } catch (e: any) {
          // 添加网络的报错，直接忽略
        }

        // 再次切换网络，如果仍然失败，则报错
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: ABS_MAINNET.chainId }]
        })
      } else {
        throw e
      }
    }
    chainId.value = ABS_MAINNET.chainId
    networkName.value = ABS_MAINNET.chainName
  } catch (e: any) {
    error.value = e.message || '切换网络失败'
  } finally {
    loading.value = false
  }
}

// 连接钱包（确保在ABS网络）
async function connectWallet() {
  loading.value = true
  error.value = null
  try {
    await ensureAbsNetwork()
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
    account.value = accounts[0]
    chainId.value = await window.ethereum.request({ method: 'eth_chainId' })
    networkName.value = chainId.value === ABS_MAINNET.chainId ? ABS_MAINNET.chainName : chainId.value
    return Promise.resolve(accounts[0]) // 返回钱包地址
  } catch (e: any) {
    error.value = e.message || '连接钱包失败'
    return Promise.reject(e)
  } finally {
    loading.value = false
  }
}

// 断开钱包连接
async function disconnectWallet() {
  loading.value = true
  error.value = null
  const previousAccount = account.value // 保存断开前的钱包地址
  try {
    // 1. 清空本地状态
    account.value = null
    nfts.value = []
    networkName.value = null
    chainId.value = null

    // 2. 如果 MetaMask 已安装
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        // 移除所有事件监听器
        window.ethereum.removeAllListeners()
        
        // 清除 MetaMask 的缓存
        await window.ethereum.request({
          method: 'wallet_revokePermissions',
          params: [{
            eth_accounts: {}
          }]
        })
      } catch (e) {
        console.log('断开连接时发生错误:', e)
      }
    }

    // 3. 清除本地存储的账户信息
    if (window.localStorage) {
      // 清除所有与钱包相关的本地存储
      const keysToRemove = [
        'metaMask',
        'WEB3_CONNECT_CACHED_PROVIDER',
        'walletconnect',
        'wallet'
      ]
      
      Object.keys(window.localStorage).forEach(key => {
        if (keysToRemove.some(k => key.startsWith(k))) {
          window.localStorage.removeItem(key)
        }
      })
    }
    
    return Promise.resolve(previousAccount) // 返回断开前的钱包地址
  } catch (e: any) {
    error.value = e.message || '断开连接时出错'
    console.error('断开连接错误:', e)
    return Promise.reject(e)
  } finally {
    loading.value = false
  }
}

// 读取当前账户下所有NFT信息（确保在ABS网络）
async function fetchMyNfts() {
  loading.value = true
  error.value = null
  nfts.value = []
  try {
    await ensureAbsNetwork()
    if (!web3.value || !account.value) throw new Error('请先连接钱包')
    const contract = new web3.value.eth.Contract(ERC721_ABI as any, NFT_CONTRACT_ADDRESS)
    const balance = await contract.methods.balanceOf(account.value).call()
    for (let i = 0; i < Number(balance); i++) {
      const tokenId = await contract.methods.tokenOfOwnerByIndex(account.value, i).call()
      const tokenURI = await contract.methods.tokenURI(tokenId).call()
      let meta = {}
      try {
        let url = tokenURI
        if (url.startsWith('ipfs://')) url = url.replace('ipfs://', 'https://ipfs.io/ipfs/')
        meta = await fetch(url).then(res => res.json())
      } catch (e) {
        meta = {}
      }
      nfts.value.push({
        tokenId,
        name: (meta as any).name || '',
        image: (meta as any).image || ''
      })
    }
  } catch (e: any) {
    error.value = e.message || '读取NFT信息失败'
  } finally {
    loading.value = false
  }
}

// 默认初始化web3
onMounted(async () => {
  await initWeb3()
})

defineExpose({
  initWeb3,
  switchToAbsNetwork,
  disconnectWallet,
  connectWallet,
  fetchMyNfts,
  web3,
  account,
  networkName,
  chainId,
  nfts,
  loading,
  error
})
</script>