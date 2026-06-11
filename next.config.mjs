import path from "node:path";
import { fileURLToPath } from "node:url";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const frontendNodeModules = path.join(__dirname, "node_modules");
const tailwindcssDir = path.join(frontendNodeModules, "tailwindcss");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  turbopack: {
    root: __dirname,
    resolveAlias: {
      tailwindcss: tailwindcssDir,
    },
  },
  webpack: (config) => {
    const prevAlias = config.resolve.alias;
    const alias =
      prevAlias && typeof prevAlias === "object" && !Array.isArray(prevAlias)
        ? { ...prevAlias }
        : {};
    config.resolve.alias = {
      ...alias,
      tailwindcss: tailwindcssDir,
    };
    const prevModules = config.resolve.modules;
    config.resolve.modules = [
      frontendNodeModules,
      ...(Array.isArray(prevModules) ? prevModules : ["node_modules"]),
    ];
    return config;
  },
};

export default withNextIntl(nextConfig);
