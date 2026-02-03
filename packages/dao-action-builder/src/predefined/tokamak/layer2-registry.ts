import type { PredefinedMethod, AbiFunction } from '../../types';

const abi: AbiFunction[] = [
  {
    type: 'function',
    name: 'unregister',
    inputs: [{ name: 'layer2', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
];

export const layer2RegistryMethods: PredefinedMethod = {
  id: 'tokamak-layer2-registry',
  name: 'Tokamak Layer2Registry',
  description: 'Tokamak Network Layer2 Registry for unregistering Layer2 networks',
  abi,
  addresses: {
    mainnet: '0x7846c2248a7b4de77e9c2bae7fbb93bfc286837b',
    sepolia: '0xA0a9576b437E52114aDA8b0BC4149F2F5c604581',
  },
};
