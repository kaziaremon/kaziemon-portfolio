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
  openModal(
    data.title, 
    `SERVICE ${data.num}`, 
    `<p class="lead" style="font-style:italic; font-size:1.05rem; margin-bottom:16px; color:var(--royal-purple);">${data.lead}</p>${data.body}`, 
    "https://wa.me/8801560066374", 
    "Inquire About This Service"
  );
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
