
// ===== Better wallet connect with error codes =====
function short(addr){ return addr ? addr.slice(0,6) + '...' + addr.slice(-4) : ''; }

async function connectWallet() {
  if (typeof window.ethereum === 'undefined') {
    if (confirm('MetaMask не найден. Установить сейчас?')) {
      window.open('https://metamask.io/download/', '_blank');
    }
    return;
  }

  try {
    // 1) Request account access
    const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
    const account = accounts && accounts[0];
    if (!account) { alert('Кошелёк не дал доступ к адресу'); return; }

    // 2) Ensure BSC network
    try {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== '0x38') {
        try {
          await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x38' }] });
        } catch (switchErr) {
          // 4902: chain not added
          if (switchErr && switchErr.code === 4902) {
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
          } else if (switchErr && switchErr.code === 4001) {
            // user rejected switching
            alert('Вы отменили переключение сети на BSC');
            return;
          } else {
            console.error('wallet_switchEthereumChain error:', switchErr);
            alert('Не удалось переключить сеть на BSC');
            return;
          }
        }
      }
    } catch (cidErr) {
      console.warn('eth_chainId failed:', cidErr);
      // not fatal
    }

    // 3) UI: show address
    const btn = document.getElementById('connectWalletBtn');
    const span = document.getElementById('wallet-address');
    if (btn) btn.textContent = short(account);
    if (span) span.textContent = short(account);
    try { localStorage.setItem('walletAddress', account); } catch(e){}

    // 4) subscribe to changes
    try {
      window.ethereum.removeAllListeners && window.ethereum.removeAllListeners('accountsChanged');
      window.ethereum.on && window.ethereum.on('accountsChanged', (accs)=>{
        const a = accs && accs[0];
        if (!a) { if(btn) btn.textContent = 'Подключить кошелёк'; if(span) span.textContent=''; return; }
        if (btn) btn.textContent = short(a);
        if (span) span.textContent = short(a);
        try{ localStorage.setItem('walletAddress', a); }catch(e){}
      });
      window.ethereum.removeAllListeners && window.ethereum.removeAllListeners('chainChanged');
      window.ethereum.on && window.ethereum.on('chainChanged', (cid)=>{
        if (cid !== '0x38') {
          console.warn('Вы не в сети BSC:', cid);
        }
      });
    } catch (subErr) { console.warn('Listener attach failed:', subErr); }

  } catch (err) {
    console.error('eth_requestAccounts error:', err);
    if (err && err.code === 4001) {
      alert('Вы отменили подключение кошелька');
    } else {
      alert('Ошибка подключения кошелька');
    }
  }
}

// Attach handler on DOM ready (topbar button)
document.addEventListener('DOMContentLoaded', ()=>{
  const btn = document.getElementById('connectWalletBtn');
  if (btn) btn.addEventListener('click', connectWallet);

  // restore saved address
  try{
    const saved = localStorage.getItem('walletAddress');
    if (saved) {
      const s = short(saved);
      const b = document.getElementById('connectWalletBtn');
      const w = document.getElementById('wallet-address');
      if (b) b.textContent = s;
      if (w) w.textContent = s;
    }
  }catch(e){}
});
