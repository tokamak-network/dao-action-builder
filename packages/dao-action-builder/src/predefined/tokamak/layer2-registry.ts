import type { PredefinedMethod, AbiFunction } from '../../types';

const abi: AbiFunction[] = [
  {
    type: 'function',
    name: 'unregister',
    inputs: [{ name: 'layer2', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  // Access control functions (inherited from AuthControlCoinage)
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
    name: 'addMinter',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'removeMinter',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'addOperator',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'removeOperator',
    inputs: [{ name: 'account', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
];

export const layer2RegistryMethods: PredefinedMethod = {
  id: 'tokamak-layer2-registry',
  name: 'Tokamak Layer2Registry',
  description: 'Tokamak Network Layer2 Registry for managing Layer2 registrations',
  abi,
  addresses: {
    mainnet: '0x7846c2248a7b4de77e9c2bae7fbb93bfc286837b',
    sepolia: '0xA0a9576b437E52114aDA8b0BC4149F2F5c604581',
  },
};
