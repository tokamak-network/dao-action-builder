import type { PredefinedMethod } from '../../types';
import { predefinedMethodRegistry } from '../index';

// Import all Tokamak methods
import { tonMethods } from './ton';
import { wtonMethods } from './wton';
import { depositManagerMethods } from './deposit-manager';
import { seigManagerMethods } from './seig-manager';
import { l1BridgeRegistryMethods } from './l1-bridge-registry';
import { layer2ManagerMethods } from './layer2-manager';

// Export individual methods
export { tonMethods } from './ton';
export { wtonMethods } from './wton';
export { depositManagerMethods } from './deposit-manager';
export { seigManagerMethods } from './seig-manager';
export { l1BridgeRegistryMethods } from './l1-bridge-registry';
export { layer2ManagerMethods } from './layer2-manager';

/**
 * All Tokamak predefined methods
 */
export const tokamakMethods: PredefinedMethod[] = [
  tonMethods,
  wtonMethods,
  depositManagerMethods,
  seigManagerMethods,
  l1BridgeRegistryMethods,
  layer2ManagerMethods,
];

/**
 * Register all Tokamak methods with the global registry
 */
export function registerTokamakMethods(): void {
  predefinedMethodRegistry.registerAll(tokamakMethods);
}

/**
 * Get all Tokamak predefined methods
 */
export function getTokamakMethods(): PredefinedMethod[] {
  return tokamakMethods;
}
