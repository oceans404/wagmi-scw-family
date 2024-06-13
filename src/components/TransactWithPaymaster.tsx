import { useAccount } from 'wagmi';
import { useCapabilities, useWriteContracts } from 'wagmi/experimental';
import { useMemo, useState } from 'react';
import { Button, TextInput } from 'flowbite-react';
import { CallStatus } from './CallStatus';
import { scoreABI, scoreContractAddress } from '@/ABIs/scoreAbi';

export function TransactWithPaymaster() {
  const abi = scoreABI;
  const address = scoreContractAddress;
  const allowedFunctions = ['storeScores'];
  const account = useAccount();
  const [id, setId] = useState<string | undefined>(undefined);
  const { writeContracts } = useWriteContracts({
    mutation: { onSuccess: (id) => setId(id) },
  });
  const { data: availableCapabilities } = useCapabilities({
    account: account.address,
  });
  const capabilities = useMemo(() => {
    if (!availableCapabilities || !account.chainId) return;
    const capabilitiesForChain = availableCapabilities[account.chainId];
    if (
      capabilitiesForChain['paymasterService'] &&
      capabilitiesForChain['paymasterService'].supported
    ) {
      return {
        paymasterService: {
          url: `${document.location.origin}/api/paymaster`,
        },
      };
    }
  }, [availableCapabilities, account.chainId]);

  console.log(capabilities);

  const [date, setDate] = useState('');
  const [readyScore, setReadyScore] = useState('');
  const [sleepScore, setSleepScore] = useState('');

  const handleSubmit = () => {
    const formattedDate = formatDate(date);
    writeContracts({
      contracts: [
        {
          address,
          abi,
          functionName: 'storeScores',
          args: [
            formattedDate,
            parseInt(readyScore, 10),
            parseInt(sleepScore, 10),
          ],
        },
        {
          address,
          abi,
          functionName: 'storeScores',
          args: [
            formattedDate,
            parseInt(readyScore, 10),
            parseInt(sleepScore, 10),
          ],
        },
      ],
      capabilities,
    });
  };

  return (
    <div className="my-2">
      <h2>Store scores with Paymaster</h2>
      <div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Date
          </label>
          <TextInput
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Readiness Score
          </label>
          <TextInput
            type="number"
            value={readyScore}
            onChange={(e) => setReadyScore(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
            Sleep Score
          </label>
          <TextInput
            type="number"
            value={sleepScore}
            onChange={(e) => setSleepScore(e.target.value)}
            required
          />
        </div>
        <Button onClick={handleSubmit}>Mint</Button>
        {id && <CallStatus id={id} />}
      </div>
    </div>
  );
}

function formatDate(dateString: any) {
  const date = new Date(dateString);
  const month = String(date.getUTCMonth() + 1).padStart(2, '0');
  const day = String(date.getUTCDate()).padStart(2, '0');
  const year = date.getUTCFullYear();
  return `${month}/${day}/${year}`;
}
