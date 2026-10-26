import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// Runs api/contact.js inside `npm run dev`, so the form works locally (reads .env).
function devApi() {
  return {
    name: "dev-api",
    configureServer(server) {
      Object.assign(process.env, loadEnv("development", process.cwd(), ""));
      server.middlewares.use("/api/contact", async (req, res) => {
        let raw = "";
        for await (const chunk of req) raw += chunk;
        try { req.body = raw ? JSON.parse(raw) : {}; } catch { req.body = {}; }
        res.status = (c) => { res.statusCode = c; return res; };
        res.json = (o) => { res.setHeader("Content-Type", "application/json"); res.end(JSON.stringify(o)); };
        try {
          const mod = await server.ssrLoadModule("/api/contact.js");
          await mod.default(req, res);
        } catch (e) {
          console.error("[api/contact]", e);
          res.status(500).json({ error: "Server error" });
        }
      });
    },
  };
}

export default defineConfig({ plugins: [react(), devApi()] });