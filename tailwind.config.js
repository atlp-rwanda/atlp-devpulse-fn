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
    },
    plugins: [],
  },
};
