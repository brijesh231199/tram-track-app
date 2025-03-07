import React, { createContext, useContext, useState } from "react";
import { ThemeConfig } from "antd";
import { lightTheme, darkTheme } from "../theme/themeConfig";
import { dataConstants } from "../constant/dataConstant";

// Define the interface for ThemeContext
interface ThemeContextProps {
  theme: ThemeConfig;
  toggleTheme: () => void;
  themeMode: string;
}

// Create a ThemeContext with an initial undefined value
const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

// ThemeProvider component to manage theme state and provide context
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [themeMode, setThemeMode] = useState<string>(dataConstants.LIGHT_MODE);

  // Function to toggle between light and dark modes
  const toggleTheme = () => {
    setThemeMode((prevTheme) =>
      prevTheme === dataConstants.LIGHT_MODE
        ? dataConstants.DARK_MODE
        : dataConstants.LIGHT_MODE
    );
  };

  return (
    <ThemeContext.Provider
      value={{
        theme: themeMode === dataConstants.LIGHT_MODE ? lightTheme : darkTheme,
        toggleTheme,
        themeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

// Custom hook to consume the ThemeContext
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};
