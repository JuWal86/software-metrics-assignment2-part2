export const config = {
  extensions: ['.html', '.tsx', '.jsx', '.vue', '.svelte'],
  weights: {
    alt: 0.25,
    aria: 0.25,
    semantics: 0.2,
    label: 0.15,
    keyboard: 0.15,
    penalties: 0.3
  },
  thresholds: {
    green: 85,
    orange: 65
  }
};
