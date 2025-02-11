import {  provider_main, provider_test } from "../../config/provider";
import { Block } from "../../types/types";

type BlockNumberOrNull = number | null;

export async function searchTxn(hash: string, chain: string): Promise<Block> {
    try {
        let provider;
        if (chain === 'mainnet' || chain === 'main' || chain === 'm') {
            provider = provider_main;
        } else if (chain === 'testnet' || chain === 'test' || chain === 't') {
            provider = provider_test;
        } else {
            throw new Error('Invalid chain specified');
        }

        const transaction = await provider.getTransaction(hash);
        if (!transaction) {
            throw new Error(`Transaction not found for hash: ${hash}`);
        }

        const blockNumber: BlockNumberOrNull = await transaction.blockNumber;
        if (blockNumber === null) {
            throw new Error(`Block number not available for transaction: ${hash}`);
        }

        const block = await provider.getBlock(blockNumber);
        if (!block) {
            throw new Error(`Block not found for block number: ${blockNumber}`);
        }

        const readableTimestamp = new Date(block.timestamp * 1000).toLocaleString();
        
        const blockDetails: Block = {
            hash: block.hash ?? '',
            number: block.number ?? 0,
            timestamp: block.timestamp ?? 0,
            transactions: block.transactions ?? [],
            readableTimestamp: readableTimestamp
        };

        return blockDetails;
    } catch (error) {
        throw new Error(
            `Error occurred while searching for transaction: ${(error as Error).message}`
        );
    }
}
