<template>
</template>

<script lang="ts">
import { ref, onMounted, reactive } from "vue";
// IMP START - Quick Start
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS } from "@web3auth/base";
// IMP END - Quick Start
import Web3 from "web3";

import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { SolanaPrivateKeyProvider } from "@web3auth/solana-provider";

import bs58 from "bs58";

import { getED25519Key } from "@toruslabs/openlogin-ed25519";
import { useUserStoreHook } from '@/store/modules/lhs/user';
import { toUrl } from "@/utils/router";
const userStore = useUserStoreHook();

// openlogin sol

export default {
   // eslint-disable-next-line vue/multi-word-component-names
   name: "Web3authNoModal",
   props: {
      msg: String,
   },
   setup() {
      const loading = ref(false)
      const loggedIn = ref<boolean>(false);
      let provider = <IProvider | null>(null);

      // IMP START - SDK Initialization
      // IMP START - Dashboard Registration
      const clientId =
         "BN7AEsVJEBpVPfXvWuqbIZHT276-5HCwb3_qBvUU16LHFoMmigKE4N98YzL9V8IXdOUYYGftrptkRSiZfbVO7mw"; // get from https://dashboard.web3auth.io
      // IMP END - Dashboard Registration


      // const chainConfig = {
      //    chainNamespace: CHAIN_NAMESPACES.SOLANA,
      //    chainId: "0x3", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
      //    rpcTarget: "https://api.devnet.solana.com",
      //    displayName: "Solana Devnet",
      //    blockExplorer: "https://explorer.solana.com",
      //    ticker: "SOL",
      //    tickerName: "Solana",
      // };

      const chainConfig = {
         chainNamespace: CHAIN_NAMESPACES.SOLANA,
         chainId: "0x1", // Please use 0x1 for Mainnet, 0x2 for Testnet, 0x3 for Devnet
         rpcTarget: "https://late-broken-mound.solana-mainnet.quiknode.pro/fccfef41a7f47007830b2082d763aa5220591c1c/",
         displayName: "Solana Mainnet",
         blockExplorer: "https://explorer.solana.com",
         ticker: "SOL",
         tickerName: "Solana",
      };

      const web3auth = new Web3AuthNoModal({
         clientId,
         chainConfig,
         web3AuthNetwork: "sapphire_mainnet",
      });

      const privateKeyProvider = new SolanaPrivateKeyProvider({
         config: { chainConfig },
      });

      const openloginAdapter = new OpenloginAdapter({
         privateKeyProvider,
         adapterSettings: {
            uxMode: 'redirect'
            //uxMode: 'popup'
         }
      });

      web3auth.configureAdapter(openloginAdapter);

      // metamask end

      // IMP END - SDK Initialization

      onMounted(async () => {
         const init = async () => {
            try {
               // IMP START - SDK Initialization
               await web3auth.init();
               // IMP END - SDK Initialization
               provider = web3auth.provider;

               if (loggedIn.value == false) {
                  if (web3auth.connected) {
                     loggedIn.value = true;
                     doLogin('mounted')
                  }
               }

            } catch (error) {
               console.error(error);
            }
         };

         init();
      });

      const loginGoogle = async () => {
         // IMP START - Login
         provider = await web3auth.connectTo(
            WALLET_ADAPTERS.OPENLOGIN,
            {
               loginProvider: "google",
            }
         );
         // IMP END - Login
         if (web3auth.connected) {
            loggedIn.value = true;
            doLogin('google')
         }
      };

      const loginX = async () => {
         // IMP START - Login
         provider = await web3auth.connectTo(
            WALLET_ADAPTERS.OPENLOGIN,
            {
               loginProvider: "twitter",
            }
         );
         // IMP END - Login
         if (web3auth.connected) {
            loggedIn.value = true;
            doLogin('twitter')
         }
      };

      const loginDiscord = async () => {
         // IMP START - Login
         provider = await web3auth.connectTo(
            WALLET_ADAPTERS.OPENLOGIN,
            {
               loginProvider: "discord",
            }
         );
         // IMP END - Login
         if (web3auth.connected) {
            loggedIn.value = true;
            doLogin('discord')
         }
      };

      const loginMetamask = async () => {
         // IMP START - Login
         provider = await web3auth.connectTo(
            WALLET_ADAPTERS.METAMASK,
            {
               loginProvider: "metamask",
            }
         );
         // IMP END - Login
         if (web3auth.connected) {
            loggedIn.value = true;
            doLogin('metamask')
         }
      };

      const doLogin = async (from: any) => {
         // IMP START - Get User Information
         let code = localStorage.getItem('shareCode')
         const stateData = reactive({
            loginApp: '',
            idToken: '',
            appPubKey: '',
            loginType: web3auth.connectedAdapterName,
            shareCode: code == 'undefined' ? '' : code,
            privateKey: '',
            rand: 'sol',
            from: from
         });

         if (stateData.loginType == 'openlogin') {
            const authInfo = await web3auth.getUserInfo();
            stateData.loginApp = authInfo.typeOfLogin ? authInfo.typeOfLogin : '';
            stateData.idToken = authInfo.idToken ? authInfo.idToken : '';

            const app_scoped_privkey = ref();

            // solana start

            app_scoped_privkey.value = await web3auth.provider?.request({
               method: "solanaPrivateKey", // use "private_key" for other non-evm chains
            })

            if (app_scoped_privkey.value) {

               const ed25519Key = getED25519Key(Buffer.from(app_scoped_privkey.value.padStart(64, '0'), 'hex'));
               const app_pub_key = ed25519Key.pk.toString('hex');
               // Get user's Solana public address
               //const base58privatekey = bs58.encode(Buffer.from(app_scoped_privkey.value, "hex"))
               // base58privatekey 即为sol私钥，这里不直接编译出来，避免数据库保存的数据直接可以导入钱包
               stateData.appPubKey = app_pub_key;
               stateData.privateKey = app_scoped_privkey.value
            }

            // solana end

            // eth start

            // app_scoped_privkey.value = web3auth.provider ? (await web3auth.provider.request({
            //    method: "eth_private_key", // use "private_key" for other non-evm chains
            // })) : '';
            // if (app_scoped_privkey.value) {
            //    stateData.appPubKey = getPublicCompressed(Buffer.from(app_scoped_privkey.value.padStart(64, "0"), "hex")).toString("hex");
            //    stateData.privateKey = app_scoped_privkey.value
            // }

            // eth end

         } else {

            //console.log('====FFFFF 000', stateData.loginType, await web3auth.getUserInfo(), await web3auth.authenticateUser()); return
            const authInfo2 = await web3auth.authenticateUser();

            console.log('====FFFFF 1111', authInfo2);
            stateData.idToken = authInfo2.idToken ? authInfo2.idToken : '';
            const web3 = new Web3(provider as any);
            const address = await web3.eth.getAccounts();
            stateData.appPubKey = address[0];

         }

         userStore.storeUserLoginByWeb3auth(stateData).then(() => {
            console.log("login");

            loading.value = false;
            localStorage.removeItem('shareCode')
            //toUrl('/?_from=web3sol');
         });
         // IMP END - Get User Information
      };

      const logout = async () => {
         userStore.logoutNotHref()
         // IMP START - Logout
         if (web3auth.connected) {
            await web3auth.logout();
         }
         // IMP END - Logout
         provider = null;
         loggedIn.value = false;
      };

      return {
         loggedIn,
         provider,
         web3auth,
         loginGoogle,
         loginX,
         loginDiscord,
         logout,
      };
   },
};
</script>