/**
 * KAZI EMON — DIGITAL MARKETING SPECIALIST & GROWTH STRATEGIST
 * Royal Purple 3D WebGL Background, Card Tilt, Modular Articles & Service Modals
 */

document.addEventListener('DOMContentLoaded', () => {
  initThreeJsRoyalPurpleBackground();
  initNavbar();
  initScrollSpy();
  initCounters();
  init3DCardTilt();
  initServiceModals();
  initArticleCardsAndModals();
  initFaqAccordion();
  initBackToTop();
});

/* ==========================================================================
   1. ROYAL PURPLE 3D WEBGL PARTICLE EXPERIENCE (Three.js)
   ========================================================================== */
function initThreeJsRoyalPurpleBackground() {
  const canvas = document.getElementById('webglCanvas');
  if (!canvas || typeof THREE === 'undefined') return;

  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 2000);
    camera.position.z = 680;
    camera.position.y = 80;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 3D Particle Grid Wave with Royal Purple and Violet Tones
    const particleCount = 1350;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const deepRoyal = new THREE.Color(0x4a0e4e);
    const electricViolet = new THREE.Color(0x9333ea);
    const radiantMagenta = new THREE.Color(0xc026d3);
    const luminousLilac = new THREE.Color(0xe879f9);

    const cols = 50;
    const rows = 27;
    const spacingX = 46;
    const spacingZ = 46;

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

        // Gradient color blend
        const mixRatio = (i / cols + j / rows) / 2;
        let pColor;
        if (mixRatio < 0.4) {
          pColor = deepRoyal.clone().lerp(electricViolet, mixRatio / 0.4);
        } else if (mixRatio < 0.75) {
          pColor = electricViolet.clone().lerp(radiantMagenta, (mixRatio - 0.4) / 0.35);
        } else {
          pColor = radiantMagenta.clone().lerp(luminousLilac, (mixRatio - 0.75) / 0.25);
        }

        colors[index * 3] = pColor.r;
        colors[index * 3 + 1] = pColor.g;
        colors[index * 3 + 2] = pColor.b;

        index++;
      }
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    // Soft glowing particle texture
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 32;
    pCanvas.height = 32;
    const pCtx = pCanvas.getContext('2d');
    const gradient = pCtx.createRadialGradient(16, 16, 0, 16, 16, 16);
    gradient.addColorStop(0, 'rgba(255,255,255,1)');
    gradient.addColorStop(0.35, 'rgba(192,132,252,0.85)');
    gradient.addColorStop(1, 'rgba(0,0,0,0)');
    pCtx.fillStyle = gradient;
    pCtx.fillRect(0, 0, 32, 32);

    const pTexture = new THREE.CanvasTexture(pCanvas);

    const material = new THREE.PointsMaterial({
      size: 7.5,
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
      targetMouseX = (e.clientX - halfWidth) * 0.35;
      targetMouseY = (e.clientY - halfHeight) * 0.35;
    }, { passive: true });

    // Scroll Depth Parallax
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

      camera.position.x = mouseX * 0.75;
      camera.position.y = 80 - mouseY * 0.4 - scrollY * 0.22;
      camera.lookAt(0, 0, 0);

      // Undulating Wave Formula
      const posArray = geometry.attributes.position.array;
      for (let i = 0; i < particleCount; i++) {
        const x = posArray[i * 3];
        const z = posArray[i * 3 + 2];
        posArray[i * 3 + 1] = Math.sin(x * 0.007 + elapsedTime * 1.3) * 32 +
                              Math.cos(z * 0.007 + elapsedTime * 1.1) * 32;
      }
      geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    });

  } catch (err) {
    console.warn('Three.js royal purple background skipped:', err);
  }
}

/* ==========================================================================
   2. 3D CARD TILT WITH SPECULAR GLOW
   ========================================================================== */
function init3DCardTilt() {
  if (window.matchMedia('(hover: none)').matches) return;

  const tiltCards = document.querySelectorAll('[data-tilt]');

  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const normX = (x - centerX) / centerX;
      const normY = (y - centerY) / centerY;

      const tiltX = -normY * 6;
      const tiltY = normX * 6;

      card.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
    });
  });
}

/* ==========================================================================
   3. STICKY NAVBAR & MOBILE DRAWER
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
   4. SCROLLSPY NAVIGATION (7 Exact Links)
   ========================================================================== */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 170;

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
    const duration = 1600;
    const startTimestamp = performance.now();

    const step = (now) => {
      const elapsed = now - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);
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
   6. THE 6 SERVICES DATA & DEDICATED MODAL VIEWS
   ========================================================================== */
const servicesData = {
  'facebook-ads': {
    title: 'Facebook Marketing and Ads',
    tag: 'Targeted Customer Acquisition & Scaling',
    icon: 'fab fa-facebook-f',
    overview: 'Facebook remains an unparalleled platform for targeted consumer discovery and scalable customer acquisition. We construct disciplined, high-converting ad pipelines that combine deep audience segmentation with persuasive direct-response copywriting to turn interest into confirmed orders.',
    methodology: [
      {
        title: 'Audience Psychographics & Segmentation',
        desc: 'Structuring targeted cold discovery audiences, interest clusters, and custom retargeting pools to reach ready-to-buy prospective customers.'
      },
      {
        title: 'Creative Angle & Hook Testing',
        desc: 'Testing multiple ad angles—lifestyle imagery, problem-solving hooks, customer testimonials, and limited offers—to identify high-performing assets.'
      },
      {
        title: 'Full-Funnel Campaign Scaling',
        desc: 'Systematically scaling ad budget toward winning creative variations while maintaining stable cost per acquisition (CPA).'
      }
    ],
    deliverables: [
      'Comprehensive target audience research and demographic analysis',
      'Direct-response ad copy tailored for maximum click-through rates',
      'Retargeting funnels designed to recapture cart abandoners',
      'Continuous performance monitoring and ad creative rotation',
      'Weekly executive performance summaries and strategic insights'
    ],
    impact: 'Builds a predictable, scalable client acquisition pipeline for brands seeking consistent local and global growth.'
  },

  'instagram-ads': {
    title: 'Instagram Marketing and Ads',
    tag: 'Visual Storytelling & Audience Engagement',
    icon: 'fab fa-instagram',
    overview: 'Instagram is the modern visual storefront. We craft aesthetic, conversion-engineered Instagram campaigns using short-form Reel video concepts, story promotion sequences, and feed campaigns that captivate attention and build authentic brand equity.',
    methodology: [
      {
        title: 'High-Retention Reel Promotion',
        desc: 'Scripting fast-paced, high-retention short-form video ads tailored for 0-3 second hook velocity to prevent scroll drop-off.'
      },
      {
        title: 'Story Engagement Sequences',
        desc: 'Designing interactive story ad sequences that guide followers smoothly from product awareness to direct inquiry.'
      },
      {
        title: 'Direct-Response Profile Alignment',
        desc: 'Aligning bio messaging, story highlight reels, and promo posts to make visitor action seamless and friction-free.'
      }
    ],
    deliverables: [
      'Scripting and creative direction for vertical video Reel promotions',
      'Interactive Instagram Story promotional sequences',
      'Direct inquiry capture pathways on high-interest posts',
      'Visual feed aesthetic coordination and promotional highlights',
      'Audience demographic and engagement cohort reporting'
    ],
    impact: 'Elevates perceived brand value and transforms passive social media scrollers into enthusiastic brand advocates.'
  },

  'social-management': {
    title: 'Social Media Managing',
    tag: 'Brand Equity & Daily Community Execution',
    icon: 'fas fa-share-nodes',
    overview: 'Paid advertising captures immediate attention, but consistent social media management builds enduring customer trust. We manage your full digital presence with cohesive editorial calendars, daily brand voice enforcement, and active community interaction.',
    methodology: [
      {
        title: 'Content Calendar & Publishing Rhythm',
        desc: 'Formulating structured weekly publishing schedules balancing educational authority, brand values, customer reviews, and product highlights.'
      },
      {
        title: 'Community Interaction & Moderation',
        desc: 'Promptly responding to comments and inquiries to humanize your business and foster genuine community goodwill.'
      },
      {
        title: 'Brand Consistency Across Channels',
        desc: 'Enforcing uniform visual identity, tone of voice, and messaging across Facebook, Instagram, and professional platforms.'
      }
    ],
    deliverables: [
      'Monthly social media content calendars with copy and graphic directions',
      'Daily audience moderation and direct inquiry escalation workflows',
      'Hashtag research and organic reach optimization',
      'Brand tone-of-voice alignment across all active channels',
      'Monthly reach, follower growth, and community engagement analysis'
    ],
    impact: 'Ensures your business maintains a vibrant, authoritative presence that reinforces customer confidence every day.'
  },

  'google-ads': {
    title: 'Google Ads',
    tag: 'High-Intent Search & Buyer Traffic',
    icon: 'fab fa-google',
    overview: 'Capture prospects at the exact millisecond they actively search for your solution. We engineer precision Google Search campaigns structured around commercial-intent keywords with meticulous negative keyword hygiene to ensure zero wasted capital.',
    methodology: [
      {
        title: 'Commercial Intent Keyword Harvesting',
        desc: 'Identifying high-converting search queries that indicate urgent buyer intent rather than general information gathering.'
      },
      {
        title: 'Strict Negative Keyword Hygiene',
        desc: 'Aggressively filtering irrelevant, non-converting search terms to protect promotional spend and raise quality scores.'
      },
      {
        title: 'High-CTR Ad Copywriting',
        desc: 'Crafting responsive search ads highlighting unique selling propositions, trust badges, and clear calls to action.'
      }
    ],
    deliverables: [
      'Structured Google Search campaign architecture and ad group setup',
      'Comprehensive positive keyword matrix and negative keyword exclusion lists',
      'High-converting responsive search ad copy and extensions setup',
      'Continuous search term query analysis and bid optimization',
      'Clear conversion tracking and monthly performance reports'
    ],
    impact: 'Directs the highest-intent buyers in your market straight to your business with surgical precision.'
  },

  'canva-design': {
    title: 'Canva Poster Design',
    tag: 'Eye-Catching Visuals & Social Media Graphics',
    icon: 'fas fa-palette',
    overview: 'Visual presentation communicates quality before words are ever read. We design premium, eye-catching promotional posters, social media banners, and advertising creatives using Canva to maximize visual appeal and stop viewer scroll instantly.',
    methodology: [
      {
        title: 'Visual Hierarchy & Focal Anchoring',
        desc: 'Structuring posters with clear visual hierarchy so the eye moves naturally from hook to product benefit to call to action.'
      },
      {
        title: 'Color Palette & Typography Discipline',
        desc: 'Applying strict brand color rules and pairing clean heading fonts with legible body copy for maximum readability.'
      },
      {
        title: 'Multi-Format Asset Adaptability',
        desc: 'Designing coordinated graphics adapted for square feed posts (1:1), vertical stories (9:16), and wide web banners (16:9).'
      }
    ],
    deliverables: [
      'Custom promotional social media posters for product launches and offers',
      'Cohesive brand design kits (color codes, font pairings, reusable styles)',
      'Multi-format banners for Facebook covers, Instagram stories, and ads',
      'High-resolution export assets ready for instant publishing',
      'Iterative design revisions to match your exact aesthetic preferences'
    ],
    impact: 'Dramatically upgrades your visual brand perception, commanding attention and trust in crowded social feeds.'
  },

  'business-planning': {
    title: 'Strategic Business Planning',
    tag: 'Financial Acumen & Practical Growth Frameworks',
    icon: 'fas fa-chart-pie',
    overview: 'Leveraging academic training in Accounting, we bridge the gap between creative marketing and financial viability. We formulate practical business growth frameworks, evaluate product unit economics, and build structural operational roadmaps to ensure your business scales profitably.',
    methodology: [
      {
        title: 'Unit Economic & Gross Margin Modeling',
        desc: 'Evaluating product manufacturing, packaging, and delivery costs to identify true break-even thresholds and profit margins.'
      },
      {
        title: 'Irresistible Offer Packaging',
        desc: 'Structuring bundle pricing, volume discounts, and bonus incentives that raise Average Order Value (AOV).'
      },
      {
        title: '90-Day Operational Milestones',
        desc: 'Sequencing seasonal promotions and marketing milestones into clear, achievable commercial phases.'
      }
    ],
    deliverables: [
      'Full unit economic review and contribution margin feasibility models',
      'Irresistible product offer structuring and bundling playbooks',
      'Competitive market positioning and value proposition refinement',
      'Structured 90-day business execution and promotion roadmap',
      'Dedicated one-on-one strategic planning sessions'
    ],
    impact: 'Equips business leaders with financial clarity and a strategic plan built for long-term commercial sustainability.'
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

      <h3 class="modal-section-title"><i class="fas fa-layer-group"></i> Execution Methodology</h3>
      <div class="modal-pillars-grid" style="display: flex; flex-direction: column; gap: 1rem; margin: 1rem 0;">
        ${data.methodology.map(m => `
          <div style="background: rgba(168, 85, 247, 0.08); border: 1px solid var(--border-card); border-radius: var(--radius-sm); padding: 1.25rem;">
            <h4 style="color: var(--primary-light); font-size: 1.05rem; margin-bottom: 0.35rem;">${m.title}</h4>
            <p style="font-size: 0.9rem; color: var(--text-light); line-height: 1.6;">${m.desc}</p>
          </div>
        `).join('')}
      </div>

      <h3 class="modal-section-title"><i class="fas fa-clipboard-check"></i> Key Deliverables</h3>
      <ul class="modal-list">
        ${data.deliverables.map(d => `
          <li><i class="fas fa-check-circle"></i> <span>${d}</span></li>
        `).join('')}
      </ul>

      <div class="modal-callout-box">
        <div class="modal-callout-title"><i class="fas fa-bullseye"></i> Commercial Impact</div>
        <div class="modal-callout-desc">${data.impact}</div>
      </div>

      <div class="modal-footer-cta">
        <div style="font-size: 0.9rem; color: var(--text-muted);">
          Ready to get started with <strong>${data.title}</strong>?
        </div>
        <a href="mailto:info@kaziemon.online?subject=Inquiry%20regarding%20${encodeURIComponent(data.title)}&body=Hello%20Kazi%20Emon,%0A%0AI%20am%20interested%20in%20your%20${encodeURIComponent(data.title)}%20service.%0A%0ABusiness%20Name:%20%0APhone/WhatsApp:%20%0A%0APlease%20let%20me%20know%20how%20we%20can%20start!" class="btn btn-primary btn-sm">
          <i class="fas fa-paper-plane"></i> Inquire via Email
        </a>
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

  serviceButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const serviceKey = btn.getAttribute('data-service');
      openModal(serviceKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (backdrop) backdrop.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   7. MODULAR ARTICLES RENDERING & FULL READER MODAL
   ========================================================================== */
function initArticleCardsAndModals() {
  const modal = document.getElementById('articleModal');
  const modalContent = document.getElementById('articleModalContent');
  const closeBtn = document.getElementById('articleModalClose');
  const backdrop = document.getElementById('articleModalBackdrop');
  const articlesGrid = document.getElementById('articlesGrid');

  // Verify modular articlesData exists
  const articles = window.articlesData || [];
  if (!articles.length) return;

  // Render article cards dynamically into the grid to ensure scalable architecture
  if (articlesGrid) {
    articlesGrid.innerHTML = articles.map(art => `
      <article class="article-card" data-tilt>
        <div class="article-thumb-wrap">
          <img src="${art.image}" alt="${art.title}" class="article-thumb" loading="lazy">
          <span class="article-pill">${art.category}</span>
        </div>
        <div class="article-content">
          <div class="article-meta">
            <span><i class="far fa-clock"></i> ${art.readTime}</span>
            <span>&bull;</span>
            <span><i class="far fa-calendar"></i> ${art.publishDate}</span>
          </div>
          <h3 class="article-title">${art.title}</h3>
          <p class="article-excerpt">${art.excerpt}</p>
          <div class="article-footer">
            <button class="btn btn-secondary btn-sm article-read-btn" data-article-id="${art.id}">
              Read More <i class="fas fa-book-open"></i>
            </button>
          </div>
        </div>
      </article>
    `).join('');

    // Re-bind 3D tilt on dynamically created cards
    init3DCardTilt();
  }

  function openArticleModal(articleId) {
    const art = articles.find(a => a.id === articleId);
    if (!art || !modalContent) return;

    modalContent.innerHTML = `
      <div class="article-reader-header">
        <span class="article-reader-pill">${art.category}</span>
        <h1 class="article-reader-title">${art.title}</h1>
        <div class="article-reader-byline">
          <span><i class="far fa-user"></i> By Kazi Emon</span>
          <span>&bull;</span>
          <span><i class="far fa-clock"></i> ${art.readTime}</span>
          <span>&bull;</span>
          <span><i class="far fa-calendar"></i> ${art.publishDate}</span>
        </div>
      </div>

      <div class="article-reader-img-wrap">
        <img src="${art.image}" alt="${art.title}" class="article-reader-img">
      </div>

      <div class="article-reader-body">
        ${art.content}
      </div>

      <div class="article-author-card">
        <img src="images/profile.jpg" alt="Kazi Emon" class="author-avatar">
        <div class="author-info">
          <h4>About the Author: Kazi Emon</h4>
          <p>
            <strong>Md Kazi Abdur Rahim Emon</strong> is a digital marketing specialist and growth strategist based in Dhaka, Bangladesh. With an academic background in Accounting, he specializes in ROI-driven Meta and Google advertising, Canva visual branding, and strategic business planning.
          </p>
        </div>
      </div>
    `;

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeArticleModal() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  // Delegate click for article read buttons
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.article-read-btn');
    if (btn) {
      const artId = btn.getAttribute('data-article-id');
      openArticleModal(artId);
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeArticleModal);
  if (backdrop) backdrop.addEventListener('click', closeArticleModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) {
      closeArticleModal();
    }
  });
}

/* ==========================================================================
   8. FAQ ACCORDION (4 Realistic Client Inquiries)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    const answer = item.querySelector('.faq-answer');

    if (!trigger || !answer) return;

    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

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
   9. BACK TO TOP BUTTON
   ========================================================================== */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  const footerBtn = document.getElementById('footerBackToTop');

  if (btn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
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

  if (footerBtn) {
    footerBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}
