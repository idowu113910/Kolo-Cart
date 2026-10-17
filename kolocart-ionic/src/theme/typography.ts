export const typography = {
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
  sizes: {
    xs: '11px',
    sm: '13px',
    base: '15px',
    md: '16px',
    lg: '18px',
    xl: '20px',
    xxl: '24px',
    title: '28px',
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
  },
  lineHeights: {
    tight: '1.2',
    normal: '1.4',
    relaxed: '1.6',
  }
};

export type Typography = typeof typography;
