import type { PredefinedMethod, AbiFunction } from '../../types';

const abi: AbiFunction[] = [
  {
    type: 'function',
    name: 'setAddresses',
    inputs: [
      { name: '_l1BridgeRegistry', type: 'address' },
      { name: '_operatorManagerFactory', type: 'address' },
      { name: '_ton', type: 'address' },
      { name: '_wton', type: 'address' },
      { name: '_dao', type: 'address' },
      { name: '_depositManager', type: 'address' },
      { name: '_seigManager', type: 'address' },
      { name: '_swapProxy', type: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setOperatorManagerFactory',
    inputs: [{ name: '_operatorManagerFactory', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setMinimumInitialDepositAmount',
    inputs: [{ name: '_minimumInitialDepositAmount', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  // Access control functions (inherited from AccessibleCommon)
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

export const layer2ManagerMethods: PredefinedMethod = {
  id: 'tokamak-layer2-manager',
  name: 'Tokamak Layer2Manager',
  description: 'Tokamak Network Layer2Manager (V1.1) for managing Layer2 networks',
  abi,
  addresses: {
    mainnet: '0xD6Bf6B2b7553c8064Ba763AD6989829060FdFC1D',
    sepolia: '0x58B4C2FEf19f5CDdd944AadD8DC99cCC71bfeFDc',
  },
};
