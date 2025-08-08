
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
}, {threshold:0.1});

// ===== Parallax (background moves slower than content) =====
function parallaxTick(){
  const y = window.scrollY * 0.2; // 0.2 = лёгкий параллакс
  const bg = document.getElementById('parallax-bg');
  if(bg) bg.style.transform = 'translateY(' + y + 'px)';
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
