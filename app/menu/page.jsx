'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';

const dishes = [
  // NIGIRI
  { cat: 'nigiri', name: 'Ōtoro', jp: '大トロ', priceModal: '€18 / pc', priceShort: '€18', img: '1615361200098-9e630ec29b4e', badge: { cls: 'bc', label: "Chef's Pick" }, blurb: 'Fattiest bluefin tuna belly, snow-marbled, melts on contact.', detail: 'The crown of the bluefin — the fattiest cut of the belly, marbled like snow. It dissolves on the tongue at body temperature, finished only with a brush of our three-day nikiri.' },
  { cat: 'nigiri', name: 'Chūtoro', jp: '中トロ', priceModal: '€14 / pc', priceShort: '€14', img: '1611143669185-af224c5e3252', badge: null, blurb: 'Medium-fatty tuna — richness balanced with clean iron.', detail: 'The balance point of the tuna — medium-fatty, where richness meets the clean iron of the akami. Aged 48 hours for depth.' },
  { cat: 'nigiri', name: 'Akami', jp: '赤身', priceModal: '€9 / pc', priceShort: '€9', img: '1607301406259-dfb186e15de8', badge: null, blurb: 'Lean ruby tuna loin, zuke soy-marinated.', detail: 'The lean ruby loin of the bluefin, lightly marinated in zuke soy. Pure, muscular tuna flavour — the connoisseur’s first bite.' },
  { cat: 'nigiri', name: 'Uni', jp: '雲丹', priceModal: '€16 / pc', priceShort: '€16', img: '1583623025817-d180a2221d0a', badge: { cls: 'bp', label: 'Signature' }, blurb: 'Hokkaido Bafun sea urchin — sweet, oceanic, fleeting.', detail: 'Hokkaido Bafun sea urchin, sweet and oceanic, spooned over warm shari and bound with a band of nori. Available only when the day’s catch meets our grade.' },
  { cat: 'nigiri', name: 'Hotate', jp: '帆立', priceModal: '€11 / pc', priceShort: '€11', img: '1606820854416-439b3305ff39', badge: null, blurb: 'Live Hokkaido scallop, yuzu salt, sliced to order.', detail: 'Live Hokkaido scallop, sliced moments before serving. Faintly sweet, almost translucent, with a whisper of yuzu salt.' },
  { cat: 'nigiri', name: 'Unagi', jp: '鰻', priceModal: '€12 / pc', priceShort: '€12', img: '1556679343-c7306c1976bc', badge: null, blurb: 'Binchōtan-grilled eel, three-day tare lacquer.', detail: 'Freshwater eel, grilled over binchōtan and lacquered in a tare reduced for three days. Warm, smoky, faintly caramelised.' },
  // SASHIMI
  { cat: 'sashimi', name: 'Bluefin Trio', jp: '鮪三種', priceModal: '€34', priceShort: '€34', img: '1579871494447-9811cf80d66c', badge: { cls: 'bc', label: "Chef's Pick" }, blurb: 'Ōtoro, chūtoro, akami — the whole tuna in three slices.', detail: 'A vertical tasting of one fish — ōtoro, chūtoro and akami, plated from richest to leanest so you read the whole tuna in three slices.' },
  { cat: 'sashimi', name: 'Sake', jp: '鮭', priceModal: '€16', priceShort: '€16', img: '1564834724105-918b73d1b9e0', badge: null, blurb: 'Ora King salmon, silken-fatted, cut thick.', detail: 'Ora King salmon from New Zealand, prized for its silken fat lines. Cut thick, served with fresh wasabi and a single drop of citrus.' },
  { cat: 'sashimi', name: 'Tako', jp: '蛸', priceModal: '€14', priceShort: '€14', img: '1602253057119-44d745d9b860', badge: null, blurb: 'Slow-poached octopus, springy and clean.', detail: 'Octopus massaged and slow-poached for tenderness, then chilled. Clean, springy, lightly brined — a study in texture.' },
  { cat: 'sashimi', name: 'Tai', jp: '鯛', priceModal: '€17', priceShort: '€17', img: '1546069901-ba9599a7e63c', badge: null, blurb: 'Kombu-cured sea bream — delicate, floral, precise.', detail: 'Sea bream cured briefly between sheets of kombu, which draws out water and presses umami into the flesh. Delicate, floral, precise.' },
  // MAKI
  { cat: 'maki', name: 'Purple Dragon Roll', jp: '紫龍巻', priceModal: '€26', priceShort: '€26', img: '1579027989536-b7b1f875659b', badge: { cls: 'bp', label: 'Signature' }, blurb: 'Eel, ōtoro, violet shiso, gold leaf — the namesake.', detail: 'Our namesake. Binchōtan eel and ōtoro at the core, draped in violet shiso and finished with a single leaf of edible gold. The dish the house is named for.' },
  { cat: 'maki', name: 'Spicy Tuna Maki', jp: '辛鮪巻', priceModal: '€15', priceShort: '€15', img: '1553621042-f6e147245754', badge: null, blurb: 'Minced akami, house fermented chili oil, scallion.', detail: 'Hand-minced akami bound with our own fermented chili oil and a thread of scallion. Heat that builds slowly, never masking the fish.' },
  { cat: 'maki', name: 'Toro Negi', jp: 'トロ葱巻', priceModal: '€19', priceShort: '€19', img: '1617196034796-73dfa7b1fd56', badge: null, blurb: 'Fatty tuna and raw scallion, the Edomae classic.', detail: 'Fatty tuna scraped from the bone, folded with raw scallion and rolled tight. Rich and savoury, the classic Edomae pairing.' },
  { cat: 'maki', name: 'Kappa Maki', jp: '河童巻', priceModal: '€8', priceShort: '€8', img: '1589187151053-5ec8818e661b', badge: null, blurb: 'Crisp cucumber and toasted sesame — the cleanser.', detail: 'The palate-cleanser. Crisp Japanese cucumber, toasted sesame, nothing more. Served between richer courses to reset the tongue.' },
  // GUNKAN
  { cat: 'gunkan', name: 'Uni Gunkan', jp: '雲丹軍艦', priceModal: '€17', priceShort: '€17', img: '1564489563601-c53cfc451e93', badge: { cls: 'bc', label: "Chef's Pick" }, blurb: 'Nori battleship brimming with Hokkaido sea urchin.', detail: "A 'battleship' of nori cradling a generous spoon of Hokkaido uni over warm rice — the most direct way to taste the urchin at its sweetest." },
  { cat: 'gunkan', name: 'Ikura Gunkan', jp: 'いくら軍艦', priceModal: '€13', priceShort: '€13', img: '1583623025817-d180a2221d0a', badge: null, blurb: 'Dashi-soy cured salmon roe, yuzu zest.', detail: 'Salmon roe cured in our house dashi-soy until each pearl bursts with clean, briny sweetness. Brightened with a rasp of yuzu zest.' },
  // TEA
  { cat: 'tea', name: 'Ceremonial Matcha', jp: '抹茶', priceModal: '€9', priceShort: '€9', img: '1627435601361-ec25f5b1d0e5', badge: { cls: 'bc', label: "Chef's Pick" }, blurb: 'Stone-ground Uji matcha, whisked to a jade foam.', detail: 'Stone-ground Uji matcha, whisked tableside to a jade foam. Vegetal, umami-rich, with a long sweet finish — the traditional close to the meal.' },
  { cat: 'tea', name: 'Gyokuro', jp: '玉露', priceModal: '€11', priceShort: '€11', img: '1571934811356-5cc061b6821f', badge: null, blurb: 'Shade-grown green tea, sweet and brothy.', detail: "Shade-grown 'jewel dew' green tea, steeped low and slow at 50°C. Intensely sweet and brothy, almost savoury — the most prized leaf in Japan." },
  { cat: 'tea', name: 'Sencha', jp: '煎茶', priceModal: '€6', priceShort: '€6', img: '1545048702-79362596cdc9', badge: null, blurb: 'First-flush Shizuoka — bright, grassy, clean.', detail: 'First-flush Shizuoka sencha — bright, grassy and clean, with a crisp astringency that cuts through richer courses.' },
  // BEER
  { cat: 'beer', name: 'Asahi Super Dry', jp: 'アサヒ', priceModal: '€7', priceShort: '€7', img: '1608270586620-248524c67de9', badge: null, blurb: 'Iconic karakuchi lager — crisp, dry, clean.', detail: "Japan's iconic karakuchi lager — crisp, dry and clean-finishing. Poured cold, it resets the palate between cuts of fish." },
  { cat: 'beer', name: 'Sapporo Premium', jp: 'サッポロ', priceModal: '€7', priceShort: '€7', img: '1535958636474-b021ee887b13', badge: null, blurb: "Japan's oldest brand — fuller-bodied, refined finish.", detail: 'The oldest beer brand in Japan. Fuller-bodied with a faint malt sweetness and a refined bitter finish.' },
  { cat: 'beer', name: 'Hitachino Nest White', jp: '常陸野', priceModal: '€9', priceShort: '€9', img: '1518176258769-f227c798150e', badge: { cls: 'bn', label: 'New' }, blurb: 'Japanese witbier — coriander, orange peel, nutmeg.', detail: 'A Japanese witbier brewed with coriander, orange peel and nutmeg. Aromatic and lightly spiced — our craft pick for the adventurous.' },
  // LEMONADE
  { cat: 'lemonade', name: 'Yuzu Ramune', jp: '柚子ラムネ', priceModal: '€5', priceShort: '€5', img: '1621263764928-df1444c5e859', badge: { cls: 'bn', label: 'New' }, blurb: 'Marble-stoppered yuzu soda — bright and barely sweet.', detail: 'The classic marble-stoppered Japanese soda, made with fragrant yuzu. Bright, citrusy and barely sweet — and yes, you pop the marble yourself.' },
  { cat: 'lemonade', name: 'Original Ramune', jp: 'ラムネ', priceModal: '€5', priceShort: '€5', img: '1437418747212-8d9709afab22', badge: null, blurb: 'The original lemon-lime ramune — nostalgic and fizzy.', detail: 'The original lemon-lime ramune — nostalgic, fizzy and clean. A nod to a summer festival in a glass bottle.' },
  { cat: 'lemonade', name: 'Calpis Soda', jp: 'カルピス', priceModal: '€5', priceShort: '€5', img: '1497534446932-c925b458314e', badge: null, blurb: 'Sparkling cultured-milk soda — tangy and milky-sweet.', detail: 'Sparkling cultured-milk soda — softly tangy, milky-sweet and utterly refreshing. A Japanese childhood favourite for grown-up palates.' },
];

const categories = [
  ['all', 'All'], ['nigiri', 'Nigiri'], ['sashimi', 'Sashimi'], ['maki', 'Maki'],
  ['gunkan', 'Gunkan'], ['tea', 'Tea'], ['beer', 'Beer'], ['lemonade', 'Lemonade'],
];

const img = (id, w, h) => `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=80`;

export default function Menu() {
  useEffect(() => {
    document.querySelectorAll('img').forEach((im) => {
      if (im.complete) im.classList.add('ld');
      else im.addEventListener('load', () => im.classList.add('ld'));
    });

    const nav = document.getElementById('nav');
    const tabbar = document.getElementById('tabbar');
    const onScroll = () => {
      if (nav) nav.classList.toggle('nav-scrolled', window.scrollY > 80);
      if (tabbar) tabbar.classList.toggle('scrim', tabbar.getBoundingClientRect().top <= 1);
    };
    addEventListener('scroll', onScroll, { passive: true });

    const io = new IntersectionObserver(
      (es) => es.forEach((en) => { if (en.isIntersecting) { en.target.classList.add('a'); io.unobserve(en.target); } }),
      { rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.rv').forEach((e) => io.observe(e));

    const grid = document.getElementById('grid');
    const cards = [...grid.querySelectorAll('.mc')];
    const tabs = [...document.querySelectorAll('.ct')];
    const countEl = document.getElementById('count');
    const emptyEl = document.getElementById('empty');

    const applyFilter = (cat) => {
      let shown = 0;
      cards.forEach((card) => {
        const ok = cat === 'all' || card.dataset.cat === cat;
        if (ok) {
          if (card.style.display === 'none') card.style.display = '';
          card.style.transitionDelay = shown * 25 + 'ms';
          requestAnimationFrame(() => card.classList.remove('hide'));
          shown++;
        } else {
          card.style.transitionDelay = '0ms';
          card.classList.add('hide');
          setTimeout(() => { if (card.classList.contains('hide')) card.style.display = 'none'; }, 300);
        }
      });
      emptyEl.classList.toggle('hidden', shown > 0);
      countEl.textContent = shown + (shown === 1 ? ' dish' : ' dishes');
    };
    const selectTab = (tab) => {
      tabs.forEach((t) => { const on = t === tab; t.classList.toggle('active', on); t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1; });
      applyFilter(tab.dataset.cat);
    };
    const tabHandlers = tabs.map((tab, i) => {
      tab.tabIndex = tab.classList.contains('active') ? 0 : -1;
      const onClick = () => selectTab(tab);
      const onKeydown = (e) => {
        let n = -1;
        if (e.key === 'ArrowRight') n = (i + 1) % tabs.length;
        else if (e.key === 'ArrowLeft') n = (i - 1 + tabs.length) % tabs.length;
        else if (e.key === 'Home') n = 0;
        else if (e.key === 'End') n = tabs.length - 1;
        if (n >= 0) { e.preventDefault(); tabs[n].focus(); selectTab(tabs[n]); }
      };
      tab.addEventListener('click', onClick);
      tab.addEventListener('keydown', onKeydown);
      return [tab, onClick, onKeydown];
    });
    countEl.textContent = cards.length + ' dishes';

    // Dish modal
    const modal = document.getElementById('dishModal');
    const closeBtn = modal.querySelector('button');
    const mImg = document.getElementById('mImg');
    let lastFocused = null;
    const openDish = (el) => {
      lastFocused = el;
      mImg.classList.remove('ld');
      mImg.onload = () => mImg.classList.add('ld');
      mImg.src = el.dataset.img;
      mImg.alt = el.dataset.name;
      document.getElementById('mName').textContent = el.dataset.name;
      document.getElementById('mJp').textContent = el.dataset.jp;
      document.getElementById('mPrice').textContent = el.dataset.price;
      document.getElementById('mDesc').textContent = el.dataset.detail;
      modal.classList.add('open');
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    };
    const closeDish = () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocused) { lastFocused.focus(); lastFocused = null; }
    };
    const onGridClick = (e) => { const card = e.target.closest('.mc'); if (card) openDish(card); };
    const onGridKey = (e) => { if ((e.key === 'Enter' || e.key === ' ') && e.target.classList.contains('mc')) { e.preventDefault(); openDish(e.target); } };
    grid.addEventListener('click', onGridClick);
    grid.addEventListener('keydown', onGridKey);
    const onModalClick = (e) => { if (e.target === modal) closeDish(); };
    const onModalKey = (e) => {
      if (e.key === 'Escape') { closeDish(); return; }
      if (e.key === 'Tab') {
        const f = modal.querySelectorAll('button,a[href]');
        const first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    const onCloseBtn = () => closeDish();
    modal.addEventListener('click', onModalClick);
    modal.addEventListener('keydown', onModalKey);
    closeBtn.addEventListener('click', onCloseBtn);

    return () => {
      removeEventListener('scroll', onScroll);
      io.disconnect();
      tabHandlers.forEach(([t, c, k]) => { t.removeEventListener('click', c); t.removeEventListener('keydown', k); });
      grid.removeEventListener('click', onGridClick);
      grid.removeEventListener('keydown', onGridKey);
      modal.removeEventListener('click', onModalClick);
      modal.removeEventListener('keydown', onModalKey);
      closeBtn.removeEventListener('click', onCloseBtn);
    };
  }, []);

  return (
    <>
      {/* NAV */}
      <nav id="nav" className="fixed top-0 left-0 right-0 z-50 py-5 px-6 transition-all duration-500 border-b border-transparent" style={{ background: 'rgba(3,3,4,.4)', backdropFilter: 'blur(16px)' }}>
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <span className="relative w-11 h-11 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 44 44" fill="none" style={{ transform: 'rotate(-125deg)' }} aria-hidden="true">
                <circle className="logo-enso" cx="22" cy="22" r="19" stroke="url(#ensoMenu)" strokeWidth="1.6" strokeLinecap="round" />
                <defs><linearGradient id="ensoMenu" x1="3" y1="3" x2="41" y2="41" gradientUnits="userSpaceOnUse"><stop stopColor="#7C3AED" /><stop offset="1" stopColor="#D4A843" /></linearGradient></defs>
              </svg>
              <span className="font-serif text-dp text-xl leading-none relative" style={{ textShadow: '0 0 20px rgba(124,58,237,.5)' }}>龍</span>
            </span>
            <div className="hidden sm:block"><span className="text-sm font-bold tracking-[.25em] uppercase">Purple Dragon</span><span className="block text-[8px] tracking-[.35em] text-dl/50 uppercase font-medium">紫龍 · Menu</span></div>
          </Link>
          <div className="flex items-center gap-6">
            <Link href="/" className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors hidden sm:inline">← Back to Home</Link>
            <Link href="/#reserve" className="cta-g px-6 py-2.5 rounded-full"><span className="text-[11px] font-bold tracking-[.2em] uppercase text-black">Book a Table</span></Link>
          </div>
        </div>
      </nav>

      {/* MENU HERO */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center rv">
          <span className="text-[10px] tracking-[.5em] uppercase font-medium" style={{ color: '#D4A843' }}>紫龍の料理</span>
          <h1 className="text-5xl md:text-7xl font-display font-bold tracking-tight mt-4">The Menu</h1>
          <p className="text-gray-500 font-light mt-4 max-w-xl mx-auto">Every category of sushi, curated teas, beers, and Japanese lemonades — the full breadth of our craft. Tap any dish to learn more.</p>
        </div>
      </section>

      {/* TABS */}
      <div id="tabbar" className="sticky top-0 z-30 bg-bg/90 backdrop-blur-xl border-y border-white/5 py-3 px-6 transition-shadow duration-300">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <div role="tablist" aria-label="Menu categories" className="flex gap-2 overflow-x-auto hscroll pb-1 flex-1">
            {categories.map(([cat, label], i) => (
              <button key={cat} role="tab" aria-selected={i === 0 ? 'true' : 'false'} aria-controls="grid" className={`ct text-gray-500${i === 0 ? ' active' : ''}`} data-cat={cat} type="button">{label}</button>
            ))}
          </div>
          <span id="count" aria-live="polite" className="hidden md:block text-[11px] tracking-[.15em] uppercase text-gray-600 whitespace-nowrap shrink-0">25 dishes</span>
        </div>
      </div>

      {/* MENU GRID */}
      <section className="py-12 px-6">
        <div id="grid" className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 stg">
          {dishes.map((d, i) => (
            <div
              key={i}
              className="mc rv rounded-2xl border border-white/5 bg-card cursor-pointer"
              tabIndex={0}
              role="button"
              aria-haspopup="dialog"
              data-cat={d.cat}
              data-name={d.name}
              data-jp={d.jp}
              data-price={d.priceModal}
              data-img={img(d.img, 700, 420)}
              data-detail={d.detail}
            >
              <div className="h-44 overflow-hidden relative">
                <img src={img(d.img, 500, 400)} alt={d.name} className="ci w-full h-full object-cover" loading="lazy" decoding="async" />
                {d.badge && <span className={`${d.badge.cls} absolute top-3 left-3 text-[9px] font-bold tracking-[.15em] uppercase px-2.5 py-1 rounded-full`}>{d.badge.label}</span>}
              </div>
              <div className="p-5">
                <div className="flex justify-between items-start gap-2">
                  <div><h3 className="font-display font-bold text-lg leading-tight">{d.name}</h3><span className="text-[11px] text-dl/60 font-serif">{d.jp}</span></div>
                  <span className="text-gold font-display font-bold whitespace-nowrap">{d.priceShort}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2 leading-relaxed">{d.blurb}</p>
              </div>
            </div>
          ))}
        </div>
        <p id="empty" className="hidden text-center text-gray-600 font-light py-20">Nothing in this category yet.</p>
      </section>

      {/* NOTE */}
      <section className="px-6 pb-20">
        <div className="max-w-3xl mx-auto text-center rv">
          <div className="divider mb-8"></div>
          <p className="text-sm text-gray-600 font-light leading-relaxed">À la carte is served alongside the counter omakase. For the full 20-course journey, the chef selects each piece for you — reserve a seat to experience it.</p>
          <Link href="/#reserve" className="cta-g mt-6 inline-block px-9 py-3.5 rounded-full"><span className="text-[11px] font-bold tracking-[.2em] uppercase text-black">Reserve a Table</span></Link>
          <p className="text-[10px] text-gray-700 mt-5">Prices in EUR, incl. VAT. Availability follows the daily catch — some items may not be offered every evening.</p>
        </div>
      </section>

      {/* DISH MODAL */}
      <div id="dishModal" role="dialog" aria-modal="true" aria-labelledby="mName" aria-describedby="mDesc" className="mo fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
        <div className="mb max-w-lg w-full bg-card border border-dp/20 rounded-3xl overflow-hidden relative">
          <button type="button" aria-label="Close" className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/50 border border-white/10 flex items-center justify-center hover:bg-dp/20 transition-colors"><Icon icon="mdi:close" className="text-lg" /></button>
          <img id="mImg" src="" alt="" className="w-full h-60 object-cover" />
          <div className="p-7">
            <div className="flex justify-between items-start gap-3">
              <div><h3 id="mName" className="text-2xl font-display font-bold"></h3><span id="mJp" className="font-serif text-dl/60"></span></div>
              <span id="mPrice" className="text-xl font-display font-bold gs whitespace-nowrap"></span>
            </div>
            <p id="mDesc" className="text-sm text-gray-400 mt-4 leading-relaxed"></p>
            <Link href="/#reserve" className="cta-g mt-7 inline-block px-7 py-3 rounded-full"><span className="text-[11px] font-bold tracking-[.2em] uppercase text-black">Reserve to Taste</span></Link>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-white/5 py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3">
            <span className="relative w-10 h-10 flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 44 44" fill="none" style={{ transform: 'rotate(-125deg)' }} aria-hidden="true">
                <circle cx="22" cy="22" r="19" stroke="url(#ensoMenuFoot)" strokeWidth="1.6" strokeLinecap="round" strokeDasharray="103 17" />
                <defs><linearGradient id="ensoMenuFoot" x1="3" y1="3" x2="41" y2="41" gradientUnits="userSpaceOnUse"><stop stopColor="#7C3AED" /><stop offset="1" stopColor="#D4A843" /></linearGradient></defs>
              </svg>
              <span className="font-serif text-dp text-lg relative">龍</span>
            </span>
            <span className="text-sm font-bold tracking-[.25em] uppercase">Purple Dragon</span>
          </Link>
          <p className="text-[11px] text-gray-700">Brüsseler Platz 7, 50672 Cologne · +49 221 123 4567</p>
          <p className="text-[11px] text-gray-800 font-serif">「魚を食うは命を食う」</p>
        </div>
      </footer>
    </>
  );
}
