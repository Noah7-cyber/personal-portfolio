'use client';

import { useState } from 'react';
import {
  Wifi,
  WifiOff,
  RefreshCw,
  ShieldCheck,
  Database,
  Server,
  Radio,
  ExternalLink,
  Plus,
  Layers,
  CheckCircle2,
  Clock,
  CopyCheck,
  Receipt,
  PackageCheck,
} from 'lucide-react';
import { contact } from '@/lib/constants';
import { metrics } from '@/lib/data';
import { worldStore, useWorldState } from '@/lib/world-state';
import { sanctuaryAudio } from '@/lib/audio-engine';

interface SimTransaction {
  id: string;
  idempotencyKey: string;
  type: 'INVOICE' | 'INVENTORY';
  title: string;
  amount: string;
  status: 'QUEUED_INDEXEDDB' | 'SYNCING_PUSH' | 'COMMITTED_MONGODB';
  timestamp: string;
  duplicateBlockedCount: number;
}

const PIPELINE_STEPS = [
  {
    step: 1,
    title: 'User Action Captured',
    desc: 'POS invoice or inventory mutation written immediately to local IndexedDB/Storage.',
  },
  {
    step: 2,
    title: 'Service Worker Intercept',
    desc: 'Deterministic idempotency key attached; offline mutation queue secured locally.',
  },
  {
    step: 3,
    title: 'Push-First On Reconnect',
    desc: 'Queued local state pushed to Express API with exponential backoff retry.',
  },
  {
    step: 4,
    title: 'Server Authoritative Check',
    desc: 'Node.js Express verifies idempotency key & commits atomically to MongoDB.',
  },
  {
    step: 5,
    title: 'Pull-Second Reconciliation',
    desc: 'Authoritative server state pulled to reconcile local IndexedDB cache.',
  },
  {
    step: 6,
    title: 'SSE Live Distribution',
    desc: 'Server-Sent Events broadcast real-time state updates to all connected devices.',
  },
];

export default function GInvoiceWorkbench() {
  const ws = useWorldState();
  const [ledger, setLedger] = useState<SimTransaction[]>([
    {
      id: 'INV-3041',
      idempotencyKey: 'idem_7c91e4a2_pos',
      type: 'INVOICE',
      title: 'Walk-in POS Invoice #3041 (Paystack / Cash)',
      amount: '₦8,500',
      status: 'COMMITTED_MONGODB',
      timestamp: 'Synced · Oracle VM',
      duplicateBlockedCount: 0,
    },
    {
      id: 'INV-3042',
      idempotencyKey: 'idem_4b19d0f8_inv',
      type: 'INVENTORY',
      title: 'Inventory Restock · 24x Industrial Cartons',
      amount: '+24 Units',
      status: 'COMMITTED_MONGODB',
      timestamp: 'Synced · Oracle VM',
      duplicateBlockedCount: 1,
    },
  ]);
  const [seq, setSeq] = useState(3043);
  const [syncLog, setSyncLog] = useState<string>(
    'SSE Stream Connected · Local IndexedDB & MongoDB replica in deterministic sync.'
  );

  const isOffline = ws.ginvoiceNetwork === 'offline';
  const isSyncing = ws.ginvoiceNetwork === 'syncing';
  const queuedItems = ledger.filter((t) => t.status === 'QUEUED_INDEXEDDB');

  const toggleNetwork = () => {
    sanctuaryAudio.playPing(isOffline ? 640 : 320);
    if (isOffline) {
      runBiDirectionalSync();
    } else {
      worldStore.setState({
        ginvoiceNetwork: 'offline',
        ginvoiceSyncStep: 2,
      });
      setSyncLog(
        'Network outage simulated. Service Worker interceptor active — capturing all transactions to local IndexedDB.'
      );
    }
  };

  const captureTransaction = (type: 'INVOICE' | 'INVENTORY') => {
    sanctuaryAudio.playPing(540);
    const currentSeq = seq;
    setSeq((n) => n + 1);
    const hash = Math.random().toString(16).substring(2, 8);
    const idemKey = `idem_${currentSeq}_${hash}`;

    const newTx: SimTransaction = {
      id: type === 'INVOICE' ? `INV-${currentSeq}` : `SKU-${currentSeq}`,
      idempotencyKey: idemKey,
      type,
      title:
        type === 'INVOICE'
          ? `Commercial POS Invoice #${currentSeq}`
          : `Inventory Stock Adjustment #${currentSeq}`,
      amount: type === 'INVOICE' ? '₦4,500' : '-3 Units',
      status: isOffline ? 'QUEUED_INDEXEDDB' : 'COMMITTED_MONGODB',
      timestamp: isOffline ? 'Queued Offline (IndexedDB)' : 'Committed (SSE Broadcast)',
      duplicateBlockedCount: 0,
    };

    const nextLedger = [newTx, ...ledger.slice(0, 5)];
    setLedger(nextLedger);

    const newQueuedCount = nextLedger.filter((t) => t.status === 'QUEUED_INDEXEDDB').length;
    worldStore.setState({
      ginvoiceQueuedCount: newQueuedCount,
      ginvoicePulseCounter: ws.ginvoicePulseCounter + 1,
      ginvoiceSyncStep: isOffline ? 2 : 6,
    });

    if (isOffline) {
      setSyncLog(
        `Captured ${newTx.id} offline -> Stored in IndexedDB with key [${idemKey}]. Zero data loss.`
      );
    } else {
      setSyncLog(
        `Captured ${newTx.id} online -> Verified idempotency [${idemKey}] -> Committed to MongoDB & pushed via SSE.`
      );
    }
  };

  const testDuplicateRetry = (txId: string) => {
    sanctuaryAudio.playPing(440);
    setLedger((prev) =>
      prev.map((item) =>
        item.id === txId
          ? { ...item, duplicateBlockedCount: item.duplicateBlockedCount + 1 }
          : item
      )
    );
    const target = ledger.find((t) => t.id === txId);
    if (target) {
      setSyncLog(
        `Idempotency Guard Triggered: Duplicate retry for [${target.idempotencyKey}] intercepted. Returned cached receipt — 0 duplicate charges.`
      );
    }
  };

  const runBiDirectionalSync = () => {
    if (isSyncing) return;
    sanctuaryAudio.playPing(680);
    worldStore.setState({ ginvoiceNetwork: 'syncing', ginvoiceSyncStep: 3 });
    setSyncLog('Step 3/6: Push-First On Reconnect — Flushing local IndexedDB queue to Express API...');

    setTimeout(() => {
      worldStore.setState({ ginvoiceSyncStep: 4 });
      setSyncLog('Step 4/6: Server Authoritative Check — Verifying idempotency keys in MongoDB...');
    }, 450);

    setTimeout(() => {
      worldStore.setState({ ginvoiceSyncStep: 5 });
      setSyncLog('Step 5/6: Pull-Second Reconciliation — Merging authoritative server state...');
    }, 900);

    setTimeout(() => {
      setLedger((prev) =>
        prev.map((item) => ({
          ...item,
          status: 'COMMITTED_MONGODB',
          timestamp: 'Reconciled · SSE Live',
        }))
      );
      worldStore.setState({
        ginvoiceNetwork: 'online',
        ginvoiceQueuedCount: 0,
        ginvoiceSyncStep: 6,
        ginvoicePulseCounter: ws.ginvoicePulseCounter + 1,
      });
      setSyncLog(
        'Step 6/6: Bi-Directional Sync Complete · All offline records reconciled & broadcast via SSE.'
      );
    }, 1350);
  };

  return (
    <div className="panel rounded-3xl border border-cyan/30 bg-gradient-to-br from-[#08111F]/92 via-[#05070B]/92 to-[#091324]/90 p-5 sm:p-8 shadow-2xl backdrop-blur-xl">
      {/* Top Header & Verified Status */}
      <div className="flex flex-col gap-4 border-b border-white/10 pb-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="chip border-amber/40 bg-amber/10 text-amber">
              FLAGSHIP PRODUCT INSTALLATION
            </span>
            <span className="chip border-emerald/30 bg-emerald/10 text-emerald">
              ACTIVE PRODUCTION · STARTED JAN 2026
            </span>
            <span className="font-mono text-xs text-steel">
              Self-Hosted on Oracle Cloud VM
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black tracking-tight text-soft">
            GInvoice <span className="text-cyan font-light">Workstation</span>
          </h3>
          <p className="text-sm sm:text-base text-steel max-w-2xl">
            Offline-First Invoicing, Inventory Management & Bi-Directional POS Synchronization Platform engineered with React, Node.js, Express, MongoDB, Service Workers, SSE, and Paystack.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <a
            href={contact.ginvoice}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            <ExternalLink size={16} />
            <span>Launch Live GInvoice</span>
          </a>
        </div>
      </div>

      {/* Verified Metrics Strip */}
      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {metrics.map(([val, label]) => (
          <div
            key={label}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-cyan/35"
          >
            <span className="block font-mono text-2xl sm:text-3xl font-black text-cyan">
              {val}
            </span>
            <span className="mt-1 block text-xs font-medium text-steel">
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Founder Validation Banner */}
      <div className="mt-4 rounded-2xl border border-amber/25 bg-amber/[0.06] px-4 py-3 text-xs sm:text-sm text-steel flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        <div>
          <strong className="text-amber font-mono uppercase tracking-wider mr-2">
            Founder Validation Telemetry:
          </strong>
          Processed over <strong className="text-soft">₦20,000</strong> in early real-commerce transactions to validate offline idempotency and multi-device sync conflict resolution.
        </div>
        <span className="font-mono text-[11px] text-amber shrink-0">
          Zero Duplicate Billing
        </span>
      </div>

      {/* Interactive Architectural Simulation Deck */}
      <div className="mt-8 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        {/* Left: Interactive Offline-First POS & Sync Simulator */}
        <div className="rounded-2xl border border-cyan/25 bg-black/45 p-4 sm:p-6 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-wider text-cyan block">
                Interactive Architecture Simulation
              </span>
              <h4 className="text-lg font-bold text-soft">
                Offline-First Sync & Idempotency Engine
              </h4>
            </div>

            {/* Network State Switcher */}
            <button
              type="button"
              onClick={toggleNetwork}
              disabled={isSyncing}
              className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 font-mono text-xs font-bold transition-all cursor-pointer border ${
                isOffline
                  ? 'border-amber/50 bg-amber/15 text-amber shadow-[0_0_20px_rgba(245,158,11,0.25)]'
                  : isSyncing
                  ? 'border-emerald/50 bg-emerald/15 text-emerald'
                  : 'border-emerald/40 bg-emerald/10 text-emerald hover:border-cyan/50'
              }`}
            >
              {isOffline ? (
                <>
                  <WifiOff size={14} />
                  <span>OFFLINE OUTAGE (CLICK TO RECONNECT)</span>
                </>
              ) : isSyncing ? (
                <>
                  <RefreshCw size={14} className="animate-spin" />
                  <span>RECONCILING QUEUE...</span>
                </>
              ) : (
                <>
                  <Wifi size={14} />
                  <span>ONLINE · SIMULATE OUTAGE</span>
                </>
              )}
            </button>
          </div>

          {/* Interactive Action Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => captureTransaction('INVOICE')}
              className="btn btn-ghost !py-2 !px-3.5 !text-xs border-cyan/30 hover:border-cyan text-soft"
            >
              <Receipt size={14} className="text-cyan" />
              <span>+ Capture POS Invoice (₦4,500)</span>
            </button>

            <button
              type="button"
              onClick={() => captureTransaction('INVENTORY')}
              className="btn btn-ghost !py-2 !px-3.5 !text-xs border-white/15 hover:border-amber text-soft"
            >
              <PackageCheck size={14} className="text-amber" />
              <span>+ Adjust Inventory Stock</span>
            </button>

            {queuedItems.length > 0 && (
              <button
                type="button"
                onClick={runBiDirectionalSync}
                disabled={isSyncing}
                className="btn btn-primary !py-2 !px-4 !text-xs ml-auto"
              >
                <RefreshCw size={14} className={isSyncing ? 'animate-spin' : ''} />
                <span>Sync {queuedItems.length} Queued Record(s)</span>
              </button>
            )}
          </div>

          {/* Live Telemetry Console Bar */}
          <div className="rounded-xl border border-white/10 bg-[#050811] px-3.5 py-2.5 font-mono text-xs text-cyan flex items-center gap-2.5">
            <Radio size={14} className={isOffline ? 'text-amber animate-pulse' : 'text-emerald animate-pulse'} />
            <span className="truncate">{syncLog}</span>
          </div>

          {/* Transaction & Idempotency Queue Table */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between text-[11px] font-mono text-steel px-1">
              <span>LOCAL INDEXEDDB / MONGODB AUTHORITATIVE LEDGER</span>
              <span>Queued Offline: {queuedItems.length}</span>
            </div>

            <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
              {ledger.map((tx) => {
                const queued = tx.status === 'QUEUED_INDEXEDDB';
                return (
                  <div
                    key={tx.id}
                    className={`rounded-xl border p-3 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 ${
                      queued
                        ? 'border-amber/35 bg-amber/[0.06]'
                        : 'border-white/10 bg-white/[0.03]'
                    }`}
                  >
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-mono text-xs font-bold text-soft">
                          {tx.id}
                        </span>
                        <span className="rounded bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-cyan">
                          {tx.idempotencyKey}
                        </span>
                        <span className="font-mono text-xs font-semibold text-emerald">
                          {tx.amount}
                        </span>
                      </div>
                      <p className="text-xs text-steel truncate">{tx.title}</p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        type="button"
                        onClick={() => testDuplicateRetry(tx.id)}
                        className="rounded-lg border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-steel hover:border-cyan/40 hover:text-cyan transition-colors cursor-pointer"
                        title="Simulate network timeout retry with identical idempotency key"
                      >
                        <CopyCheck size={11} className="inline mr-1" />
                        Retry Idempotency {tx.duplicateBlockedCount > 0 ? `(${tx.duplicateBlockedCount} blocked)` : ''}
                      </button>

                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 font-mono text-[10px] font-semibold ${
                          queued
                            ? 'bg-amber/20 text-amber border border-amber/30'
                            : 'bg-emerald/15 text-emerald border border-emerald/30'
                        }`}
                      >
                        {queued ? (
                          <>
                            <Clock size={11} />
                            IndexedDB Queue
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={11} />
                            Synced
                          </>
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: 6-Step Deterministic Bi-Directional Sync Pipeline */}
        <div
          id="architecture"
          className="rounded-2xl border border-white/10 bg-black/40 p-4 sm:p-6 flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
              <h4 className="font-mono text-sm font-bold text-soft flex items-center gap-2">
                <Layers size={16} className="text-cyan" />
                <span>Bi-Directional Sync Pipeline</span>
              </h4>
              <span className="font-mono text-[11px] text-emerald">
                ● Push-First / Pull-Second
              </span>
            </div>

            <div className="space-y-2.5">
              {PIPELINE_STEPS.map((node) => {
                const isActive =
                  ws.ginvoiceSyncStep === node.step ||
                  (isOffline && node.step <= 2);
                return (
                  <div
                    key={node.step}
                    className={`flex items-start gap-3 rounded-xl border p-3 transition-all ${
                      isActive
                        ? 'border-cyan/50 bg-cyan/10 shadow-[0_0_20px_rgba(34,211,238,0.12)]'
                        : 'border-white/5 bg-white/[0.02] hover:border-cyan/25'
                    }`}
                  >
                    <span
                      className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg font-mono text-xs font-bold ${
                        isActive
                          ? 'bg-cyan text-obsidian'
                          : 'bg-cyan/15 text-cyan'
                      }`}
                    >
                      {node.step}
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-soft">
                        {node.title}
                      </p>
                      <p className="text-[11px] sm:text-xs text-steel leading-relaxed">
                        {node.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-4 border-t border-white/10 pt-3 flex items-center justify-between text-[11px] font-mono text-steel">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-cyan" />
              Idempotency Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Database size={13} className="text-amber" />
              IndexedDB → MongoDB
            </span>
            <span className="flex items-center gap-1.5">
              <Server size={13} className="text-emerald" />
              Oracle Cloud VM
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
