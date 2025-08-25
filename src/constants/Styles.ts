// src/constants/Styles.ts
export const COLORS = {
  background: '#FFFFCC',
  text: '#03045E',
  button: '#0077B6',
  white: '#FFFFFF',
  primaryBlue: '#0077B6',
} as const;

export const FONTS = {
  bold: 'Inter_18pt-ExtraBold',
} as const;

export const FONT_SIZES = {
  title: 18,
  arrow: 24,
} as const;

// Bu obje artık değerleri literal tiplerle tutuyor,
// dolayısıyla TextStyle.fontWeight ile uyuşuyor.
export const FONT_WEIGHTS = {
  normal: '400',
  bold: '700',
  extraBold: '900',
} as const;

// Eğer istersen aşağıdaki satırla type da çıkarabilirsin:
// export type FontWeight = typeof FONT_WEIGHTS[keyof typeof FONT_WEIGHTS];
