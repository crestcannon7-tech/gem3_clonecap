# Izum Study Clone (Next.js + R3F + Tailwind)

This project is a small landing page using Next.js 14 App Router, React Three Fiber, Three.js, Tailwind, and Framer Motion.
Run locally with:
```bash
npm install
npm run dev
```

Notes:
- `next.config.js` has `reactStrictMode: false` to avoid React Strict Mode double-mount issues with R3F in dev.
- The 3D canvas will not run inside environments that do not support WebGL (e.g. Gemini Canvas).
