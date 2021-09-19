import { defineConfig } from 'windicss/helpers';

export default defineConfig({
  darkMode: 'class',
  theme: {
    extend: {
    },
  },
  extract: {
    include: ['src/**/*.{ts,tsx,vue}', 'index.html'],
    exclude: ['node_modules', '.git'],
  },
});
