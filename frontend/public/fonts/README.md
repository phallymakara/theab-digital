# Digital Theab - Custom Khmer Typography & Web Fonts

This directory contains organized custom Khmer typography optimized for web performance across Mobile, Tablet, and Desktop devices.

## Directory Structure

```
fonts/
├── khmer/
│   ├── asvadek-mokha/
│   │   ├── asvadek-mokha.woff2   (~79 KB - Modern Web standard)
│   │   ├── asvadek-mokha.woff    (~105 KB - Legacy browser fallback)
│   │   └── asvadek-mokha.ttf     (~210 KB - Desktop TrueType source)
│   ├── komutt/
│   │   ├── kh-ang-komutt-b.woff2 (~77 KB)
│   │   ├── kh-ang-komutt-b.woff  (~121 KB)
│   │   └── kh-ang-komutt-b.ttf   (~593 KB)
│   ├── kouteok/
│   │   ├── kh-ang-kouteok.woff2  (~79 KB)
│   │   ├── kh-ang-kouteok.woff   (~132 KB)
│   │   └── kh-ang-kouteok.ttf    (~638 KB)
│   └── phalluch/
│       ├── kh-phalluch-002.woff2 (~97 KB)
│       ├── kh-phalluch-002.woff  (~166 KB)
│       └── kh-phalluch-002.ttf   (~679 KB)
└── README.md
```

## Designer Attribution & Template Usage

1. **KH PhalLuch 002**
   - Designer: Yeun PhalLuch (យឺន ផល្លុច - AKbalthom)
   - Usage: Angkorian Grandeur Heritage templates (`.font-phalluch`)

2. **Kh Ang Komutt B**
   - Designer: Yong Yeang (យ៉ុង យាង - អង្គ ពានរេន្ទ្រ)
   - Usage: Modern Luxury & Minimalist Chic templates (`.font-komutt`, `.font-komutt-a`)

3. **Kh Ang Kouteok**
   - Designer: Yong Yeang (យ៉ុង យាង - អង្គ ពានរេន្ទ្រ)
   - Usage: Romantic Floral Romance templates (`.font-kouteok`)

4. **Asvadek Mokha**
   - Designer: Nou Sovannarout (នូ សុវណ្ណារោត - ASvadek)
   - Usage: Emerald Radiant Diamond templates (`.font-mokha`, `.font-asvadek-mokha`)

## Performance Optimizations
- **WOFF2 Compression**: Brotli compression reduces file size by ~85% (from ~680KB down to ~77-97KB).
- **Font-Display Swap**: `font-display: swap` prevents FOIT (Flash of Invisible Text) on mobile/cellular connections.
- **Preloading**: Critical Khmer display fonts are preloaded in `index.html`.

