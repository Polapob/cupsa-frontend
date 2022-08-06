import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // import.meta.env.VITE_NAME available here with: process.env.VITE_NAME
  // import.meta.env.VITE_PORT available here with: process.env.VITE_PORT

  return defineConfig({
    plugins: [vue()],
    server: {
      port: parseInt(process.env.VITE_FRONTEND_LOCALHOST_PORT),
    },
    build: {
      commonjsOptions: {
        esmExternals: true,
      },
    },
  });
};
