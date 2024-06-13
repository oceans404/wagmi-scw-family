import { useAccount } from 'wagmi';
import { useState, useEffect } from 'react';
import { readContract } from '@wagmi/core';
import { scoreABI, scoreContractAddress } from '@/ABIs/scoreAbi';
import { http, createConfig } from '@wagmi/core';
import { baseSepolia } from '@wagmi/core/chains';

const config = createConfig({
  chains: [baseSepolia],
  transports: {
    [baseSepolia.id]: http(),
  },
});

export function ReadStoredDays() {
  const { address } = useAccount();
  const [storedDays, setStoredDays] = useState<string[]>([]);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    async function fetchStoredDays() {
      if (address) {
        try {
          const daysData = await readContract(config, {
            address: scoreContractAddress,
            abi: scoreABI,
            functionName: 'getStoredDays',
            args: [address],
          });
          console.log(daysData);
          //   @ts-ignore
          setStoredDays(daysData);
        } catch (error) {
          console.error('Error fetching stored days:', error);
        }
      }
    }

    if (address) {
      fetchStoredDays();
    }
  }, [address]);

  useEffect(() => {
    async function fetchScores() {
      if (address) {
        try {
          const scoresPromises = storedDays.map((day) =>
            readContract(config, {
              address: scoreContractAddress,
              abi: scoreABI,
              functionName: 'getScoresByDate',
              args: [address, day],
            }).then((data) => ({
              day,
              readyScore: data[0].toString(),
              sleepScore: data[1].toString(),
            }))
          );
          const scoresData = await Promise.all(scoresPromises);
          console.log(scoresData);
          //   @ts-ignore
          setScores(scoresData);
        } catch (error) {
          console.error('Error fetching scores:', error);
        }
      }
    }

    if (storedDays.length > 0) {
      fetchScores();
    }
  }, [storedDays, address]);

  return (
    <div className="my-2">
      <h2>Stored Scores</h2>
      <ul>
        {scores.map(({ day, readyScore, sleepScore }) => (
          <li key={day}>
            {new Date(day).toLocaleDateString()} - Ready Score: {readyScore},
            Sleep Score: {sleepScore}
          </li>
        ))}
      </ul>
    </div>
  );
}
