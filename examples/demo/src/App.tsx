import { useState, useEffect, useMemo } from 'react';
import {
  loadAbi,
  encodeCalldata,
  decodeCalldata,
  validateParameterType,
  getParameterTypeErrorMessage,
  predefinedMethodRegistry,
  getFunctionSignature,
  getAvailableFunctions,
  type ActionBuilderConfig,
  type AbiFunction,
  type LoadAbiResult,
  type PredefinedMethod,
} from '@dao-action-builder/core';
import { registerTokamakMethods } from '@dao-action-builder/tokamak';

// Register Tokamak methods
registerTokamakMethods();

type TabType = 'etherscan' | 'predefined';

function App() {
  // Config
  const [apiKey, setApiKey] = useState('');
  const [chainId, setChainId] = useState('1');
  const [rpcUrl, setRpcUrl] = useState('');

  // Tab selection
  const [activeTab, setActiveTab] = useState<TabType>('predefined');

  // Etherscan ABI loading
  const [contractAddress, setContractAddress] = useState('');
  const [isLoadingAbi, setIsLoadingAbi] = useState(false);
  const [abiResult, setAbiResult] = useState<LoadAbiResult | null>(null);
  const [abiError, setAbiError] = useState<string | null>(null);

  // Predefined methods
  const [selectedPredefined, setSelectedPredefined] = useState<PredefinedMethod | null>(null);
  const predefinedMethods = useMemo(() => predefinedMethodRegistry.getAll(), []);

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

  // Available functions based on mode
  const availableFunctions = useMemo(() => {
    if (activeTab === 'predefined' && selectedPredefined) {
      return selectedPredefined.abi;
    }
    if (activeTab === 'etherscan' && abiResult) {
      return getAvailableFunctions(abiResult);
    }
    return [];
  }, [activeTab, selectedPredefined, abiResult]);

  // Config object
  const config: ActionBuilderConfig = useMemo(
    () => ({
      etherscan: {
        apiKey,
        chainId: parseInt(chainId, 10),
      },
      rpc: rpcUrl ? { url: rpcUrl } : undefined,
    }),
    [apiKey, chainId, rpcUrl]
  );

  // Load ABI from Etherscan
  const handleLoadAbi = async () => {
    if (!contractAddress || !apiKey) return;

    setIsLoadingAbi(true);
    setAbiError(null);
    setAbiResult(null);
    setSelectedFunction(null);
    setSelectedFunctionSig('');
    setParamValues({});
    setParamErrors({});
    setCalldata('');

    const result = await loadAbi(contractAddress, config);

    setIsLoadingAbi(false);

    if (result.success) {
      setAbiResult(result.data);
    } else {
      setAbiError(result.error.message);
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

  // Reset when switching tabs
  useEffect(() => {
    setSelectedFunction(null);
    setSelectedFunctionSig('');
    setParamValues({});
    setParamErrors({});
    setCalldata('');
    setCalldataError(null);
    setDecodedResult(null);
  }, [activeTab]);

  return (
    <div className="container">
      <h1>DAO Action Builder Demo</h1>
      <p className="subtitle">
        Test the @dao-action-builder/core library - load ABIs, validate parameters, and encode calldata
      </p>

      {/* Configuration */}
      <div className="config-section">
        <h3>Configuration (for Etherscan ABI loading)</h3>
        <div className="row">
          <div className="col">
            <div className="form-group">
              <label>Etherscan API Key</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Etherscan API key"
              />
            </div>
          </div>
          <div className="col">
            <div className="form-group">
              <label>Chain ID</label>
              <select value={chainId} onChange={(e) => setChainId(e.target.value)}>
                <option value="1">Ethereum Mainnet (1)</option>
                <option value="11155111">Sepolia (11155111)</option>
                <option value="137">Polygon (137)</option>
                <option value="42161">Arbitrum (42161)</option>
              </select>
            </div>
          </div>
        </div>
        <div className="form-group">
          <label>RPC URL (optional, for proxy detection)</label>
          <input
            type="text"
            value={rpcUrl}
            onChange={(e) => setRpcUrl(e.target.value)}
            placeholder="https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY"
          />
          <div className="help-text">Required for automatic proxy implementation detection</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={`tab ${activeTab === 'predefined' ? 'active' : ''}`}
          onClick={() => setActiveTab('predefined')}
        >
          Predefined Methods
        </button>
        <button
          className={`tab ${activeTab === 'etherscan' ? 'active' : ''}`}
          onClick={() => setActiveTab('etherscan')}
        >
          Load from Etherscan
        </button>
      </div>

      {/* Predefined Methods Tab */}
      {activeTab === 'predefined' && (
        <div className="card">
          <h2>Select Predefined Method</h2>
          <div className="predefined-grid">
            {predefinedMethods.map((method) => (
              <div
                key={method.id}
                className={`predefined-item ${selectedPredefined?.id === method.id ? 'selected' : ''}`}
                onClick={() => {
                  setSelectedPredefined(method);
                  setSelectedFunction(null);
                  setSelectedFunctionSig('');
                }}
              >
                <div className="name">{method.name}</div>
                <div className="desc">{method.description}</div>
              </div>
            ))}
          </div>

          {selectedPredefined && (
            <>
              <div className="divider" />
              <div className="form-group">
                <label>Contract Address (for the action)</label>
                <input
                  type="text"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  placeholder="0x..."
                />
              </div>
            </>
          )}
        </div>
      )}

      {/* Etherscan Tab */}
      {activeTab === 'etherscan' && (
        <div className="card">
          <h2>Load ABI from Etherscan</h2>
          <div className="row">
            <div className="col">
              <div className="form-group">
                <label>Contract Address</label>
                <input
                  type="text"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  placeholder="0x..."
                />
              </div>
            </div>
            <div className="col" style={{ flex: '0 0 auto' }}>
              <div className="form-group">
                <label>&nbsp;</label>
                <button
                  className="btn btn-primary"
                  onClick={handleLoadAbi}
                  disabled={!contractAddress || !apiKey || isLoadingAbi}
                >
                  {isLoadingAbi ? 'Loading...' : 'Load ABI'}
                </button>
              </div>
            </div>
          </div>

          {isLoadingAbi && <span className="status loading">Loading ABI...</span>}
          {abiError && <span className="status error">{abiError}</span>}
          {abiResult && (
            <div>
              <span className="status success">
                ABI loaded ({availableFunctions.length} functions)
              </span>
              {abiResult.isProxy && (
                <span className="status proxy" style={{ marginLeft: 8 }}>
                  Proxy detected
                </span>
              )}
            </div>
          )}
        </div>
      )}

      {/* Function Selection */}
      {availableFunctions.length > 0 && (
        <div className="card">
          <h2>Select Function</h2>
          <div className="form-group">
            <label>Function</label>
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

      {/* Results */}
      {(calldata || calldataError) && (
        <div className="card">
          <h2>Result</h2>

          {calldataError && <div className="error-text mb-4">{calldataError}</div>}

          {calldata && (
            <>
              <div className="result-box">
                <h3>Encoded Calldata</h3>
                <code>{calldata}</code>
              </div>

              {decodedResult && (
                <div className="result-box" style={{ marginTop: 12 }}>
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

              <div className="action-result mt-4">
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

      {/* No function selected hint */}
      {selectedFunction && selectedFunction.inputs.length === 0 && (
        <div className="card">
          <h2>Result</h2>
          <p className="help-text">This function has no parameters.</p>
          {calldata && (
            <div className="result-box mt-4">
              <h3>Encoded Calldata</h3>
              <code>{calldata}</code>
            </div>
          )}
        </div>
      )}
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
