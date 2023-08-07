const { green } = require("@mui/material/colors");

module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        sm: "375px",
        md: { max: "820px" },
        lg: "976px",
        xl: "1440px",
        "semi-sm": "120px",
        "semi-md": "721px",
        "semi-md-col":  { max: "721px" }
      },

      colors: {
        primary: "#173B3F",
        secondary: "#F9F9FB",
        tertiary: "#F3F4F6",
        green:"#56C870",
        "light-bg": "#F9F9FB",
        "light-text": "#111827",
        "header-text": "#173B3F",
        "dark-text-fill": "#F3F4F6",
        "dark-bg": "#1F2A37",
        "dark-frame-bg": "#262E3D",
        "dark-tertiary": "#374151",
        "divider-bg": "#E5E7EB",
        "dark-45": "#00000073",
        "border-dark": "#5f5b5b80",
        cgray: "#ABB8C3",
        "light-gray": "#F9F9FB",
        cg: "#6B7280",
        ltb: "#F3F4F6",
        "button-color": "#173B3F",
        "bulk-email": "#DDE0E3",
        "black-text": "#1F2A37",
        "row-gray": "#F9FAFB",
        bdr: "#E5E7EB",
        dots: "#6B7280",
        white: "#FFFFFF",
        black: "#000000",
       
      },
      fontSize: {
        fb: "14px",
        fontM: "16px",
        fontT: "18px",
        fontD: "20px",
        "fontM-h1": "21px",
        "fontD-h1": "35px",
        "fontM-h2": "19px",
        "fontD-h2": "30px",
      },
      fontWeight: {
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
      },
      borderRadius: {
        "bt-rd": "8px",
      },
      padding: {
        "5px": "5.5px",
        "4px": "4.5px",
      },
      margin: {
        "5px": "5.5px",
      },
    },
    variants: {
      backgroundColor: ["active"],
      textColor: ["active"]
    },
    plugins: [],
  },
};