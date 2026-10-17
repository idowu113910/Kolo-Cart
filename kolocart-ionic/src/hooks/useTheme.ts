import { useState, useEffect } from 'react';
import { colors } from '../theme/colors';
import { darkColors } from '../theme/darkColors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';
import { shadows } from '../theme/shadows';

export function useTheme() {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('kolocart_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    localStorage.setItem('kolocart_theme', isDark ? 'dark' : 'light');
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  const activeColors = isDark ? darkColors : colors;

  return {
    isDark,
    toggleTheme,
    colors: activeColors,
    spacing,
    typography,
    shadows,
  };
}
