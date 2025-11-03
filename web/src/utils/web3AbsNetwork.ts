// filepath: /src/utils/web3AbsNetwork.ts
import Web3 from 'web3';

export async function connectToAbs(isTestnet = false) {
    const chainId = isTestnet ? '0x2B74' : '0xAB5';
    const params = {
        chainId,
        chainName: isTestnet ? 'Abstract Testnet' : 'Abstract',
        rpcUrls: [isTestnet ? 'https://api.testnet.abs.xyz' : 'https://api.mainnet.abs.xyz'],
        blockExplorerUrls: [isTestnet ? 'https://sepolia.abscan.org/' : 'https://abscan.org/'],
        nativeCurrency: { name: 'Ethereum', symbol: 'ETH', decimals: 18 }
    };

    if (!window.ethereum) throw new Error('请先安装 MetaMask');

    // 先切换，失败再添加
    try {
        await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId }] });
    } catch (e: any) {
        if (e.code === 4902) {
            try {
                // 网络不存在，尝试添加
                await window.ethereum.request({ method: 'wallet_addEthereumChain', params: [params] });
            } catch (e: any) {
            }

            // 添加后再切换
            await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId }] });
        } else {
            throw e;
        }
    }

    // 获取账户
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const web3 = new Web3(window.ethereum);
    return {
        web3,
        account: accounts[0],
        networkName: params.chainName,
        chainId
    };
}