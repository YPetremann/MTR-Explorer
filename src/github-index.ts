if (window.location.search[1] === "/") {
  const decoded = window.location.search
    .slice(1)
    .split("&")
    .map(s => s.replace(/~and~/g, "&"))
    .join("?");
  const base = window.location.pathname.slice(0, -1);
  window.history.replaceState(null, null, `${base}${decoded}${location.hash}`);
}
