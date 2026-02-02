const proxyBase = '/p/'; // matches backend route

const urlInput = document.getElementById('url');
const goBtn = document.getElementById('go');
const statusEl = document.getElementById('status');

function proxyGo() {
  let val = urlInput.value.trim();
  if (!val) {
    statusEl.textContent = 'Enter a URL first';
    return;
  }

  if (!val.startsWith('http')) val = 'https://' + val;

  statusEl.textContent = 'Redirecting...';
  window.open(proxyBase + val, '_blank');
}

goBtn.addEventListener('click', proxyGo);

urlInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') proxyGo();
});

// Quick buttons
document.querySelectorAll('.quick button').forEach(btn => {
  btn.addEventListener('click', () => {
    const site = btn.getAttribute('data-site');
    window.open(proxyBase + 'https://' + site, '_blank');
  });
});
