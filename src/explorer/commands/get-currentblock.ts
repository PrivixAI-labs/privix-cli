import { provider_main, provider_test } from "../../config/provider";
import { Block } from "./../../types/types";

export async function getCurrentBlockDetails(chain: string): Promise<Block | null> {
    try {
        let provider;
        if (chain === 'mainnet' || chain === 'main' || chain === 'm') {
            provider = provider_main;
        } else if (chain === 'testnet' || chain === 'test' || chain === 't') {
            provider = provider_test;
        } else {
            throw new Error('Invalid chain specified');
        }

        const blockNumber = await provider.getBlockNumber();
        const block: Block | null = await provider.getBlock(blockNumber);

        if (block) {
            const { hash, number, timestamp, transactions }: Block = block;
            const humanReadableTimestamp = new Date(timestamp * 1000).toLocaleString();

            return {
                hash,
                number,
                timestamp: humanReadableTimestamp,
                transactions
            };
        } else {
            throw new Error("Current block not found");
        }
    } catch (error) {
        throw new Error(
            `Error occurred while fetching current block details: ${(error as Error).message}`
        );
    }
}