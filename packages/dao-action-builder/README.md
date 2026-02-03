# @tokamak-ecosystem/dao-action-builder

Headless library for building DAO proposal actions - smart contract function calls with ABI loading, parameter validation, and calldata encoding.

## Features

- **Parameter Validation**: Comprehensive validation for all Solidity types including arrays and tuples
- **Calldata Encoding/Decoding**: Full calldata encoding and decoding using ethers.js
- **React Hooks**: Ready-to-use hooks for React applications
- **Predefined Methods**: Built-in ABI definitions for common contracts (ERC20, ERC721, etc.)

## Installation

```bash
npm install @tokamak-ecosystem/dao-action-builder ethers
# or
pnpm add @tokamak-ecosystem/dao-action-builder ethers
# or
yarn add @tokamak-ecosystem/dao-action-builder ethers
```

## Quick Start

### Pure Functions

```typescript
import {
  encodeCalldata,
  decodeCalldata,
  validateParameterType,
  erc20Methods,
} from '@tokamak-ecosystem/dao-action-builder';

// Validate parameters
const validation = validateParameterType(
  '0x1234567890123456789012345678901234567890',
  'address'
);
console.log(validation.isValid); // true

// Validate array parameters
const arrayValidation = validateParameterType(
  '["0x123...", "0x456..."]',
  'address[]'
);

// Encode calldata
const encodeResult = encodeCalldata({
  abi: erc20Methods.abi,
  functionSignature: 'transfer(address,uint256)',
  parameters: {
    to: '0x1234567890123456789012345678901234567890',
    amount: '1000000000000000000',
  },
});

if (encodeResult.success) {
  console.log('Calldata:', encodeResult.data.calldata);
}

// Decode calldata
const decodeResult = decodeCalldata(calldata, abi);
if (decodeResult.success) {
  console.log('Function:', decodeResult.data.functionName);
  console.log('Parameters:', decodeResult.data.parameters);
}
```

### React Hooks

```tsx
import { useActionBuilder } from '@tokamak-ecosystem/dao-action-builder/hooks';
import { erc20Methods } from '@tokamak-ecosystem/dao-action-builder';

function ActionBuilderForm() {
  const {
    availableFunctions,
    selectedFunction,
    setSelectedFunction,
    parameterValues,
    setParameterValue,
    parameterStates,
    calldata,
    canBuildAction,
    buildAction,
  } = useActionBuilder({
    abi: erc20Methods.abi,
  });

  return (
    <div>
      <select
        value={selectedFunction?.name || ''}
        onChange={(e) => setSelectedFunction(e.target.value)}
      >
        {availableFunctions.map((fn) => (
          <option key={fn.name} value={`${fn.name}(${fn.inputs.map(i => i.type).join(',')})`}>
            {fn.name}
          </option>
        ))}
      </select>

      {selectedFunction?.inputs.map((input) => (
        <div key={input.name}>
          <label>{input.name} ({input.type})</label>
          <input
            value={parameterValues[input.name] || ''}
            onChange={(e) => setParameterValue(input.name, e.target.value)}
          />
          {parameterStates[input.name]?.error && (
            <span className="error">{parameterStates[input.name].error}</span>
          )}
        </div>
      ))}

      {calldata && <p>Calldata: {calldata}</p>}

      <button onClick={() => buildAction()} disabled={!canBuildAction}>
        Build Action
      </button>
    </div>
  );
}
```

### Using Predefined Methods

```typescript
import {
  predefinedMethodRegistry,
  buildActionFromPredefined,
  erc20Methods,
} from '@tokamak-ecosystem/dao-action-builder';

// Get all predefined methods
const allMethods = predefinedMethodRegistry.getAll();

// Get specific method
const erc20 = predefinedMethodRegistry.get('erc20');

// Build action using predefined ABI
const action = buildActionFromPredefined(
  {
    contractAddress: '0xTokenAddress',
    functionSignature: 'transfer(address,uint256)',
    parameters: {
      to: '0xRecipient',
      amount: '1000000000000000000',
    },
  },
  erc20Methods.abi
);

// Register custom predefined methods
predefinedMethodRegistry.register({
  id: 'my-custom-contract',
  name: 'My Custom Contract',
  description: 'Custom contract methods',
  abi: [
    {
      type: 'function',
      name: 'customMethod',
      inputs: [{ name: 'value', type: 'uint256' }],
      outputs: [],
      stateMutability: 'nonpayable',
    },
  ],
});
```

## API Reference

### Core Functions

#### `encodeCalldata(options)`

Encode function call to calldata.

```typescript
const result = encodeCalldata({
  abi: AbiFunction[],
  functionSignature: string,
  parameters: { [name: string]: string | ParameterValue },
});
// Returns: Result<EncodeCalldataResult, ActionBuilderError>
```

#### `decodeCalldata(calldata, abi)`

Decode calldata back to function name and parameters.

```typescript
const result = decodeCalldata('0x...', abi);
// Returns: Result<DecodeCalldataResult, ActionBuilderError>
```

#### `validateParameterType(value, type, components?)`

Validate a parameter value against its Solidity type.

```typescript
const result = validateParameterType('123', 'uint256');
// Returns: ParameterValidationResult
```

### Supported Types

- **Basic**: `address`, `bool`, `string`, `bytes`, `bytes1`-`bytes32`, `uint8`-`uint256`, `int8`-`int256`
- **Arrays**: `type[]`, `type[n]`, nested arrays
- **Tuples**: `tuple` with components

### React Hooks

#### `useParameterValidation(options)`

Hook for managing parameter input and validation.

#### `useActionBuilder(options)`

Complete hook for the action builder workflow.

## License

MIT
