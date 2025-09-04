/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '475px',
      sm: '640px',
      md: '768px',
      'md-lg': '896px', // タブレット縦向き・小さめデスクトップ
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px', // 大画面デスクトップ
      // 高さベースのブレークポイント
      'h-sm': { raw: '(min-height: 640px)' },
      'h-md': { raw: '(min-height: 768px)' },
      'h-lg': { raw: '(min-height: 1024px)' },
      // デバイス指向のブレークポイント
      'touch': { raw: '(hover: none) and (pointer: coarse)' },
      'no-touch': { raw: '(hover: hover) and (pointer: fine)' },
      // 高解像度ディスプレイ
      'retina': { raw: '(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)' },
    },
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        // ベースカラー（ダークモード基調）
        dark: {
          900: '#0a0a0a', // 最深部
          800: '#1a1a1a', // 背景
          700: '#2a2a2a', // カード背景
          600: '#3a3a3a', // ボーダー
          500: '#4a4a4a', // インアクティブテキスト
          400: '#6a6a6a', // セカンダリテキスト
          300: '#8a8a8a', // ディスエイブルテキスト
        },
        // ネオンアクセント
        neon: {
          blue: '#00d4ff', // サイバーブルー
          purple: '#8b5cf6', // エレクトリックパープル  
          green: '#00ff88', // マトリックスグリーン
          pink: '#ff0080', // ネオンピンク
          yellow: '#ffff00', // エレクトリックイエロー
          cyan: '#00ffff', // サイバーシアン
        },
        // グラデーション用
        gradient: {
          from: '#0066ff',
          via: '#8b5cf6', 
          to: '#ff0080',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-radial-at-t': 'radial-gradient(at top, var(--tw-gradient-stops))',
        'gradient-radial-at-b': 'radial-gradient(at bottom, var(--tw-gradient-stops))',
        'gradient-radial-at-l': 'radial-gradient(at left, var(--tw-gradient-stops))',
        'gradient-radial-at-r': 'radial-gradient(at right, var(--tw-gradient-stops))',
        'gradient-radial-at-tl': 'radial-gradient(at top left, var(--tw-gradient-stops))',
        'gradient-radial-at-tr': 'radial-gradient(at top right, var(--tw-gradient-stops))',
        'gradient-radial-at-bl': 'radial-gradient(at bottom left, var(--tw-gradient-stops))',
        'gradient-radial-at-br': 'radial-gradient(at bottom right, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontSize: {
        'xs': '0.75rem',    // 12px
        'sm': '0.875rem',   // 14px
        'base': '1rem',     // 16px
        'lg': '1.125rem',   // 18px - シニア向け基本サイズ
        'xl': '1.25rem',    // 20px - シニア向け大きめサイズ
        '2xl': '1.5rem',    // 24px
        '3xl': '1.875rem',  // 30px
        '4xl': '2.25rem',   // 36px
        '5xl': '3rem',      // 48px
        '6xl': '3.75rem',   // 60px
        '7xl': '4.5rem',    // 72px
        '8xl': '6rem',      // 96px
        '9xl': '8rem',      // 128px
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      fontFamily: {
        'cyber': ['Orbitron', 'monospace'],
        'futura': ['Futura', 'system-ui', 'sans-serif'],
        'mono-cyber': ['JetBrains Mono', 'Fira Code', 'monospace'],
        'rajdhani': ['var(--font-rajdhani)', 'sans-serif'],
      },
      boxShadow: {
        'neon': '0 0 20px rgba(0, 212, 255, 0.5)',
        'neon-strong': '0 0 40px rgba(0, 212, 255, 0.8)',
        'glow': '0 0 40px rgba(139, 92, 246, 0.3)',
        'glow-strong': '0 0 60px rgba(139, 92, 246, 0.6)',
        'cyber': '0 4px 32px rgba(0, 0, 0, 0.8)',
        'cyber-inset': 'inset 0 0 20px rgba(0, 212, 255, 0.2)',
        'neon-pink': '0 0 20px rgba(255, 0, 128, 0.5)',
        'neon-green': '0 0 20px rgba(0, 255, 136, 0.5)',
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-neon': 'pulse-neon 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.2s ease-out',
        'zoom-in': 'zoomIn 0.2s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'reverse': 'reverse 1s linear infinite',
      },
      keyframes: {
        glow: {
          '0%': {
            boxShadow: '0 0 5px rgba(0, 212, 255, 0.5)',
          },
          '100%': {
            boxShadow: '0 0 20px rgba(0, 212, 255, 0.8), 0 0 30px rgba(0, 212, 255, 0.6)',
          },
        },
        'pulse-neon': {
          '0%, 100%': {
            opacity: '1',
          },
          '50%': {
            opacity: '0.5',
          },
        },
        float: {
          '0%, 100%': {
            transform: 'translateY(0px)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        fadeIn: {
          '0%': {
            opacity: '0',
          },
          '100%': {
            opacity: '1',
          },
        },
        zoomIn: {
          '0%': {
            transform: 'scale(0.95)',
            opacity: '0',
          },
          '100%': {
            transform: 'scale(1)',
            opacity: '1',
          },
        },
        slideUp: {
          '0%': {
            transform: 'translateY(10px)',
            opacity: '0',
          },
          '100%': {
            transform: 'translateY(0)',
            opacity: '1',
          },
        },
        reverse: {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
      },
    },
  },
  plugins: [],
}
