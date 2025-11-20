document.addEventListener('DOMContentLoaded', async () => {
  // NAVBAR betöltése
  const navContainer = document.getElementById('navbar-container');
  if(navContainer) {
    try {
      const r = await fetch('navbar.html', {cache:'no-store'});
      if(r.ok) navContainer.innerHTML = await r.text();
      else console.error('Navbar fetch error', r.status);
    } catch(e) { console.error('Navbar fetch failed', e); }
  }

  // FOOTER betöltése
  const footerContainer = document.getElementById('footer-container');
  if(footerContainer) {
    try {
      const r2 = await fetch('footer.html', {cache:'no-store'});
      if(r2.ok) footerContainer.innerHTML = await r2.text();
      else console.error('Footer fetch error', r2.status);
    } catch(e){ console.error('Footer fetch failed', e); }
  }

  // Ha a navbar.html-ben van beágyazott menü-kezelő, akkor nem kell többet csinálni.
  // Ha mégis szükséges további inicalizáció (pl. ha nincs helyi script), itt is futtathatunk egy setup függvényt.
});
