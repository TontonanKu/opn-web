---
trigger: always_on
---

# Toko Kazura Workspace Consistency Rules

1. **Theme**: Strictly maintain the Pure White (`#FFFFFF`), Neutral Gray (`#F9FAFB`, `#E5E7EB`), & Deep Crimson Red (`#7A0B0B`, `#991B1B`) color scheme matching `/assets/banner-kazura.jpg`. Never use pink/merah muda background tints.
2. **Layout**: Desktop uses a split-screen layout (Left: Banner, Bio, Store Hours, WhatsApp & Discord Order CTA; Right: Multi-page Linktree navigation). Mobile adapts seamlessly into a single-column flow.
3. **Navigation Flow**:
   - Root view (`#/`) shows only 2 main Linktree categories: **Joki Game** (`#/joki-game`) and **Produk Digital** (`#/produk`).
   - Clicking **Joki Game** navigates to `#/joki-game` listing the available games; clicking a game navigates to its dedicated pricelist page (`#/kategori/<key>`).
   - Clicking **Produk Digital** navigates to `#/produk` listing product categories; clicking one navigates to its dedicated pricelist page (`#/kategori/<key>`).
   - Never use popup modals or top horizontal scrolling category pill bars.
4. **No Auth**: Never add login, signup, or account management features. All orders redirect to WhatsApp (`6282172795156`) or Discord (`https://discord.gg/kTqNnYUsmB`).
5. **Catalog Truth**: Keep all product names, prices, notes, and order guides synchronized with `bot zura/src/catalog.js`.
