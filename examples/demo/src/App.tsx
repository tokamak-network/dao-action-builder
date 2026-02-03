import { useState, useEffect, useMemo } from 'react';
import {
  encodeCalldata,
  decodeCalldata,
  validateParameterType,
  getParameterTypeErrorMessage,
  getFunctionSignature,
  daoCommitteeMethods,
  daoAgendaManagerMethods,
  daoVaultMethods,
  depositManagerMethods,
  l1BridgeRegistryMethods,
  layer2ManagerMethods,
  layer2RegistryMethods,
  type AbiFunction,
  type PredefinedMethod,
} from '@tokamak-network/dao-action-builder';

// Contracts controllable by DAOCommitteeProxy with mainnet addresses
const DAO_CONTRACTS: Array<PredefinedMethod & { address: string }> = [
  {
    ...daoCommitteeMethods,
    address: '0xDD9f0cCc044B0781289Ee318e5971b0139602C26',
  },
  {
    ...daoAgendaManagerMethods,
    address: '0xcD4421d082752f363E1687544a09d5112cD4f484',
  },
  {
    ...daoVaultMethods,
    address: '0x2520CD65BAa2cEEe9E6Ad6EBD3F45490C42dd303',
  },
  {
    ...depositManagerMethods,
    address: '0x0b58ca72b12f01fc05f8f252e226f3e2089bd00e',
  },
  {
    ...l1BridgeRegistryMethods,
    address: '0x39d43281A4A5e922AB0DCf89825D73273D8C5BA4',
  },
  {
    ...layer2ManagerMethods,
    address: '0xD6Bf6B2b7553c8064Ba763AD6989829060FdFC1D',
  },
  {
    ...layer2RegistryMethods,
    address: '0x7846c2248a7b4de77e9c2bae7fbb93bfc286837b',
  },
];

function App() {
  // Contract address
  const [contractAddress, setContractAddress] = useState('');

  // Predefined methods
  const [selectedPredefined, setSelectedPredefined] = useState<(PredefinedMethod & { address: string }) | null>(null);

  // Function selection
  const [selectedFunction, setSelectedFunction] = useState<AbiFunction | null>(null);
  const [selectedFunctionSig, setSelectedFunctionSig] = useState('');

  // Parameters
  const [paramValues, setParamValues] = useState<Record<string, string>>({});
  const [paramErrors, setParamErrors] = useState<Record<string, string>>({});

  // Results
  const [calldata, setCalldata] = useState('');
  const [calldataError, setCalldataError] = useState<string | null>(null);
  const [decodedResult, setDecodedResult] = useState<Record<string, string> | null>(null);

  // Available functions based on selected predefined method
  const availableFunctions = useMemo(() => {
    if (selectedPredefined) {
      return selectedPredefined.abi;
    }
    return [];
  }, [selectedPredefined]);

  // Handle contract selection - auto-fill address
  const handleContractSelect = (contract: (PredefinedMethod & { address: string }) | null) => {
    setSelectedPredefined(contract);
    if (contract) {
      setContractAddress(contract.address);
    } else {
      setContractAddress('');
    }
  };

  // Handle function selection
  const handleFunctionSelect = (signature: string) => {
    setSelectedFunctionSig(signature);
    const func = availableFunctions.find((f) => getFunctionSignature(f) === signature);
    setSelectedFunction(func || null);
    setParamValues({});
    setParamErrors({});
    setCalldata('');
    setCalldataError(null);
    setDecodedResult(null);
  };

  // Handle parameter change
  const handleParamChange = (name: string, value: string, type: string) => {
    setParamValues((prev) => ({ ...prev, [name]: value }));

    if (value) {
      const validation = validateParameterType(value, type);
      if (!validation.isValid) {
        setParamErrors((prev) => ({
          ...prev,
          [name]: validation.error || getParameterTypeErrorMessage(type),
        }));
      } else {
        setParamErrors((prev) => {
          const next = { ...prev };
          delete next[name];
          return next;
        });
      }
    } else {
      setParamErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  // Generate calldata
  useEffect(() => {
    if (!selectedFunction) {
      setCalldata('');
      setCalldataError(null);
      return;
    }

    // Check if all params are filled and valid
    const allFilled = selectedFunction.inputs.every(
      (input) => paramValues[input.name]?.trim()
    );
    const hasErrors = Object.keys(paramErrors).length > 0;

    if (!allFilled || hasErrors) {
      setCalldata('');
      setCalldataError(null);
      return;
    }

    const result = encodeCalldata({
      abi: availableFunctions,
      functionSignature: selectedFunctionSig,
      parameters: paramValues,
    });

    if (result.success) {
      setCalldata(result.data.calldata);
      setCalldataError(null);

      // Also decode to verify
      const decoded = decodeCalldata(result.data.calldata, availableFunctions);
      if (decoded.success) {
        const params: Record<string, string> = {};
        for (const [key, value] of Object.entries(decoded.data.parameters)) {
          params[key] = String(value);
        }
        setDecodedResult(params);
      }
    } else {
      setCalldata('');
      setCalldataError(result.error.message);
      setDecodedResult(null);
    }
  }, [selectedFunction, selectedFunctionSig, paramValues, paramErrors, availableFunctions]);

  // Reset when selecting new predefined method
  useEffect(() => {
    setSelectedFunction(null);
    setSelectedFunctionSig('');
    setParamValues({});
    setParamErrors({});
    setCalldata('');
    setCalldataError(null);
    setDecodedResult(null);
  }, [selectedPredefined]);

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>DAO Action Builder</h1>
        <p className="subtitle">
          Build governance proposal actions for Tokamak Network DAOCommitteeProxy
        </p>
      </header>

      <div className="main-layout">
        {/* Left Sidebar - Contract List */}
        <aside className="sidebar">
          <h2>Contracts</h2>
          <p className="sidebar-desc">Controllable by DAOCommitteeProxy</p>
          <div className="contract-list">
            {DAO_CONTRACTS.map((contract) => (
              <div
                key={contract.id}
                className={`contract-item ${selectedPredefined?.id === contract.id ? 'selected' : ''}`}
                onClick={() => handleContractSelect(contract)}
              >
                <div className="contract-name">{contract.name.replace('Tokamak ', '')}</div>
                <div className="contract-address">{contract.address.slice(0, 10)}...{contract.address.slice(-8)}</div>
              </div>
            ))}
          </div>
        </aside>

        {/* Right Content - Action Builder */}
        <main className="content">
          {!selectedPredefined ? (
            <div className="empty-state">
              <div className="empty-icon">&#x1F4DD;</div>
              <h3>Select a Contract</h3>
              <p>Choose a contract from the list on the left to start building a governance action.</p>
            </div>
          ) : (
            <>
              {/* Contract Address Input */}
              <div className="card">
                <h2>{selectedPredefined.name.replace('Tokamak ', '')}</h2>
                <p className="card-description">{selectedPredefined.description}</p>
                <div className="form-group">
                  <label>Contract Address (Mainnet)</label>
                  <input
                    type="text"
                    value={contractAddress}
                    onChange={(e) => setContractAddress(e.target.value)}
                    placeholder="0x..."
                  />
                </div>
              </div>

              {/* Function Selection */}
              {availableFunctions.length > 0 && (
                <div className="card">
                  <h2>Select Function</h2>
                  <div className="form-group">
                    <label>Function ({availableFunctions.length} available)</label>
                    <select
                      value={selectedFunctionSig}
                      onChange={(e) => handleFunctionSelect(e.target.value)}
                    >
                      <option value="">-- Select a function --</option>
                      {availableFunctions.map((func) => {
                        const sig = getFunctionSignature(func);
                        return (
                          <option key={sig} value={sig}>
                            {sig}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </div>
              )}

              {/* Parameters */}
              {selectedFunction && selectedFunction.inputs.length > 0 && (
                <div className="card">
                  <h2>Parameters</h2>
                  <table className="params-table">
                    <thead>
                      <tr>
                        <th style={{ width: '30%' }}>Parameter</th>
                        <th>Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedFunction.inputs.map((input) => (
                        <tr key={input.name}>
                          <td>
                            <span className="param-name">{input.name}</span>
                            <br />
                            <span className="param-type">{input.type}</span>
                          </td>
                          <td>
                            <input
                              type="text"
                              className={paramErrors[input.name] ? 'error' : ''}
                              value={paramValues[input.name] || ''}
                              onChange={(e) => handleParamChange(input.name, e.target.value, input.type)}
                              placeholder={getPlaceholder(input.type)}
                            />
                            {paramErrors[input.name] && (
                              <div className="error-text">{paramErrors[input.name]}</div>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* No parameters message */}
              {selectedFunction && selectedFunction.inputs.length === 0 && (
                <div className="card">
                  <h2>Parameters</h2>
                  <p className="help-text">This function has no parameters.</p>
                </div>
              )}

              {/* Results */}
              {(calldata || calldataError) && (
                <div className="card result-card">
                  <h2>Result</h2>

                  {calldataError && <div className="error-text mb-4">{calldataError}</div>}

                  {calldata && (
                    <>
                      <div className="result-box">
                        <h3>Encoded Calldata</h3>
                        <code>{calldata}</code>
                      </div>

                      {decodedResult && (
                        <div className="result-box">
                          <h3>Decoded Parameters (verification)</h3>
                          <code>
                            {Object.entries(decodedResult).map(([key, value]) => (
                              <div key={key}>
                                <strong>{key}:</strong> {value}
                              </div>
                            ))}
                          </code>
                        </div>
                      )}

                      <div className="action-result">
                        <h3>Action Object</h3>
                        <div className="field">
                          <div className="field-label">Contract Address</div>
                          <div className="field-value">{contractAddress || '(not set)'}</div>
                        </div>
                        <div className="field">
                          <div className="field-label">Function</div>
                          <div className="field-value">{selectedFunctionSig}</div>
                        </div>
                        <div className="field">
                          <div className="field-label">Calldata</div>
                          <div className="field-value">{calldata}</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

function getPlaceholder(type: string): string {
  if (type === 'address') return '0x...';
  if (type.startsWith('uint') || type.startsWith('int')) return '0';
  if (type === 'bool') return 'true or false';
  if (type === 'bytes' || type.startsWith('bytes')) return '0x...';
  if (type === 'string') return 'Enter text...';
  if (type.includes('[]')) return 'JSON array: ["value1", "value2"]';
  if (type === 'tuple') return 'JSON object: {"field": "value"}';
  return '';
}

export default App;
