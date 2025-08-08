
// ===== Config =====
window.SKY = {
  TOKEN_ADDRESS: "0x5eb08cfdbad39ff95418bb6283a471f45ec90bf8",
  DAO_ADDRESS: "0xBD2eD7873a807F69c24934e6Ae48756ED18d5867",
  ADMIN_ADDRESS: "0x7099d7CE5495c61c0e5614b133B81295DC7b9c09"
};

// ===== Reveal on scroll =====
const _revealObs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      _revealObs.unobserve(entry.target);
    }
  });
}, {threshold:0.1, rootMargin:'0px 0px -10% 0px'});
document.addEventListener("DOMContentLoaded", ()=>{
  document.querySelectorAll('.reveal, .fade-up, .fade-left, .fade-right').forEach(el=>_revealObs.observe(el));
});

// ===== Parallax background via background-position
function parallaxTick(){
  const y = Math.round(window.scrollY * 0.2);
  const bg = document.getElementById('parallax-bg');
  if(bg) bg.style.backgroundPosition = 'center ' + (-y) + 'px';
}
window.addEventListener('scroll', parallaxTick);

// ===== Guard anchors & smooth scroll
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

// ===== Scrollspy
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = Array.from(document.querySelectorAll('#topbar .nav-link'));
  const sections = navLinks.map(l => ({link:l, el: document.querySelector(l.getAttribute('href'))})).filter(s=>s.el);
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const s = sections.find(x => x.el === entry.target);
      if (!s) return;
      if (entry.isIntersecting){
        navLinks.forEach(x => x.classList.remove('active'));
        s.link.classList.add('active');
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px', threshold: 0.01 });
  sections.forEach(s => spy.observe(s.el));
});

// ===== Back to top
document.addEventListener('DOMContentLoaded', () => {
  const b = document.getElementById('backToTop');
  window.addEventListener('scroll', () => { if (b) b.style.display = (scrollY>600?'block':'none'); });
  b?.addEventListener('click', ()=> window.scrollTo({top:0, behavior:'smooth'}));
});

// ===== Copy contract
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('copyContractBtn');
  if (!btn) return;
  btn.addEventListener('click', async () => {
    try{
      await navigator.clipboard.writeText(btn.dataset.contract);
      const old = btn.textContent; btn.textContent = 'Скопировано ✓';
      setTimeout(()=> btn.textContent = old, 1200);
    }catch(e){ alert('Не удалось скопировать'); }
  });
});

// ===== Buy modal
document.addEventListener('DOMContentLoaded', () => {
  const openBtns = [document.getElementById('openBuyModal'), document.getElementById('buyBtn')];
  const closeBtn = document.getElementById('closeBuyModal');
  const modal = document.getElementById('buyModal');
  function open(){ if(!modal) return; modal.classList.add('show'); modal.setAttribute('aria-hidden','false'); }
  function close(){ if(!modal) return; modal.classList.remove('show'); modal.setAttribute('aria-hidden','true'); }
  openBtns.forEach(b => b && b.addEventListener('click', open));
  closeBtn && closeBtn.addEventListener('click', close);
  modal?.addEventListener('click', (e)=>{ if(e.target===modal) close(); });
  window.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });
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

// ===== Add/Switch BSC Network
document.addEventListener('DOMContentLoaded', () => {
  function addBSC(){
    if(!window.ethereum){ alert('MetaMask не найден'); return; }
    window.ethereum.request({ method: 'eth_chainId' }).then((cid)=>{
      if (cid === '0x38') return; // already
      return window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x38' }]
      }).catch((switchError) => {
        if (switchError.code === 4001){ /* user rejected */ return; }
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
  document.getElementById('addBSCBtn')?.addEventListener('click', addBSC);
  document.getElementById('addBSCBtnModal')?.addEventListener('click', addBSC);
});

// ===== Robust MetaMask connect with error handling
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
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x38') {
        try {
          await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x38' }] });
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
          } else if (switchError.code === 4001) {
            alert('Вы отменили переключение сети.');
            return;
          } else {
            console.error('switch error', switchError);
          }
        }
      }
    } catch(e){ console.warn('chainId check failed', e); }

    const short = account.slice(0,6) + '...' + account.slice(-4);
    document.getElementById('connectWalletBtn')?.setAttribute('data-address', account);
    const btn = document.getElementById('connectWalletBtn');
    if (btn) btn.textContent = short;
    const span = document.getElementById('wallet-address');
    if (span) span.textContent = short;

    try { localStorage.setItem('walletAddress', account); } catch(e){}

  } catch (err) {
    if (err && err.code === 4001) {
      alert('Вы отменили подключение.');
      return;
    }
    console.error('connectWallet error', err);
    alert('Ошибка подключения кошелька.');
  }
}

// Attach click
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('connectWalletBtn')?.addEventListener('click', connectWallet);
  // restore address if saved
  try{
    const saved = localStorage.getItem('walletAddress');
    if (saved){
      const short = saved.slice(0,6)+'...'+saved.slice(-4);
      const btn = document.getElementById('connectWalletBtn');
      if (btn) btn.textContent = short;
      const span = document.getElementById('wallet-address');
      if (span) span.textContent = short;
    }
  }catch(e){}
});

// ===== Particles for features
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

  function reset(){
    const COUNT = Math.floor((w*h)/30000) + 30;
    points = new Array(COUNT).fill(0).map(()=> ({
      x: Math.random()*w, y: Math.random()*h,
      vx: (Math.random()-.5)*0.3, vy: (Math.random()-.5)*0.3,
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
