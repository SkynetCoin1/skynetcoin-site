
// ===== Project settings =====

// ===== Wallet utils (MetaMask detection) =====
function getProvider() {
  const eth = window.ethereum;
  if (!eth) return null;
  // If multiple providers injected, prefer MetaMask
  if (Array.isArray(eth.providers) && eth.providers.length) {
    const mm = eth.providers.find(p => p.isMetaMask);
    return mm || eth.providers[0];
  }
  return eth;
}
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





// ===== Wallet connect (MetaMask) — Improved =====
function getProvider() {
  const eth = window.ethereum;
  if (!eth) return null;
  if (eth.providers?.length) {
    const mm = eth.providers.find(p => p.isMetaMask);
    return mm || eth.providers[0];
  }
  return eth;
}

async function connectWallet(){
  const eth = getProvider();
  if (!eth) {
    alert("MetaMask не найден. Открой сайт через HTTPS/localhost или во встроенном dapp-браузере MetaMask.");
    const hint = document.getElementById('eth-hint');
    if (hint) hint.style.display = 'block';
    return;
  }
  try {
    // Request accounts
    const accounts = await eth.request({ method: 'eth_requestAccounts' });
    const address = accounts && accounts[0];
    if (address) {
      const el = document.getElementById("wallet-address");
      if (el) el.textContent = address.slice(0,6) + "..." + address.slice(-4);
    }
    // Optional: expose provider via ethers for further actions
    if (window.ethers) {
      const provider = new ethers.providers.Web3Provider(eth);
      const signer = provider.getSigner();
      window.SKY_PROVIDER = provider;
      window.SKY_SIGNER = signer;
      window.SKY_ADDRESS = address;
    }
    return address;
  } catch (e) {
    // 4001 — User rejected
    if (e && (e.code === 4001 || e.code === "ACTION_REJECTED")) return;
    console.error('connectWallet error', e);
    alert('Ошибка подключения кошелька');
  }
}
window.connectWallet = connectWallet;
try {
    const accounts = await eth.request({ method: 'eth_requestAccounts' });
    if (!accounts || !accounts.length) return;
    const address = accounts[0];
    // Обновляем кнопку и span с адресом
    const btn = document.getElementById('connectWalletBtn');
    if (btn) btn.textContent = address.slice(0,6)+"..."+address.slice(-4);
    const el = document.getElementById("wallet-address");
    if (el) el.textContent = address.slice(0,6)+"..."+address.slice(-4);
    try { localStorage.setItem('walletAddress', address); } catch(e){}
  } catch (e) {
    if (e.code === 4001) return; // user rejected
    console.error('connectWallet error', e);
    alert("Ошибка подключения кошелька");
  }
}
window.connectWallet = connectWallet;
document.addEventListener('DOMContentLoaded', ()=>{
  document.getElementById('connectWalletBtn')?.addEventListener('click', connectWallet);
});



// Attach click handler if button exists & show hint if environment is not suitable
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('connectWalletBtn');
  if (btn) btn.addEventListener('click', connectWallet);

  const hint = document.getElementById('eth-hint');
  const onFile = location.protocol === 'file:';
  const noEth = !getProvider();
  if (hint && (onFile || noEth)) {
    hint.style.display = 'block';
    if (onFile) hint.querySelector('.eth-hint__text').textContent = 'Откройте сайт через http://localhost:3000 или HTTPS — MetaMask не работает с file://';
  }
});

