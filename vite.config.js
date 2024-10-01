import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        react(),
        checker({
            typescript: true,
            eslint: {
                lintCommand: "eslint src --ext .ts,.tsx --report-unused-disable-directives --max-warnings 3",
            },
        }),
    ],
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            src: "/src",
        },
    },
    optimizeDeps: {
        include: ["@emotion/react", "@emotion/styled", "@mui/material/Tooltip"],
    },
});
