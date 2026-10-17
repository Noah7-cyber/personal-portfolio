'use client';

class SanctuaryAudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private lfo: OscillatorNode | null = null;
  private isRunning = false;

  public toggle(): boolean {
    if (this.isRunning) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    if (typeof window === 'undefined' || this.isRunning) return;

    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      const master = this.ctx.createGain();
      master.gain.setValueAtTime(0.001, now);
      master.gain.exponentialRampToValueAtTime(0.025, now + 1.5);
      master.connect(this.ctx.destination);
      this.masterGain = master;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(180, now);

      const o1 = this.ctx.createOscillator();
      o1.type = 'sine';
      o1.frequency.setValueAtTime(110.0, now);

      const o2 = this.ctx.createOscillator();
      o2.type = 'triangle';
      o2.frequency.setValueAtTime(164.81, now);

      const o2Gain = this.ctx.createGain();
      o2Gain.gain.setValueAtTime(0.28, now);

      const lfo = this.ctx.createOscillator();
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(0.1, now);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(40, now);

      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);

      o1.connect(filter);
      o2.connect(o2Gain);
      o2Gain.connect(filter);
      filter.connect(master);

      o1.start(now);
      o2.start(now);
      lfo.start(now);

      this.osc1 = o1;
      this.osc2 = o2;
      this.lfo = lfo;
      this.isRunning = true;
    } catch {
      this.isRunning = false;
    }
  }

  public stop() {
    if (!this.ctx || !this.isRunning) return;
    try {
      const now = this.ctx.currentTime;
      if (this.masterGain) {
        this.masterGain.gain.setValueAtTime(this.masterGain.gain.value, now);
        this.masterGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.4);
      }
      setTimeout(() => {
        try {
          this.osc1?.stop();
          this.osc2?.stop();
          this.lfo?.stop();
          this.osc1?.disconnect();
          this.osc2?.disconnect();
          this.lfo?.disconnect();
        } catch {
          // ignore cleanup errors
        }
        this.osc1 = null;
        this.osc2 = null;
        this.lfo = null;
        this.isRunning = false;
      }, 450);
    } catch {
      this.isRunning = false;
    }
  }

  public playPing(freq = 520) {
    if (!this.ctx || !this.isRunning) return;
    try {
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.2, now + 0.08);

      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch {
      // ignore
    }
  }
}

export const sanctuaryAudio = new SanctuaryAudioEngine();
