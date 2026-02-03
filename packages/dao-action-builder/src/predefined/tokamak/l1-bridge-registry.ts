import type { PredefinedMethod, AbiFunction } from '../../types';

const abi: AbiFunction[] = [
  // onlyOwner functions
  {
    type: 'function',
    name: 'setAddresses',
    inputs: [
      { name: '_layer2Manager', type: 'address' },
      { name: '_seigManager', type: 'address' },
      { name: '_ton', type: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setSeigniorageCommittee',
    inputs: [{ name: '_seigniorageCommittee', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  // onlySeigniorageCommittee functions (DAOCommitteeProxy can call these)
  {
    type: 'function',
    name: 'rejectCandidateAddOn',
    inputs: [{ name: 'rollupConfig', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'restoreCandidateAddOn',
    inputs: [
      { name: 'rollupConfig', type: 'address' },
      { name: 'rejectedL2Deposit', type: 'bool' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  // Access control functions (inherited from AuthControlL1BridgeRegistry)
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
  {
    type: 'function',
    name: 'addManager',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'removeManager',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'revokeManager',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'revokeRegistrant',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
];

export const l1BridgeRegistryMethods: PredefinedMethod = {
  id: 'tokamak-l1-bridge-registry',
  name: 'Tokamak L1BridgeRegistry',
  description: 'Tokamak Network L1BridgeRegistry (V1.1) for managing L1 bridges',
  abi,
  addresses: {
    mainnet: '0x39d43281A4A5e922AB0DCf89825D73273D8C5BA4',
    sepolia: '0x2D47fa57101203855b336e9E61BC9da0A6dd0Dbc',
  },
};
