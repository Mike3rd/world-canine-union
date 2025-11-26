"use client";

import { useState, useEffect } from "react";

type Theme = "default" | "holiday" | "night" | "vintage";

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("default");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const saved = localStorage.getItem("wcu-theme") as Theme;
    if (saved) {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    }
  }, []);

  const toggleTheme = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("wcu-theme", newTheme);
  };

  if (!isClient) {
    return (
      <div className="flex items-center gap-2 p-2 bg-surface rounded-lg border border-border">
        <span className="text-sm text-muted font-body2">Theme:</span>
        <select className="bg-surface border border-border rounded px-2 py-1 text-sm font-body2">
          <option value="default">Official</option>
        </select>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 p-2 bg-surface rounded-lg border border-border">
      <span className="text-sm text-muted font-body2">Theme:</span>
      <select
        value={theme}
        onChange={(e) => toggleTheme(e.target.value as Theme)}
        className="bg-surface border border-border rounded px-2 py-1 text-sm font-body2"
      >
        <option value="default">Official</option>
        <option value="holiday">Holiday</option>
        <option value="night">Night</option>
        <option value="vintage">Vintage</option>
      </select>
    </div>
  );
}
