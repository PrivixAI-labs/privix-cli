import { ethers } from "ethers";
import { consensus, CONSENSUS_ABI } from "../../config/contracts";
import { chain_validate } from "../../utils/chain";

// Function to get validators
export async function getValidators(chain: string): Promise<string[]> {
    try {
        const provider = chain_validate(chain); // Validate and get provider
        const contract = new ethers.Contract(consensus, CONSENSUS_ABI, provider);
        const validators = await contract.validators();
        return validators;
    } catch (error) {
        throw new Error(`Error fetching validators: ${(error as Error).message}`);
    }
}

// Function to get staked amount
async function getStake(chain:string): Promise<string> {
    try {
        const provider = chain_validate(chain);; // Replace with correct RPC URL
        const stakingContract = new ethers.Contract(
            consensus, CONSENSUS_ABI,
            provider
        );
        const stakeInWei = await stakingContract.stakedAmount();
        const stakeInpsc = ethers.formatEther(stakeInWei);
        return `${stakeInpsc} PSC`;
    } catch (error) {
        throw new Error(`Error fetching staked amount: ${(error as Error).message}`);
    }
}

// Function to fetch and display validator dashboard
export async function val_dash(chain: string) {
    try {
        const stakedCoins = await getStake(chain);
        const validatorSet = await getValidators(chain);

        console.log({ stakedCoins, validatorSet });
    } catch (error) {
        console.error("Error fetching validator data:", error);
    }
}


