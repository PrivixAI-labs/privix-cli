import { program } from "commander";
import { generateGenesisJson } from "./commands/get-genesis";
import installbin from "./commands/install-node";
import {startServer} from "./commands/start-node";
import {initSecrets} from "./commands/init-node"
 



export function Node(chainnode: typeof program){
    const node = chainnode
    .command("node")
    .description("Node related subcommands");

    node
    .command("get-genesis")
    .description("generate genesis block")
    .option("-c, --chain <chain name (mainnet or testnet)>", "flag for generation of genesis block")
    .action((options) => {
        if (!options.chain) {
            console.error("Please provide a chain name (mainnet or testnet)");
            return;
        }
        generateGenesisJson(options.chain);
    });

    node
    .command("install-node")
    .description("install Privix Blockchain core cli application")
    .action(installbin);
    node
    .command("init-node")
    .description("Initialize p2p key and validator key ")
    .action(initSecrets);
    node
    .command("start-node")
    .description("install Privix Blockchain core cli node server")
    .option("-c, --chain <chain name (mainnet or testnet)>", "flag for generation of genesis block")
    .action((options) => {
        if (!options.chain) {
            console.error("Please provide a chain name (mainnet or testnet)");
            return;
        }
        startServer(options.chain);
    });
}