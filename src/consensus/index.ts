import { program } from "commander";
import { val_dash } from "./commands/val-dash";
import { stakeCoins } from "./commands/stake";
import { unstakeCoins } from "./commands/unstake";

export function consensus(con: typeof program) {
    const consensus = con
        .command("consensus")
        .description("Consensus related subcommands");

    // Get consensus stats
    consensus
        .command("get-stats")
        .description("Get consensus stats")
        .option("-c, --chain <chain>", "Specify the blockchain network (mainnet/testnet)")
        .action(async (options) => {
            if (!options.chain) {
                console.error("Error: --chain flag is required.");
                return;
            }
            await val_dash(options.chain);
        });

    // Stake PSC coins
    consensus
        .command("stake <privatekey>")
        .description("Stake PSC coins to become a part of PSC POS consensus")
        .option("-c, --chain <chain>", "Specify the blockchain network (mainnet/testnet)")
        .option("-a, --amount <amount>", "Specify the amount of PSC to stake (default: 10000)")
        .action(async (privateKey: string, options) => {
            try {
                if (!options.chain) {
                    console.error("Error: --chain flag is required.");
                    return;
                }

                const transactionHash = await stakeCoins(privateKey, options.chain, options.amount);
                console.log(
                    "Staked correctly! Now you are a validator.\nTransaction hash:",
                    transactionHash
                );
            } catch (error) {
                console.error("Error staking coins:", error);
            }
        });

    // Unstake PSC coins
    consensus
        .command("unstake <privatekey>")
        .description("Unstake coins")
        .option("-c, --chain <chain>", "Specify the blockchain network (mainnet/testnet)")
        .action(async (privateKey: string, options) => {
            try {
                if (!options.chain) {
                    console.error("Error: --chain flag is required.");
                    return;
                }

                const transactionHash = await unstakeCoins(privateKey, options.chain);
                console.log(
                    "You are free now! Thanks for keeping Privix Chain secure.\nTransaction hash:",
                    transactionHash
                );
            } catch (error) {
                console.error("Error unstaking coins:", error);
            }
        });
}
