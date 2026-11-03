// Sprachen für Editor und Login. Die Wahl teilt sich der Editor mit der Website (gleicher Schlüssel im localStorage).
// Elemente mit data-i18n bekommen den Text, data-i18n-<attribut> übersetzt ein Attribut (title, placeholder, aria-label).
// Texte stehen in allen Sprachen übereinander im selben Grid-Feld und nur die aktive ist sichtbar.
// So ist jedes Element immer so groß wie seine längste Übersetzung und beim Sprachwechsel springt nichts.

export const LANGS = ['de', 'en', 'ru', 'fr'];

const T = {
  de: {
    langLabel: 'Sprache',
    selectOverlay: 'Overlay auswählen',
    overlayName: 'Name des Overlays',
    movePicker: 'Leiste verschieben',
    new: 'Neu',
    duplicate: 'Duplizieren',
    reset: 'Zurücksetzen',
    resetTitle: 'Stats und Design auf den Standard zurücksetzen',
    delete: 'Löschen',
    website: 'Website',
    logout: 'Abmelden',
    player: 'Spieler',
    nicknamePh: 'Faceit-Nickname',
    save: 'Speichern',
    refresh: 'Jetzt aktualisieren',
    resetSession: 'Session neu starten',
    seasonStart: 'Season-Start (für Season-Stats)',
    avatarFrame: 'Avatar-Rahmen (leer = automatisch von Faceit)',
    obsTitle: 'In OBS einbinden',
    copy: 'Kopieren',
    copied: 'Kopiert!',
    obsHint: 'OBS: Quelle hinzufügen → Browser → URL einfügen. Breite 420 und Höhe 170 eintragen.',
    stats: 'Stats',
    statsHint: 'Haken setzen zum Einblenden. Jedes Element hat einen festen Platz.',
    design: 'Design',
    checker: 'Karomuster = transparent in OBS',
    show: '{n} anzeigen',
    background: 'Hintergrundfarbe',
    opacity: 'Deckkraft Hintergrund',
    textColor: 'Textfarbe',
    accentColor: 'Akzentfarbe (Balken, Ring)',
    showFrame: 'Faceit-Avatar-Rahmen zeigen',
    statsPeriod: 'Werte unten: Season oder All-Time',
    statsCycle: 'Abwechselnd',
    statsSeason: 'Nur Season',
    statsAllTime: 'Nur All-Time',
    statsCycleSeconds: 'Wechsel alle (Sekunden)',
    demo: 'Demo-Modus (kein API-Key)',
    live: 'Live: {n}',
    connecting: 'Verbinde…',
    frameCustom: 'Eigener Rahmen aktiv.',
    frameFound: 'Rahmen von Faceit gefunden.',
    frameNone: 'Kein Rahmen von Faceit gefunden. Du kannst hier die Bild-Adresse eines Rahmens eintragen.',
    season: 'Season: {w}W / {l}L in {m} Matches ({r}%)',
    seasonNone: 'Ohne Datum zeigt das Overlay nur All-Time-Werte.',
    recentElo: 'Elo der letzten Matches',
    recentEloHint: 'Blasse Zahlen sind geschätzt. Echte Elo eintragen (ohne + oder -), leer lassen = schätzen. Matches ohne Elo (Hub, Turnier) stehen auf 0.',
    session: 'Session seit {t}: {w}W / {l}L, Elo {e}',
    newOverlay: 'Neues Overlay',
    copyName: '{n} (Kopie)',
    confirmReset: 'Overlay „{n}“ auf die Standard-Stats und das Standard-Design zurücksetzen?',
    confirmDelete: 'Overlay „{n}“ wirklich löschen?',
    loginEyebrow: 'Overlay-Editor',
    loginH: 'Anmelden',
    loginSub: 'Nach dem Login landest du direkt im Editor für deine OBS-Overlays.',
    loginUser: 'Benutzername',
    loginPass: 'Passwort',
    loginBtn: 'Anmelden',
    loginWrong: 'Benutzername oder Passwort falsch.',
    loginMissing: 'Bitte Benutzername und Passwort eingeben.',
    loginLocked: 'Zu viele Versuche. Bitte in 15 Minuten erneut probieren.',
    loginDisabled: 'Der Login ist auf diesem Server noch nicht eingerichtet: ADMIN_PASSWORD in der .env eintragen und den Server neu starten.',
    loginNoServer: 'Der FaceitWatchr-Server ist gerade nicht erreichbar.',
    tabOverlay: 'Overlay',
    tabStats: 'Statistiken',
    chartHead: 'Elo-Verlauf · letzte {n} Matches',
    trPeak: 'Höchststand',
    trLow: 'Tiefpunkt',
    trAvg: 'Ø pro Match',
    dtWL: 'Siege / Niederlagen',
    dtMap: 'Beste Map',
    dtLvl: 'Bis Level {l}',
    dtMaxLvl: 'Level 10 erreicht',
    noMatches: 'Noch keine Matches gespeichert. Der Verlauf füllt sich, sobald du spielst.',
    noPlayer: 'Noch kein Spieler geladen.',
    aLoading: 'Lädt…',
    aViews: 'Ansichten',
    estimated: 'geschätzt',
    chartAria: 'Elo-Verlauf über {n} Matches von {a} auf {b}',
    chartSource: 'Alle gespeicherten Faceit-Matches, auch Hubs und Turniere (ohne Elo = grauer Punkt). Ø pro Match zählt nur Matches mit Elo.',
    noElo: 'ohne Elo',
    chartEstimated: 'Hohle Punkte = Elo geschätzt.',
    chartLevelLine: 'Die gestrichelte Linie markiert die Grenze zu Level {l} ({e} Elo).',
    levelsAria: 'Faceit Level und Elo-Grenzen',
    levelCurrent: 'Dein aktuelles Level',
    seasonHead: 'Aktuelle Season',
    seasonSince: 'seit {d}',
    dtSeasonElo: 'Elogewinn',
    dtWr: 'Winrate',
    dtKdSeason: 'K/D',
    seasonNote: 'Siege und Winrate laut Faceit. Elo, K/D und beste Map aus {n} gespeicherten Matches.',
    seasonNoteLate: 'Siege und Winrate laut Faceit. Elo, K/D und beste Map erst ab {d} gespeichert ({n} Matches).',
    seasonNoteFaceit: 'Siege, Winrate und K/D laut Faceit. Elo und beste Map aus {n} gespeicherten Matches.',
    seasonNoteLateFaceit: 'Siege, Winrate und K/D laut Faceit. Elo und beste Map erst ab {d} gespeichert ({n} Matches).',
    seasonNoStart: 'Kein Season-Start gesetzt. Datum im Tab „Overlay“ unter Spieler eintragen.',
  },
  en: {
    langLabel: 'Language',
    selectOverlay: 'Select overlay',
    overlayName: 'Overlay name',
    movePicker: 'Move toolbar',
    new: 'New',
    duplicate: 'Duplicate',
    reset: 'Reset',
    resetTitle: 'Reset stats and design to the default',
    delete: 'Delete',
    website: 'Website',
    logout: 'Sign out',
    player: 'Player',
    nicknamePh: 'Faceit nickname',
    save: 'Save',
    refresh: 'Refresh now',
    resetSession: 'Restart session',
    seasonStart: 'Season start (for season stats)',
    avatarFrame: 'Avatar frame (empty = automatic from Faceit)',
    obsTitle: 'Add to OBS',
    copy: 'Copy',
    copied: 'Copied!',
    obsHint: 'OBS: Add source → Browser → paste the URL. Set width 420 and height 170.',
    stats: 'Stats',
    statsHint: 'Tick to show. Every element has a fixed spot.',
    design: 'Design',
    checker: 'Checkerboard = transparent in OBS',
    show: 'Show {n}',
    background: 'Background colour',
    opacity: 'Background opacity',
    textColor: 'Text colour',
    accentColor: 'Accent colour (bar, ring)',
    showFrame: 'Show Faceit avatar frame',
    statsPeriod: 'Stats at the bottom: season or all-time',
    statsCycle: 'Alternating',
    statsSeason: 'Season only',
    statsAllTime: 'All-time only',
    statsCycleSeconds: 'Switch every (seconds)',
    demo: 'Demo mode (no API key)',
    live: 'Live: {n}',
    connecting: 'Connecting…',
    frameCustom: 'Custom frame active.',
    frameFound: 'Frame found on Faceit.',
    frameNone: 'No frame found on Faceit. You can enter the image address of a frame here.',
    season: 'Season: {w}W / {l}L in {m} matches ({r}%)',
    seasonNone: 'Without a date, the overlay only shows all-time values.',
    recentElo: 'Elo of recent matches',
    recentEloHint: 'Faded numbers are estimates. Enter the real Elo (no + or -), leave empty to estimate. Matches without Elo (hub, tournament) show 0.',
    session: 'Session since {t}: {w}W / {l}L, Elo {e}',
    newOverlay: 'New overlay',
    copyName: '{n} (copy)',
    confirmReset: 'Reset overlay “{n}” to the default stats and design?',
    confirmDelete: 'Really delete overlay “{n}”?',
    loginEyebrow: 'Overlay editor',
    loginH: 'Sign in',
    loginSub: 'After signing in you go straight to the editor for your OBS overlays.',
    loginUser: 'Username',
    loginPass: 'Password',
    loginBtn: 'Sign in',
    loginWrong: 'Wrong username or password.',
    loginMissing: 'Please enter username and password.',
    loginLocked: 'Too many attempts. Please try again in 15 minutes.',
    loginDisabled: 'Login is not set up on this server yet: add ADMIN_PASSWORD to .env and restart the server.',
    loginNoServer: "The FaceitWatchr server can't be reached right now.",
    tabOverlay: 'Overlay',
    tabStats: 'Statistics',
    chartHead: 'Elo history · last {n} matches',
    trPeak: 'Peak',
    trLow: 'Low',
    trAvg: 'Avg per match',
    dtWL: 'Wins / losses',
    dtMap: 'Best map',
    dtLvl: 'To level {l}',
    dtMaxLvl: 'Level 10 reached',
    noMatches: 'No matches saved yet. The history fills up as you play.',
    noPlayer: 'No player loaded yet.',
    aLoading: 'Loading…',
    aViews: 'Views',
    estimated: 'estimated',
    chartAria: 'Elo history over {n} matches from {a} to {b}',
    chartSource: 'All saved Faceit matches, including hubs and tournaments (no Elo = grey dot). Avg per match only counts matches with Elo.',
    noElo: 'no Elo',
    chartEstimated: 'Hollow dots = estimated Elo.',
    chartLevelLine: 'The dashed line marks the threshold to level {l} ({e} Elo).',
    levelsAria: 'Faceit levels and Elo thresholds',
    levelCurrent: 'Your current level',
    seasonHead: 'Current season',
    seasonSince: 'since {d}',
    dtSeasonElo: 'Elo gain',
    dtWr: 'Win rate',
    dtKdSeason: 'K/D',
    seasonNote: 'Wins and win rate from Faceit. Elo, K/D and best map from {n} saved matches.',
    seasonNoteLate: 'Wins and win rate from Faceit. Elo, K/D and best map only saved since {d} ({n} matches).',
    seasonNoteFaceit: 'Wins, win rate and K/D from Faceit. Elo and best map from {n} saved matches.',
    seasonNoteLateFaceit: 'Wins, win rate and K/D from Faceit. Elo and best map only saved since {d} ({n} matches).',
    seasonNoStart: 'No season start set. Enter the date in the “Overlay” tab under Player.',
  },
  ru: {
    langLabel: 'Язык',
    selectOverlay: 'Выбрать оверлей',
    overlayName: 'Название оверлея',
    movePicker: 'Переместить панель',
    new: 'Новый',
    duplicate: 'Дублировать',
    reset: 'Сбросить',
    resetTitle: 'Сбросить статистику и дизайн до стандартных',
    delete: 'Удалить',
    website: 'Сайт',
    logout: 'Выйти',
    player: 'Игрок',
    nicknamePh: 'Ник на Faceit',
    save: 'Сохранить',
    refresh: 'Обновить сейчас',
    resetSession: 'Новая сессия',
    seasonStart: 'Начало сезона (для статистики сезона)',
    avatarFrame: 'Рамка аватара (пусто = автоматически с Faceit)',
    obsTitle: 'Добавить в OBS',
    copy: 'Копировать',
    copied: 'Скопировано!',
    obsHint: 'OBS: Добавить источник → Браузер → вставить URL. Ширина 420, высота 170.',
    stats: 'Статистика',
    statsHint: 'Поставь галочку, чтобы показать. У каждого элемента своё место.',
    design: 'Дизайн',
    checker: 'Шахматка = прозрачно в OBS',
    show: 'Показать {n}',
    background: 'Цвет фона',
    opacity: 'Непрозрачность фона',
    textColor: 'Цвет текста',
    accentColor: 'Акцент (полоса, кольцо)',
    showFrame: 'Показывать рамку аватара Faceit',
    statsPeriod: 'Показатели внизу: сезон или всё время',
    statsCycle: 'По очереди',
    statsSeason: 'Только сезон',
    statsAllTime: 'Только всё время',
    statsCycleSeconds: 'Смена каждые (секунд)',
    demo: 'Демо-режим (нет API-ключа)',
    live: 'Live: {n}',
    connecting: 'Подключение…',
    frameCustom: 'Используется своя рамка.',
    frameFound: 'Рамка найдена на Faceit.',
    frameNone: 'Рамка на Faceit не найдена. Можно указать здесь адрес картинки рамки.',
    season: 'Сезон: {w}W / {l}L за {m} матчей ({r}%)',
    seasonNone: 'Без даты оверлей показывает только статистику за всё время.',
    recentElo: 'Elo последних матчей',
    recentEloHint: 'Бледные числа — оценка. Введите точное Elo (без + и -), пусто = оценка. Матчи без Elo (хаб, турнир) показаны как 0.',
    session: 'Сессия с {t}: {w}W / {l}L, Elo {e}',
    newOverlay: 'Новый оверлей',
    copyName: '{n} (копия)',
    confirmReset: 'Сбросить оверлей «{n}» до стандартных показателей и дизайна?',
    confirmDelete: 'Точно удалить оверлей «{n}»?',
    loginEyebrow: 'Редактор оверлеев',
    loginH: 'Вход',
    loginSub: 'После входа ты сразу попадёшь в редактор своих OBS-оверлеев.',
    loginUser: 'Имя пользователя',
    loginPass: 'Пароль',
    loginBtn: 'Войти',
    loginWrong: 'Неверное имя пользователя или пароль.',
    loginMissing: 'Введи имя пользователя и пароль.',
    loginLocked: 'Слишком много попыток. Попробуй снова через 15 минут.',
    loginDisabled: 'Вход на этом сервере ещё не настроен: укажи ADMIN_PASSWORD в .env и перезапусти сервер.',
    loginNoServer: 'Сервер FaceitWatchr сейчас недоступен.',
    tabOverlay: 'Оверлей',
    tabStats: 'Статистика',
    chartHead: 'История Elo · последние {n} матчей',
    trPeak: 'Максимум',
    trLow: 'Минимум',
    trAvg: 'Ø за матч',
    dtWL: 'Победы / поражения',
    dtMap: 'Лучшая карта',
    dtLvl: 'До {l} уровня',
    dtMaxLvl: 'Достигнут 10 уровень',
    noMatches: 'Сохранённых матчей пока нет. История заполнится, как только ты сыграешь.',
    noPlayer: 'Игрок ещё не загружен.',
    aLoading: 'Загрузка…',
    aViews: 'Разделы',
    estimated: 'оценка',
    chartAria: 'История Elo за {n} матчей: с {a} до {b}',
    chartSource: 'Все сохранённые матчи Faceit, включая хабы и турниры (без Elo = серая точка). Ø за матч учитывает только матчи с Elo.',
    noElo: 'без Elo',
    chartEstimated: 'Пустые точки = Elo оценено.',
    chartLevelLine: 'Пунктир отмечает границу {l} уровня ({e} Elo).',
    levelsAria: 'Уровни Faceit и границы Elo',
    levelCurrent: 'Твой текущий уровень',
    seasonHead: 'Текущий сезон',
    seasonSince: 'с {d}',
    dtSeasonElo: 'Прирост Elo',
    dtWr: 'Винрейт',
    dtKdSeason: 'K/D',
    seasonNote: 'Победы и винрейт по данным Faceit. Elo, K/D и лучшая карта по {n} сохранённым матчам.',
    seasonNoteLate: 'Победы и винрейт по данным Faceit. Elo, K/D и лучшая карта сохраняются только с {d} ({n} матчей).',
    seasonNoteFaceit: 'Победы, винрейт и K/D по данным Faceit. Elo и лучшая карта по {n} сохранённым матчам.',
    seasonNoteLateFaceit: 'Победы, винрейт и K/D по данным Faceit. Elo и лучшая карта сохраняются только с {d} ({n} матчей).',
    seasonNoStart: 'Начало сезона не задано. Укажи дату во вкладке «Оверлей» в разделе «Игрок».',
  },
  fr: {
    langLabel: 'Langue',
    selectOverlay: 'Choisir l’overlay',
    overlayName: 'Nom de l’overlay',
    movePicker: 'Déplacer la barre',
    new: 'Nouveau',
    duplicate: 'Dupliquer',
    reset: 'Réinitialiser',
    resetTitle: 'Remettre stats et design par défaut',
    delete: 'Supprimer',
    website: 'Site web',
    logout: 'Se déconnecter',
    player: 'Joueur',
    nicknamePh: 'Pseudo Faceit',
    save: 'Enregistrer',
    refresh: 'Actualiser',
    resetSession: 'Nouvelle session',
    seasonStart: 'Début de saison (pour les stats de saison)',
    avatarFrame: 'Cadre d’avatar (vide = automatique depuis Faceit)',
    obsTitle: 'Ajouter à OBS',
    copy: 'Copier',
    copied: 'Copié !',
    obsHint: 'OBS : Ajouter une source → Navigateur → coller l’URL. Largeur 420 et hauteur 170.',
    stats: 'Stats',
    statsHint: 'Coche pour afficher. Chaque élément a une place fixe.',
    design: 'Design',
    checker: 'Damier = transparent dans OBS',
    show: 'Afficher {n}',
    background: 'Couleur du fond',
    opacity: 'Opacité du fond',
    textColor: 'Couleur du texte',
    accentColor: 'Accent (barre, anneau)',
    showFrame: 'Afficher le cadre d’avatar Faceit',
    statsPeriod: 'Stats du bas : saison ou global',
    statsCycle: 'En alternance',
    statsSeason: 'Saison uniquement',
    statsAllTime: 'Global uniquement',
    statsCycleSeconds: 'Changer toutes les (secondes)',
    demo: 'Mode démo (pas de clé API)',
    live: 'Live : {n}',
    connecting: 'Connexion…',
    frameCustom: 'Cadre personnalisé actif.',
    frameFound: 'Cadre trouvé sur Faceit.',
    frameNone: 'Aucun cadre trouvé sur Faceit. Tu peux saisir ici l’adresse d’une image de cadre.',
    season: 'Saison : {w}V / {l}D en {m} matchs ({r} %)',
    seasonNone: 'Sans date, l’overlay n’affiche que les stats globales.',
    recentElo: 'Elo des derniers matchs',
    recentEloHint: 'Les chiffres pâles sont estimés. Saisissez l’Elo réel (sans + ni -), vide = estimation. Les matchs sans Elo (hub, tournoi) affichent 0.',
    session: 'Session depuis {t} : {w}V / {l}D, Elo {e}',
    newOverlay: 'Nouvel overlay',
    copyName: '{n} (copie)',
    confirmReset: 'Remettre l’overlay « {n} » aux stats et au design par défaut ?',
    confirmDelete: 'Vraiment supprimer l’overlay « {n} » ?',
    loginEyebrow: 'Éditeur d’overlay',
    loginH: 'Connexion',
    loginSub: 'Une fois connecté, tu arrives directement dans l’éditeur de tes overlays OBS.',
    loginUser: 'Nom d’utilisateur',
    loginPass: 'Mot de passe',
    loginBtn: 'Se connecter',
    loginWrong: 'Nom d’utilisateur ou mot de passe incorrect.',
    loginMissing: 'Saisis ton nom d’utilisateur et ton mot de passe.',
    loginLocked: 'Trop de tentatives. Réessaie dans 15 minutes.',
    loginDisabled: 'La connexion n’est pas encore configurée sur ce serveur : ajoute ADMIN_PASSWORD dans .env et redémarre le serveur.',
    loginNoServer: 'Le serveur FaceitWatchr est injoignable pour le moment.',
    tabOverlay: 'Overlay',
    tabStats: 'Statistiques',
    chartHead: 'Historique Elo · {n} derniers matchs',
    trPeak: 'Pic',
    trLow: 'Plus bas',
    trAvg: 'Moy. par match',
    dtWL: 'Victoires / défaites',
    dtMap: 'Meilleure map',
    dtLvl: 'Jusqu’au niveau {l}',
    dtMaxLvl: 'Niveau 10 atteint',
    noMatches: 'Aucun match enregistré pour l’instant. L’historique se remplit dès que tu joues.',
    noPlayer: 'Aucun joueur chargé pour l’instant.',
    aLoading: 'Chargement…',
    aViews: 'Vues',
    estimated: 'estimé',
    chartAria: 'Historique Elo sur {n} matchs, de {a} à {b}',
    chartSource: 'Tous les matchs Faceit enregistrés, hubs et tournois compris (sans Elo = point gris). La moy. par match ne compte que les matchs avec Elo.',
    noElo: 'sans Elo',
    chartEstimated: 'Points creux = Elo estimé.',
    chartLevelLine: 'La ligne pointillée marque le seuil du niveau {l} ({e} Elo).',
    levelsAria: 'Niveaux Faceit et seuils Elo',
    levelCurrent: 'Ton niveau actuel',
    seasonHead: 'Saison en cours',
    seasonSince: 'depuis le {d}',
    dtSeasonElo: 'Gain d’Elo',
    dtWr: 'Taux de victoire',
    dtKdSeason: 'K/D',
    seasonNote: 'Victoires et taux de victoire selon Faceit. Elo, K/D et meilleure map d’après {n} matchs enregistrés.',
    seasonNoteLate: 'Victoires et taux de victoire selon Faceit. Elo, K/D et meilleure map enregistrés seulement depuis le {d} ({n} matchs).',
    seasonNoteFaceit: 'Victoires, taux de victoire et K/D selon Faceit. Elo et meilleure map d’après {n} matchs enregistrés.',
    seasonNoteLateFaceit: 'Victoires, taux de victoire et K/D selon Faceit. Elo et meilleure map enregistrés seulement depuis le {d} ({n} matchs).',
    seasonNoStart: 'Aucun début de saison défini. Saisis la date dans l’onglet « Overlay » sous Joueur.',
  },
};

// Namen der Stats in der Liste (Standardnamen kommen deutsch vom Server)
const WIDGETS = {
  en: { 'Fortschritt zum nächsten Level': 'Progress to next level', 'Elo heute': 'Elo today', Heute: 'Today', 'Letzte Matches': 'Recent matches' },
  ru: { Avatar: 'Аватар', Nickname: 'Ник', Level: 'Уровень', 'Fortschritt zum nächsten Level': 'Прогресс до след. уровня', 'Elo heute': 'Elo сегодня', Heute: 'Сегодня', Matches: 'Матчи', 'Season WR': 'WR сезона', 'All-Time WR': 'WR за всё время', 'Letzte Matches': 'Последние матчи' },
  fr: { Nickname: 'Pseudo', Level: 'Niveau', 'Fortschritt zum nächsten Level': 'Progression niveau suivant', 'Elo heute': 'Elo du jour', Heute: 'Aujourd’hui', Matches: 'Matchs', 'Season WR': 'WR saison', 'All-Time WR': 'WR global', 'Letzte Matches': 'Derniers matchs' },
};

const LOCALES = { de: 'de-DE', en: 'en-GB', ru: 'ru-RU', fr: 'fr-FR' };

// Sprache aus dem Link (?lang=en), sonst die zuletzt gewählte, sonst Englisch
const fromUrl = new URLSearchParams(location.search).get('lang');
let stored = null;
try {
  stored = localStorage.getItem('fw-lang');
} catch {}
let lang = LANGS.includes(fromUrl) ? fromUrl : LANGS.includes(stored) ? stored : 'en';

export const getLang = () => lang;
export const locale = () => LOCALES[lang];
export const localeOf = (l) => LOCALES[l];

export function t(key, vars, l = lang) {
  const text = T[l]?.[key] ?? T.de[key] ?? key;
  return text.replace(/\{(\w+)\}/g, (m, k) => (vars && k in vars ? vars[k] : m));
}

/** Anzeigename eines Stats: eigene Beschriftungen bleiben, Standardnamen werden übersetzt. */
export const widgetName = (label, l = lang) => WIDGETS[l]?.[label] ?? label;

const css = document.createElement('style');
css.textContent =
  'fw-i18n{display:inline-grid}fw-i18n.blk{display:grid}fw-i18n>fw-l{grid-area:1/1;display:block;visibility:hidden}' +
  `${LANGS.map((l) => `html[lang="${l}"] fw-l[lang="${l}"]:not(.off)`).join(',')}{visibility:visible}` +
  'button fw-i18n{text-align:center}button fw-i18n>fw-l{align-self:center}';
document.head.append(css);
const BLOCK = /^(DIV|P|H[1-6]|LI|DT|DD)$/;

/**
 * Legt Texte in allen Sprachen übereinander. text(l, id) liefert den Text, ids sind mehrere Zustände
 * (z. B. Kopieren/Kopiert), von denen showText() einen zeigt. Ohne ids gibt es nur einen Text.
 */
export function stackText(text, { block = false, ids = [''] } = {}) {
  const box = document.createElement('fw-i18n');
  if (block) box.className = 'blk';
  for (const l of LANGS) {
    for (const id of ids) {
      const layer = document.createElement('fw-l');
      layer.lang = l;
      layer.dataset.id = id;
      layer.textContent = text(l, id);
      if (id !== ids[0]) layer.classList.add('off');
      box.append(layer);
    }
  }
  return box;
}

/** Übersetzter Text als Element, z. B. für Beschriftungen. */
export const tx = (key, vars) => stackText((l) => t(key, vars, l));
/** Name eines Stats in allen Sprachen. */
export const wx = (label) => stackText((l) => widgetName(label, l));

/** Setzt den Text eines Elements: key aus der Übersetzung oder eine Funktion (l) => Text. Leer = nichts. */
export function setText(el, key, vars) {
  if (!key) return el.replaceChildren();
  const text = typeof key === 'function' ? key : (l, id) => t(id || key, vars, l);
  el.replaceChildren(stackText(text, { block: BLOCK.test(el.tagName) }));
}

/** Zeigt bei mehreren Zuständen (data-i18n-alt) den Text mit diesem Schlüssel. */
export function showText(el, id) {
  el.querySelectorAll(':scope > fw-i18n > fw-l').forEach((layer) => layer.classList.toggle('off', layer.dataset.id !== id));
}

export function applyI18n(root = document) {
  root.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    // data-i18n-free: Text darf mitwachsen, weil dahinter in der Zeile nichts verrutscht (z. B. Rail-Label)
    if (el.hasAttribute('data-i18n-free')) return void (el.textContent = t(key));
    if (el.fwKey === key) return;
    el.fwKey = key;
    const ids = [key, ...(el.dataset.i18nAlt ?? '').split(' ').filter(Boolean)];
    el.replaceChildren(stackText((l, id) => t(id, null, l), { block: BLOCK.test(el.tagName), ids }));
  });
  for (const attr of ['title', 'placeholder', 'aria-label']) {
    root.querySelectorAll(`[data-i18n-${attr}]`).forEach((el) => el.setAttribute(attr, t(el.getAttribute(`data-i18n-${attr}`))));
  }
}

export function setLang(next) {
  if (!LANGS.includes(next)) return;
  lang = next;
  try {
    localStorage.setItem('fw-lang', next);
  } catch {}
  document.documentElement.lang = next;
  const url = new URL(location.href);
  url.searchParams.set('lang', next);
  history.replaceState(history.state, '', url);
  applyI18n();
  document.dispatchEvent(new CustomEvent('fw:lang', { detail: next }));
}

/** Verbindet ein <select> mit der Sprachwahl und übersetzt die Seite einmal. */
export function initLangSelect(select) {
  if (select) {
    select.replaceChildren(...LANGS.map((l) => new Option(l.toUpperCase(), l, false, l === lang)));
    select.addEventListener('change', () => setLang(select.value));
  }
  setLang(lang);
}
