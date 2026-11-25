import { levelForElo, rating1, type MatchDetails, type MatchRecord, type PlayerSnapshot, type ScoreboardPlayer, type ScoreboardTeam, type StatsSource } from './types.ts';

/**
 * Liefert erfundene Daten, solange kein API-Key eingetragen ist.
 * Bei jeder Abfrage wird mit 50 % Wahrscheinlichkeit ein Match "gespielt",
 * damit Live-Updates im Overlay sichtbar werden. Etwa jedes fünfte ist ein Hub-Match ohne Elo.
 */
export class DemoSource implements StatsSource {
  readonly demo = true;

  private elo = 1985;
  private matches = 642;
  private wins = 351;
  private streak = 2;
  private longest = 9;
  private recent: ('W' | 'L')[] = ['W', 'W', 'L', 'W', 'L'];
  private played: MatchDetails[] = [];

  async fetchPlayer(nickname: string): Promise<PlayerSnapshot> {
    if (Math.random() < 0.5) this.playMatch();

    return {
      playerId: 'demo-player',
      nickname: nickname || 'DemoPlayer',
      avatar: '',
      avatarFrame: '',
      country: 'de',
      elo: this.elo,
      level: levelForElo(this.elo),
      matches: this.matches,
      wins: this.wins,
      winRate: Math.round((this.wins / this.matches) * 100),
      kd: 1.18,
      hsPercent: 48,
      adr: 82.4,
      currentStreak: this.streak,
      longestStreak: this.longest,
      recentResults: [...this.recent],
      fetchedAt: new Date().toISOString(),
    };
  }

  async fetchRecordSince(): Promise<MatchRecord> {
    // Demo: die Season begann vor 40 Matches mit 22 Siegen Rückstand zum Lifetime-Stand
    return { matches: this.matches - 602, wins: this.wins - 329, kd: 1.24, hsPercent: 51, adr: 85.7 };
  }

  async fetchRecentMatches(_playerId: string, count: number, isKnown: (matchId: string) => boolean): Promise<MatchDetails[]> {
    return this.played.slice(0, count).filter((m) => !isKnown(m.matchId));
  }

  async fetchAvatarFrame(): Promise<string> {
    return '';
  }

  async fetchScoreboard(matchId: string, playerId: string): Promise<ScoreboardTeam[] | null> {
    const own = this.played.find((m) => m.matchId === matchId);
    return own?.scoreboard ?? demoScoreboard(matchId, playerId, 'DemoPlayer', 18, 16, 4, true, '13 / 9');
  }

  private playMatch() {
    const won = Math.random() < 0.55;
    // Hubs, Turniere und Ligen zählen in allen Stats mit, bringen aber keine Elo
    const ranked = Math.random() >= 0.2;
    const delta = ranked ? 20 + Math.floor(Math.random() * 10) : 0;
    this.matches += 1;
    if (won) {
      this.wins += 1;
      this.elo += delta;
      this.streak += 1;
      this.longest = Math.max(this.longest, this.streak);
    } else {
      this.elo -= delta;
      this.streak = 0;
    }
    this.recent = [won ? ('W' as const) : ('L' as const), ...this.recent].slice(0, 5);

    const maps = ['de_mirage', 'de_inferno', 'de_nuke', 'de_ancient', 'de_anubis', 'de_dust2', 'de_train'];
    const kills = 10 + Math.floor(Math.random() * 20);
    const deaths = 10 + Math.floor(Math.random() * 15);
    const lost = 3 + Math.floor(Math.random() * 9);
    const id = `demo-${this.matches}`;
    this.played.unshift({
      matchId: id,
      playerId: 'demo-player',
      nickname: 'DemoPlayer',
      finishedAt: new Date().toISOString(),
      result: won ? 'W' : 'L',
      map: maps[Math.floor(Math.random() * maps.length)],
      score: won ? `13 / ${lost}` : `${lost} / 13`,
      kills,
      deaths,
      assists: Math.floor(Math.random() * 8),
      kd: Math.round((kills / deaths) * 100) / 100,
      adr: Math.round((60 + Math.random() * 50) * 10) / 10,
      hsPercent: 30 + Math.floor(Math.random() * 35),
      mvps: Math.floor(Math.random() * 6),
      matchMvp: Math.random() < 0.3,
      ranked,
      url: `https://www.faceit.com/de/cs2/room/${id}`,
    });
    const m = this.played[0];
    m.scoreboard = demoScoreboard(id, m.playerId, m.nickname, m.kills, m.deaths, m.assists, won, m.score);
    // Im Scoreboard dieselben Werte wie im Match selbst
    Object.assign(m.scoreboard[0].players.find((p) => p.playerId === m.playerId)!, { kd: m.kd, adr: m.adr, hsPercent: m.hsPercent, mvps: m.mvps });
    m.matchMvp = m.scoreboard.every((t) => t.players.every((p) => p.kills <= m.kills));
    m.rating = m.scoreboard[0].players.find((p) => p.playerId === m.playerId)!.rating;
    this.played = this.played.slice(0, 20);
  }
}

const DEMO_NAMES = ['rotflare', 'kxzu', 'Mivo', 'b4stl', 'nordlicht', 'Tarik_ow', 'sp1ce', 'Quillo', 'h0rizon', 'wendlr', 'zeppo', 'Ilyx', 'frostbyte', 'Kaval'];

/** Erfundenes, aber stimmiges Scoreboard: der Spieler mit seinen Werten im eigenen Team, 4 Mitspieler, 5 Gegner. */
function demoScoreboard(matchId: string, playerId: string, nickname: string, kills: number, deaths: number, assists: number, won: boolean, score: string): ScoreboardTeam[] {
  let seed = [...matchId].reduce((h, c) => (h * 31 + c.charCodeAt(0)) >>> 0, 7);
  const rnd = () => ((seed = (seed * 1103515245 + 12345) >>> 0) / 2 ** 32);
  const names = [...DEMO_NAMES].sort(() => rnd() - 0.5);
  const player = (id: string, name: string, k: number, d: number, a: number): ScoreboardPlayer => {
    // Runden mit mehreren Kills, passend zur Kill-Zahl
    const k2 = Math.floor((k / 6) * rnd()), k3 = Math.floor((k / 14) * rnd()), k4 = rnd() < 0.08 ? 1 : 0;
    return {
    playerId: id, nickname: name, kills: k, deaths: d, assists: a,
    kd: Math.round((k / Math.max(1, d)) * 100) / 100,
    adr: Math.round((45 + k * 3.2 + rnd() * 14) * 10) / 10,
    hsPercent: 25 + Math.floor(rnd() * 40),
    mvps: Math.floor(rnd() * 5),
    rating: rating1(k, d, rounds, [k2, k3, k4, 0]),
    };
  };
  const mate = (i: number, strong: boolean) => player(`demo-${i}`, names[i], 8 + Math.floor(rnd() * (strong ? 18 : 14)), 10 + Math.floor(rnd() * 12), Math.floor(rnd() * 8));
  const [ownScore, otherScore] = score.split('/').map((p) => Number.parseInt(p.trim(), 10));
  const rounds = (ownScore || 0) + (otherScore || 0) || null;
  const sort = (ps: ScoreboardPlayer[]) => ps.sort((a, b) => b.kills - a.kills || b.kd - a.kd);
  return [
    { name: `team_${nickname}`, score: Number.isNaN(ownScore) ? null : ownScore, won, players: sort([{ ...player(playerId, nickname, kills, deaths, assists) }, ...[0, 1, 2, 3].map((i) => mate(i, won))]) },
    { name: `team_${names[4]}`, score: Number.isNaN(otherScore) ? null : otherScore, won: !won, players: sort([4, 5, 6, 7, 8].map((i) => mate(i, !won))) },
  ];
}
