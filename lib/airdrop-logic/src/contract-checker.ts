import { createPublicClient, http, formatUnits, parseAbi, isAddress } from 'viem';
import { mainnet, bsc, base, polygon } from 'viem/chains';

const CHAINS: Record<string, any> = { eth: mainnet, bsc, base, polygon };

export class ContractChecker {
  async checkOnChain(params: {
    contractAddress: string;
    userAddress: string;
    chainKey?: string;
    method?: string;
    decimals?: number;
  }) {
    const { 
      contractAddress, 
      userAddress, 
      chainKey = 'eth', 
      method = 'function allocation(address) view returns (uint256)', 
      decimals = 18 
    } = params;

    try {
      if (!isAddress(contractAddress) || !isAddress(userAddress)) {
        throw new Error('Invalid address');
      }

      const client = createPublicClient({ 
        chain: CHAINS[chainKey] || mainnet, 
        transport: http() 
      });

      const abi = parseAbi([method]);
      const methodName = method.split('(')[0].replace('function ', '').trim();

      const data = await client.readContract({
        address: contractAddress as `0x${string}`,
        abi,
        functionName: methodName,
        args: [userAddress as `0x${string}`],
      });

      return {
        allocation: Number(formatUnits(BigInt(data as any), decimals)),
        success: true
      };
    } catch (error) {
      console.error('Contract check failed:', error);
      return { allocation: 0, success: false };
    }
  }
}
