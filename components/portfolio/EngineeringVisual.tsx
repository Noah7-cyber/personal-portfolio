import Link from 'next/link';
import { ArrowUpRight, Plus } from 'lucide-react';

export default function EngineeringVisual() {
  return (
    <figure className="engineering-visual">
      <div className="visual-topline">
        <span>
          <span className="signal-dot" /> THE ENGINEERING MINDSET
        </span>
        <Plus size={14} />
      </div>
      <svg className="gimbal-illustration" viewBox="0 0 560 465" fill="none" aria-hidden="true">
        <defs>
          <linearGradient
            id="metal"
            x1="100"
            y1="80"
            x2="430"
            y2="370"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#fafbfc" />
            <stop offset=".22" stopColor="#b7c0cc" />
            <stop offset=".43" stopColor="#f5f7fa" />
            <stop offset=".64" stopColor="#8d9aa9" />
            <stop offset=".82" stopColor="#e5eaf0" />
            <stop offset="1" stopColor="#b1bbc8" />
          </linearGradient>
          <linearGradient
            id="metal-edge"
            x1="110"
            y1="230"
            x2="440"
            y2="280"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#748294" />
            <stop offset=".42" stopColor="#e5eaf1" />
            <stop offset="1" stopColor="#8795a7" />
          </linearGradient>
          <linearGradient
            id="blue-core"
            x1="235"
            y1="170"
            x2="335"
            y2="290"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#7591ff" />
            <stop offset=".5" stopColor="#315cff" />
            <stop offset="1" stopColor="#1736ae" />
          </linearGradient>
          <radialGradient id="ground-shadow">
            <stop stopColor="#64748b" stopOpacity=".2" />
            <stop offset="1" stopColor="#64748b" stopOpacity="0" />
          </radialGradient>
          <pattern id="engineering-grid" width="35" height="35" patternUnits="userSpaceOnUse">
            <path d="M 35 0 L 0 0 0 35" stroke="#dddeda" strokeWidth=".65" />
          </pattern>
        </defs>
        <rect x="0" y="0" width="560" height="465" fill="url(#engineering-grid)" />
        <path d="M280 0V445M0 225H560" stroke="#bfc6cb" strokeDasharray="3 7" strokeWidth=".8" />
        <ellipse cx="286" cy="389" rx="170" ry="36" fill="url(#ground-shadow)" />
        <path d="M218 365 281 341 348 365 284 391Z" fill="#c3ccd6" />
        <path d="M218 365V375L284 403V391Z" fill="#9ba8b6" />
        <path d="m284 391 64-26v10l-64 28Z" fill="#b6c2cf" />
        <path d="M266 316h36v43c0 9-36 9-36 0Z" fill="url(#metal-edge)" />
        <ellipse cx="284" cy="316" rx="18" ry="6" fill="#e9edf2" />
        <g className="gimbal-assembly">
          <g transform="rotate(-28 280 224)">
            <ellipse cx="280" cy="229" rx="181" ry="112" stroke="#8d9baa" strokeWidth="22" />
            <ellipse cx="280" cy="222" rx="181" ry="112" stroke="url(#metal)" strokeWidth="20" />
            <ellipse cx="280" cy="219" rx="181" ry="112" stroke="#f6f8fb" strokeWidth="1.5" />
            <path d="M98 223h29m305 0h29" stroke="#6e7f95" strokeWidth="5" />
            <circle cx="111" cy="223" r="8" fill="#ced6e0" stroke="#8e9cad" />
            <circle cx="449" cy="223" r="8" fill="#ced6e0" stroke="#8e9cad" />
            <circle cx="111" cy="223" r="2.5" fill="#607088" />
            <circle cx="449" cy="223" r="2.5" fill="#607088" />
          </g>
          <g transform="rotate(58 280 224)">
            <ellipse cx="284" cy="224" rx="152" ry="89" stroke="#8391a4" strokeWidth="16" />
            <ellipse cx="280" cy="224" rx="152" ry="89" stroke="url(#metal)" strokeWidth="15" />
            <ellipse cx="279" cy="223" rx="152" ry="89" stroke="#f4f6f9" strokeWidth="1" />
            <circle cx="128" cy="224" r="7" fill="#b7c4d4" stroke="#7d8da3" />
            <circle cx="432" cy="224" r="7" fill="#b7c4d4" stroke="#7d8da3" />
          </g>
          <g transform="rotate(-12 280 224)">
            <ellipse cx="280" cy="227" rx="90" ry="124" stroke="#8391a4" strokeWidth="13" />
            <ellipse cx="278" cy="224" rx="90" ry="124" stroke="url(#metal)" strokeWidth="12" />
            <ellipse cx="277" cy="223" rx="90" ry="124" stroke="#f7f8fb" strokeWidth="1" />
          </g>
          <path d="m278 173 43 25-43 25-43-25Z" fill="#8ba3ff" />
          <path d="m235 198 43 25v51l-43-25Z" fill="url(#blue-core)" />
          <path d="m278 223 43-25v51l-43 25Z" fill="#2447dd" />
          <path
            d="m246 206 22 13m-22 1 15 9m28 7 20-12"
            stroke="#c5d0ff"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path d="m278 173 43 25v51l-43 25-43-25v-51Z" stroke="#315cff" strokeWidth=".7" />
          <circle cx="278" cy="147" r="5" fill="#315cff" />
          <circle cx="278" cy="301" r="5" fill="#315cff" />
        </g>
        <path d="M405 135h56v-24M149 306H85v25" stroke="#9aa7b8" strokeWidth=".8" />
        <circle cx="405" cy="135" r="3" fill="#315cff" />
        <circle cx="149" cy="306" r="3" fill="#315cff" />
        <text x="417" y="99" fill="#717b88" fontSize="9" fontFamily="monospace" letterSpacing="1">
          SYSTEMS
        </text>
        <text x="61" y="349" fill="#717b88" fontSize="9" fontFamily="monospace" letterSpacing="1">
          PRECISION
        </text>
        <path d="M19 20h13m-6-6v13M528 425h13m-6-6v13" stroke="#9da9b6" />
        <text x="19" y="433" fill="#8d96a0" fontSize="8" fontFamily="monospace" letterSpacing="1.5">
          FIG. 01 — CONNECTING THE PIECES
        </text>
      </svg>
      <figcaption>
        <span>
          Software thinking.
          <br />
          <strong>Engineering perspective.</strong>
        </span>
        <Link
          href="/gallery"
          prefetch={false}
          aria-label="Explore the interactive 3D engineering gallery"
        >
          <ArrowUpRight size={22} />
        </Link>
      </figcaption>
    </figure>
  );
}
