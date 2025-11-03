import { createApp } from 'vue';
import App from './App.vue';
import router from '@/router';
import pinia from '@/store';
import '@/styles/index.scss';


import SolanaWallets from "solana-wallets-vue";

// You can either import the default styles or create your own.
import "solana-wallets-vue/styles.css";

import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import {
    PhantomWalletAdapter,
    //SlopeWalletAdapter,
    SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";

const walletOptions = {
    wallets: [
        new PhantomWalletAdapter(),
        //new SlopeWalletAdapter(),
        new SolflareWalletAdapter({ network: WalletAdapterNetwork.Devnet }),
    ],
    autoConnect: true,
};

const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(SolanaWallets, walletOptions);

app.mount("#app");
