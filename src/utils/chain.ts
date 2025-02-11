
import {provider_main, provider_test } from '../../src/config/provider';
export function chain_validate(chain:string) {
    let provider
    if (chain === 'mainnet' || chain === 'main' || chain === 'm') {
         provider =  provider_main;
    } else if (chain === 'testnet' || chain === 'test'|| chain === 't') {
         provider = provider_test;
    }else new Error("Please provide a valid chain name (mainnet or testnet)");
    return provider;
}