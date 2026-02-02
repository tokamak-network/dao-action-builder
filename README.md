# DAO Action Builder

A headless TypeScript library for building DAO proposal actions with Tokamak Network support.

## Features

- **Parameter Validation**: Comprehensive validation for all Solidity types (address, uint, int, bool, bytes, string, arrays, tuples)
- **Calldata Encoding/Decoding**: Full calldata encoding and decoding using ethers.js
- **Predefined Methods**: Built-in ABI definitions for common contracts (ERC20, ERC721, ERC1155, etc.)
- **Tokamak Network**: Built-in support for TON, WTON, DepositManager, SeigManager, and more
- **React Hooks**: Ready-to-use hooks for React applications
- **TypeScript**: Full type safety with comprehensive type definitions

## Installation

```bash
npm install @tokamak-network/dao-action-builder ethers
```

## Quick Start

```typescript
import {
  encodeCalldata,
  decodeCalldata,
  validateParameterType,
  predefinedMethodRegistry,
  erc20Methods,
  tonMethods,
} from '@tokamak-network/dao-action-builder';

// Validate a parameter
const validation = validateParameterType('0x1234...', 'address');
if (!validation.isValid) {
  console.error(validation.error);
}

// Encode calldata for ERC20 transfer
const result = encodeCalldata({
  abi: erc20Methods.abi,
  functionSignature: 'transfer(address,uint256)',
  parameters: {
    to: '0x742d35Cc6634C0532925a3b844Bc9e7595f5bE21',
    amount: '1000000000000000000',
  },
});

if (result.success) {
  console.log('Calldata:', result.data.calldata);
}

// Decode calldata
const decoded = decodeCalldata(result.data.calldata, erc20Methods.abi);
if (decoded.success) {
  console.log('Function:', decoded.data.functionName);
  console.log('Parameters:', decoded.data.parameters);
}
```

## Predefined Methods

### Standard Contracts

| Method | Description |
|--------|-------------|
| `erc20Methods` | ERC20 token functions (transfer, approve, etc.) |
| `erc721Methods` | ERC721 NFT functions |
| `erc1155Methods` | ERC1155 multi-token functions |
| `ownableMethods` | Ownable contract functions |
| `accessControlMethods` | AccessControl functions |
| `pausableMethods` | Pausable contract functions |
| `governorMethods` | Governor contract functions |
| `uupsMethods` | UUPS proxy functions |

### Tokamak Network

| Method | Description |
|--------|-------------|
| `tonMethods` | TON token functions |
| `wtonMethods` | WTON (Wrapped TON) functions |
| `depositManagerMethods` | Staking deposit management |
| `seigManagerMethods` | Seigniorage management |
| `l1BridgeRegistryMethods` | L1 Bridge registry |
| `layer2ManagerMethods` | Layer 2 management |

All Tokamak methods are automatically registered in the global registry.

## React Hooks

```tsx
import { useActionBuilder } from '@tokamak-network/dao-action-builder/hooks';

function ActionBuilderComponent() {
  const {
    address,
    setAddress,
    availableFunctions,
    selectedFunction,
    setSelectedFunction,
    parameterValues,
    setParameterValue,
    calldata,
    isParametersValid,
    buildAction,
  } = useActionBuilder({
    abi: erc20Methods.abi,
  });

  return (
    // Your UI here
  );
}
```

## API Reference

### Validation

```typescript
// Validate any Solidity type
validateParameterType(value: string, type: string): ParameterValidationResult

// Type-specific validators
validateAddress(value: string): ParameterValidationResult
validateUint(value: string, bits?: number): ParameterValidationResult
validateInt(value: string, bits?: number): ParameterValidationResult
validateBool(value: string): ParameterValidationResult
validateBytes(value: string, size?: number): ParameterValidationResult
validateString(value: string): ParameterValidationResult
validateArray(value: string, elementType: string): ParameterValidationResult
validateTuple(value: string, components: AbiParameter[]): ParameterValidationResult
```

### Calldata

```typescript
// Encode function call to calldata
encodeCalldata(options: {
  abi: AbiFunction[];
  functionSignature: string;
  parameters: Record<string, string | ParameterValue>;
}): Result<EncodeCalldataResult>

// Decode calldata back to parameters
decodeCalldata(
  calldata: string,
  abi: AbiFunction[]
): Result<DecodeCalldataResult>
```

### Action Builder

```typescript
// Build a complete action object
buildAction(input: {
  contractAddress: string;
  abi: AbiFunction[];
  functionSignature: string;
  parameters: Record<string, string | ParameterValue>;
  value?: bigint;
}): Result<Action>
```

## Development

```bash
# Clone the repository
git clone https://github.com/tokamak-network/dao-action-builder.git
cd dao-action-builder

# Install dependencies
npm install

# Build
npm run build

# Run tests
npm test

# Run demo app
cd examples/demo
npm install
npm run dev
```

## License

MIT
