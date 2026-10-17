'use client';

import { useSyncExternalStore } from 'react';
import type { GalleryId } from './constants';
import { galleries } from './constants';

export interface ExhibitDetail {
  id: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  summary: string;
  details: string[];
  stack: string[];
  metrics?: [string, string][];
  links?: { label: string; href: string }[];
  note?: string;
}

export type RobotJointId = 'J1' | 'J2' | 'J3' | 'J4' | 'J6';
export type DevOpsNodeId = 'cicd' | 'docker' | 'nginx' | 'oracle' | 'postgres' | 'iot';

export interface WorldState {
  activeGallery: GalleryId;
  targetGalleryIndex: number; // 0..6
  explodedView: boolean;
  resumeViewOpen: boolean;
  contactDrawerOpen: boolean;
  selectedExhibit: ExhibitDetail | null;

  // Entrance Sculpture
  selectedHeroPart: 'gimbal' | 'planetary' | 'actuators' | 'core' | null;

  // Origin Gallery (0..3)
  selectedOriginPillar: number;

  // Workshop Gallery — GInvoice 3D Offline/Sync State
  ginvoiceConnected: boolean;
  ginvoiceSyncing: boolean;
  ginvoiceLocalQueue: { id: string; key: string; amount: string }[];
  ginvoiceSyncedCount: number;
  ginvoiceStatusText: string;

  // Laboratory Gallery — 6-DOF Robot & Wastewater Digital Twin
  selectedRobotJoint: RobotJointId;
  robotPoseIndex: number;
  twinBlowerRpm: number; // 30..100 %
  twinInfluentBod: number; // 120..420 mg/L
  electrolyzerCurrent: number; // 150..850 mA/cm2

  // Network Gallery — 3D DevOps Node
  selectedDevOpsNode: DevOpsNodeId;

  // Journey Gallery — Selected Milestone (0..5)
  selectedJourneyIndex: number;
}

let state: WorldState = {
  activeGallery: 'entrance',
  targetGalleryIndex: 0,
  explodedView: false,
  resumeViewOpen: false,
  contactDrawerOpen: false,
  selectedExhibit: null,

  selectedHeroPart: null,
  selectedOriginPillar: 0,

  ginvoiceConnected: true,
  ginvoiceSyncing: false,
  ginvoiceLocalQueue: [],
  ginvoiceSyncedCount: 3042,
  ginvoiceStatusText: 'ONLINE · Cloud & Local Storage Synchronized (SSE Active)',

  selectedRobotJoint: 'J6',
  robotPoseIndex: 0,
  twinBlowerRpm: 76,
  twinInfluentBod: 220,
  electrolyzerCurrent: 450,

  selectedDevOpsNode: 'docker',
  selectedJourneyIndex: 0,
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
  navigateToGallery(idOrIndex: GalleryId | number) {
    const idx =
      typeof idOrIndex === 'number'
        ? Math.max(0, Math.min(galleries.length - 1, idOrIndex))
        : Math.max(
            0,
            galleries.findIndex((g) => g.id === idOrIndex)
          );
    const gallery = galleries[idx] || galleries[0];
    state = {
      ...state,
      targetGalleryIndex: idx,
      activeGallery: gallery.id,
      selectedExhibit: null,
    };
    emitChange();
  },
  disconnectGInvoiceNetwork() {
    const txNum = 3043 + state.ginvoiceLocalQueue.length;
    const initialTx = {
      id: `INV-${txNum}`,
      key: `idem_${txNum}_local`,
      amount: '₦6,500',
    };
    state = {
      ...state,
      ginvoiceConnected: false,
      ginvoiceSyncing: false,
      ginvoiceLocalQueue: [...state.ginvoiceLocalQueue, initialTx],
      ginvoiceStatusText: `NETWORK DISCONNECTED · ${initialTx.id} captured to local IndexedDB queue`,
    };
    emitChange();
  },
  createGInvoiceTransaction() {
    const seq = 3043 + state.ginvoiceLocalQueue.length + (state.ginvoiceSyncedCount - 3042);
    const hash = Math.random().toString(16).slice(2, 6);
    const tx = {
      id: `INV-${seq}`,
      key: `idem_${seq}_${hash}`,
      amount: seq % 2 === 0 ? '₦4,800' : '₦12,000',
    };
    if (!state.ginvoiceConnected) {
      const nextQueue = [...state.ginvoiceLocalQueue, tx].slice(-5);
      state = {
        ...state,
        ginvoiceLocalQueue: nextQueue,
        ginvoiceStatusText: `OFFLINE QUEUE (${nextQueue.length}) · ${tx.id} stored locally with key [${tx.key}]`,
      };
    } else {
      state = {
        ...state,
        ginvoiceSyncedCount: state.ginvoiceSyncedCount + 1,
        ginvoiceStatusText: `COMMITTED · ${tx.id} verified idempotently & broadcast via SSE`,
      };
    }
    emitChange();
  },
  restoreGInvoiceConnection() {
    if (state.ginvoiceSyncing) return;
    const queuedCount = state.ginvoiceLocalQueue.length;
    state = {
      ...state,
      ginvoiceConnected: true,
      ginvoiceSyncing: true,
      ginvoiceStatusText:
        queuedCount > 0
          ? `SYNCHRONIZING ${queuedCount} QUEUED RECORD(S) · Push-First → MongoDB Check → Pull-Second...`
          : 'CONNECTION RESTORED · Verifying replica state...',
    };
    emitChange();

    setTimeout(() => {
      const flushed = state.ginvoiceLocalQueue.length;
      state = {
        ...state,
        ginvoiceSyncing: false,
        ginvoiceLocalQueue: [],
        ginvoiceSyncedCount: state.ginvoiceSyncedCount + flushed,
        ginvoiceStatusText: `SYNCHRONIZED · ${flushed} offline record(s) committed to MongoDB with zero duplicate billing`,
      };
      emitChange();
    }, 1800);
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
