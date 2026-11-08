---
name: toko-kazura-ui-system
description: >-
  Design system, responsive split-screen Linktree architecture, red-and-white brand tokens,
  page-based navigation rules (no popups/modals), and catalog synchronization workflow
  for Toko Kazura (Zura Store). Use this skill whenever creating, updating, or styling
  pages, product cards, or catalog data in the Toko Kazura website.
---

# Toko Kazura — Linktree & Catalog UI System Skill

Use this skill to keep the **Toko Kazura (Zura Store)** website visually consistent, responsive across desktop and mobile, and 100% synchronized with the official catalog in `../bot zura/src/catalog.js`.

## 1. Core Architectural Rules

1. **Responsive Split-Screen Linktree Layout**:
   - **Desktop (`>= 1024px`)**: Two-column layout.
     - **Left Column (Sticky Brand & Order Hub)**: Displays the official banner (`/assets/banner-kazura.jpg`), store identity (`TOKO KAZURA • ZURA STORE`), real-time WIB store open/closed badge (`08.00 – 23.00 WIB`), concise store overview, QRIS payment badge, and primary **WhatsApp** & **Discord** order buttons.
     - **Right Column (Dynamic Multi-Page View)**: Displays the Linktree hub and transitions between dedicated pages when any Joki Game or Digital Product is clicked.
   - **Mobile (`< 1024px`)**: Single-column adaptive flow.
     - On the Home route (`#/`), the Left Brand & Order Hub stacks above the Linktree product list.
     - On any detail route (`#/kategori/...` or `#/layanan/...`), the detail page takes the primary viewport with a sticky top back-navigation bar and a bottom/inline WhatsApp & Discord order bar.
2. **Full-Page Navigation Only (Zero Popups / Modals)**:
   - Clicking any Joki Game category, Digital Product category, or individual service **must navigate to a dedicated page route** (using URL hash routing `#/...` with `window.scrollTo({ top: 0 })` and browser Back/Forward history support).
   - Never use modal dialogs or popups for viewing product details or ordering.
3. **No Login / No Cart Checkout Gate**:
   - Do not include login, registration, or user authentication UI.
   - All order actions redirect directly to **WhatsApp** (`https://wa.me/6282172795156`) with pre-filled package details or **Discord** (`https://discord.gg/kTqNnYUsmB`).

## 2. Red & White Theme Tokens (Matched to `banner-kazura.jpg`)

Read [design-tokens.md](./references/design-tokens.md) for the complete color palette, typography scale, and card elevation rules.

- **Crimson Brand Primary**: `#7F0D0D` / `#991B1B` (matches the deep cracked crimson banner)
- **Vibrant Red Accent**: `#DC2626` / `#B91C1C`
- **Pure White Surface**: `#FFFFFF`
- **Warm Snow Background**: `#FAF6F6`
- **Soft Crimson Tint**: `#FEF2F2` / `#FEE2E2`
- **Obsidian Ink Text**: `#140808` / `#1F1212`

## 3. Catalog Synchronization Procedure

Read [catalog-schema.md](./references/catalog-schema.md) when updating prices, items, or categories from `../bot zura/src/catalog.js`.
