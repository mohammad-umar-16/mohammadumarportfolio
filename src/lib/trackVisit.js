// Sends one "visit" ping per browser session, only from real browsers that stay on the page.
export function trackVisit() {
  try {
    // Open mohammadumar.dev/?me once in your own browser to stop alerts for yourself
    if (new URLSearchParams(location.search).has('me')) localStorage.setItem('owner', '1');
    if (localStorage.getItem('owner') || sessionStorage.getItem('visited')) return;
    sessionStorage.setItem('visited', '1'); // refreshes in the same session don't re-send
  } catch { return; } // storage blocked: skip rather than spam

  // Wait 3s and require the tab to be visible, which filters out most bounces and prefetchers
  setTimeout(() => {
    if (document.visibilityState !== 'visible') return;
    fetch('/api/visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ path: location.pathname, ref: document.referrer || 'direct' }),
      keepalive: true,
    }).catch(() => {});
  }, 3000);
}
