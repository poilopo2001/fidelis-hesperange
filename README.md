# ÉDITIONS — Next.js 14 Editorial Premium

Site d'agence immobilière style magazine architectural (type Architectural Digest), converti en Next.js 14 avec App Router.

## 🎨 Design System

### Palette
- **Cream** `#faf9f6` — Fond principal
- **Ink** `#1a1a1a` — Texte principal
- **Brick** `#c44536` — Accent (rouge brique)
- **Stone** `#8a8a8a` — Texte secondaire

### Typographie
- **Serif**: Cormorant Garamond (titres, display)
- **Sans**: Inter (corps de texte, UI)

### Animations (Framer Motion)
- **TextReveal**: Animation caractère par caractère
- **ParallaxImage**: Effet parallax sur les images
- **FadeUp**: Apparition progressive avec décalage
- **Scroll-triggered**: Animations déclenchées au scroll

## 📁 Structure

```
nextjs/
├── app/
│   ├── components/
│   │   ├── EditorialNav.tsx      # Navigation fixe
│   │   ├── MagazineCard.tsx      # Carte magazine
│   │   ├── TextReveal.tsx        # Animation texte
│   │   └── ParallaxImage.tsx     # Image avec parallax
│   ├── sections/
│   │   ├── EditorialHero.tsx     # Hero éditorial
│   │   ├── PressBar.tsx          # Barre presse
│   │   ├── PropertyGrid.tsx      # Grille propriétés
│   │   ├── ExpertiseSection.tsx  # Services
│   │   ├── ProcessSection.tsx    # Méthode
│   │   ├── AboutSection.tsx      # À propos
│   │   ├── TeamSection.tsx       # Équipe
│   │   ├── TestimonialsSection.tsx # Témoignages
│   │   ├── JournalSection.tsx    # Articles
│   │   ├── CTASection.tsx        # Call-to-action
│   │   └── Footer.tsx            # Pied de page
│   ├── globals.css               # Styles globaux
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Page principale
├── lib/
│   └── utils.ts                  # Utilitaires
├── public/
│   └── images/                   # Images statiques
├── tailwind.config.ts            # Configuration Tailwind
└── next.config.js                # Configuration Next.js
```

## 🚀 Installation

```bash
cd v03-editorial/nextjs
npm install
npm run dev
```

## 📦 Build

```bash
npm run build
```

Le build statique est généré dans `dist/`.

## ✨ Features

- **Layout asymétrique** avec grille magazine CSS Grid
- **Typography forte** avec hiérarchie éditoriale
- **Animations premium** avec Framer Motion
- **Text reveal** par caractère
- **Images parallax** au scroll
- **Responsive** mobile-first
- **Accessibilité** avec prefers-reduced-motion
- **Performance** avec Next.js 14

## 🎯 Effets "Wow"

1. **Hero**: Titre éditorial énorme avec animation caractère par caractère
2. **Grille magazine**: Layout asymétrique type Architectural Digest
3. **Parallax**: Images avec défilement différenciel
4. **Hover effects**: Zoom subtil sur les images
5. **Transitions**: Timing éditorial cubic-bezier(0.22, 1, 0.36, 1)

## 📄 Pages

- `/` — Page d'accueil avec toutes les sections
