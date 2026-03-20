# Ananya Boutique — Next.js 15

A full-stack e-commerce boutique app built with **Next.js 15 App Router**, **Tailwind CSS v4**, **Mongoose / MongoDB Atlas**, and **Framer Motion**.

---

## Tech Stack

| Layer     | Technology                                  |
|-----------|-----------|
| Framework | Next.js 15 (App Router)                     |
| Styling   | Tailwind CSS v4 + custom design tokens      |
| Database  | MongoDB Atlas via Mongoose                  |
| Animations| Framer Motion (`motion/react`)              |
| Analytics | Vercel Analytics                            |
| Avatars   | Multiavatar (Static local assets)           |
| Icons     | Lucide React                                |
| Fonts     | Google Fonts — Inter + Playfair Display     |

---

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout — fonts, metadata, providers
│   ├── page.tsx                # Home page
│   ├── shop/page.tsx           # Full catalogue with sort & pagination
│   ├── categories/page.tsx     # Category listing + filtered products
│   ├── products/[slug]/page.tsx# Product detail (fetches from API)
│   ├── cart/page.tsx           # Cart + WhatsApp checkout
│   ├── wishlist/page.tsx       # Saved items
│   ├── profile/page.tsx        # User profile (UI only)
│   ├── about/page.tsx          # About + contact
│   ├── globals.css             # Tailwind v4 theme tokens + base styles
│   └── api/
│       └── products/
│           ├── route.ts        # GET /api/products
│           └── [slug]/route.ts # GET /api/products/:slug
├── components/                 # Shared UI components
├── context/ShopContext.tsx     # Global cart, wishlist, product state
├── data/categories.ts          # Static category list
├── lib/
│   ├── mongodb.ts              # Singleton Mongoose connection (hot-reload safe)
│   └── models/Product.ts      # Mongoose Product schema
├── types/index.ts
└── utils/index.ts
```

---

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.local.example .env.local
```

Edit `.env.local`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster0.xxxxx.mongodb.net/ananya?retryWrites=true&w=majority
NEXT_PUBLIC_WHATSAPP_NUMBER=917494954286
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## MongoDB — Product Schema

```ts
{
  name:            String   // required
  slug:            String   // required, unique — used as URL param
  description:     String   // required
  category:        String   // e.g. "Sarees", "Suits", "Gowns"
  images:          String[] // array of image URLs
  price:           Number   // required (INR)
  originalPrice:   Number   // optional, for strike-through display
  discountPercent: Number   // optional
  sizes:           String[] // e.g. ["S","M","L","XL"] or ["Free Size"]
  colors:          [{ name, hex }]
  stock:           Number   // 0 = out of stock
  rating:          Number   // 0–5
  reviewCount:     Number
  isFeatured:      Boolean
  isNewArrival:    Boolean
  isTrending:      Boolean
}
```

---

## Bug Fixes vs Original Vite Version

| # | File                    | Bug                                                                         | Fix                                                              |
|---|-------------------------|-----------------------------------------------------------------------------|------------------------------------------------------------------|
| 1 | `WishlistView`          | Used static empty `PRODUCTS[]` → wishlist always blank                      | `wishlistedProducts` derived from live context products          |
| 2 | `ShopContext`           | `products` missing from `ShopContextType` interface → TypeScript error      | Added to interface; also added `isLoading`, `error`, `clearCart`|
| 3 | `ShopView` sort         | `new Date(b.id)` on ObjectId → broken/random "Newest" sort                  | Uses `createdAt` ISO string from API response                    |
| 4 | `ProductCard`           | `product.sizes[0]` called with no guard → `undefined` added to cart        | Falls back to `'Free Size'` when sizes array is empty            |
| 5 | `CategoriesView`        | Every category button navigated to `'home'` — no filtering at all           | Each category links to `/categories?cat=<name>` and filters      |
| 6 | `Header`                | Desktop nav items had no `onClick` / routing — completely dead              | Proper `<Link>` with active-state highlight                      |
| 7 | `CategoryScroll`        | Active state was local-only; never filtered any products                    | Accepts `active` + `onSelect` props; wired to page state         |
| 8 | `HomeView`              | Spinner with no timeout/error handling if API fails                         | `error` state with retry button; AbortController on unmount      |
| 9 | `ProductDetailView`     | Back button always went to `'home'`, losing navigation history              | Uses `router.back()`                                             |
|10 | `CartView`              | WhatsApp number hardcoded as fake placeholder                               | Read from `NEXT_PUBLIC_WHATSAPP_NUMBER` env variable             |
|11 | `server/models/Product` | `mongoose.model()` without hot-reload guard → crash on `npm run dev`        | `models.Product ?? mongoose.model(...)` guard                    |
|12 | `server/index.ts`       | New DB connection on every serverless invocation                            | Singleton cached connection in `lib/mongodb.ts`                  |
|13 | `ShopContext`           | No `localStorage` persistence — cart/wishlist lost on page refresh          | Hydrated from and synced to `localStorage`                       |

---

## Deployment (Vercel)

```bash
npm i -g vercel
vercel
```

Add `MONGODB_URI` and `NEXT_PUBLIC_WHATSAPP_NUMBER` in the Vercel dashboard under **Project → Settings → Environment Variables**.
