import { ethers } from "ethers";


export const provider_test = new ethers.JsonRpcProvider("https://testnet-rpc.privixchain.xyz");

export const provider_main = new ethers.JsonRpcProvider("https://mainnet-rpc.privixchain.xyz");