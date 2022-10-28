module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./index.html"],
  theme: {
    extend: {
      screens: {
        sm: '320px',
        md: '540px',
        lg: '768px',
        xl: '1440px',
        min:'375',
        
      },
    },
    plugins: [],
  },
};
