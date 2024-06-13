import { createClient, createPublicClient, http } from 'viem';
import { baseSepolia } from 'viem/chains';
import { ENTRYPOINT_ADDRESS_V06 } from 'permissionless';
import { paymasterActionsEip7677 } from 'permissionless/experimental';

export const client = createPublicClient({
  chain: baseSepolia,
  transport: http(),
});
const paymasterService = process.env.PAYMASTER_SERVICE_URL!;
console.log('hello?', paymasterService);

export const paymasterClient = createClient({
  chain: baseSepolia,
  transport: http(process.env.PAYMASTER_SERVICE_URL),
}).extend(paymasterActionsEip7677({ entryPoint: ENTRYPOINT_ADDRESS_V06 }));
