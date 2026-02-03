# DAOCommitteeProxy Callable Functions Analysis

> Analysis Date: 2026-02-03
> Network: Ethereum Mainnet
> DAOCommitteeProxy Address: `0xDD9f0cCc044B0781289Ee318e5971b0139602C26`

## Summary

This document lists all functions that can be called by the Tokamak Network DAOCommitteeProxy through governance proposals. Functions are organized by contract and access pattern.

## On-Chain Permission Verification Results

| Contract | Address | Access Pattern | DAOCommitteeProxy Permission |
|----------|---------|----------------|------------------------------|
| DAOAgendaManager | 0xcD4421d082752f363E1687544a09d5112cD4f484 | Ownable | owner = DAOCommitteeProxy |
| DAOVault | 0x2520CD65BAa2cEEe9E6Ad6EBD3F45490C42dd303 | Ownable | owner = DAOCommitteeProxy |
| DepositManagerProxy | 0x0b58ca72b12f01fc05f8f252e226f3e2089bd00e | AccessControl | DEFAULT_ADMIN_ROLE = true |
| L1BridgeRegistryProxy | 0x39d43281A4A5e922AB0DCf89825D73273D8C5BA4 | Custom | seigniorageCommittee = DAOCommitteeProxy |
| Layer2ManagerProxy | 0xD6Bf6B2b7553c8064Ba763AD6989829060FdFC1D | AccessControl | DEFAULT_ADMIN_ROLE = true |
| Layer2RegistryProxy | 0x7846c2248a7b4de77e9c2bae7fbb93bfc286837b | AccessControl | DEFAULT_ADMIN_ROLE = true |
| SeigManagerProxy | 0x0b55a0f463b6defb81c6063973763951712d0e5f | AccessControl | DEFAULT_ADMIN_ROLE = true |
| CandidateFactoryProxy | 0x9fc7100a16407ee24a79c834a56e6eca555a5d7c | AccessControl | DEFAULT_ADMIN_ROLE = true |
| CandidateAddOnFactoryProxy | 0xFA8ce5caF456115E72B96E5074769b8f66AA5861 | AccessControl | DEFAULT_ADMIN_ROLE = true |

**Note:** SeigManagerProxy does NOT have PAUSER_ROLE for DAOCommitteeProxy (pause function is disabled in V1.1)

---

## 1. DAOCommittee (via DAOCommitteeProxy)

**Address:** `0xDD9f0cCc044B0781289Ee318e5971b0139602C26`
**Source:** tokamak-dao-contracts/contracts/dao/DAOCommittee.sol
**Access:** onlyOwner (self-governance)

### Functions (18 total)

| Function | Signature | Description |
|----------|-----------|-------------|
| setSeigManager | `setSeigManager(address _seigManager)` | Set SeigManager contract address |
| setCandidatesSeigManager | `setCandidatesSeigManager(address[] _candidateContracts, address _seigManager)` | Update SeigManager for multiple candidates |
| setCandidatesCommittee | `setCandidatesCommittee(address[] _candidateContracts, address _committee)` | Update committee address for candidates |
| setDaoVault | `setDaoVault(address _daoVault)` | Set DAOVault contract address |
| setLayer2Registry | `setLayer2Registry(address _layer2Registry)` | Set Layer2Registry address |
| setAgendaManager | `setAgendaManager(address _agendaManager)` | Set DAOAgendaManager address |
| setCandidateFactory | `setCandidateFactory(address _candidateFactory)` | Set CandidateFactory address |
| setTon | `setTon(address _ton)` | Set TON token address |
| setActivityRewardPerSecond | `setActivityRewardPerSecond(uint256 _value)` | Set activity reward rate |
| increaseMaxMember | `increaseMaxMember(uint256 _newMaxMember, uint256 _quorum)` | Increase max committee members |
| decreaseMaxMember | `decreaseMaxMember(uint256 _reducingMemberIndex, uint256 _quorum)` | Decrease max members |
| setQuorum | `setQuorum(uint256 _quorum)` | Set voting quorum |
| setCreateAgendaFees | `setCreateAgendaFees(uint256 _fees)` | Set agenda creation fee |
| setMinimumNoticePeriodSeconds | `setMinimumNoticePeriodSeconds(uint256 _minimumNoticePeriod)` | Set minimum notice period |
| setMinimumVotingPeriodSeconds | `setMinimumVotingPeriodSeconds(uint256 _minimumVotingPeriod)` | Set minimum voting period |
| setExecutingPeriodSeconds | `setExecutingPeriodSeconds(uint256 _executingPeriodSeconds)` | Set execution window |
| registerLayer2CandidateByOwner | `registerLayer2CandidateByOwner(address _operator, address _layer2, string _memo)` | Register L2 as candidate |
| setAgendaStatus | `setAgendaStatus(uint256 _agendaID, uint256 _status, uint256 _result)` | Manually set agenda status |

---

## 2. DAOVault

**Address:** `0x2520CD65BAa2cEEe9E6Ad6EBD3F45490C42dd303`
**Source:** tokamak-dao-contracts/contracts/dao/DAOVault.sol
**Access:** onlyOwner (owner = DAOCommitteeProxy)

### Functions (8 total)

| Function | Signature | Description |
|----------|-----------|-------------|
| setTON | `setTON(address _ton)` | Set TON token address |
| setWTON | `setWTON(address _wton)` | Set WTON token address |
| approveTON | `approveTON(address _to, uint256 _amount)` | Approve TON spending |
| approveWTON | `approveWTON(address _to, uint256 _amount)` | Approve WTON spending |
| approveERC20 | `approveERC20(address _token, address _to, uint256 _amount)` | Approve any ERC20 spending |
| claimTON | `claimTON(address _to, uint256 _amount)` | Transfer TON from vault |
| claimWTON | `claimWTON(address _to, uint256 _amount)` | Transfer WTON from vault |
| claimERC20 | `claimERC20(address _token, address _to, uint256 _amount)` | Transfer any ERC20 from vault |

---

## 3. DAOAgendaManager

**Address:** `0xcD4421d082752f363E1687544a09d5112cD4f484`
**Source:** tokamak-dao-contracts/contracts/dao/DAOAgendaManager.sol
**Access:** onlyOwner (owner = DAOCommitteeProxy)

### Functions (11 total)

| Function | Signature | Description |
|----------|-----------|-------------|
| setCommittee | `setCommittee(address _committee)` | Set DAOCommittee address |
| setCreateAgendaFees | `setCreateAgendaFees(uint256 _createAgendaFees)` | Set agenda creation fee |
| setMinimumNoticePeriodSeconds | `setMinimumNoticePeriodSeconds(uint256 _minimumNoticePeriodSeconds)` | Set notice period |
| setExecutingPeriodSeconds | `setExecutingPeriodSeconds(uint256 _executingPeriodSeconds)` | Set execution window |
| setMinimumVotingPeriodSeconds | `setMinimumVotingPeriodSeconds(uint256 _minimumVotingPeriodSeconds)` | Set voting period |
| newAgenda | `newAgenda(address[] _targets, uint256 _noticePeriodSeconds, uint256 _votingPeriodSeconds, bool _atomicExecute, bytes[] _functionBytecodes)` | Create new agenda |
| castVote | `castVote(uint256 _agendaID, address _voter, uint256 _vote)` | Record a vote |
| setExecutedAgenda | `setExecutedAgenda(uint256 _agendaID)` | Mark agenda as executed |
| setResult | `setResult(uint256 _agendaID, uint256 _result)` | Set agenda result |
| setStatus | `setStatus(uint256 _agendaID, uint256 _status)` | Set agenda status |
| endAgendaVoting | `endAgendaVoting(uint256 _agendaID)` | End voting and dismiss |

---

## 4. L1BridgeRegistry

**Address:** `0x39d43281A4A5e922AB0DCf89825D73273D8C5BA4`
**Source:** ton-staking-v2/contracts/layer2/L1BridgeRegistryV1_1.sol
**Access:** onlyOwner, onlySeigniorageCommittee, onlyManager

### onlyOwner Functions (2 total)

| Function | Signature | Description |
|----------|-----------|-------------|
| setAddresses | `setAddresses(address _layer2Manager, address _seigManager, address _ton)` | Initialize contract addresses (one-time) |
| setSeigniorageCommittee | `setSeigniorageCommittee(address _seigniorageCommittee)` | Set seigniorage committee address |

### onlySeigniorageCommittee Functions (2 total) - DAOCommitteeProxy can call these

| Function | Signature | Description |
|----------|-----------|-------------|
| rejectCandidateAddOn | `rejectCandidateAddOn(address rollupConfig)` | Stop seigniorage for a rollup |
| restoreCandidateAddOn | `restoreCandidateAddOn(address rollupConfig, bool rejectedL2Deposit)` | Restore seigniorage for a rollup |

### Access Control Functions (inherited from AuthControlL1BridgeRegistry)

| Function | Signature | Access | Description |
|----------|-----------|--------|-------------|
| addAdmin | `addAdmin(address account)` | onlyOwner | Grant DEFAULT_ADMIN_ROLE |
| removeAdmin | `removeAdmin(address account)` | onlyOwner | Revoke DEFAULT_ADMIN_ROLE |
| transferAdmin | `transferAdmin(address newAdmin)` | onlyOwner | Transfer admin role |
| addManager | `addManager(address account)` | onlyOwner | Grant MANAGER_ROLE |
| removeManager | `removeManager(address account)` | onlyOwner | Revoke MANAGER_ROLE |
| revokeManager | `revokeManager(address account)` | onlyOwner | Revoke MANAGER_ROLE |
| revokeRegistrant | `revokeRegistrant(address account)` | onlyOwner | Revoke REGISTRANT_ROLE |

---

## 5. Layer2Manager

**Address:** `0xD6Bf6B2b7553c8064Ba763AD6989829060FdFC1D`
**Source:** ton-staking-v2/contracts/layer2/Layer2ManagerV1_1.sol
**Access:** onlyOwner (DEFAULT_ADMIN_ROLE = true)

### Functions (3 total)

| Function | Signature | Description |
|----------|-----------|-------------|
| setAddresses | `setAddresses(address _l1BridgeRegistry, address _operatorManagerFactory, address _ton, address _wton, address _dao, address _depositManager, address _seigManager, address _swapProxy)` | Initialize all addresses (one-time) |
| setOperatorManagerFactory | `setOperatorManagerFactory(address _operatorManagerFactory)` | Set operator manager factory |
| setMinimumInitialDepositAmount | `setMinimumInitialDepositAmount(uint256 _minimumInitialDepositAmount)` | Set minimum deposit for CandidateAddOn |

### Access Control Functions (inherited from AccessibleCommon)

| Function | Signature | Description |
|----------|-----------|-------------|
| addAdmin | `addAdmin(address account)` | Grant DEFAULT_ADMIN_ROLE |
| removeAdmin | `removeAdmin(address account)` | Revoke DEFAULT_ADMIN_ROLE |
| transferAdmin | `transferAdmin(address newAdmin)` | Transfer admin role |

---

## 6. DepositManager

**Address:** `0x0b58ca72b12f01fc05f8f252e226f3e2089bd00e`
**Source:** ton-staking-v2/contracts/stake/managers/DepositManagerV1_1.sol
**Access:** onlyOwner (DEFAULT_ADMIN_ROLE = true)

### Functions (2 total)

| Function | Signature | Description |
|----------|-----------|-------------|
| setMinDepositGasLimit | `setMinDepositGasLimit(uint32 gasLimit_)` | Set minimum gas limit for L2 deposits |
| setAddresses | `setAddresses(address _l1BridgeRegistry, address _layer2Manager)` | Set registry and manager addresses |

### Access Control Functions (inherited from AccessibleCommon)

| Function | Signature | Description |
|----------|-----------|-------------|
| addAdmin | `addAdmin(address account)` | Grant DEFAULT_ADMIN_ROLE |
| removeAdmin | `removeAdmin(address account)` | Revoke DEFAULT_ADMIN_ROLE |
| transferAdmin | `transferAdmin(address newAdmin)` | Transfer admin role |

---

## 7. SeigManager

**Address:** `0x0b55a0f463b6defb81c6063973763951712d0e5f`
**Source:** ton-staking-v2/contracts/stake/managers/SeigManagerV1_1.sol
**Access:** onlyOwner (DEFAULT_ADMIN_ROLE = true)

### Functions (18 total)

| Function | Signature | Description |
|----------|-----------|-------------|
| setData | `setData(address powerton_, address daoAddress, uint256 powerTONSeigRate_, uint256 daoSeigRate_, uint256 relativeSeigRate_, uint256 adjustDelay_, uint256 minimumAmount_)` | Set multiple seigniorage parameters |
| setPowerTON | `setPowerTON(address powerton_)` | Set PowerTON contract |
| setDao | `setDao(address daoAddress)` | Set DAO address for seigniorage |
| setPowerTONSeigRate | `setPowerTONSeigRate(uint256 powerTONSeigRate_)` | Set PowerTON seigniorage rate |
| setDaoSeigRate | `setDaoSeigRate(uint256 daoSeigRate_)` | Set DAO seigniorage rate |
| setPseigRate | `setPseigRate(uint256 pseigRate_)` | Set relative seigniorage rate |
| setCoinageFactory | `setCoinageFactory(address factory_)` | Set coinage factory |
| transferCoinageOwnership | `transferCoinageOwnership(address newSeigManager, address[] coinages_)` | Transfer coinage ownership |
| renounceWTONMinter | `renounceWTONMinter()` | Renounce WTON minter role |
| setAdjustDelay | `setAdjustDelay(uint256 adjustDelay_)` | Set commission rate change delay |
| setMinimumAmount | `setMinimumAmount(uint256 minimumAmount_)` | Set minimum staked amount |
| setSeigStartBlock | `setSeigStartBlock(uint256 _seigStartBlock)` | Set seigniorage start block |
| setInitialTotalSupply | `setInitialTotalSupply(uint256 _initialTotalSupply)` | Set initial TON supply |
| setBurntAmountAtDAO | `setBurntAmountAtDAO(uint256 _burntAmountAtDAO)` | Set burnt amount at DAO |
| renounceMinter | `renounceMinter(address target)` | Renounce minter on target |
| renouncePauser | `renouncePauser(address target)` | Renounce pauser on target |
| renounceOwnership | `renounceOwnership(address target)` | Renounce ownership on target |
| transferOwnership | `transferOwnership(address target, address newOwner)` | Transfer ownership on target |

### Access Control Functions (inherited from AuthControlSeigManager)

| Function | Signature | Description |
|----------|-----------|-------------|
| addAdmin | `addAdmin(address account)` | Grant DEFAULT_ADMIN_ROLE |
| removeAdmin | `removeAdmin(address account)` | Revoke DEFAULT_ADMIN_ROLE |
| transferAdmin | `transferAdmin(address newAdmin)` | Transfer admin role |
| addMinter | `addMinter(address account)` | Grant MINTER_ROLE |
| removeMinter | `removeMinter(address account)` | Revoke MINTER_ROLE |
| addOperator | `addOperator(address account)` | Grant OPERATOR_ROLE |
| removeOperator | `removeOperator(address account)` | Revoke OPERATOR_ROLE |
| addChallenger | `addChallenger(address account)` | Grant CHALLENGER_ROLE |
| removeChallenger | `removeChallenger(address account)` | Revoke CHALLENGER_ROLE |

**Note:** `pause()` function is DISABLED in V1.1 (reverts with "Moved to SeigManagerV1_2")

---

## 8. Layer2Registry

**Address:** `0x7846c2248a7b4de77e9c2bae7fbb93bfc286837b`
**Source:** ton-staking-v2/contracts/stake/Layer2Registry.sol
**Access:** onlyOwner (DEFAULT_ADMIN_ROLE = true)

### Functions (1 total)

| Function | Signature | Description |
|----------|-----------|-------------|
| unregister | `unregister(address layer2)` | Unregister a Layer2 contract |

### Access Control Functions (inherited from AuthControlCoinage)

| Function | Signature | Description |
|----------|-----------|-------------|
| addAdmin | `addAdmin(address account)` | Grant DEFAULT_ADMIN_ROLE |
| removeAdmin | `removeAdmin(address account)` | Revoke DEFAULT_ADMIN_ROLE |
| transferAdmin | `transferAdmin(address newAdmin)` | Transfer admin role |
| addMinter | `addMinter(address account)` | Grant MINTER_ROLE |
| removeMinter | `removeMinter(address account)` | Revoke MINTER_ROLE |
| addOperator | `addOperator(address account)` | Grant OPERATOR_ROLE |
| removeOperator | `removeOperator(address account)` | Revoke OPERATOR_ROLE |

---

## 9. CandidateFactory

**Address:** `0x9fc7100a16407ee24a79c834a56e6eca555a5d7c`
**Source:** tokamak-dao-contracts/contracts/factory/CandidateFactory.sol
**Access:** onlyOwner (DEFAULT_ADMIN_ROLE = true)

### Functions (1 total)

| Function | Signature | Description |
|----------|-----------|-------------|
| setAddress | `setAddress(address _depositManager, address _daoCommittee, address _candidateImp, address _ton, address _wton)` | Set factory contract addresses |

### Access Control Functions

| Function | Signature | Description |
|----------|-----------|-------------|
| addAdmin | `addAdmin(address account)` | Grant DEFAULT_ADMIN_ROLE |
| removeAdmin | `removeAdmin(address account)` | Revoke DEFAULT_ADMIN_ROLE |
| transferAdmin | `transferAdmin(address newAdmin)` | Transfer admin role |

---

## 10. CandidateAddOnFactory

**Address:** `0xFA8ce5caF456115E72B96E5074769b8f66AA5861`
**Access:** onlyOwner (DEFAULT_ADMIN_ROLE = true)

> Note: Source file not found in ton-staking-v2 repository. Included based on on-chain verification.

### Access Control Functions (presumed)

| Function | Signature | Description |
|----------|-----------|-------------|
| addAdmin | `addAdmin(address account)` | Grant DEFAULT_ADMIN_ROLE |
| removeAdmin | `removeAdmin(address account)` | Revoke DEFAULT_ADMIN_ROLE |
| transferAdmin | `transferAdmin(address newAdmin)` | Transfer admin role |

---

## Excluded Contracts

The following contracts are NOT callable by DAOCommitteeProxy:

| Contract | Reason |
|----------|--------|
| Candidate contracts | Owned by individual operators |
| TON Token | Separate ownership |
| WTON Token | Separate ownership |
| SwapProxy | No admin role found for DAOCommitteeProxy |

---

## Total Function Count

| Contract | onlyOwner | Seigniorage Committee | Access Control | Total |
|----------|-----------|----------------------|----------------|-------|
| DAOCommittee | 18 | - | - | 18 |
| DAOVault | 8 | - | - | 8 |
| DAOAgendaManager | 11 | - | - | 11 |
| L1BridgeRegistry | 2 | 2 | 7 | 11 |
| Layer2Manager | 3 | - | 3 | 6 |
| DepositManager | 2 | - | 3 | 5 |
| SeigManager | 18 | - | 9 | 27 |
| Layer2Registry | 1 | - | 7 | 8 |
| CandidateFactory | 1 | - | 3 | 4 |
| CandidateAddOnFactory | - | - | 3 | 3 |
| **Total** | **64** | **2** | **35** | **101** |
