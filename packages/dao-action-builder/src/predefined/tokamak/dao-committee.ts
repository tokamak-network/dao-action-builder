import type { PredefinedMethod, AbiFunction } from '../../types';

const abi: AbiFunction[] = [
  // Existing functions
  {
    type: 'function',
    name: 'removeFromBlacklist',
    inputs: [{ name: '_candidate', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'createCandidateOwner',
    inputs: [
      { name: '_memo', type: 'string' },
      { name: '_operatorAddress', type: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'registerLayer2CandidateByOwner',
    inputs: [
      { name: '_operator', type: 'address' },
      { name: '_layer2', type: 'address' },
      { name: '_memo', type: 'string' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setAgendaStatus',
    inputs: [
      { name: '_agendaID', type: 'uint256' },
      { name: '_status', type: 'uint256' },
      { name: '_result', type: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  // New functions from analysis
  {
    type: 'function',
    name: 'setSeigManager',
    inputs: [{ name: '_seigManager', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setCandidatesSeigManager',
    inputs: [
      { name: '_candidateContracts', type: 'address[]' },
      { name: '_seigManager', type: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setCandidatesCommittee',
    inputs: [
      { name: '_candidateContracts', type: 'address[]' },
      { name: '_committee', type: 'address' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setDaoVault',
    inputs: [{ name: '_daoVault', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setLayer2Registry',
    inputs: [{ name: '_layer2Registry', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setAgendaManager',
    inputs: [{ name: '_agendaManager', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setCandidateFactory',
    inputs: [{ name: '_candidateFactory', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setTon',
    inputs: [{ name: '_ton', type: 'address' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setActivityRewardPerSecond',
    inputs: [{ name: '_value', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'increaseMaxMember',
    inputs: [
      { name: '_newMaxMember', type: 'uint256' },
      { name: '_quorum', type: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'decreaseMaxMember',
    inputs: [
      { name: '_reducingMemberIndex', type: 'uint256' },
      { name: '_quorum', type: 'uint256' },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setQuorum',
    inputs: [{ name: '_quorum', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setCreateAgendaFees',
    inputs: [{ name: '_fees', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setMinimumNoticePeriodSeconds',
    inputs: [{ name: '_minimumNoticePeriod', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setMinimumVotingPeriodSeconds',
    inputs: [{ name: '_minimumVotingPeriod', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    name: 'setExecutingPeriodSeconds',
    inputs: [{ name: '_executingPeriodSeconds', type: 'uint256' }],
    outputs: [],
    stateMutability: 'nonpayable',
  },
];

export const daoCommitteeMethods: PredefinedMethod = {
  id: 'tokamak-dao-committee',
  name: 'Tokamak DAOCommittee',
  description: 'Tokamak Network DAO Committee for governance management',
  abi,
  addresses: {
    mainnet: '0xDD9f0cCc044B0781289Ee318e5971b0139602C26',
    sepolia: '0x79cfbEaCB5470bBe3B8Fe76db2A61Fc59e588C38',
  },
};
