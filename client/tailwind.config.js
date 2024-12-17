/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "custom-border-tab-button": "#8b91c3",
        "custom-bg-tab-button": "rgba(78, 131, 185, 0.04)",
        "custom-main-text": "#f1f4f8",
        "custom-bg-card": "#8085b2",
        "custom-secondary-text": "#BFC3FF",
        "custom-not-active-text": "#b6b6b6",
        "custom-not-active-button": "#b6b6b6",
        "custom-active-button": "#757aa7",
        "custom-bg-sidebar": "#3E4875",
        "custom-global-bg-modal": "#313131",
        "custom-bg-card-aml": "#7F859C",
        "custom-active-text-navigation-rules": "#BFC3FF",
      },
      boxShadow: {
        "custom-lang":
          "0px 2px 4px -3px rgba(91, 91, 91, 0.22), 0px 2px 4px 0px rgba(91, 91, 91, 0.20)",
        "custom-main":
          "rgba(91, 91, 91, 0.24) 0px 3px 16px -5px, rgba(91, 91, 91, 0.14) 0px 4px 6px -2px",
        "custom-sidebar":
          "rgba(50, 45, 4, 0.25) 0px 7px 10px -6px, rgba(50, 45, 4, 0.1) 0px 2px 13px",
        "custom-button-tab":
          "rgba(91, 91, 91, 0.2) 0px 2px 4px, rgba(91, 91, 91, 0.22) 0px 2px 4px -3px;",
        "custom-button-currencie":
          "rgba(91, 91, 91, 0.1) 0px 3px 4px 0px, rgba(91, 91, 91, 0.12) 0px 3px 12px 0px",
      },
    },
  },
  plugins: [],
};
