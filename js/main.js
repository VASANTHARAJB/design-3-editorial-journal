/* Jbel-journal.org - shared script */
const $ = s => document.querySelector(s), $$ = s => document.querySelectorAll(s);

/* Header shadow + mobile menu */
const hdr = $('#hdr');
if (hdr) addEventListener('scroll', () => hdr.classList.toggle('scrolled', scrollY > 20));
const burger = $('#burger'), nav = $('#nav');
if (burger) burger.onclick = () => nav.classList.toggle('open');

/* ---------- Sample data: replace with real content ---------- */
const articles = [
  {t:'Digital Transformation in Higher Education: A Systematic Review', a:'A. Kumar, R. Singh', p:'1-14', c:'Review'},
  {t:'Impact of Artificial Intelligence on Student Learning Outcomes', a:'S. Menon, P. Das', p:'15-28', c:'Research'},
  {t:'Sustainable Business Models for Small Enterprises', a:'L. Fernandez', p:'29-41', c:'Research'},
  {t:'Language Acquisition in Multilingual Classrooms', a:'N. Iyer, M. Rao', p:'42-55', c:'Case Study'},
  {t:'Open Educational Resources: Trends and Challenges', a:'T. Hassan', p:'56-68', c:'Review'}
];
const archive = {
  2026: ['Vol 3, Issue 2 - Nov 2026', 'Vol 3, Issue 1 - May 2026'],
  2025: ['Vol 2, Issue 2 - Nov 2025', 'Vol 2, Issue 1 - May 2025'],
  2024: ['Vol 1, Issue 2 - Nov 2024', 'Vol 1, Issue 1 - May 2024']
};
const board = [
  ['Dr. Anand Krishnan', 'Editor-in-Chief', 'University of Madras'],
  ['Dr. Priya Raman', 'Associate Editor', 'Anna University'],
  ['Prof. John Mathews', 'Managing Editor', 'University of Cambridge'],
  ['Dr. Sara Ali', 'Editorial Member', 'University of Dubai'],
  ['Dr. Rahul Verma', 'Editorial Member', 'IIT Delhi'],
  ['Dr. Meera Nair', 'Editorial Member', 'University of Kerala']
];

/* Articles (supports ?q=search and data-limit) */
const box = $('#articles');
if (box) {
  const q = (new URLSearchParams(location.search).get('q') || '').toLowerCase().trim();
  let list = articles.filter(x => (x.t + x.a + x.c).toLowerCase().includes(q));
  const lim = +box.dataset.limit; if (lim) list = list.slice(0, lim);
  box.innerHTML = list.length ? list.map((x, i) =>
    `<div class="article"><span class="no">0${i + 1}</span><div class="a-body"><h3>${x.t}</h3><p><span class="tag">${x.c}</span>${x.a} &bull; Pages ${x.p}</p></div><a href="#" class="pdf">Download PDF</a></div>`
  ).join('') : '<p class="empty">No articles match your search.</p>';
  const sb = $('#q'); if (sb) sb.value = q;
}

/* Archive */
const arch = $('#arch');
if (arch) {
  const years = $('#years');
  const show = y => {
    $$('#years button').forEach(b => b.classList.toggle('on', b.textContent == y));
    arch.innerHTML = archive[y].map(i => `<a href="current-issue.html" class="arch-item"><b>${i}</b><span>View all articles &rarr;</span></a>`).join('');
  };
  years.innerHTML = Object.keys(archive).reverse().map(y => `<button type="button">${y}</button>`).join('');
  $$('#years button').forEach(b => b.onclick = () => show(b.textContent));
  show(Object.keys(archive).reverse()[0]);
}

/* Editorial board */
const bl = $('#boardList');
if (bl) bl.innerHTML = board.map(m =>
  `<div class="member"><div class="avatar">${m[0].split(' ').pop()[0]}</div><h3>${m[0]}</h3><em>${m[1]}</em><small>${m[2]}</small></div>`).join('');

/* Counters + scroll reveal */
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  const el = e.target;
  el.classList.add('show');
  el.querySelectorAll('[data-n]').forEach(c => {
    const n = +c.dataset.n; let v = 0;
    const t = setInterval(() => { v += Math.ceil(n / 50); if (v >= n) { v = n; clearInterval(t); } c.textContent = v + '+'; }, 30);
  });
  io.unobserve(el);
}), {threshold: .15});
$$('.reveal').forEach(el => io.observe(el));

/* Contact form (front-end demo - connect to Formspree / PHP for real emails) */
const cf = $('#cform');
if (cf) cf.onsubmit = e => {
  e.preventDefault();
  $('#msg').textContent = 'Thank you! Your message has been received.';
  cf.reset();
};
const yr = $('#yr'); if (yr) yr.textContent = new Date().getFullYear();
