import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@': path.resolve(__dirname, ''),
        },
    },
    plugins: [react()],
    build: {
        lib: {
            entry: 'app/widget.jsx',
            name: 'FinScoreWidget',
            fileName: 'finscore-widget',
            formats: ['iife']
        },
        rollupOptions: {
            external: ['react', 'react-dom'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM'
                }
            }
        }
    },
    define: {
        'process.env': {}
    }

});
