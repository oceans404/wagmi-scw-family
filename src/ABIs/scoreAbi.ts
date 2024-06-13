export const scoreABI = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'string',
        name: 'date',
        type: 'string',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'readyScore',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'sleepScore',
        type: 'uint256',
      },
    ],
    name: 'ScoresStored',
    type: 'event',
  },
  {
    inputs: [
      {
        internalType: 'string',
        name: 'date',
        type: 'string',
      },
      {
        internalType: 'uint256',
        name: 'readyScore',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'sleepScore',
        type: 'uint256',
      },
    ],
    name: 'storeScores',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
      {
        internalType: 'string',
        name: 'date',
        type: 'string',
      },
    ],
    name: 'getScoresByDate',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getStoredDays',
    outputs: [
      {
        internalType: 'string[]',
        name: '',
        type: 'string[]',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'user',
        type: 'address',
      },
    ],
    name: 'getStoredDaysCount',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
] as const;

export const scoreContractAddress =
  '0x50c73a009af7310ce8e2843a8da287f97b92ef9a';
