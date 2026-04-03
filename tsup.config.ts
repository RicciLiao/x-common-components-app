import {defineConfig} from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  external: ['@reduxjs/toolkit', '@reduxjs/toolkit/query/react', 'react', 'react-dom', '@mui/material', '@mui/icons-material', '@mui/x-data-grid', '@mui/lab', '@emotion/react', '@emotion/cache', '@emotion/styled', 'notistack', 'date-fns', 'react-router-dom'],
})
