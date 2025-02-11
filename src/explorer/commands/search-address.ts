import { ethers } from "ethers";
import { provider_main, provider_test } from "../../config/provider";

export async function searchAddress(addr: string, chain: string) {
    try {
        let provider;
        if (chain === 'mainnet' || chain === 'main' || chain === 'm') {
            provider = provider_main;
        } else if (chain === 'testnet' || chain === 'test' || chain === 't') {
            provider = provider_test;
        } else {
            throw new Error('Invalid chain specified');
        }

        const balance: ethers.BigNumberish = await provider.getBalance(addr);
        const code = await provider.getCode(addr);
        const transactionCount = await provider.getTransactionCount(addr);
        // const ensName = await provider.lookupAddress(addr);

        const result = {
            addr,
            balance: ethers.formatEther(balance) + " PSC",
            transactionCount,
            codeExists: code !== '0x',
            // ensName: ensName || 'Not available'
        };

        return result;
    } catch (error) {
        throw new Error(
            `Error occurred while checking address details: ${(error as Error).message}`
        );
    }
}