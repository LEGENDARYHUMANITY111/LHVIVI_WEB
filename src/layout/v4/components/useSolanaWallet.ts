// useWallet.ts
import { ref, onMounted, onUnmounted } from 'vue';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { WalletProvider, useWallet as useBaseWallet } from '@solana/wallet-adapter-vue';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { Connection } from '@solana/web3.js';

const network = WalletAdapterNetwork.Devnet; // or Mainnet, Testnet

export function useWallet() {
    const { connect, disconnect, connected, publicKey, signTransaction } = useBaseWallet();
    const walletAdapter = ref<PhantomWalletAdapter>();

    // 自动连接钱包
    onMounted(async () => {
        walletAdapter.value = new PhantomWalletAdapter();
        await connect();
    });

    // 断线时清理资源
    onUnmounted(() => {
        disconnect();
    });

    // 确保只连接一次，在组件卸载时断开连接
    return {
        connect: () => connect(),
        disconnect,
        connected,
        publicKey,
        signTransaction
    };
}