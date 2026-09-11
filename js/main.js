/**
 * KAZI EMON — PORTFOLIO JAVASCRIPT
 * Features: Interactive ROAS Calculator, Scroll Observers, FAQ Accordion, WhatsApp Form Handler
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCounters();
  initRoasCalculator();
  initFaqAccordion();
  initContactForm();
  initBackToTop();
  initSmoothScrollSpy();
});

/* ==========================================================================
   1. NAVBAR SCROLL & MOBILE DRAWER
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('mobile-open');
      toggleBtn.setAttribute('aria-expanded', isOpen);
      toggleBtn.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close when clicking nav link
    navLinks.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('mobile-open');
        if (toggleBtn) {
          toggleBtn.setAttribute('aria-expanded', false);
          toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
        }
      });
    });
  }
}

/* ==========================================================================
   2. ANIMATED NUMBER COUNTERS
   ========================================================================== */
function initCounters() {
  const counterElements = document.querySelectorAll('.counter-val');
  if (!counterElements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateValue(entry.target);
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => observer.observe(el));

  function animateValue(obj) {
    const target = parseFloat(obj.getAttribute('data-target'));
    const isDecimal = obj.getAttribute('data-decimal') === 'true';
    const duration = 1800;
    const startTimestamp = performance.now();

    const step = (now) => {
      const elapsed = now - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = isDecimal 
        ? (ease * target).toFixed(1)
        : Math.floor(ease * target);

      obj.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        obj.textContent = isDecimal ? target.toFixed(1) : target;
      }
    };
    requestAnimationFrame(step);
  }
}

/* ==========================================================================
   3. INTERACTIVE ROI / ROAS CALCULATOR
   ========================================================================== */
function initRoasCalculator() {
  const spendSlider = document.getElementById('adSpendSlider');
  const spendDisplay = document.getElementById('adSpendDisplay');
  const roasPills = document.querySelectorAll('.tier-pill');
  const revDisplay = document.getElementById('projectedRev');
  const profitDisplay = document.getElementById('projectedProfit');
  const roasMultDisplay = document.getElementById('currentRoasMult');
  const ctaBtn = document.getElementById('calcCtaBtn');

  if (!spendSlider) return;

  let currentMultiplier = 4.2;

  function updateCalculator() {
    const spend = parseInt(spendSlider.value, 10);
    const revenue = Math.round(spend * currentMultiplier);
    const netProfit = Math.round(revenue - spend);

    // Format displays
    spendDisplay.textContent = '$' + spend.toLocaleString();
    revDisplay.textContent = '$' + revenue.toLocaleString();
    profitDisplay.textContent = '$' + netProfit.toLocaleString();
    if (roasMultDisplay) roasMultDisplay.textContent = currentMultiplier.toFixed(1) + 'x';

    // Update CTA link / form prefill hook
    if (ctaBtn) {
      ctaBtn.setAttribute('data-spend', spend);
      ctaBtn.setAttribute('data-roas', currentMultiplier);
    }
  }

  spendSlider.addEventListener('input', updateCalculator);

  roasPills.forEach(pill => {
    pill.addEventListener('click', () => {
      roasPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentMultiplier = parseFloat(pill.getAttribute('data-roas'));
      updateCalculator();
    });
  });

  if (ctaBtn) {
    ctaBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const spend = spendSlider.value;
      const contactSection = document.getElementById('contact');
      const budgetSelect = document.getElementById('formBudget');
      const messageField = document.getElementById('formMessage');

      if (budgetSelect) {
        // Pre-select budget tier
        if (spend <= 2000) budgetSelect.value = 'under-2k';
        else if (spend <= 5000) budgetSelect.value = '2k-5k';
        else if (spend <= 15000) budgetSelect.value = '5k-15k';
        else budgetSelect.value = '15k-plus';
      }

      if (messageField && !messageField.value) {
        messageField.value = `Hi Kazi, I simulated a monthly ad budget of $${parseInt(spend).toLocaleString()} with an estimated ${currentMultiplier}x ROAS on your website calculator. I want to build a strategy to scale my business.`;
      }

      if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Initial run
  updateCalculator();
}

/* ==========================================================================
   4. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all others
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
        const otherAnswer = otherItem.querySelector('.faq-answer');
        if (otherAnswer) otherAnswer.style.maxHeight = null;
      });

      if (!isActive) {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   5. CONTACT FORM & WHATSAPP ACTION
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('auditForm');
  const statusMsg = document.getElementById('formStatus');
  const directWaBtn = document.getElementById('directWaBtn');

  // Direct WhatsApp click action
  const myWhatsAppNumber = '8801878051280'; // Bangladesh code placeholder or Kazi Emon WhatsApp

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('formName').value.trim();
      const email = document.getElementById('formEmail').value.trim();
      const service = document.getElementById('formService').value;
      const budget = document.getElementById('formBudget').value;
      const message = document.getElementById('formMessage').value.trim();

      if (!name || !email) {
        alert('Please fill in your name and email address.');
        return;
      }

      // Format WhatsApp message text
      const waText = encodeURIComponent(
        `Hello Kazi Emon,\n\nI visited your portfolio (kaziemon.online) and would like to request a growth audit.\n\n*Name:* ${name}\n*Email:* ${email}\n*Target Service:* ${service}\n*Monthly Budget:* ${budget}\n*Details:* ${message || 'Looking forward to discussing our campaign strategy.'}`
      );

      const waUrl = `https://wa.me/8801878051280?text=${waText}`;

      // Show confirmation
      if (statusMsg) {
        statusMsg.classList.add('success');
        statusMsg.innerHTML = `✓ Thank you <strong>${name}</strong>! Redirecting you directly to Kazi Emon on WhatsApp for instant response...`;
      }

      setTimeout(() => {
        window.open(waUrl, '_blank');
      }, 900);
    });
  }
}

/* ==========================================================================
   6. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const topBtn = document.getElementById('backToTop');
  if (!topBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      topBtn.classList.add('visible');
    } else {
      topBtn.classList.remove('visible');
    }
  });

  topBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ==========================================================================
   7. SMOOTH SCROLL & ACTIVE LINK SPY
   ========================================================================== */
function initSmoothScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.scrollY + 200;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });
}
