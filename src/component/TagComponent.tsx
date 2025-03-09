import React from "react";
import { Tag } from "antd";

// Define the props interface for Tag component
interface TagComponentProps {
  color: string;
  label: string;
}

const TagComponent: React.FC<TagComponentProps> = ({ color, label }) => {
  return <Tag color={color}>{label}</Tag>;
};

export default TagComponent;
