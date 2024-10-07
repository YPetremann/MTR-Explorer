import forms from "@tailwindcss/forms";
import themeSwapper from "tailwindcss-theme-swapper";
import colors from "tailwindcss/colors";

function getColors(colors, defaultShade = 500) {
  return { DEFAULT: colors[defaultShade], ...colors };
}
function getInvertColors(colors, defaultShade = 500) {
  const ck = Object.keys(colors);
  const ic = Object.values(colors).map((v, i, a) => [ck[a.length - i - 1], v]);
  return { DEFAULT: colors[defaultShade], ...Object.fromEntries(ic) };
}

const lightTheme = {
  colors: {
    accent: getColors(colors.emerald, 200),
    main: "black",
  },
  textColor: {
    menu: "white",
    link: getColors(colors.blue, 800),
    main: "black",
    header: "black",
    neutral: getColors(colors.slate, 900),
  },
  backgroundColor: {
    menu: "#b42249",
    main: "white",
    header: getColors(colors.slate, 200),
    neutral: getColors(colors.slate, 100),
  },
};

const darkTheme = {
  colors: {
    accent: getColors(colors.rose, 200),
    main: "white",
  },
  textColor: {
    main: "white",
    link: getInvertColors(colors.blue, 800),
    header: "white",
    neutral: getInvertColors(colors.slate, 100),
  },
  backgroundColor: {
    main: "black",
    header: getColors(colors.slate, 800),
    neutral: getInvertColors(colors.slate, 900),
  },
};

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",
  theme: {
    extend: {},
  },
  plugins: [
    forms,
    themeSwapper({
      themes: [
        {
          name: "base",
          selectors: [":root"],
          theme: lightTheme,
        },
        {
          name: "dark",
          selectors: ["html.dark"],
          theme: darkTheme,
        },
      ],
    }),
  ],
};
