import { z } from 'zod';

export const AirdropResultSchema = z.object({
  address: z.string(),
  allocation: z.number(),
  tier: z.string().optional(),
  projectId: z.string(),
  isVerified: z.boolean().default(false),
});

export type AirdropResult = z.infer<typeof AirdropResultSchema>;

export class ActualChecker {
  private baseUrl = 'https://auth-api.clique.tech/v1/airdrop/check';
  private fallbackUrl = 'https://api.clique.tech/v1/airdrop/check';

  async checkAllocation(projectId: string, address: string): Promise<AirdropResult> {
    try {
      // 1. Try Primary (Auth API)
      let url = `${this.baseUrl}?projectId=${projectId}&address=${address}`;
      let response = await fetch(url);
      
      // 2. Handle 'Coming Soon' state specifically
      if (response.status === 404) {
        return { address, allocation: 0, projectId, tier: 'SOON', isVerified: true };
      }

      // 3. If Primary fails, try Fallback
      if (!response.ok) {
        url = `${this.fallbackUrl}?projectId=${projectId}&address=${address}`;
        response = await fetch(url);
      }

      if (!response.ok) {
        throw new Error(`API error: ${response.statusText}`);
      }

      const json = await response.json();
      const data = json.data;

      if (!data || data.allocation === undefined) {
        return { address, allocation: 0, projectId, tier: 'NONE', isVerified: true };
      }

      return {
        address,
        allocation: Number(data.allocation),
        tier: data.tierName || 'COMMUNITY',
        projectId,
        isVerified: true
      };
    } catch (error) {
      console.error('Check failed:', error);
      return { address, allocation: 0, projectId, tier: 'OFFLINE', isVerified: false };
    }
  }
}
