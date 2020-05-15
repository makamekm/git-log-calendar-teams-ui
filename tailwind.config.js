module.exports = {
  variants: {
    boxShadow: ["responsive", "hover", "focus", "focus-within"],
  },
  theme: {
    extend: {
      screens: {
        "dark-mode": { raw: "screen and (prefers-color-scheme: dark)" },
      },
    },
  },
};
