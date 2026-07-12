const ROUTE_MAP = {
  hero: "/",
  about: "/about-me",
  work: "/work-experience",
  projects: "/projects",
  contact: "/contact",
};

const PATH_TO_SECTION = Object.fromEntries(
  Object.entries(ROUTE_MAP).map(([id, path]) => [path, id])
);

export function getPathForSection(sectionId) {
  return ROUTE_MAP[sectionId] || "/";
}

export function getSectionForPath(pathname) {
  return PATH_TO_SECTION[pathname] || "hero";
}

export function navigateToSection(sectionId, options = {}) {
  const el = document.getElementById(sectionId);
  if (!el) return;

  const path = getPathForSection(sectionId);
  if (window.location.pathname !== path) {
    window.history.pushState({ section: sectionId }, "", path);
  }

  el.scrollIntoView({ behavior: options.instant ? "instant" : "smooth" });
}
