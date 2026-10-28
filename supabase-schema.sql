-- ========================================================
-- AAHAR HOME FOODS — SUPABASE DATABASE SCHEMA
-- Execute this script in your Supabase SQL Editor if you wish
-- to create native PostgreSQL tables alongside storage sync.
-- ========================================================

-- 1. STORE INFO TABLE
CREATE TABLE IF NOT EXISTS public.store_info (
  id TEXT PRIMARY KEY DEFAULT 'main_store',
  name TEXT NOT NULL DEFAULT 'AAHAR HOME FOODS',
  tagline TEXT NOT NULL DEFAULT 'PURE • FRESH • TRADITIONAL',
  address_line1 TEXT NOT NULL DEFAULT 'Road No. 3, Venkataramana Colony Main Road',
  address_line2 TEXT DEFAULT 'Venkataramana Colony',
  landmark TEXT DEFAULT 'Near Teachers Colony & Children''s Park',
  city TEXT NOT NULL DEFAULT 'Kurnool',
  state TEXT NOT NULL DEFAULT 'Andhra Pradesh',
  pincode TEXT NOT NULL DEFAULT '518001',
  country TEXT NOT NULL DEFAULT 'India',
  primary_phone TEXT NOT NULL DEFAULT '+919490123456',
  phone_display TEXT NOT NULL DEFAULT '+91 94901 23456',
  whatsapp_number TEXT NOT NULL DEFAULT '919490123456',
  whatsapp_display TEXT NOT NULL DEFAULT '+91 94901 23456',
  email TEXT DEFAULT 'enquiry@aaharhomefoods.com',
  opening_hours TEXT DEFAULT 'Monday to Sunday: 8:30 AM – 9:30 PM',
  opening_hours_short TEXT DEFAULT 'Mon–Sun: 8:30 AM – 9:30 PM',
  google_maps_link TEXT DEFAULT 'https://maps.google.com/?q=Road+No.+3+Venkataramana+Colony+Main+Road+Kurnool+Andhra+Pradesh+518001',
  google_maps_embed_url TEXT DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3840.485237248102!2d78.03511131484935!3d15.828111289030612!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb5e771c1b2b801%3A0x6b44a30e704a434!2sVenkataramana%20Colony%2C%20Kurnool%2C%20Andhra%20Pradesh%20518001!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin',
  announcement_text TEXT DEFAULT '✨ Fresh batches of Andhra festival sweets & sun-dried Avakaya pickles ready for pickup & Kurnool delivery!',
  is_announcement_active BOOLEAN DEFAULT TRUE,
  fssai_number TEXT DEFAULT 'Registration in progress / Available at store',
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS public.products (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  telugu_name TEXT,
  category TEXT NOT NULL,
  category_label TEXT NOT NULL,
  price NUMERIC NOT NULL,
  unit TEXT NOT NULL DEFAULT '250g',
  package_sizes JSONB DEFAULT '[]'::jsonb,
  description TEXT,
  long_description TEXT,
  image TEXT,
  in_stock BOOLEAN DEFAULT TRUE,
  featured BOOLEAN DEFAULT FALSE,
  badge TEXT,
  ingredients JSONB DEFAULT '[]'::jsonb,
  shelf_life TEXT,
  storage TEXT,
  spice_level TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id TEXT PRIMARY KEY,
  author TEXT NOT NULL,
  locality TEXT DEFAULT 'Kurnool',
  rating INTEGER DEFAULT 5,
  date TEXT,
  comment TEXT NOT NULL,
  source TEXT DEFAULT 'Google Maps',
  verified_customer BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. GALLERY TABLE
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'Store',
  image_url TEXT NOT NULL,
  caption TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. CONTACT ENQUIRIES TABLE
CREATE TABLE IF NOT EXISTS public.enquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  locality TEXT,
  enquiry_type TEXT,
  selected_product TEXT,
  quantity TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE public.store_info ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enquiries ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ ACCESS POLICIES
CREATE POLICY "Public read store_info" ON public.store_info FOR SELECT USING (true);
CREATE POLICY "Public read products" ON public.products FOR SELECT USING (true);
CREATE POLICY "Public read reviews" ON public.reviews FOR SELECT USING (true);
CREATE POLICY "Public read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Public insert enquiries" ON public.enquiries FOR INSERT WITH CHECK (true);

-- FULL ACCESS FOR SERVICE ROLE (SERVER-SIDE API)
CREATE POLICY "Service role full store_info" ON public.store_info FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full products" ON public.products FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full reviews" ON public.reviews FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full gallery" ON public.gallery FOR ALL USING (auth.role() = 'service_role');
CREATE POLICY "Service role full enquiries" ON public.enquiries FOR ALL USING (auth.role() = 'service_role');
