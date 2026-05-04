import { test } from 'node:test';
import assert from 'node:assert';
import { ActualChecker } from './actual-checker';

// Mocking fetch for environment where api.clique.tech is unreachable
const originalFetch = global.fetch;

test('ActualChecker - Theoriq Mock Success', async () => {
  const checker = new ActualChecker();
  const address = '0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045';
  
  // Setup mock
  global.fetch = async (url: string) => {
    if (url.includes('theoriq')) {
      return {
        ok: true,
        json: async () => ({
          data: {
            allocation: "5000",
            tierName: "ELITE"
          }
        })
      } as Response;
    }
    return { ok: false } as Response;
  };

  const result = await checker.checkAllocation('theoriq', address);
  
  assert.strictEqual(result.allocation, 5000);
  assert.strictEqual(result.tier, 'ELITE');
  assert.ok(result.isVerified);
  
  global.fetch = originalFetch;
});

test('ActualChecker - Unknown Address Mock', async () => {
  const checker = new ActualChecker();
  const address = '0x0000000000000000000000000000000000000000';

  global.fetch = async () => ({
    ok: true,
    json: async () => ({
      data: null
    })
  } as Response);

  const result = await checker.checkAllocation('theoriq', address);
  
  assert.strictEqual(result.allocation, 0);
  assert.strictEqual(result.tier, 'NONE');
  
  global.fetch = originalFetch;
});
