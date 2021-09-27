module.exports = {
  variants: {
    boxShadow: ["responsive", "hover", "focus", "focus-within"],
    borderWidth: ["responsive", "first", "last", "hover", "focus"],
  },
  theme: {
    container: {
      padding: {
        default: "1rem",
        sm: "1rem",
        lg: "2rem",
        xl: "2rem",
      },
    },
    extend: {
      screens: {
        "dark-mode": { raw: "screen and (prefers-color-scheme: dark)" },
      },
    },
  },
};
