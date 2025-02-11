import { program } from "commander";
import { findBlock } from "./commands/findblock";
import { getCurrentBlockDetails } from "./commands/get-currentblock";
import { searchAddress } from "./commands/search-address";
import { searchTxn } from "./commands/search-transaction";

export function explorer(expo: typeof program) {
    const explorerCommand = expo
        .command("explorer")
        .description("Explorer related subcommands");

    explorerCommand
        .command("get-currentblock")
        .description("Get current block details")
        .option("-c, --chain <chain>", "Specify the blockchain network (mainnet/testnet)")
        .action(async (options) => {
            try {
                if (!options.chain) {
                    console.error("Error: --chain flag is required.");
                    return;
                }
                const info = await getCurrentBlockDetails(options.chain);
                console.log("Current Block Details:", info);
            } catch (error) {
                console.error("Error fetching current block details:", error);
            }
        });

    explorerCommand
        .command("find-block <blockNumber>")
        .description("Search block by block number")
        .option("-c, --chain <chain>", "Specify the blockchain network (mainnet/testnet)")
        .action(async (blockNumber: string, options) => {
            try {
                if (!options.chain) {
                    console.error("Error: --chain flag is required.");
                    return;
                }
                const parsedBlockNumber = parseInt(blockNumber, 10);
                if (isNaN(parsedBlockNumber)) {
                    throw new Error("Invalid block number provided.");
                }
                const blockDetails = await findBlock(parsedBlockNumber, options.chain);
                console.log(`Block ${parsedBlockNumber} Details:`, blockDetails);
            } catch (error: any) {
                console.error("Error occurred while finding block details:", error.message);
            }
        });

    explorerCommand
        .command("search-address <address>")
        .description("See address information")
        .option("-c, --chain <chain>", "Specify the blockchain network (mainnet/testnet)")
        .action(async (addr: string, options) => {
            try {
                if (!options.chain) {
                    console.error("Error: --chain flag is required.");
                    return;
                }
                if (!addr) {
                    console.error("Error: No address provided. Please provide a valid address.");
                    return;
                }
                const addressDetails = await searchAddress(addr, options.chain);
                console.log(`Address ${addr} Details:`, addressDetails);
            } catch (error: any) {
                console.error("Error occurred while finding address details:", error.message);
            }
        });

    explorerCommand
        .command("search-transaction <hash>")
        .description("Search transaction by hash")
        .option("-c, --chain <chain>", "Specify the blockchain network (mainnet/testnet)")
        .action(async (hash: string, options) => {
            try {
                if (!options.chain) {
                    console.error("Error: --chain flag is required.");
                    return;
                }
                if (!hash) {
                    console.error("Error: No hash provided. Please provide a valid hash.");
                    return;
                }
                const transactionDetails = await searchTxn(hash, options.chain);
                if (transactionDetails) {
                    console.log(`Transaction ${hash} Details:`, transactionDetails);
                } else {
                    console.log(`Transaction ${hash} not found.`);
                }
            } catch (error: any) {
                console.error("Error occurred while searching for transaction:", error.message);
            }
        });
}
