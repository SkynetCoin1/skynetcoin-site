
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


// Attach click handler if button exists
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('connectWalletBtn');
  if (btn) btn.addEventListener('click', connectWallet);
});



// ===== Enhanced MetaMask connect with detailed errors and BSC handling =====
async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    alert('MetaMask не найден. Установите: https://metamask.io/download/');
    return;
  }
  try {
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts && accounts[0];
    if (!account) { alert('Не удалось получить адрес кошелька'); return; }

    // Ensure BSC
    const ensureBSC = async () => {
      try {
        await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x38' }] });
      } catch (err) {
        if (err.code === 4902) {
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
        } else if (err.code === 4001) {
          alert('Вы отменили переключение сети.');
        } else {
          console.error('switch/add chain error', err);
        }
      }
    };
    try {
      const cid = await window.ethereum.request({ method: 'eth_chainId' });
      if (cid !== '0x38') await ensureBSC();
    } catch(e){ console.warn('eth_chainId error', e); }

    const short = account.slice(0,6) + '...' + account.slice(-4);
    const btn = document.getElementById('connectWalletBtn');
    if (btn) btn.textContent = short;
    const span = document.getElementById('wallet-address');
    if (span) span.textContent = short;
    try { localStorage.setItem('walletAddress', account); } catch(e){}
  } catch (err) {
    if (err && err.code === 4001) {
      alert('Вы отменили подключение кошелька.');
    } else {
      console.error('connect error', err);
      alert('Ошибка подключения кошелька');
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('connectWalletBtn');
  if (btn) btn.addEventListener('click', connectWallet);

  // Restore address if saved
  try {
    const saved = localStorage.getItem('walletAddress');
    if (saved) {
      const short = saved.slice(0,6) + '...' + saved.slice(-4);
      const span = document.getElementById('wallet-address');
      const b = document.getElementById('connectWalletBtn');
      if (span) span.textContent = short;
      if (b) b.textContent = short;
    }
  } catch(e){}

  if (window.ethereum) {
    window.ethereum.on('accountsChanged', (accs)=>{
      const a = accs && accs[0];
      const span = document.getElementById('wallet-address');
      const b = document.getElementById('connectWalletBtn');
      if (a) {
        const short = a.slice(0,6) + '...' + a.slice(-4);
        if (span) span.textContent = short;
        if (b) b.textContent = short;
        try { localStorage.setItem('walletAddress', a); } catch(e){}
      } else {
        if (span) span.textContent = '';
        if (b) b.textContent = 'Подключить кошелёк';
        try { localStorage.removeItem('walletAddress'); } catch(e){}
      }
    });
    window.ethereum.on('chainChanged', ()=>{
      // Just refresh UI if needed
    });
  }
});

