<template>
    <button @click="mintAndSendSol">Mint NFT and Send SOL</button>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {
    Connection,
    PublicKey,
    Transaction,
    SystemProgram,
    LAMPORTS_PER_SOL
} from '@solana/web3.js';
import { Metaplex, walletAdapterIdentity, toBigNumber } from '@metaplex-foundation/js';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';

export default defineComponent({
    setup() {
        const walletAdapter = ref<PhantomWalletAdapter | null>(null);

        onMounted(async () => {
            walletAdapter.value = new PhantomWalletAdapter();
            try {
                await walletAdapter.value.connect();
                console.log("Wallet connected");
            } catch (error) {
                console.error("Failed to connect wallet", error);
            }
        });

        async function mintAndSendSol() {
            if (!walletAdapter.value?.connected) {
                alert("Please connect your Phantom wallet first.");
                return;
            }

            const connection = new Connection("https://api.devnet.solana.com", "confirmed");
            const metaplex = Metaplex.make(connection).use(walletAdapterIdentity(walletAdapter.value));

            try {
                const uri = 'https://mfp2m2qzszjbowdjl2vofmto5aq6rtlfilkcqdtx2nskls2gnnsa.arweave.net/YV-mahmWUhdYaV6q4rJu6CHozWVC1CgOd9NkpctGa2Q'
                // Mint NFT Transaction
                const mintTransactionBuilder = await metaplex.nfts().builders().mint({
                    uri: uri,
                    maxSupply: toBigNumber(0),
                });
                const { blockhash, lastValidBlockHeight } = await metaplex.rpc().getLatestBlockhash();
                const mintTransaction = mintTransactionBuilder.toTransaction({
                    lastValidBlockHeight,
                    blockhash
                });
                mintTransaction.feePayer = walletAdapter.value.publicKey;
                mintTransaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

                const receiverPublicKey = new PublicKey('AzfrPGg4AFLR5LDnPEDvdA4jiYxKV1Ru2ZcqzLyN4kvg');
                const transferAmount = 0.0007 * LAMPORTS_PER_SOL; // 1 SOL
                // Create a transaction to send SOL
                const transferTransaction = new Transaction().add(
                    SystemProgram.transfer({
                        fromPubkey: walletAdapter.value.publicKey,
                        toPubkey: receiverPublicKey,
                        lamports: transferAmount,
                    })
                );

                // Combine the transactions
                const combinedTransaction = mintTransaction.add(transferTransaction);
                combinedTransaction.feePayer = walletAdapter.value.publicKey;
                combinedTransaction.recentBlockhash = mintTransaction.recentBlockhash;

                // Sign the transaction using Phantom Wallet
                await walletAdapter.value.signTransaction(combinedTransaction);

                // Send the signed transaction
                const serializedTransaction = combinedTransaction.serialize();
                const signature = await connection.sendRawTransaction(serializedTransaction);
                await connection.confirmTransaction(signature, 'confirmed');
                console.log("Transaction confirmed with signature:", signature);
            } catch (error) {
                console.error("Error processing the transaction:", error);
                alert("Failed to process transaction. Check console for more details.");
                throw error
            }
        }

        return { mintAndSendSol };
    }
});
</script>