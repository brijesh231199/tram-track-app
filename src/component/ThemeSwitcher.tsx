import React from "react";
import { Tooltip } from "antd";
import { SunOutlined, MoonOutlined } from "@ant-design/icons";
import "./component.css";

// Define the props interface for ThemeSwitcher component
interface ThemeSwitcherProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({
  darkMode,
  toggleTheme,
}) => (
  <Tooltip title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}>
    {darkMode ? (
      <MoonOutlined
        className="theme-switcher-icon dark-mode"
        onClick={toggleTheme}
      />
    ) : (
      <SunOutlined
        className="theme-switcher-icon light-mode"
        onClick={toggleTheme}
      />
    )}
  </Tooltip>
);

export default ThemeSwitcher;
