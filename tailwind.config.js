/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        "surface-0": "#ffffff",
        "surface-50": "#f8fafc",
        "surface-100": "#f1f5f9",
        "surface-200": "#e2e8f0",
        "surface-300": "#cbd5e1",
        "surface-400": "#94a3b8",
        "surface-500": "#64748b",
        "surface-600": "#475569",
        "surface-700": "#334155",
        "surface-800": "#1e293b",
        "surface-900": "#0f172a",
        "surface-950": "#020617",
      },
    },
  },
  plugins: [],
};
