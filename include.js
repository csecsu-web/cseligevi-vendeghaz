document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-include]').forEach(async el => {
    const src = el.getAttribute('data-include');
    try {
      const res = await fetch(src, {cache: 'no-cache'});
      el.outerHTML = await res.text();
    } catch {}
  });
});
