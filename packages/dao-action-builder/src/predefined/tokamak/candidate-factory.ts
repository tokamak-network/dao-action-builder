import type { PredefinedMethod, AbiFunction } from '../../types';

const abi: AbiFunction[] = [
  {
    type: 'function',
    name: 'setAddress',
    inputs: [
      { name: '_depositManager', type: 'address' },
      { name: '_daoCommittee', type: 'address' },
      { name: '_candidateImp', type: 'address' },
      { name: '_ton', type: 'address' },
      { name: '_wton', type: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  // Access control functions
  {
    type: 'function',
    name: 'addAdmin',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'removeAdmin',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'transferAdmin',
    inputs: [{ name: 'newAdmin', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
];

export const candidateFactoryMethods: PredefinedMethod = {
  id: 'tokamak-candidate-factory',
  name: 'Tokamak CandidateFactory',
  description: 'Tokamak Network CandidateFactory for deploying candidate contracts',
  abi,
  addresses: {
    mainnet: '0x9fc7100a16407ee24a79c834a56e6eca555a5d7c',
    sepolia: '0x04e3C2B720FB8896A7f9Ea59DdcA85fD45189C7f',
  },
};
