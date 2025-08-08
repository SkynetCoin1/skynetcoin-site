
// ===== Project settings (edit your links & email here) =====
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
  entries.forEach(entry => { if(entry.isIntersecting){ entry.target.classList.add('active'); observer.unobserve(entry.target);} });
},{threshold:0.1});
window.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
});

// ===== i18n (RU/EN) =====
const translations = {
  en:{hero_title:"The Future of Crypto Meets AI",hero_sub:"Welcome to Skynet Coin",
      hero_p:"Skynet Coin ($SKY) merges blockchain and AI. Fast, secure, decentralized.",
      about_h2:"About Skynet Coin",tokenomics_h2:"Tokenomics",roadmap_h2:"Roadmap",
      nftdao_h2:"NFT / DAO / Utility",airdrop_h2:"Claim Your Airdrop",
      footer:"Contact: " + window.SKY.CONTACT_EMAIL},
  ru:{hero_title:"Будущее крипты встречается с ИИ",hero_sub:"Добро пожаловать в Skynet Coin",
      hero_p:"Skynet Coin ($SKY) объединяет блокчейн и ИИ. Быстро, безопасно, децентрализовано.",
      about_h2:"О проекте Skynet Coin",tokenomics_h2:"Токеномика",roadmap_h2:"Дорожная карта",
      nftdao_h2:"NFT / DAO / Utility",airdrop_h2:"Получите Airdrop",
      footer:"Контакты: " + window.SKY.CONTACT_EMAIL}
};
function setLang(lang){localStorage.setItem("lang",lang);document.documentElement.lang=lang;
  document.querySelectorAll("[data-i18n]").forEach(el=>{const t=translations[lang][el.dataset.i18n];if(t)el.textContent=t;});}
window.addEventListener("DOMContentLoaded",()=>setLang(localStorage.getItem("lang")||"ru"));

// ===== Wallet (MetaMask only, simple & safe) =====
async function connectWallet(){
  if(!window.ethereum){ alert("MetaMask не найден"); return; }
  const provider=new ethers.providers.Web3Provider(window.ethereum);
  await provider.send("eth_requestAccounts",[]);
  const signer=provider.getSigner();
  const address=await signer.getAddress();
  const el=document.getElementById("wallet-address");
  if(el) el.textContent=address.slice(0,6)+"..."+address.slice(-4);
  return {provider,signer,address};
}
window.connectWallet=connectWallet;

// ===== GA4 (off by default) =====
(function initGA(){ if(!window.SKY.ENABLE_GA4||!window.SKY.GA4_ID) return;
  const s=document.createElement("script"); s.async=true;
  s.src="https://www.googletagmanager.com/gtag/js?id="+window.SKY.GA4_ID; document.head.appendChild(s);
  window.dataLayer=window.dataLayer||[]; function gtag(){dataLayer.push(arguments);} window.gtag=gtag;
  gtag('js', new Date()); gtag('config', window.SKY.GA4_ID, {'anonymize_ip': true}); })();
