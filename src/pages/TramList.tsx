import React, { useState, useEffect } from "react";
import { ConfigProvider, Typography } from "antd";
import type { ColumnsType } from "antd/es/table";

import TableComponent from "../component/TableComponent";
import ThemeSwitcher from "../component/ThemeSwitcher";
import TagComponent from "../component/TagComponent";
import DropdownComponent from "../component/DropdownComponent";
import response from "../data/server-response.json"; // Directly import JSON
import { Tram } from "../types/tramTypes";
import { useTheme } from "../context/ThemeContext";
import { dataConstants, TransportMode } from "../constant/dataConstant";
import { calculateDelay } from "../utils/timeUtils";
import "./pages.css";

const TramList: React.FC = () => {
  const { theme, toggleTheme, themeMode } = useTheme();
  const [tramData, setTramData] = useState<Tram[]>([]);
  const [selectedDestination, setSelectedDestination] = useState<string>("1");

  // Function to render status tags baseds on tram state
  const renderStatusTag = (state: string) => {
    const statusInfo: Record<string, { color: string; label: string }> = {
      ATSTOP: { color: "green", label: dataConstants.TRAM_STATUS.AT_PLATFORM },
      EXPECTED: { color: "blue", label: dataConstants.TRAM_STATUS.EXPECTED },
    };

    // Get color and label based on state; default to given state if not found
    const { color, label } = statusInfo[state] || {
      color: "default",
      label: state,
    };
    return <TagComponent color={color} label={label} />;
  };

  // Define columns for the Ant Design table
  const columns: ColumnsType<Tram> = [
    { title: "ID", dataIndex: "journeyId", key: "journeyId" },
    { title: "Destination", dataIndex: "destination", key: "destination" },
    {
      title: "Platform",
      dataIndex: "platformNumber",
      key: "platform",
    },
    {
      title: "Arrival Time",
      key: "arrival",
      dataIndex: "arrivalTime",
      render: (time) => (time === "Nu" ? "Arrived" : time),
    },
    {
      title: "Delay (min)",
      key: "delay",
      render: (_, record) =>
        calculateDelay(record.scheduledTime, record.expectedTime),
    },
    { title: "Line", dataIndex: "lineNumber", key: "line" },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: renderStatusTag,
    },
  ];

  useEffect(() => {
    // Filter and transform tram data from JSON response
    const tramDetails = response.departures
      .filter((depature) => {
        return (
          depature.direction_code === parseInt(selectedDestination) &&
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
  }, [selectedDestination]);

  return (
    <ConfigProvider theme={theme}>
      <div className={`tram-list-container ${themeMode}`}>
        <Typography.Title level={2} className="header-center">
          Upcoming Trams at Luma Station
        </Typography.Title>
        <div className="toolbar">
          <DropdownComponent
            label="Select Destination:"
            options={[
              { label: "Linde", value: "1" },
              { label: "Sickla Udde", value: "2" },
            ]}
            value={selectedDestination}
            onChange={setSelectedDestination}
          />
          <ThemeSwitcher
            darkMode={themeMode === dataConstants.DARK_MODE}
            toggleTheme={toggleTheme}
          />
        </div>
        <TableComponent
          data={tramData}
          columns={columns}
          rowKey={(record) => record.journeyId}
          pagination={false}
        />
      </div>
    </ConfigProvider>
  );
};

export default TramList;
