<template>
</template>

<script lang="ts">
import { ref, onMounted, reactive } from "vue";
// IMP START - Quick Start
import { Web3AuthNoModal } from "@web3auth/no-modal";
import { CHAIN_NAMESPACES, IProvider, WALLET_ADAPTERS, log, WEB3AUTH_NETWORK } from "@web3auth/base";
// IMP END - Quick Start
import Web3 from "web3";

import { OpenloginAdapter } from "@web3auth/openlogin-adapter";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
import { MetamaskAdapter } from "@web3auth/metamask-adapter";

import { getPublicCompressed } from "@toruslabs/eccrypto";
import { useUserStoreHook } from '@/store/modules/lhs/user';
import { toUrl } from "@/utils/router";
const userStore = useUserStoreHook();

// openlogin 和 metask 都走eth

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


      const chainConfig = {
         chainNamespace: CHAIN_NAMESPACES.EIP155,
         chainId: "0x1", // Please use 0x1 for Mainnet
         rpcTarget: "https://rpc.ankr.com/eth",
         displayName: "Ethereum Mainnet",
         blockExplorer: "https://etherscan.io/",
         ticker: "ETH",
         tickerName: "Ethereum",
      };


      // eth start


      const privateKeyProvider = new EthereumPrivateKeyProvider({ config: { chainConfig } });

      // eth end

      const web3auth = new Web3AuthNoModal({
         clientId,
         chainConfig,
         web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_MAINNET
      });

      const openloginAdapter = new OpenloginAdapter({
         privateKeyProvider: privateKeyProvider,
         adapterSettings: {
            uxMode: 'redirect'
            //uxMode: 'popup'
         }
      });

      web3auth.configureAdapter(openloginAdapter);

      web3auth.configureAdapter(new MetamaskAdapter());



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
                     //doLogin()
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
            doLogin()
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
            doLogin()
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
            doLogin()
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
            doLogin()
         }
      };

      const doLogin = async () => {
         // IMP START - Get User Information
         let code = localStorage.getItem('shareCode')
         const stateData = reactive({
            loginApp: '',
            idToken: '',
            appPubKey: '',
            loginType: web3auth.connectedAdapterName,
            shareCode: code == 'undefined' ? '' : code,
            privateKey: '',
            rand: 'eth'
         });

         if (stateData.loginType == 'openlogin') {
            const authInfo = await web3auth.getUserInfo();
            stateData.loginApp = authInfo.typeOfLogin ? authInfo.typeOfLogin : '';
            stateData.idToken = authInfo.idToken ? authInfo.idToken : '';

            const app_scoped_privkey = ref();
            app_scoped_privkey.value = web3auth.provider ? (await web3auth.provider.request({
               method: "eth_private_key", // use "private_key" for other non-evm chains
            })) : '';
            if (app_scoped_privkey.value) {
               stateData.appPubKey = getPublicCompressed(Buffer.from(app_scoped_privkey.value.padStart(64, "0"), "hex")).toString("hex");
               stateData.privateKey = app_scoped_privkey.value
            }
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
            loading.value = false;
            localStorage.removeItem('shareCode')
            toUrl('/');
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
         //loginGoogle,
         //loginX,
         //loginDiscord,
         loginMetamask,
         logout,
      };
   },
};
</script>