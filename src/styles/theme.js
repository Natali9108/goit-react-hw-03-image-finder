export const theme = Object.freeze({
  colors: {
    white: '#fff',
    primaryColor: '#212121',
    blue: '#3f51b5',
    darkBlue: '#303f9f',
    overlayBg: 'rgba(0, 0, 0, 0.8)',
    // primaryBlack: '#080103',
    // green: '#1f851f',
    // blue: '#1028db',
    // red: '#db1515',
  },

  fontSizes: {
    small: '18px',
    medium: '20px',
    large: '28px',
  },
  spacing: value => `${2 * value}px`,
  shadows: {
    small:
      '0px 3px 1px -2px rgba(0, 0, 0, 0.2),0px 2px 2px 0px rgba(0, 0, 0, 0.14), 0px 1px 5px 0px rgba(0, 0, 0, 0.12)',
    regular:
      ' 0px 1px 3px 0px rgba(0, 0, 0, 0.2),0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);',
    // medium: '0 9px 47px 11px rgba(51, 51, 51, 0.18);',
    medium:
      '0px 2px 4px -1px rgba(0, 0, 0, 0.2), 0px 4px 5px 0px rgba(0, 0, 0, 0.14), 0px 1px 10px 0px rgba(0, 0, 0, 0.12)',
  },

  animation: {
    cubicBezier: `250ms cubic-bezier(0.4, 0, 0.2, 1)`,
  },
});
