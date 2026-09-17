# SEO Pulse Pro v2.0 - Advanced Website SEO & Technical Suite

**SEO Pulse Pro** is an ultra-advanced, real-time website SEO audit, Core Web Vitals, and technical intelligence suite built with **React 19**, **Vite**, **Express**, **Cheerio**, and **Tailwind CSS**.

---

## 🚀 Key Features

1. **📄 On-Page SEO Audit & Image Alt Inspector**:
   - Scrapes title tags, meta descriptions, canonical URLs, and `robots` directives.
   - Detects all missing `alt` attributes across scanned images with live preview & image URL links.
   - Audits HTML `<h1>` - `<h6>` heading hierarchy.

2. **🛡️ Technical & Security Headers Audit**:
   - Tests SSL HTTPS security status.
   - Probes `/robots.txt` and `/sitemap.xml` automatically.
   - Checks 6 modern HTTP Security Headers (`HSTS`, `X-Content-Type-Options`, `X-Frame-Options`, `CSP`, `Referrer-Policy`, `X-XSS-Protection`).
   - Detects and parses Schema.org JSON-LD microdata.

3. **⚡ Core Web Vitals & PageSpeed Performance**:
   - Estimates TTFB (Server Response Time), LCP, CLS, and FID/INP.
   - Asset weight analysis (Page HTML size, external JS files, external CSS files).
   - Modern image format audit (WebP/AVIF vs legacy JPG/PNG).

4. **📱 SERP & Social Sharing Card Simulator**:
   - Live Google SERP snippet simulator (Desktop & Mobile view switcher).
   - Facebook & LinkedIn OpenGraph card simulator.
   - Twitter / X summary large image card simulator.
   - Real-time title & description editor with character counters.

5. **🔑 Keywords, Density & Readability**:
   - Top 1-word keywords and 2-word key phrases (Bi-Grams) frequency chart & tables.
   - Flesch-Kincaid Readability Ease score & text-to-code ratio.

6. **⚖️ Competitor Side-by-Side Comparison**:
   - Compare two website URLs side-by-side on overall score, load time, word count, missing alt tags, and security features.

7. **✨ AI Meta Rewriter & Schema Generator**:
   - Rule-based AI generator for high-CTR title & meta description rewrites.
   - Interactive Schema.org JSON-LD builder for Organization, LocalBusiness, Article, Product, and FAQ.

8. **📊 Report Exporters**:
   - Export professional PDF audit report.
   - Export raw issue data into CSV format (`.csv`).

---

## 🛠️ Local Installation & Running Guide (কিভাবে লোকাল মেশিনে রান করবেন)

### Step-by-Step Instructions:

1. **Open Terminal / Command Prompt**:
   ```bash
   cd "d:\MY Project\SEO Tools"
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Local Development Server**:
   ```bash
   npm run dev
   ```

4. **Open in Web Browser**: `http://localhost:3000` (or `http://localhost:5173`)

---

## 🌐 Deploying to Vercel via GitHub (কিভাবে লাইভ পাবলিশ করবেন)

এই প্রজেক্টটিতে ইতিমধ্যেই **Vercel Serverless Function (`api/index.js`)** এবং **`vercel.json`** ফ্রি লাইভ পাবলিশিং এর জন্য তৈরি করে দেওয়া হয়েছে।

### Step 1: GitHub এ প্রজেক্ট আপলোড করুন
১. আপনার [GitHub.com](https://github.com) এ লগইন করে একটি **New Repository** তৈরি করুন (যেমন: `seo-pulse-pro`)।
২. আপনার পিসির টার্মিনালে নিচের কমান্ডগুলো দিয়ে গিটহাবে পুশ করুন:
   ```bash
   git init
   git add .
   git commit -m "Deploy SEO Pulse Pro v2"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/seo-pulse-pro.git
   git push -u origin main
   ```

### Step 2: Vercel এ ফ্রীতে ড্যাপ্লয় করুন
১. [vercel.com](https://vercel.com) এ আপনার **GitHub account** দিয়ে সাইন-ইন করুন।
2. **"Add New"** ➔ **"Project"** বাটনে ক্লিক করুন।
৩. GitHub এর থেকে আপনার `seo-pulse-pro` রিপোজিটরিটি সিলেক্ট করে **"Import"** এ ক্লিক করুন।
৪. **Framework Preset**: `Vite` (স্বয়ংক্রিয়ভাবে সিলেক্ট থাকবে)।
৫. **"Deploy"** বাটনে ক্লিক করুন!

🎉 **কয়েক সেকেন্ডের মধ্যে Vercel আপনাকে একটি ফ্রি লাইভ ডোমেইন URL দিয়ে দিবে (যেমন: `https://seo-pulse-pro.vercel.app`)!**
