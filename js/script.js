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
      navbarLinks.forEach((l) => l.classList.remove("active"));
      this.classList.add("active");
    });
  });
}

/**
 * ScrollSpy: Highlight active navbar item with frosted-glass pill as user scrolls
 */
const scrollNavSections = document.querySelectorAll(
  "section#home, section#about, section#blueprint, section#skills, section#services, section#contact"
);
function updateActiveNavLinkOnScroll() {
  const scrollPos = window.scrollY + 200;
  scrollNavSections.forEach((section) => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute("id");

    if (scrollPos >= top && scrollPos < top + height) {
      navbarLinks.forEach((link) => {
        link.classList.remove("active");
        const href = link.getAttribute("href");
        if (href === `#${id}` || (id === "home" && href === "#top")) {
          link.classList.add("active");
        }
      });
    }
  });
}
window.addEventListener("scroll", updateActiveNavLinkOnScroll);
window.addEventListener("load", updateActiveNavLinkOnScroll);

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
        contactForm.appendChild(statusMsg);
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
    const phoneRegex = /^\+(?:[0-9] ?){6,14}[0-9]$/;
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
      avatar_url: "https://kaziemon.online/images/profile.jpg",
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




