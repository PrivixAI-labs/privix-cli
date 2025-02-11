import { ethers } from 'ethers';
import { consensus, CONSENSUS_ABI } from './../../config/contracts';
import { chain_validate } from '../../utils/chain';

async function stakeCoins(privateKey: string , chain:string , amount:string): Promise<string> {

       let provider=chain_validate(chain);
 
    const wallet = new ethers.Wallet(privateKey, provider);

    const contract = new ethers.Contract(consensus, CONSENSUS_ABI, wallet);

   
    let amout_stake= amount || '10000';

        // Validator: Ensure the stake amount is not less than 10k
        if (parseFloat(amout_stake) < 10000) {
            throw new Error("Amount cannot be less than 10k");
        }

    // Staking 10000 coins
    const amountToStake = ethers.parseEther(amout_stake);
    const transaction = await contract.stake({
        value: amountToStake
    });

    await transaction.wait();

    return transaction.hash;
}

export { stakeCoins };
