module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        sm: "375px",
        md: { max: "820px" },
        lg: "976px",
        xl: "1440px",
      },
      colors: {
        primary: "#1F2A37",
        secondary: "#D8DCE3",
      },
      colors: {
        primary: '#173B3F',
        secondary: '#F9F9FB',
        tertiary: '#F3F4F6',
        'light-bg': '#F9F9FB',
        'light-text': '#111827',
        'header-text': '#173B3F',
        'dark-text-fill': '#F3F4F6',
        'dark-bg': '#1F2A37',
        'dark-frame-bg': '#262E3D',
        'dark-tertiary': '#374151',
        'divider-bg': '#E5E7EB',
        'dark-45': '#00000073',
        'border-dark': '#5f5b5b80',
      },
    },
    plugins: [],
  },
};
