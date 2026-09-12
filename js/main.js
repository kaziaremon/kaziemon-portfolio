/**
 * KAZI EMON — DIGITAL MARKETING & GROWTH STRATEGIST
 * Interactive 3D WebGL Background, 3D Card Tilt, Modal Architecture, and Dynamic Handlers
 */

document.addEventListener('DOMContentLoaded', () => {
  initThreeJsBackground();
  initNavbar();
  initScrollSpy();
  initCounters();
  init3DCardTilt();
  initServiceModals();
  initArticleModals();
  initCaseFilters();
  initFaqAccordion();
  initContactForm();
  initFloatingWa();
  initBackToTop();
});

/* ==========================================================================
   1. INTERACTIVE 3D WEBGL PARTICLE & WAVE EXPERIENCE (Three.js)
   ========================================================================== */
function initThreeJsBackground() {
  const canvas = document.getElementById('webglCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 700;
    camera.position.y = 100;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Create 3D Particle Grid Wave
    const particleCount = 1400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const emeraldColor = new THREE.Color(0x10b981);
    const cyanColor = new THREE.Color(0x06b6d4);
    const violetColor = new THREE.Color(0x8b5cf6);

    const cols = 50;
    const rows = 28;
    const spacingX = 45;
    const spacingZ = 45;

    let index = 0;
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        if (index >= particleCount) break;
        const x = (i - cols / 2) * spacingX;
        const z = (j - rows / 2) * spacingZ;
        const y = 0;

        positions[index * 3] = x;
        positions[index * 3 + 1] = y;
        positions[index * 3 + 2] = z;

        // Gradient color mix
        const mixRatio = (i / cols + j / rows) / 2;
        let pColor;
        if (mixRatio < 0.5) {
          pColor = emeraldColor.clone().lerp(cyanColor, mixRatio * 2);
        } else {
          pColor = cyanColor.clone().lerp(violetColor, (mixRatio - 0.5) * 2);
        }

        colors[index * 3] = pColor.r;
        colors[index * 3 + 1] = pColor.g;
        colors[index * 3 + 2] = pColor.b;

        index++;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.3, 'rgba(16,185,129,0.8)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = gradient;
    pCtx.fillRect(0, 0, 32, 32);

    const pTexture = new THREE.CanvasTexture(pCanvas);

    const material = new THREE.PointsMaterial({
      size: 7,
      map: pTexture,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Mouse Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    const halfWidth = window.innerWidth / 2;
    const halfHeight = window.innerHeight / 2;

    window.addEventListener('mousemove', (e) => {
      targetMouseX = (e.clientX - halfWidth) * 0.4;
      targetMouseY = (e.clientY - halfHeight) * 0.4;
    }, { passive: true });

    // Scroll Integration
    let scrollY = window.scrollY;
    window.addEventListener('scroll', () => {
      scrollY = window.scrollY;
    }, { passive: true });

    // Animation Loop
    let clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      camera.position.x = mouseX * 0.8;
      camera.position.y = 100 - mouseY * 0.5 - scrollY * 0.25;
      camera.lookAt(0, 0, 0);

      // Undulating Wave Formula
      const posArray = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const x = posArray[i * 3];
        const z = posArray[i * 3 + 2];
        posArray[i * 3 + 1] = Math.sin(x * 0.008 + elapsedTime * 1.4) * 35 +
                              Math.cos(z * 0.008 + elapsedTime * 1.2) * 35;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();

    // Window Resize
    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

  } catch (err) {
    console.warn('Three.js initialization skipped:', err);
  }
}

/* ==========================================================================
   2. 3D CARD TILT WITH DYNAMIC SPECULAR HIGHLIGHT
   ========================================================================== */
function init3DCardTilt() {
  // Only apply tilt on non-touch devices
  if (window.matchMedia('(hover: none)').matches) return;

  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Normalization (-1 to 1)
      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      const tiltX = -normY * 6; // Max 6 deg
      const tiltY = normX * 6;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
}

/* ==========================================================================
   3. NAVBAR SCROLL & MOBILE DRAWER
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
  }, { passive: true });

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
        toggleBtn.setAttribute('aria-expanded', false);
        toggleBtn.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }
}

/* ==========================================================================
   4. SCROLLSPY NAVIGATION HIGHLIGHT
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 160;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href === `#${currentId}`) {
          link.classList.add('active');
        }
      });
    }
  }, { passive: true });
}

/* ==========================================================================
   5. ANIMATED NUMBER COUNTERS
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
   6. DEDICATED SERVICES DATA & MODAL VIEW
   ========================================================================== */
const servicesData = {
  'facebook-marketing': {
    title: 'Facebook Marketing and Ads',
    tag: 'Meta Media Buying & Algorithmic Scale',
    icon: 'fab fa-facebook-f',
    overview: 'Facebook remains the most powerful visual demand-generation engine in the world when paired with modern algorithmic campaign structures. We eliminate guessing by engineering systematic creative testing environments, Advantage+ Shopping campaigns, and resilient server-side tracking pipelines that drive consistent purchase volume.',
    pillars: [
      {
        title: 'Algorithmic Media Buying Architecture',
        desc: 'Structuring accounts with broad targeting and Advantage+ Shopping to allow Meta\'s machine learning to seek out the highest-intent buyers at the lowest marginal cost.'
      },
      {
        title: 'Creative Angle & Hook Matrix',
        desc: 'Deploying high-velocity iterations across user-generated content (UGC), problem-solution video hooks, and founder storytelling to beat banner blindness.'
      },
      {
        title: 'Full-Funnel Retargeting & Catalog Feeds',
        desc: 'Customizing dynamic product ads (DPA) and high-intent engagement loops to recapture abandoned visitors and cross-sell high-LTV customers.'
      }
    ],
    deliverables: [
      'Complete historical ad account & pixel tracking audit',
      'Meta Conversions API (CAPI) deduplication & event match quality setup',
      'Continuous weekly creative testing briefs and video hook iterations',
      'Bid cap and cost cap scaling strategies for high-margin stability',
      '24/7 live executive KPI dashboard and weekly strategic summaries'
    ],
    impact: 'Engineered for brands looking to transition from unstable boost tactics to a predictable, algorithmic acquisition machine.'
  },

  'instagram-marketing': {
    title: 'Instagram Marketing and Ads',
    tag: 'Visual Commerce & Social Engagement',
    icon: 'fab fa-instagram',
    overview: 'Instagram is where aesthetic brand positioning meets ruthless direct response. We design end-to-end Instagram ecosystems combining high-retention 9:16 vertical Reels, interactive story conversion loops, and frictionless direct-message (DM) qualification funnels.',
    pillars: [
      {
        title: 'High-Retention Vertical Reel Strategy',
        desc: 'Scripting and pacing short-form video ads tailored for 0-3 second hook velocity, keeping viewer drop-off minimal while delivering compelling value propositions.'
      },
      {
        title: 'Story Conversion Sequences & Link Stickers',
        desc: 'Designing ephemeral, high-urgency story sequences that nurture warm followers and guide them smoothly toward limited-time product launches.'
      },
      {
        title: 'Conversational DM Automation Funnels',
        desc: 'Connecting keyword triggers on comments and stories directly into automated, human-like DM qualification paths that convert interest into orders.'
      }
    ],
    deliverables: [
      'Creative direction & scripting for vertical Reel video campaigns',
      'Interactive Instagram Story ad funnels with clear conversion pathways',
      'Integration of automated conversational DM response flows',
      'Bio, profile highlights, and Instagram Shop catalog alignment',
      'Audience demographic and engagement cohort analytics'
    ],
    impact: 'Transforms passive feed scrolling into active brand advocates and high-converting direct customer relationships.'
  },

  'social-media-managing': {
    title: 'Social Media Managing',
    tag: 'Brand Equity & Community Architecture',
    icon: 'fas fa-share-nodes',
    overview: 'Paid media captures attention; exceptional social media management builds enduring brand loyalty and customer equity. We manage your complete social presence across all key digital touchpoints with consistent narrative positioning, daily active community engagement, and synchronized organic-to-paid feedback loops.',
    pillars: [
      {
        title: 'Strategic Content Calendars & Editorial Rhythm',
        desc: 'Developing cohesive monthly publishing schedules that balance educational authority, brand storytelling, customer social proof, and product features.'
      },
      {
        title: 'Community Moderation & Sentiment Cultivation',
        desc: 'Proactive comment response, community interaction, and feedback management that protect your brand reputation and humanize your company.'
      },
      {
        title: 'The Organic-to-Paid Amplification Flywheel',
        desc: 'Identifying high-performing organic posts with outstanding engagement rates and immediately transitioning them into paid amplification assets.'
      }
    ],
    deliverables: [
      'Monthly omnichannel content calendars (copywriting, visual direction, posting cadences)',
      'Multi-format asset planning across Facebook, Instagram, and professional channels',
      'Daily audience moderation and direct message escalation workflows',
      'Brand tone-of-voice documentation and guidelines enforcement',
      'Monthly brand sentiment, reach, and organic follower growth reports'
    ],
    impact: 'Builds an authentic, authoritative social presence that elevates brand value and organically lowers blended customer acquisition costs.'
  },

  'platform-optimization': {
    title: 'Platform Optimization',
    tag: 'Conversion Rate Optimization (CRO) & UX/UI',
    icon: 'fas fa-sliders-h',
    overview: 'Sending expensive ad traffic to a high-friction, slow, or poorly structured website is the quickest way to waste marketing investment. Our Platform Optimization discipline diagnoses and fixes every drop-off bottleneck across user journeys, mobile checkout flows, and Core Web Vitals to maximize revenue per visitor.',
    pillars: [
      {
        title: 'Data-Driven CRO & Heatmap Diagnostics',
        desc: 'Analyzing scroll depth, rage clicks, and session recordings to uncover precisely where prospective buyers hesitate or abandon their carts.'
      },
      {
        title: 'Mobile-First Checkout Friction Elimination',
        desc: 'Redesigning product pages, cart drawers, sticky add-to-cart triggers, and one-page checkout pathways tailored for mobile shoppers.'
      },
      {
        title: 'Core Web Vitals & Speed Acceleration',
        desc: 'Compressing heavy assets, eliminating render-blocking scripts, and configuring server caching to achieve sub-2-second mobile load speeds.'
      }
    ],
    deliverables: [
      'Comprehensive 30-point UX/UI friction and CRO teardown audit',
      'Product page redesign wireframes with high-contrast value propositions',
      'Mobile load speed optimization targeting green Core Web Vitals',
      'Ad-to-landing-page messaging continuity and headline alignment',
      'A/B testing roadmap for high-impact conversion elements'
    ],
    impact: 'Doubles the efficiency of your existing advertising traffic without increasing a single cent of your media spend.'
  },

  'strategic-business-planning': {
    title: 'Strategic Business Planning',
    tag: 'Unit Economics & Market Positioning',
    icon: 'fas fa-chess-knight',
    overview: 'Sustainable marketing scale requires strict commercial alignment. We build comprehensive business blueprints evaluating unit economics, gross margins, customer acquisition costs (CAC), and customer lifetime value (LTV) to ensure every growth initiative contributes directly to net business profitability.',
    pillars: [
      {
        title: 'Unit Economic & Margin Modeling',
        desc: 'Mapping product gross margins against acquisition costs and shipping overheads to define realistic, profitable scaling limits.'
      },
      {
        title: 'Offer Stacking & Bundle Structuring',
        desc: 'Creating tiered bundling, cross-sells, and irresistible front-end offers that dramatically raise Average Order Value (AOV).'
      },
      {
        title: '90-Day Omnichannel Growth Roadmaps',
        desc: 'Sequencing seasonal promotions, product launches, and multi-platform media deployment into clear, measurable commercial milestones.'
      }
    ],
    deliverables: [
      'Comprehensive CAC vs. LTV sensitivity and margin feasibility models',
      'Irresistible offer creation and bundle offer playbooks',
      'Competitive market positioning and value proposition teardowns',
      'Omnichannel promotional calendars aligned with seasonal purchasing peaks',
      'Bi-weekly executive strategy syncs with dedicated leadership advisory'
    ],
    impact: 'Provides founders and executives with clear financial visibility and a strategic roadmap designed for sustainable enterprise valuation.'
  },

  'google-ads': {
    title: 'Google Ads',
    tag: 'High-Intent Search & Performance Max',
    icon: 'fab fa-google',
    overview: 'Capture prospects at the exact millisecond they actively search for your solution. We engineer precision Google Ads campaigns across Search, Performance Max, YouTube, and Google Shopping with meticulous negative keyword hygiene and first-party conversion tracking.',
    pillars: [
      {
        title: 'High-Intent Search Topology',
        desc: 'Structuring Single-Theme Ad Groups (STAGs) around commercial-intent keywords while aggressively filtering irrelevant search terms to protect ad capital.'
      },
      {
        title: 'Performance Max (PMax) Asset Optimization',
        desc: 'Building high-converting asset groups with rich lifestyle imagery, search theme signals, and tailored first-party customer audience lists.'
      },
      {
        title: 'Enhanced Conversions & Server Tracking',
        desc: 'Configuring Google Tag Manager enhanced conversions and offline CRM sync to feed smart bidding algorithms with verified revenue outcomes.'
      }
    ],
    deliverables: [
      'Complete Google Ads account architecture restructuring',
      'High-intent keyword matrix and comprehensive negative keyword lists',
      'Performance Max campaign setup with tailored audience signal sets',
      'Google Merchant Center product catalog feed optimization',
      'Server-side Google Tag Manager and GA4 event deduplication'
    ],
    impact: 'Captures the highest-intent buyers in your market with surgical precision and predictable acquisition costs.'
  }
};

function initServiceModals() {
  const modal = document.getElementById('serviceModal');
  const modalContent = document.getElementById('serviceModalContent');
  const closeBtn = document.getElementById('serviceModalClose');
  const backdrop = document.getElementById('serviceModalBackdrop');
  const serviceButtons = document.querySelectorAll('.service-detail-btn');

  if (!modal || !modalContent) return;

  function openModal(serviceKey) {
    const data = servicesData[serviceKey];
    if (!data) return;

    modalContent.innerHTML = `
      <div class="modal-service-header">
        <div class="modal-service-icon">
          <i class="${data.icon}"></i>
        </div>
        <div>
          <span class="modal-service-tag">${data.tag}</span>
          <h2 class="modal-service-title">${data.title}</h2>
        </div>
      </div>

      <div class="modal-body-text">
        <p>${data.overview}</p>
      </div>

      <h3 class="modal-section-title"><i class="fas fa-layer-group"></i> Strategic Methodology</h3>
      <div class="modal-pillars-grid" style="display: flex; flex-direction: column; gap: 1rem; margin: 1rem 0;">
        ${data.pillars.map(p => `
          <div style="background: rgba(255,255,255,0.03); border: 1px solid var(--border-subtle); border-radius: var(--radius-sm); padding: 1.25rem;">
            <h4 style="color: var(--primary-light); font-size: 1.05rem; margin-bottom: 0.35rem;">${p.title}</h4>
            <p style="font-size: 0.88rem; color: var(--text-muted); line-height: 1.55;">${p.desc}</p>
          </div>
        `).join('')}
      </div>

      <h3 class="modal-section-title"><i class="fas fa-clipboard-check"></i> Key Execution Deliverables</h3>
      <ul class="modal-list">
        ${data.deliverables.map(d => `
          <li><i class="fas fa-check-circle"></i> <span>${d}</span></li>
        `).join('')}
      </ul>

      <div class="modal-callout-box">
        <div class="modal-callout-title"><i class="fas fa-bullseye"></i> Strategic Commercial Impact</div>
        <div class="modal-callout-desc">${data.impact}</div>
      </div>

      <div class="modal-footer-cta">
        <div style="font-size: 0.88rem; color: var(--text-muted);">
          Ready to scale with <strong>${data.title}</strong>?
        </div>
        <button class="btn btn-primary btn-sm modal-inquire-btn" data-service-title="${data.title}">
          <i class="fas fa-paper-plane"></i> Inquire About This Service
        </button>
      </div>
    `;

    // Add Inquire Action inside modal
    const inquireBtn = modalContent.querySelector('.modal-inquire-btn');
    if (inquireBtn) {
      inquireBtn.addEventListener('click', () => {
        closeModal();
        const select = document.getElementById('formService');
        if (select) {
          select.value = data.title;
        }
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth' });
        }
      });
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceKey = btn.getAttribute('data-service');
      openModal(serviceKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Esc key close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. DEDICATED ARTICLES DATA & FULL READER MODAL
   ========================================================================== */
const articlesData = {
  'article-1': {
    title: 'The Death of Cookie Tracking and the Rise of First-Party Attribution: Why Server-Side Precision Wins in 2026',
    pill: 'Data Architecture',
    readTime: '7 min read',
    date: 'September 2026',
    image: 'images/article-conversion.jpg',
    content: `
      <p class="lead" style="font-size: 1.15rem; color: #f1f5f9; line-height: 1.75; font-weight: 500;">
        For nearly two decades, digital advertisers lived in an era of blissful simplicity. You pasted a 10-line JavaScript snippet into your site header, turned on an ad campaign, and the browser pixel dutifully reported back every click, add-to-cart, and checkout. Today, that entire paradigm is dead.
      </p>

      <h3>The Invisible Data Leak That Inflates Your Ad Costs</h3>
      <p>
        Between Apple's App Tracking Transparency (ATT), Safari's Intelligent Tracking Prevention (ITP), Firefox's Enhanced Tracking Protection, and the mainstream adoption of ad blockers, client-side browser pixels routinely lose between 25% to 45% of user touchpoints.
      </p>
      <p>
        When a customer clicks your Meta ad on an iPhone, browses your store, and converts, browser privacy safeguards frequently strip the click ID (fbclid) or truncate cookie persistence to a single day. To your ad manager, that customer never existed.
      </p>

      <blockquote>
        "When an ad algorithm cannot see who converted, it cannot optimize towards similar high-value buyers. The result is algorithmic blindness: higher cost per acquisition, wasted impressions, and false conclusions about campaign performance."
      </blockquote>

      <h3>Client-Side Ping vs. Server-to-Server Pipeline</h3>
      <p>
        Client-side tracking asks the user's volatile browser to send a beacon directly to third-party ad servers. If an ad blocker intercepts the script, or if the browser blocks third-party cookies, the signal vanishes permanently.
      </p>
      <p>
        Server-side tracking fundamentally rewires this relationship. When a purchase occurs on your store, your own secure server records the transaction and dispatches a verified first-party payload directly to the advertising platform’s backend via the Conversions API (CAPI).
      </p>
      <p>
        Because this interaction takes place entirely between servers in a first-party context, it completely bypasses browser ad blockers and device-level cookie purges.
      </p>

      <h3>The Mechanics of Event Match Quality (EMQ)</h3>
      <p>
        The true secret weapon of server-side architecture is Event Match Quality (EMQ). In the modern advertising ecosystem, merely reporting that "a purchase happened" is insufficient. The algorithm needs to match that transaction back to a specific platform user account.
      </p>
      <p>
        By hashing and transmitting verified first-party customer parameters—such as hashed email addresses, normalized phone numbers, client IP addresses, user agent strings, and external customer IDs—your EMQ score climbs from a mediocre 4.5/10 to an authoritative 8.8+/10.
      </p>

      <h3>The 3-Step First-Party Action Plan</h3>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.8rem; margin: 1rem 0;">
        <li><i class="fas fa-check-circle" style="color: var(--primary-light);"></i> <strong>1. Deploy Server Containers:</strong> Migrate event collection to a dedicated Google Tag Manager server container hosted on first-party infrastructure.</li>
        <li><i class="fas fa-check-circle" style="color: var(--primary-light);"></i> <strong>2. Implement Full Deduplication:</strong> Send twin events from both browser and server using unique <code>event_id</code> parameters so platforms can merge duplicate signals without double-counting.</li>
        <li><i class="fas fa-check-circle" style="color: var(--primary-light);"></i> <strong>3. Feed Offline Customer Outcomes:</strong> Synchronize post-purchase events, refunds, and high-ticket CRM stages back into Meta and Google to train bidding algorithms on genuine profitability.</li>
      </ul>

      <p>
        In 2026, media buying advantages belong not to whoever can create the flashiest headline, but to whoever feeds the smartest ad algorithms with the cleanest, most resilient first-party data.
      </p>
    `
  },

  'article-2': {
    title: 'Why Most Paid Ad Campaigns Fail Before the Click: The Platform Conversion Equation',
    pill: 'Platform Optimization',
    readTime: '6 min read',
    date: 'September 2026',
    image: 'images/article-platform.jpg',
    content: `
      <p class="lead" style="font-size: 1.15rem; color: #f1f5f9; line-height: 1.75; font-weight: 500;">
        Every week, founders and marketing teams sit across from ad dashboards in despair. "Our cost-per-click is rising," they say. "The algorithm changed again," they lament. Yet when you inspect where their ad traffic is actually landing, the mystery evaporates: they are pouring premium fuel into an engine riddled with leaks.
      </p>

      <h3>The Illusion of the "Magic Creative"</h3>
      <p>
        There is a widespread obsession with finding the mythical "unicorn ad creative"—the viral video hook or clever carousel that will single-handedly unlock exponential growth. While creative strategy is crucial, it is only half of the commercial equation.
      </p>
      <p>
        An exceptional ad that stops a user's scroll can only generate intent. The moment that user clicks, the ad's job is complete. The burden of converting that raw curiosity into hard revenue shifts entirely to the platform.
      </p>

      <blockquote>
        "The Platform Conversion Equation: Traffic Quality × Messaging Continuity × Frictionless Action = Scalable Commercial Revenue. If any of these factors equals zero, the entire outcome is zero."
      </blockquote>

      <h3>The Silent Killers of On-Site Conversion</h3>
      <p>
        Through hundreds of platform audits, four recurring friction points consistently destroy profitability before a visitor ever reaches the cart:
      </p>

      <h4 style="color: var(--primary-light); font-size: 1.15rem; margin-top: 1rem;">1. The Above-the-Fold Messaging Disconnect</h4>
      <p>
        If your ad promises "Instant relief from chronic back pain while working at your desk," but your landing page headline says "Welcome to Ergonomic Solutions Worldwide," the user experiences cognitive dissonance. You have approximately 2.8 seconds for the landing page hero to visually and verbally validate the promise made in the ad.
      </p>

      <h4 style="color: var(--primary-light); font-size: 1.15rem; margin-top: 1rem;">2. Mobile Latency and Script Bloat</h4>
      <p>
        More than 80% of paid social traffic visits on mobile devices, often on cellular connections. If your Shopify store or landing page takes 4.5 seconds to render its primary hero content due to unoptimized apps and giant imagery, over 50% of your paid clicks will bounce before the page even finishes loading. You are paying Meta or Google for clicks that never actually saw your offer.
      </p>

      <h4 style="color: var(--primary-light); font-size: 1.15rem; margin-top: 1rem;">3. Hidden Costs and Checkout Fatigue</h4>
      <p>
        Surprise delivery fees, mandatory account creation forms, and excessive input fields at the final step cause devastating drop-offs. Modern buyers expect transparent one-page checkout experiences, localized payment options, and clear delivery timelines upfront.
      </p>

      <h3>How to Double ROI Without Increasing Ad Spend</h3>
      <p>
        Consider this math: If your current landing page converts at 1.5% and you optimize your product page structure, clarify your value proposition, and streamline your checkout flow to reach 3.0%, you have effectively cut your customer acquisition cost in half.
      </p>
      <p>
        Before you ask your media buyer to scale media spend or demand new video variations, run a rigorous audit on the platform receiving that traffic. Fix the leaky bucket first, and watch your ad efficiency compound immediately.
      </p>
    `
  },

  'article-3': {
    title: 'From Fragmented Tactics to Compounding Scale: Building a Sustainable Digital Growth Flywheel',
    pill: 'Strategic Growth',
    readTime: '8 min read',
    date: 'September 2026',
    image: 'images/article-scaling.jpg',
    content: `
      <p class="lead" style="font-size: 1.15rem; color: #f1f5f9; line-height: 1.75; font-weight: 500;">
        The most common trap in modern digital marketing is fragmentation. An agency runs Meta Ads in isolation. An in-house specialist experiments with Google Search. A social media manager posts daily updates that nobody reads. Everyone looks at their individual metrics, yet the business experiences stagnant, plateaued growth.
      </p>

      <h3>The Tri-Channel Synergy Framework</h3>
      <p>
        Predictable commercial growth does not come from isolated channel heroics. It happens when each marketing discipline is intentionally engineered to feed, inform, and amplify the others.
      </p>

      <h4 style="color: var(--secondary); font-size: 1.15rem; margin-top: 1rem;">1. Demand Capture (Search Intent)</h4>
      <p>
        When someone has an urgent, immediate need, they do not wait for an Instagram ad; they go directly to Google. High-intent Google Search campaigns act as the anchor of your growth ecosystem, capturing active market demand with high commercial precision.
      </p>

      <h4 style="color: var(--primary-light); font-size: 1.15rem; margin-top: 1rem;">2. Demand Creation (Visual Disruption)</h4>
      <p>
        However, the total volume of active searchers in any market is naturally limited. To scale beyond incumbents, you must create new demand. Meta, Instagram, and short-form video disrupt passive attention, introducing your brand's unique solution to prospects who didn't even know a better alternative existed.
      </p>

      <h4 style="color: #a78bfa; font-size: 1.15rem; margin-top: 1rem;">3. Conversational Retention & Rapid Closing</h4>
      <p>
        In high-trust markets—particularly across emerging economies and high-ticket direct-to-consumer categories—static websites often fail to answer nuanced customer hesitations. Integrating conversational channels (such as automated WhatsApp and DM sequences) closes the gap between consideration and purchase, elevating conversion rates dramatically.
      </p>

      <blockquote>
        "A growth flywheel is not a linear funnel with a beginning and an end. It is a self-reinforcing loop where every successful customer acquisition creates the data, margin, and referral momentum required to lower the acquisition cost of the next customer."
      </blockquote>

      <h3>Unit Economics: The Ceiling of Scalability</h3>
      <p>
        Every brand hits a scaling plateau when their Customer Acquisition Cost (CAC) catches up to their initial gross margin. If you only profit on the first transaction, your scaling velocity will always feel constrained.
      </p>
      <p>
        The brands that scale effortlessly into market leadership are those that intentionally engineer backend economics:
      </p>
      <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.75rem; margin: 1rem 0;">
        <li><i class="fas fa-arrow-right" style="color: var(--primary-light);"></i> <strong>Strategic Bundling:</strong> Structuring 2-pack and 3-pack product options to lift Average Order Value (AOV) by 35%+.</li>
        <li><i class="fas fa-arrow-right" style="color: var(--primary-light);"></i> <strong>Automated Re-engagement Loops:</strong> Triggering tailored re-order prompts via direct messaging based on calculated product consumption cycles.</li>
        <li><i class="fas fa-arrow-right" style="color: var(--primary-light);"></i> <strong>Algorithmic Audience Seeding:</strong> Exporting high-LTV customer lists to build high-precision Lookalike cohorts on ad platforms.</li>
      </ul>

      <h3>The Shift to Strategic Maturity</h3>
      <p>
        Stop treating marketing as a collection of disjointed tasks. When you align high-intent capture, visual demand creation, frictionless platform UX, and lifetime value expansion into a unified flywheel, scaling ceases to be an agonizing gamble. It becomes an engineered inevitability.
      </p>
    `
  }
};

function initArticleModals() {
  const modal = document.getElementById('articleModal');
  const modalContent = document.getElementById('articleModalContent');
  const closeBtn = document.getElementById('articleModalClose');
  const backdrop = document.getElementById('articleModalBackdrop');
  const articleButtons = document.querySelectorAll('.article-read-btn');

  if (!modal || !modalContent) return;

  function openModal(articleKey) {
    const data = articlesData[articleKey];
    if (!data) return;

    modalContent.innerHTML = `
      <div class="article-reader-header">
        <span class="article-reader-pill">${data.pill}</span>
        <h1 class="article-reader-title">${data.title}</h1>
        <div class="article-reader-byline">
          <span><i class="far fa-user"></i> By Kazi Emon</span>
          <span>&bull;</span>
          <span><i class="far fa-clock"></i> ${data.readTime}</span>
          <span>&bull;</span>
          <span><i class="far fa-calendar"></i> ${data.date}</span>
        </div>
      </div>

      <div class="article-reader-img-wrap">
        <img src="${data.image}" alt="${data.title}" class="article-reader-img">
      </div>

      <div class="article-reader-body">
        ${data.content}
      </div>

      <div class="article-author-card">
        <img src="images/profile.jpg" alt="Kazi Emon" class="author-avatar">
        <div class="author-info">
          <h4>About the Author: Kazi Emon</h4>
          <p>
            <strong>Md Kazi Abdur Rahim Emon</strong> is a digital marketer and paid growth strategist based in Dhaka, Bangladesh. He specializes in algorithmic Meta & Google advertising, server-side tracking architecture, and platform conversion engineering.
          </p>
        </div>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  articleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const articleKey = btn.getAttribute('data-article');
      openModal(articleKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  // Esc key close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. CASE STUDY CATEGORY FILTERS
   ========================================================================== */
function initCaseFilters() {
  const chips = document.querySelectorAll('.filter-chip');
  const cards = document.querySelectorAll('.case-card');

  if (!chips.length || !cards.length) return;

  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      chips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.animation = 'fadeIn 0.35s ease forwards';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   9. FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');

    if (!trigger || !answer) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherAns = otherItem.querySelector('.faq-answer');
          if (otherAns) otherAns.style.maxHeight = '0px';
        }
      });

      if (isActive) {
        item.classList.remove('active');
        answer.style.maxHeight = '0px';
      } else {
        item.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   10. STRATEGIC CONSULTATION FORM HANDLER
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('auditForm');
  const status = document.getElementById('formStatus');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('formName').value.trim();
    const email = document.getElementById('formEmail').value.trim();
    const website = document.getElementById('formWebsite').value.trim();
    const service = document.getElementById('formService').value;
    const message = document.getElementById('formMessage').value.trim();

    if (!name || !email || !website) {
      if (status) {
        status.className = 'form-status error';
        status.textContent = 'Please fill in all required fields marked with *.';
      }
      return;
    }

    if (status) {
      status.className = 'form-status success';
      status.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Preparing your growth audit request...';
    }

    // Prepare WhatsApp link with pre-filled message
    const waPhone = '8801878051280';
    let waText = `*Growth Audit Request - Kazi Emon Portfolio*%0A%0A`;
    waText += `*Name:* ${encodeURIComponent(name)}%0A`;
    waText += `*Email:* ${encodeURIComponent(email)}%0A`;
    waText += `*Website:* ${encodeURIComponent(website)}%0A`;
    waText += `*Service of Interest:* ${encodeURIComponent(service)}%0A`;
    if (message) {
      waText += `*Strategic Goals & Challenges:* ${encodeURIComponent(message)}%0A`;
    }

    const waUrl = `https://wa.me/${waPhone}?text=${waText}`;

    setTimeout(() => {
      if (status) {
        status.className = 'form-status success';
        status.innerHTML = '<i class="fas fa-check-circle"></i> Redirecting to WhatsApp to finalize your strategy session...';
      }
      window.open(waUrl, '_blank');
      form.reset();
    }, 900);
  });
}

/* ==========================================================================
   11. FLOATING WHATSAPP CHAT POPUP
   ========================================================================== */
function initFloatingWa() {
  const launcher = document.getElementById('waLauncher');
  const popup = document.getElementById('waPopup');
  const closeBtn = document.getElementById('waClose');
  const quickPrompts = document.querySelectorAll('.wa-quick-prompt');

  if (!launcher || !popup) return;

  launcher.addEventListener('click', () => {
    popup.classList.toggle('active');
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      popup.classList.remove('active');
    });
  }

  quickPrompts.forEach(prompt => {
    prompt.addEventListener('click', (e) => {
      e.preventDefault();
      const text = prompt.getAttribute('data-prompt');
      const waUrl = `https://wa.me/8801878051280?text=${encodeURIComponent(text)}`;
      window.open(waUrl, '_blank');
      popup.classList.remove('active');
    });
  });
}

/* ==========================================================================
   12. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 450) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}
