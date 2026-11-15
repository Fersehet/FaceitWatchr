export const WIDGET_TYPES = [
  'avatar',
  'nickname',
  'level',
  'elo',
  'eloProgress',
  'eloToday',
  'sessionRecord',
  'matches',
  'seasonWinRate',
  'kd',
  'hsPercent',
  'adr',
  'recentResults',
] as const;

export type WidgetType = (typeof WIDGET_TYPES)[number];

export interface Widget {
  id: string;
  type: WidgetType;
  enabled: boolean;
  x: number;
  y: number;
  fontSize: number;
  /** Leer = globale Textfarbe */
  color: string;
  label: string;
  showLabel: boolean;
  /** Beschriftung, solange die All-Time-Werte zu sehen sind (nur Season WR) */
  altLabel?: string;
  /** Beschriftung, solange die Session-Werte zu sehen sind (nur Season WR) */
  sessionLabel?: string;
}

export type StatsPeriod = 'alltime' | 'season' | 'session';

export interface OverlayStyle {
  width: number;
  height: number;
  background: string;
  backgroundOpacity: number;
  borderRadius: number;
  borderColor: string;
  borderWidth: number;
  fontFamily: string;
  textColor: string;
  labelColor: string;
  accentColor: string;
  positiveColor: string;
  negativeColor: string;
  showAvatarFrame: boolean;
  /** Season WR, K/D, HS %, ADR und Matches wechseln der Reihe nach durch diese Zeiträume (einer = fest) */
  statsPeriods: StatsPeriod[];
  /** Sekunden bis zum nächsten Wechsel */
  statsCycleSeconds: number;
  /** Vergrößerung der OBS-Browserquelle, damit das Overlay bei großen Auflösungen scharf bleibt */
  scale: number;
}

export interface Overlay {
  id: string;
  /** Für die spätere Web-App mit mehreren Nutzern; lokal immer "local". */
  ownerId: string;
  name: string;
  style: OverlayStyle;
  widgets: Widget[];
  updatedAt: string;
}
