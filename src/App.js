import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import "./App.scss";
import Main from "./containers/Main";
import ProjectDetail from "./containers/projectDetail/ProjectDetail";
import {StyleProvider} from "./contexts/StyleContext";
import {useLocalStorage} from "./hooks/useLocalStorage";

function App() {
  const mediaQuery =
    typeof window !== "undefined" && typeof window.matchMedia === "function"
      ? window.matchMedia("(prefers-color-scheme: dark)")
      : null;
  const prefersDark =
    mediaQuery && typeof mediaQuery.matches === "boolean"
      ? mediaQuery.matches
      : false;
  const [isDark, setIsDark] = useLocalStorage("isDark", prefersDark);

  const changeTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <BrowserRouter>
      <StyleProvider value={{isDark: isDark, changeTheme: changeTheme}}>
        <div>
          <Routes>
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/" element={<Main />} />
          </Routes>
        </div>
      </StyleProvider>
    </BrowserRouter>
  );
}

export default App;
