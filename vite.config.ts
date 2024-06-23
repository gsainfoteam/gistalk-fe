import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return defineConfig({
    server: {
      open: true, //개발 서버를 실행할 때 브라우저를 자동으로 엽니다.
      proxy: {
        "/api": {
          target: `${env.VITE_API_URL}`, // 실제 백엔드 서버 URL로 변경
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: [
        { find: "@components", replacement: "/src/components" },
        { find: "@assets", replacement: "/src/assets" },
        { find: "@", replacement: "/src" },
      ],
    },
    define: {
      "process.env": {},
    },
  });
};
