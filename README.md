# Kazi Emon — Digital Marketing & Growth Strategist Portfolio

A modern, high-converting digital marketing portfolio website built for **Kazi Emon**, highlighting expertise in:
- **Platform Optimization**
- **Facebook Ads & Meta Ads**
- **Google Ads & Performance Max**
- **Strategic Planning for Online Businesses**
- **WhatsApp Marketing & Conversational Funnels**
- **Instagram Marketing & Creative Testing**
- **Server-Side Tracking & Meta CAPI**
- **Full-Funnel Digital Marketing**

Live Custom Domain: [kaziemon.online](https://kaziemon.online/)

---

## 🚀 How to Deploy to GitHub Pages (Step-by-Step)

### Step 1: Initialize Git and Push to GitHub

Open a terminal or PowerShell inside `g:\Kazi Emon Website` and run:

```bash
# 1. Initialize git repository
git init

# 2. Stage all files
git add .

# 3. Create initial commit
git commit -m "Initial commit: Kazi Emon Digital Marketing Portfolio"

# 4. Set default branch to main
git branch -M main

# 5. Connect your GitHub repository
git remote add origin https://github.com/kaziaremon/kaziemon-portfolio.git

# 6. Push to GitHub
git push -u origin main
```

---

### Step 2: Configure GitHub Pages in GitHub

1. Go to your repository on GitHub.
2. Click on **Settings** (gear icon) at the top.
3. In the left sidebar, click **Pages** (under the "Code and automation" section).
4. Under **Build and deployment**:
   - **Source**: Select `Deploy from a branch`.
   - **Branch**: Select `main` and folder `/ (root)`.
   - Click **Save**.
5. Under **Custom domain**:
   - Enter: `kaziemon.online`
   - Click **Save**.
   - Note: The repository already includes a `CNAME` file with `kaziemon.online` so GitHub will detect it automatically.
6. Check the box for **Enforce HTTPS** (this may take a few minutes while GitHub provisions the free Let's Encrypt SSL certificate).

---

### Step 3: Configure DNS Records in Your Domain Registrar

Log in to the registrar where you purchased `kaziemon.online` (e.g. Namecheap, Cloudflare, GoDaddy, Hostinger, etc.) and navigate to **DNS Management / Advanced DNS**.

Add the following **4 A Records** for the root domain (`@`):

| Type | Host / Name | Value / Points to | TTL |
|------|-------------|-------------------|-----|
| **A** | `@` | `185.199.108.153` | Automatic or 3600 |
| **A** | `@` | `185.199.109.153` | Automatic or 3600 |
| **A** | `@` | `185.199.110.153` | Automatic or 3600 |
| **A** | `@` | `185.199.111.153` | Automatic or 3600 |

*(Optional, recommended for www subdomain):*
| Type | Host / Name | Value / Points to | TTL |
|------|-------------|-------------------|-----|
| **CNAME** | `www` | `kaziaremon.github.io` | Automatic or 3600 |

> **Note:** DNS propagation typically takes between 10 minutes to 24 hours. Once DNS propagates, GitHub Pages will automatically activate HTTPS.

---

## 📁 Project Structure

```
g:\Kazi Emon Website\
├── CNAME                    # Domain configuration for GitHub Pages (kaziemon.online)
├── .gitignore               # Ignored local files
├── index.html               # Main semantic, SEO-optimized portfolio landing page
├── css/
│   └── style.css            # Dark luxe theme, CSS variables, glassmorphism, responsive styles
├── js/
│   └── main.js              # Interactive ROAS calculator, scroll counters, FAQ accordion, WhatsApp link
├── images/
│   ├── profile.jpg          # Kazi Emon profile portrait
│   ├── favicon.svg          # Favicon
│   └── og-image.jpg         # Open Graph preview card
├── robots.txt               # Search engine crawler instructions
├── sitemap.xml              # XML Sitemap for search indexing
└── README.md                # Deployment and setup documentation
```

---

## 🛠️ Features Included

1. **Interactive ROAS & Ad Spend Growth Calculator**: Prospective clients can slide their monthly budget and choose their ROAS tier to preview projected returns.
2. **Hero Metrics with Animated Counters**: Live counts for ad spend managed, ROAS, campaigns scaled, and retention rate.
3. **8 Core Service Pillars**: Dedicated cards detailing Meta Ads, Google Ads, Platform Optimization, WhatsApp Funnels, Strategic Planning, and Server-Side CAPI.
4. **The 4-Step Growth Blueprint**: Visual progression outlining how Kazi audits, designs, tests, and scales accounts.
5. **Real-World Case Studies**: Quantitative before/after KPIs (ROAS, revenue growth, cost reduction).
6. **Social Proof & Client Testimonials**: Verified founder reviews.
7. **Interactive FAQ Accordion**: Answers key client objections regarding budget, timelines, and tracking.
8. **Direct WhatsApp & Consultation Form**: One-click connect via WhatsApp and email.
