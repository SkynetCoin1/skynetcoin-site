
// ===== Config =====
window.SKY = {
  TOKEN_ADDRESS: "0x5eb08cfdbad39ff95418bb6283a471f45ec90bf8",
  DAO_ADDRESS: "0xBD2eD7873a807F69c24934e6Ae48756ED18d5867",
  ADMIN_ADDRESS: "0x7099d7CE5495c61c0e5614b133B81295DC7b9c09",
  WHITEPAPER_URL: "./skynetcoin_whitepaper.pdf",
  ENABLE_GA4: false,
  GA4_ID: "",
  CONTACT_EMAIL: "info@skynetcoin.io"
};

// ===== Reveal on scroll =====
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, {threshold:0.1, rootMargin:'0px 0px -10% 0px'});

document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
});

// ===== Parallax background (no black gaps) =====
function parallaxTick(){
  const y = Math.round(window.scrollY * 0.2);
  const bg = document.getElementById('parallax-bg');
  if(bg) bg.style.backgroundPosition = 'center ' + (-y) + 'px';
}
window.addEventListener('scroll', parallaxTick);

// ===== i18n (minimal placeholder to avoid errors if data-i18n exists) =====
function setLang(lang){ try{ localStorage.setItem('lang', lang); }catch(e){} }

// ===== Smooth anchor scroll (guard against "#" jumping) =====
document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('a[href^="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      const id = this.getAttribute('href');
      if (!id || id === '#') { e.preventDefault(); return; }
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });
});

// ===== Scrollspy for topbar
document.addEventListener('DOMContentLoaded', () => {
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
});

// ===== Back to top button
document.addEventListener('DOMContentLoaded', () => {
  const backBtn = document.getElementById('backToTop');
  window.addEventListener('scroll', () => {
    if (!backBtn) return;
    backBtn.style.display = (window.scrollY > 600) ? 'block' : 'none';
  });
  backBtn?.addEventListener('click', () => window.scrollTo({top:0, behavior:'smooth'}));
});

// ===== Copy contract
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('copyContractBtn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    try{
      await navigator.clipboard.writeText(btn.dataset.contract);
      const old = btn.textContent;
      btn.textContent = 'Скопировано ✓';
      setTimeout(()=> btn.textContent = old, 1200);
    }catch(e){ alert('Не удалось скопировать'); }
  });
});

// ===== Buy modal (open/close) + duplicate open buttons
document.addEventListener('DOMContentLoaded', () => {
  const openBtns = [document.getElementById('openBuyModal'), document.getElementById('buyBtn')];
  const closeBtn = document.getElementById('closeBuyModal');
  const modal = document.getElementById('buyModal');

  function openModal(){
    if (!modal) return;
    modal.classList.add('show');
    modal.setAttribute('aria-hidden', 'false');
  }
  function closeModal(){
    if (!modal) return;
    modal.classList.remove('show');
    modal.setAttribute('aria-hidden', 'true');
  }

  openBtns.forEach(b => b && b.addEventListener('click', openModal));
  closeBtn && closeBtn.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e)=>{ if(e.target === modal){ closeModal(); }});
  window.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeModal(); });
});

// ===== Preloader
window.addEventListener('load', () => {
  const pl = document.getElementById('preloader');
  setTimeout(()=> pl?.classList.add('hidden'), 200);
});

// ===== Add token to MetaMask
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
            address: window.SKY.TOKEN_ADDRESS,
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

// ===== Add/Switch BSC Network (both buttons: in steps and in modal)
document.addEventListener('DOMContentLoaded', () => {
  function addBSC(){
    if(!window.ethereum){ alert('MetaMask не найден'); return; }
    window.ethereum.request({ method: 'eth_chainId' }).then((cid)=>{
      if (cid === '0x38') return; // already on BSC
      return window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }]
      }).catch((switchError) => {
        if (switchError.code === 4902) {
          return window.ethereum.request({
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
    });
  }
  const b1 = document.getElementById('addBSCBtn');
  const b2 = document.getElementById('addBSCBtnModal');
  b1 && b1.addEventListener('click', addBSC);
  b2 && b2.addEventListener('click', addBSC);
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

    // Show short address on both button and header span
    const shortAddr = account.slice(0, 6) + '...' + account.slice(-4);
    const btn = document.getElementById('connectWalletBtn');
    if (btn) btn.textContent = shortAddr;
    const span = document.getElementById('wallet-address');
    if (span) span.textContent = shortAddr;

    try { localStorage.setItem('walletAddress', account); } catch(e){}

  } catch (err) {
    console.error('connectWallet error', err);
    alert('Ошибка подключения кошелька');
  }
}

// Attach handler to both hero & topbar (same id used)
document.addEventListener('DOMContentLoaded', () => {
  const cw = document.getElementById('connectWalletBtn');
  cw && cw.addEventListener('click', connectWallet);
});
