# Privix CLI

A comprehensive command-line interface tool for interacting with the Privix Blockchain. This CLI provides functionality for node management, consensus operations, and blockchain exploration.

## Table of Contents
- [Installation](#installation)
- [Node Management](#node-management)
- [Consensus Operations](#consensus-operations)
- [Explorer Functions](#explorer-functions)
- [Version Information](#version-information)

## Installation

To install and set up the Privix CLI, follow these steps:

1. Install the node binary:
```bash
privix-cli node install-node
```

2. Generate genesis block:
```bash
privix-cli node get-genesis --chain testnet
```

3. Initialize node:
```bash
privix-cli node init-node
```

This will generate your node credentials:
```
Public key (address) = 0xYOUR_ADDRESS
Private key = YOUR_PRIVATE_KEY
Node ID = YOUR_NODE_ID
```

**Important:** Store these credentials securely. You'll need them for staking operations.

## Node Management

### Starting a Node

Before starting your node, ensure you have:
1. Initialized the node
2. Have more than 10,000 PRIVIX coins in your validator address
3. Generated the genesis block

To start the node:
```bash
privix-cli node start-node --chain testnet
```

The node will begin syncing with the blockchain. Wait for:
- Chain syncing to complete
- Current epoch to end

### Node Commands

- `init-node`: Initialize P2P and validator keys
- `install-node`: Install Privix Blockchain core CLI
- `get-genesis`: Generate genesis block
- `start-node`: Start the node server

## Consensus Operations

### Staking

To stake your coins and become a validator:
```bash
privix-cli consensus stake <privatekey> --chain testnet --amount 10000
```

### Unstaking

To unstake your coins:
```bash
privix-cli consensus unstake <privatekey> --chain testnet
```

**Important:** Do not stop your validator node until the current epoch ends after initiating unstaking.

### Validator Dashboard

View consensus statistics:
```bash
privix-cli consensus get-stats --chain testnet
```

## Explorer Functions

### Block Operations
- Get current block:
```bash
privix-cli explorer get-currentblock --chain testnet
```

- Find specific block:
```bash
privix-cli explorer find-block <blockNumber> --chain testnet
```

### Address and Transaction Search
- Search address information:
```bash
privix-cli explorer search-address <address> --chain testnet
```

- Search transaction:
```bash
privix-cli explorer search-transaction <hash> --chain testnet
```

## Version Information

Check CLI version:
```bash
privix-cli version
```

## Important Notes

1. Always specify the `--chain` flag with either `testnet` or `mainnet` for commands that require it.
2. Ensure your validator address has sufficient funds (>10,000 PRIVIX) before attempting to stake.
3. When unstaking:
   - Wait for the current epoch to end
   - Keep your node running during the entire unstaking process
   - Monitor the transaction status using the explorer commands

## Error Handling

The CLI provides detailed error messages for common issues:
- Missing chain flag
- Invalid block numbers
- Invalid addresses
- Failed transactions
- Network connectivity issues

All errors are logged to the console with descriptive messages to help troubleshoot issues.


stay connected with the team for 24 h support 
