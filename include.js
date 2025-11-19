document.addEventListener('DOMContentLoaded', () => {
  const includes = document.querySelectorAll('[data-include]');
  includes.forEach(async (el) => {
    const path = el.getAttribute('data-include');
    if (!path) return;
    try {
      const res = await fetch(path, { cache: 'no-store' });
      if (!res.ok) throw new Error('Failed to fetch ' + path);
      const html = await res.text();
      el.innerHTML = html;
    } catch (e) {
      console.error('Include error:', e);
    }
  });
});
