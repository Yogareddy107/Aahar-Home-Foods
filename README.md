# AAHAR HOME FOODS (Kurnool, Andhra Pradesh)

> **PURE • FRESH • TRADITIONAL**  
> Authentic Andhra Pickles, Pure Ghee Sweets, Traditional Snacks & Stone-Ground Podis.  
> Road No. 3, Venkataramana Colony Main Road, Kurnool – 518001, Andhra Pradesh, India.  
> Digital Architecture & Experience crafted by [Intrasphere Labs](https://intraspherelabs.vercel.app/).

---

## 🌾 Features & Architecture

- **Next.js 16 & React 19**: Blazing fast Static Site Generation (SSG) with Partial Prerendering.
- **Supabase Cloud Backend**: Real-time cloud synchronization for product inventory, pricing, contact numbers, and gallery.
- **Supabase Storage**: Automated media uploads (`aahar-media` bucket) for store photography and product cards.
- **Zero LocalStorage Dependency**: Robust multi-device synchronization across mobile, tablet, and desktop viewports.
- **Local SEO & Schema Markup**:
  - `LocalBusiness` / `FoodEstablishment` / `GroceryStore` structured data for Kurnool search queries.
  - `Product` JSON-LD schema across 20 individual product detail pages.
  - `FAQPage` schema on contact and directions routes.
  - XML Sitemap (`/sitemap.xml`) and Robots (`/robots.txt`).
- **High-Conversion Customer Experience**:
  - 1-click WhatsApp order generation with product name, weight, and price pre-filled.
  - Click-to-call store owner integration (`tel:9010373898`).
  - Step-by-step landmark directions from Kurnool Railway Station, Raj Vihar, Collectorate, and Teachers Colony.
- **Owner Admin Console**: Discreet owner access with security PIN authentication to edit prices, stock availability, and store hours.

---

## 🛠️ Tech Stack

- **Framework**: [Next.js 16 (Turbopack)](https://nextjs.org)
- **Library**: [React 19](https://react.dev)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Icons**: [Lucide React](https://lucide.dev)
- **Cloud Backend**: [Supabase](https://supabase.com) (PostgreSQL Database & Cloud Storage)
- **Typography**: Playfair Display (Serif) & Inter (Sans)

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/Yogareddy107/Aahar-Home-Foods.git
cd Aahar-Home-Foods
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Fill in your Supabase project credentials in `.env.local`:
```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Build for Production
```bash
npm run build
npm start
```

---

## 📜 Database Setup
Execute the SQL commands in [`supabase-schema.sql`](./supabase-schema.sql) in your Supabase SQL Editor to initialize the required tables and security policies.

---

## 🤝 Attribution
Web Architecture & Local SEO crafted by **[Intrasphere Labs](https://intraspherelabs.vercel.app/)**.
