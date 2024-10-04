import React from "react";

export default function useTheme(theme: "dark" | "light" | "system") {
  React.useInsertionEffect(() => {
    const cl = document.documentElement.classList;
    const toggle = ({ matches: m }) => (m ? cl.add("dark") : cl.remove("dark"));

    // force set theme if dark or light
    const matches = theme === "dark";
    if (matches || theme === "light") return toggle({ matches });

    // watch system theme and imediatly set it
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    media.addEventListener("change", toggle);
    toggle(media);

    return () => media.removeEventListener("change", toggle);
  }, [theme]);
}
