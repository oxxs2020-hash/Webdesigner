// @ts-nocheck
"use client";

import { useEffect, useRef } from 'react';

export default function Home() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;
    
    // Polyfill for onclicks
    document.querySelectorAll('[data-data-onclick="selectPill"]').forEach(el => {
      el.addEventListener('click', function() {
        if (window.selectPill) window.selectPill(this);
      });
    });

      // ─── Device capability flags ───
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 1. Reactive Skiper Smooth Cursor
  const dot = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');
  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let ringPos = { x: mouse.x, y: mouse.y };

  if (finePointer && dot && ring) {
    window.addEventListener('mousemove', (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      dot.style.left = `${mouse.x}px`;
      dot.style.top = `${mouse.y}px`;
    });

    function updateCursor() {
      ringPos.x += (mouse.x - ringPos.x) * 0.15;
      ringPos.y += (mouse.y - ringPos.y) * 0.15;
      ring.style.left = `${ringPos.x}px`;
      ring.style.top = `${ringPos.y}px`;
      requestAnimationFrame(updateCursor);
    }
    updateCursor();

    document.querySelectorAll('a, button, input, .bento-card').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('hovering'));
    });
  }

  // 2. Skiper Proximity Dock Magnification
  const dock = document.getElementById('dynamicDock');
  const dockItems = dock.querySelectorAll('.dock-item');

  if (finePointer && !reducedMotion) {
    dock.addEventListener('mousemove', (e) => {
      dockItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(e.clientX - itemCenter);
        const scale = Math.max(1, 1.25 - distance / 150);
        item.style.transform = `scale(${scale})`;
      });
    });

    dock.addEventListener('mouseleave', () => {
      dockItems.forEach(item => { item.style.transform = 'scale(1)'; });
    });
  }

  // 3. Bento Radiant Border + 3D Tilt
  const bentoGrid = document.querySelector('.bento-grid');
  const bentoCards = document.querySelectorAll('.bento-card');

  if (bentoGrid && finePointer && !reducedMotion) {
    bentoGrid.addEventListener('mousemove', (e) => {
      bentoCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);

        card.style.setProperty('--spec-x', `${100 - (x / rect.width * 100)}%`);
        card.style.setProperty('--spec-y', `${100 - (y / rect.height * 100)}%`);
      });
    });

    bentoCards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -10;
        const rotateY = ((x / rect.width) - 0.5) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      });
    });
  }

  // ─── Translations ───
  const translations = {
    "title": {
      "en": "AURA AGENCY // WEB DESIGN",
      "es": "AURA AGENCY // ARQUITECTURA WEB",
      "de": "AURA AGENCY // WEB-ARCHITEKTUR"
    },
    "hero_badge": {
      "en": "AURA AGENCY // OSCAR OTERO ALVAREZ",
      "es": "AURA AGENCY // OSCAR OTERO ALVAREZ",
      "de": "AURA AGENCY // OSCAR OTERO ALVAREZ"
    },
    "hero_title": {
      "en": "<span class='font-antique text-wavy-purple' data-scramble>Aura Agency</span><br><span class='text-ocean-waves'><span data-scramble>We create</span><br><span data-scramble>high design</span><br><span data-scramble>web pages.</span></span>",
      "es": "<span class='font-antique text-wavy-purple' data-scramble>Aura Agency</span><br><span class='text-ocean-waves'><span data-scramble>Creamos</span><br><span data-scramble>páginas web de</span><br><span data-scramble>alto diseño.</span></span>",
      "de": "<span class='font-antique text-wavy-purple' data-scramble>Aura Agency</span><br><span class='text-ocean-waves'><span data-scramble>Wir erstellen</span><br><span data-scramble>Webseiten mit</span><br><span data-scramble>hohem Design.</span></span>"
    },
    "hero_desc": {
      "en": "Crafting bespoke websites and upgrading existing platforms with beautiful layouts. Built for brands that demand memorable digital experiences.",
      "es": "Diseñamos sitios web a medida y potenciamos plataformas existentes con ingeniería orientada a la conversión. Creado para marcas que exigen experiencias digitales de primer nivel.",
      "de": "Wir entwickeln maßgeschneiderte Websites und transformieren bestehende Plattformen mit modernstem Design und hochkonvertierender Technologie."
    },
    "hero_btn_1": { "en": "Start a Project", "es": "Iniciar Proyecto", "de": "Projekt starten" },
    "hero_btn_2": { "en": "View Capabilities", "es": "Ver Servicios", "de": "Leistungen ansehen" },
    "nav_1": { "en": "Home", "es": "Inicio", "de": "Start" },
    "nav_2": { "en": "About", "es": "Arquitecto", "de": "Architekt" },
    "nav_3": { "en": "Services", "es": "Soluciones", "de": "Lösungen" },
    "about_badge": { "en": "Lead Web Designer", "es": "Arquitecto Principal", "de": "Chefarchitekt" },
    "about_desc": {
      "en": "Visionary designer and engineer behind Aura Agency. Specializing in highly interactive, futuristic web experiences tailored for creative brands and modern businesses.",
      "es": "Diseñador e ingeniero con visión de futuro al frente de Aura Agency. Especializado en arquitecturas web altamente interactivas y de estética futurista.",
      "de": "Visionärer Designer und Ingenieur hinter Aura Agency. Spezialisiert auf hochgradig interaktive, zukunftsweisende Web-Architekturen."
    },
    "solutions_badge": { "en": "Our Services", "es": "Catálogo de Servicios", "de": "Leistungsübersicht" },
    "solutions_title": { "en": "Designed with Passion.", "es": "Ingeniería de Precisión.", "de": "Mit höchster Präzision entwickelt." },
    "card1_title": { "en": "Modern Web Builds", "es": "Desarrollo Web de Élite", "de": "Elite Web-Entwicklung" },
    "card1_desc": {
      "en": "Building modern websites from the ground up with instant performance, clean code base, and striking futuristic visuals.",
      "es": "Creamos sitios web modernos desde cero con rendimiento instantáneo, arquitectura limpia y una estética futurista impactante.",
      "de": "Entwicklung moderner Websites von Grund auf, mit herausragender Performance und beeindruckender Ästhetik."
    },
    "card1_tag2": { "en": "NEXT-GEN STACK →", "es": "TECNOLOGÍA DE ÚLTIMA GENERACIÓN →", "de": "NEXT-GEN STACK →" },
    "card2_title": { "en": "Next-Level Revamps", "es": "Rediseños de Alto Nivel", "de": "Premium Relaunches" },
    "card2_desc": {
      "en": "Upgrading your current website with fluid micro-interactions, modern responsive layouts, and cutting-edge design techniques.",
      "es": "Transformamos su sitio web actual con microinteracciones fluidas, diseños adaptables y técnicas de vanguardia.",
      "de": "Aufwertung Ihrer bestehenden Website mit flüssigen Mikro-Interaktionen und modernen responsiven Layouts."
    },
    "card2_tag2": { "en": "MODERN UPGRADES →", "es": "ACTUALIZACIONES MODERNAS →", "de": "MODERNE UPGRADES →" },
    "card3_title": { "en": "Conversion & Performance", "es": "Conversión y Rendimiento", "de": "Conversion & Performance" },
    "card3_desc": {
      "en": "Re-engineering user interfaces and optimizing performance metrics to seamlessly turn visitors into loyal clients.",
      "es": "Rediseño integral de interfaces y optimización de métricas para convertir visitantes en clientes fieles.",
      "de": "Neustrukturierung von Benutzeroberflächen, um Besucher nahtlos in treue Kunden zu verwandeln."
    },
    "card3_tag2": { "en": "HIGH CONVERSION →", "es": "ALTA CONVERSIÓN →", "de": "HOHE CONVERSION →" },
    "intake_phase": { "en": "Phase 01 // Configuration", "es": "Fase 01 // Configuración", "de": "Phase 01 // Konfiguration" },
    "intake_heading": { "en": "Select your project scope:", "es": "Seleccione el alcance de su proyecto:", "de": "Wählen Sie den Projektumfang:" },
    "pill_1": { "en": "New Website Build", "es": "Crear Sitio Web Nuevo", "de": "Neue Website erstellen" },
    "pill_2": { "en": "Website Upgrade / Revamp", "es": "Rediseño / Renovación Web", "de": "Website Upgrade / Relaunch" },
    "pill_3": { "en": "Performance Optimization", "es": "Optimización de Rendimiento", "de": "Performance-Optimierung" },
    "input_placeholder": {
      "en": "Type or select an option above...",
      "es": "Escriba o seleccione una opción...",
      "de": "Tippen oder wählen Sie eine Option aus..."
    },
    "contact_bio": {
      "en": "Designing & engineering high-performance web platforms for creative brands. Based in Vigo, Spain — available worldwide.",
      "es": "Diseño e ingeniería de plataformas web de alto rendimiento para marcas de élite. Con base en Vigo, España — disponible mundialmente.",
      "de": "Design & Entwicklung hochleistungsfähiger Web-Plattformen für Elite-Marken. Standort Vigo, Spanien — weltweit verfügbar."
    }
  };

  // NEW: multi-language strings for the dynamic intake flow
  const intakeStrings = {
    phase2: {
      en: 'Phase 02 // Timeline',
      es: 'Fase 02 // Cronograma',
      de: 'Phase 02 // Zeitplan'
    },
    heading2: {
      en: 'Target Launch Window:',
      es: 'Ventana de lanzamiento:',
      de: 'Geplanter Launch-Zeitraum:'
    },
    timelinePills: {
      en: ['Under 30 Days', 'Next Quarter', 'Flexible'],
      es: ['Menos de 30 Días', 'Próximo Trimestre', 'Flexible'],
      de: ['Unter 30 Tagen', 'Nächstes Quartal', 'Flexibel']
    },
    placeholder2: {
      en: 'Select option or write timeline...',
      es: 'Seleccione una opción o escriba el cronograma...',
      de: 'Option wählen oder Zeitplan eingeben...'
    },
    phase3: {
      en: 'Phase 03 // Handshake',
      es: 'Fase 03 // Contacto',
      de: 'Phase 03 // Kontakt'
    },
    heading3: {
      en: 'Forwarding Address:',
      es: 'Dirección de contacto:',
      de: 'Kontaktadresse:'
    },
    emailPlaceholder: {
      en: 'your.email@company.com',
      es: 'tu.email@empresa.com',
      de: 'ihre.email@firma.de'
    },
    invalidEmail: {
      en: 'Please enter a valid email address.',
      es: 'Por favor, introduzca un correo válido.',
      de: 'Bitte geben Sie eine gültige E-Mail-Adresse ein.'
    },
    done: {
      en: 'Parameters Logged. We will be in touch.',
      es: 'Parámetros registrados. Nos pondremos en contacto.',
      de: 'Parameter erfasst. Wir melden uns.'
    },
    estTimelineLabel: { en: 'Est. Timeline', es: 'Plazo Estimado', de: 'Geschätzte Dauer' },
    estInvestmentLabel: { en: 'Est. Investment', es: 'Inversión Estimada', de: 'Geschätztes Budget' }
  };

  let currentLang = localStorage.getItem('lang') || 'en';
  let t = (obj) => obj[currentLang] || obj.en;
  
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";

  function initScramble() {
    document.querySelectorAll('[data-scramble]').forEach(el => {
      if (el.dataset.scrambleInit) return;
      if (!el.innerText || el.querySelector('br')) return; // skip elements containing HTML
      el.dataset.scrambleInit = 'true';
      const originalText = el.innerText;

      el.addEventListener('mouseenter', () => {
        if (reducedMotion) return;
        let iteration = 0;
        clearInterval(el.dataset.interval);

        el.dataset.interval = setInterval(() => {
          el.innerText = originalText.split("").map((letter, index) => {
            if (index < iteration) return originalText[index];
            return letters[Math.floor(Math.random() * letters.length)];
          }).join("");

          if (iteration >= originalText.length) clearInterval(el.dataset.interval);
          iteration += 1 / 2;
        }, 20);
      });
    });
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;
    document.title = translations.title[currentLang];

    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (translations[key] && translations[key][currentLang]) {
        el.innerHTML = translations[key][currentLang];
      }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (translations[key] && translations[key][currentLang]) {
        el.placeholder = translations[key][currentLang];
      }
    });

    // Keep estimate labels translated even after re-render
    const tlLabel = document.querySelector('#scopeEstimate .estimate-item:first-child .estimate-label');
    const invLabel = document.querySelector('#scopeEstimate .estimate-item:last-child .estimate-label');
    if (tlLabel) tlLabel.textContent = t(intakeStrings.estTimelineLabel);
    if (invLabel) invLabel.textContent = t(intakeStrings.estInvestmentLabel);
    
    initScramble();
  }

  window.setLang = function(lang, btn) {
    currentLang = lang;
    localStorage.setItem('lang', lang);

    document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');

    applyTranslations();
  }

  // Restore saved language + highlight correct button on load
  document.querySelectorAll('.lang-btn').forEach(b => {
    b.classList.toggle('active', b.textContent.trim().toLowerCase() === currentLang);
  });
  applyTranslations();

  // 5. Conversational Intake Flow — with persistence of answers + mailto handoff
  let step = 1;
  const collected = { scope: '', timeline: '', email: '' };
  const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

  window.selectPill = function(btn) {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById('intakeInputField').value = btn.innerText;

    // Indicator logic
    const indicator = document.getElementById('pillIndicator');
    if (indicator) {
      indicator.style.left = `${btn.offsetLeft}px`;
      indicator.style.width = `${btn.offsetWidth}px`;
      indicator.classList.add('visible');
    }

    // Estimate logic
    const estimatePanel = document.getElementById('scopeEstimate');
    const estTimeline = document.getElementById('estTimeline');
    const estInvestment = document.getElementById('estInvestment');
    const scope = btn.dataset.scope;

    if (estimatePanel && scope) {
      const units = { build: ['6–10', '4,000–8,000'], revamp: ['3–5', '2,000–4,500'], optimize: ['2–3', '1,500–3,000'] }[scope];
      estTimeline.innerHTML = `${units[0]} ${currentLang === 'es' ? 'semanas' : currentLang === 'de' ? 'Wochen' : 'weeks'}`;
      estInvestment.innerHTML = `€${units[1]}`;
      estimatePanel.classList.add('visible');

      // Auto-update the mailto link when scope chosen
      updateMailtoLink(btn.innerText.trim());
    }
  }

  function submitIntake() {
    const input = document.getElementById('intakeInputField');
    input.classList.remove('state-error');
    const val = input.value.trim();

    if (step === 1) {
      if (!val) { input.classList.add('state-error'); return; }
      collected.scope = val;
      renderTimelineStep();
      step = 2;

    } else if (step === 2) {
      if (!val) { input.classList.add('state-error'); return; }
      collected.timeline = val;
      renderEmailStep();
      step = 3;

    } else if (step === 3) {
      if (!EMAIL_RE.test(val)) {
        input.classList.add('state-error');
        alert(t(intakeStrings.invalidEmail));
        return;
      }
      collected.email = val;

      // Actually deliver the brief via mailto
      const subject = encodeURIComponent(`Project Brief — ${collected.scope}`);
      const body = encodeURIComponent(
        `Scope: ${collected.scope}\nTimeline: ${collected.timeline}\nContact email: ${collected.email}\n\n— Sent from aura website`
      );
      window.location.href = `mailto:AURA.AGENCY.VIGO2026@GMAIL.COM?subject=${subject}&body=${body}`;

      document.getElementById('intakePhase').textContent = currentLang === 'es' ? 'Completado' : currentLang === 'de' ? 'Abgeschlossen' : 'Complete';
      document.getElementById('intakeHeading').textContent = t(intakeStrings.done);
      document.getElementById('pillGroup').style.display = 'none';
      document.querySelector('.intake-input-wrapper').style.display = 'none';
    }
  }

  function renderTimelineStep() {
    document.getElementById('intakePhase').textContent = t(intakeStrings.phase2);
    document.getElementById('intakeHeading').textContent = t(intakeStrings.heading2);
    document.getElementById('pillGroup').innerHTML =
      t(intakeStrings.timelinePills).map(p =>
        `<button class="pill" data-onclick="selectPill(this)">${p}</button>`).join('');
    const input = document.getElementById('intakeInputField');
    input.value = '';
    input.placeholder = t(intakeStrings.placeholder2);
  }

  function renderEmailStep() {
    document.getElementById('intakePhase').textContent = t(intakeStrings.phase3);
    document.getElementById('intakeHeading').textContent = t(intakeStrings.heading3);
    document.getElementById('pillGroup').innerHTML = '';
    document.getElementById('scopeEstimate').classList.remove('visible');
    const input = document.getElementById('intakeInputField');
    input.value = '';
    input.placeholder = t(intakeStrings.emailPlaceholder);
    input.type = 'email';
  }

  document.getElementById('intakeInputField').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') submitIntake();
  });

  function updateMailtoLink(scope) {
    const subject = encodeURIComponent(`Project Inquiry: ${scope}`);
    const body = encodeURIComponent(
      `Hi Oscar,\n\nI am looking to start a project under the "${scope}" scope. Let's discuss requirements and timeline.\n\nBest,`
    );
    const contactSectionLink = document.querySelector('.footer-contact-section a[href^="mailto:"]');
    if (contactSectionLink) contactSectionLink.href = `mailto:AURA.AGENCY.VIGO2026@GMAIL.COM?subject=${subject}&body=${body}`;
  }

  // ─── SKIPER UI INTEGRATIONS ───

  // Velocity-aware Marquee
  if (!reducedMotion) {
    let lastScrollY = window.scrollY;
    const marqueeContainer = document.getElementById('velocityMarquee');
    if (marqueeContainer) {
      window.addEventListener('scroll', () => {
        const delta = Math.abs(window.scrollY - lastScrollY);
        lastScrollY = window.scrollY;

        let speed = Math.min(25, Math.max(8, 25 - (delta * 0.4)));
        marqueeContainer.style.setProperty('--marquee-speed', `${speed}s`);

        clearTimeout(marqueeContainer.scrollTimeout);
        marqueeContainer.scrollTimeout = setTimeout(() => {
          marqueeContainer.style.setProperty('--marquee-speed', '25s');
        }, 150);
      });
    }
  }

  // Magnetic CTA Buttons
  if (finePointer && !reducedMotion) {
    document.querySelectorAll('.magnetic-btn').forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const distanceX = e.clientX - (rect.left + rect.width / 2);
        const distanceY = e.clientY - (rect.top + rect.height / 2);
        btn.style.transform = `translate(${distanceX * 0.3}px, ${distanceY * 0.3}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });

      btn.addEventListener('mousedown', () => {
        const ripple = btn.querySelector('.ripple-effect');
        if (ripple) {
          ripple.classList.remove('active');
          void ripple.offsetWidth;
          ripple.classList.add('active');
        }
      });
    });
  }

  // Floating Dock Panel
  const dockExpandTrigger = document.getElementById('dockExpandTrigger');
  const dockPanel = document.getElementById('dockPanel');

  if (dockExpandTrigger && dockPanel) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight * 0.5) {
        dockExpandTrigger.classList.add('visible');
      } else {
        dockExpandTrigger.classList.remove('visible');
        dockPanel.classList.remove('open');
      }
    });

    dockExpandTrigger.addEventListener('click', () => {
      dockPanel.classList.toggle('open');
    });
  }
  // ═══════════════════════════════════════════════════════════
  //  AURA ATMOSPHERE — Multi-Depth Data Rain Engine
  //  Three parallax planes · luminance falloff · DPR-aware
  // ═══════════════════════════════════════════════════════════
  (function initAuraAtmosphere() {
    const canvas = document.getElementById('matrixCanvas');
    if (!canvas) return;
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let isMuted = false;
    const muteBtn = document.getElementById('muteRainBtn');
    if (muteBtn) {
      muteBtn.addEventListener('click', () => {
        isMuted = !isMuted;
        muteBtn.style.opacity = isMuted ? '0.3' : '1';
        if (isMuted) {
          canvas.classList.remove('revealed');
          setTimeout(() => {
            if (isMuted && rafId) {
              cancelAnimationFrame(rafId);
              rafId = null;
            }
          }, 2400); // Wait for transition
        } else {
          canvas.classList.add('revealed');
          if (!rafId) {
            lastTime = performance.now();
            rafId = requestAnimationFrame(frame);
          }
        }
      });
    }

    const ctx = canvas.getContext('2d', { alpha: false });
    const DPR = Math.min(window.devicePixelRatio || 1, 2); // cap for perf

    // ── Palette (locked to brand) ──
    const COLORS = {
      bg:      '#1c0f1b',
      lead:    '#e9d5ff',   // bright head glyph
      body:    'rgba(168, 85, 247, 0.55)',  // trail body — brand purple
      far:     'rgba(192, 132, 252, 0.18)', // distant plane — barely there
      accent:  'rgba(0, 240, 255, 0.9)',    // rare HUD-cyan accent
      accentChance: 0.02
    };

    // ── Depth planes: far = slow & dim, near = fast & bright ──
    const PLANES = [
      { speed: 0.35, fontSize: 12, opacity: 0.25, density: 0.06, blur: 0   },
      { speed: 0.65, fontSize: 16, opacity: 0.55, density: 0.10, blur: 0   },
      { speed: 1.15, fontSize: 22, opacity: 0.95, density: 0.14, blur: 0.5 }
    ];

    const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノ0123456789';
    let streams = [];
    let W = 0, H = 0;
    let scrollVelocity = 0;
    let lastScrollY = window.scrollY;

    // ── Stream model: each column is an independent entity with
    //    its own lifecycle (spawn → fall → die), not an infinite loop.
    //    This produces organic, uneven density — the key to "expensive" feel.
    function buildStreams() {
      W = canvas.width;
      H = canvas.height;
      streams = [];
      PLANES.forEach((plane, pi) => {
        const cols = Math.ceil(W / (plane.fontSize * 1.6)); // 1.6 = horizontal breathing room
        for (let c = 0; c < cols; c++) {
          if (Math.random() < 1 - plane.density * 8) continue; // sparse seeding
          streams.push(spawnStream(pi, plane, c, true));
        }
      });
    }

    function spawnStream(planeIdx, plane, col, initial) {
      const glyphCount = 8 + Math.floor(Math.random() * 18); // stream length varies
      return {
        plane: planeIdx,
        col: col,
        x: col * plane.fontSize * 1.6,
        y: initial
          ? Math.random() * H * -1.5            // pre-scatter above viewport
          : -glyphCount * plane.fontSize,
        glyphs: glyphCount,
        speed: plane.speed * (22 + Math.random() * 30), // px/sec, per-stream variance
        life: 0,
        maxLife: 300 + Math.random() * 400,    // frames before respawn elsewhere
        chars: Array.from({ length: glyphCount }, () =>
          CHARS[Math.floor(Math.random() * CHARS.length)])
      };
    }

    function resize() {
      canvas.width  = W = Math.floor(window.innerWidth * DPR);
      canvas.height = H = Math.floor(window.innerHeight * DPR);
      canvas.style.width  = window.innerWidth + 'px';
      canvas.style.height = window.innerHeight + 'px';
      buildStreams();
      // Paint base
      ctx.fillStyle = COLORS.bg;
      ctx.fillRect(0, 0, W, H);
    }

    // Pre-render glow sprite for the head glyph — avoids shadowBlur per frame
    // (shadowBlur is the #1 canvas perf killer; sprites are ~10x faster)
    const headSprite = document.createElement('canvas');
    function buildHeadSprite(size, color, glowColor) {
      const pad = size * 2;
      headSprite.width = headSprite.height = pad * 2;
      const c = headSprite.getContext('2d');
      c.font = `${size}px 'Space Grotesk', monospace`;
      c.textAlign = 'center';
      c.textBaseline = 'middle';
      c.shadowColor = glowColor;
      c.shadowBlur = size * 1.2;
      c.fillStyle = color;
      c.fillText('0', pad, pad);
      return headSprite;
    }

    let lastTime = performance.now();
    let rafId = null;
    function frame(now) {
      if (isMuted && !canvas.classList.contains('revealed') && window.getComputedStyle(canvas).opacity === '0') {
         // Stop rendering fully if muted and faded out
         return;
      }
      
      const dt = Math.min((now - lastTime) / 1000, 0.05); // clamp for tab-switch
      lastTime = now;

      // Scroll-reactive: scrolling accelerates the world slightly
      const scrollDelta = Math.abs(window.scrollY - lastScrollY);
      lastScrollY = window.scrollY;
      const velocityBoost = 1 + Math.min(scrollDelta * 0.02, 0.8);

      // Fade pass — translucent bg paint for trails
      ctx.fillStyle = 'rgba(28, 15, 27, 0.08)';
      ctx.fillRect(0, 0, W, H);

      for (let i = streams.length - 1; i >= 0; i--) {
        const s = streams[i];
        const plane = PLANES[s.plane];
        s.life++;
        s.y += s.speed * dt * 60 * velocityBoost;

        const headY = s.y;
        const fadeEdge = Math.min(s.life / 40, 1) * // fade-in on spawn
                         Math.min((s.maxLife - s.life) / 40, 1); // fade-out on death

        if (fadeEdge <= 0) {
          streams.splice(i, 1);
          // Respawn in a random column on a random plane
          const pi = Math.floor(Math.random() * PLANES.length);
          const p = PLANES[pi];
          streams.push(spawnStream(pi, p, Math.floor(Math.random() * (W / (p.fontSize * 1.6))), false));
          continue;
        }

        // Draw glyphs from tail to head
        ctx.font = `${plane.fontSize * DPR}px monospace`;
        for (let g = 0; g < s.chars.length; g++) {
          const gy = headY - g * plane.fontSize * DPR;
          if (gy < -plane.fontSize || gy > H) continue;

          if (g === 0) {
            // Head: bright, glowing
            ctx.globalAlpha = plane.opacity * fadeEdge;
            ctx.shadowColor = plane.blur ? 'rgba(168, 85, 247, 0.8)' : 'transparent';
            ctx.shadowBlur = plane.blur ? 10 : 0;
            ctx.fillStyle = s.life % 180 < 6 ? COLORS.accent : COLORS.lead;
            ctx.fillText(s.chars[g], s.x, gy);
            ctx.shadowBlur = 0;
          } else {
            // Body: dim trail, fading with distance from head
            const trailFade = 1 - g / s.chars.length;
            ctx.globalAlpha = plane.opacity * fadeEdge * trailFade * 0.5;
            ctx.fillStyle = COLORS.body;
            ctx.fillText(s.chars[g], s.x, gy);
          }
        }
        ctx.globalAlpha = 1;
      }

      rafId = requestAnimationFrame(frame);
    }

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = null;
      } else if (!rafId && !isMuted) {
        lastTime = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    });

    let resizeTimeout;
    window.addEventListener('resize', () => {
      cancelAnimationFrame(rafId);
      rafId = null;
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        resize();
        if (!isMuted) {
            rafId = requestAnimationFrame(frame);
        }
      }, 200);
    });

    window.addEventListener('load', () => {
      resize();
      // Cinematic reveal — rain fades in after first paint
      setTimeout(() => { if(!isMuted) canvas.classList.add('revealed') }, 400);
      rafId = requestAnimationFrame(frame);
    });
    
    // Pointer response
    window.addEventListener('click', (e) => {
      if (isMuted) return;
      const p = PLANES[1];
      streams.push(spawnStream(1, p, Math.floor(e.clientX / (p.fontSize * 1.6)), false));
      streams[streams.length - 1].y = e.clientY - 200;
    });

  })();
  }, []);

  return (
    <>
        <canvas id="matrixCanvas"></canvas>
  {/**/}
  <div className="hud-frame">
    <div className="hud-edge-top"></div>
    <div className="hud-edge-bottom"></div>
    <div className="hud-edge-left"></div>
    <div className="hud-edge-right"></div>
    <div className="hud-corner tl"></div>
    <div className="hud-corner tr"></div>
    <div className="hud-corner bl"></div>
    <div className="hud-corner br"></div>
    <div className="hud-stream-top"></div>
    <div className="hud-stream-bottom"></div>
    <div className="hud-stream-left"></div>
    <div className="hud-stream-right"></div>
    <div className="hud-glow g1"></div>
    <div className="hud-glow g2"></div>
    <div className="hud-glow g3"></div>
    <div className="hud-glow g4"></div>
    <div className="hud-scanline"></div>
  </div>
  <div style={{position: "fixed", top: "0", left: "0", padding: "1.5rem 2rem", zIndex: "100"}}>
      <div className="lang-switcher">
        <button className="lang-btn active" data-onclick="setLang('en')">EN</button>
        <button className="lang-btn" data-onclick="setLang('es')">ES</button>
        <button className="lang-btn" data-onclick="setLang('de')">DE</button>
      </div>
  </div>


  <div id="cursor-dot"></div>
  <div id="cursor-ring"></div>

  <div className="bg-grid"></div>
  <div className="grain"></div>

  <div className="dock-container">
    <nav className="dock" id="dynamicDock">

      <button className="dock-expand-trigger" id="dockExpandTrigger" aria-label="Quick Contact">⚡</button>
      <a href="#hero" className="dock-item" data-i18n="nav_1">Home</a>
      <a href="#architect" className="dock-item" data-i18n="nav_2">About</a>
      <a href="#solutions" className="dock-item" data-i18n="nav_3">Services</a>
      <button className="dock-item" id="muteRainBtn" aria-label="Toggle Atmosphere" style={{background: "none", border: "none", font: "inherit", cursor: "none"}}>🌧️</button>
      <a href="#contact" className="shimmer-btn magnetic-btn">
        <span className="shimmer-btn-bg"></span>
        <span className="ripple-effect"></span>
        <span className="shimmer-btn-content">Launch Brief &rarr;</span>
      </a>
    </nav>
    <div className="dock-panel" id="dockPanel">
      <div className="dock-panel-title">// Quick Contact</div>
      <div className="dock-panel-links">
        <a href="tel:+34667681128" className="dock-panel-link">
          <div className="dp-icon">✆</div>
          <div className="dp-text">+34 667 681 128</div>
        </a>
        <a href="mailto:AURA.AGENCY.VIGO2026@GMAIL.COM" className="dock-panel-link">
          <div className="dp-icon">✉</div>
          <div className="dp-text">AURA.AGENCY.VIGO2026@GMAIL.COM</div>
        </a>
        <a href="#contact" className="dock-panel-link" data-onclick="document.getElementById('dockPanel').classList.remove('open')">
          <div className="dp-icon">→</div>
          <div className="dp-text">CONFIGURE PROJECT BRIEF</div>
        </a>
      </div>
    </div>
  </div>

  <main>
    <section id="hero" className="hero">
      <div className="liquid-bg">
        <div className="liquid-blob blob-1"></div>
        <div className="liquid-blob blob-2"></div>
        <div className="liquid-blob blob-3"></div>
      </div>
      <div className="hero-content float-1" style={{ zIndex: 1, position: "relative" }}>
        <div className="badge">
          <span className="badge-indicator"></span>
          <span data-i18n="hero_badge">AURA AGENCY // OSCAR OTERO ALVAREZ</span>
        </div>
        <h1 className="hero-title" data-i18n="hero_title">Creative Web Design.</h1>
        <p className="hero-desc" data-i18n="hero_desc">
          Crafting bespoke websites and upgrading existing platforms with beautiful layouts. Built for brands that demand memorable digital experiences.
        </p>
        <div className="hero-actions">
          <a href="#contact" className="shimmer-btn magnetic-btn">
            <span className="shimmer-btn-bg"></span>
            <span className="ripple-effect"></span>
            <span className="shimmer-btn-content" data-i18n="hero_btn_1">Start a Project</span>
          </a>
          <a href="#solutions" className="btn-glass" data-i18n="hero_btn_2">View Capabilities</a>
        </div>
      </div>
    </section>

    <div className="marquee-container" id="velocityMarquee">
      <div className="marquee-track">
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M12 2L2 19h20L12 2zm0 3l7.5 13h-15L12 5z"/></svg>Modern Design</span></div>
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M12 6.036c-3.318 0-6.037 2.72-6.037 6.037s2.72 6.036 6.037 6.036 6.036-2.72 6.036-6.036S15.318 6.036 12 6.036z"/></svg>Creative UI</span></div>
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm3.5 7.5L12 8l3.5 4.5h-7z"/></svg>Smooth Animations</span></div>
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M21 14.5c0 1.38-1.12 2.5-2.5 2.5S16 15.88 16 14.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zM8 14.5c0 1.38-1.12 2.5-2.5 2.5S3 15.88 3 14.5 4.12 12 5.5 12 8 13.12 8 14.5z"/></svg>Visual Storytelling</span></div>
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z"/></svg>Engaging Layouts</span></div>
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M15.332 8.668a3.333 3.333 0 100 6.665 3.333 3.333 0 000-6.665zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/></svg>User-Centric</span></div>
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M12 2L2 19.5h20L12 2zm0 4l6.5 11.5h-13L12 6z"/></svg>Inspiring Visuals</span></div>
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>Fluid Experience</span></div>
        {/**/}
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M12 2L2 19h20L12 2zm0 3l7.5 13h-15L12 5z"/></svg>Modern Design</span></div>
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M12 6.036c-3.318 0-6.037 2.72-6.037 6.037s2.72 6.036 6.037 6.036 6.036-2.72 6.036-6.036S15.318 6.036 12 6.036z"/></svg>Creative UI</span></div>
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M3 3h18v18H3V3zm2 2v14h14V5H5zm3.5 7.5L12 8l3.5 4.5h-7z"/></svg>Smooth Animations</span></div>
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M21 14.5c0 1.38-1.12 2.5-2.5 2.5S16 15.88 16 14.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5zM8 14.5c0 1.38-1.12 2.5-2.5 2.5S3 15.88 3 14.5 4.12 12 5.5 12 8 13.12 8 14.5z"/></svg>Visual Storytelling</span></div>
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93z"/></svg>Engaging Layouts</span></div>
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M15.332 8.668a3.333 3.333 0 100 6.665 3.333 3.333 0 000-6.665zM12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z"/></svg>User-Centric</span></div>
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M12 2L2 19.5h20L12 2zm0 4l6.5 11.5h-13L12 6z"/></svg>Inspiring Visuals</span></div>
        <div className="marquee-item"><span className="marquee-badge"><svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z"/></svg>Fluid Experience</span></div>
      </div>
    </div>

    <section id="architect" className="about-section">
      <div className="about-container">
        <div className="about-image-wrapper">
          <img src="hero_bg.jpg" alt="Oscar Otero Alvarez - Web About" className="about-image float-3" />
        </div>
        <div className="about-content float-1">
          <div className="badge" data-i18n="about_badge">Lead Web Designer</div>
          <h2 className="section-title" data-scramble>Oscar Otero Alvarez.</h2>
          <p className="about-desc" data-i18n="about_desc">
            Visionary designer and engineer behind Aura Agency. Specializing in highly interactive, futuristic web experiences tailored for creative brands and modern businesses. By fusing visual fidelity with deep technical optimization, I build platforms that define the digital edge.
          </p>
        </div>
      </div>
    </section>

    <section id="solutions" className="bento-section">
      <div className="section-header">
        <div className="badge" data-i18n="solutions_badge">Our Services</div>
        <h2 className="section-title" data-scramble data-i18n="solutions_title">Designed with Passion.</h2>
      </div>

      <div className="bento-grid float-2">
        <div className="bento-card bento-7">
          <div className="card-shine"></div>
          <div className="card-specular"></div>
          <div>
            <h3 data-i18n="card1_title">Modern Web Builds</h3>
            <p data-i18n="card1_desc">Building modern websites from the ground up with instant performance, clean code base, and striking futuristic visuals.</p>
          </div>
          <div className="card-action-badge" data-i18n="card1_tag2">NEXT-GEN STACK →</div>
        </div>

        <div className="bento-card bento-5">
          <div className="card-shine"></div>
          <div className="card-specular"></div>
          <div>
            <h3 data-i18n="card2_title">Next-Level Revamps</h3>
            <p data-i18n="card2_desc">Upgrading your current website with fluid micro-interactions, modern responsive layouts, and cutting-edge design techniques.</p>
          </div>
          <div className="card-action-badge" data-i18n="card2_tag2">MODERN UPGRADES →</div>
        </div>

        <div className="bento-card bento-12">
          <div className="card-shine"></div>
          <div className="card-specular"></div>
          <div>
            <h3 data-i18n="card3_title">Conversion & Performance</h3>
            <p data-i18n="card3_desc">Re-engineering user interfaces and optimizing performance metrics to seamlessly turn visitors into loyal clients.</p>
          </div>
          <div className="card-action-badge" data-i18n="card3_tag2">HIGH CONVERSION →</div>
        </div>
      </div>
    </section>

    <section id="contact" className="intake-section">
      <div className="intake-box float-2">
        <div className="step-tag" id="intakePhase" data-i18n="intake_phase">Phase 01 // Configuration</div>
        <h3 className="intake-title" id="intakeHeading" data-i18n="intake_heading">Select your project scope:</h3>

        <div className="pill-group" id="pillGroup">
          <div className="pill-indicator" id="pillIndicator"></div>
          <button className="pill scope-option" data-data-onclick="selectPill" data-scope="build" data-i18n="pill_1">New Website Build</button>
          <button className="pill scope-option" data-data-onclick="selectPill" data-scope="revamp" data-i18n="pill_2">Website Upgrade / Revamp</button>
          <button className="pill scope-option" data-data-onclick="selectPill" data-scope="optimize" data-i18n="pill_3">Performance Optimization</button>
        </div>

        <div className="scope-estimate" id="scopeEstimate">
          <div className="estimate-panel">
            <div className="estimate-item">
              <span className="estimate-label">Est. Timeline</span>
              <span className="estimate-value" id="estTimeline">—</span>
            </div>
            <div className="estimate-item">
              <span className="estimate-label">Est. Investment</span>
              <span className="estimate-value" id="estInvestment">—</span>
            </div>
          </div>
        </div>

        <div className="intake-input-wrapper">
          <input type="text" id="intakeInputField" placeholder="Type or select an option above..." data-i18n-placeholder="input_placeholder" autoComplete="off" />
          <button className="intake-btn" data-onclick="submitIntake()">&rarr;</button>
        </div>
      </div>
    </section>




    {/**/}
    <section id="footer-contact" className="footer-contact-section">
      <div className="footer-contact-container">
        <div className="contact-center-layout">
          
          {/**/}
          <div className="contact-image-wrapper">
            <img src="aura_card.jpg" alt="Oscar Otero Alvarez - Aura Agency" />
            <div className="contact-image-gradient"></div>
          </div>
          
          {/**/}
          <div className="contact-info-centered">


            <p className="contact-bio" data-i18n="contact_bio">Designing & engineering high-performance web platforms for creative brands. Based in Vigo, Spain — available worldwide.</p>
            
            <div className="contact-links-v2">
              <a href="tel:+34667681128" className="contact-link-row">
                <div className="link-icon-v2">✆</div>
                <div className="link-details">
                  <span className="link-label">Phone</span>
                  <span className="link-value">+34 667 681 128</span>
                </div>
                <div className="link-sweep"></div>
              </a>
              <a href="mailto:AURA.AGENCY.VIGO2026@GMAIL.COM" className="contact-link-row">
                <div className="link-icon-v2">✉</div>
                <div className="link-details">
                  <span className="link-label">Email</span>
                  <span className="link-value">AURA.AGENCY.VIGO2026@GMAIL.COM</span>
                </div>
                <div className="link-sweep"></div>
              </a>
            </div>
          </div>
          
        </div>
      </div>
      
      {/**/}
      <footer className="site-footer" style={{textAlign: "center", padding: "2rem 0", color: "rgba(255,255,255,0.4)", fontFamily: "var(--font-mono)", fontSize: "0.8rem"}}>
        <p>&copy; 2026 all rights reserved.</p>
      </footer>
    </section>
  </main>

    </>
  );
}
