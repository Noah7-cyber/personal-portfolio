import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        porcelain: '#F4F2ED',
        alabaster: '#FAF9F6',
        stone: '#E5E1D8',
        graphite: '#20252C',
        slate: '#58616E',
        titanium: '#B5C0CA',
        electric: '#315CFF',
        coral: '#FF714C',
        obsidian: '#05070A',
        navy: '#08111F',
        cyan: '#22D3EE',
        violet: '#8B5CF6',
        emerald: '#10B981',
        amber: '#F59E0B',
        steel: '#94A3B8',
        soft: '#F8FAFC',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'ui-sans-serif', 'system-ui'],
        mono: ['var(--font-mono)', 'JetBrains Mono', 'ui-monospace', 'SFMono-Regular'],
      },
      boxShadow: {
        spatial: '0 20px 50px rgba(32, 37, 44, 0.09), 0 2px 10px rgba(32, 37, 44, 0.04)',
        electric: '0 8px 28px rgba(49, 92, 255, 0.25)',
      },
    },
  },
  plugins: [],
} satisfies Config;
