function showToast(msg){alert(msg);}

// ===== Project settings =====
window.SKY = {
  TOKEN_ADDRESS: "0x5eb08cfdbad39ff95418bb6283a471f45ec90bf8",
  DAO_ADDRESS: "0xBD2eD7873a807F69c24934e6Ae48756ED18d5867",
  ADMIN_ADDRESS: "0x7099d7CE5495c61c0e5614b133B81295DC7b9c09",
  WHITEPAPER_URL: "./skynetcoin_whitepaper.pdf",
  ENABLE_GA4: false,
  GA4_ID: "G-XXXXXXXXXX",
  SOCIALS: {
    twitter: "https://twitter.com/yourhandle",
    telegram: "https://t.me/yourchannel",
    github: "https://github.com/SkynetCoin1"
  },
  CONTACT_EMAIL: "info@skynetcoin.io"
};

// ===== Reveal on scroll =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('active'); observer.unobserve(entry.target);} });
}, {threshold:0.1, rootMargin:'0px 0px -10% 0px'});

// ===== Parallax (background moves slower than content) =====
function parallaxTick(){
  const y = Math.round(window.scrollY * 0.2);
  const bg = document.getElementById('parallax-bg');
  if(bg) bg.style.backgroundPosition = 'center ' + (-y) + 'px';
}
window.addEventListener('scroll', parallaxTick);

// ===== i18n content =====
const T = {
  en: {
    hero_title: "The AI-Powered Future of Cryptocurrency",
    hero_sub: "Skynet Coin — synergy of blockchain and artificial intelligence",
    hero_p: "A decentralized token on BNB Chain, built for speed, security, and real AI solutions.",

    about_p1: "Skynet Coin ($SKY) combines blockchain and AI. We are building an ecosystem where AI assists in investment decisions, DAO governance, and automated trading.",

    tokenomics_1: "Total supply: 1,000,000,000 SKY",
    tokenomics_2: "Liquidity & Exchanges — 40%",
    tokenomics_3: "Ecosystem development — 30%",
    tokenomics_4: "Marketing & Partnerships — 20%",
    tokenomics_5: "Reserve fund — 10%",

    roadmap_1: "Q1 2025 — Token & website launch",
    roadmap_2: "Q2 2025 — DEX listing & NFT platform launch",
    roadmap_3: "Q3 2025 — AI modules integration & DAO launch",
    roadmap_4: "Q4 2025 — CEX listing & mobile app launch",

    nftdao_1: "NFTs with unique AI-generated art",
    nftdao_2: "DAO voting for project development",
    nftdao_3: "AI-powered market analysis tools",
    nftdao_4: "Access to exclusive community events",

    airdrop_p: "Follow our socials and connect your wallet to claim free $SKY tokens. Details in our Telegram channel.",

    footer: "Contact: " + window.SKY.CONTACT_EMAIL
  },
  ru: {
    hero_title: "Будущее криптовалюты управляемое ИИ",
    hero_sub: "Skynet Coin — синергия блокчейна и искусственного интеллекта",
    hero_p: "Децентрализованный токен на BNB Chain, созданный для скорости, безопасности и реальных AI-решений.",

    about_p1: "Skynet Coin ($SKY) объединяет блокчейн и ИИ. Мы строим экосистему, где AI помогает принимать инвестиционные решения, управлять DAO и автоматизировать торговлю.",

    tokenomics_1: "Общий объём: 1,000,000,000 SKY",
    tokenomics_2: "Ликвидность и биржи — 40%",
    tokenomics_3: "Развитие экосистемы — 30%",
    tokenomics_4: "Маркетинг и партнёрства — 20%",
    tokenomics_5: "Резервный фонд — 10%",

    roadmap_1: "Q1 2025 — Запуск токена и сайта",
    roadmap_2: "Q2 2025 — Листинг на DEX и запуск NFT-платформы",
    roadmap_3: "Q3 2025 — Интеграция AI-модулей и запуск DAO",
    roadmap_4: "Q4 2025 — Листинг на CEX и мобильное приложение",

    nftdao_1: "NFT с уникальными AI-генерированными артами",
    nftdao_2: "Голосование в DAO за развитие проекта",
    nftdao_3: "AI‑инструменты для анализа рынка",
    nftdao_4: "Доступ к закрытым мероприятиям сообщества",

    airdrop_p: "Подпишитесь на наши соцсети и подключите кошелёк, чтобы получить бесплатные токены $SKY. Подробности — в Telegram-канале.",

    footer: "Контакты: " + window.SKY.CONTACT_EMAIL
  }
};

function setLang(lang){
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;
  const trans = T[lang] || T['ru'];
  for(const [key,val] of Object.entries(trans)){
    const els = document.querySelectorAll('[data-i18n="'+key+'"]');
    els.forEach(el => el.textContent = val);
  }
}

window.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
  setLang(localStorage.getItem('lang') || 'ru');
  parallaxTick();
});

// ===== Wallet connect (MetaMask) =====
async function connectWallet(){
  if(!window.ethereum){ alert("MetaMask не найден"); return; }
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  const address = await signer.getAddress();
  const el = document.getElementById("wallet-address");
  if (el) el.textContent = address.slice(0,6) + "..." + address.slice(-4);
  return {provider, signer, address};
}
window.connectWallet = connectWallet;

// ==== SKY config (added) ====
(function initSkyConfig(){
  const DEFAULTS = {
    ENABLE_GA4: false,
    ENABLE_AIRDROP: false,
    ENABLE_BUY: true,
    CONTACT_EMAIL: "",
    CHAIN_ID: 56, // BNB Chain mainnet
    TOKEN: {
      address: "0x5eb08cfdbad39ff95418bb6283a471f45ec90bf8",
      symbol: "SKY",
      decimals: 18,
      image: "./logo.png"
    },
    SOCIALS: {
      twitter: "https://twitter.com/yourhandle",
      telegram: "https://t.me/yourchannel",
      github: "https://github.com/SkynetCoin1",
      website: "https://example.com/"
    },
    PANCAKE_BASE: "https://pancakeswap.finance/swap?outputCurrency="
  };
  window.SKY = Object.assign({}, DEFAULTS, window.SKY||{});
  window.SKY.TOKEN = Object.assign({}, DEFAULTS.TOKEN, (window.SKY||{}).TOKEN||{});
  window.SKY.SOCIALS = Object.assign({}, DEFAULTS.SOCIALS, (window.SKY||{}).SOCIALS||{});
})();


// ==== Wallet helpers (added) ====
async function ensureNetwork(){
  if(!window.ethereum) return;
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const net = await provider.getNetwork();
  if(net.chainId === Number(window.SKY.CHAIN_ID)) return true;
  try {
    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x"+Number(window.SKY.CHAIN_ID).toString(16) }]
    });
    return true;
  } catch(e){
    // если сеть не добавлена — BNB Chain mainnet
    if(e && e.code === 4902){
      try{
        await window.ethereum.request({
          method: "wallet_addEthereumChain",
          params: [{
            chainId: "0x38",
            chainName: "BNB Smart Chain",
            nativeCurrency: { name:"BNB", symbol:"BNB", decimals:18 },
            rpcUrls: ["https://bsc-dataseed.binance.org/"],
            blockExplorerUrls: ["https://bscscan.com"]
          }]
        });
        return true;
      }catch(err){ console.warn(err); }
    }
    console.warn(e);
    return false;
  }
}

async function addTokenToWallet(){
  if(!window.ethereum) { alert("MetaMask не найден"); return; }
  const t = window.SKY.TOKEN;
  try{
    await window.ethereum.request({
      method: "wallet_watchAsset",
      params: { type: "ERC20", options: { address: t.address, symbol: t.symbol, decimals: Number(t.decimals), image: t.image } }
    });
  }catch(e){ console.warn(e); alert("Не удалось добавить токен в кошелёк"); }
}

function copyContract(){
  const t = window.SKY.TOKEN;
  navigator.clipboard.writeText(t.address).then(()=>{
    alert("Контракт скопирован: "+t.address);
  }, ()=>alert("Не удалось скопировать"));
}

function buySky(){
  if(!window.SKY.ENABLE_BUY){ alert("Покупка временно отключена"); return; }
  const url = window.SKY.PANCAKE_BASE + encodeURIComponent(window.SKY.TOKEN.address);
  window.open(url, "_blank", "noopener");
}

async function claimAirdrop(){
  if(!window.SKY.ENABLE_AIRDROP){ alert("Airdrop скоро"); return; }
  // Заглушка под реальную реализацию с подписью и бекендом
  try{
    const ctx = await connectWallet();
    if(!ctx) return;
    const msg = "SkynetCoin Airdrop claim for " + ctx.address;
    const sig = await ctx.signer.signMessage(msg);
    console.log("airdrop-signature:", sig);
    alert("Заявка на airdrop отправлена (демо).");
  }catch(e){ console.warn(e); alert("Не удалось выполнить claim"); }
}

function initButtons(){
  const c = document.getElementById("connect-wallet");
  if(c) c.addEventListener("click", async ()=>{
    const ok = await ensureNetwork();
    if(ok) await connectWallet();
  });
  const b = document.getElementById("buy-sky");
  if(b) b.addEventListener("click", (e)=>{ e.preventDefault(); buySky(); });
  const a = document.getElementById("claim-airdrop");
  if(a) a.addEventListener("click", (e)=>{ e.preventDefault(); claimAirdrop(); });
  const cc = document.getElementById("copy-contract");
  if(cc) cc.addEventListener("click", copyContract);
  const at = document.getElementById("add-token");
  if(at) at.addEventListener("click", addTokenToWallet);
}

document.addEventListener("DOMContentLoaded", initButtons);


// ===== GA4 (disabled by default) =====
(function initGA(){
  if(!window.SKY.ENABLE_GA4 || !window.SKY.GA4_ID) return;
  const s=document.createElement("script"); s.async=true;
  s.src="https://www.googletagmanager.com/gtag/js?id="+window.SKY.GA4_ID;
  document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[];
  function gtag(){dataLayer.push(arguments);} window.gtag=gtag;
  gtag('js', new Date()); gtag('config', window.SKY.GA4_ID, {'anonymize_ip': true});
})();

// ===== Smooth anchor scroll fallback =====
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      const id = this.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
});

// ===== Scrollspy for sticky nav =====
const navLinks = Array.from(document.querySelectorAll('#topbar .nav-link'));
const sectionMap = navLinks.map(link => {
  const id = link.getAttribute('href');
  return { id, link, el: document.querySelector(id) };
}).filter(x => x.el);

const spyObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    const item = sectionMap.find(s => s.el === entry.target);
    if (!item) return;
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      item.link.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });

sectionMap.forEach(s => spyObserver.observe(s.el));

// ===== Back to top =====
const backBtn = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backBtn.style.display = (window.scrollY > 600) ? 'block' : 'none';
});
backBtn?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));

// ===== Copy contract to clipboard =====
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('copyContractBtn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    try{
      await navigator.clipboard.writeText(btn.dataset.contract);
      btn.textContent = 'Скопировано ✓';
      setTimeout(()=> btn.textContent = '$SKY контракт', 1200);
    }catch(e){ alert('Не удалось скопировать'); }
  });
});

// ===== Buy Modal =====
document.addEventListener('DOMContentLoaded', () => {
  const openBtn = document.getElementById('openBuyModal');
  const closeBtn = document.getElementById('closeBuyModal');
  const modal = document.getElementById('buyModal');
  if(openBtn && modal){
    openBtn.addEventListener('click', () => {
      modal.classList.add('show');
      modal.setAttribute('aria-hidden','false');
    });
  }
  if(closeBtn && modal){
    closeBtn.addEventListener('click', () => {
      modal.classList.remove('show');
      modal.setAttribute('aria-hidden','true');
    });
  }
  // Close on outside click / Esc
  modal?.addEventListener('click', (e)=>{ if(e.target === modal){ modal.classList.remove('show'); }});
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') modal?.classList.remove('show'); });
});

// ===== Preloader: hide after load or 1.2s fallback =====
window.addEventListener('load', () => {
  const pl = document.getElementById('preloader');
  setTimeout(()=> pl?.classList.add('hidden'), 200);
});

// ===== Lightweight particles behind features =====
(function(){
  const canvas = document.getElementById('fx-canvas');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
  let w, h, points=[];

  function resize(){
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.floor(w * DPR); canvas.height = Math.floor(h * DPR);
    ctx.setTransform(DPR,0,0,DPR,0,0);
  }
  window.addEventListener('resize', resize, {passive:true});
  resize();

  // init particles
  const COUNT = Math.floor((w*h)/30000) + 30; // adaptive
  function reset(){
    points = new Array(COUNT).fill(0).map(()=> ({
      x: Math.random()*w,
      y: Math.random()*h,
      vx: (Math.random()-.5)*0.3,
      vy: (Math.random()-.5)*0.3,
      r: Math.random()*1.6 + 0.6
    }));
  }
  reset();

  function tick(){
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = 'rgba(0,255,255,0.9)';
    for(const p of points){
      p.x += p.vx; p.y += p.vy;
      if(p.x < -10) p.x = w+10; if(p.x > w+10) p.x = -10;
      if(p.y < -10) p.y = h+10; if(p.y > h+10) p.y = -10;
      ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI*2); ctx.fill();
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();

// ===== Add token to MetaMask =====
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('addToWalletBtn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    try{
      if(!window.ethereum){ alert('MetaMask не найден'); return; }
      const wasAdded = await window.ethereum.request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address: '0x5eb08cfdbad39ff95418bb6283a471f45ec90bf8',
            symbol: 'SKY',
            decimals: 18,
            image: location.origin + '/logo.png'
          }
        }
      });
      if (wasAdded) { btn.textContent = 'Добавлено ✓'; }
    }catch(e){ console.error(e); alert('Не удалось добавить токен'); }
  });
});


// ===== Add BSC network (also for modal) =====
document.addEventListener('DOMContentLoaded', () => {
  function addBSC(){
    if(!window.ethereum){ alert('MetaMask не найден'); return; }
    window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x38' }]
    }).catch((switchError) => {
      if (switchError.code === 4902) {
        window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [{
            chainId: '0x38',
            chainName: 'BNB Smart Chain',
            nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
            rpcUrls: ['https://bsc-dataseed.binance.org/'],
            blockExplorerUrls: ['https://bscscan.com']
          }]
        });
      } else {
        console.error(switchError);
      }
    });
  }
  const btn1 = document.getElementById('addBSCBtn');
  if(btn1) btn1.addEventListener('click', addBSC);
  const btn2 = document.getElementById('addBSCBtnModal');
  if(btn2) btn2.addEventListener('click', addBSC);
});


// ===== Robust MetaMask connect with BSC switch/add =====
async function connectWallet() {
  try {
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask не найден. Установите: https://metamask.io/download/');
      return;
    }
    // Request accounts
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts && accounts[0];
    if (!account) { alert('Не удалось получить адрес кошелька'); return; }

    // Ensure BSC network (0x38)
    let chainId = await window.ethereum.request({ method: 'eth_chainId' });
    if (chainId !== '0x38') {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0x38' }]
        });
      } catch (switchError) {
        if (switchError.code === 4902) {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x38',
              chainName: 'BNB Smart Chain',
              nativeCurrency: { name: 'BNB', symbol: 'BNB', decimals: 18 },
              rpcUrls: ['https://bsc-dataseed.binance.org/'],
              blockExplorerUrls: ['https://bscscan.com']
            }]
          });
        } else {
          console.error('switch error', switchError);
        }
      }
    }

    // Show short address on button and (if present) header span
    const shortAddr = account.slice(0, 6) + '...' + account.slice(-4);
    const btn = document.getElementById('connectWalletBtn');
    if (btn) btn.textContent = shortAddr;
    const span = document.getElementById('wallet-address');
    if (span) span.textContent = shortAddr;

    // Persist for later
    try { localStorage.setItem('walletAddress', account); } catch(e){}

  } catch (err) {
    console.error('connectWallet error', err);
    alert('Ошибка подключения кошелька');
  }
}

// Attach click handler if button exists
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('connectWalletBtn');
  if (btn) btn.addEventListener('click', connectWallet);
});



// ==== Extra wiring for legacy button id (added) ====
(function(){
  function short(address){ return address ? (address.slice(0,6) + "..." + address.slice(-4)) : ""; }
  async function onConnectUnified(e){
    if(e) e.preventDefault();
    const ok = await ensureNetwork();
    if(!ok) return;
    try{
      const ctx = await (window.connectWallet ? window.connectWallet() : connectWallet());
      if(ctx && ctx.address){
        const btn = document.getElementById('connectWalletBtn');
        if(btn) btn.textContent = short(ctx.address);
        const span = document.getElementById('wallet-address');
        if(span) span.textContent = short(ctx.address);
      }
    }catch(err){ console.warn(err); alert("Ошибка подключения кошелька"); }
  }

  if (document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', ()=>{
      const legacyBtn = document.getElementById('connectWalletBtn');
      if(legacyBtn) legacyBtn.addEventListener('click', onConnectUnified);
    });
  } else {
    const legacyBtn = document.getElementById('connectWalletBtn');
    if(legacyBtn) legacyBtn.addEventListener('click', onConnectUnified);
  }
})();


// Register Service Worker for offline caching (relative path for GitHub Pages)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}


// === Injected enhancements ===

document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-lang]').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      if (typeof setLang === 'function') setLang(lang);
    });
  });
});


if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistration().then(r => {
      const registerSW = (reg) => {
        reg.addEventListener('updatefound', () => {
          const nw = reg.installing;
          nw && nw.addEventListener('statechange', () => {
            if (nw.state === 'installed' && navigator.serviceWorker.controller) {
              showToast('Доступна новая версия. Обновите страницу.');
            }
          });
        });
      };
      if (r) registerSW(r);
      else navigator.serviceWorker.register('/sw.js').then(registerSW);
    });
  });
}


// === Auto-bind data-event-* handlers ===
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('*').forEach(el => {
    Array.from(el.attributes).forEach(attr => {
      if (attr.name.startsWith('data-event-')) {
        const eventType = attr.name.replace('data-event-', '');
        try {
          const fn = new Function(attr.value);
          el.addEventListener(eventType, fn);
        } catch(e) {
          console.error('Failed to bind inline handler for', el, e);
        }
      }
    });
  });
});


// === Global inline-handlers delegator (no inline, CSP-safe) ===
(function(){
  const parseCall = (s) => {
    // поддержка формата fnName('a', 1, true)
    const m = s && s.trim().match(/^([a-zA-Z_$][\w$]*)\s*\((.*)\)\s*$/);
    if(!m) return null;
    const fn = m[1];
    const argsStr = m[2].trim();
    if(!argsStr) return {fn, args: []};
    // безопасный разбор аргументов: строки/числа/true/false/null
    const args = [];
    let buf = ''; let inStr = false; let quote = '';
    for (let i=0;i<argsStr.length;i++){
      const ch = argsStr[i];
      if(inStr){
        buf += ch;
        if(ch === quote && argsStr[i-1] !== '\\'){ inStr = false; }
      }else{
        if(ch === "'" || ch === '"'){ inStr = true; quote = ch; buf += ch; }
        else if(ch === ','){ if(buf.trim()) args.push(buf.trim()); buf=''; }
        else { buf += ch; }
      }
    }
    if(buf.trim()) args.push(buf.trim());
    const norm = args.map(a=>{
      if(/^['"].*['"]$/.test(a)) return a.slice(1,-1);
      if(/^(true|false)$/i.test(a)) return a.toLowerCase()==='true';
      if(/^null$/i.test(a)) return null;
      const n = Number(a);
      return Number.isNaN(n) ? a : n;
    });
    return {fn, args: norm};
  };

  document.addEventListener('click', (e) => {
    const path = e.composedPath ? e.composedPath() : (function(){ let p=[],el=e.target; while(el){p.push(el); el=el.parentElement;} return p; })();
    for(const el of path){
      if(!el || !el.getAttribute) continue;
      const call = el.getAttribute('data-onclick');
      if(call){
        const parsed = parseCall(call);
        if(parsed && typeof window[parsed.fn] === 'function'){
          e.preventDefault();
          try{ window[parsed.fn].apply(el, parsed.args); }catch(err){ console.error(err); }
        }
        break;
      }
    }
  });

  // Аналогично для change/submit по необходимости
  document.addEventListener('change', (e) => {
    const el = e.target;
    const call = el && el.getAttribute && el.getAttribute('data-onchange');
    if(call){
      const parsed = parseCall(call);
      if(parsed && typeof window[parsed.fn] === 'function'){
        try{ window[parsed.fn].apply(el, parsed.args); }catch(err){ console.error(err); }
      }
    }
  });

  document.addEventListener('submit', (e) => {
    const el = e.target;
    const call = el && el.getAttribute && el.getAttribute('data-onsubmit');
    if(call){
      e.preventDefault();
      const parsed = parseCall(call);
      if(parsed && typeof window[parsed.fn] === 'function'){
        try{ window[parsed.fn].apply(el, parsed.args); }catch(err){ console.error(err); }
      }
    }
  });
})();



// === PWA update UX ===
function showUpdateToast(message = 'Доступна новая версия') {
  const toast = document.getElementById('toast');
  const btn = document.getElementById('toast-action');
  if(!toast || !btn){ return; }
  toast.textContent = message;
  toast.hidden = false;
  btn.hidden = false;
}

(function setupSWUpdateFlow(){
  if(!('serviceWorker' in navigator)) return;
  let waitingSW = null;

  function listenForWaiting(reg){
    if (reg.waiting) {
      waitingSW = reg.waiting;
      showUpdateToast('Доступна новая версия. Обновить сейчас?');
    }
    reg.addEventListener('updatefound', () => {
      const nw = reg.installing;
      if (!nw) return;
      nw.addEventListener('statechange', () => {
        if (nw.state === 'installed' && navigator.serviceWorker.controller) {
          waitingSW = reg.waiting;
          showUpdateToast('Доступна новая версия. Обновить сейчас?');
        }
      });
    });
  }

  window.addEventListener('load', () => {
    navigator.serviceWorker.getRegistration().then(reg => {
      if(!reg) return;
      listenForWaiting(reg);
    });
  });

  const btn = document.getElementById('toast-action');
  if(btn){
    btn.addEventListener('click', () => {
      if(waitingSW){
        waitingSW.postMessage({type: 'SKIP_WAITING'});
      }
    });
  }

  navigator.serviceWorker.addEventListener('controllerchange', () => {
    // новый SW активировался — перезагрузим страницу
    window.location.reload();
  });
})();



// === Added: smooth scroll & reveal on scroll ===
(function(){
  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id.length > 1) {
        const target = document.querySelector(id);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Reveal on scroll
  const reveal = (el) => {
    el.style.opacity = 0;
    el.style.transform = 'translateY(14px)';
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(en => {
        if (en.isIntersecting) {
          en.target.style.transition = 'opacity .6s ease, transform .6s ease';
          en.target.style.opacity = 1;
          en.target.style.transform = 'translateY(0)';
          obs.unobserve(en.target);
        }
      });
    }, { threshold: 0.1 });
    obs.observe(el);
  };

  document.querySelectorAll('section, .card, .step, .roadmap li').forEach(reveal);
})();
// === End added ===


/* === Added JS for release (smooth scroll, reveal on scroll) === */
(function(){
  try {
    // Smooth scroll for internal anchors
    document.addEventListener('click', function(e){
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const el = document.querySelector(href);
      if (el) {
        e.preventDefault();
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        history.replaceState(null, '', href);
      }
    }, {passive:false});

    // Reveal on scroll
    const io = new IntersectionObserver((entries)=>{
      entries.forEach(entry=>{
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));

    // Roadmap highlight on scroll (optional)
    const roadmap = document.querySelectorAll('#roadmap li');
    if (roadmap.length) {
      const roi = new IntersectionObserver((entries)=>{
        entries.forEach(entry=>{
          entry.target.classList.toggle('active', entry.isIntersecting);
        });
      }, { threshold: 0.6 });
      roadmap.forEach(li=>roi.observe(li));
    }
  } catch(e) { console.warn('Enhancement scripts error:', e); }
})();
/* === End added JS === */
