import React from "react";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { Tram } from "../types/tramTypes";
import { calculateDelay } from "../utils/timeUtils";
import { dataConstants } from "../constant/dataConstant";

// Function to render status tags based on tram state
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
  return <Tag color={color}>{label}</Tag>;
};

// Define the props interface for TramTable component
interface TramTableProps {
  data: Tram[];
}

const TramTable: React.FC<TramTableProps> = ({ data }) => {
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

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={(record) => record.journeyId}
      pagination={false}
    />
  );
};

export default TramTable;
