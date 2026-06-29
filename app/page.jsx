'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

export default function Home() {
  useEffect(() => {
    // Image fade-in (also catches images already loaded before hydration)
    document.querySelectorAll('img').forEach((im) => {
      if (im.complete) im.classList.add('ld');
      else im.addEventListener('load', () => im.classList.add('ld'));
    });

    // Particles
    const pc = document.getElementById('particles');
    if (pc && !pc.childElementCount) {
      for (let i = 0; i < 12; i++) {
        const p = document.createElement('div');
        p.className = 'ptc';
        p.style.left = Math.random() * 100 + '%';
        p.style.animationDuration = 10 + Math.random() * 15 + 's';
        p.style.animationDelay = Math.random() * 10 + 's';
        const s = 2 + Math.random() * 3;
        p.style.width = s + 'px';
        p.style.height = s + 'px';
        p.style.background = Math.random() > 0.5 ? '#7C3AED' : '#D4A843';
        pc.appendChild(p);
      }
    }

    // Nav scroll
    const nav = document.getElementById('nav');
    const onScroll = () => nav && nav.classList.toggle('nav-scrolled', window.scrollY > 80);
    addEventListener('scroll', onScroll, { passive: true });

    // Mobile menu (accessible)
    const ham = document.getElementById('hamburger');
    const mm = document.getElementById('mm');
    let mmOpen = false;
    const setMM = (open) => {
      mmOpen = open;
      mm.classList.toggle('open', open);
      mm.setAttribute('aria-hidden', String(!open));
      ham.setAttribute('aria-expanded', String(open));
      ham.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      document.body.style.overflow = open ? 'hidden' : '';
      document.getElementById('m1').style.transform = open ? 'rotate(45deg) translate(4px,4px)' : '';
      document.getElementById('m2').style.opacity = open ? '0' : '1';
      document.getElementById('m3').style.transform = open ? 'rotate(-45deg) translate(4px,-4px)' : '';
      document.getElementById('m3').style.width = open ? '1.5rem' : '1rem';
      if (open) mm.querySelector('a').focus();
      else ham.focus();
    };
    const toggleMM = () => setMM(!mmOpen);
    if (ham) ham.addEventListener('click', toggleMM);
    const mmLinks = mm ? [...mm.querySelectorAll('a')] : [];
    const closeMM = () => setMM(false);
    mmLinks.forEach((a) => a.addEventListener('click', closeMM));
    const onKey = (e) => {
      if (e.key === 'Escape' && mmOpen) setMM(false);
    };
    addEventListener('keydown', onKey);

    // Scroll reveal
    const io = new IntersectionObserver(
      (es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('a'); io.unobserve(en.target); } }),
      { rootMargin: '0px 0px -80px 0px' }
    );
    document.querySelectorAll('.rv,.rl,.rr').forEach((e) => io.observe(e));

    // Scroll-spy nav highlight
    const navLinks = [...document.querySelectorAll('.nl[href^="#"]')];
    const spy = new IntersectionObserver(
      (es) => es.forEach((en) => {
        if (en.isIntersecting) {
          const id = '#' + en.target.id;
          navLinks.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === id));
        }
      }),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ['philosophy', 'process', 'team', 'location'].forEach((id) => {
      const s = document.getElementById(id);
      if (s) spy.observe(s);
    });

    // Hero stat counters
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches;
    const stats = [...document.querySelectorAll('.stat')];
    if (!reduce) stats.forEach((s) => (s.textContent = '0' + (s.dataset.suffix || '')));
    const countUp = (el) => {
      const to = +el.dataset.to, suf = el.dataset.suffix || '';
      if (reduce) { el.textContent = to + suf; return; }
      const dur = 1400, t0 = performance.now();
      requestAnimationFrame(function tick(now) {
        const p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * e) + suf;
        if (p < 1) requestAnimationFrame(tick);
      });
    };
    const cio = new IntersectionObserver(
      (es) => es.forEach((en) => { if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); } }),
      { threshold: 0.6 }
    );
    stats.forEach((s) => cio.observe(s));

    // Reservation form
    const form = document.getElementById('reserveForm');
    const toast = document.getElementById('toast');
    const showToast = (m) => {
      const t = document.getElementById('toastMsg');
      if (t) t.textContent = m;
      toast.classList.add('show');
      setTimeout(() => toast.classList.remove('show'), 3000);
    };
    const onSubmit = (e) => {
      e.preventDefault();
      showToast('Reservation submitted! Check your email for confirmation.');
      form.reset();
    };
    if (form) form.addEventListener('submit', onSubmit);

    // Team card tilt
    const tilts = [...document.querySelectorAll('.team-card')];
    const handlers = tilts.map((c) => {
      const move = (e) => {
        const r = c.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
        const rx = (y - r.height / 2) / 25, ry = (r.width / 2 - x) / 25;
        c.style.transform = `translateY(-8px) perspective(800px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      };
      const leave = () => { c.style.transform = ''; };
      c.addEventListener('mousemove', move);
      c.addEventListener('mouseleave', leave);
      return [c, move, leave];
    });

    return () => {
      removeEventListener('scroll', onScroll);
      removeEventListener('keydown', onKey);
      if (ham) ham.removeEventListener('click', toggleMM);
      mmLinks.forEach((a) => a.removeEventListener('click', closeMM));
      io.disconnect(); spy.disconnect(); cio.disconnect();
      if (form) form.removeEventListener('submit', onSubmit);
      handlers.forEach(([c, m, l]) => { c.removeEventListener('mousemove', m); c.removeEventListener('mouseleave', l); });
    };
  }, []);

  return (
    <>
      <div id="particles" className="fixed inset-0 pointer-events-none z-0"></div>

      {/* NAV */}
      <nav id="nav" className="fixed top-0 left-0 right-0 z-50 py-5 px-6 transition-all duration-500 border-b border-transparent" style={{ background: 'rgba(3,3,4,.4)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="relative w-11 h-11 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 44 44" fill="none" style={{ transform: 'rotate(-125deg)' }} aria-hidden="true">
                <circle className="logo-enso" cx="22" cy="22" r="19" stroke="url(#ensoNav)" strokeWidth="1.6" strokeLinecap="round" />
                <defs><linearGradient id="ensoNav" x1="3" y1="3" x2="41" y2="41" gradientUnits="userSpaceOnUse"><stop stopColor="#7C3AED" /><stop offset="1" stopColor="#D4A843" /></linearGradient></defs>
              </svg>
              <span className="font-serif text-dp text-xl leading-none relative" style={{ textShadow: '0 0 20px rgba(124,58,237,.5)' }}>龍</span>
            </span>
            <div className="hidden sm:block">
              <span className="text-sm font-bold tracking-[.25em] uppercase">Purple Dragon</span>
              <span className="block text-[8px] tracking-[.35em] text-dl/50 uppercase font-medium">紫龍 · Omakase · Cologne</span>
            </div>
          </Link>
          <div className="hidden md:flex items-center gap-10">
            <a href="#philosophy" className="nl text-[13px] font-medium text-gray-400 hover:text-white transition-colors">Philosophy</a>
            <a href="#process" className="nl text-[13px] font-medium text-gray-400 hover:text-white transition-colors">The Craft</a>
            <a href="#team" className="nl text-[13px] font-medium text-gray-400 hover:text-white transition-colors">Team</a>
            <a href="#location" className="nl text-[13px] font-medium text-gray-400 hover:text-white transition-colors">Find Us</a>
            <Link href="/menu" className="nl text-[13px] font-medium text-gray-400 hover:text-white transition-colors">Menu</Link>
            <a href="#reserve" className="cta-g px-6 py-2.5 rounded-full ce"><span className="text-[11px] font-bold tracking-[.2em] uppercase text-black">Book a Table</span></a>
          </div>
          <button id="hamburger" aria-label="Open menu" aria-expanded="false" aria-controls="mm" className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 relative z-50" type="button">
            <span className="w-6 h-[1.5px] bg-white transition-all duration-300" id="m1"></span>
            <span className="w-6 h-[1.5px] bg-white transition-all duration-300" id="m2"></span>
            <span className="w-4 h-[1.5px] bg-white transition-all duration-300 ml-auto" id="m3"></span>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <div id="mm" role="dialog" aria-modal="true" aria-label="Site menu" aria-hidden="true" className="mobile-menu fixed inset-0 z-40 bg-bg/[.98] backdrop-blur-2xl flex flex-col items-center justify-center gap-8">
        <a href="#philosophy" className="text-3xl font-serif text-white">Philosophy</a>
        <a href="#process" className="text-3xl font-serif text-white">The Craft</a>
        <a href="#team" className="text-3xl font-serif text-white">Team</a>
        <a href="#location" className="text-3xl font-serif text-white">Find Us</a>
        <Link href="/menu" className="text-3xl font-serif text-white">Menu</Link>
        <a href="#reserve" className="mt-4 cta-g px-8 py-3 rounded-full"><span className="text-sm font-bold tracking-[.2em] uppercase text-black">Book a Table</span></a>
      </div>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=1920&h=1080&fit=crop&q=80" alt="" className="w-full h-full object-cover opacity-20" fetchPriority="high" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/60 to-bg"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-bg/80 via-transparent to-bg/80"></div>
        </div>
        <svg className="absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] z-0" viewBox="0 0 400 400" fill="none">
          <path className="ep" d="M200 60C110 60,40 140,45 220C50 300,120 360,200 350C280 340,355 280,350 200C345 120,280 65,210 68" stroke="url(#eg)" strokeWidth="1.5" strokeLinecap="round" />
          <defs><linearGradient id="eg" x1="0" y1="0" x2="400" y2="400"><stop offset="0%" stopColor="#7C3AED" /><stop offset="100%" stopColor="#D4A843" /></linearGradient></defs>
        </svg>
        <div className="absolute top-24 left-[8%] text-[8rem] md:text-[12rem] font-serif text-white dfl select-none pointer-events-none z-0" style={{ opacity: 0.025, lineHeight: 1 }}>紫</div>
        <div className="absolute bottom-[15%] right-[6%] text-[10rem] md:text-[14rem] font-serif text-white dfd select-none pointer-events-none z-0" style={{ opacity: 0.02, lineHeight: 1 }}>龍</div>
        <div className="relative z-10 text-center max-w-5xl px-6">
          <div className="overflow-hidden mb-6"><p className="text-[10px] md:text-xs tracking-[.5em] uppercase font-medium hc hd1" style={{ color: '#D4A843' }}>✦ Cologne, Germany · Two Michelin Stars ✦</p></div>
          <div className="overflow-hidden"><h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-display font-bold leading-[.85] tracking-tighter hc hd2">Purple</h1></div>
          <div className="overflow-hidden mt-1"><h1 className="text-6xl md:text-[8rem] lg:text-[10rem] font-display italic leading-[.85] tracking-tighter hc hd3"><span className="gs">Dragon</span></h1></div>
          <div className="overflow-hidden mt-3"><p className="text-base md:text-xl text-gray-400 font-light max-w-xl mx-auto leading-relaxed hc hd4">Where ancient tradition ascends into art.<br className="hidden md:block" />An omakase experience beyond imagination.</p></div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12 fu fd1">
            <a href="#reserve" className="cta-g px-10 py-4 rounded-full ce shadow-lg shadow-gold/10"><span className="text-[12px] font-bold tracking-[.25em] uppercase text-black">Book a Table</span></a>
            <Link href="/menu" className="px-10 py-4 border border-white/15 text-white text-[12px] font-bold tracking-[.25em] uppercase rounded-full hover:bg-white/5 hover:border-dp/30 transition-all duration-500">Explore Menu</Link>
          </div>
          <div className="flex items-center justify-center gap-10 mt-16 fu fd2">
            <div className="text-center"><p className="stat text-3xl md:text-4xl font-display font-bold gs" data-to="10">10</p><p className="text-[9px] tracking-[.25em] uppercase text-gray-600 mt-1">Counter Seats</p></div>
            <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom,transparent,rgba(124,58,237,.3),transparent)' }}></div>
            <div className="text-center"><p className="stat text-3xl md:text-4xl font-display font-bold gs" data-to="20">20</p><p className="text-[9px] tracking-[.25em] uppercase text-gray-600 mt-1">Courses</p></div>
            <div className="w-px h-10" style={{ background: 'linear-gradient(to bottom,transparent,rgba(124,58,237,.3),transparent)' }}></div>
            <div className="text-center"><p className="stat text-3xl md:text-4xl font-display font-bold gs" data-to="2" data-suffix="★">2★</p><p className="text-[9px] tracking-[.25em] uppercase text-gray-600 mt-1">Michelin</p></div>
          </div>
        </div>
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 fu fd3">
          <span className="text-[9px] tracking-[.35em] uppercase text-gray-700">Discover</span>
          <div className="w-5 h-8 border border-white/10 rounded-full flex justify-center pt-1.5"><div className="w-1 h-2 bg-dp/60 rounded-full" style={{ animation: 'sp 2s ease-in-out infinite' }}></div></div>
        </div>
      </section>

      {/* PHILOSOPHY */}
      <section id="philosophy" className="py-36 px-6">
        <div className="max-w-5xl mx-auto text-center rv">
          <span className="text-[10px] tracking-[.5em] uppercase font-medium" style={{ color: '#D4A843' }}>紫龍の哲学</span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold mt-6 leading-[1.15] tracking-tight">The dragon does not chase —<br /><span className="italic text-gray-500">it commands the moment.</span></h2>
          <p className="text-gray-500 font-light text-lg md:text-xl mt-8 max-w-2xl mx-auto leading-relaxed">At Purple Dragon, we don&apos;t just serve sushi — we orchestrate an experience rooted in centuries of Edomae tradition, reimagined for the modern palate. Every grain of rice, every cut of fish, every moment of silence at the counter is intentional.</p>
        </div>
      </section>

      {/* THREE PILLARS */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          <div className="rl group relative rounded-3xl overflow-hidden border border-white/5 aspect-[3/4] cursor-pointer">
            <img src="https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=600&h=800&fit=crop&q=80" alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-[10px] tracking-[.3em] uppercase font-medium" style={{ color: '#D4A843' }}>Purity</span>
              <h3 className="text-2xl font-display font-bold mt-2">Only the Finest</h3>
              <p className="text-sm text-gray-500 mt-2">Fish sourced daily from Tsukiji, flown to Cologne within 18 hours of catch.</p>
            </div>
          </div>
          <div className="rv group relative rounded-3xl overflow-hidden border border-white/5 aspect-[3/4] cursor-pointer" style={{ transitionDelay: '150ms' }}>
            <img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=600&h=800&fit=crop&q=80" alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-[10px] tracking-[.3em] uppercase font-medium" style={{ color: '#D4A843' }}>Precision</span>
              <h3 className="text-2xl font-display font-bold mt-2">The Chef&apos;s Hand</h3>
              <p className="text-sm text-gray-500 mt-2">30 years of discipline. Every nigiri formed in 3 seconds, perfected over a lifetime.</p>
            </div>
          </div>
          <div className="rr group relative rounded-3xl overflow-hidden border border-white/5 aspect-[3/4] cursor-pointer" style={{ transitionDelay: '300ms' }}>
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&h=800&fit=crop&q=80" alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/30 to-transparent"></div>
            <div className="absolute bottom-8 left-8 right-8">
              <span className="text-[10px] tracking-[.3em] uppercase font-medium" style={{ color: '#D4A843' }}>Intimacy</span>
              <h3 className="text-2xl font-display font-bold mt-2">The Sanctuary</h3>
              <p className="text-sm text-gray-500 mt-2">Hinoki counter, 10 seats. A dialogue between chef and guest — nothing between.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto"></div>

      {/* PROCESS */}
      <section id="process" className="py-32 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20 rv">
            <span className="text-[10px] tracking-[.5em] uppercase font-medium" style={{ color: '#D4A843' }}>The Craft</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mt-4">From Ocean to<br /><span className="italic text-dl/60">your plate</span></h2>
            <p className="text-gray-500 font-light mt-4 max-w-lg mx-auto">Every piece of sushi at Purple Dragon follows a rigorous journey — a process refined over generations.</p>
          </div>
          <div className="relative">
            <div className="process-line hidden md:block"></div>
            <div className="space-y-24">
              <div className="grid md:grid-cols-2 gap-12 items-center rv">
                <div className="md:text-right order-2 md:order-1">
                  <span className="text-5xl font-display font-bold text-dp/20">01</span>
                  <h3 className="text-2xl font-display font-bold mt-2">Sourcing &amp; Selection</h3>
                  <p className="text-gray-500 font-light mt-3 leading-relaxed">Before dawn at Tokyo&apos;s Toyosu Market, our buyer hand-selects each fish. Bluefin tuna from Hokkaido, uni from Muroran, kampachi from Kyushu — only the top 2% makes the cut. Every specimen is evaluated for fat content, texture, and freshness.</p>
                </div>
                <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-white/5">
                  <img src="https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?w=600&h=400&fit=crop&q=80" alt="Fish market" className="w-full h-64 object-cover" loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center rv">
                <div className="rounded-2xl overflow-hidden border border-white/5">
                  <img src="https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=600&h=400&fit=crop&q=80" alt="Rice preparation" className="w-full h-64 object-cover" loading="lazy" decoding="async" />
                </div>
                <div>
                  <span className="text-5xl font-display font-bold text-dp/20">02</span>
                  <h3 className="text-2xl font-display font-bold mt-2">Shari — The Rice</h3>
                  <p className="text-gray-500 font-light mt-3 leading-relaxed">Our shari is a 40-year recipe. Koshihikari rice from Niigata, cooked in iron pots, seasoned with a blend of Akazu red vinegar, sea salt, and kombu dashi. Each grain must be glossy, firm outside, soft within — seasoned at body temperature, never refrigerated.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center rv">
                <div className="md:text-right order-2 md:order-1">
                  <span className="text-5xl font-display font-bold text-dp/20">03</span>
                  <h3 className="text-2xl font-display font-bold mt-2">Nikiri &amp; Aging</h3>
                  <p className="text-gray-500 font-light mt-3 leading-relaxed">Tuna is dry-aged in our dedicated chamber for 24–72 hours. This intensifies umami and deepens color. Each fish receives a different aging profile — ōtoro at 48 hours, akami at 24. The nikiri sauce is our own blend of soy, mirin, and sake, reduced over 3 days.</p>
                </div>
                <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-white/5">
                  <img src="https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=600&h=400&fit=crop&q=80" alt="Knife work" className="w-full h-64 object-cover" loading="lazy" decoding="async" />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center rv">
                <div className="rounded-2xl overflow-hidden border border-white/5">
                  <img src="https://images.unsplash.com/photo-1553621042-f6e147245754?w=600&h=400&fit=crop&q=80" alt="Assembly" className="w-full h-64 object-cover" loading="lazy" decoding="async" />
                </div>
                <div>
                  <span className="text-5xl font-display font-bold text-dp/20">04</span>
                  <h3 className="text-2xl font-display font-bold mt-2">Cutting &amp; Formation</h3>
                  <p className="text-gray-500 font-light mt-3 leading-relaxed">With a Yanagiba knife sharpened to a mirror edge, Chef Tanaka cuts each piece at a precise angle determined by the fish&apos;s fat line and muscle structure. The nigiri is formed in one fluid motion — rice compressed in 3 seconds, fish draped with a single stroke. No squeezing, no hesitation.</p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-12 items-center rv">
                <div className="md:text-right order-2 md:order-1">
                  <span className="text-5xl font-display font-bold text-dp/20">05</span>
                  <h3 className="text-2xl font-display font-bold mt-2">The Moment of Serving</h3>
                  <p className="text-gray-500 font-light mt-3 leading-relaxed">Sushi is alive — it deteriorates the moment it leaves the chef&apos;s hand. That&apos;s why each piece is placed directly before you, one at a time. The timing between courses, the temperature, the wasabi placement under the fish — everything is calculated for peak flavor at the exact second you eat.</p>
                </div>
                <div className="order-1 md:order-2 rounded-2xl overflow-hidden border border-white/5">
                  <img src="https://images.unsplash.com/photo-1615361200098-9e630ec29b4e?w=600&h=400&fit=crop&q=80" alt="Serving" className="w-full h-64 object-cover" loading="lazy" decoding="async" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto"></div>

      {/* TEAM */}
      <section id="team" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 rv">
            <span className="text-[10px] tracking-[.5em] uppercase font-medium" style={{ color: '#D4A843' }}>The People</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mt-4">Behind the<br /><span className="italic text-dl/60">counter</span></h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stg">
            <div className="team-card rv rounded-2xl border border-white/5 bg-card overflow-hidden">
              <div className="h-72 overflow-hidden"><img src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=400&h=500&fit=crop&q=80" alt="Chef Tanaka" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" decoding="async" /></div>
              <div className="p-5">
                <h4 className="font-display font-bold text-lg">Tanaka Hiroshi</h4>
                <p className="text-[10px] tracking-[.2em] uppercase text-dl/60 mt-0.5">Executive Chef · Itamae</p>
                <p className="text-xs text-gray-600 mt-3 leading-relaxed">30 years at the counter. Trained in Tokyo&apos;s Ginza district under three generations of sushi masters.</p>
              </div>
            </div>
            <div className="team-card rv rounded-2xl border border-white/5 bg-card overflow-hidden">
              <div className="h-72 overflow-hidden"><img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=500&fit=crop&q=80" alt="Sous Chef" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" decoding="async" /></div>
              <div className="p-5">
                <h4 className="font-display font-bold text-lg">Müller Anna</h4>
                <p className="text-[10px] tracking-[.2em] uppercase text-dl/60 mt-0.5">Sous Chef</p>
                <p className="text-xs text-gray-600 mt-3 leading-relaxed">Formerly of Nobelhart &amp; Schmutzig. The bridge between Japanese precision and European sensibility.</p>
              </div>
            </div>
            <div className="team-card rv rounded-2xl border border-white/5 bg-card overflow-hidden">
              <div className="h-72 overflow-hidden"><img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&q=80" alt="Sommelier" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" decoding="async" /></div>
              <div className="p-5">
                <h4 className="font-display font-bold text-lg">Weber Lukas</h4>
                <p className="text-[10px] tracking-[.2em] uppercase text-dl/60 mt-0.5">Sake Sommelier</p>
                <p className="text-xs text-gray-600 mt-3 leading-relaxed">Certified Kikisake-shi. Curates our 80-label sake list from every region of Japan.</p>
              </div>
            </div>
            <div className="team-card rv rounded-2xl border border-white/5 bg-card overflow-hidden">
              <div className="h-72 overflow-hidden"><img src="https://images.unsplash.com/photo-1556881286-fc6915169721?w=400&h=500&fit=crop&q=80" alt="Pastry" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" loading="lazy" decoding="async" /></div>
              <div className="p-5">
                <h4 className="font-display font-bold text-lg">Sato Yuki</h4>
                <p className="text-[10px] tracking-[.2em] uppercase text-dl/60 mt-0.5">Wagashi &amp; Dessert</p>
                <p className="text-xs text-gray-600 mt-3 leading-relaxed">Trained in Kyoto wagashi artistry. Creates seasonal Japanese sweets that close the omakase journey.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="divider max-w-5xl mx-auto"></div>

      {/* HOW WE OPERATE */}
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
          <div className="rl">
            <span className="text-[10px] tracking-[.5em] uppercase font-medium" style={{ color: '#D4A843' }}>Our Way</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight leading-[1.1] mt-4">How we<br /><span className="italic text-dl/60">operate</span></h2>
            <div className="mt-10 space-y-6">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-dp/10 border border-dp/20 flex items-center justify-center flex-shrink-0 mt-0.5"><Icon icon="mdi:airplane" className="text-dl text-lg" /></div>
                <div><h4 className="font-display font-semibold">Daily Imports</h4><p className="text-sm text-gray-500 mt-1">Fish arrives at Cologne-Bonn Airport daily from Tokyo&apos;s Toyosu Market. 18 hours from ocean to our door.</p></div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-dp/10 border border-dp/20 flex items-center justify-center flex-shrink-0 mt-0.5"><Icon icon="mdi:leaf" className="text-dl text-lg" /></div>
                <div><h4 className="font-display font-semibold">Sustainable Sourcing</h4><p className="text-sm text-gray-500 mt-1">We partner only with MSC-certified fisheries. No endangered species. Full traceability for every piece served.</p></div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-dp/10 border border-dp/20 flex items-center justify-center flex-shrink-0 mt-0.5"><Icon icon="mdi:account-group" className="text-dl text-lg" /></div>
                <div><h4 className="font-display font-semibold">One Seating Per Night</h4><p className="text-sm text-gray-500 mt-1">We serve one omakase seating per evening. No rush, no turnover. The evening unfolds at its own pace.</p></div>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-lg bg-dp/10 border border-dp/20 flex items-center justify-center flex-shrink-0 mt-0.5"><Icon icon="mdi:silverware-fork-knife" className="text-dl text-lg" /></div>
                <div><h4 className="font-display font-semibold">No Walk-Ins</h4><p className="text-sm text-gray-500 mt-1">Every guest is expected. This allows us to prepare specifically for you — dietary needs, preferences, celebrations.</p></div>
              </div>
            </div>
          </div>
          <div className="rr relative">
            <div className="rounded-3xl overflow-hidden border border-white/5">
              <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=700&h=900&fit=crop&q=80" alt="Interior" className="w-full h-[550px] object-cover" loading="lazy" decoding="async" />
              <div className="absolute inset-0 bg-gradient-to-t from-bg/70 via-transparent to-transparent rounded-3xl"></div>
            </div>
            <div className="absolute -top-3 -right-3 w-20 h-20 border-t border-r border-dp/20 rounded-tr-3xl"></div>
            <div className="absolute -bottom-3 -left-3 w-20 h-20 border-b border-l border-gold/20 rounded-bl-3xl"></div>
          </div>
        </div>
      </section>

      {/* BOOKING CTA */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto bg-glow rounded-3xl border border-dp/10 p-12 md:p-20 text-center relative overflow-hidden rv">
          <div className="absolute top-0 left-0 w-40 h-40 bg-dp/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-60 h-60 bg-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute top-8 right-12 text-7xl font-serif text-white dfl select-none pointer-events-none" style={{ opacity: 0.03 }}>龍</div>
          <div className="relative z-10">
            <span className="text-[10px] tracking-[.5em] uppercase font-medium" style={{ color: '#D4A843' }}>Reservation</span>
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight mt-4 leading-[1.05]">Your seat awaits at the<br /><span className="italic gs">dragon&apos;s table</span></h2>
            <p className="text-gray-500 font-light mt-6 max-w-lg mx-auto">Only 10 counter seats per evening. One seating. One unforgettable journey through 20 courses.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <a href="#reserve" className="cta-g px-12 py-5 rounded-full ce shadow-lg shadow-gold/15"><span className="text-[12px] font-bold tracking-[.25em] uppercase text-black">Book a Table Now</span></a>
              <Link href="/menu" className="px-12 py-5 border border-white/15 text-white text-[12px] font-bold tracking-[.25em] uppercase rounded-full hover:bg-white/5 hover:border-dp/40 hover:-translate-y-0.5 transition-all duration-500">View Full Menu</Link>
            </div>
          </div>
        </div>
      </section>

      {/* LOCATION */}
      <section id="location" className="py-32 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="rv relative rounded-3xl overflow-hidden border border-white/5 h-[450px]">
            <img src="https://images.unsplash.com/photo-1513593771513-7b58b6c4af38?w=800&h=600&fit=crop&q=80" alt="Cologne" className="w-full h-full object-cover" loading="lazy" decoding="async" />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-bg/40 to-transparent"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-black/50 backdrop-blur-xl rounded-xl p-4 border border-white/5">
                <p className="text-[10px] tracking-[.2em] uppercase text-dl/60">Location</p>
                <p className="font-display font-bold text-lg mt-1">Cologne, Germany</p>
              </div>
            </div>
          </div>
          <div className="rr">
            <span className="text-[10px] tracking-[.5em] uppercase font-medium" style={{ color: '#D4A843' }}>Find Us</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight mt-4">In the heart of<br /><span className="italic text-dl/60">the Rhineland</span></h2>
            <div className="mt-10 space-y-5">
              <div className="flex gap-4 items-start">
                <Icon icon="mdi:map-marker" className="text-dl text-xl mt-0.5" />
                <div><p className="font-medium">Address</p><p className="text-sm text-gray-500 mt-0.5">Brüsseler Platz 7, 50672 Cologne, Germany</p></div>
              </div>
              <div className="flex gap-4 items-start">
                <Icon icon="mdi:clock-outline" className="text-dl text-xl mt-0.5" />
                <div><p className="font-medium">Hours</p>
                  <div className="text-sm text-gray-500 mt-0.5 space-y-0.5">
                    <p>Tue – Thu: 6:00 PM – 10:00 PM</p>
                    <p>Fri – Sat: 5:30 PM – 11:00 PM</p>
                    <p>Sunday: 5:00 PM – 9:00 PM</p>
                    <p>Monday: <span className="text-dp">Closed</span></p>
                  </div>
                </div>
              </div>
              <div className="flex gap-4 items-start">
                <Icon icon="mdi:phone" className="text-dl text-xl mt-0.5" />
                <div><p className="font-medium">Contact</p><p className="text-sm text-gray-500 mt-0.5">+49 221 123 4567 · hello@purpledragon.de</p></div>
              </div>
              <div className="flex gap-4 items-start">
                <Icon icon="mdi:train" className="text-dl text-xl mt-0.5" />
                <div><p className="font-medium">Getting Here</p><p className="text-sm text-gray-500 mt-0.5">2 min from Rudolfplatz U-Bahn · 15 min from Köln Hbf by taxi</p></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ACCOLADES */}
      <section className="py-20 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 rv">
          <div className="text-center"><p className="text-3xl md:text-4xl font-display font-bold text-white/80">2★</p><p className="text-[10px] tracking-[.2em] uppercase text-gray-600 mt-1">Michelin Guide</p></div>
          <div className="text-center"><p className="text-3xl md:text-4xl font-display font-bold text-white/80">#1</p><p className="text-[10px] tracking-[.2em] uppercase text-gray-600 mt-1">Germany&apos;s Best Sushi</p></div>
          <div className="text-center"><p className="text-3xl md:text-4xl font-display font-bold text-white/80">4.9</p><p className="text-[10px] tracking-[.2em] uppercase text-gray-600 mt-1">Google Reviews</p></div>
          <div className="text-center"><p className="text-3xl md:text-4xl font-display font-bold text-white/80">19pts</p><p className="text-[10px] tracking-[.2em] uppercase text-gray-600 mt-1">Gault&amp;Millau</p></div>
        </div>
      </section>

      {/* RESERVATION FORM */}
      <section id="reserve" className="py-32 px-6 relative">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1920&h=800&fit=crop&q=80" alt="" className="w-full h-full object-cover opacity-[.08]" loading="lazy" decoding="async" />
          <div className="absolute inset-0 bg-gradient-to-b from-bg via-bg/90 to-bg"></div>
        </div>
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="text-center mb-14 rv">
            <span className="text-[10px] tracking-[.5em] uppercase font-medium" style={{ color: '#D4A843' }}>予約</span>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tight mt-4">Reserve Your Seat</h2>
            <p className="text-gray-500 font-light mt-4">We&apos;ll confirm your reservation within 24 hours.</p>
          </div>
          <form id="reserveForm" className="form-panel grid grid-cols-1 md:grid-cols-2 gap-5 rv rounded-3xl p-6 sm:p-8 md:p-10">
            <div className="field-group"><label className="field-label">Full Name *</label><input type="text" required className="field" placeholder="Your name" /></div>
            <div className="field-group"><label className="field-label">Email *</label><input type="email" required className="field" placeholder="your@email.com" /></div>
            <div className="field-group"><label className="field-label">Date *</label><input type="date" required className="field" /></div>
            <div className="field-group"><label className="field-label">Guests *</label><select required className="field" defaultValue=""><option value="">Select</option><option value="1">1 Guest</option><option value="2">2 Guests</option><option value="3">3 Guests</option><option value="4">4 Guests</option></select></div>
            <div className="field-group"><label className="field-label">Experience *</label><select required className="field" defaultValue=""><option value="">Choose</option><option value="omakase">Omakase — €220/guest</option><option value="premium">Purple Dragon Omakase — €340/guest</option><option value="ala">À La Carte</option></select></div>
            <div className="field-group"><label className="field-label">Phone</label><input type="tel" className="field" placeholder="+49 ___ ___" /></div>
            <div className="md:col-span-2 field-group"><label className="field-label">Special Requests</label><textarea rows={3} className="field" placeholder="Allergies, celebrations, dietary needs..."></textarea></div>
            <div className="md:col-span-2 text-center pt-2">
              <button type="submit" className="cta-g px-14 py-4 rounded-full ce shadow-lg shadow-gold/15"><span className="text-[12px] font-bold tracking-[.25em] uppercase text-black">Confirm Reservation</span></button>
              <p className="text-[10px] text-gray-700 mt-4">Confirmation within 24h · Free cancellation up to 24h before</p>
            </div>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <span className="relative w-10 h-10 flex items-center justify-center">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 44 44" fill="none" style={{ transform: 'rotate(-125deg)' }} aria-hidden="true">
                  <circle cx="22" cy="22" r="19" stroke="url(#ensoFoot)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="103 17" />
                  <defs><linearGradient id="ensoFoot" x1="3" y1="3" x2="41" y2="41" gradientUnits="userSpaceOnUse"><stop stopColor="#7C3AED" /><stop offset="1" stopColor="#D4A843" /></linearGradient></defs>
                </svg>
                <span className="font-serif text-dp text-lg relative">龍</span>
              </span>
              <span className="text-sm font-bold tracking-[.25em] uppercase">Purple Dragon</span>
            </div>
            <p className="text-sm text-gray-600 font-light leading-relaxed max-w-sm">A sanctuary for sushi purists in the heart of Cologne. Every grain of rice, every slice of fish — crafted with intention and reverence.</p>
            <div className="flex gap-4 mt-6">
              <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-dp/50 hover:bg-dp/10 transition-all"><Icon icon="mdi:instagram" className="text-gray-500 text-lg" /></a>
              <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-dp/50 hover:bg-dp/10 transition-all"><Icon icon="mdi:facebook" className="text-gray-500 text-lg" /></a>
              <a href="#" aria-label="Google" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:border-dp/50 hover:bg-dp/10 transition-all"><Icon icon="mdi:google" className="text-gray-500 text-lg" /></a>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[.3em] uppercase text-gray-500 font-bold mb-4">Navigate</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <a href="#philosophy" className="block hover:text-dl transition-colors">Philosophy</a>
              <a href="#process" className="block hover:text-dl transition-colors">The Craft</a>
              <a href="#team" className="block hover:text-dl transition-colors">Team</a>
              <a href="#location" className="block hover:text-dl transition-colors">Find Us</a>
              <Link href="/menu" className="block hover:text-dl transition-colors">Menu →</Link>
            </div>
          </div>
          <div>
            <h4 className="text-[10px] tracking-[.3em] uppercase text-gray-500 font-bold mb-4">Contact</h4>
            <div className="space-y-3 text-sm text-gray-600">
              <p>Brüsseler Platz 7</p><p>50672 Cologne, Germany</p>
              <p className="text-gray-400">+49 221 123 4567</p>
              <p className="text-gray-400">hello@purpledragon.de</p>
            </div>
          </div>
        </div>
        <div className="divider mb-8"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-gray-700">© 2025 Purple Dragon GmbH. All rights reserved.</p>
          <p className="text-[11px] text-gray-800 font-serif">「魚を食うは命を食う」</p>
        </div>
      </footer>

      {/* TOAST */}
      <div id="toast" className="toast fixed bottom-8 left-1/2 -translate-x-1/2 z-[110] px-6 py-4 bg-card border border-dp/30 rounded-2xl flex items-center gap-3 shadow-2xl">
        <Icon icon="mdi:check-circle" className="text-dl text-xl" />
        <span id="toastMsg" className="text-sm font-medium"></span>
      </div>
    </>
  );
}
