<template>
    <!-- <button @click="connectWallet">Connect Wallet</button>
    <button @click="mintNft">Mint NFT</button>
    <div v-if="transactionLink">{{ transactionLink }}</div>
    <div v-if="error">{{ error }}</div> -->
</template>

<script lang="ts">

import { defineComponent, ref } from 'vue';
import { Metaplex, sendTokensBuilder, toBigNumber, walletAdapterIdentity } from '@metaplex-foundation/js';
import { Connection, PublicKey, Keypair, SystemProgram, LAMPORTS_PER_SOL, Transaction } from '@solana/web3.js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';
import { getAssociatedTokenAddress, createTransferInstruction, TOKEN_PROGRAM_ID, getAccount, createAssociatedTokenAccountInstruction } from '@solana/spl-token';
import { getBatchMintNftsByCid, createMintOrderV2 } from '@/api/lht/nft'

import { useSysConfig } from '@/store/modules/lhs/config'

import * as anchor from "@project-serum/anchor";


import * as web3 from '@solana/web3.js';
import * as base58 from 'bs58';

export default defineComponent({
    props: {
        nftModel: {
            type: Object,
            default: {}
        },
        show: {
            type: Boolean,
            required: true
        }
    },
    setup(props, context) {

        const { config } = useSysConfig();

        const walletConnected = ref(false);
        const walletPublicKey = ref('');
        const wallet = new PhantomWalletAdapter();
        const MessageArrayExpose = ref(<any>[])



        let provider;
        const connection = new Connection(config.constract_rcp_endpoint, { commitment: 'finalized' });

        const connectWallet = async () => {

            MessageArrayExpose.value = [];
            if (typeof (window.solana) == 'undefined') {

                //showNotification("Please Install Phantom Wallet!", 'error');
                throw new Error('Please Install Phantom Wallet!')
            } else {
                await wallet.connect();
                walletPublicKey.value = wallet.publicKey?.toBase58().toString();
                walletConnected.value = true;


                provider = new anchor.AnchorProvider(connection, wallet, anchor.AnchorProvider.defaultOptions());
                anchor.setProvider(provider);
            }

        };

        const disconnectWallet = async () => {
            await wallet.disconnect();
            walletPublicKey.value = '';
            walletConnected.value = false;
            MessageArrayExpose.value = [];
        };

        const sendSPLToken = async (splTokenAddress: string, recipientAddress: string, amount: number) => {

            await connectWallet()

            if (!provider) return;

            console.log("sendSPLToken == splTokenAddress,recipientAddress,amount", splTokenAddress, recipientAddress, amount);


            const recipient = new PublicKey(recipientAddress); // Replace with actual recipient public key

            let instruction;
            let transferAmount = Math.ceil(amount * LAMPORTS_PER_SOL);

            const transaction = new Transaction()

            if (splTokenAddress != '') {
                const mintAddress = new PublicKey(splTokenAddress); // Replace with actual mint address of the token

                // Determine the associated token accounts for the sender and recipient
                const senderTokenAddress = await getAssociatedTokenAddress(
                    mintAddress,
                    wallet.publicKey
                );

                const recipientTokenAddress = await getAssociatedTokenAddress(
                    mintAddress,
                    recipient
                );

                const toTokenAccountInfo = await provider.connection.getAccountInfo(recipientTokenAddress);
                if (!toTokenAccountInfo) {
                    const createToTokenAccountIx = createAssociatedTokenAccountInstruction(
                        wallet.publicKey, // 付款方地址
                        recipientTokenAddress, // 预期的接收方关联账户地址
                        recipient, // 接收方地址
                        mintAddress // Token的Mint地址
                    );
                    transaction.add(createToTokenAccountIx);
                }

                // 查询余额
                try {
                    let senderTokenInfo = await getAccount(connection, senderTokenAddress);
                    if (senderTokenInfo.amount < amount * web3.LAMPORTS_PER_SOL) {
                        throw new Error('Insufficient balance');
                    }
                } catch (e) {
                    throw new Error('Insufficient balance');
                }

                instruction = createTransferInstruction(
                    senderTokenAddress,  // sender's token address
                    recipientTokenAddress,  // recipient's token address
                    wallet.publicKey,  // sender's publicKey
                    transferAmount,  // amount, in lamports
                    [],
                    TOKEN_PROGRAM_ID
                )
            } else {

                // 添加转账指令
                instruction = SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: recipient,
                    lamports: transferAmount,
                });
            }

            // Create the transaction for transferring tokens
            transaction.add(
                instruction
            );

            // Sign and send the transaction

            transaction.feePayer = wallet.publicKey;
            transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

            const signedTransaction = await wallet.signTransaction(transaction);
            const signature = await connection.sendRawTransaction(signedTransaction.serialize());
            console.log("Transaction signature:", signature);
            return signature;
        };


        const getTransferInstruction = async (splTokenAddress: string, recipientAddress: string, amount: number) => {

            console.log("sendSPLToken == splTokenAddress,recipientAddress,amount", splTokenAddress, recipientAddress, amount);


            const recipient = new PublicKey(recipientAddress); // Replace with actual recipient public key

            let instructions = [];
            let transferAmount = Math.ceil(amount * LAMPORTS_PER_SOL);
            if (splTokenAddress != '') {
                const mintAddress = new PublicKey(splTokenAddress); // Replace with actual mint address of the token

                // Determine the associated token accounts for the sender and recipient
                const senderTokenAddress = await getAssociatedTokenAddress(
                    mintAddress,
                    wallet.publicKey
                );

                const recipientTokenAddress = await getAssociatedTokenAddress(
                    mintAddress,
                    recipient
                );

                const toTokenAccountInfo = await provider.connection.getAccountInfo(recipientTokenAddress);
                if (!toTokenAccountInfo) {
                    let createToTokenAccountIx = createAssociatedTokenAccountInstruction(
                        wallet.publicKey, // 付款方地址
                        recipientTokenAddress, // 预期的接收方关联账户地址
                        recipient, // 接收方地址
                        mintAddress // Token的Mint地址
                    );
                    instructions.push(createToTokenAccountIx);
                }

                // 查询余额
                try {
                    let senderTokenInfo = await getAccount(provider.connection, senderTokenAddress);
                    if (senderTokenInfo.amount < transferAmount) {
                        throw new Error('Insufficient balance ' + amount);
                    }
                } catch (e) {
                    throw new Error('Insufficient balance ' + amount);
                }

                let instruction = await createTransferInstruction(
                    senderTokenAddress,  // sender's token address
                    recipientTokenAddress,  // recipient's token address
                    wallet.publicKey,  // sender's publicKey
                    transferAmount,  // amount, in lamports
                    [],
                    TOKEN_PROGRAM_ID
                )

                instructions.push(instruction);
            } else {

                try {
                    let senderTokenInfo = await provider.connection.getBalance(wallet.publicKey)
                    if (senderTokenInfo < transferAmount) {
                        throw new Error('Insufficient balance ' + amount);
                    }
                } catch (e) {
                    throw new Error('Insufficient balance ' + amount);
                }

                // 添加转账指令
                let instruction = SystemProgram.transfer({
                    fromPubkey: wallet.publicKey,
                    toPubkey: recipient,
                    lamports: transferAmount,
                });

                instructions.push(instruction);

            }

            return instructions;
        }

        const batchMintNft = async (collectModel: any) => {

            // nftHashId: string, count: number, payCoin: string, amount: any

            MessageArrayExpose.value = []



            try {

                // 登录
                await connectWallet()

                MessageArrayExpose.value.push({
                    message: 'You want mint ' + collectModel.mint_amount + ' NFTs',
                })

                if ("id" in collectModel && collectModel.summary_status == 1) {

                    // 打算mint这么多
                    let preMintAmount = collectModel.mint_amount;

                    // 取实际能mint的NFT数据下来
                    let batchMintInfos = await getBatchMintNftsByCid({ collection_id: collectModel.id, count: preMintAmount });
                    console.log("batchMintNft getBatchMintNftsByCid ", batchMintInfos);

                    let payCoin = collectModel.pay_coin;
                    let payAmount = collectModel.price.pay[payCoin] || 0;
                    let orignPrice = collectModel.price.orign[payCoin] || 0;
                    let discountPrice = collectModel.price.discount[payCoin] || 0;

                    if (batchMintInfos.length > 0 && payAmount > 0) {

                        let transactions = <any>[];
                        let nftHashs = <any>[];

                        let updateCount = 0;
                        let mintResult = [];

                        let metaplex = Metaplex.make(connection).use(walletAdapterIdentity(wallet));

                        for (let i = 0; i < batchMintInfos.length; i++) {
                            let mintInfo = batchMintInfos[i];
                            if ('nft_hash' in mintInfo) {

                                let usdtAddress = '';
                                if (payCoin == 'USDT' && "usdt_address" in config) {
                                    usdtAddress = config.usdt_address
                                }

                                let transferInstructions = await getTransferInstruction(usdtAddress, config.recipint_address_public_key, payAmount);

                                let newMint = Keypair.generate();


                                // 创建铸币交易
                                const mintBuilder = await metaplex.nfts().builders().create({
                                    useNewMint: newMint,
                                    uri: mintInfo.ipfs_metadata,
                                    name: mintInfo.name,
                                    sellerFeeBasisPoints: mintInfo.category.seller_fee_basis_points,
                                    maxSupply: toBigNumber(1),
                                    collection: new PublicKey(mintInfo.category.collect_addres),
                                });

                                // 构建交易并进行签名
                                const { blockhash, lastValidBlockHeight } = await connection.getLatestBlockhash();
                                const transaction = await mintBuilder.toTransaction({
                                    blockhash,
                                    lastValidBlockHeight
                                });

                                transferInstructions.forEach(instruction => {
                                    transaction.add(instruction);
                                })

                                transaction.partialSign(newMint);

                                transactions.push(transaction);
                                nftHashs.push({
                                    nft_hash: mintInfo.nft_hash,
                                    pay_coin: payCoin,
                                    pay_amount: payAmount,
                                    from_address: wallet.publicKey?.toBase58().toString(),
                                    to_address: config.recipint_address_public_key,
                                    nft_usdt_price: orignPrice,
                                    discount_price: discountPrice,
                                    nft_address: newMint.publicKey
                                });

                            }
                        }

                        console.log("FFFFFFFFFFFFFFFFFFF XXXXXXXXXXXXXXXXXXXX", transactions);

                        if (transactions.length > 0) {
                            // 使用 signAllTransactions 方法签名所有事务
                            const signedTransactions = await wallet.signAllTransactions(transactions);


                            // 发送所有已签名的事务
                            const transactionIds = await Promise.all(
                                signedTransactions.map(tx => connection.sendRawTransaction(tx.serialize()))
                            );

                            for (let i = 0; i < transactionIds.length; i++) {

                                let mintTx = transactionIds[i];
                                try {

                                    let parsedTx = await getTransactionResult(mintTx);

                                    if (parsedTx) {
                                        console.log('交易详情:', parsedTx);
                                        // 检查状态
                                        if ("meta" in parsedTx && parsedTx?.meta?.err == null && parsedTx?.meta?.status?.ok == null) {
                                            let tmp = Object.assign(nftHashs[i], { mint_tx: mintTx });
                                            mintResult.push(tmp)
                                        }

                                    }
                                } catch (e) {
                                    console.error('获取交易时发生错误:', e);
                                    // 继续验证下一条
                                }

                            }

                            console.log(`事务ID: ${transactionIds}`, mintResult);

                            if (mintResult.length > 0) {
                                updateCount = await createMintOrderV2({ data: mintResult });
                            }

                        }

                        if (updateCount > 0) {
                            MessageArrayExpose.value.push({
                                message: 'minted success amount[' + mintResult.length + ']',
                            })

                            context.emit('callback', {
                                status: 1,
                                action: 'mintNft',
                            })
                        } else {
                            throw new Error('mint nft error');
                        }

                    } else {
                        throw new Error(`${batchMintInfos.length} NFTs can be mint`);
                    }


                } else {
                    throw new Error('collection status error');
                }

            } catch (e) {

                MessageArrayExpose.value.push({
                    message: 'mint error (' + e.message + ')',
                })

                context.emit('callback', {
                    status: -1,
                    action: 'mintNft',
                })
                throw e;
            }



        };

        const getTransactionResult = async (tx: string) => {
            let result;
            for (let i = 0; i < 30; i++) {
                let tmp = await connection.getParsedTransaction(tx, 'finalized');

                console.log("账户确认 第" + i + "次 ", tx, tmp);

                if (!tmp) {
                    await Sleep(5000)
                } else {
                    result = tmp;
                    break;
                }
            }
            return result;

        }

        const Sleep = (ms) => {
            return new Promise(resolve => setTimeout(resolve, ms))
        }


        const signMessage = async () => {
            await connectWallet();
            const message = new TextEncoder().encode('Hello from Vue 3');
            const signedMessage = await wallet.signMessage(message);
            console.log('Signed Message:', base58.encode(signedMessage), wallet.publicKey?.toBase58().toString());
        };

        //signMessage();



        return {
            MessageArrayExpose,
            connectWallet,
            signMessage,
            walletConnected,
            walletPublicKey,
            batchMintNft,
            disconnectWallet
        };

    }
});
</script>