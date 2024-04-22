import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";

export default ({ mode }: { mode: any }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return defineConfig({
    plugins: [react()],
    base: process.env.VITE_PUBLIC_URL,
  });
};
