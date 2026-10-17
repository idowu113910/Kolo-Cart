export const colors = {
  // Brand & Accent
  primary: '#162544',        // Deep navy from Figma header/buttons
  primaryDark: '#0E1729',
  primaryLight: '#26385C',
  accent: '#0084FF',         // Vibrant action blue
  accentSoft: '#EEF2FF',     // Soft lilac/blue background
  accentPurple: '#6366F1',

  // Status & Notifications
  success: '#10B981',        // Green dot "Open by 7am", confirmed order
  danger: '#EF4444',         // Red dot "Closes 9pm", tab badge
  warning: '#F59E0B',
  info: '#3B82F6',

  // Backgrounds & Surfaces
  background: '#F8F9FD',     // Figma main screen background
  surface: '#FFFFFF',        // Cards and sheets
  surfaceSubtle: '#F1F3F9',  // Input and pill backgrounds
  surfaceHover: '#E9ECF5',

  // Neutral & Text
  textPrimary: '#111827',
  textSecondary: '#64748B',
  textMuted: '#94A3B8',
  textInverse: '#FFFFFF',

  // Borders & Dividers
  border: '#E2E8F0',
  borderLight: '#EDF2F7',

  // Overlays
  overlay: 'rgba(15, 23, 42, 0.45)',
  badge: '#EF4444',
  tagBg: '#EEF0FD',
  tagText: '#162544',
};

export type Colors = typeof colors;
