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
}, { passive: true });

/**
 * Mobile Navbar toggle
 */
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");
const navbar = document.querySelector("[data-navbar]");
const navbarLinks = document.querySelectorAll(".navbar-link");

if (navToggleBtn && navbar) {
  navToggleBtn.addEventListener("click", function () {
    const isActive = navToggleBtn.classList.toggle("active");
    navbar.classList.toggle("active", isActive);
    if (header) header.classList.toggle("nav-open", isActive);
    document.body.classList.toggle("active", isActive);
    navToggleBtn.setAttribute("aria-expanded", isActive ? "true" : "false");
  });

  navbarLinks.forEach((link) => {
    link.addEventListener("click", function () {
      navToggleBtn.classList.remove("active");
      navbar.classList.remove("active");
      if (header) header.classList.remove("nav-open");
      document.body.classList.remove("active");
      navToggleBtn.setAttribute("aria-expanded", "false");
      navbarLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

/**
 * ScrollSpy: Highlight active navbar item with frosted-glass pill as user scrolls
 */
const scrollNavSections = document.querySelectorAll(
  "section#home, section#about, section#blueprint, section#skills, section#services, section#faq, section#contact"
);

function setActiveNav(targetHref) {
  navbarLinks.forEach((link) => {
    const href = link.getAttribute("href");
    if (href === targetHref || (targetHref === "#home" && href === "#top")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}

function updateActiveNavLinkOnScroll() {
  const sections = Array.from(scrollNavSections);
  const scrollPosition = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // If scrolled to absolute bottom of page, highlight contact
  const isAtBottom = windowHeight + scrollPosition >= documentHeight - 40;
  if (isAtBottom) {
    setActiveNav("#contact");
    return;
  }

  // Calculate based on getBoundingClientRect (triggers when top enters upper 38% of viewport)
  let currentActiveId = null;
  const triggerPoint = Math.max(160, windowHeight * 0.38);

  for (let i = sections.length - 1; i >= 0; i--) {
    const section = sections[i];
    const rect = section.getBoundingClientRect();
    if (rect.top <= triggerPoint) {
      currentActiveId = section.getAttribute("id");
      break;
    }
  }

  if (currentActiveId) {
    setActiveNav(`#${currentActiveId}`);
  } else if (scrollPosition < 100) {
    setActiveNav("#home");
  }
}

window.addEventListener("scroll", updateActiveNavLinkOnScroll, { passive: true });
window.addEventListener("resize", updateActiveNavLinkOnScroll, { passive: true });
window.addEventListener("load", updateActiveNavLinkOnScroll);
document.addEventListener("DOMContentLoaded", updateActiveNavLinkOnScroll);

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

function setTheme(isLight, save = true) {
  if (isLight) {
    document.body.classList.remove("dark_theme", "dark-mode");
    document.body.classList.add("light_theme", "light-mode");
    if (themeToggleBtn) themeToggleBtn.classList.add("active");
    if (save) localStorage.setItem("theme", "light-mode");
  } else {
    document.body.classList.remove("light_theme", "light-mode");
    document.body.classList.add("dark_theme", "dark-mode");
    if (themeToggleBtn) themeToggleBtn.classList.remove("active");
    if (save) localStorage.setItem("theme", "dark-mode");
  }
}

if (themeToggleBtn) {
  themeToggleBtn.addEventListener("click", function () {
    const isCurrentlyLight = document.body.classList.contains("light-mode") || 
                             document.body.classList.contains("light_theme") || 
                             themeToggleBtn.classList.contains("active");
    setTheme(!isCurrentlyLight, true);
  });

  // Check saved theme from localStorage
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light-mode" || savedTheme === "light_theme" || savedTheme === "light") {
    setTheme(true, false);
  } else if (savedTheme === "dark-mode" || savedTheme === "dark_theme" || savedTheme === "dark") {
    setTheme(false, false);
  } else {
    // Default dark theme
    setTheme(false, false);
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
    allFaqs.forEach((faq) => {
      faq.classList.remove("active");
      const btn = faq.querySelector(".faq-header");
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
    if (!isCurrentlyActive) {
      targetFaq.classList.add("active");
      const targetBtn = targetFaq.querySelector(".faq-header");
      if (targetBtn) targetBtn.setAttribute("aria-expanded", "true");
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

let lastFocusedElement = null;

function openModal(title, subtitle, contentHtml, actionLink = "https://wa.me/8801560066374", actionText = "Chat on WhatsApp") {
  if (!modalOverlay) return;
  lastFocusedElement = document.activeElement;
  if (modalTitle) modalTitle.textContent = title;
  if (modalSubtitle) modalSubtitle.textContent = subtitle;
  if (modalContentArea) modalContentArea.innerHTML = contentHtml;
  if (modalActionBtn) {
    modalActionBtn.href = actionLink;
    modalActionBtn.textContent = actionText;
  }
  modalOverlay.classList.add("active");
  document.body.style.overflow = "hidden";

  const closeBtn = modalOverlay.querySelector(".modal-close-btn");
  if (closeBtn) closeBtn.focus();
}

function closeModal() {
  if (!modalOverlay) return;
  modalOverlay.classList.remove("active");
  document.body.style.overflow = "";
  if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
    lastFocusedElement.focus();
  }
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
 * Contact Form Handler — Direct Discord Webhook Integration with Enhanced Validation
 */
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    let rawPhone = document.getElementById("phone")?.value.trim() || "";
    let phone = rawPhone;

    if (rawPhone) {
      if (rawPhone.startsWith("+")) {
        phone = rawPhone;
      } else {
        let numberPart = rawPhone;
        if (numberPart.startsWith("0")) {
          numberPart = numberPart.substring(1);
        }
        phone = `+880 ${numberPart}`;
      }

      // Clean up redundant leading zero after +880
      if (phone.startsWith("+880")) {
        let numberPart = phone.replace("+880", "").trim();
        if (numberPart.startsWith("0")) {
          numberPart = numberPart.substring(1);
        }
        phone = "+880 " + numberPart;
      }
    }
    const message = document.getElementById("message")?.value.trim() || "";

    const showNotification = (msg, isError = true) => {
      let statusMsg = document.getElementById("formStatusMsg");
      if (!statusMsg) {
        statusMsg = document.createElement("div");
        statusMsg.id = "formStatusMsg";
        statusMsg.setAttribute("role", isError ? "alert" : "status");
        statusMsg.setAttribute("aria-live", "polite");
        contactForm.appendChild(statusMsg);
      } else {
        statusMsg.setAttribute("role", isError ? "alert" : "status");
      }
      statusMsg.className = `form-status-box ${isError ? 'error' : 'success'}`;
      statusMsg.innerHTML = (isError ? '⚠️ ' : '✅ ') + msg;
      statusMsg.style.display = "block";
    };

    // 1. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showNotification("Please provide a valid and complete Email Address (e.g., name@example.com).", true);
      return;
    }

    // 2. Phone / WhatsApp validation
    const phoneRegex = /^\+(?:[0-9][ -]?){6,15}[0-9]$/;
    if (phone && !phoneRegex.test(phone)) {
      showNotification("Please enter a valid phone number with country code (e.g. +880 1700-000000).", true);
      return;
    }

    // 3. Minimum 5 words for message
    const wordCount = message.split(/\s+/).filter(word => word.length > 0).length;
    if (wordCount < 5) {
      showNotification("Your message is too short. Please provide at least 5 words detailing your project or goals.", true);
      return;
    }

    const submitBtn = contactForm.querySelector("button[type='submit']");
    const originalBtnText = submitBtn ? submitBtn.innerHTML : "Send Message";

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending...</span>`;
    }

    // Discord Webhook Endpoint
    const webhookURL = "https://discord.com/api/webhooks/1549570534067540070/_azQZfdCAzJyoT42pKIvsUfk9mtyxYJ-fc5Wx-_3ww-Td-18G0OUEhafQDDs8orkbdYV";

    // ৪. ডিসকর্ড এমবেড পে-লোড
    const discordPayload = {
      username: "Kazi Emon Portfolio Leads",
      avatar_url: "https://kaziemon.online/images/profile.png",
      embeds: [{
        title: "💼 New Portfolio Inquiry Received",
        color: 8355839, // Royal Purple Theme Color
        fields: [
          { name: "👤 Client Name", value: name || "Not provided", inline: false },
          { name: "✉️ Email Address", value: email, inline: false },
          { name: "📞 Phone / WhatsApp", value: phone || "Not provided", inline: false },
          { name: "💬 Message Details", value: message, inline: false }
        ],
        footer: {
          text: "Kazi Emon Portfolio • Secure Contact System"
        },
        timestamp: new Date().toISOString()
      }]
    };

    try {
      const response = await fetch(webhookURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(discordPayload)
      });

      if (response.ok) {
        showNotification("Message sent successfully! Kazi Emon will get back to you shortly.", false);
        contactForm.reset();

        setTimeout(() => {
          const statusMsg = document.getElementById("formStatusMsg");
          if (statusMsg) statusMsg.style.display = "none";
        }, 6000);
      } else {
        throw new Error("Discord webhook responded with status " + response.status);
      }
    } catch (error) {
      console.error("Discord webhook error:", error);
      showNotification("Could not send message. Please reach out directly via <a href='https://wa.me/8801560066374' target='_blank' style='color:#fff; text-decoration:underline;'>WhatsApp</a>.", true);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }
    }
  });
}




