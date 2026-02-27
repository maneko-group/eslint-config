import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: 'src/index.ts',
  clean: true,
  format: ['es', 'cjs'],
  exports: true,
})
