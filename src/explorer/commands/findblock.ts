import { provider_main, provider_test } from "../../config/provider";
import { Block } from "../../types/types";

export async function findBlock(blockNumber: number, chain: string): Promise<Block> {
    try {
        let provider;
        if (chain === 'mainnet' || chain === 'main' || chain === 'm') {
            provider = provider_main;
        } else if (chain === 'testnet' || chain === 'test' || chain === 't') {
            provider = provider_test;
        } else {
            throw new Error('Invalid chain specified');
        }

        const providerBlock = await provider.getBlock(blockNumber);
        if (!providerBlock) {
            throw new Error(`Block with number ${blockNumber} not found`);
        }

        const block: Block = {
            hash: providerBlock.hash ?? '',
            number: providerBlock.number,
            timestamp: providerBlock.timestamp,
            transactions: providerBlock.transactions,
            readableTimestamp: new Date(providerBlock.timestamp * 1000).toLocaleString()
        };

        return block;
    } catch (error) {
        throw new Error(
            `Error occurred while fetching block: ${(error as Error).message}`
        );
    }
}