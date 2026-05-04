export const BENCHMARKS = {
  theoriq: [
    {
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045', // vitalik.eth
      expectedTier: 'ELITE',
    },
  ],
  rayls: [
    {
      address: '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045',
      expectedTier: 'EARLY_ADOPTER',
    }
  ]
};

export async function runDiagnostics(checker: any) {
  const results = [];
  
  // Test Theoriq
  for (const test of BENCHMARKS.theoriq) {
    const res = await checker.checkAllocation('theoriq', test.address);
    results.push({
      project: 'theoriq',
      address: test.address,
      success: res.allocation > 0,
      allocation: res.allocation,
      tier: res.tier
    });
  }

  // Test Rayls
  for (const test of BENCHMARKS.rayls) {
    const res = await checker.checkAllocation('rayls', test.address);
    results.push({
      project: 'rayls',
      address: test.address,
      success: res.allocation > 0,
      allocation: res.allocation,
      tier: res.tier
    });
  }

  return results;
}
