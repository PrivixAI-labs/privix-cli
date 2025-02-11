import { ethers } from 'ethers';
import { consensus, CONSENSUS_ABI } from './../../config/contracts';
import { chain_validate } from '../../utils/chain';

async function unstakeCoins(privateKey: string , chain:string): Promise<string> {

      let provider=chain_validate(chain);
    const wallet = new ethers.Wallet(privateKey, provider);

    const contract = new ethers.Contract(consensus, CONSENSUS_ABI, wallet);

    // Unstaking the entire amount
    const transaction = await contract.unstake();

    await transaction.wait();

    return transaction.hash;
}
export { unstakeCoins };
