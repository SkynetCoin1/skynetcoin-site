
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.getElementById('offline-refresh') || document.querySelector('button');
  if(btn){
    btn.addEventListener('click', () => { location.reload(); }, {passive:true});
  }
});
