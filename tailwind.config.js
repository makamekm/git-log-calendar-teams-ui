module.exports = {
  variants: {
    boxShadow: ["responsive", "hover", "focus", "focus-within"],
  },
  theme: {
    container: {
      padding: {
        default: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
      },
    },
    extend: {
      screens: {
        "dark-mode": { raw: "screen and (prefers-color-scheme: dark)" },
      },
    },
  },
};
