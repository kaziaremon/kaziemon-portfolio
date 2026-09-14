'use strict';

/**
 * Element toggle helper
 */
const elemToggleFunc = function (elem) {
  if (elem) elem.classList.toggle("active");
};

/**
 * Header sticky & go-to-top button
 */
const header = document.querySelector("[data-header]");
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
  if (window.scrollY >= 20) {
    if (header) header.classList.add("active");
    if (goTopBtn) goTopBtn.classList.add("active");
  } else {
    if (header) header.classList.remove("active");
    if (goTopBtn) goTopBtn.classList.remove("active");
  }
});

/**
 * Mobile Navbar toggle
 */
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll(".navbar-link");

if (navToggleBtn && navbar) {
  navToggleBtn.addEventListener("click", function () {
    elemToggleFunc(navToggleBtn);
    elemToggleFunc(navbar);
    elemToggleFunc(document.body);
  });

  navbarLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navToggleBtn.classList.remove("active");
      navbar.classList.remove("active");
      document.body.classList.remove("active");
    });
  });
}

/**
 * Skills vs Tools Toggle
 */
const toggleBtnBox = document.querySelector("[data-toggle-box]");
const toggleBtns = document.querySelectorAll("[data-toggle-btn]");
const skillsBox = document.querySelector("[data-skills-box]");

if (toggleBtnBox && toggleBtns.length && skillsBox) {
  for (let i = 0; i < toggleBtns.length; i++) {
    toggleBtns[i].addEventListener("click", function () {
      if (this.classList.contains("active")) return;
      elemToggleFunc(toggleBtnBox);
      toggleBtns.forEach((btn) => btn.classList.toggle("active"));
      elemToggleFunc(skillsBox);
    });
  }
}

/**
 * Dark & Light theme toggle
 */
const themeToggleBtn = document.querySelector("[data-theme-btn]");

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    elemToggleFunc(themeToggleBtn);

    if (themeToggleBtn.classList.contains("active")) {
      document.body.classList.remove("dark_theme");
      document.body.classList.add("light_theme");
      localStorage.setItem("theme", "light_theme");
    } else {
      document.body.classList.add("dark_theme");
      document.body.classList.remove("light_theme");
      localStorage.setItem("theme", "dark_theme");
    }
  });

  // Check saved theme from localStorage
  if (localStorage.getItem("theme") === "light_theme") {
    themeToggleBtn.classList.add("active");
    document.body.classList.remove("dark_theme");
    document.body.classList.add("light_theme");
  } else {
    themeToggleBtn.classList.remove("active");
    document.body.classList.remove("light_theme");
    document.body.classList.add("dark_theme");
  }
}

/**
 * FAQ Accordion
 */
function toggleFaq(index) {
  const allFaqs = document.querySelectorAll(".faq-card");
  const targetFaq = document.getElementById(`faq-${index}`);

  if (targetFaq) {
    const isCurrentlyActive = targetFaq.classList.contains("active");
    allFaqs.forEach((faq) => faq.classList.remove("active"));
    if (!isCurrentlyActive) {
      targetFaq.classList.add("active");
    }
  }
}
window.toggleFaq = toggleFaq;

/**
 * Services Data & Modal Logic
 */
const servicesData = {
  1: {
    num: "01",
    title: "Facebook Marketing and Ads",
    lead: "High-conversion ad campaigns, hyper-targeted audience segmentation, pixel tracking setup, creative testing frameworks, and performance scaling tailored to maximize return on ad spend (ROAS).",
    body: `
      <h4>Execution Methodology</h4>
      <p>We avoid passive 'boost post' spending. Every campaign is engineered upon psychographic buyer persona mapping, custom audience lookalikes, and structured multi-tier retargeting funnels.</p>
      <h4>Core Deliverables</h4>
      <ul>
        <li>Audience psychographic mapping & competitor ad benchmarking</li>
        <li>Multi-angle ad copy variants testing high-intent hooks</li>
        <li>Meta Pixel & Conversion API (CAPI) server-level telemetry integration</li>
        <li>Bid management, automated rules, and daily budget scaling frameworks</li>
      </ul>
      <div class="quote-box">"Strategy must precede media spend, or media spend simply accelerates your losses."</div>
      <p><strong>Commercial Impact:</strong> Protects customer acquisition costs (CAC) while scaling revenue efficiently and sustainably.</p>
    `
  },
  2: {
    num: "02",
    title: "Instagram Marketing and Ads",
    lead: "Visual-first promotional strategies, aesthetic brand storytelling, high-engagement Reels promotion, and targeted demographic targeting designed to turn passive scrollers into loyal customers.",
    body: `
      <h4>Execution Methodology</h4>
      <p>Instagram thrives on aesthetic authority and rapid visual hooks. We construct dynamic Reels, story sequences, and high-conversion carousels that stop the scroll and nurture genuine purchase intent.</p>
      <h4>Core Deliverables</h4>
      <ul>
        <li>High-impact Reels & Story ad creative development</li>
        <li>Shoppable product catalog ad synchronization</li>
        <li>Targeted demographic & interest-based segmentation</li>
        <li>Direct message lead qualification and customer engagement workflows</li>
      </ul>
      <p><strong>Commercial Impact:</strong> Elevates brand prestige while producing qualified direct inquiries from premium buyers.</p>
    `
  },
  3: {
    num: "03",
    title: "Social Media Managing",
    lead: "Consistent brand positioning, strategic content calendar execution, community growth management, and proactive engagement to build a vibrant, authoritative online community around your business.",
    body: `
      <h4>Execution Methodology</h4>
      <p>A chaotic social presence erodes consumer confidence. We manage end-to-end publishing pipelines with cohesive visual themes and proactive audience engagement.</p>
      <h4>Core Deliverables</h4>
      <ul>
        <li>30-day structured editorial content calendar planning</li>
        <li>Tone-of-voice copywriting tailored to your unique market positioning</li>
        <li>Proactive community engagement and comment moderation</li>
        <li>Monthly analytics audit and performance benchmarking</li>
      </ul>
      <p><strong>Commercial Impact:</strong> Transforms casual followers into loyal brand advocates and consistent repeat purchasers.</p>
    `
  },
  4: {
    num: "04",
    title: "Google Ads",
    lead: "Intent-driven Search, Display, and Performance Max campaigns structured meticulously to capture high-intent buyer traffic right at the moment they are searching for your specific products or services.",
    body: `
      <h4>Execution Methodology</h4>
      <p>Unlike social advertising which creates demand, Google Ads captures existing commercial intent. We intercept prospective clients precisely when they are searching for solutions.</p>
      <h4>Core Deliverables</h4>
      <ul>
        <li>High-intent commercial keyword discovery & match-type architecture</li>
        <li>Negative keyword lists to systematically purge wasted spend</li>
        <li>Landing page conversion rate alignment and ad relevance score optimization</li>
        <li>Google Performance Max, Display, and Search campaign orchestration</li>
      </ul>
      <p><strong>Commercial Impact:</strong> Maximizes return on ad spend (ROAS) by eliminating non-converting search queries.</p>
    `
  },
  5: {
    num: "05",
    title: "Canva Poster Design",
    lead: "Professional social media graphics, high-impact promotional posters, ad creatives, and visual assets designed via Canva with immaculate aesthetic standards to capture attention and drive conversions.",
    body: `
      <h4>Execution Methodology</h4>
      <p>Visual design is an active trust-building mechanism. Using Canva, we establish reusable brand kits with strict typography and color palettes that make your promotional posters stand out.</p>
      <h4>Core Deliverables</h4>
      <ul>
        <li>Custom promotional posters and seasonal campaign banners</li>
        <li>High-engagement carousel slide deck templates</li>
        <li>Standardized brand kit (color tokens, font pairings, visual margins)</li>
        <li>Editable asset templates for long-term operational ease</li>
      </ul>
      <p><strong>Commercial Impact:</strong> Instantly commands attention in crowded feeds and builds durable visual authority.</p>
    `
  },
  6: {
    num: "06",
    title: "Strategic Business Planning",
    lead: "Leveraging financial acumen derived from an accounting background to formulate practical business growth frameworks, evaluate cost structures, and align marketing outlays with net profitability goals.",
    body: `
      <h4>Execution Methodology</h4>
      <p>Great marketing requires sound business unit economics. I apply accounting discipline to evaluate customer lifetime value against acquisition costs, protecting profit margins.</p>
      <h4>Core Deliverables</h4>
      <ul>
        <li>Unit economics evaluation (Gross Margins, CAC, LTV, Break-even points)</li>
        <li>Multi-channel marketing budget allocation and capital preservation models</li>
        <li>Customer conversion journey bottleneck identification</li>
        <li>Milestone-based 90-day operational growth roadmap</li>
      </ul>
      <div class="quote-box">"Marketing without financial literacy is merely creative guesswork. Rigorous accounting turns volatile ad spend into predictable commercial profit."</div>
      <p><strong>Commercial Impact:</strong> Protects operational cash flow and ensures marketing expenditure translates directly into bottom-line net profit.</p>
    `
  }
};

/**
 * Projects / Case Studies Data
 */
const projectsData = {
  1: {
    title: "E-Commerce ROAS Scale & Meta CAPI Pipeline",
    category: "Paid Advertising",
    date: "August 2026",
    summary: "Complete full-funnel Meta advertising restructuring for an emerging fashion e-commerce brand.",
    body: `
      <h4>Challenge</h4>
      <p>The client was running scattered boosted posts with high ad fatigue and a deteriorating ROAS below 1.4x, resulting in cash flow strain.</p>
      <h4>Strategic Execution</h4>
      <ul>
        <li>Integrated Meta Conversion API (CAPI) on server-level for 98% event match quality.</li>
        <li>Re-architected campaigns into Top-of-Funnel (educational Reels & lifestyle carousels), Middle-of-Funnel (social proof & founder story), and Bottom-of-Funnel (catalog dynamic retargeting).</li>
        <li>Enforced 48-hour automated kill switches on underperforming creative hooks.</li>
      </ul>
      <h4>Results</h4>
      <div class="quote-box">Scaled ROAS to 4.2x within 60 days while reducing Cost Per Acquisition (CPA) by 38%.</div>
    `
  },
  2: {
    title: "Visual Brand Identity & Canva Poster Campaign",
    category: "Branding & Visuals",
    date: "July 2026",
    summary: "Standardized visual branding, promo graphics, and high-conversion social posters for a premium consumer service.",
    body: `
      <h4>Challenge</h4>
      <p>The business suffered from visual inconsistency: mismatched fonts, contradictory color palettes, and low-contrast promotional assets that eroded consumer trust.</p>
      <h4>Strategic Execution</h4>
      <ul>
        <li>Developed a standardized Canva Brand Kit featuring locked color tokens, hierarchical typography rules, and uniform negative space margins.</li>
        <li>Created 45+ customizable poster templates for seasonal promotions, social carousels, and story sequences.</li>
        <li>Trained internal marketing team on asset deployment guidelines.</li>
      </ul>
      <h4>Results</h4>
      <div class="quote-box">Organic engagement increased by 140% and direct DM inquiries rose by 65% in the first 45 days.</div>
    `
  },
  3: {
    title: "High-Intent Google Search & Lead Acquisition",
    category: "Search Marketing",
    date: "June 2026",
    summary: "Built a precision search marketing funnel capturing high-intent commercial buyers for a B2B service firm.",
    body: `
      <h4>Challenge</h4>
      <p>The firm was bleeding ad budget on broad search queries that attracted students and irrelevant job seekers instead of business buyers.</p>
      <h4>Strategic Execution</h4>
      <ul>
        <li>Constructed exact and phrase-match keyword clusters targeting commercial intent.</li>
        <li>Added a comprehensive 350+ negative keyword list to eliminate non-commercial clicks.</li>
        <li>Streamlined the landing page CTA directly to an instant WhatsApp/Phone appointment scheduler.</li>
      </ul>
      <h4>Results</h4>
      <div class="quote-box">Captured 80+ qualified corporate leads within 90 days with a 52% lower Cost Per Lead.</div>
    `
  },
  4: {
    title: "Social Media Community & Growth Architecture",
    category: "Community Management",
    date: "May 2026",
    summary: "End-to-end editorial calendar execution and proactive audience engagement for a niche retail brand.",
    body: `
      <h4>Challenge</h4>
      <p>Sporadic posting schedules and passive comment sections led to stagnant organic reach and zero community loyalty.</p>
      <h4>Strategic Execution</h4>
      <ul>
        <li>Designed a 30-day recurring content matrix balancing education, product highlights, and user interaction hooks.</li>
        <li>Implemented rapid response comment moderation protocols (under 15-minute response window).</li>
        <li>Integrated user-generated content (UGC) shoutouts and customer story spotlights.</li>
      </ul>
      <h4>Results</h4>
      <div class="quote-box">Follower growth surged 310% organically with consistent repeat purchase rates from community members.</div>
    `
  },
  5: {
    title: "Unit Economics Audit & Profit-First Marketing Roadmap",
    category: "Strategic Planning",
    date: "April 2026",
    summary: "Applied accounting discipline to evaluate CAC vs LTV, gross margins, and working capital constraints.",
    body: `
      <h4>Challenge</h4>
      <p>The client was celebrating top-line sales growth but losing money every month due to uncalculated packaging, courier returns, and gateway fees.</p>
      <h4>Strategic Execution</h4>
      <ul>
        <li>Calculated true contribution margin and Break-Even ROAS (BE-ROAS) per product line.</li>
        <li>Restructured promotional bundles to increase Average Order Value (AOV) by 42%.</li>
        <li>Synchronized advertising cash outlays with receivable cycles to prevent operational cash crunch.</li>
      </ul>
      <h4>Results</h4>
      <div class="quote-box">Turned an operational monthly deficit into a 22% net profit margin within 90 days.</div>
    `
  },
  6: {
    title: "Local Business Omnichannel Promotional Engine",
    category: "Performance Marketing",
    date: "March 2026",
    summary: "Combined hyper-local Meta ad radius targeting with Google Business optimization for a retail flagship store.",
    body: `
      <h4>Challenge</h4>
      <p>High local foot traffic competition and minimal digital discovery for a newly opened brick-and-mortar showroom.</p>
      <h4>Strategic Execution</h4>
      <ul>
        <li>Deployed 5km radius-targeted Facebook & Instagram video ads featuring store walkthroughs and limited-time vouchers.</li>
        <li>Optimized Google Business profile for local search queries and review acquisition.</li>
        <li>Enabled direct WhatsApp click-to-chat button for quick reservation inquiries.</li>
      </ul>
      <h4>Results</h4>
      <div class="quote-box">Drove over 1,200 store visits and generated 350+ direct WhatsApp inquiries in the launch quarter.</div>
    `
  }
};

/**
 * Articles Data
 */
const articlesData = {
  1: {
    title: "Why Most Facebook Ad Budgets Fail (And How Strategy Fixes It)",
    category: "Paid Advertising",
    readTime: "6 min read",
    body: `
      <p>Every month, ambitious business owners launch Facebook and Meta advertising campaigns with high expectations, only to watch their promotional spend evaporate with negligible commercial return. When campaigns underperform, the immediate reaction is almost always to blame external factors: <em>"The algorithm changed,"</em> <em>"Facebook is too saturated,"</em> or <em>"Ad costs are too high."</em></p>
      <p>In over two years of managing paid campaigns and delivering dozens of client projects, I have found that ad campaigns rarely fail at the level of the ad platform itself. They fail because businesses treat advertising as a transactional slot machine rather than a structured communication system.</p>
      <div class="quote-box">"An advertising campaign cannot fix an ambiguous value proposition. Strategy must precede media spend, or media spend simply accelerates your losses."</div>
      <h4>The Three Structural Flaws That Drain Ad Budgets</h4>
      <h4>1. The "Sell on First Sight" Fallacy</h4>
      <p>Cold audiences scrolling through their social feeds are not actively looking to purchase your product. Demanding an immediate high-ticket purchase from someone who learned of your existence four seconds ago produces astronomical acquisition costs. High-performing strategies deploy top-of-funnel angles that educate, agitate latent problems, or demonstrate irresistible utility before asking for the sale.</p>
      <h4>2. Creative Stagnation and Single-Angle Dependence</h4>
      <p>Many brands design a single graphic, write one paragraph of copy, and expect it to sustain an entire campaign. Different segments of your target market purchase for distinct psychological reasons: some prioritize price efficiency, others seek prestige, and others demand risk elimination. A robust strategy tests multiple creative hooks.</p>
      <h4>3. The Broken Bridge Between Ad and Landing Destination</h4>
      <p>If your ad promotes a specific benefit but clicking the ad drops the user onto a generic cluttered homepage, prospective customers experience instant cognitive friction. They bounce within three seconds, and your ad spend is lost.</p>
      <h4>The Strategic Remedy: A 4-Step Stabilization Blueprint</h4>
      <ul>
        <li><strong>Conduct Psychographic Research:</strong> Map the exact language, pain points, and objections of your customers.</li>
        <li><strong>Engineer Irresistible Offers:</strong> Package your core product with transparent risk reversals that make saying "no" feel irrational.</li>
        <li><strong>Implement Full-Funnel Sequencing:</strong> Distribute cold awareness content, warm consideration assets, and high-urgency retargeting in balanced proportion.</li>
        <li><strong>Establish Strict Kill-Switches:</strong> Monitor early engagement indicators within 48 to 72 hours, terminating underperforming variants before they drain capital.</li>
      </ul>
      <p>When you replace emotional guesswork with disciplined marketing strategy, Facebook transforms into a reliable, scalable client acquisition engine.</p>
    `
  },
  2: {
    title: "The Power of Visual Consistency in Social Media Branding",
    category: "Visual Branding & Design",
    readTime: "5 min read",
    body: `
      <p>Humans process visual information 60,000 times faster than text. As users glide through social media feeds, your brand has less than a fraction of a second to communicate identity, competence, and reliability. Yet, countless businesses publish a chaotic rainbow of mismatched fonts, contradictory color palettes, and disjointed templates.</p>
      <h4>The Silent Erosion of Brand Authority</h4>
      <p>Every time your channels display inconsistent typography or low-contrast imagery, a subtle message is transmitted: <em>This business lacks attention to detail.</em> In modern commerce, visual professionalism is directly equated with operational credibility.</p>
      <div class="quote-box">"Visual consistency is not merely about aesthetic beauty; it is an active trust-building mechanism. Familiarity breeds confidence, and confidence drives transactions."</div>
      <h4>Why Professional Design Does Not Require Costly Complexity</h4>
      <p>A widespread misconception is that achieving world-class visual consistency requires enterprise design software or bloated agency retainers. Platforms like Canva—when paired with disciplined visual hierarchy and typography principles—are more than sufficient to produce breathtaking, conversion-focused brand assets.</p>
      <h4>Core Pillars of Visual Cohesion</h4>
      <ul>
        <li><strong>Strict Color Discipline:</strong> Select a maximum of three core colors: dominant background, strong text tone, and a primary accent reserved for CTAs.</li>
        <li><strong>Hierarchical Typography Rules:</strong> Limit your brand to two primary typefaces: one distinctive heading font and one legible sans-serif for body copy.</li>
        <li><strong>Intentional White Space:</strong> Avoid visual overcrowding. Clear negative space directs eye focus immediately to your primary hook and call to action.</li>
      </ul>
      <p>When your social channels project steady, deliberate visual harmony day after day, prospective clients take your business seriously and engage with genuine confidence.</p>
    `
  },
  3: {
    title: "How an Accounting Mindset Can Transform Your Business Marketing Strategy",
    category: "Strategic Growth & Finance",
    readTime: "7 min read",
    body: `
      <p>In the traditional corporate world, the marketing department and the accounting department often operate as historical adversaries. Marketers view accountants as rigid gatekeepers obsessed with cutting budgets; accountants view marketers as loose creatives who spend capital on nebulous "impressions" without showing concrete returns.</p>
      <h4>Bridging the Gap: The Numbers-Driven Marketer</h4>
      <p>As someone pursuing academic training in Accounting while actively managing digital growth campaigns in Bangladesh, I realized this divide is fundamentally flawed. When you marry creative marketing execution with strict accounting discipline, marketing becomes an engineered capital allocation machine.</p>
      <div class="quote-box">"You cannot deposit clicks, likes, or ROAS multiples into a bank account. A successful business scales on contribution margin and healthy cash flow."</div>
      <h4>Key Accounting Frameworks That Revolutionize Marketing</h4>
      <ul>
        <li><strong>Distinguishing Platform ROAS from Contribution Margin:</strong> An ad dashboard may show 4x ROAS, but if product COGS, packaging, shipping, and payment gateway fees consume 85% of revenue, you are bleeding cash. Calculate Break-Even ROAS before deploying a single dollar.</li>
        <li><strong>Unit Economics and Customer Acquisition Ceilings:</strong> Knowing customer Lifetime Value (LTV) dictates the maximum permissible Customer Acquisition Cost (CAC) your business can tolerate without panic.</li>
        <li><strong>Cash Conversion Cycle (CCC) Awareness:</strong> Timing advertising cash outflows with actual customer payment receipts protects against fatal operational cash crunches.</li>
      </ul>
      <p>When your digital marketer speaks fluent accounting, every campaign is built for durability, profitability, and genuine enterprise scale.</p>
    `
  }
};

/**
 * Universal Modal Controller
 */
const modalOverlay = document.getElementById("universalModal");
const modalTitle = document.getElementById("modalTitle");
const modalSubtitle = document.getElementById("modalSubtitle");
const modalContentArea = document.getElementById("modalContentArea");
const modalActionBtn = document.getElementById("modalActionBtn");

function openModal(title, subtitle, contentHtml, actionLink = "https://wa.me/8801560066374", actionText = "Chat on WhatsApp") {
  if (!modalOverlay) return;
  if (modalTitle) modalTitle.textContent = title;
  if (modalSubtitle) modalSubtitle.textContent = subtitle;
  if (modalContentArea) modalContentArea.innerHTML = contentHtml;
  if (modalActionBtn) {
    modalActionBtn.href = actionLink;
    modalActionBtn.textContent = actionText;
  }
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
}
window.closeModal = closeModal;

// Modal triggers
window.openServiceModal = function (id) {
  const data = servicesData[id];
  if (!data) return;
  openModal(data.title, `SERVICE ${data.num}`, `<p class="lead" style="font-style:italic; font-size:1.05rem; margin-bottom:16px;">${data.lead}</p>${data.body}`, "https://wa.me/8801560066374", "Inquire About This Service");
};

window.openProjectModal = function (id) {
  const data = projectsData[id];
  if (!data) return;
  openModal(data.title, `${data.category} • ${data.date}`, `<p class="lead" style="font-style:italic; font-size:1.05rem; margin-bottom:16px;">${data.summary}</p>${data.body}`, "https://wa.me/8801560066374", "Discuss Similar Project");
};

window.openArticleModal = function (id) {
  const data = articlesData[id];
  if (!data) return;
  openModal(data.title, `${data.category} • ${data.readTime}`, data.body, "https://wa.me/8801560066374", "Discuss Insights with Kazi");
};

// Close modal on escape key or backdrop click
window.addEventListener("keydown", function (e) {
  if (e.key === "Escape") closeModal();
});

if (modalOverlay) {
  modalOverlay.addEventListener("click", function (e) {
    if (e.target === modalOverlay) closeModal();
  });
}

/**
 * Contact Form Handler
 */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = document.getElementById("name")?.value || "";
    const email = document.getElementById("email")?.value || "";
    const phone = document.getElementById("phone")?.value || "";
    const message = document.getElementById("message")?.value || "";

    const whatsappMessage = encodeURIComponent(
      `Hello Kazi Emon,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage: ${message}`
    );

    const confirmation = confirm("Thank you! Would you like to send this message directly via WhatsApp for the fastest response?");
    if (confirmation) {
      window.open(`https://wa.me/8801560066374?text=${whatsappMessage}`, "_blank");
    } else {
      window.location.href = `mailto:info@kaziemon.online?subject=Portfolio Inquiry from ${encodeURIComponent(name)}&body=${encodeURIComponent(`Phone: ${phone}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    }
    contactForm.reset();
  });
}
