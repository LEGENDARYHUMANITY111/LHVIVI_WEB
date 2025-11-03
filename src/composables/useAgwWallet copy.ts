import { ref, onMounted } from 'vue'
import { createStore } from 'mipd'
import { custom, type Address, createWalletClient } from 'viem'
import { abstractTestnet } from 'viem/chains'

// Global state
const walletAddress = ref<Address | null>(null)
const isConnecting = ref(false)
const isConnected = ref(false)
const error = ref<string | null>(null)

// Create MIPD store for provider discovery
const store = createStore()

declare global {
  interface Window {
    agw?: {
      isAGW: boolean
      request: (args: { method: string; params?: any[] }) => Promise<any>
      on: (event: string, handler: (...args: any[]) => void) => void
      removeListener?: (event: string, handler: (...args: any[]) => void) => void
    }
  }
}
 
// Initialize AGW web provider
async function initializeAGW() {
  if (typeof window === 'undefined') return
  
  // Dynamically import AGW web provider
  await import('@abstract-foundation/agw-web/testnet')
  
  // Wait for AGW to be injected
  await new Promise<void>((resolve) => {
    const maxAttempts = 10
    let attempts = 0
    
    const checkAGW = () => {
      attempts++
      if (window.agw) {
        resolve()
        return
      }
      if (attempts >= maxAttempts) {
        console.warn('AGW provider not detected after max attempts')
        resolve()
        return
      }
      setTimeout(checkAGW, 100)
    }
    
    checkAGW()
  })
}

export function useAgwWallet() {
  const connectWallet = async (): Promise<string | null> => {
    try {
      isConnecting.value = true
      error.value = null

      // Initialize AGW web provider
      await initializeAGW()
      
      // Wait a bit for provider to be announced
      await new Promise(resolve => setTimeout(resolve, 200))

      // Get available providers
      const providers = store.getProviders()
      
      // Look for Abstract Global Wallet provider
      const agwProvider = providers.find(p => 
        p.info.name.includes('Abstract') || 
        p.info.rdns === 'foundation.abstract.agw'
      )

      if (!agwProvider) {
        throw new Error('Abstract Global Wallet not available. Please try again.')
      }

      // Request account access - this should trigger AGW popup
      console.log('Requesting accounts from AGW provider...')
      const accounts = await agwProvider.provider.request({
        method: 'eth_requestAccounts'
      })

      console.log('ffffffffffffffffffffff________________dddd',accounts)

      if (!accounts || !Array.isArray(accounts) || accounts.length === 0) {
        throw new Error('No accounts found. Please make sure your wallet is unlocked.');
      }

      // Update state
      walletAddress.value = accounts[0];
      isConnected.value = true;

      // Set up event listeners
      setupEventListeners(agwProvider.provider);

      return walletAddress.value;

    } catch (err: any) {
      console.error('AGW connection error:', err);
      error.value = err.message || 'Failed to connect to wallet';
      throw err;
    } finally {
      isConnecting.value = false;
      return null;
    }
  }

  const disconnectWallet = () => {
    walletAddress.value = null;
    isConnected.value = false;
    error.value = null;
  };

  const handleAccountsChanged = (accounts: string[]) => {
    if (!accounts || accounts.length === 0) {
      // Disconnect if no accounts are available
      disconnectWallet();
    } else {
      // Update the current account
      walletAddress.value = accounts[0] as Address;
    }
  };

  const handleDisconnect = () => {
    disconnectWallet();
  };

  const setupEventListeners = (provider: any) => {
    if (!provider) return;
    
    // Listen for account changes
    provider.on('accountsChanged', handleAccountsChanged);
    
    // Listen for disconnect event
    provider.on('disconnect', handleDisconnect);
    
    // Listen for chain changed
    provider.on('chainChanged', () => {
      window.location.reload();
    });
  };

  const isAgwInstalled = (): boolean => {
    const providers = store.getProviders();
    return providers.some(p => 
      p.info.name.includes('Abstract') || 
      p.info.rdns === 'foundation.abstract.agw'
    );
  };

  // Set up initial connection if already connected
  onMounted(async () => {
    try {
      await initializeAGW();
      await new Promise(resolve => setTimeout(resolve, 200));
      
      const providers = store.getProviders();
      const agwProvider = providers.find(p => 
        p.info.name.includes('Abstract') || 
        p.info.rdns === 'foundation.abstract.agw'
      );
      
      if (agwProvider) {
        const accounts = await agwProvider.provider.request({ method: 'eth_accounts' });
        if (accounts && accounts.length > 0) {
          walletAddress.value = accounts[0] as Address;
          isConnected.value = true;
          setupEventListeners(agwProvider.provider);
        }
      }
    } catch (err) {
      console.error('Error checking connected accounts:', err);
    }
  });

  return {
    connectWallet,
    disconnectWallet,
    isAgwInstalled,
    walletAddress,
    isConnected,
    isConnecting,
    error,
  };
}
