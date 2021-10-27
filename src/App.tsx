import React, { useEffect, useState } from "react";
import Footer from "./components/Footer";
import JSONInput from "./components/JSONInput";
import JSONOutput from "./components/JSONOutput";
import { PLACEHOLDER_JSON } from "./constants/constants";
import { ThemeType } from "./models/models";
import { isValidTheme } from "./utils/json-utils";

import "./scss/json.scss";

function App() {
  const [json, setJSON] = useState(PLACEHOLDER_JSON);
  const [theme, setTheme] = useState<ThemeType>();

  useEffect(() => {
    const initTheme = localStorage.getItem("theme");
    setTheme(
      initTheme && isValidTheme(initTheme)
        ? (initTheme as ThemeType)
        : window.matchMedia("prefers color-scheme: dark").matches
        ? "dark"
        : "light"
    );
  }, []);

  const changeTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    if (theme === "light") {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    } else {
      document.documentElement.classList.remove("light");
      document.documentElement.classList.add("dark");
    }
  }, [theme]);

  return (
    <>
      <div className="json-editor">
        <JSONInput value={json} onChange={(e) => setJSON(e.target.value)} />
        <JSONOutput json={json} />
      </div>
      <Footer theme={theme!} onThemeChange={changeTheme} />
    </>
  );
}

export default App;
