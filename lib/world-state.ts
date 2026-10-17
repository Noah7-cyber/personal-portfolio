'use client';

import { useSyncExternalStore } from 'react';

export type WorldZoneId =
  | 'home'
  | 'about'
  | 'experience'
  | 'projects'
  | 'engineering'
  | 'skills'
  | 'contact';

export type LabAssemblyId = 'gantry' | 'rover' | 'plc' | 'twin';

export interface WorldState {
  activeZone: WorldZoneId;
  scrollProgress: number;
  explodedView: boolean;
  inspectMode: boolean;
  audioEnabled: boolean;
  ginvoiceNetwork: 'online' | 'offline' | 'syncing';
  ginvoiceQueuedCount: number;
  ginvoiceSyncStep: number; // 0 = idle, 1..6 = active pipeline step
  ginvoicePulseCounter: number;
  activeLabAssembly: LabAssemblyId;
  labScanSpeed: number;
  activeInfraLayer: 'all' | 'edge' | 'compute' | 'data' | 'cicd' | 'iot';
}

let state: WorldState = {
  activeZone: 'home',
  scrollProgress: 0,
  explodedView: false,
  inspectMode: false,
  audioEnabled: false,
  ginvoiceNetwork: 'online',
  ginvoiceQueuedCount: 0,
  ginvoiceSyncStep: 0,
  ginvoicePulseCounter: 0,
  activeLabAssembly: 'gantry',
  labScanSpeed: 1,
  activeInfraLayer: 'all',
};

const listeners = new Set<() => void>();

function emitChange() {
  for (const listener of listeners) {
    listener();
  }
}

export const worldStore = {
  getState(): WorldState {
    return state;
  },
  setState(partial: Partial<WorldState>) {
    state = { ...state, ...partial };
    emitChange();
  },
  subscribe(listener: () => void) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};

export function useWorldState(): WorldState {
  return useSyncExternalStore(
    worldStore.subscribe,
    worldStore.getState,
    worldStore.getState
  );
}
