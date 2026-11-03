import { randomUUID } from 'node:crypto';
import type { Overlay, OverlayStyle, Widget, WidgetType } from './types.ts';

const LABELS: Record<WidgetType, string> = {
  avatar: 'Avatar',
  nickname: 'Nickname',
  level: 'Level',
  elo: 'Elo',
  eloProgress: 'Fortschritt zum nächsten Level',
  eloToday: 'Elo heute',
  sessionRecord: 'Heute',
  matches: 'Matches',
  seasonWinRate: 'Season WR',
  kd: 'K/D',
  hsPercent: 'HS %',
  adr: 'ADR',
  recentResults: 'Letzte Matches',
};

/** Beschriftung der Season WR, während das Overlay die All-Time-Werte zeigt */
const ALL_TIME_WR = 'All-Time WR';

type Layout = Partial<Pick<Widget, 'x' | 'y' | 'fontSize' | 'enabled' | 'showLabel'>>;

// Die fünf Stats unten verteilen sich gleichmäßig über die Breite des Fortschrittsbalkens (x 16 bis 400)
const LAYOUT: Record<WidgetType, Layout> = {
  avatar: { x: 16, y: 16, fontSize: 56, enabled: true, showLabel: false },
  nickname: { x: 90, y: 11, fontSize: 22, enabled: true, showLabel: false },
  level: { x: 88, y: 42, fontSize: 20, enabled: true, showLabel: false },
  elo: { x: 124, y: 46, fontSize: 22, enabled: true, showLabel: false },
  eloProgress: { x: 16, y: 88, fontSize: 12, enabled: true, showLabel: false },
  eloToday: { x: 240, y: 18, fontSize: 18, enabled: true, showLabel: true },
  sessionRecord: { x: 336, y: 32, fontSize: 18, enabled: true, showLabel: false },
  matches: { x: 353, y: 120, fontSize: 16, enabled: true, showLabel: true },
  seasonWinRate: { x: 16, y: 120, fontSize: 16, enabled: true, showLabel: true },
  kd: { x: 120, y: 120, fontSize: 16, enabled: true, showLabel: true },
  hsPercent: { x: 197, y: 120, fontSize: 16, enabled: true, showLabel: true },
  adr: { x: 275, y: 120, fontSize: 16, enabled: true, showLabel: true },
  recentResults: { x: 240, y: 58, fontSize: 14, enabled: true, showLabel: false },
};

export function defaultWidgets(): Widget[] {
  return (Object.keys(LAYOUT) as WidgetType[]).map((type) => ({
    id: type,
    type,
    enabled: false,
    x: 0,
    y: 0,
    fontSize: 16,
    color: '',
    label: LABELS[type],
    showLabel: true,
    ...LAYOUT[type],
    ...(type === 'seasonWinRate' ? { altLabel: ALL_TIME_WR } : {}),
  }));
}

export function defaultStyle(): OverlayStyle {
  return {
    width: 420,
    height: 170,
    background: '#14161a',
    backgroundOpacity: 0.85,
    borderRadius: 12,
    borderColor: '#ff5500',
    borderWidth: 0,
    fontFamily: 'Geist',
    textColor: '#ffffff',
    labelColor: '#9aa0a6',
    accentColor: '#ff5500',
    positiveColor: '#32d74b',
    negativeColor: '#ff453a',
    levelIcon: 'badge',
    showAvatarFrame: true,
    statsPeriod: 'cycle',
    statsCycleSeconds: 10,
  };
}


export function createDefaultOverlay(name = 'Standard'): Overlay {
  return {
    id: randomUUID().slice(0, 8),
    ownerId: 'local',
    name,
    style: defaultStyle(),
    widgets: defaultWidgets(),
    updatedAt: new Date().toISOString(),
  };
}

/**
 * Bringt gespeicherte Overlays auf den Stand neuer Versionen. Positionen, Größen und das Design außerhalb des Editors sind fest,
 * eigene Beschriftungen und Farben sowie ein-/ausgeblendete Stats bleiben erhalten.
 */
export function upgradeOverlay(overlay: Overlay): Overlay {
  // Nur diese Design-Werte lassen sich im Editor einstellen, alle anderen stehen fest auf dem Standard
  const editable = ['background', 'backgroundOpacity', 'textColor', 'accentColor', 'showAvatarFrame', 'statsPeriod', 'statsCycleSeconds'] as const;
  const style: Partial<OverlayStyle> = overlay.style ?? {};
  overlay.style = { ...defaultStyle(), ...Object.fromEntries(editable.filter((k) => style[k] !== undefined).map((k) => [k, style[k]])) };
  const saved = new Map<string, Widget>(overlay.widgets.map((w) => [w.type, w]));
  const enabled = new Map<string, boolean>(overlay.widgets.map((w) => [w.type, w.enabled]));
  // Die Gesamt-Winrate gibt es nicht mehr, an ihrer Stelle steht die Season WR (wechselt mit All-Time)
  if (enabled.get('winRate')) enabled.set('seasonWinRate', true);
  overlay.widgets = defaultWidgets().map((w) => {
    const { x, y, fontSize } = w;
    return { ...w, ...saved.get(w.type), x, y, fontSize, enabled: enabled.get(w.type) ?? false };
  });
  return overlay;
}

export { LABELS as WIDGET_LABELS };
