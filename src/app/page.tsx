'use client';

import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Navbar } from 'flowbite-react';
import { ConnectKitButton } from 'connectkit';
import { Capabilities } from '@/components/Capabilities';
import { Transact } from '@/components/Transact';
import { SignMessage } from '@/components/SignMessage';
import { TypedSign } from '@/components/TypedSign';
import { Permit2 } from '@/components/Permit2';
import { TransactWithPaymaster } from '@/components/TransactWithPaymaster';

const abi = [
  {
    stateMutability: 'nonpayable',
    type: 'function',
    inputs: [{ name: 'to', type: 'address' }],
    name: 'safeMint',
    outputs: [],
  },
] as const;

function App() {
  const account = useAccount();
  const { connectors, connect, status, error } = useConnect();
  const { disconnect } = useDisconnect();

  return (
    <>
      <Navbar fluid rounded>
        <Navbar.Brand>wagmi-scw-family</Navbar.Brand>
        <ConnectKitButton />
      </Navbar>
      <div className="container mx-auto">
        <div className="my-2">
          <h2>Account</h2>
          <div>
            status: {account.status}
            <br />
            <Capabilities />
            <br />
            addresses: {JSON.stringify(account.addresses)}
            <br />
            chainId: {account.chainId}
          </div>
        </div>

        <div className="my-2">
          <h2>Connection status</h2>
          <div>{status}</div>
          <div>{error?.message}</div>
        </div>
        {account.address && (
          <div className="my-2">
            <Transact />
            <TransactWithPaymaster />
            <SignMessage />
            <TypedSign />
            <Permit2 chainId={account.chainId!} />
          </div>
        )}
      </div>
    </>
  );
}

export default App;
