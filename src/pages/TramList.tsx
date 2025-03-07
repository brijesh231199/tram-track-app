import React, { useState, useEffect } from "react";
import { ConfigProvider, Typography } from "antd";

import TramTable from "../component/TramTable";
import ThemeSwitcher from "../component/ThemeSwitcher";
import response from "../data/server-response.json"; // Directly import JSON
import { Tram } from "../types/tramTypes";
import { useTheme } from "../context/ThemeContext";
import { dataConstants, TransportMode } from "../constant/dataConstant";
import "./pages.css";

const TramList: React.FC = () => {
  const { theme, toggleTheme, themeMode } = useTheme();
  const [tramData, setTramData] = useState<Tram[]>([]);

  useEffect(() => {
    // Filter and transform tram data from JSON response
    const tramDetails = response.departures
      .filter((depature) => {
        return (
          depature.direction_code === 1 &&
          depature.line.transport_mode === TransportMode.Tram
        );
      })
      .map((data) => {
        return {
          destination: data.destination,
          arrivalTime: data.display,
          expectedTime: data.expected,
          status: data.state,
          platformNumber: data.stop_point.designation,
          lineNumber: data.line.id,
          journeyId: data.journey.id,
          scheduledTime: data.scheduled,
        };
      });
    setTramData(tramDetails);
  }, []);

  return (
    <ConfigProvider theme={theme}>
      <div className={`tram-list-container ${themeMode}`}>
        <Typography.Title level={2} className="header-center">
          Upcoming Trams at Luma Station
        </Typography.Title>
        <ThemeSwitcher
          darkMode={themeMode === dataConstants.DARK_MODE}
          toggleTheme={toggleTheme}
        />
        <TramTable data={tramData} />
      </div>
    </ConfigProvider>
  );
};

export default TramList;
