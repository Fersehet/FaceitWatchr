import { renderOverlay } from './render.js';
import { createIntro, createLoader } from './loader.js';
import { initLangSelect, locale, setText, showText, t, tx, widgetName, wx } from './i18n.js';
import { loadStats, renderStats } from './stats.js';

const $ = (id) => document.getElementById(id);

const api = async (method, url, body) => {
  const res = await fetch(url, {
    method,
    headers: body ? { 'Content-Type': 'application/json' } : undefined,
    body: body ? JSON.stringify(body) : undefined,
  });
  // Sitzung abgelaufen
  if (res.status === 401) location.href = `/login.html?next=${encodeURIComponent(location.pathname)}`;
  if (!res.ok && res.status !== 204) throw new Error((await res.json().catch(() => ({}))).error ?? res.statusText);
  return res.status === 204 ? null : res.json();
};

let overlays = [];
let overlay = null;
let state = null;
let scale = 1;

// ---------- Speichern ----------

let saveTimer = null;
function scheduleSave() {
  clearTimeout(saveTimer);
  // Das geänderte Overlay festhalten: Wird inzwischen ein anderes geöffnet, darf die Änderung nicht verloren gehen
  const target = overlay;
  saveTimer = setTimeout(async () => {
    const saved = await api('PUT', `/api/overlays/${target.id}`, target);
    overlays = overlays.map((o) => (o.id === saved.id ? saved : o));
    renderOverlaySelect();
  }, 300);
}

function changed() {
  drawPreview();
  scheduleSave();
}

// ---------- Vorschau ----------

function drawPreview() {
  const preview = $('preview');
  const area = document.querySelector('.preview-area');
  const { width, height } = overlay.style;
  const pad = getComputedStyle(area);
  const freeWidth = area.clientWidth - parseFloat(pad.paddingLeft) - parseFloat(pad.paddingRight) - 52;
  scale = Math.min(2, freeWidth / width, (area.clientHeight - 168) / height);
  scale = Math.max(0.2, scale);
  preview.style.transform = `scale(${scale})`;
  preview.style.marginRight = `${width * (scale - 1)}px`;
  preview.style.marginBottom = `${height * (scale - 1)}px`;
  renderOverlay(preview, overlay, state);
}

/** Overlay-Leiste über dem Vorschaubereich mit der Maus am Griff verschieben, Position bleibt gespeichert. */
function setupPickerDrag() {
  const bar = $('overlayPicker');
  const area = bar.parentElement;
  const place = (x, y) => {
    // Ausgeblendet (Statistik-Tab) oder schmal (Leiste fest im Fluss) gibt es keine passenden Maße, dann nicht begrenzen
    const free = area.clientWidth && getComputedStyle(bar).position === 'absolute';
    // Rechts nicht unter die Ansichten-Leiste schieben (dafür hat der Bereich breiten Innenabstand)
    const pad = parseFloat(getComputedStyle(area).paddingRight);
    const maxX = free ? area.clientWidth - (pad > 24 ? pad : 0) - bar.offsetWidth : Infinity;
    const maxY = free ? area.clientHeight - bar.offsetHeight : Infinity;
    bar.style.left = `${Math.round(Math.max(0, Math.min(x, maxX)))}px`;
    bar.style.top = `${Math.round(Math.max(0, Math.min(y, maxY)))}px`;
    bar.style.right = 'auto';
  };
  let saved = null;
  try {
    saved = JSON.parse(localStorage.getItem('fw-picker-pos'));
  } catch {}
  if (saved) place(saved.x, saved.y);
  addEventListener('resize', () => {
    // Nur begrenzen, wenn die Leiste frei steht und sichtbar ist, sonst ginge die gespeicherte Position verloren
    if (bar.style.left && area.clientWidth && getComputedStyle(bar).position === 'absolute') place(bar.offsetLeft, bar.offsetTop);
  });

  bar.querySelector('.picker-grip').addEventListener('pointerdown', (e) => {
    if (e.button !== 0 || getComputedStyle(bar).position !== 'absolute') return;
    e.preventDefault();
    const dx = e.clientX - bar.offsetLeft;
    const dy = e.clientY - bar.offsetTop;
    bar.classList.add('dragging');
    const move = (ev) => place(ev.clientX - dx, ev.clientY - dy);
    const up = () => {
      bar.classList.remove('dragging');
      removeEventListener('pointermove', move);
      removeEventListener('pointerup', up);
      try {
        localStorage.setItem('fw-picker-pos', JSON.stringify({ x: bar.offsetLeft, y: bar.offsetTop }));
      } catch {}
    };
    addEventListener('pointermove', move);
    addEventListener('pointerup', up);
  });
}

// ---------- Stat-Liste ----------

function field(label, input, cls = '') {
  const wrap = document.createElement('label');
  if (cls) wrap.className = cls;
  if (input.type === 'checkbox') {
    wrap.classList.add('inline');
    wrap.append(input, label);
  } else {
    wrap.append(label, input);
  }
  return wrap;
}

function input(type, value, onInput, attrs = {}) {
  const node = document.createElement('input');
  node.type = type;
  Object.assign(node, attrs);
  if (type === 'checkbox') node.checked = value;
  else node.value = value;
  node.addEventListener('input', () => onInput(type === 'checkbox' ? node.checked : type === 'number' || type === 'range' ? Number(node.value) : node.value, node));
  return node;
}

function renderWidgetList() {
  const list = $('widgetList');
  list.replaceChildren();

  for (const w of overlay.widgets) {
    const li = document.createElement('li');
    const head = document.createElement('label');
    head.className = 'head';
    const toggle = input('checkbox', w.enabled, (v) => {
      w.enabled = v;
      changed();
    });
    toggle.setAttribute('aria-label', t('show', { n: widgetName(w.label) }));
    const name = document.createElement('span');
    name.append(w.label ? wx(w.label) : w.type);
    head.append(toggle, name);
    li.append(head);
    list.appendChild(li);
  }
}

// ---------- Design ----------

const STYLE_FIELDS = [
  ['background', 'background', 'color'],
  ['backgroundOpacity', 'opacity', 'range', { min: 0, max: 1, step: 0.05 }],
  ['textColor', 'textColor', 'color'],
  ['accentColor', 'accentColor', 'color'],
  ['showAvatarFrame', 'showFrame', 'checkbox'],
  ['statsPeriod', 'statsPeriod', 'select', { options: [['cycle', 'statsCycle'], ['season', 'statsSeason'], ['alltime', 'statsAllTime']] }],
  ['statsCycleSeconds', 'statsCycleSeconds', 'number', { min: 3, max: 600 }],
];

function renderStyleForm() {
  const form = $('styleForm');
  form.replaceChildren();
  for (const [key, labelKey, type, attrs] of STYLE_FIELDS) {
    // Die Sekunden gelten nur beim Wechseln
    if (key === 'statsCycleSeconds' && (overlay.style.statsPeriod ?? 'cycle') !== 'cycle') continue;
    const label = tx(labelKey);
    const set = (v) => {
      overlay.style[key] = key === 'statsCycleSeconds' ? Math.max(3, v || 10) : v;
      changed();
      if (key === 'statsPeriod') renderStyleForm();
    };
    if (type === 'select') {
      const options = attrs.options.map(([value, key]) => [value, t(key)]);
      const select = document.createElement('select');
      for (const [value, text] of options) select.add(new Option(text, value, false, value === overlay.style[key]));
      select.addEventListener('change', () => set(select.value));
      form.appendChild(field(label, select, 'full'));
    } else if (type === 'checkbox') {
      form.appendChild(field(label, input('checkbox', !!overlay.style[key], set), 'full'));
    } else {
      form.appendChild(field(label, input(type, overlay.style[key], set, attrs)));
    }
  }
}

// ---------- Overlays verwalten ----------

function renderOverlaySelect() {
  const select = $('overlaySelect');
  select.replaceChildren(...overlays.map((o) => new Option(o.name, o.id, false, o.id === overlay?.id)));
}

async function openOverlay(id) {
  overlay = await api('GET', `/api/overlays/${id}`);
  localStorage.setItem('fw-overlay', id);
  $('overlayName').value = overlay.name;
  $('obsUrl').value = `${location.origin}/overlay/${overlay.id}`;
  renderOverlaySelect();
  renderWidgetList();
  renderStyleForm();
  drawPreview();
}

// ---------- Live-Status ----------

function renderStatus() {
  const status = $('status');
  if (state?.error) {
    status.className = 'status error';
    status.textContent = state.error;
    status.title = state.error;
  } else {
    status.className = `status ${state?.demo ? 'demo' : 'live'}`;
    const [key, vars] = state?.demo ? ['demo'] : state?.player ? ['live', { n: state.player.nickname }] : ['connecting'];
    setText(status, key, vars);
    status.title = t(key, vars);
  }
  if (document.activeElement !== $('nickname')) $('nickname').value = state?.nickname ?? '';
  if (document.activeElement !== $('frameUrl')) $('frameUrl').value = state?.avatarFrameOverride ?? '';
  setText($('frameInfo'), state?.avatarFrameOverride ? 'frameCustom' : state?.player?.avatarFrame ? 'frameFound' : 'frameNone');
  if (document.activeElement !== $('seasonStart')) $('seasonStart').value = state?.seasonStart ?? '';
  const season = state?.season;
  if (season) setText($('seasonInfo'), 'season', { w: season.wins, l: season.losses, m: season.matches, r: season.winRate });
  else setText($('seasonInfo'), state?.seasonStart ? '' : 'seasonNone');
  const s = state?.session;
  setText($('sessionInfo'), s && 'session', s && { t: new Date(s.startedAt).toLocaleString(locale()), w: s.wins, l: s.losses, e: `${s.eloChange >= 0 ? '+' : ''}${s.eloChange}` });
  renderRecentElo();
}

// ---------- Elo der letzten Matches ----------

function renderRecentElo() {
  const list = $('recentEloList');
  // Nicht neu zeichnen, während eine Zahl eingetippt wird
  if (list.contains(document.activeElement)) return;
  list.replaceChildren();
  for (const m of state?.recentMatches ?? []) {
    if (!m.matchId) continue;
    const li = document.createElement('li');
    const res = Object.assign(document.createElement('span'), { className: `res ${m.result}`, textContent: m.result });
    const date = m.finishedAt ? new Date(m.finishedAt).toLocaleString(locale(), { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' }) : '';
    const info = Object.assign(document.createElement('span'), { className: 'info' });
    setText(info, (l) => [m.map.replace(/^de_/, ''), date, m.ranked === false ? t('noElo', null, l) : ''].filter(Boolean).join(' · ') + (m.mvp ? ' 👑' : ''));
    const amount = m.eloChange == null ? '' : String(Math.abs(m.eloChange));
    const field = Object.assign(document.createElement('input'), { type: 'number', min: 0, max: 100, step: 1 });
    // Geschätzt: nur als Platzhalter zeigen, damit klar ist, dass noch nichts eingetragen wurde
    if (m.estimated) {
      field.placeholder = amount;
      field.classList.add('estimated');
    } else field.value = amount;
    field.addEventListener('change', async () => {
      state = await api('PUT', `/api/matches/${encodeURIComponent(m.matchId)}/elo`, { elo: field.value === '' ? null : Number(field.value) });
      field.blur();
      renderStatus();
      drawPreview();
    });
    li.append(res, info, field);
    list.appendChild(li);
  }
}

// ---------- Tabs ----------

let tab = 'overlay';
const VIEWS = ['overlay', 'stats'];
const viewOf = (name) => $(name === 'stats' ? 'statsView' : 'overlayView');
let switching = null;

// Wechsel wie ein Scroll auf der Website: alte Ansicht gleitet nach oben weg, neue kommt von unten (rückwärts umgekehrt)
function slide(from, to) {
  const dir = VIEWS.indexOf(to) > VIEWS.indexOf(from) ? 1 : -1;
  const out = viewOf(from);
  const into = viewOf(to);
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  switching?.cancel();
  if (reduced || !out.animate) {
    out.hidden = true;
    showView(into);
    return;
  }
  const ease = 'cubic-bezier(.5, 0, .2, 1)';
  const anim = out.animate(
    [{ transform: 'none', opacity: 1, filter: 'blur(0)' }, { transform: `translateY(${-dir * 60}px)`, opacity: 0, filter: 'blur(4px)' }],
    { duration: 220, easing: ease },
  );
  switching = anim;
  anim.finished.then(() => {
    out.hidden = true;
    showView(into);
    switching = into.animate(
      [{ transform: `translateY(${dir * 80}px)`, opacity: 0, filter: 'blur(4px)' }, { transform: 'none', opacity: 1, filter: 'blur(0)' }],
      { duration: 380, easing: 'cubic-bezier(.2, .8, .3, 1)' },
    );
  }, () => {});
}

function setTab(next, animate = true) {
  const prev = tab;
  tab = next === 'stats' ? 'stats' : 'overlay';
  for (const button of document.querySelectorAll('.tabs [data-tab]')) button.setAttribute('aria-selected', String(button.dataset.tab === tab));
  for (const link of document.querySelectorAll('.rail [data-tab]')) {
    link.classList.toggle('active', link.dataset.tab === tab);
    link.classList.toggle('passed', VIEWS.indexOf(link.dataset.tab) < VIEWS.indexOf(tab));
    link.toggleAttribute('aria-current', link.dataset.tab === tab);
  }
  $('rail').style.setProperty('--fill', String(VIEWS.indexOf(tab) / (VIEWS.length - 1)));
  if (animate && prev !== tab) slide(prev, tab);
  else {
    viewOf(tab === 'stats' ? 'overlay' : 'stats').hidden = true;
    showView(viewOf(tab));
  }
  document.body.classList.toggle('tab-stats', tab === 'stats');
  history.replaceState(null, '', tab === 'stats' ? '#stats' : location.pathname + location.search);
  if (tab === 'stats') loadStats();
}

// Die Vorschau misst ihre Fläche, also erst zeichnen, wenn die Overlay-Ansicht sichtbar ist
function showView(view) {
  view.hidden = false;
  if (view.id === 'overlayView' && overlay) drawPreview();
}

for (const button of document.querySelectorAll('.tabs [data-tab]')) button.addEventListener('click', () => setTab(button.dataset.tab));
for (const link of document.querySelectorAll('.rail [data-tab]')) {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    setTab(link.dataset.tab);
  });
}
setTab(location.hash === '#stats' ? 'stats' : 'overlay', false);

// Mausrad wechselt die Ansicht wie Scrollen auf der Website: über der Vorschau nach unten = Statistiken,
// in den Statistiken ganz oben nach oben = Overlay. Die Seitenleiste scrollt weiter normal.
const wheelWide = matchMedia('(min-width: 1100px)');
let wheelSum = 0;
let wheelLock = 0;
let wheelReset = 0;
document.addEventListener('wheel', (e) => {
  if (!wheelWide.matches || e.ctrlKey || Math.abs(e.deltaY) < Math.abs(e.deltaX)) return;
  if (e.target.closest('input, select, textarea, aside, .overlay-picker')) return;
  const down = e.deltaY > 0;
  const want =
    tab === 'overlay' && down && e.target.closest('.preview-area') ? 'stats'
    : tab === 'stats' && !down && $('statsView').scrollTop <= 0 ? 'overlay'
    : null;
  if (!want) {
    wheelSum = 0;
    return;
  }
  e.preventDefault();
  if (Date.now() < wheelLock) return;
  // Kleine Trackpad-Bewegungen sammeln, damit nicht jeder Hauch umschaltet
  wheelSum += e.deltaMode === 1 ? e.deltaY * 16 : e.deltaY;
  clearTimeout(wheelReset);
  wheelReset = setTimeout(() => (wheelSum = 0), 250);
  if (Math.abs(wheelSum) < 60) return;
  wheelSum = 0;
  wheelLock = Date.now() + 900;
  setTab(want);
}, { passive: false });

// ---------- Start ----------

async function init() {
  const intro = createIntro($('intro'));
  const previewLoader = createLoader(document.querySelector('.preview-area'));
  // Änderungen, die vom Server geladen werden, zeigen den Ladebildschirm über der Vorschau
  const busy = (task) => previewLoader.wrap(task);

  await intro.wrap(async () => {
    state = await api('GET', '/api/state');
    intro.progress(0.7);
    overlays = await api('GET', '/api/overlays');
    intro.progress(0.85);
    renderStatus();

    const remembered = localStorage.getItem('fw-overlay');
    await openOverlay(overlays.some((o) => o.id === remembered) ? remembered : overlays[0].id);
  });
  setupPickerDrag();

  $('overlaySelect').addEventListener('change', (e) => busy(openOverlay(e.target.value)));
  $('overlayName').addEventListener('input', (e) => {
    overlay.name = e.target.value || 'Overlay';
    scheduleSave();
  });
  $('newOverlay').addEventListener('click', async () => {
    await busy(async () => {
      const created = await api('POST', '/api/overlays', { name: t('newOverlay') });
      overlays.push(created);
      await openOverlay(created.id);
    });
  });
  $('copyOverlay').addEventListener('click', async () => {
    await busy(async () => {
      const created = await api('POST', '/api/overlays', { name: t('copyName', { n: overlay.name }), copyFrom: overlay.id });
      overlays.push(created);
      await openOverlay(created.id);
    });
  });
  $('resetOverlay').addEventListener('click', async () => {
    if (!confirm(t('confirmReset', { n: overlay.name }))) return;
    clearTimeout(saveTimer);
    await busy(async () => {
      await api('POST', `/api/overlays/${overlay.id}/reset`);
      await openOverlay(overlay.id);
    });
  });
  $('deleteOverlay').addEventListener('click', async () => {
    if (!confirm(t('confirmDelete', { n: overlay.name }))) return;
    try {
      await busy(async () => {
        await api('DELETE', `/api/overlays/${overlay.id}`);
        overlays = overlays.filter((o) => o.id !== overlay.id);
        await openOverlay(overlays[0].id);
      });
    } catch (err) {
      alert(err.message);
    }
  });

  $('nicknameForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    state = await busy(api('PUT', '/api/nickname', { nickname: $('nickname').value }));
    renderStatus();
    drawPreview();
  });
  $('frameForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    try {
      state = await busy(api('PUT', '/api/avatar-frame', { url: $('frameUrl').value }));
      renderStatus();
      drawPreview();
    } catch (err) {
      alert(err.message);
    }
  });
  $('seasonStart').addEventListener('change', async (e) => {
    state = await busy(api('PUT', '/api/season', { start: e.target.value }));
    renderStatus();
    drawPreview();
  });
  $('refresh').addEventListener('click', async () => {
    state = await busy(api('POST', '/api/refresh'));
    renderStatus();
    drawPreview();
  });
  $('resetSession').addEventListener('click', async () => {
    state = await busy(api('POST', '/api/session/reset'));
    renderStatus();
    drawPreview();
  });
  $('copyUrl').addEventListener('click', async () => {
    await navigator.clipboard?.writeText($('obsUrl').value);
    showText($('copyUrl'), 'copied');
    setTimeout(() => showText($('copyUrl'), 'copy'), 1500);
  });

  window.addEventListener('resize', drawPreview);

  const events = new EventSource('/api/events');
  events.addEventListener('state', (e) => {
    state = JSON.parse(e.data);
    renderStatus();
    drawPreview();
    if (tab === 'stats') loadStats();
  });
}

// Angemeldeten Nutzer zeigen und Abmelden anbieten
async function initAccount() {
  $('logout').addEventListener('click', async () => {
    await fetch('/api/logout', { method: 'POST' });
    location.href = '/login.html';
  });
  const me = await fetch('/api/me').then((r) => r.json()).catch(() => null);
  if (me?.user) $('accountName').textContent = me.user;
  $('startPage').hidden = !me?.startPage;
}

// Sprache: feste Texte übersetzt i18n.js, die selbst gebauten Teile werden neu gezeichnet
initLangSelect($('langSel'));
document.addEventListener('fw:lang', () => {
  if (tab === 'stats') renderStats();
  if (!overlay) return;
  renderStatus();
  renderWidgetList();
  renderStyleForm();
});

init();
initAccount();
